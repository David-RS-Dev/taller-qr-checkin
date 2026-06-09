// ==========================================
// ESTRUCTURA DE DATOS DE EJEMPLO
// ==========================================
const vehicleData = {
    "BMW": ["X5", "330i", "M3", "X3"],
    "Chevrolet": ["Sail", "Tracker", "Onix", "Captiva"],
    "Ford": ["F-150", "Explorer", "Ranger", "Fiesta"],
    "Toyota": ["Hilux", "Corolla", "RAV4", "Yaris"]
};

const servicesList = [
    "Cambio de Pastillas",
    "Cambio de Aceite",
    "Revisión General"
];

// ==========================================
// OBJETO PARA ALMACENAR LA SELECCIÓN DEL USUARIO
// ==========================================
const userOrder = {
    brand: "",
    model: "",
    year: "",
    service: ""
};

// ==========================================
// ELEMENTOS DEL DOM
// ==========================================
const steps = {
    brand: document.getElementById('step-brand'),
    model: document.getElementById('step-model'),
    year: document.getElementById('step-year'),
    service: document.getElementById('step-service'),
    final: document.getElementById('step-final')
};

// CONTENEDORES DINÁMICOS Y ENTRADAS MANUALES
const brandOptions = document.getElementById('brand-options');
const customBrandContainer = document.getElementById('custom-brand-container');
const inputCustomBrand = document.getElementById('custom-brand');
const btnNextBrand = document.getElementById('btn-next-brand');

const modelOptions = document.getElementById('model-options');
const customModelContainer = document.getElementById('custom-model-container');
const inputCustomModel = document.getElementById('custom-model');
const btnNextModel = document.getElementById('btn-next-model');

const yearSelect = document.getElementById('year-select');
const inputCustomYear = document.getElementById('custom-year');
const btnNextYear = document.getElementById('btn-next-year');

const serviceOptions = document.getElementById('service-options');
const customServiceContainer = document.getElementById('custom-service-container');
const inputCustomService = document.getElementById('custom-service');
const btnNextService = document.getElementById('btn-next-service');

const btnSubmitOrder = document.getElementById('btn-submit-order');

// ==========================================
// FUNCIONES DE NAVEGACIÓN Y FLUJO
// ==========================================

function navigateTo(currentStep, nextStep) {
    currentStep.classList.add('hidden');
    nextStep.classList.remove('hidden');
}

// Inicializa la App
function initApp() {
    renderBrands();
    populateYears();
    renderServices();
}

// --- PANTALLA 1: LOGICA DE MARCAS ---
function renderBrands() {
    brandOptions.innerHTML = '';
    const sortedBrands = Object.keys(vehicleData).sort();
    
    sortedBrands.forEach(brand => {
        const button = document.createElement('button');
        button.textContent = brand;
        button.className = 'btn-option';
        button.addEventListener('click', () => {
            userOrder.brand = brand;
            customBrandContainer.classList.add('hidden');
            renderModels(brand);
            navigateTo(steps.brand, steps.model);
        });
        brandOptions.appendChild(button);
    });

    // Botón [OTRO]
    const otherButton = document.createElement('button');
    otherButton.textContent = '[OTRO]';
    otherButton.className = 'btn-option btn-other';
    otherButton.addEventListener('click', () => {
        customBrandContainer.classList.remove('hidden');
        inputCustomBrand.focus();
    });
    brandOptions.appendChild(otherButton);
}

btnNextBrand.addEventListener('click', () => {
    const value = inputCustomBrand.value.trim();
    if (value !== "") {
        userOrder.brand = value;
        // Optimización: Pasamos true para indicar que viene de marca manual
        renderModels(null, true); 
        navigateTo(steps.brand, steps.model);
    } else {
        alert("Por favor, escribe la marca de tu vehículo para continuar.");
    }
});


// --- PANTALLA 2: LOGICA DE MODELOS ---
function renderModels(brand, isCustomBrand = false) {
    modelOptions.innerHTML = '';
    customModelContainer.classList.add('hidden');
    inputCustomModel.value = '';

    if (brand && vehicleData[brand]) {
        vehicleData[brand].forEach(model => {
            const button = document.createElement('button');
            button.textContent = model;
            button.className = 'btn-option';
            button.addEventListener('click', () => {
                userOrder.model = model;
                navigateTo(steps.model, steps.year);
            });
            modelOptions.appendChild(button);
        });
    }

    // Botón [OTRO]
    const otherButton = document.createElement('button');
    otherButton.textContent = '[OTRO]';
    otherButton.className = 'btn-option btn-other';
    otherButton.addEventListener('click', () => {
        customModelContainer.classList.remove('hidden');
        inputCustomModel.focus();
    });
    modelOptions.appendChild(otherButton);

    // Optimización: Si la marca fue manual, despliega directo el campo de modelo sin clics extras
    if (isCustomBrand) {
        customModelContainer.classList.remove('hidden');
        setTimeout(() => inputCustomModel.focus(), 50);
    }
}

btnNextModel.addEventListener('click', () => {
    const value = inputCustomModel.value.trim();
    if (value !== "") {
        userOrder.model = value;
        navigateTo(steps.model, steps.year);
    } else {
        alert("Por favor, escribe el modelo de tu vehículo para continuar.");
    }
});


// --- PANTALLA 3: LOGICA DE AÑOS ---
function populateYears() {
    const currentYear = 2026; 
    for (let year = currentYear; year >= 1950; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
}

// Sincronizar campos de año para limpiar el opuesto si se interactúa con uno
yearSelect.addEventListener('change', () => { inputCustomYear.value = ''; });
inputCustomYear.addEventListener('input', () => { yearSelect.selectedIndex = 0; });

btnNextYear.addEventListener('click', () => {
    let selectedYear = yearSelect.value;
    let customYear = inputCustomYear.value.trim();

    if (customYear !== "") {
        userOrder.year = customYear;
        navigateTo(steps.year, steps.service);
    } else if (selectedYear !== "") {
        userOrder.year = selectedYear;
        navigateTo(steps.year, steps.service);
    } else {
        alert("Por favor, selecciona un año o escríbelo directamente para continuar.");
    }
});


// --- PANTALLA 4: LOGICA DE SERVICIOS ---
function renderServices() {
    serviceOptions.innerHTML = '';
    
    servicesList.forEach(service => {
        const button = document.createElement('button');
        button.textContent = service;
        button.className = 'btn-option';
        button.addEventListener('click', () => {
            userOrder.service = service;
            navigateTo(steps.service, steps.final);
        });
        serviceOptions.appendChild(button);
    });

    // Botón [OTRO]
    const otherButton = document.createElement('button');
    otherButton.textContent = '[OTRO]';
    otherButton.className = 'btn-option btn-other';
    otherButton.addEventListener('click', () => {
        customServiceContainer.classList.remove('hidden');
        inputCustomService.focus();
    });
    serviceOptions.appendChild(otherButton);
}

btnNextService.addEventListener('click', () => {
    const value = inputCustomService.value.trim();
    if (value !== "") {
        userOrder.service = value;
        navigateTo(steps.service, steps.final);
    } else {
        alert("Por favor, describe el servicio que necesitas para continuar.");
    }
});


// --- PANTALLA 5: ENVIAR A WHATSAPP (VERSIÓN ULTRA-COMPATIBLE MÓVIL) ---
btnSubmitOrder.addEventListener('click', () => {
    // Código de país 593 para Ecuador seguido de tu número móvil
    const tuNumeroTelefono = "593962059311"; 

    // Formateo limpio en negritas
    const mensajeWhatsApp = 
        `*NUEVA ORDEN DE SERVICIO - TALLER*\n\n` +
        `*Vehiculo:* ${userOrder.brand}\n` +
        `*Modelo:* ${userOrder.model}\n` +
        `*Año:* ${userOrder.year}\n` +
        `*Servicio requerido:* ${userOrder.service}\n\n` +
        `_Enviado desde el codigo QR del taller._`;

    // Codificar de forma segura para URLs
    const mensajeCodificado = encodeURIComponent(mensajeWhatsApp);

    // CAMBIO CLAVE: Usamos api.whatsapp.com en lugar de wa.me para evitar el bucle de la Play Store
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${tuNumeroTelefono}&text=${mensajeCodificado}`;

    // Redirección directa
    window.location.href = urlWhatsApp;
});

// Ejecución al cargar el archivo
initApp();
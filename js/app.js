/* =========================================
   ESTADO GLOBAL DE LA APLICACIÓN
   ========================================= */
let catalogo = {};
let tarifas = {};
let estado = {
    paso: 1,
    marca: null,
    modelo: null,
    tipoVehiculo: null,
    servicio: null,
    esContingencia: false,
    modeloManual: ""
};

/* =========================================
   1. INICIALIZACIÓN Y CARGA DE DATOS
   ========================================= */
document.addEventListener('DOMContentLoaded', async () => {
    await cargarDatos();
    configurarEventListeners();
});

async function cargarDatos() {
    try {
        // Carga independiente de la Base de Datos (JSON)
        const resCatalogo = await fetch('data/catalogo.json');
        const resTarifas = await fetch('data/tarifas.json');
        
        catalogo = await resCatalogo.json();
        tarifas = await resTarifas.json();
    } catch (error) {
        console.error("Error cargando la base de datos:", error);
        alert("Error de conexión. Por favor, recarga la página.");
    }
}

/* =========================================
   2. CONFIGURACIÓN DE EVENTOS (RF1.3, RF2.3)
   ========================================= */
function configurarEventListeners() {
    // Buscador predictivo de Marca
    document.getElementById('input-marca').addEventListener('input', (e) => {
        const texto = e.target.value.toLowerCase();
        mostrarSugerencias('sugerencias-marca', Object.keys(catalogo), texto, seleccionarMarca);
        if (texto.length > 0) document.getElementById('sugerencias-marca').classList.remove('hidden');
        else document.getElementById('sugerencias-marca').classList.add('hidden');
    });

    // Buscador predictivo de Modelo
    document.getElementById('input-modelo').addEventListener('input', (e) => {
        if (!estado.marca) return;
        const texto = e.target.value.toLowerCase();
        const modelos = Object.keys(catalogo[estado.marca].modelos || catalogo[estado.marca]); // Soporta ambas estructuras
        mostrarSugerencias('sugerencias-modelo', modelos, texto, seleccionarModelo);
        if (texto.length > 0) document.getElementById('sugerencias-modelo').classList.remove('hidden');
        else document.getElementById('sugerencias-modelo').classList.add('hidden');
    });

    // Toggle de Ayuda de Matrícula (Sección 3)
    document.getElementById('btn-ayuda-matricula').addEventListener('click', () => {
        document.getElementById('panel-matricula').classList.toggle('hidden');
    });

    // Botón Continuar (Paso 1 -> 2)
    document.getElementById('btn-continuar-1').addEventListener('click', procesarSiguientePaso);

    // Selección de Servicio Estándar
    document.querySelectorAll('.btn-servicio').forEach(btn => {
        btn.addEventListener('click', () => {
            estado.servicio = btn.dataset.servicio;
            estado.esContingencia = false;
            calcularYMostrarPrecios();
        });
    });

    // Selección de Silueta en Contingencia (RF2.3)
    document.querySelectorAll('.btn-silueta').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.btn-silueta').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            estado.tipoVehiculo = btn.dataset.tipo;
            estado.modeloManual = document.getElementById('input-modelo-manual').value || "No especificado";
            document.getElementById('btn-continuar-contingencia').disabled = false;
        });
    });

    // Botón Continuar Contingencia
    document.getElementById('btn-continuar-contingencia')?.addEventListener('click', () => {
        estado.esContingencia = true;
        estado.servicio = "calidad_pastillas"; // Default para contingencia
        guardarEnColaContingencia(); // RF2.4
        calcularYMostrarPrecios();
    });

    // Reiniciar
    document.getElementById('btn-reiniciar').addEventListener('click', reiniciarApp);
}

/* =========================================
   3. LÓGICA DEL WIZARD Y NAVEGACIÓN (RF1.1, RF1.2)
   ========================================= */
function mostrarSugerencias(idContenedor, lista, texto, callback) {
    const contenedor = document.getElementById(idContenedor);
    contenedor.innerHTML = '';
    const filtrados = lista.filter(item => item.toLowerCase().includes(texto));
    
    filtrados.forEach(item => {
        const div = document.createElement('div');
        div.className = 'sugerencia-item';
        div.textContent = item;
        div.addEventListener('click', () => {
            callback(item);
            contenedor.classList.add('hidden');
        });
        contenedor.appendChild(div);
    });
}

function seleccionarMarca(marca) {
    estado.marca = marca;
    document.getElementById('input-marca').value = marca;
    document.getElementById('grupo-modelo').classList.remove('hidden');
    document.getElementById('input-modelo').value = '';
    document.getElementById('input-modelo').focus();
    validarPaso1();
    actualizarBarraEstado();
}

function seleccionarModelo(modelo) {
    estado.modelo = modelo;
    document.getElementById('input-modelo').value = modelo;
    validarPaso1();
    actualizarBarraEstado();
}

function validarPaso1() {
    const btn = document.getElementById('btn-continuar-1');
    btn.disabled = !(estado.marca && estado.modelo);
}

function procesarSiguientePaso() {
    // Verificar si el modelo existe en el catálogo para obtener su tipo
    const datosModelo = catalogo[estado.marca]?.modelos?.[estado.modelo] || catalogo[estado.marca]?.[estado.modelo];
    
    if (datosModelo && datosModelo.tipo) {
        estado.tipoVehiculo = datosModelo.tipo;
        estado.esContingencia = false;
        irAlPaso(2);
    } else {
        // RF2.3: Activar modo contingencia si no está catalogado
        activarModoContingencia();
    }
}

function activarModoContingencia() {
    document.getElementById('opciones-servicio-estandar').classList.add('hidden');
    document.getElementById('panel-contingencia').classList.remove('hidden');
    // Crear botón de continuar para contingencia si no existe
    if (!document.getElementById('btn-continuar-contingencia')) {
        const btn = document.createElement('button');
        btn.id = 'btn-continuar-contingencia';
        btn.className = 'btn-primary';
        btn.textContent = 'Cotizar con esta categoría';
        btn.disabled = true;
        document.getElementById('panel-contingencia').appendChild(btn);
        btn.addEventListener('click', () => {
            estado.esContingencia = true;
            estado.modeloManual = document.getElementById('input-modelo-manual').value || "No especificado";
            estado.servicio = "calidad_pastillas";
            guardarEnColaContingencia();
            calcularYMostrarPrecios();
        });
    }
    irAlPaso(2);
}

function irAlPaso(paso) {
    estado.paso = paso;
    document.querySelectorAll('.wizard-step').forEach(el => el.classList.add('hidden'));
    document.getElementById(`step-${paso}`).classList.remove('hidden');
    
    if (paso === 2 && !estado.esContingencia) {
        document.getElementById('opciones-servicio-estandar').classList.remove('hidden');
        document.getElementById('panel-contingencia').classList.add('hidden');
    }
    actualizarBarraEstado();
    window.scrollTo(0, 0);
}

function actualizarBarraEstado() {
    const bar = document.getElementById('status-bar');
    if (estado.paso > 1) bar.classList.remove('hidden');
    
    document.getElementById('status-marca').textContent = estado.marca || 'Marca';
    document.getElementById('status-modelo').textContent = estado.modelo || (estado.esContingencia ? estado.modeloManual : 'Modelo');
    document.getElementById('status-servicio').textContent = estado.servicio ? 'Servicio' : 'Servicio';
}

// RF1.2: Retorno inmediato al tocar la barra
window.volverAPaso = function(paso) {
    if (paso === 1) {
        estado.marca = null;
        estado.modelo = null;
        estado.tipoVehiculo = null;
        estado.esContingencia = false;
        document.getElementById('input-marca').value = '';
        document.getElementById('input-modelo').value = '';
        document.getElementById('grupo-modelo').classList.add('hidden');
        document.getElementById('btn-continuar-1').disabled = true;
    } else if (paso === 2) {
        estado.servicio = null;
        estado.esContingencia = false;
    }
    irAlPaso(paso);
};

/* =========================================
   4. LÓGICA ALGORÍTMICA DE PRECIOS (Sección 5)
   ========================================= */
function calcularYMostrarPrecios() {
    const resultado = procesarPreciosCliente(estado.tipoVehiculo, estado.servicio);
    
    document.getElementById('resumen-vehiculo').textContent = 
        `${estado.marca} ${estado.modelo || estado.modeloManual} (${estado.tipoVehiculo})`;

    if (resultado.formato === 'triple') {
        document.getElementById('resultado-triple').classList.remove('hidden');
        document.getElementById('resultado-dual').classList.add('hidden');
        
        // Renderizar URBANO
        if (resultado.urbano.activo) {
            document.getElementById('precio-urbano').textContent = `$${resultado.urbano.valor}`;
            document.getElementById('msg-urbano').classList.add('hidden');
            document.getElementById('card-urbano').style.opacity = '1';
        } else {
            document.getElementById('precio-urbano').textContent = '-';
            document.getElementById('msg-urbano').classList.remove('hidden');
            document.getElementById('card-urbano').style.opacity = '0.6';
        }
        
        // Renderizar ESTÁNDAR
        document.getElementById('precio-estandar').textContent = `$${resultado.estandar.valor}`;
        
        // Renderizar PREMIUM
        document.getElementById('precio-premium').textContent = `$${resultado.premium.valor}`;
        
    } else if (resultado.formato === 'dual') {
        document.getElementById('resultado-triple').classList.add('hidden');
        document.getElementById('resultado-dual').classList.remove('hidden');
        document.getElementById('precio-mo-pastillas').textContent = `$${resultado.opcionA}`;
        document.getElementById('precio-mo-discos').textContent = `$${resultado.opcionB}`;
    }

    irAlPaso(3);
}

// Adaptación exacta de la función del documento, usando el JSON externo
function procesarPreciosCliente(tipoVehiculo, servicioSeleccionado) {
    const datos = tarifas[tipoVehiculo][servicioSeleccionado];
    
    if (servicioSeleccionado === "mano_de_obra") {
        return { 
            formato: "dual", 
            opcionA: datos.solo_pastillas, 
            opcionB: datos.cambio_discos 
        };
    } else {
        return { 
            formato: "triple", 
            urbano: datos.URBANO === null ? { activo: false, msg: "No recomendado" } : { activo: true, valor: datos.URBANO },
            estandar: { activo: true, valor: datos.ESTANDAR, destacado: true },
            premium: { activo: true, valor: datos.PREMIUM }
        };
    }
}

/* =========================================
   5. GESTIÓN DE CONTINGENCIAS (RF2.4)
   ========================================= */
async function guardarEnColaContingencia() {
    const nuevoRegistro = {
        fecha: new Date().toISOString(),
        marca: estado.marca,
        modelo_manual: estado.modeloManual,
        tipo_seleccionado: estado.tipoVehiculo,
        estado: "pendiente_aprobacion"
    };

    // NOTA PARA DESPLIEGUE EN VERCEL:
    // Un archivo JSON estático no puede ser modificado directamente por el frontend.
    // Para que esto funcione en producción, este fetch debe apuntar a una API Route de Vercel
    // o a un servicio externo como Supabase, Firebase o Airtable.
    // Por ahora, lo simulamos en consola y localStorage para pruebas locales.
    
    console.log("📥 Guardando en cola de aprobación:", nuevoRegistro);
    
    let cola = JSON.parse(localStorage.getItem('cola_contingencias') || '[]');
    cola.push(nuevoRegistro);
    localStorage.setItem('cola_contingencias', JSON.stringify(cola));
    
    /* DESCOMENTAR CUANDO TENGAS TU BACKEND / API ROUTE:
    try {
        await fetch('/api/guardar-contingencia', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoRegistro)
        });
    } catch (e) { console.error("Error guardando cola", e); }
    */
}

function reiniciarApp() {
    estado = { paso: 1, marca: null, modelo: null, tipoVehiculo: null, servicio: null, esContingencia: false, modeloManual: "" };
    document.getElementById('input-marca').value = '';
    document.getElementById('input-modelo').value = '';
    document.getElementById('grupo-modelo').classList.add('hidden');
    document.getElementById('status-bar').classList.add('hidden');
    document.querySelectorAll('.btn-silueta').forEach(b => b.classList.remove('selected'));
    document.getElementById('input-modelo-manual').value = '';
    irAlPaso(1);
}
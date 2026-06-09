// ==========================================
// ELEMENTOS DEL DOM
// ==========================================
const btnSubmitOrder = document.getElementById('btn-submit-order');

// ==========================================
// ENVIAR A WHATSAPP (VERSIÓN ULTRA-COMPATIBLE MÓVIL)
// ==========================================
btnSubmitOrder.addEventListener('click', () => {
    // Código de país 593 para Ecuador seguido de tu número móvil
    const tuNumeroTelefono = "593962059311"; 

    // Mensaje predeterminado de bienvenida para el taller
    const mensajeWhatsApp = 
        `*¡HOLA FRENO PERFECTO!*\n\n` +
        `Acabo de escanear el código QR del taller.\n` +
        `Me gustaría recibir atención y cotizar el cambio de pastillas/rectificación para mi vehículo.`;

    // Codificar de forma segura para URLs
    const mensajeCodificado = encodeURIComponent(mensajeWhatsApp);

    // Tu ruta ganadora: api.whatsapp.com/send para saltar bloqueos de Brave/Android
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${tuNumeroTelefono}&text=${mensajeCodificado}`;

    // Redirección directa e instantánea
    window.location.href = urlWhatsApp;
});
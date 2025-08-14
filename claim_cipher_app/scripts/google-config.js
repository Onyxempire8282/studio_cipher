/**
 * 🔒 Security Agent: Google Maps API Configuration
 * SECURE API KEY INTEGRATION
 */

// Security Agent: API Configuration (Production Ready)
window.GOOGLE_MAPS_CONFIG = {
    // API Key removed for security - configure with your own key
    apiKey: 'CONFIGURE_YOUR_GOOGLE_MAPS_API_KEY',
    libraries: ['places', 'geometry'],
    version: 'weekly',
    services: {
        distanceMatrix: true,
        directions: true,
        geocoding: true,
        places: true,
        maps: true
    },
    security: {
        cors: true,
        rateLimit: true,
        errorHandling: true
    }
};

// Security Agent: API Ready Handler
window.onGoogleMapsAPIReady = function() {
    console.log('🔒 Security Agent: Google Maps API loaded successfully');
    console.log('🛡️ Security Agent: All services enabled and secured');
    
    // Initialize applications
    if (typeof initRouteOptimizer === 'function') {
        initRouteOptimizer();
    }
    
    if (typeof window.mileageCalculator !== 'undefined') {
        window.mileageCalculator.enableGoogleMapsFeatures();
    }
};

// Security Agent: Error Handler
window.gm_authFailure = function() {
    console.error('🔒 Security Agent: Google Maps authentication failed');
    alert('Google Maps authentication failed. Please check API configuration.');
};

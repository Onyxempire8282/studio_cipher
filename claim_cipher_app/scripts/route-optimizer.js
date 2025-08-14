/**
 * Route Optimizer - Claim Cipher
 * Full-featured route optimization with day splitting
 */

class RouteOptimizer {
    constructor() {
        this.map = null;
        this.directionsService = null;
        this.directionsRenderer = null;
        this.geocoder = null;
        this.currentRoute = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSettings();
    }

    setupEventListeners() {
        document.getElementById('addDestination').addEventListener('click', () => this.addDestination());
        document.getElementById('optimizeRoute').addEventListener('click', () => this.optimizeRoute());
        document.getElementById('copyRoute').addEventListener('click', () => this.copyRoute());
        document.getElementById('exportMiles').addEventListener('click', () => this.exportToMileage());
        
        // Settings change handlers
        document.getElementById('maxLegMiles').addEventListener('change', () => this.saveSettings());
        document.getElementById('splitEnabled').addEventListener('change', () => this.saveSettings());
        document.getElementById('optimizeEnabled').addEventListener('change', () => this.saveSettings());
    }

    addDestination() {
        console.log('🎵 Lyricist Emergency: Add Stop button clicked');
        
        const container = document.getElementById('destinationsList');
        if (!container) {
            console.error('🎵 Lyricist: destinationsList container not found');
            return;
        }
        
        // Create only ONE destination input
        const destDiv = document.createElement('div');
        destDiv.className = 'destination-input';
        destDiv.innerHTML = `
            <input type="text" placeholder="Enter destination address" class="destination-address-input">
            <button class="remove-btn" onclick="removeDestination(this)" title="Remove this destination">×</button>
        `;
        
        // Add to container
        container.appendChild(destDiv);
        
        // Focus on the new input
        const newInput = destDiv.querySelector('.destination-address-input');
        if (newInput) {
            newInput.focus();
            
            // Add Google Maps autocomplete if available
            if (typeof google !== 'undefined' && google.maps && google.maps.places) {
                try {
                    const autocomplete = new google.maps.places.Autocomplete(newInput);
                    autocomplete.setFields(['formatted_address', 'geometry']);
                    console.log('🎵 Lyricist: Autocomplete added to new input');
                } catch (error) {
                    console.warn('🎵 Lyricist: Autocomplete failed:', error);
                }
            }
        }
        
        console.log('🎵 Lyricist Emergency: ONE destination input added successfully');
    }
        
        console.log('🎵 Lyricist: New destination input added with autocomplete');
    }

    async optimizeRoute() {
        console.log('🎵 Lyricist Emergency: Optimize Route button clicked');
        
        try {
            this.showLoading(true);
            this.hideError();

            const routeData = this.gatherRouteData();
            console.log('🎵 Lyricist: Route data gathered:', routeData);
            
            if (!this.validateRouteData(routeData)) {
                console.warn('🎵 Lyricist: Route data validation failed');
                return;
            }

            console.log('🎵 Lyricist: Starting route calculation...');
            
            // Show progress to user
            const optimizeBtn = document.getElementById('optimizeRoute');
            if (optimizeBtn) {
                const originalText = optimizeBtn.textContent;
                optimizeBtn.textContent = '🎵 Optimizing...';
                optimizeBtn.disabled = true;
                
                setTimeout(() => {
                    optimizeBtn.textContent = originalText;
                    optimizeBtn.disabled = false;
                }, 5000);
            }

            const optimizedRoute = await this.calculateOptimizedRoute(routeData);
            console.log('🎵 Lyricist: Route optimized:', optimizedRoute);
            
            const splitRoute = this.applySplitting(optimizedRoute, routeData.settings);
            console.log('🎵 Lyricist: Route split applied:', splitRoute);
            
            this.displayResults(splitRoute);
            this.renderMapRoute(optimizedRoute);
            
            this.currentRoute = splitRoute;
            
            console.log('🎵 Lyricist Emergency: Route optimization COMPLETED successfully!');
            
        } catch (error) {
            console.error('🎵 Lyricist Emergency: Route optimization error:', error);
            this.showError('Route optimization failed: ' + error.message);
        } finally {
            this.showLoading(false);
        }
    }

    gatherRouteData() {
        const startLocation = document.getElementById('startLocation').value.trim();
        const destinationInputs = document.querySelectorAll('#destinationsList input');
        const destinations = Array.from(destinationInputs)
            .map(input => input.value.trim())
            .filter(dest => dest.length > 0);

        const settings = {
            optimizeEnabled: document.getElementById('optimizeEnabled').checked,
            splitEnabled: document.getElementById('splitEnabled').checked,
            maxLegMiles: parseInt(document.getElementById('maxLegMiles').value) || 50
        };

        return { startLocation, destinations, settings };
    }

    validateRouteData(data) {
        if (!data.startLocation) {
            this.showError('Please enter a starting location');
            return false;
        }

        if (data.destinations.length === 0) {
            this.showError('Please add at least one destination');
            return false;
        }

        if (data.destinations.length > 15) {
            this.showError('Maximum 15 destinations allowed');
            return false;
        }

        return true;
    }

    async calculateOptimizedRoute(routeData) {
        const { startLocation, destinations, settings } = routeData;
        
        if (!settings.optimizeEnabled) {
            // Simple route without optimization
            return await this.calculateSimpleRoute(startLocation, destinations);
        }

        // Use Google Maps Directions API for optimization
        return new Promise((resolve, reject) => {
            const waypoints = destinations.map(dest => ({
                location: dest,
                stopover: true
            }));

            const request = {
                origin: startLocation,
                destination: destinations[destinations.length - 1], // Last destination as endpoint
                waypoints: waypoints.slice(0, -1), // All but last as waypoints
                optimizeWaypoints: true,
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.IMPERIAL,
                avoidHighways: false,
                avoidTolls: false
            };

            this.directionsService.route(request, (result, status) => {
                if (status === 'OK') {
                    const optimizedRoute = this.processDirectionsResult(result);
                    resolve(optimizedRoute);
                } else {
                    reject(new Error(`Directions request failed: ${status}`));
                }
            });
        });
    }

    async calculateSimpleRoute(startLocation, destinations) {
        // Simple sequential route calculation
        const route = {
            stops: [startLocation, ...destinations],
            legs: [],
            totalDistance: 0,
            totalDuration: 0
        };

        for (let i = 0; i < route.stops.length - 1; i++) {
            const leg = await this.calculateLeg(route.stops[i], route.stops[i + 1]);
            route.legs.push(leg);
            route.totalDistance += leg.distance;
            route.totalDuration += leg.duration;
        }

        return route;
    }

    calculateLeg(origin, destination) {
        return new Promise((resolve, reject) => {
            const service = new google.maps.DistanceMatrixService();
            service.getDistanceMatrix({
                origins: [origin],
                destinations: [destination],
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.IMPERIAL
            }, (response, status) => {
                if (status === 'OK') {
                    const element = response.rows[0].elements[0];
                    if (element.status === 'OK') {
                        resolve({
                            origin,
                            destination,
                            distance: element.distance.value * 0.000621371, // Convert meters to miles
                            duration: element.duration.value / 60, // Convert seconds to minutes
                            distanceText: element.distance.text,
                            durationText: element.duration.text
                        });
                    } else {
                        reject(new Error(`Route calculation failed for ${origin} to ${destination}`));
                    }
                } else {
                    reject(new Error(`Distance Matrix request failed: ${status}`));
                }
            });
        });
    }

    processDirectionsResult(result) {
        const route = result.routes[0];
        const legs = route.legs;
        
        const processedRoute = {
            stops: [legs[0].start_address],
            legs: [],
            totalDistance: 0,
            totalDuration: 0,
            googleRoute: result
        };

        legs.forEach(leg => {
            processedRoute.stops.push(leg.end_address);
            processedRoute.legs.push({
                origin: leg.start_address,
                destination: leg.end_address,
                distance: leg.distance.value * 0.000621371, // Convert to miles
                duration: leg.duration.value / 60, // Convert to minutes
                distanceText: leg.distance.text,
                durationText: leg.duration.text
            });
            
            processedRoute.totalDistance += leg.distance.value * 0.000621371;
            processedRoute.totalDuration += leg.duration.value / 60;
        });

        return processedRoute;
    }

    applySplitting(route, settings) {
        if (!settings.splitEnabled) {
            return {
                days: [{
                    label: "Single Day",
                    stops: route.stops,
                    legs: route.legs,
                    totalMiles: Math.round(route.totalDistance * 10) / 10,
                    totalMinutes: Math.round(route.totalDuration)
                }],
                overall: {
                    miles: Math.round(route.totalDistance * 10) / 10,
                    minutes: Math.round(route.totalDuration)
                }
            };
        }

        const days = [];
        let currentDay = {
            label: `Day ${days.length + 1}`,
            stops: [route.stops[0]],
            legs: [],
            totalMiles: 0,
            totalMinutes: 0
        };

        for (let i = 0; i < route.legs.length; i++) {
            const leg = route.legs[i];
            
            // Check if this leg would exceed the max leg miles
            if (leg.distance > settings.maxLegMiles && currentDay.legs.length > 0) {
                // End current day and start new one
                days.push(currentDay);
                currentDay = {
                    label: `Day ${days.length + 1}`,
                    stops: [leg.origin],
                    legs: [],
                    totalMiles: 0,
                    totalMinutes: 0
                };
            }

            // Add leg to current day
            currentDay.legs.push(leg);
            currentDay.stops.push(leg.destination);
            currentDay.totalMiles += leg.distance;
            currentDay.totalMinutes += leg.duration;
        }

        // Add the last day
        if (currentDay.legs.length > 0) {
            days.push(currentDay);
        }

        // Round numbers
        days.forEach(day => {
            day.totalMiles = Math.round(day.totalMiles * 10) / 10;
            day.totalMinutes = Math.round(day.totalMinutes);
        });

        const overall = {
            miles: Math.round(route.totalDistance * 10) / 10,
            minutes: Math.round(route.totalDuration)
        };

        return { days, overall };
    }

    displayResults(splitRoute) {
        const resultsDiv = document.getElementById('routeResults');
        const outputDiv = document.getElementById('routeOutput');

        let html = `
            <div class="route-summary">
                <div class="overall-stats">
                    <h4>📊 Overall Route</h4>
                    <p><strong>Total Distance:</strong> ${splitRoute.overall.miles} miles</p>
                    <p><strong>Total Time:</strong> ${Math.floor(splitRoute.overall.minutes / 60)}h ${splitRoute.overall.minutes % 60}m</p>
                    <p><strong>Days Required:</strong> ${splitRoute.days.length}</p>
                </div>
            </div>
        `;

        splitRoute.days.forEach((day, index) => {
            html += `
                <div class="day-section">
                    <h4>📅 ${day.label}</h4>
                    <div class="day-stats">
                        <span class="stat"><strong>${day.totalMiles} mi</strong></span>
                        <span class="stat"><strong>${Math.floor(day.totalMinutes / 60)}h ${day.totalMinutes % 60}m</strong></span>
                        <span class="stat"><strong>${day.stops.length} stops</strong></span>
                    </div>
                    <div class="stops-list">
                        ${day.stops.map((stop, i) => `
                            <div class="stop-item">
                                <span class="stop-number">${i + 1}</span>
                                <span class="stop-address">${this.shortenAddress(stop)}</span>
                                ${i < day.legs.length ? `<span class="leg-distance">${day.legs[i].distance.toFixed(1)} mi</span>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        });

        outputDiv.innerHTML = html;
        resultsDiv.style.display = 'block';
    }

    renderMapRoute(route) {
        if (route.googleRoute && this.directionsRenderer) {
            this.directionsRenderer.setDirections(route.googleRoute);
        }
    }

    copyRoute() {
        if (!this.currentRoute) return;

        let text = `🗺️ ROUTE CIPHER RESULTS\n\n`;
        text += `Overall: ${this.currentRoute.overall.miles} miles, ${Math.floor(this.currentRoute.overall.minutes / 60)}h ${this.currentRoute.overall.minutes % 60}m\n`;
        text += `Days: ${this.currentRoute.days.length}\n\n`;

        this.currentRoute.days.forEach(day => {
            text += `${day.label}: ${day.totalMiles} mi, ${Math.floor(day.totalMinutes / 60)}h ${day.totalMinutes % 60}m\n`;
            day.stops.forEach((stop, i) => {
                text += `  ${i + 1}. ${this.shortenAddress(stop)}\n`;
            });
            text += '\n';
        });

        navigator.clipboard.writeText(text).then(() => {
            this.showToast('Route copied to clipboard!');
        }).catch(err => {
            console.error('Copy failed:', err);
            this.showError('Copy failed. Please try again.');
        });
    }

    exportToMileage() {
        if (!this.currentRoute) return;

        // Calculate total distance for mileage calculator
        const totalDistance = this.currentRoute.overall.miles;
        
        // Store in localStorage for mileage calculator to pick up
        localStorage.setItem('cc_route_export', JSON.stringify({
            distance: totalDistance,
            route: this.currentRoute,
            timestamp: Date.now()
        }));

        this.showToast(`Exported ${totalDistance} miles to Mileage Calculator`);
        
        // Optionally redirect to mileage calculator
        if (confirm('Open Mileage Calculator with this distance?')) {
            window.location.href = 'mileage-cypher.html';
        }
    }

    shortenAddress(address) {
        if (address.length <= 50) return address;
        return address.substring(0, 47) + '...';
    }

    showLoading(show) {
        document.getElementById('loadingOverlay').style.display = show ? 'flex' : 'none';
    }

    showError(message) {
        document.getElementById('errorMessage').textContent = message;
        document.getElementById('errorDisplay').style.display = 'block';
    }

    hideError() {
        document.getElementById('errorDisplay').style.display = 'none';
    }

    showToast(message) {
        // Simple toast notification
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    loadSettings() {
        const settings = JSON.parse(localStorage.getItem('cc_route_settings') || '{}');
        
        if (settings.maxLegMiles) {
            document.getElementById('maxLegMiles').value = settings.maxLegMiles;
        }
        if (settings.splitEnabled !== undefined) {
            document.getElementById('splitEnabled').checked = settings.splitEnabled;
        }
        if (settings.optimizeEnabled !== undefined) {
            document.getElementById('optimizeEnabled').checked = settings.optimizeEnabled;
        }
    }

    saveSettings() {
        const settings = {
            maxLegMiles: parseInt(document.getElementById('maxLegMiles').value),
            splitEnabled: document.getElementById('splitEnabled').checked,
            optimizeEnabled: document.getElementById('optimizeEnabled').checked
        };
        
        localStorage.setItem('cc_route_settings', JSON.stringify(settings));
    }
}

// Global functions
// Enhanced removeDestination function by Lyricist Agent
function removeDestination(button) {
    const destDiv = button.parentElement;
    const input = destDiv.querySelector('input');
    const address = input.value.trim();
    
    // If input has content, ask for confirmation
    if (address) {
        if (!confirm(`Remove destination: "${address}"?`)) {
            return;
        }
    }
    
    // Remove the destination
    destDiv.remove();
    
    console.log('🎵 Lyricist: Destination removed:', address || 'empty');
}

function hideError() {
    document.getElementById('errorDisplay').style.display = 'none';
}

// Initialize when Google Maps loads
function initRouteOptimizer() {
    const routeOptimizer = new RouteOptimizer();
    
    // Initialize Google Maps
    routeOptimizer.map = new google.maps.Map(document.getElementById('routeMap'), {
        zoom: 10,
        center: { lat: 40.7128, lng: -74.0060 } // Default to NYC
    });
    
    routeOptimizer.directionsService = new google.maps.DirectionsService();
    routeOptimizer.directionsRenderer = new google.maps.DirectionsRenderer();
    routeOptimizer.geocoder = new google.maps.Geocoder();
    
    routeOptimizer.directionsRenderer.setMap(routeOptimizer.map);
    
    window.routeOptimizer = routeOptimizer;
}

// Fallback initialization if Google Maps doesn't load
document.addEventListener('DOMContentLoaded', () => {
    if (typeof google === 'undefined') {
        console.warn('Google Maps not loaded, initializing without map functionality');
        const routeOptimizer = new RouteOptimizer();
        window.routeOptimizer = routeOptimizer;
    }
    
    // Security Agent: Google Maps initialization
    initializeGoogleMaps() {
        console.log('🔒 Security Agent: Initializing Google Maps services...');
        
        const mapContainer = document.getElementById('routeMap');
        if (mapContainer && typeof google !== 'undefined') {
            this.map = new google.maps.Map(mapContainer, {
                zoom: 10,
                center: { lat: 40.7128, lng: -74.0060 },
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: [
                    {
                        featureType: "poi",
                        elementType: "labels",
                        stylers: [{ visibility: "off" }]
                    }
                ]
            });
            
            this.directionsService = new google.maps.DirectionsService();
            this.directionsRenderer = new google.maps.DirectionsRenderer({
                draggable: true,
                suppressMarkers: false
            });
            this.geocoder = new google.maps.Geocoder();
            
            this.directionsRenderer.setMap(this.map);
            
            // Setup autocomplete for start location
            const startInput = document.getElementById('startLocation');
            if (startInput) {
                const startAutocomplete = new google.maps.places.Autocomplete(startInput);
                startAutocomplete.setFields(['formatted_address', 'geometry']);
            }
            
            console.log('🔒 Security Agent: Google Maps fully initialized!');
            return true;
        } else {
            console.error('🔒 Security Agent: Google Maps initialization failed - missing container or API');
            return false;
        }
    }
    
    // Security Agent: Enhanced map rendering
    renderMapRoute(route) {
        console.log('🔒 Security Agent: Rendering route on map...');
        
        if (!this.map || !this.directionsRenderer) {
            console.warn('🔒 Security Agent: Map not initialized, attempting to initialize...');
            if (!this.initializeGoogleMaps()) {
                return;
            }
        }
        
        if (route && route.googleRoute) {
            this.directionsRenderer.setDirections(route.googleRoute);
            console.log('🔒 Security Agent: Route rendered successfully!');
        } else {
            console.warn('🔒 Security Agent: No route data to render');
        }
    }
});

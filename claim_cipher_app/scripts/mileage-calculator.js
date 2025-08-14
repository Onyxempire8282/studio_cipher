/**
 * Mileage Calculator - Claim Cipher
 * Complete mileage calculation with firm management
 */

class MileageCalculator {
    constructor() {
        this.settings = this.initSettings();
        this.currentCalculation = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupAutoDistanceListeners();
        this.setupAutoDistanceListeners();
        this.loadFirmsToSelect();
        this.checkForRouteImport();
    }

    setupEventListeners() {
        console.log('🎵 Lyricist Emergency: Setting up event listeners...');
        
        // Main calculator events - with error handling
        const firmSelect = document.getElementById('firmSelect');
        if (firmSelect) {
            firmSelect.addEventListener('change', (e) => {
                console.log('🎵 Lyricist: Firm changed to:', e.target.value);
                this.onFirmChange(e.target.value);
            });
        }
        
        const calculateBtn = document.getElementById('calculateBtn');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', (e) => {
                console.log('🎵 Lyricist Emergency: Calculate button clicked!');
                e.preventDefault();
                this.calculateMileage();
            });
            // Also handle form submission
            calculateBtn.addEventListener('submit', (e) => {
                e.preventDefault();
                this.calculateMileage();
            });
        } else {
            console.error('🎵 Lyricist Emergency: Calculate button not found!');
        }
        
        const copyBtn = document.getElementById('copyBtn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => this.copyToClipboard());
        }
        
        const newCalculationBtn = document.getElementById('newCalculation');
        if (newCalculationBtn) {
            newCalculationBtn.addEventListener('click', () => this.newCalculation());
        }
        
        // Firm management
        const manageFirmsBtn = document.getElementById('manageFirms');
        if (manageFirmsBtn) {
            manageFirmsBtn.addEventListener('click', (e) => {
                console.log('🎵 Lyricist Emergency: Manage Firms clicked!');
                e.preventDefault();
                this.openFirmsModal();
            });
        } else {
            console.error('🎵 Lyricist Emergency: Manage Firms button not found!');
        }
        
        const addFirmForm = document.getElementById('addFirmForm');
        if (addFirmForm) {
            addFirmForm.addEventListener('submit', (e) => {
                console.log('🎵 Lyricist: Add firm form submitted');
                this.addFirm(e);
            });
        }
        
        // Auto-calculate on input change
        ['distanceMiles', 'roundTrip'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', () => this.autoCalculate());
            }
        });

        // Route import
        const importRouteBtn = document.getElementById('importRouteBtn');
        if (importRouteBtn) {
            importRouteBtn.addEventListener('click', () => this.importFromRoute());
        }
        
        console.log('🎵 Lyricist Emergency: Event listeners setup complete!');
    }

    initSettings() {
        const defaultSettings = {
            firms: [
                {
                    id: 'sedgwick',
                    name: 'Sedgwick',
                    freeMiles: 50,
                    ratePerMile: 0.67,
                    roundTripDefault: true
                },
                {
                    id: 'acd',
                    name: 'ACD',
                    freeMiles: 30,
                    ratePerMile: 0.60,
                    roundTripDefault: false
                },
                {
                    id: 'crawford',
                    name: 'Crawford & Company',
                    freeMiles: 40,
                    ratePerMile: 0.65,
                    roundTripDefault: true
                }
            ],
            lastSelectedFirmId: 'sedgwick'
        };

        const saved = localStorage.getItem('cc_settings_v1');
        return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    }

    loadFirmsToSelect() {
        const select = document.getElementById('firmSelect');
        select.innerHTML = '<option value="">Select a firm...</option>';
        
        this.settings.firms.forEach(firm => {
            const option = document.createElement('option');
            option.value = firm.id;
            option.textContent = firm.name;
            select.appendChild(option);
        });

        // Restore last selected firm
        if (this.settings.lastSelectedFirmId) {
            select.value = this.settings.lastSelectedFirmId;
            this.onFirmChange(this.settings.lastSelectedFirmId);
        }
    }

    onFirmChange(firmId) {
        if (!firmId) return;

        const firm = this.settings.firms.find(f => f.id === firmId);
        if (!firm) return;

        // Update round trip default
        document.getElementById('roundTrip').checked = firm.roundTripDefault;

        // Save selection
        this.settings.lastSelectedFirmId = firmId;
        this.saveSettings();

        // Auto-calculate if we have distance
        this.autoCalculate();
    }

    calculateMileage() {
        console.log('🎵 Lyricist: Calculate button clicked - processing...');
        
        const payload = this.gatherCalculationData();
        
        if (!this.validateCalculationData(payload)) {
            return;
        }
        
        // Lyricist Agent: Show loading state
        const calculateBtn = document.getElementById('calculateBtn');
        if (calculateBtn) {
            const originalText = calculateBtn.textContent;
            calculateBtn.textContent = '🧮 Calculating...';
            calculateBtn.disabled = true;
            
            // Restore button after calculation
            setTimeout(() => {
                calculateBtn.textContent = originalText;
                calculateBtn.disabled = false;
            }, 1000);
        }

        try {
            const result = this.performCalculation(payload);
            this.displayResults(result);
            this.currentCalculation = result;
            
            console.log('🎵 Lyricist: Calculation completed successfully', result);
            this.showToast('Calculation completed!', 'success');
            
        } catch (error) {
            console.error('🎵 Lyricist: Calculation error', error);
            this.showError('Calculation failed: ' + error.message);
        }
    }

    gatherCalculationData() {
        const firmId = document.getElementById('firmSelect').value;
        const firm = this.settings.firms.find(f => f.id === firmId);
        
        return {
            firm,
            pointA: document.getElementById('pointA').value.trim(),
            pointB: document.getElementById('pointB').value.trim(),
            distanceMiles: parseFloat(document.getElementById('distanceMiles').value) || 0,
            roundTrip: document.getElementById('roundTrip').checked,
            note: document.getElementById('noteField').value.trim()
        };
    }

    validateCalculationData(payload) {
        if (!payload.firm) {
            this.showError('Please select an insurance firm');
            return false;
        }

        if (!payload.pointA || !payload.pointB) {
            this.showError('Please enter both Point A and Point B');
            return false;
        }

        if (payload.distanceMiles <= 0) {
            this.showError('Please enter a valid distance');
            return false;
        }

        return true;
    }

    performCalculation(payload) {
        const { firm, pointA, pointB, distanceMiles, roundTrip, note } = payload;

        // Core calculation logic
        const baseMiles = distanceMiles * (roundTrip ? 2 : 1);
        const billableMiles = Math.max(0, baseMiles - firm.freeMiles);
        const amount = billableMiles * firm.ratePerMile;

        return {
            firm,
            pointA,
            pointB,
            distanceMiles: this.round(distanceMiles, 1),
            roundTrip,
            baseMiles: this.round(baseMiles, 1),
            billableMiles: this.round(billableMiles, 1),
            amount: this.round(amount, 2),
            note,
            timestamp: new Date()
        };
    }

    displayResults(result) {
        const { firm, pointA, pointB, distanceMiles, roundTrip, baseMiles, billableMiles, amount, note } = result;

        const breakdownHtml = `
            <div class="breakdown-item">
                <span class="label">Route:</span>
                <span class="value">${pointA} → ${pointB}</span>
            </div>
            <div class="breakdown-item">
                <span class="label">Distance:</span>
                <span class="value">${distanceMiles} miles</span>
            </div>
            <div class="breakdown-item">
                <span class="label">Round Trip:</span>
                <span class="value">${roundTrip ? 'Yes' : 'No'}</span>
            </div>
            <div class="breakdown-item">
                <span class="label">Base Miles:</span>
                <span class="value">${baseMiles} miles</span>
            </div>
            <div class="breakdown-item">
                <span class="label">Free Miles:</span>
                <span class="value">${firm.freeMiles} miles</span>
            </div>
            <div class="breakdown-item highlight">
                <span class="label">Billable Miles:</span>
                <span class="value">${billableMiles} miles</span>
            </div>
            <div class="breakdown-item">
                <span class="label">Rate:</span>
                <span class="value">$${firm.ratePerMile}/mile</span>
            </div>
            <div class="breakdown-item total">
                <span class="label">Total Amount:</span>
                <span class="value">$${amount}</span>
            </div>
            ${note ? `
            <div class="breakdown-item">
                <span class="label">Note:</span>
                <span class="value">${note}</span>
            </div>
            ` : ''}
        `;

        document.getElementById('breakdownDisplay').innerHTML = breakdownHtml;

        // Generate copy-ready line
        const copyLine = this.formatClipboardLine(result);
        document.getElementById('copyText').value = copyLine;

        document.getElementById('resultsSection').style.display = 'block';
        document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
    }

    formatClipboardLine(result) {
        const { firm, pointA, pointB, baseMiles, billableMiles, amount, note } = result;
        
        let line = `Mileage: ${pointA}→${pointB} = ${baseMiles} mi − ${firm.freeMiles} free = ${billableMiles} billable × $${firm.ratePerMile}/mi ⇒ $${amount} (Firm: ${firm.name})`;
        
        if (note) {
            line += ` | Note: ${note}`;
        }
        
        return line;
    }

    async copyToClipboard() {
        const text = document.getElementById('copyText').value;
        
        try {
            await navigator.clipboard.writeText(text);
            this.showToast('Copied to clipboard!', 'success');
        } catch (error) {
            console.error('Copy failed:', error);
            
            // Fallback - select text
            const textarea = document.getElementById('copyText');
            textarea.select();
            textarea.setSelectionRange(0, 99999);
            
            try {
                document.execCommand('copy');
                this.showToast('Copied to clipboard!', 'success');
            } catch (fallbackError) {
                this.showError('Copy failed. Please select and copy manually.');
            }
        }
    }

    autoCalculate() {
        const firmId = document.getElementById('firmSelect').value;
        const distance = parseFloat(document.getElementById('distanceMiles').value);
        
        if (firmId && distance > 0) {
            this.calculateMileage();
        }
    }

    newCalculation() {
        // Clear inputs except firm selection
        document.getElementById('pointA').value = '';
        document.getElementById('pointB').value = '';
        document.getElementById('distanceMiles').value = '';
        document.getElementById('noteField').value = '';
        
        // Hide results
        document.getElementById('resultsSection').style.display = 'none';
        this.currentCalculation = null;
        
        // Focus on first input
        document.getElementById('pointA').focus();
    }

    // Firm Management
    openFirmsModal() {
        this.loadFirmsList();
        document.getElementById('firmsModal').style.display = 'flex';
    }

    closeFirmsModal() {
        document.getElementById('firmsModal').style.display = 'none';
    }

    loadFirmsList() {
        const container = document.getElementById('firmsList');
        container.innerHTML = '';

        this.settings.firms.forEach(firm => {
            const firmDiv = document.createElement('div');
            firmDiv.className = 'firm-item';
            firmDiv.innerHTML = `
                <div class="firm-info">
                    <strong>${firm.name}</strong>
                    <div class="firm-details">
                        Free: ${firm.freeMiles} mi | Rate: $${firm.ratePerMile}/mi | 
                        Round Trip: ${firm.roundTripDefault ? 'Yes' : 'No'}
                    </div>
                </div>
                <div class="firm-actions">
                    <button onclick="mileageCalculator.editFirm(firmId) {
        console.log('🎵 Lyricist: Edit firm requested for ID:', firmId);
        
        const firm = this.settings.firms.find(f => f.id === firmId);
        if (!firm) {
            this.showError('Firm not found');
            return;
        }
        
        // Populate form with existing firm data
        document.getElementById('firmName').value = firm.name;
        document.getElementById('firmFreeMiles').value = firm.freeMiles;
        document.getElementById('firmRate').value = firm.ratePerMile;
        document.getElementById('firmRoundTripDefault').checked = firm.roundTripDefault;
        
        // Change form to edit mode
        const form = document.getElementById('addFirmForm');
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.textContent = '✏️ Update Firm';
            submitBtn.dataset.editingId = firmId;
        }
        
        // Show the modal
        this.openFirmsModal();
        
        console.log('🎵 Lyricist: Edit mode activated for firm', firmId, firm.name);
    }

    addFirm(event) {
        event.preventDefault();
        
        const name = document.getElementById('firmName').value.trim();
        const freeMiles = parseInt(document.getElementById('firmFreeMiles').value) || 0;
        const ratePerMile = parseFloat(document.getElementById('firmRate').value) || 0;
        const roundTripDefault = document.getElementById('firmRoundTripDefault').checked;

        if (!name || freeMiles < 0 || ratePerMile <= 0) {
            this.showError('Please fill all fields with valid values');
            return;
        }

        const id = name.toLowerCase().replace(/[^a-z0-9]/g, '_');
        
        // Check for duplicate
        if (this.settings.firms.find(f => f.id === id)) {
            this.showError('A firm with this name already exists');
            return;
        }

        const newFirm = { id, name, freeMiles, ratePerMile, roundTripDefault };
        this.settings.firms.push(newFirm);
        this.saveSettings();

        // Clear form
        event.target.reset();

        // Refresh displays
        this.loadFirmsList();
        this.loadFirmsToSelect();

        this.showToast('Firm added successfully!', 'success');
    }

    deleteFirm(firmId) {
        if (this.settings.firms.length <= 1) {
            this.showError('Cannot delete the last firm');
            return;
        }

        const firm = this.settings.firms.find(f => f.id === firmId);
        if (confirm(`Delete firm "${firm.name}"?`)) {
            this.settings.firms = this.settings.firms.filter(f => f.id !== firmId);
            
            // Update selected firm if deleted
            if (this.settings.lastSelectedFirmId === firmId) {
                this.settings.lastSelectedFirmId = this.settings.firms[0].id;
            }
            
            this.saveSettings();
            this.loadFirmsList();
            this.loadFirmsToSelect();
            
            this.showToast('Firm deleted', 'success');
        }
    }

    // Route Import
    checkForRouteImport() {
        const routeData = localStorage.getItem('cc_route_export');
        if (routeData) {
            try {
                const data = JSON.parse(routeData);
                // Check if data is recent (within 1 hour)
                if (Date.now() - data.timestamp < 3600000) {
                    this.showRouteImportModal(data);
                } else {
                    // Clean up old data
                    localStorage.removeItem('cc_route_export');
                }
            } catch (error) {
                console.error('Route import error:', error);
                localStorage.removeItem('cc_route_export');
            }
        }
    }

    showRouteImportModal(data) {
        document.getElementById('routeImportData').innerHTML = `
            <p><strong>Distance:</strong> ${data.distance} miles</p>
            <p><strong>Route:</strong> ${data.route.days.length} day(s), ${data.route.overall.miles} total miles</p>
        `;
        
        document.getElementById('routeImportModal').style.display = 'flex';
        
        // Store data for import
        this.pendingRouteImport = data;
    }

    importFromRoute() {
        if (this.pendingRouteImport) {
            document.getElementById('distanceMiles').value = this.pendingRouteImport.distance;
            
            // If route has start/end info, populate points
            if (this.pendingRouteImport.route.days[0]?.stops) {
                const stops = this.pendingRouteImport.route.days[0].stops;
                document.getElementById('pointA').value = this.shortenAddress(stops[0]);
                document.getElementById('pointB').value = this.shortenAddress(stops[stops.length - 1]);
            }
            
            this.closeRouteImportModal();
            this.autoCalculate();
            
            // Clean up
            localStorage.removeItem('cc_route_export');
            this.pendingRouteImport = null;
            
            this.showToast('Route data imported!', 'success');
        }
    }

    closeRouteImportModal() {
        document.getElementById('routeImportModal').style.display = 'none';
        this.pendingRouteImport = null;
    }

    // Utilities
    round(value, decimals) {
        return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
    }

    shortenAddress(address) {
        if (address.length <= 30) return address;
        return address.substring(0, 27) + '...';
    }

    saveSettings() {
        localStorage.setItem('cc_settings_v1', JSON.stringify(this.settings));
    }

    showError(message) {
        this.showToast(message, 'error');
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()" class="toast-close">×</button>
        `;
        
        const container = document.getElementById('toastContainer');
        container.appendChild(toast);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 5000);
    }
}

// Global functions for modal management
function closeFirmsModal() {
    document.getElementById('firmsModal').style.display = 'none';
}

function closeRouteImportModal() {
    if (window.mileageCalculator) {
        window.mileageCalculator.closeRouteImportModal();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.mileageCalculator = new MileageCalculator();
    // Lyricist Agent: Auto-distance calculation
    async calculateDistanceAutomatically() {
        const pointA = document.getElementById('pointA').value.trim();
        const pointB = document.getElementById('pointB').value.trim();
        
        if (!pointA || !pointB || typeof google === 'undefined') {
            return;
        }
        
        console.log('🎵 Lyricist: Auto-calculating distance from', pointA, 'to', pointB);
        
        const distanceField = document.getElementById('distanceMiles');
        const originalPlaceholder = distanceField.placeholder;
        distanceField.placeholder = '🎵 Calculating distance...';
        distanceField.disabled = true;
        
        try {
            const service = new google.maps.DistanceMatrixService();
            const result = await new Promise((resolve, reject) => {
                service.getDistanceMatrix({
                    origins: [pointA],
                    destinations: [pointB],
                    travelMode: google.maps.TravelMode.DRIVING,
                    unitSystem: google.maps.UnitSystem.IMPERIAL
                }, (response, status) => {
                    if (status === 'OK') {
                        const element = response.rows[0].elements[0];
                        if (element.status === 'OK') {
                            resolve(element.distance.value * 0.000621371);
                        } else {
                            reject(new Error('Route not found'));
                        }
                    } else {
                        reject(new Error(`API Error: ${status}`));
                    }
                });
            });
            
            distanceField.value = Math.round(result * 10) / 10;
            this.autoCalculate();
            
            console.log('🎵 Lyricist: Auto-distance calculated:', result, 'miles');
            this.showToast(`Distance calculated: ${Math.round(result * 10) / 10} miles`, 'success');
            
        } catch (error) {
            console.error('🎵 Lyricist: Auto-distance failed:', error);
            this.showToast('Auto-distance calculation failed. Please enter manually.', 'warning');
        } finally {
            distanceField.placeholder = originalPlaceholder;
            distanceField.disabled = false;
        }
    }

    // Lyricist Agent: Setup auto-distance listeners
    setupAutoDistanceListeners() {
        const pointAInput = document.getElementById('pointA');
        const pointBInput = document.getElementById('pointB');
        
        if (!pointAInput || !pointBInput) return;
        
        let autoDistanceTimeout;
        
        const triggerAutoDistance = () => {
            clearTimeout(autoDistanceTimeout);
            autoDistanceTimeout = setTimeout(() => {
                this.calculateDistanceAutomatically();
            }, 2000);
        };
        
        pointAInput.addEventListener('blur', triggerAutoDistance);
        pointBInput.addEventListener('blur', triggerAutoDistance);
        
        console.log('🎵 Lyricist: Auto-distance listeners setup');
    }
    // Lyricist Agent: Auto-distance calculation
    async calculateDistanceAutomatically() {
        const pointA = document.getElementById('pointA').value.trim();
        const pointB = document.getElementById('pointB').value.trim();
        
        if (!pointA || !pointB || typeof google === 'undefined') {
            return;
        }
        
        console.log('🎵 Lyricist: Auto-calculating distance from', pointA, 'to', pointB);
        
        const distanceField = document.getElementById('distanceMiles');
        const originalPlaceholder = distanceField.placeholder;
        distanceField.placeholder = '🎵 Calculating distance...';
        distanceField.disabled = true;
        
        try {
            const service = new google.maps.DistanceMatrixService();
            const result = await new Promise((resolve, reject) => {
                service.getDistanceMatrix({
                    origins: [pointA],
                    destinations: [pointB],
                    travelMode: google.maps.TravelMode.DRIVING,
                    unitSystem: google.maps.UnitSystem.IMPERIAL
                }, (response, status) => {
                    if (status === 'OK') {
                        const element = response.rows[0].elements[0];
                        if (element.status === 'OK') {
                            resolve(element.distance.value * 0.000621371);
                        } else {
                            reject(new Error('Route not found'));
                        }
                    } else {
                        reject(new Error(`API Error: ${status}`));
                    }
                });
            });
            
            distanceField.value = Math.round(result * 10) / 10;
            this.autoCalculate();
            
            console.log('🎵 Lyricist: Auto-distance calculated:', result, 'miles');
            this.showToast(`Distance calculated: ${Math.round(result * 10) / 10} miles`, 'success');
            
        } catch (error) {
            console.error('🎵 Lyricist: Auto-distance failed:', error);
            this.showToast('Auto-distance calculation failed. Please enter manually.', 'warning');
        } finally {
            distanceField.placeholder = originalPlaceholder;
            distanceField.disabled = false;
        }
    }

    // Lyricist Agent: Setup auto-distance listeners
    setupAutoDistanceListeners() {
        const pointAInput = document.getElementById('pointA');
        const pointBInput = document.getElementById('pointB');
        
        if (!pointAInput || !pointBInput) return;
        
        let autoDistanceTimeout;
        
        const triggerAutoDistance = () => {
            clearTimeout(autoDistanceTimeout);
            autoDistanceTimeout = setTimeout(() => {
                this.calculateDistanceAutomatically();
            }, 2000);
        };
        
        pointAInput.addEventListener('blur', triggerAutoDistance);
        pointBInput.addEventListener('blur', triggerAutoDistance);
        
        console.log('🎵 Lyricist: Auto-distance listeners setup');
    }
});

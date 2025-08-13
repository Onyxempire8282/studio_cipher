// 🚗 Mileage Cypher JavaScript - Calculate that money, no matter what!

let trips = [];
let nextTripId = 1;

const firmRates = {
    'statefarm': 0.58,
    'allstate': 0.62,
    'progressive': 0.55,
    'geico': 0.56,
    'other': 0.60
};

function initializeMileageCypher() {
    console.log('🚗 Initializing Mileage Cypher...');
    
    setupAddTripHandler();
    loadTripsFromStorage();
    updateTotalAmount();
    
    showCipherNotification('Mileage Cypher ready to calculate!', 'success');
}

function setupAddTripHandler() {
    const addTripBtn = document.getElementById('add-trip-btn');
    if (addTripBtn) {
        addTripBtn.addEventListener('click', showAddTripModal);
    }
}

function showAddTripModal() {
    const modal = document.createElement('div');
    modal.className = 'cipher-modal';
    modal.innerHTML = `
        <div class="cipher-modal-content">
            <div class="cipher-modal-header">
                <h3>➕ Add New Trip</h3>
                <button class="cipher-modal-close" id="close-modal">&times;</button>
            </div>
            <div class="cipher-modal-body">
                <div class="cipher-form-group">
                    <label class="cipher-label">From Location</label>
                    <input type="text" class="cipher-input" id="trip-from" placeholder="123 Main St, Atlanta, GA">
                </div>
                <div class="cipher-form-group">
                    <label class="cipher-label">To Location</label>
                    <input type="text" class="cipher-input" id="trip-to" placeholder="456 Oak Ave, Decatur, GA">
                </div>
                <div class="cipher-form-group">
                    <label class="cipher-label">Miles</label>
                    <input type="number" class="cipher-input" id="trip-miles" placeholder="25.5" step="0.1">
                </div>
                <div class="cipher-form-group">
                    <label class="cipher-label">Insurance Firm</label>
                    <select class="cipher-select" id="trip-firm">
                        <option value="statefarm">State Farm ($0.58/mile)</option>
                        <option value="allstate">Allstate ($0.62/mile)</option>
                        <option value="progressive">Progressive ($0.55/mile)</option>
                        <option value="geico">Geico ($0.56/mile)</option>
                        <option value="other">Other ($0.60/mile)</option>
                    </select>
                </div>
            </div>
            <div class="cipher-modal-footer">
                <button class="cipher-btn cipher-btn--ghost" id="cancel-trip">Cancel</button>
                <button class="cipher-btn cipher-btn--primary" id="save-trip">Save Trip</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Event handlers
    modal.querySelector('#close-modal').addEventListener('click', () => modal.remove());
    modal.querySelector('#cancel-trip').addEventListener('click', () => modal.remove());
    modal.querySelector('#save-trip').addEventListener('click', saveNewTrip);
    
    // Focus first input
    modal.querySelector('#trip-from').focus();
}

function saveNewTrip() {
    const from = document.getElementById('trip-from').value.trim();
    const to = document.getElementById('trip-to').value.trim();
    const miles = parseFloat(document.getElementById('trip-miles').value);
    const firm = document.getElementById('trip-firm').value;
    
    if (!from || !to || !miles || miles <= 0) {
        showCipherNotification('Please fill all fields with valid data', 'error');
        return;
    }
    
    const trip = {
        id: nextTripId++,
        from,
        to,
        miles,
        firm,
        rate: firmRates[firm],
        amount: miles * firmRates[firm],
        created: new Date().toISOString()
    };
    
    trips.push(trip);
    saveTripsToStorage();
    renderTrips();
    updateTotalAmount();
    
    // Close modal
    document.querySelector('.cipher-modal').remove();
    
    showCipherNotification(`Trip added: $${trip.amount.toFixed(2)} calculated!`, 'success');
}

function renderTrips() {
    const container = document.getElementById('trips-cipher-container');
    if (!container) return;
    
    if (trips.length === 0) {
        container.innerHTML = `
            <div class="trips-cipher-empty">
                <div class="empty-cipher-icon">🚗</div>
                <p>No trips added yet. Click "Add Trip" to get started!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = trips.map(trip => `
        <div class="trip-cipher-row" data-trip-id="${trip.id}">
            <span class="trip-cipher-from">${trip.from}</span>
            <span class="trip-cipher-to">${trip.to}</span>
            <span class="trip-cipher-miles">${trip.miles} mi</span>
            <span class="trip-cipher-firm">${getFirmDisplayName(trip.firm)}</span>
            <span class="trip-cipher-amount">$${trip.amount.toFixed(2)}</span>
            <span class="trip-cipher-actions">
                <button class="cipher-btn cipher-btn--ghost cipher-btn--xs" onclick="editTrip(${trip.id})">✏️</button>
                <button class="cipher-btn cipher-btn--danger cipher-btn--xs" onclick="deleteTrip(${trip.id})">🗑️</button>
            </span>
        </div>
    `).join('');
}

function getFirmDisplayName(firm) {
    const names = {
        'statefarm': 'State Farm',
        'allstate': 'Allstate',
        'progressive': 'Progressive',
        'geico': 'Geico',
        'other': 'Other'
    };
    return names[firm] || 'Unknown';
}

function deleteTrip(tripId) {
    if (confirm('Delete this trip? This action cannot be undone.')) {
        trips = trips.filter(trip => trip.id !== tripId);
        saveTripsToStorage();
        renderTrips();
        updateTotalAmount();
        showCipherNotification('Trip deleted successfully', 'success');
    }
}

function updateTotalAmount() {
    const total = trips.reduce((sum, trip) => sum + trip.amount, 0);
    const totalEl = document.getElementById('total-amount');
    if (totalEl) {
        animateCipherNumber(totalEl, total, true);
    }
}

function saveTripsToStorage() {
    localStorage.setItem('cipher_mileage_trips', JSON.stringify(trips));
}

function loadTripsFromStorage() {
    const saved = localStorage.getItem('cipher_mileage_trips');
    if (saved) {
        trips = JSON.parse(saved);
        const maxId = trips.length > 0 ? Math.max(...trips.map(t => t.id)) : 0;
        nextTripId = maxId + 1;
        renderTrips();
    }
}

// Export functions
window.initializeMileageCypher = initializeMileageCypher;
window.deleteTrip = deleteTrip;

console.log('🚗 Mileage Cypher JavaScript loaded - Calculate that money!');
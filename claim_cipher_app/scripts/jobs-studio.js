// 📱 Jobs Studio JavaScript - Manage those jobs like a boss!

let jobs = [];
let activeFilter = 'all';

function initializeJobsStudio() {
    console.log('📱 Initializing Jobs Studio...');
    
    loadDemoJobs();
    setupJobFilters();
    setupJobActions();
    renderJobs();
    
    showCipherNotification('Jobs Studio ready for business!', 'success');
}

function loadDemoJobs() {
    // Load demo jobs or from localStorage
    const saved = localStorage.getItem('cipher_jobs');
    if (saved) {
        jobs = JSON.parse(saved);
    } else {
        jobs = [
            {
                id: 1,
                claimNumber: 'CLM-2024-001',
                insured: 'John Smith',
                address: '123 Main St, Atlanta, GA',
                status: 'scheduled',
                priority: 'high',
                created: new Date(Date.now() - 86400000).toISOString(),
                photos: [],
                notes: ''
            },
            {
                id: 2,
                claimNumber: 'CLM-2024-002', 
                insured: 'Jane Doe',
                address: '456 Oak Ave, Decatur, GA',
                status: 'in-progress',
                priority: 'medium',
                created: new Date(Date.now() - 172800000).toISOString(),
                photos: ['photo1.jpg', 'photo2.jpg'],
                notes: 'Water damage inspection in progress'
            },
            {
                id: 3,
                claimNumber: 'CLM-2024-003',
                insured: 'Bob Johnson',
                address: '789 Pine Rd, Marietta, GA', 
                status: 'completed',
                priority: 'low',
                created: new Date(Date.now() - 259200000).toISOString(),
                photos: ['photo3.jpg', 'photo4.jpg', 'photo5.jpg'],
                notes: 'Roof inspection completed, minimal damage'
            }
        ];
        saveJobs();
    }
}

function setupJobFilters() {
    const filterBtns = document.querySelectorAll('.filter-cipher-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active filter
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            activeFilter = this.dataset.filter;
            renderJobs();
        });
    });
}

function setupJobActions() {
    const newJobBtn = document.getElementById('new-job-btn');
    if (newJobBtn) {
        newJobBtn.addEventListener('click', showNewJobModal);
    }
}

function renderJobs() {
    const jobsList = document.getElementById('jobs-list');
    if (!jobsList) return;
    
    const filteredJobs = activeFilter === 'all' 
        ? jobs 
        : jobs.filter(job => job.status === activeFilter);
    
    if (filteredJobs.length === 0) {
        jobsList.innerHTML = `
            <div class="jobs-cipher-empty">
                <div class="empty-cipher-icon">📱</div>
                <p>No ${activeFilter === 'all' ? '' : activeFilter} jobs found</p>
            </div>
        `;
        return;
    }
    
    jobsList.innerHTML = filteredJobs.map(job => `
        <div class="job-cipher-card" data-job-id="${job.id}" data-status="${job.status}">
            <div class="job-cipher-header">
                <h4>${job.claimNumber}</h4>
                <span class="cipher-badge cipher-badge--${getStatusBadgeType(job.status)}">${formatStatus(job.status)}</span>
            </div>
            <div class="job-cipher-details">
                <p><strong>Insured:</strong> ${job.insured}</p>
                <p><strong>Address:</strong> ${job.address}</p>
                <p><strong>Priority:</strong> ${job.priority}</p>
                <p><strong>Photos:</strong> ${job.photos.length} uploaded</p>
            </div>
            <div class="job-cipher-actions">
                ${getJobActionButtons(job)}
            </div>
        </div>
    `).join('');
    
    // Add event listeners to action buttons
    addJobActionListeners();
}

function getStatusBadgeType(status) {
    const types = {
        'scheduled': 'warning',
        'in-progress': 'info', 
        'completed': 'success'
    };
    return types[status] || 'secondary';
}

function formatStatus(status) {
    return status.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

function getJobActionButtons(job) {
    switch(job.status) {
        case 'scheduled':
            return `
                <button class="cipher-btn cipher-btn--outline cipher-btn--sm edit-job-btn" data-job-id="${job.id}">📝 Edit</button>
                <button class="cipher-btn cipher-btn--primary cipher-btn--sm start-job-btn" data-job-id="${job.id}">🎤 Start</button>
            `;
        case 'in-progress':
            return `
                <button class="cipher-btn cipher-btn--outline cipher-btn--sm view-photos-btn" data-job-id="${job.id}">📱 Photos (${job.photos.length})</button>
                <button class="cipher-btn cipher-btn--success cipher-btn--sm complete-job-btn" data-job-id="${job.id}">✅ Complete</button>
            `;
        case 'completed':
            return `
                <button class="cipher-btn cipher-btn--outline cipher-btn--sm view-report-btn" data-job-id="${job.id}">📄 Report</button>
                <button class="cipher-btn cipher-btn--ghost cipher-btn--sm archive-job-btn" data-job-id="${job.id}">📦 Archive</button>
            `;
        default:
            return `<button class="cipher-btn cipher-btn--outline cipher-btn--sm">View</button>`;
    }
}

function addJobActionListeners() {
    // Start job buttons
    document.querySelectorAll('.start-job-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const jobId = parseInt(this.dataset.jobId);
            startJob(jobId);
        });
    });
    
    // Complete job buttons  
    document.querySelectorAll('.complete-job-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const jobId = parseInt(this.dataset.jobId);
            completeJob(jobId);
        });
    });
    
    // View photos buttons
    document.querySelectorAll('.view-photos-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const jobId = parseInt(this.dataset.jobId);
            viewJobPhotos(jobId);
        });
    });
}

function startJob(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
        job.status = 'in-progress';
        job.startedAt = new Date().toISOString();
        saveJobs();
        renderJobs();
        showCipherNotification(`Started job ${job.claimNumber}`, 'success');
    }
}

function completeJob(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
        job.status = 'completed';
        job.completedAt = new Date().toISOString();
        saveJobs();
        renderJobs();
        showCipherNotification(`Completed job ${job.claimNumber}`, 'success');
    }
}

function viewJobPhotos(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
        showCipherNotification(`Viewing ${job.photos.length} photos for ${job.claimNumber}`, 'info');
        // In real app, would open photo viewer
    }
}

function showNewJobModal() {
    showCipherNotification('New job creation - PRO feature', 'info');
    // In real app, would show job creation modal
}

function saveJobs() {
    localStorage.setItem('cipher_jobs', JSON.stringify(jobs));
}

// Export functions
window.initializeJobsStudio = initializeJobsStudio;

console.log('📱 Jobs Studio JavaScript loaded - Manage those jobs!');
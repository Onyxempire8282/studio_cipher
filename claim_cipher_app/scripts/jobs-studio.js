// 🎵 Lyricist Agent: Jobs Studio Professional Management System
// Studio Cipher - Advanced Job Management with Mobile Integration

class JobsStudioManager {
    constructor() {
        this.jobs = [];
        this.activeFilter = 'all';
        this.isLoading = false;
        this.syncStatus = 'connected';
        this.modalOpen = false;
        
        console.log('🎵 Lyricist: Initializing Jobs Studio Manager...');
        this.init();
    }
    
    init() {
        this.loadStoredJobs();
        this.setupEventListeners();
        this.setupKeyboardShortcuts();
        this.renderJobs();
        this.updateQuickStats();
        this.startAutoSync();
        
        this.showNotification('Jobs Studio ready for professional job management! 🎵', 'success');
    }
    
    loadStoredJobs() {
        const stored = localStorage.getItem('cipher_jobs');
        if (stored) {
            this.jobs = JSON.parse(stored);
        } else {
            // Initialize with comprehensive demo data
            this.jobs = [
                {
                    id: 1,
                    claimNumber: 'CLM-2024-001',
                    insured: 'John Smith',
                    address: '123 Main St, Atlanta, GA 30309',
                    phone: '(404) 555-0123',
                    email: 'john.smith@email.com',
                    status: 'scheduled',
                    priority: 'high',
                    type: 'Property Damage',
                    created: new Date(Date.now() - 86400000).toISOString(),
                    scheduledDate: new Date(Date.now() + 3600000).toISOString(),
                    estimatedDuration: '2 hours',
                    photos: [],
                    notes: 'Water damage inspection - check basement and first floor',
                    inspector: 'Demo User',
                    policyNumber: 'POL-2024-7891',
                    deductible: '$1,000',
                    coverage: 'Full Coverage',
                    tags: ['water-damage', 'urgent']
                },
                {
                    id: 2,
                    claimNumber: 'CLM-2024-002', 
                    insured: 'Jane Doe',
                    address: '456 Oak Ave, Decatur, GA 30030',
                    phone: '(678) 555-0456',
                    email: 'jane.doe@email.com',
                    status: 'in-progress',
                    priority: 'medium',
                    type: 'Auto Accident',
                    created: new Date(Date.now() - 172800000).toISOString(),
                    startedAt: new Date(Date.now() - 7200000).toISOString(),
                    estimatedDuration: '1.5 hours',
                    photos: ['exterior_damage.jpg', 'interior_view.jpg', 'vin_number.jpg'],
                    notes: 'Vehicle accident inspection - rear-end collision, check alignment',
                    inspector: 'Demo User',
                    policyNumber: 'POL-2024-7892',
                    deductible: '$500',
                    coverage: 'Collision Coverage',
                    tags: ['auto', 'collision']
                },
                {
                    id: 3,
                    claimNumber: 'CLM-2024-003',
                    insured: 'Bob Johnson',
                    address: '789 Pine Rd, Marietta, GA 30062', 
                    phone: '(770) 555-0789',
                    email: 'bob.johnson@email.com',
                    status: 'completed',
                    priority: 'low',
                    type: 'Property Damage',
                    created: new Date(Date.now() - 259200000).toISOString(),
                    startedAt: new Date(Date.now() - 86400000).toISOString(),
                    completedAt: new Date(Date.now() - 3600000).toISOString(),
                    estimatedDuration: '3 hours',
                    actualDuration: '2.5 hours',
                    photos: ['roof_overview.jpg', 'shingle_detail.jpg', 'gutter_damage.jpg', 'interior_ceiling.jpg'],
                    notes: 'Roof inspection completed - minor hail damage, recommend partial replacement',
                    inspector: 'Demo User',
                    policyNumber: 'POL-2024-7893',
                    deductible: '$2,500',
                    coverage: 'Homeowners Coverage',
                    tags: ['roof', 'hail-damage', 'completed']
                },
                {
                    id: 4,
                    claimNumber: 'CLM-2024-004',
                    insured: 'Sarah Wilson',
                    address: '321 Elm Street, Roswell, GA 30075',
                    phone: '(404) 555-0321',
                    email: 'sarah.wilson@email.com',
                    status: 'scheduled',
                    priority: 'high',
                    type: 'Fire Damage',
                    created: new Date(Date.now() - 43200000).toISOString(),
                    scheduledDate: new Date(Date.now() + 7200000).toISOString(),
                    estimatedDuration: '4 hours',
                    photos: [],
                    notes: 'Kitchen fire damage assessment - priority inspection required',
                    inspector: 'Demo User',
                    policyNumber: 'POL-2024-7894',
                    deductible: '$1,500',
                    coverage: 'Fire Coverage',
                    tags: ['fire', 'kitchen', 'priority']
                }
            ];
            this.saveJobs();
        }
    }
    
    setupEventListeners() {
        // Filter buttons
        document.querySelectorAll('.filter-cipher-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilterChange(e));
        });
        
        // Action buttons
        document.getElementById('new-job-btn')?.addEventListener('click', () => this.showNewJobModal());
        document.getElementById('sync-jobs-btn')?.addEventListener('click', () => this.syncMobileJobs());
        document.getElementById('filter-jobs-btn')?.addEventListener('click', () => this.showAdvancedFilter());
        document.getElementById('refresh-status-btn')?.addEventListener('click', () => this.refreshMobileStatus());
        
        // Modal controls
        document.getElementById('job-modal-close')?.addEventListener('click', () => this.closeModal());
        document.getElementById('job-modal-overlay')?.addEventListener('click', (e) => {
            if (e.target.id === 'job-modal-overlay') this.closeModal();
        });
        
        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modalOpen) {
                this.closeModal();
            }
        });
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'n':
                        e.preventDefault();
                        this.showNewJobModal();
                        break;
                    case 'r':
                        e.preventDefault();
                        this.syncMobileJobs();
                        break;
                    case 'f':
                        e.preventDefault();
                        this.showAdvancedFilter();
                        break;
                }
            }
        });
    }
    
    handleFilterChange(e) {
        const filterBtn = e.target;
        const newFilter = filterBtn.dataset.filter;
        
        // Update active filter button
        document.querySelectorAll('.filter-cipher-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        filterBtn.classList.add('active', 'job-filter-active');
        
        // Apply filter and render
        this.activeFilter = newFilter;
        this.renderJobs();
        
        // Remove animation class after animation completes
        setTimeout(() => {
            filterBtn.classList.remove('job-filter-active');
        }, 600);
        
        this.logActivity(`Filtered jobs by: ${newFilter}`, 'filter');
    }
    
    renderJobs() {
        const jobsList = document.getElementById('jobs-list');
        if (!jobsList) return;
        
        let filteredJobs = this.jobs;
        
        // Apply filters
        if (this.activeFilter !== 'all') {
            if (this.activeFilter === 'high-priority') {
                filteredJobs = this.jobs.filter(job => job.priority === 'high');
            } else {
                filteredJobs = this.jobs.filter(job => job.status === this.activeFilter);
            }
        }
        
        // Sort by priority and date
        filteredJobs.sort((a, b) => {
            const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
            const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
            if (priorityDiff !== 0) return priorityDiff;
            return new Date(b.created) - new Date(a.created);
        });
        
        if (filteredJobs.length === 0) {
            jobsList.innerHTML = `
                <div class="jobs-cipher-empty">
                    <div class="empty-cipher-icon">📋</div>
                    <p>No ${this.activeFilter === 'all' ? '' : this.activeFilter.replace('-', ' ')} jobs found</p>
                    <button class="cipher-btn cipher-btn--primary cipher-btn--sm" onclick="jobsStudio.showNewJobModal()">
                        ➕ Create Your First Job
                    </button>
                </div>
            `;
            return;
        }
        
        jobsList.innerHTML = filteredJobs.map((job, index) => {
            const createdDate = new Date(job.created);
            const timeAgo = this.getTimeAgo(createdDate);
            
            return `
                <div class="job-cipher-card job-card-enter" data-job-id="${job.id}" data-status="${job.status}" style="animation-delay: ${index * 0.1}s">
                    <div class="job-cipher-header">
                        <h4>${job.claimNumber}</h4>
                        <span class="cipher-badge cipher-badge--${this.getStatusBadgeType(job.status)}">${this.formatStatus(job.status)}</span>
                    </div>
                    <div class="job-cipher-details">
                        <p><strong>Insured:</strong> ${job.insured}</p>
                        <p><strong>Address:</strong> ${job.address}</p>
                        <p><strong>Priority:</strong> <span class="priority-${job.priority}">${job.priority.toUpperCase()}</span></p>
                        <p><strong>Type:</strong> ${job.type}</p>
                        <p><strong>Photos:</strong> ${job.photos.length} uploaded</p>
                        <p><strong>Created:</strong> ${timeAgo}</p>
                        ${job.scheduledDate ? `<p><strong>Scheduled:</strong> ${this.formatDateTime(job.scheduledDate)}</p>` : ''}
                    </div>
                    <div class="job-cipher-actions">
                        ${this.getJobActionButtons(job)}
                    </div>
                </div>
            `;
        }).join('');
        
        // Add event listeners to action buttons
        this.addJobActionListeners();
        this.updateQuickStats();
    }
    
    getStatusBadgeType(status) {
        const types = {
            'scheduled': 'warning',
            'in-progress': 'info', 
            'completed': 'success',
            'cancelled': 'danger'
        };
        return types[status] || 'secondary';
    }
    
    formatStatus(status) {
        return status.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }
    
    getJobActionButtons(job) {
        switch(job.status) {
            case 'scheduled':
                return `
                    <button class="cipher-btn cipher-btn--outline cipher-btn--sm view-details-btn" data-job-id="${job.id}">👁️ Details</button>
                    <button class="cipher-btn cipher-btn--outline cipher-btn--sm edit-job-btn" data-job-id="${job.id}">📝 Edit</button>
                    <button class="cipher-btn cipher-btn--primary cipher-btn--sm start-job-btn" data-job-id="${job.id}">🎤 Start Job</button>
                `;
            case 'in-progress':
                return `
                    <button class="cipher-btn cipher-btn--outline cipher-btn--sm view-details-btn" data-job-id="${job.id}">👁️ Details</button>
                    <button class="cipher-btn cipher-btn--outline cipher-btn--sm view-photos-btn" data-job-id="${job.id}">📱 Photos (${job.photos.length})</button>
                    <button class="cipher-btn cipher-btn--success cipher-btn--sm complete-job-btn" data-job-id="${job.id}">✅ Complete</button>
                `;
            case 'completed':
                return `
                    <button class="cipher-btn cipher-btn--outline cipher-btn--sm view-details-btn" data-job-id="${job.id}">👁️ Details</button>
                    <button class="cipher-btn cipher-btn--outline cipher-btn--sm view-report-btn" data-job-id="${job.id}">📄 Report</button>
                    <button class="cipher-btn cipher-btn--ghost cipher-btn--sm archive-job-btn" data-job-id="${job.id}">📦 Archive</button>
                `;
            default:
                return `<button class="cipher-btn cipher-btn--outline cipher-btn--sm view-details-btn" data-job-id="${job.id}">👁️ View</button>`;
        }
    }
    
    addJobActionListeners() {
        // View details buttons
        document.querySelectorAll('.view-details-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const jobId = parseInt(e.target.dataset.jobId);
                this.showJobDetailsModal(jobId);
            });
        });
        
        // Start job buttons
        document.querySelectorAll('.start-job-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const jobId = parseInt(e.target.dataset.jobId);
                this.startJob(jobId);
            });
        });
        
        // Complete job buttons  
        document.querySelectorAll('.complete-job-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const jobId = parseInt(e.target.dataset.jobId);
                this.completeJob(jobId);
            });
        });
        
        // View photos buttons
        document.querySelectorAll('.view-photos-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const jobId = parseInt(e.target.dataset.jobId);
                this.viewJobPhotos(jobId);
            });
        });
        
        // Edit job buttons
        document.querySelectorAll('.edit-job-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const jobId = parseInt(e.target.dataset.jobId);
                this.editJob(jobId);
            });
        });
        
        // View report buttons
        document.querySelectorAll('.view-report-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const jobId = parseInt(e.target.dataset.jobId);
                this.generateJobReport(jobId);
            });
        });
    }
    
    showJobDetailsModal(jobId) {
        const job = this.jobs.find(j => j.id === jobId);
        if (!job) return;
        
        const modalTitle = document.getElementById('job-modal-title');
        const modalContent = document.getElementById('job-modal-content');
        const modalOverlay = document.getElementById('job-modal-overlay');
        
        modalTitle.textContent = `Job Details - ${job.claimNumber}`;
        
        modalContent.innerHTML = `
            <div style="display: grid; gap: 1.5rem;">
                <!-- Job Header Info -->
                <div style="background: rgba(103, 58, 183, 0.1); padding: 1.5rem; border-radius: 12px; border-left: 4px solid var(--cipher-primary);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <h4 style="margin: 0; color: var(--cipher-text-primary);">${job.claimNumber}</h4>
                        <span class="cipher-badge cipher-badge--${this.getStatusBadgeType(job.status)}">${this.formatStatus(job.status)}</span>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                        <div>
                            <div style="font-size: 0.9rem; color: var(--cipher-text-secondary); margin-bottom: 0.25rem;">Priority</div>
                            <div class="priority-${job.priority}" style="font-weight: 600;">${job.priority.toUpperCase()}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.9rem; color: var(--cipher-text-secondary); margin-bottom: 0.25rem;">Type</div>
                            <div style="color: var(--cipher-text-primary);">${job.type}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.9rem; color: var(--cipher-text-secondary); margin-bottom: 0.25rem;">Inspector</div>
                            <div style="color: var(--cipher-text-primary);">${job.inspector}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.9rem; color: var(--cipher-text-secondary); margin-bottom: 0.25rem;">Duration</div>
                            <div style="color: var(--cipher-text-primary);">${job.actualDuration || job.estimatedDuration}</div>
                        </div>
                    </div>
                </div>
                
                <!-- Contact Information -->
                <div>
                    <h5 style="color: var(--cipher-text-primary); margin-bottom: 1rem;">📞 Contact Information</h5>
                    <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 1rem;">
                        <div style="display: grid; gap: 0.75rem;">
                            <div><strong>Insured:</strong> ${job.insured}</div>
                            <div><strong>Phone:</strong> <a href="tel:${job.phone}" style="color: var(--cipher-primary);">${job.phone}</a></div>
                            <div><strong>Email:</strong> <a href="mailto:${job.email}" style="color: var(--cipher-primary);">${job.email}</a></div>
                            <div><strong>Address:</strong> ${job.address}</div>
                        </div>
                    </div>
                </div>
                
                <!-- Policy Information -->
                <div>
                    <h5 style="color: var(--cipher-text-primary); margin-bottom: 1rem;">📋 Policy Information</h5>
                    <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 1rem;">
                        <div style="display: grid; gap: 0.75rem;">
                            <div><strong>Policy Number:</strong> ${job.policyNumber}</div>
                            <div><strong>Coverage Type:</strong> ${job.coverage}</div>
                            <div><strong>Deductible:</strong> ${job.deductible}</div>
                        </div>
                    </div>
                </div>
                
                <!-- Photos -->
                ${job.photos.length > 0 ? `
                <div>
                    <h5 style="color: var(--cipher-text-primary); margin-bottom: 1rem;">📸 Photos (${job.photos.length})</h5>
                    <div class="job-photos-grid">
                        ${job.photos.map(photo => `
                            <div class="job-photo-item" onclick="jobsStudio.viewFullPhoto('${photo}')">
                                <div class="job-photo-placeholder">📷</div>
                                <div style="position: absolute; bottom: 0.5rem; left: 0.5rem; right: 0.5rem; font-size: 0.8rem; color: white; background: rgba(0,0,0,0.7); padding: 0.25rem; border-radius: 4px; text-align: center;">
                                    ${photo}
                                </div>
                            </div>
                        `).join('')}
                        <div class="job-photo-item" onclick="jobsStudio.addPhoto(${job.id})" style="border: 2px dashed rgba(255,255,255,0.3);">
                            <div style="text-align: center; color: var(--cipher-text-muted);">
                                <div style="font-size: 2rem; margin-bottom: 0.5rem;">📷</div>
                                <div style="font-size: 0.9rem;">Add Photo</div>
                            </div>
                        </div>
                    </div>
                </div>
                ` : `
                <div>
                    <h5 style="color: var(--cipher-text-primary); margin-bottom: 1rem;">📸 Photos</h5>
                    <div style="text-align: center; padding: 2rem; background: rgba(255, 255, 255, 0.02); border: 1px dashed rgba(255, 255, 255, 0.2); border-radius: 8px;">
                        <div style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;">📷</div>
                        <div style="color: var(--cipher-text-muted); margin-bottom: 1rem;">No photos uploaded yet</div>
                        <button class="cipher-btn cipher-btn--primary cipher-btn--sm" onclick="jobsStudio.addPhoto(${job.id})">📱 Add Photos</button>
                    </div>
                </div>
                `}
                
                <!-- Notes -->
                <div>
                    <h5 style="color: var(--cipher-text-primary); margin-bottom: 1rem;">📝 Notes</h5>
                    <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 1rem;">
                        <div style="color: var(--cipher-text-secondary); line-height: 1.6;">
                            ${job.notes || 'No notes added yet.'}
                        </div>
                    </div>
                </div>
                
                <!-- Timeline -->
                <div>
                    <h5 style="color: var(--cipher-text-primary); margin-bottom: 1rem;">⏰ Timeline</h5>
                    <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 1rem;">
                        <div style="display: grid; gap: 0.75rem;">
                            <div style="display: flex; align-items: center; gap: 0.75rem;">
                                <div style="width: 8px; height: 8px; background: #4caf50; border-radius: 50%;"></div>
                                <div><strong>Created:</strong> ${this.formatDateTime(job.created)}</div>
                            </div>
                            ${job.startedAt ? `
                            <div style="display: flex; align-items: center; gap: 0.75rem;">
                                <div style="width: 8px; height: 8px; background: #2196f3; border-radius: 50%;"></div>
                                <div><strong>Started:</strong> ${this.formatDateTime(job.startedAt)}</div>
                            </div>
                            ` : ''}
                            ${job.completedAt ? `
                            <div style="display: flex; align-items: center; gap: 0.75rem;">
                                <div style="width: 8px; height: 8px; background: #4caf50; border-radius: 50%;"></div>
                                <div><strong>Completed:</strong> ${this.formatDateTime(job.completedAt)}</div>
                            </div>
                            ` : ''}
                            ${job.scheduledDate && !job.startedAt ? `
                            <div style="display: flex; align-items: center; gap: 0.75rem;">
                                <div style="width: 8px; height: 8px; background: #ff9800; border-radius: 50%;"></div>
                                <div><strong>Scheduled:</strong> ${this.formatDateTime(job.scheduledDate)}</div>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
                
                <!-- Action Buttons -->
                <div style="display: flex; gap: 0.75rem; justify-content: flex-end; padding-top: 1rem; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                    ${job.status === 'scheduled' ? `
                        <button class="cipher-btn cipher-btn--primary" onclick="jobsStudio.startJob(${job.id}); jobsStudio.closeModal();">🎤 Start Job</button>
                    ` : ''}
                    ${job.status === 'in-progress' ? `
                        <button class="cipher-btn cipher-btn--success" onclick="jobsStudio.completeJob(${job.id}); jobsStudio.closeModal();">✅ Complete Job</button>
                    ` : ''}
                    ${job.status === 'completed' ? `
                        <button class="cipher-btn cipher-btn--outline" onclick="jobsStudio.generateJobReport(${job.id})">📄 Generate Report</button>
                    ` : ''}
                    <button class="cipher-btn cipher-btn--outline" onclick="jobsStudio.editJob(${job.id})">📝 Edit Job</button>
                    <button class="cipher-btn cipher-btn--ghost" onclick="jobsStudio.closeModal()">Close</button>
                </div>
            </div>
        `;
        
        modalOverlay.classList.add('active');
        this.modalOpen = true;
        
        this.logActivity(`Viewed details for job ${job.claimNumber}`, 'view');
    }
    
    startJob(jobId) {
        const job = this.jobs.find(j => j.id === jobId);
        if (!job) return;
        
        job.status = 'in-progress';
        job.startedAt = new Date().toISOString();
        
        // Find and update the job card with animation
        const jobCard = document.querySelector(`[data-job-id="${jobId}"]`);
        if (jobCard) {
            jobCard.classList.add('status-update');
            setTimeout(() => {
                jobCard.classList.remove('status-update');
            }, 800);
        }
        
        this.saveJobs();
        this.renderJobs();
        
        this.showNotification(`🎤 Started job ${job.claimNumber} - Good luck with the inspection!`, 'success');
        this.logActivity(`Started job ${job.claimNumber}`, 'job-start');
    }
    
    completeJob(jobId) {
        const job = this.jobs.find(j => j.id === jobId);
        if (!job) return;
        
        job.status = 'completed';
        job.completedAt = new Date().toISOString();
        
        if (job.startedAt) {
            const startTime = new Date(job.startedAt);
            const endTime = new Date(job.completedAt);
            const durationHours = ((endTime - startTime) / (1000 * 60 * 60)).toFixed(1);
            job.actualDuration = `${durationHours} hours`;
        }
        
        // Find and update the job card with animation
        const jobCard = document.querySelector(`[data-job-id="${jobId}"]`);
        if (jobCard) {
            jobCard.classList.add('status-update');
            setTimeout(() => {
                jobCard.classList.remove('status-update');
            }, 800);
        }
        
        this.saveJobs();
        this.renderJobs();
        
        this.showNotification(`✅ Completed job ${job.claimNumber} - Great work!`, 'success');
        this.logActivity(`Completed job ${job.claimNumber}`, 'job-complete');
    }
    
    viewJobPhotos(jobId) {
        const job = this.jobs.find(j => j.id === jobId);
        if (!job) return;
        
        this.showJobDetailsModal(jobId);
        this.logActivity(`Viewed photos for job ${job.claimNumber}`, 'photos');
    }
    
    syncMobileJobs() {
        this.showNotification('📱 Syncing with mobile devices...', 'info');
        this.isLoading = true;
        
        // Simulate sync process
        setTimeout(() => {
            // Add some mock synced photos
            const randomJob = this.jobs[Math.floor(Math.random() * this.jobs.length)];
            if (randomJob && randomJob.status === 'in-progress') {
                const newPhotoCount = Math.floor(Math.random() * 3) + 1;
                for (let i = 0; i < newPhotoCount; i++) {
                    randomJob.photos.push(`mobile_sync_${Date.now()}_${i}.jpg`);
                }
            }
            
            this.isLoading = false;
            this.saveJobs();
            this.renderJobs();
            this.showNotification('🎉 Mobile sync completed! New photos available.', 'success');
            this.logActivity('Completed mobile device sync', 'sync');
        }, 2000);
    }
    
    showNewJobModal() {
        this.showNotification('🎵 New job creation - Professional feature coming soon!', 'info');
        this.logActivity('Attempted to create new job', 'new-job');
        
        // In a real implementation, this would show a comprehensive job creation modal
    }
    
    showAdvancedFilter() {
        this.showNotification('🔍 Advanced filtering options coming soon!', 'info');
        this.logActivity('Accessed advanced filter options', 'filter');
    }
    
    editJob(jobId) {
        const job = this.jobs.find(j => j.id === jobId);
        if (!job) return;
        
        this.showNotification(`📝 Editing job ${job.claimNumber} - Feature coming soon!`, 'info');
        this.logActivity(`Attempted to edit job ${job.claimNumber}`, 'edit');
    }
    
    generateJobReport(jobId) {
        const job = this.jobs.find(j => j.id === jobId);
        if (!job) return;
        
        this.showNotification(`📄 Generating professional report for ${job.claimNumber}...`, 'info');
        this.logActivity(`Generated report for job ${job.claimNumber}`, 'report');
        
        // Simulate report generation
        setTimeout(() => {
            this.showNotification('✅ Report generated and ready for download!', 'success');
        }, 1500);
    }
    
    addPhoto(jobId) {
        const job = this.jobs.find(j => j.id === jobId);
        if (!job) return;
        
        this.showNotification(`📷 Adding photos to ${job.claimNumber} - Mobile integration coming soon!`, 'info');
        this.logActivity(`Added photo to job ${job.claimNumber}`, 'photo');
    }
    
    viewFullPhoto(photoName) {
        this.showNotification(`🖼️ Viewing full-size photo: ${photoName}`, 'info');
        this.logActivity(`Viewed full photo: ${photoName}`, 'photo-view');
    }
    
    refreshMobileStatus() {
        this.showNotification('🔄 Refreshing mobile device status...', 'info');
        
        setTimeout(() => {
            this.showNotification('📱 Mobile devices status updated!', 'success');
            this.logActivity('Refreshed mobile device status', 'status');
        }, 1000);
    }
    
    closeModal() {
        const modalOverlay = document.getElementById('job-modal-overlay');
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
            this.modalOpen = false;
        }
    }
    
    updateQuickStats() {
        const todayCount = this.jobs.filter(job => {
            const today = new Date();
            const jobDate = new Date(job.created);
            return jobDate.toDateString() === today.toDateString();
        }).length;
        
        const pendingCount = this.jobs.filter(job => job.status === 'scheduled').length;
        const progressCount = this.jobs.filter(job => job.status === 'in-progress').length;
        const syncCount = this.jobs.filter(job => job.photos.length > 0).length;
        
        document.getElementById('today-count').textContent = todayCount;
        document.getElementById('pending-count').textContent = pendingCount;
        document.getElementById('progress-count').textContent = progressCount;
        document.getElementById('sync-count').textContent = syncCount;
    }
    
    startAutoSync() {
        // Auto-sync every 5 minutes
        setInterval(() => {
            if (!this.isLoading && this.syncStatus === 'connected') {
                // Simulate occasional new photos being synced
                if (Math.random() < 0.3) { // 30% chance
                    const inProgressJobs = this.jobs.filter(job => job.status === 'in-progress');
                    if (inProgressJobs.length > 0) {
                        const randomJob = inProgressJobs[Math.floor(Math.random() * inProgressJobs.length)];
                        randomJob.photos.push(`auto_sync_${Date.now()}.jpg`);
                        this.saveJobs();
                        this.renderJobs();
                        this.showNotification(`📸 New photo synced for ${randomJob.claimNumber}`, 'info');
                    }
                }
            }
        }, 300000); // 5 minutes
    }
    
    // Utility functions
    saveJobs() {
        localStorage.setItem('cipher_jobs', JSON.stringify(this.jobs));
    }
    
    getTimeAgo(date) {
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
        return `${Math.ceil(diffDays / 30)} months ago`;
    }
    
    formatDateTime(isoString) {
        return new Date(isoString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    showNotification(message, type = 'info') {
        // Use the global notification system if available
        if (window.showCipherNotification) {
            window.showCipherNotification(message, type);
        } else {
            console.log(`📱 Jobs Studio: ${message}`);
        }
    }
    
    logActivity(activity, category = 'general') {
        // Use the global activity logging if available
        if (window.logCipherActivity) {
            window.logCipherActivity(activity, category);
        } else {
            console.log(`📱 Activity: ${activity} [${category}]`);
        }
    }
}

// Initialize Jobs Studio Manager when DOM is ready
function initializeJobsStudio() {
    console.log('🎵 Lyricist: Initializing Jobs Studio...');
    window.jobsStudio = new JobsStudioManager();
}

// Export functions for global access
window.initializeJobsStudio = initializeJobsStudio;

console.log('🎵 Lyricist Agent: Jobs Studio Professional JavaScript loaded - Ready to manage jobs like a boss!');
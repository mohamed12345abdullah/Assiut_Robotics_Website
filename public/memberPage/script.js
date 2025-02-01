// API Configuration
const API_URL = 'https://assiut-robotics-zeta.vercel.app/members/getAllMembers';

// DOM Elements
const leaderSection = document.getElementById('leaderSection');
const headsSlider = document.getElementById('headsSlider');
const committeesContainer = document.getElementById('committeesContainer');

// Fetch Data
async function fetchMembers() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        localStorage.setItem('members', JSON.stringify(data.data.members)); // Save members to localStorage
        return data.data.members;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Process Data
function organizeMembers(members) {
    const committees = {};
    let leader = null;
    const heads = [];

    members.forEach(member => {
        if (member.role === 'leader') {
            leader = member;
            return;
        }

        if (member.role === 'head') {
            heads.push(member);
            return;
        }

        if (!member.committee) return;
        
        if (!committees[member.committee]) {
            committees[member.committee] = {
                members: []
            };
        }

        committees[member.committee].members.push(member);
    });

    return { leader, heads, committees };
}

// Render Leader
function renderLeader(leader) {
    if (!leader) return;

    leaderSection.innerHTML = `
        <div class="leader-card">
            <img src="${leader.avatar || 'default-avatar.png'}" 
                 class="leader-avatar" 
                 alt="${leader.name}">
            <div class="leader-name">${leader.name}</div>
            <div class="leader-role">General Leader</div>
        </div>
    `;
}

// Render Heads Slider
function renderHeadsSlider(heads) {
    if (!heads.length) return;

    headsSlider.innerHTML = heads
        .map(head => `
            <div class="swiper-slide">
                <img src="${head.avatar || 'default-avatar.png'}" 
                     class="head-avatar" 
                     alt="${head.name}">
                <div class="head-name">${head.name}</div>
                <div class="head-committee">${head.committee}</div>
            </div>
        `)
        .join('');

    const swiper = new Swiper('.swiper', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 3000, // Change slide every 3 seconds
            disableOnInteraction: false,
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 4,
            }
        }
    });

    // Add click event to heads
    document.querySelectorAll('.swiper-slide').forEach((slide, index) => {
        slide.addEventListener('click', () => {
            renderPopup(heads[index]);
        });
    });
}

// Calculate Best Member
function calculateBestMember(members) {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const scoredMembers = members.map(member => {
        // Tasks from tracks
        const trackTasks = member.startedTracks
            ?.flatMap(t => t.courses)
            ?.flatMap(c => c.submittedTasks)
            ?.filter(t => new Date(t.submittedAt) > lastMonth) || [];

        // Standalone tasks
        const standaloneTasks = member.tasks
            ?.filter(t => new Date(t.deadline) > lastMonth) || [];

        const totalScore = [...trackTasks, ...standaloneTasks].reduce((sum, task) => 
            sum + (parseFloat(task.rate) || 0), 0);
        
        return {
            ...member,
            score: totalScore / (trackTasks.length + standaloneTasks.length) || 0,
            tasksCount: trackTasks.length + standaloneTasks.length
        };
    });

    return scoredMembers.sort((a, b) => 
        b.score - a.score || b.tasksCount - a.tasksCount
    )[0];
}

// Render Committees
function renderCommittees(committees) {
    committeesContainer.innerHTML = Object.entries(committees)
        .map(([name, data]) => {
            const bestMember = calculateBestMember(data.members);
            
            return `
                <div class="committee-card">
                    <h2>${name} Committee</h2>
                    
                    ${bestMember ? `
                        <div class="role-section">
                            <h3 class="section-title">Best Member of the Month</h3>
                            <div class="member-card best-member">
                                <img src="${bestMember.avatar || 'default-avatar.png'}" 
                                     class="member-avatar" 
                                     alt="${bestMember.name}">
                                <div class="member-info">
                                    <div class="member-name">${bestMember.name}</div>
                                    <div class="best-badge">
                                        ⭐ ${bestMember.score.to <div class="best-badge">
                        ⭐ ${bestMember.score.toFixed(1)}/5 (${bestMember.tasksCount} tasks)
                    </div>
                                </div>
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;
        })
        .join('');

    addMemberClickEvent();
}

// Render Popup with enhanced task details
function renderPopup(member) {
    const totalScorePercentage = calculateTotalScore(member);
    
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `
        <div class="popup-content ${document.body.classList.contains('dark-mode') ? 'dark-mode' : ''}">
            <button class="popup-close ${document.body.classList.contains('dark-mode') ? 'dark-mode' : ''}">×</button>
            <img src="${member.avatar || 'default-avatar.png'}" 
                 class="leader-avatar" 
                 alt="${member.name}">
            <div class="leader-name">${member.name}</div>
            
            <!-- Track Tasks -->
            <h3 class="section-title">Tasks from Tracks</h3>
            <div class="tasks-list">
                ${renderTrackTasks(member.startedTracks)}
            </div>

            <!-- Standalone Tasks -->
            <h3 class="section-title">Standalone Tasks</h3>
            <div class="tasks-list">
                ${renderStandaloneTasks(member.tasks)}
            </div>

            <!-- Total Score -->
            <div class="total-score">
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${totalScorePercentage}%; background: ${getProgressBarColor(totalScorePercentage)}">
                        <span class="progress-text">${totalScorePercentage}%</span>
                    </div>
                </div>
                <div class="score-summary">
                    Total Score: ${totalScorePercentage}% (${calculateTotalTasks(member)} tasks)
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(popup);

    // Close Popup
    popup.querySelector('.popup-close').addEventListener('click', () => {
        popup.remove();
    });

    // Show Popup
    setTimeout(() => popup.classList.add('active'), 10);
}

// Helper functions
function getProgressBarColor(percentage) {
    if (percentage < 50) return '#ff4757';
    if (percentage < 80) return '#ffa502';
    return '#2ed573';
}

function calculateTotalScore(member) {
    let totalScore = 0;
    let totalTasks = 0;

    if (member.startedTracks) {
        member.startedTracks.forEach(track => {
            track.courses.forEach(course => {
                course.submittedTasks.forEach(task => {
                    totalScore += (parseFloat(task.rate) || 0) * 20;
                    totalTasks++;
                });
            });
        });
    }

    if (member.tasks) {
        member.tasks.forEach(task => {
            totalScore += (parseFloat(task.rate) || 0) * 20;
            totalTasks++;
        });
    }

    return totalTasks > 0 ? Math.round(totalScore / totalTasks) : 0;
}

function calculateTotalTasks(member) {
    let count = 0;
    
    if (member.startedTracks) {
        member.startedTracks.forEach(track => {
            track.courses.forEach(course => {
                count += course.submittedTasks.length;
            });
        });
    }
    
    if (member.tasks) count += member.tasks.length;
    
    return count;
}

function renderTrackTasks(startedTracks) {
    if (!startedTracks || startedTracks.length === 0) return '<p>No tasks from tracks.</p>';

    let tasksHTML = '';
    startedTracks.forEach(track => {
        track.courses.forEach(course => {
            course.submittedTasks.forEach(task => {
                tasksHTML += `
                    <div class="task-item">
                        <div class="task-header">
                            <span class="task-title">${task.task || 'Untitled Task'}</span>
                            <span class="task-max">Max: 5</span>
                        </div>
                        <div class="task-progress">
                            <div class="task-rate" style="width: ${(parseFloat(task.rate)/5*100) || 0}%">
                                ${task.rate || '0'}/5
                            </div>
                        </div>
                    </div>
                `;
            });
        });
    });

    return tasksHTML;
}

function renderStandaloneTasks(tasks) {
    if (!tasks || tasks.length === 0) return '<p>No standalone tasks.</p>';

    return tasks.map(task => `
        <div class="task-item">
            <div class="task-header">
                <span class="task-title">${task.title || 'Untitled Task'}</span>
                <span class="task-max">Max: 5</span>
            </div>
            <div class="task-progress">
                <div class="task-rate" style="width: ${(parseFloat(task.rate)/5*100) || 0}%">
                    ${task.rate || '0'}/5
                </div>
            </div>
        </div>
    `).join('');
}

// Event Listeners
function addMemberClickEvent() {
    document.querySelectorAll('.member-card').forEach(card => {
        card.addEventListener('click', () => {
            const memberName = card.querySelector('.member-name').textContent;
            const members = JSON.parse(localStorage.getItem('members'));
            const member = members.find(m => m.name === memberName);
            if (member) renderPopup(member);
        });
    });
}

// Dark Mode Toggle
document.getElementById('darkModeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    document.getElementById('darkModeToggle').textContent = isDarkMode ? '☀' : '🌙';
});

// Initialize
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    document.getElementById('darkModeToggle').textContent = '☀';
}

async function init() {
    const members = await fetchMembers();
    const { leader, heads, committees } = organizeMembers(members);
    
    renderLeader(leader);
    renderHeadsSlider(heads);
    renderCommittees(committees);
    
    lucide.createIcons();
}

// Start Application
init();



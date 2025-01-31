// API Configuration
const API_URL = 'http://localhost:3000/members/getAllMembers';

// DOM Elements
const leaderSection = document.getElementById('leaderSection');
const headsSlider = document.getElementById('headsSlider');
const committeesContainer = document.getElementById('committeesContainer');

// Fetch Data
async function fetchMembers() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
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

    new Swiper('.swiper', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
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
}

// Calculate Best Member
function calculateBestMember(members) {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const scoredMembers = members.map(member => {
        const submissions = member.startedTracks
            ?.flatMap(t => t.courses)
            ?.flatMap(c => c.submittedTasks)
            ?.filter(t => new Date(t.submittedAt) > lastMonth) || [];

        const totalScore = submissions.reduce((sum, task) => 
            sum + (parseFloat(task.rate) || 0), 0);
        
        return {
            ...member,
            score: submissions.length ? totalScore / submissions.length : 0,
            tasksCount: submissions.length
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
}

// Initialize
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
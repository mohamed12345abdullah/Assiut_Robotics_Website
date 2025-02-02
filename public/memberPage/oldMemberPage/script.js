// API Configuration
const API_URL = 'https://assiut-robotics-zeta.vercel.app/members/getAllMembers';

// DOM Elements
const leaderSection = document.getElementById('leaderSection');
const committeesSlider = document.getElementById('committeesSlider');
const committeesContainer = document.getElementById('committeesContainer');

// Fetch Data
async function fetchMembers() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        localStorage.setItem('members', JSON.stringify(data.data.members));
        return data.data.members;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Organize Members
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
            committees[member.committee] = { members: [] };
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

// Render Committees Slider
function renderCommitteesSlider(heads) {
    if (!heads.length) return;

    committeesSlider.innerHTML = heads
        .map(head => `
            <div class="swiper-slide">
                <img src="${head.avatar || 'default-avatar.png'}" 
                     class="committee-avatar" 
                     alt="${head.name}">
                <div class="committee-name">${head.name}</div>
                <div class="committee-role">${head.committee}</div>
            </div>
        `)
        .join('');

    new Swiper('.swiper', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        pagination: { el: '.swiper-pagination', clickable: true },
        autoplay: { delay: 3000, disableOnInteraction: false },
        breakpoints: {
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 }
        }
    });
}

// Calculate Best Member
function calculateBestMember(members) {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const scoredMembers = members.map(member => {
        const trackTasks = member.startedTracks?.flatMap(t => t.courses)
            ?.flatMap(c => c.submittedTasks)
            ?.filter(t => new Date(t.submittedAt) > lastMonth) || [];

        const standaloneTasks = member.tasks?.filter(t => new Date(t.deadline) > lastMonth) || [];

        const totalScore = [...trackTasks, ...standaloneTasks]
            .reduce((sum, task) => sum + (parseFloat(task.rate) || 0), 0);

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
            const scorePercentage = (bestMember.score / 5) * 100;
            const progressColor = getProgressBarColor(scorePercentage);

            return `
                <div class="committee-card">
                    <h2>${name} Committee</h2>
                    ${bestMember ? `
                        <div class="role-section">
                            <h3 class="section-title">Best Member of the Month</h3>
                            <div class="member-card best-member" style="border-color: ${progressColor};">
                                <img src="${bestMember.avatar || 'default-avatar.png'}" 
                                     class="member-avatar" 
                                     alt="${bestMember.name}">
                                <div class="member-info">
                                    <div class="member-name">${bestMember.name}</div>
                                    <div class="best-badge" style="background: ${progressColor};">
                                        ⭐ ${scorePercentage.toFixed(1)}%
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

// Helper Functions
function getProgressBarColor(percentage) {
    if (percentage < 50) return '#ff4757';
    if (percentage < 80) return '#ffa502';
    return '#2ed573';
}

// Initialize
async function init() {
    const members = await fetchMembers();
    const { leader, heads, committees } = organizeMembers(members);
    renderLeader(leader);
    renderCommitteesSlider(heads);
    renderCommittees(committees);
}

init();
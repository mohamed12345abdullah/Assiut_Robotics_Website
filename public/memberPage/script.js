// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const loadingScreen = document.querySelector('.loading-screen');

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

// Fetch data from API
async function fetchMembers() {
    try {
        const response = await fetch('https://assiut-robotics-zeta.vercel.app/members/getAllMembers');
        const data = await response.json();
        return data.data.members;
    } catch (error) {
        console.error('Error fetching members:', error);
        return [];
    }
}

// Get DOM elements
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.getElementsByClassName('close')[0];

function isPreviousMonth(dateString) {
    // تحويل الـ string إلى كائن Date
    const inputDate = new Date(dateString);
    const today = new Date();

    // الحصول على الشهر والسنة الحالية
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // حساب الشهر والسنة السابقة
    let previousMonth = currentMonth - 1;
    let previousYear = currentYear;

    if (previousMonth < 0) { // لو الشهر الحالي هو يناير
        previousMonth = 11; // ديسمبر
        previousYear--; // السنة السابقة
    }

    // مقارنة سنة وشهر التاريخ المُدخل مع الشهر السابق
    return (inputDate.getFullYear() === previousYear && inputDate.getMonth() === previousMonth);
}




// Close modal when clicking the X
closeBtn.onclick = () => modal.style.display = 'none';

// Close modal when clicking outside
window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Display leader
function displayLeader(members) {
    const leaders = members.filter(member => member.role === 'leader' || member.role==='viceLeader');
    leaders.forEach(leader => {
        if (leader) {
            const leaderContainer = document.getElementById('leader-container');
            const leaderCard = document.createElement('div');
            leaderCard.classList.add('leader-card')
            leaderCard.innerHTML=createMemberCard(leader)
            leaderCard.onclick = () => showMemberDetails(leader);
            leaderContainer.appendChild( leaderCard);
            leaderContainer.classList.add('fade-in');
        } 
    });

}

// Auto-slide functionality
function startAutoSlide(slider, interval = 3000) {
    setInterval(() => {
        const scrollAmount = 320;
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        
        if (slider.scrollLeft >= maxScroll) {
            slider.scrollLeft = 0;
        } else {
            slider.scrollLeft += scrollAmount;
        }
    }, interval);
}

// Display heads in slider
function displayHeads(members) {
    const heads = members.filter(member => member.role === 'head');
    const slider = document.getElementById('heads-slider');
    
    heads.forEach((head, index) => {
        const headCard = document.createElement('div');
        headCard.className = 'member-card';
        headCard.style.flex = '0 0 300px';
        headCard.innerHTML = createMemberCard(head);
        headCard.onclick = () => showMemberDetails(head);
        headCard.style.animation = `fadeIn 0.5s ease-out ${index * 0.1}s`;
        slider.appendChild(headCard);
    });

    // Start auto-sliding
    startAutoSlide(slider);

    // Slider controls
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    prevBtn.onclick = () => {
        slider.scrollLeft -= 320;
    };
    
    nextBtn.onclick = () => {
        slider.scrollLeft += 320;
    };
}

// Calculate scores for different task types
function calculateTaskScores(member) {
    let regularTasks = {
        totalScore: 0,
        totalPoints:0,
        scores: []
    };
    let trackTasks = {
        totalScore: 0,
        totalPoints:0,
        scores: []
    };

    // Regular tasks
    if (member.tasks) {
        member.tasks.forEach(task => {
            if (task.headEvaluation >= 0 && task.hrEvaluation >= 0 && isPreviousMonth(task.submittedAt)) {
                const score = (task.headEvaluation + task.hrEvaluation) / task.points * 100;
                regularTasks.scores.push({
                    title: task.title,
                    score: score
                });
                regularTasks.totalScore += task.headEvaluation+task.hrEvaluation;
                regularTasks.totalPoints += task.points;
            }
        });
        if (regularTasks.scores.length > 0) {
            regularTasks.percent = regularTasks.totalScore / regularTasks.totalPoints;
        }
    }

    // Track tasks
    if (member.startedTracks) {
        member.startedTracks.forEach(track => {
            track.courses.forEach(course => {
                if (course.submittedTasks) {
                    course.submittedTasks.forEach(task => {
                        console.log("previous month ",isPreviousMonth(task.submittedAt));
                        
                        if (task.rate&& isPreviousMonth(task.submittedAt)) {
                            const score = parseFloat(task.rate) ; // Convert to percentage
                            console.log(course);
                            
                            trackTasks.scores.push({
                                title: `Course :  ${course.course.name}  /  task ${task.task.name}`,
                                score: score
                            });
                            trackTasks.totalScore += score;
                            trackTasks.totalPoints += 10;
                        }
                    });
                }
            });
        });
        if (trackTasks.scores.length > 0) {
            trackTasks.percent = trackTasks.totalScore / (trackTasks.totalPoints);
        }
    }

    // Calculate overall average
    // console.log(regularTasks.totalScore);
    
    const totalScores = regularTasks.totalScore + trackTasks.totalScore;
    const totalPoints = regularTasks.totalPoints + trackTasks.totalPoints;
    // console.log("total scores:",totalScores);
    // console.log("total points:",totalPoints);
    
    const overallPercent = totalScores > 0 ? 
        (totalScores) / totalPoints *100 : 0;

    return {
        regularTasks,
        trackTasks,
        overallPercent
    };
}

// Display best members
function displayBestMembers(members) {
    const bestMembersContainer = document.getElementById('best-members-container');
    const committees = [...new Set(members.filter(m => m.committee).map(m => m.committee))];
    
    committees.forEach((committee, index) => {
        const committeeMembers = members.filter(m => m.committee === committee);
        if (committeeMembers.length > 0) {
            const bestMember = committeeMembers.reduce((prev, current) => {
                const prevScores = calculateTaskScores(prev);
                const currentScores = calculateTaskScores(current);
                return prevScores.overallPercent > currentScores.overallPercent ? prev : current;
            });

            const scores = calculateTaskScores(bestMember);
            const memberCard = document.createElement('div');
            memberCard.className = 'member-card';
            memberCard.style.animation = `fadeIn 0.5s ease-out ${index * 0.1}s`;
            memberCard.innerHTML = `
                <h3>${committee}</h3>
                ${createMemberCard(bestMember)}
                <div class="progress-bar">
                    <div class="progress" style="width: ${scores.overallPercent}%"></div>
                </div>
                <p class="score-text">${scores.overallPercent.toFixed(1)}%</p>
            `;
            memberCard.onclick = () => showMemberDetails(bestMember, true);
            bestMembersContainer.appendChild(memberCard);
        }
    });

    // Start auto-sliding for best members if there are many
    const container = document.getElementById('best-members-container');
    if (container.scrollWidth > container.clientWidth) {
        startAutoSlide(container);
    }
}

// Display committee members
function displayCommitteeMembers(members) {
    const container = document.getElementById('committee-members-container');
    const committees = [...new Set(members.filter(m => m.committee).map(m => m.committee))];
    
    committees.forEach((committee, index) => {
        const committeeMembers = members.filter(m => m.committee === committee);
        if (committeeMembers.length > 0) {
            const section = document.createElement('div');
            section.className = 'committee-section';
            section.style.animation = `fadeIn 0.5s ease-out ${index * 0.1}s`;
            section.innerHTML = `
                <h3 class="committee-title">${committee}</h3>
                <div class="committee-grid">
                    ${committeeMembers.map(member => `
                        <div class="member-card" onclick="showMemberDetails(${JSON.stringify(member).replace(/"/g, '&quot;')})">
                            ${createMemberCard(member)}
                        </div>
                    `).join('')}
                </div>
            `;
            container.appendChild(section);
        }
    });
}

// Create member card HTML
function createMemberCard(member) {
    return `
        <img onclick='showMemberDetails(${member,false})' src="${member.avatar}" alt="${member.name}" class="member-avatar">
        <h3>${member.name}</h3>
        <p class="role">${member.role}</p>
        ${member.committee ? `<p class="committee">Committee: ${member.committee}</p>` : ''}
    `;
}

// Show member details in modal
function showMemberDetails(member, showScore = true) {
    let content = `
        <div class="modal-member-info">
            <img src="${member.avatar}" alt="${member.name}" class="member-avatar">
            <h2>${member.name}</h2>
            <p>Role: ${member.role}</p>
            ${member.committee ? `<p>Committee: ${member.committee}</p>` : ''}
        </div>
    `;

    if (showScore) {
        const scores = calculateTaskScores(member);
        // console.log("scores",scores);
        
        content += `
            <div class="scores-section">
                <h3>Overall Performance</h3>
                <div class="progress-bar">
                    <div class="progress" style="width: ${scores.overallPercent}%"></div>
                </div>
                <p class="score-text">Overall Score: ${scores.overallPercent}%</p>

                ${scores.regularTasks.scores.length > 0 ? `
                    <h3>Regular Tasks</h3>
                    <div class="tasks-list">
                        ${scores.regularTasks.scores.map(task => `
                            <div class="task-item">
                                <p>${task.title}</p>
                                <div class="progress-bar">
                                    <div class="progress" style="width: ${task.score}%"></div>
                                </div>
                                <span class="score-text">${task.score.toFixed(1)}%</span>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                ${scores.trackTasks.scores.length > 0 ? `
                    <h3>Track Tasks</h3>
                    <div class="tasks-list">
                        ${scores.trackTasks.scores.map(task => `
                            <div class="task-item">
                                <p>${task.title}</p>
                                <div class="progress-bar">
                                    <div class="progress" style="width: ${task.score*10}%"></div>
                                </div>
                                <span class="score-text">${task.score.toFixed(1)*10}%</span>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }

    modalBody.innerHTML = content;
    modal.style.display = 'block';
}

// Initialize the page
async function initializePage() {
    loadingScreen.style.display = 'flex';
    try {
        const members = await fetchMembers();
        displayLeader(members);
        displayHeads(members);
        displayBestMembers(members);
        displayCommitteeMembers(members);
    } catch (error) {
        console.error('Error initializing page:', error);
    } finally {
        loadingScreen.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', initializePage);
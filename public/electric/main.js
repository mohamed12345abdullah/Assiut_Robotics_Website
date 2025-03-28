// Track data
const trackData = {
    'All Tracks': [
        { rank: 1, name: "Alex Johnson", track: "ROS & Raspberry", points: 2150 },
        { rank: 2, name: "Sarah Chen", track: "Computer Vision", points: 2080 },
        { rank: 3, name: "Michael Brown", track: "Embedded", points: 1950 },
        { rank: 4, name: "Emma Davis", track: "Hardware", points: 1900 },
        { rank: 5, name: "James Wilson", track: "ROS & Raspberry", points: 1850 },
        { rank: 6, name: "Linda Garcia", track: "Computer Vision", points: 1800 },
        { rank: 7, name: "David Lee", track: "Embedded", points: 1750 },
        { rank: 8, name: "Sophie Taylor", track: "Hardware", points: 1700 }
    ],
    'Hardware': [
        { rank: 1, name: "Emma Davis", track: "Hardware", points: 1900 },
        { rank: 2, name: "Sophie Taylor", track: "Hardware", points: 1700 },
        { rank: 3, name: "Ryan Murphy", track: "Hardware", points: 1650 },
        { rank: 4, name: "Alice Cooper", track: "Hardware", points: 1600 }
    ],
    'Computer Vision': [
        { rank: 1, name: "Sarah Chen", track: "Computer Vision", points: 2080 },
        { rank: 2, name: "Linda Garcia", track: "Computer Vision", points: 1800 },
        { rank: 3, name: "Tom Anderson", track: "Computer Vision", points: 1650 },
        { rank: 4, name: "Nina Patel", track: "Computer Vision", points: 1550 }
    ],
    'ROS & Raspberry': [
        { rank: 1, name: "Alex Johnson", track: "ROS & Raspberry", points: 2150 },
        { rank: 2, name: "James Wilson", track: "ROS & Raspberry", points: 1850 },
        { rank: 3, name: "Maria Rodriguez", track: "ROS & Raspberry", points: 1700 },
        { rank: 4, name: "Chris Evans", track: "ROS & Raspberry", points: 1600 }
    ],
    'Embedded': [
        { rank: 1, name: "Michael Brown", track: "Embedded", points: 1950 },
        { rank: 2, name: "David Lee", track: "Embedded", points: 1750 },
        { rank: 3, name: "Lisa Wang", track: "Embedded", points: 1650 },
        { rank: 4, name: "Kevin Smith", track: "Embedded", points: 1600 }
    ]
};

const teamData = {
    mainTeam: [
        {
            name: "John Smith",
            role: "Technical Lead, Robotics & AI",
            department: "Department of Robotics and Automation",
            image: "https://picsum.photos/150/150?random=1"
        },
        {
            name: "Emily Chen",
            role: "Lead Software Engineer",
            department: "Department of Computer Science",
            image: "https://picsum.photos/150/150?random=2"
        },
        {
            name: "David Wilson",
            role: "Hardware Systems Expert",
            department: "Department of Electronic Engineering",
            image: "https://picsum.photos/150/150?random=3"
        }
    ],
    assistantTeam: [
        {
            name: "Mark Johnson",
            role: "Computer Vision Specialist",
            department: "Department of AI and Machine Learning",
            image: "https://picsum.photos/150/150?random=4"
        },
        {
            name: "Sarah Davis",
            role: "ROS Developer",
            department: "Department of Robotics",
            image: "https://picsum.photos/150/150?random=5"
        },
        {
            name: "Michael Lee",
            role: "Embedded Systems Engineer",
            department: "Department of Electronics",
            image: "https://picsum.photos/150/150?random=6"
        }
    ],
    hrTeam: [
        {
            name: "Jessica Brown",
            role: "HR Manager",
            department: "Human Resources Department",
            image: "https://picsum.photos/150/150?random=7"
        },
        {
            name: "Robert Taylor",
            role: "HR Coordinator",
            department: "Human Resources Department",
            image: "https://picsum.photos/150/150?random=8"
        }
    ]
};

// Render leaderboard with animation
function renderLeaderboard(trackName = 'All Tracks') {
    const leaderboardList = document.getElementById('leaderboardList');
    leaderboardList.style.opacity = '0';
    
    setTimeout(() => {
        leaderboardList.innerHTML = trackData[trackName].map(item => `
            <div class="leaderboard-item">
                <span>#${item.rank}</span>
                <span>${item.name}</span>
                <span>${item.track}</span>
                <span>${item.points} pts</span>
            </div>
        `).join('');
        
        leaderboardList.style.opacity = '1';
    }, 300);
}

// Render team sections with animation
function renderTeam(teamArray, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = teamArray.map(member => `
        <div class="team-card">
            <img src="${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.role}</p>
            <p>${member.department}</p>
        </div>
    `).join('');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderLeaderboard();
    renderTeam(teamData.mainTeam, 'mainTeam');
    renderTeam(teamData.assistantTeam, 'assistantTeam');
    renderTeam(teamData.hrTeam, 'hrTeam');

    // Track filter functionality with animation
    const filterButtons = document.querySelectorAll('.track-filters button');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderLeaderboard(button.textContent);
        });
    });

    // Add animation to track cards
    const trackCards = document.querySelectorAll('.track-card');
    trackCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add animation to team cards
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});
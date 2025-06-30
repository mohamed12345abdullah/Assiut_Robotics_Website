var home = document.getElementById("home");
var track = document.getElementById("track");
var courseContainer = document.getElementById("course");
var header = document.getElementById("header")
var backward_BTN = `<div><button onclick = "window.history.back()" class ="backward" > <i class="fa-solid fa-angle-left " style="color: #FFD43B;" ></i> </button></div>`

// backend api
const backendUrl = "https://assiut-robotics-zeta.vercel.app/";
//  =================  

async function fetchTracks() {
    try {
        const response = await fetch(`${backendUrl}/electric/getAllTracks`);
        const res = await response.json();
        if (!response.ok) {
            throw new Error('Failed to fetch tracks', response.message);
        }
        return res.data;
    } catch (error) {
        console.error('Error fetching tracks:', error.message);
        return [];
    }
}


// dummy data
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

// ===============
// كل الداتا في object واحد
const electricData = {
    tracks: [
        {
          name: "Embedded",
          icon: "<i class='fa fa-microchip'></i>",
          description: "كل ما يخص الأنظمة المدمجة.",
          courses: [
            {
              name: "Intro to Embedded",
              description: "مقدمة عن الأنظمة المدمجة.",
              tasks: [
                {
                  name: "Blink LED",
                  description: "برمجة دائرة لجعل LED تضيء وتطفئ.",
                  link: "https://example.com/blink",
                  submitLink: "https://forms.gle/submit-blink",
                  deadline: "2024-08-10"
                },
                {
                  name: "Blink LED",
                  description: "برمجة دائرة لجعل LED تضيء وتطفئ.",
                  link: "https://example.com/blink",
                  submitLink: "https://forms.gle/submit-blink",
                  deadline: "2024-07-15"
                },
                {
                  name: "Blink LED",
                  description: "برمجة دائرة لجعل LED تضيء وتطفئ.",
                  link: "https://example.com/blink",
                  submitLink: "https://forms.gle/submit-blink",
                  deadline: "2024-07-20"
                },
                // ... باقي التاسكات كما هي
              ]
            },
            {
              name: "Intro to Embedded",
              description: "مقدمة عن الأنظمة المدمجة.",
              tasks: [
                {
                  name: "Blink LED",
                  description: "برمجة دائرة لجعل LED تضيء وتطفئ.",
                  link: "https://example.com/blink",
                  submitLink: "https://forms.gle/submit-blink",
                  deadline: "2024-07-10"
                },
                {
                  name: "Blink LED",
                  description: "برمجة دائرة لجعل LED تضيء وتطفئ.",
                  link: "https://example.com/blink",
                  submitLink: "https://forms.gle/submit-blink",
                  deadline: "2024-07-15"
                },
                {
                  name: "Blink LED",
                  description: "برمجة دائرة لجعل LED تضيء وتطفئ.",
                  link: "https://example.com/blink",
                  submitLink: "https://forms.gle/submit-blink",
                  deadline: "2024-07-20"
                },
                // ... باقي التاسكات كما هي
              ]
            },
            {
              name: "Intro to Embedded",
              description: "مقدمة عن الأنظمة المدمجة.",
              tasks: [
                {
                  name: "Blink LED",
                  description: "برمجة دائرة لجعل LED تضيء وتطفئ.",
                  link: "https://example.com/blink",
                  submitLink: "https://forms.gle/submit-blink",
                  deadline: "2024-07-10"
                },
                {
                  name: "Blink LED",
                  description: "برمجة دائرة لجعل LED تضيء وتطفئ.",
                  link: "https://example.com/blink",
                  submitLink: "https://forms.gle/submit-blink",
                  deadline: "2024-07-15"
                },
                {
                  name: "Blink LED",
                  description: "برمجة دائرة لجعل LED تضيء وتطفئ.",
                  link: "https://example.com/blink",
                  submitLink: "https://forms.gle/submit-blink",
                  deadline: "2024-08-20"
                },
                
                // ... المزيد من التاسكات
              ]
            },
            
            // ... المزيد من الكورسات
          ]
        },
        {
          name: "Hardware",
          icon: "<i class='fa fa-cogs'></i>",
          description: "كل ما يخص الهاردوير.",
          courses: [
            // ... كورسات وتاسكات
          ]
        }
        // ... المزيد من التراكات
    ],         // هتحط فيه التراكات
    teamData: {
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
    },
    trackData: {
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
    }
};

// Render leaderboard with animation
function renderLeaderboard(trackName = 'All Tracks', trackData) {
    console.log("rendering Leaderboard");
    
    const leaderboardList = document.getElementById('leaderboardList');
    leaderboardList.style.opacity = '0';
    setTimeout(() => {
        leaderboardList.innerHTML = (trackData[trackName] || []).map(item => `
            <div class="leaderboard-item">
                <span>#${item.rank}</span>
                <span>${item.name}</span>
                <span>${item.track}</span>
                <span>${item.points} pts</span>
            </div>
        `).join('');
        leaderboardList.style.opacity = '1';
    }, 300);
    console.log("finished from rendering Leaderboard");
}

// Render team sections with animation
function renderTeam(teamArray, containerId) {
    console.log("rendering team");
    const container = document.getElementById(containerId);
    container.innerHTML = teamArray.map(member => `
        <div class="team-card">
            <img src="${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.role}</p>
            <p>${member.department}</p>
        </div>
    `).join('');
    console.log("finished from rendering team");
}

function goHome(){
    home.classList.remove("disabled");
    header.classList.remove("disabled");
    track.classList.add("disabled");
    courseContainer.classList.add("disabled");
    history.pushState(null, '', '');
}


function renderTracks(tracks){
    console.log("rendering tracks in  home page");
    
    var tracksCards = document.getElementsByClassName("tracks")[0];
    tracksCards.innerHTML += tracks.map(track => {
        return `
             <div class="track-card" onClick="tapSwitching(this)" id="${track.name}">
                <div class="track-icon">${track.icon}</div>
                <h3>${track.name}</h3>
                <p>${track.description}</p>
            </div>
        `
    }).join('');
    console.log("finished rendering tracks");
    
}

let currentTrack = null;
function tapSwitching(e){
    currentTrack = e.id;
    renderTrack(electricData.tracks, currentTrack, track)
    home.classList.add("disabled");
    header.classList.add("disabled");
    track.classList.remove("disabled");
    courseContainer.classList.add("disabled");
    // سجل الحالة في history
    history.pushState({view: 'track', trackName: currentTrack}, '', '');
}

function renderTrack(tracks, trackName, trackContainer){
    let track = tracks.find(track => track.name === trackName);
    if (!track || !Array.isArray(track.courses)) {
        trackContainer.innerHTML = "<p>No courses found for this track.</p>";
        return;
    }
    // تفاصيل التراك


    let trackDetails =
    
    `
        <div class="track-details">
            <div class="track-icon">${track.icon || ""}</div>
            <h2>${track.name}</h2>
            <p>${track.description || ""}</p>
        </div>
    `;

    // الكورسات
    let coursesHtml = track.courses.map(course => `
        <div class="course-card" onclick="tasksRendering(this)" id="${course.name}">
            <h3>${course.name}</h3>
            <p>${course.description}</p>
        </div>
    `).join(' ');

    trackContainer.innerHTML = `
        ${backward_BTN}
        ${trackDetails}
        <section class="courses">
            ${coursesHtml}
        </section>
    `;
}

// add tasks rendering

function tasksRendering(e) {
    let courseName = e.id;
    let trackObj = electricData.tracks.find(t => t.name === currentTrack);
    if (!trackObj) return;
    let course = trackObj.courses.find(c => c.name === courseName);
    track.classList.add("disabled");
    header.classList.add("disabled");
    courseContainer.classList.remove("disabled");
    renderCourse(course, courseContainer);
    // سجل الحالة في history
    history.pushState({view: 'course', trackName: currentTrack, courseName: courseName}, '', '');
}

function renderCourse(course, courseContainer) {
    if (!course) {
        courseContainer.innerHTML = "<p>No course details found.</p>";
        return;
    }
    let tasksHtml = "";
    if (Array.isArray(course.tasks) && course.tasks.length > 0) {
        tasksHtml = course.tasks.map(task => {
            let deadlineDate = task.deadline ? new Date(task.deadline) : null;
            let today = new Date();
            let daysLeft = deadlineDate ? Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24)) : null;
            let deadlineHtml = '';
            if (deadlineDate) {
                deadlineHtml = `<div class="deadline-info" style="margin:8px 0 8px 0;padding:6px 12px;background:#f8f9fa;border-radius:6px;display:inline-block;font-size:15px;">
                    <span style='font-weight:bold;color:#d9534f;'>Deadline:</span>
                    <span style='color:#333;'>${deadlineDate.toLocaleDateString()}</span>
                    <span style='margin-right:10px;color:#007bff;'>
                        (${daysLeft > 0 ? daysLeft + ' يوم متبقي' : daysLeft === 0 ? 'اليوم!' : 'انتهى الموعد'})
                    </span>
                </div>`;
            }
            return `
                <div class="task-block">
                    <h4>${task.name}</h4>
                    <p>${task.description}</p>
                    ${deadlineHtml}
                    <div class = "links">
                        <a href="${task.link}" target="_blank">رابط التاسك</a> 
                        <a href="${task.submitLink}" target="_blank">رابط التسليم</a>
                    </div>
                </div>
            `;
        }).join('');
    } else {
        tasksHtml = "<p>No tasks for this course.</p>";
    }

    courseContainer.innerHTML = `
        ${backward_BTN}
        <div class="course-details">
            <h2>${course.name}</h2>
            <p>${course.description}</p>
            <div class="tasks-list">
                ${tasksHtml}
            </div>
        </div>
    `;
}


// nitialize the page
document.addEventListener('DOMContentLoaded', () => {
    // مثال تعبئة الداتا (ممكن تجيبها من API)
    // electricData.tracks = [...];
    // electricData.teamData = {...};
    // electricData.trackData = {...};
    renderLeaderboard('All Tracks', electricData.trackData);
    renderTeam(electricData.teamData.mainTeam, 'mainTeam');
    renderTeam(electricData.teamData.assistantTeam, 'assistantTeam');
    renderTeam(electricData.teamData.hrTeam, 'hrTeam');
    renderTracks(electricData.tracks)
    // Track filter functionality with animation
    const filterButtons = document.querySelectorAll('.track-filters button');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderLeaderboard(button.textContent, electricData.trackData);
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

// دعم زر الرجوع في المتصفح
window.addEventListener('popstate', (event) => {
    if (event.state) {
        if (event.state.view === 'track') {
            // اعرض التراك
            currentTrack = event.state.trackName;
            renderTrack(electricData.tracks, currentTrack, track);
            home.classList.add("disabled");
            track.classList.remove("disabled");
            courseContainer.classList.add("disabled");
            header.classList.add("disabled")
        } else if (event.state.view === 'course') {
            // اعرض الكورس
            currentTrack = event.state.trackName;
            let trackObj = electricData.tracks.find(t => t.name === event.state.trackName);
            let course = trackObj ? trackObj.courses.find(c => c.name === event.state.courseName) : null;
            renderCourse(course, courseContainer);
            home.classList.add("disabled");
            track.classList.add("disabled");
            courseContainer.classList.remove("disabled");
            header.classList.add("disabled")
        }
    } else {
        // الحالة الافتراضية (الصفحة الرئيسية)
        home.classList.remove("disabled");
        header.classList.remove("disabled");
        track.classList.add("disabled");
        courseContainer.classList.add("disabled");
    }
});
// Sample data for testing
const DEMO_DATA = {
  tracks: [
    { id: '1', name: 'Web Development', icon: 'web' },
    { id: '2', name: 'Embedded Systems', icon: 'embedded' },
    { id: '3', name: 'Mobile Development', icon: 'default' }
  ],
  courses: {
    '1': [
      { id: '101', name: 'HTML & CSS Fundamentals' },
      { id: '102', name: 'JavaScript Basics' },
      { id: '103', name: 'React Development' }
    ],
    '2': [
      { id: '201', name: 'Arduino Programming' },
      { id: '202', name: 'Raspberry Pi Projects' },
      { id: '203', name: 'IoT Fundamentals' }
    ],
    '3': [
      { id: '301', name: 'Android Development' },
      { id: '302', name: 'iOS Development' },
      { id: '303', name: 'Flutter & Dart' }
    ]
  },
  tasks: {
    '101': [
      {
        id: '1001',
        name: 'Build a Portfolio Website',
        description: 'Create a personal portfolio website using HTML and CSS. Include an about section, projects section, and contact form.',
        estimatedTime: '4 hours',
        score: 100,
        dataLink: '#',
        submissionLink: '#'
      },
      {
        id: '1002',
        name: 'Responsive Landing Page',
        description: 'Design and build a responsive landing page for a fictional product using flexbox and grid.',
        estimatedTime: '3 hours',
        score: 80,
        dataLink: '#',
        submissionLink: '#'
      }
    ],
    '102': [
      {
        id: '2001',
        name: 'Interactive Form Validation',
        description: 'Build a form with client-side validation using JavaScript. Include email, password, and custom field validations.',
        estimatedTime: '2 hours',
        score: 60,
        dataLink: '#',
        submissionLink: '#'
      }
    ]
  }
};





// Global variable for server URL
const serverUrl = 'http://localhost:3000/Tracks/api'; // Replace with your server URL
// https://assiut-robotics-zeta.vercel.app/members/verify
// State management
// API Functions
async function getTracks() {
  try {
    const response = await fetch(`${serverUrl}/getAllTracks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
      
      const jsonResponse= await response.json();
      console.log(jsonResponse.data);
      return jsonResponse.data;
      
  } catch (error) {
    console.error('Error fetching tracks:', error.message);
  }
}

async function getCourses(trackId) {
  try {
    const response = await fetch(`${serverUrl}/getCourses/${trackId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // init()
    const jsonResponse=await response.json();
    console.log(jsonResponse.data);
    return jsonResponse.data;
    
  } catch (error) {
    console.error('Error fetching courses:', error);
  }
}

async function getTasks(trackId,courseId) {
  try {
    const response = await fetch(`${serverUrl}/course/${trackId}/${courseId}/tasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const jsonResponse=await response.json();
    console.log(jsonResponse);
    return jsonResponse.data;
    
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}

async function addCourse(event,courseId) {
  event.stopPropagation();
    console.log("add course function ",courseId);
const data={
    trackId:currentTrackId,
    courseId
}
const token='berear '+window.localStorage.getItem('token')
    try {
      const response = await fetch(`https://assiut-robotics-zeta.vercel.app/members/joinCourse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization':token
        },
        body:JSON.stringify(data)
      });
      const jsonResponse=await response.json();
      console.log(jsonResponse);
      return jsonResponse.data;
      
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }  
    
}


// State management
let currentView = 'tracks';
let tracks = [];
let selectedTrack = null;
let selectedCourse = null;
let currentTrackId;

// Mock API endpoints for testing
const API = {
  getTracks: async() => await getTracks(),
  getCourses: async(trackId) => await getCourses(trackId) || [],
  getTasks: async(trackId,courseId) =>await getTasks(trackId,courseId)|| []
};

// DOM Elements
const loading = document.getElementById('loading');
const cardsContainer = document.getElementById('cards-container');
const modal = document.getElementById('task-modal');
const tracksNav = document.getElementById('tracks-nav');
const trackNav = document.getElementById('track-nav');
const courseNav = document.getElementById('course-nav');
const trackSeparator = document.getElementById('track-separator');
const courseSeparator = document.getElementById('course-separator');

// Initialize Lucide icons
lucide.createIcons();

// Navigation handlers
tracksNav.addEventListener('click', () => {
  currentView = 'tracks';
  selectedTrack = null;
  selectedCourse = null;
  updateNavigation();
  renderTracks();
});

// Show/hide loading spinner
const showLoading = () => loading.style.display = 'flex';
const hideLoading = () => loading.style.display = 'none';

// Update navigation breadcrumbs
function updateNavigation() {
  tracksNav.classList.toggle('active', currentView === 'tracks');
  trackNav.style.display = selectedTrack ? 'inline' : 'none';
  trackSeparator.style.display = selectedTrack ? 'inline' : 'none';
  courseNav.style.display = selectedCourse ? 'inline' : 'none';
  courseSeparator.style.display = selectedCourse ? 'inline' : 'none';

  if (selectedTrack) {
    trackNav.textContent = selectedTrack.name;
    trackNav.classList.toggle('active', currentView === 'courses');
  }
  
  if (selectedCourse) {
    courseNav.textContent = selectedCourse.name;
    courseNav.classList.toggle('active', currentView === 'tasks');
  }
}

// Render track cards
function renderTracks() {
  cardsContainer.innerHTML = tracks.map(track => `
    <div class="card" onclick="handleTrackClick('${track._id}')">
      <div class="card-header">
        <div class="card-icon">
          <i data-lucide="${track.icon === 'web' ? 'globe' : track.icon === 'embedded' ? 'cpu' : 'code-2'}"></i>
        </div>
        <h3 class="card-title">${track.name}</h3>
      </div>
    </div>
  `).join('');
  lucide.createIcons();
}

// Render course cards
function renderCourses(courses) {
  cardsContainer.innerHTML = courses.map(course => `
    <div class="card" onclick="handleCourseClick('${course._id}')">
      <div class="card-header">
        <div class="card-icon">
          <i data-lucide="book-open"></i>
        </div>
        <h3 class="card-title">${course.name}</h3>
       
        <label onclick="addCourse(event,'${course._id}')"> 
          <div class="meta-item">
            <i data-lucide="circle-play"></i>
            <span>start course </span>
          </div>
        </label>
      </div>
    </div>
  `).join('');
  lucide.createIcons();
}

// Render task cards
function renderTasks(tasks) {
  cardsContainer.innerHTML = tasks.map(task => `
    <div class="card" onclick="handleTaskClick(${JSON.stringify(task).replace(/"/g, '&quot;')})">
      <div class="card-header">
        <h3 class="card-title">${task.name}</h3>
      </div>
      <div class="card-meta">
        <div class="meta-item">
          <i data-lucide="clock"></i>
          <span>${task.time}</span>
        </div>
        <div class="meta-item">
          <i data-lucide="star"></i>
          <span>${task.score} points</span>
        </div>

      </div>
    </div>
  `).join('');
  lucide.createIcons();
}

// Click handlers
async function handleTrackClick(trackId) {
  showLoading();
  try {
    currentTrackId=trackId;
    const courses = await API.getCourses(trackId);
    selectedTrack = tracks.find(t => t._id === trackId);
    selectedTrack.courses = courses;
    selectedCourse = null;
    currentView = 'courses';
    updateNavigation();
    renderCourses(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
  } finally {
    hideLoading();
  }
}

async function handleCourseClick(courseId) {
  showLoading();
  try {
    const tasks = await API.getTasks(currentTrackId,courseId);
    selectedCourse = selectedTrack.courses.find(c => c._id === courseId);
    selectedCourse.tasks = tasks;
    currentView = 'tasks';
    updateNavigation();
    renderTasks(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
  } finally {
    hideLoading();
  }
}

function handleTaskClick(task) {
  document.getElementById('modal-title').textContent = task.name;
  document.getElementById('modal-description').textContent = task.description;
  document.getElementById('modal-time').textContent = task.time;
  document.getElementById('modal-score').textContent = `${task.score} points`;
  document.getElementById('modal-materials').href = task.materialLink;
  document.getElementById('modal-submit').href = task.submissionLink;
  modal.classList.add('active');
}

// Modal close handlers
modal.querySelector('.close-button').addEventListener('click', () => {
  modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});

// Initial load
async function init() {
  showLoading();
  try {
    tracks = await API.getTracks();
    renderTracks();
  } catch (error) {
    console.error('Error fetching tracks:', error);
  } finally {
    hideLoading();
  }
}

init();
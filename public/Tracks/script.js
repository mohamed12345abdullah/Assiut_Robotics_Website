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

// State management
let currentView = 'tracks';
let tracks = [];
let selectedTrack = null;
let selectedCourse = null;

// Mock API endpoints for testing
const API = {
  getTracks: () => Promise.resolve(DEMO_DATA.tracks),
  getCourses: (trackId) => Promise.resolve(DEMO_DATA.courses[trackId] || []),
  getTasks: (courseId) => Promise.resolve(DEMO_DATA.tasks[courseId] || [])
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
    <div class="card" onclick="handleTrackClick('${track.id}')">
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
    <div class="card" onclick="handleCourseClick('${course.id}')">
      <div class="card-header">
        <div class="card-icon">
          <i data-lucide="book-open"></i>
        </div>
        <h3 class="card-title">${course.name}</h3>
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
          <span>${task.estimatedTime}</span>
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
    const courses = await API.getCourses(trackId);
    selectedTrack = tracks.find(t => t.id === trackId);
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
    const tasks = await API.getTasks(courseId);
    selectedCourse = selectedTrack.courses.find(c => c.id === courseId);
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
  document.getElementById('modal-time').textContent = task.estimatedTime;
  document.getElementById('modal-score').textContent = `${task.score} points`;
  document.getElementById('modal-materials').href = task.dataLink;
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
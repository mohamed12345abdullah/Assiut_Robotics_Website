// Global variable for server URL
const serverUrl = 'https://assiut-robotics-zeta.vercel.app/Tracks/api';

// State management
let tracks = [];
let courses = {};
let tasks = {};
let currentTrackId;
let currentCourseId;

// DOM Elements
const trackSection = document.getElementById('tracks-section');
const courseSection = document.getElementById('courses-section');
const taskSection = document.getElementById('tasks-section');
const tabButtons = document.querySelectorAll('.tab-button');
const trackModal = document.getElementById('track-modal');
const courseModal = document.getElementById('course-modal');
const taskModal = document.getElementById('task-modal');
const membersModal = document.getElementById('members-modal');

// Initialize Lucide icons
lucide.createIcons();

// Tab switching
tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tabName = button.dataset.tab;
    
    // Update active tab button
    tabButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    // Update active section
    document.querySelectorAll('.admin-section').forEach(section => {
      section.classList.remove('active');
    });
    document.getElementById(`${tabName}-section`).classList.add('active');
  });
});

// API Functions
async function getTracks() {
  try {
    const response = await fetch(`${serverUrl}/getAllTracks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const jsonResponse = await response.json();
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
    const jsonResponse = await response.json();
    return jsonResponse.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
  }
}

async function getTasks(trackId, courseId) {
  try {
    const response = await fetch(`${serverUrl}/course/${trackId}/${courseId}/tasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const jsonResponse = await response.json();
    return jsonResponse.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}

async function getCourseMembers(courseId) {
  try {
    const response = await fetch(`https://assiut-robotics-zeta.vercel.app/members/getMembersJoinedCourse/${courseId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const jsonResponse = await response.json();
    return jsonResponse.members;
  } catch (error) {
    console.error('Error fetching course members:', error);
    return [];
  }
}

async function addTrack(trackData) {
  try {
    const response = await fetch(`${serverUrl}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trackData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error adding track:', error);
  }
}

async function addCourse(trackId, courseData) {
  try {
    const response = await fetch(`${serverUrl}/${trackId}/course/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error adding course:', error);
  }
}

async function addTask(trackId, courseId, taskData) {
  try {
    const response = await fetch(`${serverUrl}/${trackId}/course/${courseId}/task/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error adding task:', error);
  }
}

async function editTrack(id, trackData) {
  try {
    await fetch(`${serverUrl}/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trackData),
    });
    init();
  } catch (error) {
    console.error('Error editing track:', error);
  }
}

async function editCourse(trackId, courseId, courseData) {
  try {
    await fetch(`${serverUrl}/${trackId}/course/update/${courseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseData),
    });
  } catch (error) {
    console.error('Error editing course:', error);
  }
}

async function editTaskApi(trackId, courseId, taskId, taskData) {
  try {
    await fetch(`${serverUrl}/${trackId}/course/${courseId}/task/update/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
  } catch (error) {
    console.error('Error editing task:', error);
  }
}

async function deleteTrack(id) {
  try {
    await fetch(`${serverUrl}/delete/${id}`, {
      method: 'DELETE',
    });
    init();
  } catch (error) {
    console.error('Error deleting track:', error);
  }
}

async function deleteCourse(trackId, courseId) {
  try {
    await fetch(`${serverUrl}/${trackId}/course/delete/${courseId}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Error deleting course:', error);
  }
}

async function deleteTask(trackId, courseId, taskId) {
  try {
    await fetch(`${serverUrl}/${trackId}/course/${courseId}/task/delete/${taskId}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Error deleting task:', error);
  }
}

// Render functions
async function renderTracks() {
  const grid = document.getElementById('tracks-grid');
  grid.innerHTML = tracks.map(track => `
    <div class="admin-card">
      <div class="admin-card-header">
        <h3 class="admin-card-title">${track.name}</h3>
        <div class="admin-card-actions">
          <button class="action-button edit-button" onclick="editTrack('${track._id}')">
            <i data-lucide="edit"></i>
          </button>
          <button class="action-button delete-button" onclick="deleteTrack('${track._id}')">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      </div>
      <div class="card-icon">
        <i data-lucide="${track.icon === 'web' ? 'globe' : track.icon === 'embedded' ? 'cpu' : 'code-2'}"></i>
      </div>
    </div>
  `).join('');
  lucide.createIcons();
}

async function renderCourses(trackId) {
  const grid = document.getElementById('courses-grid');
  const trackCourses = courses[trackId] || [];

  const coursesWithMembers = await Promise.all(trackCourses.map(async course => {
    const members = await getCourseMembers(course._id);
    return { ...course, membersCount: members.length };
  }));

  grid.innerHTML = coursesWithMembers.map(course => `
    <div class="admin-card">
      <div class="admin-card-header">
        <h3 class="admin-card-title">${course.name}</h3>
        <div class="admin-card-actions">
          <button class="action-button view-button" onclick="viewCourseMembers('${course._id}')">
            <i data-lucide="users"></i>
            <span>${course.membersCount} members</span>
          </button>
          <button class="action-button edit-button" onclick="editCourse('${course._id}')">
            <i data-lucide="edit"></i>
          </button>
          <button class="action-button delete-button" onclick="deleteCourse('${course._id}')">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
  lucide.createIcons();
}

async function renderTasks(trackId, courseId) {
  const grid = document.getElementById('tasks-grid');
  const courseTasks = await getTasks(trackId, courseId);

  grid.innerHTML = courseTasks.map(task => `
    <div class="admin-card">
      <div class="admin-card-header">
        <h3 class="admin-card-title">${task.name}</h3>
        <div class="admin-card-actions">
          <button class="action-button edit-button" onclick="editTask('${task._id}')">
            <i data-lucide="edit"></i>
          </button>
          <button class="action-button delete-button" onclick="deleteTask('${task._id}')">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      </div>
      <div class="task-meta">
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

// Update selectors
function updateTrackSelectors() {
  const courseTrackSelect = document.getElementById('course-track-select');
  const taskTrackSelect = document.getElementById('task-track-select');
  
  const trackOptions = tracks.map(track => 
    `<option value="${track._id}">${track.name}</option>`
  ).join('');
  
  courseTrackSelect.innerHTML = '<option value="">Select a track...</option>' + trackOptions;
  taskTrackSelect.innerHTML = '<option value="">Select a track...</option>' + trackOptions;
}

// Load data based on selections
async function loadTrackCourses() {
  const trackId = document.getElementById('course-track-select').value;
  if (!trackId) return;
  
  currentTrackId = trackId;
  courses[trackId] = await getCourses(trackId);
  renderCourses(trackId);
}

async function loadTaskTrackCourses() {
  const trackId = document.getElementById('task-track-select').value;
  if (!trackId) return;
  
  currentTrackId = trackId;
  courses[trackId] = await getCourses(trackId);
  
  const courseSelect = document.getElementById('task-course-select');
  courseSelect.innerHTML = '<option value="">Select a course...</option>' +
    courses[trackId].map(course => 
      `<option value="${course._id}">${course.name}</option>`
    ).join('');
}

async function loadCourseTasks() {
  const courseId = document.getElementById('task-course-select').value;
  if (!courseId) return;
  
  currentCourseId = courseId;
  await renderTasks(currentTrackId, courseId);
}

// View course members and progress
async function viewCourseMembers(courseId) {
  try {
    const members = await getCourseMembers(courseId);
    const course = courses[currentTrackId].find(c => c._id === courseId);
    const tasks = await getTasks(currentTrackId, courseId);
    
    const modalContent = document.createElement('div');
    modalContent.className = 'course-members-modal';
    
    modalContent.innerHTML = `
      <div class="modal-header">
        <h2>${course.name} - Member Progress</h2>
        <button class="close-button" onclick="closeMembersModal()">&times;</button>
      </div>
      <div class="members-dashboard">
        <div class="dashboard-stats">
          <div class="stat-card">
            <h3>Total Members</h3>  
            <p>${members.length}</p>
          </div>
          <div class="stat-card">
            <h3>Total Tasks</h3>
            <p>${tasks.length}</p>
          </div>
        </div>
        <div class="members-list">
          ${members.map(member => {
            const memberProgress = member.startedTracks?.[0]?.courses?.find(c => c.course === courseId);
            const submittedTasks = memberProgress?.submittedTasks || [];
            const completionRate = tasks.length ? Math.round((submittedTasks.length / tasks.length) * 100) : 0;
            
            return `
              <div class="member-card">
                <div class="member-info">
                  <h4>${member.name}</h4>
                  <p>${member.email}</p>
                  <div class="progress-bar">
                    <div class="progress" style="width: ${completionRate}%"></div>
                    <span>${completionRate}% complete</span>
                  </div>
                </div>
                <div class="task-submissions">
                  <h5>Task Submissions</h5>
                  <div class="tasks-grid">
                    ${tasks.map(task => {
                      const submission = submittedTasks.find(s => s.task === task._id);
                      return `
                        <div class="task-submission-card ${submission ? 'submitted' : 'pending'}">
                          <h6>${task.name}</h6>
                          ${submission ? `
                            <div class="submission-details">
                              <p>Submitted: ${new Date(submission.submittedAt).toLocaleDateString()}</p>
                              <a href="${submission.submissionLink}" target="_blank" class="view-submission">
                                <i data-lucide="external-link"></i>
                                View Submission
                              </a>
                              ${submission.evaluation ? `
                                <p class="evaluation">Evaluation: ${submission.evaluation}</p>
                              ` : `
                                <button onclick="evaluateSubmission('${member._id}', '${task._id}', '${submission._id}')" class="evaluate-button">
                                  Add Evaluation
                                </button>
                              `}
                            </div>
                          ` : '<p class="pending-text">Not submitted yet</p>'}
                        </div>
                      `;
                    }).join('')}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    console.log(membersModal);
    
    membersModal.innerHTML = '';
    membersModal.appendChild(modalContent);
    membersModal.classList.add('active');
    lucide.createIcons();
  } catch (error) {
    console.log('Error loading member progress:', error);
  }
}

// Modal functions
function showTrackModal() {
  document.getElementById('track-modal-title').textContent = 'Add Track';
  document.getElementById('track-form').reset();
  document.getElementById('track-id').value = '';
  trackModal.classList.add('active');
}

function closeTrackModal() {
  trackModal.classList.remove('active');
}

function showCourseModal() {
  document.getElementById('course-modal-title').textContent = 'Add Course';
  document.getElementById('course-form').reset();
  document.getElementById('course-id').value = '';
  courseModal.classList.add('active');
}

function closeCourseModal() {
  courseModal.classList.remove('active');
}

function showTaskModal() {
  document.getElementById('task-modal-title').textContent = 'Add Task';
  document.getElementById('task-form').reset();
  document.getElementById('task-id').value = '';
  taskModal.classList.add('active');
}

function closeTaskModal() {
  taskModal.classList.remove('active');
}

function closeMembersModal() {
  membersModal.classList.remove('active');
}

// Form handlers
async function handleTrackSubmit(event) {
  event.preventDefault();
  const formData = {
    name: document.getElementById('track-name').value,
    icon: document.getElementById('track-icon').value
  };
  
  const trackId = document.getElementById('track-id').value;
  
  if (trackId) {
    await editTrack(trackId, formData);
  } else {
    await addTrack(formData);
  }
  
  await init();
  closeTrackModal();
}

async function handleCourseSubmit(event) {
  event.preventDefault();
  const formData = {
    name: document.getElementById('course-name').value
  };
  
  const courseId = document.getElementById('course-id').value;
  
  if (courseId) {
    await editCourse(currentTrackId, courseId, formData);
  } else {
    await addCourse(currentTrackId, formData);
  }
  
  courses[currentTrackId] = await getCourses(currentTrackId);
  renderCourses(currentTrackId);
  closeCourseModal();
}

async function handleTaskSubmit(event) {
  event.preventDefault();
  const formData = {
    name: document.getElementById('task-name').value,
    description: document.getElementById('task-description').value,
    time: document.getElementById('task-time').value,
    score: parseInt(document.getElementById('task-score').value),
    materialLink: document.getElementById('task-data-link').value,
    submissionLink: document.getElementById('task-submission-link').value
  };
  
  const taskId = document.getElementById('task-id').value;
  
  if (taskId) {
    await editTaskApi(currentTrackId, currentCourseId, taskId, formData);
  } else {
    await addTask(currentTrackId, currentCourseId, formData);
  }
  
  await renderTasks(currentTrackId, currentCourseId);
  closeTaskModal();
}

// Evaluation function
async function evaluateSubmission(memberId, taskId, submissionId) {
  const evaluation = prompt('Enter evaluation for this submission:');
  if (!evaluation) return;

  try {
    const response = await fetch(`${serverUrl}/evaluate-submission`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        memberId,
        taskId,
        submissionId,
        evaluation
      })
    });

    if (response.ok) {
      alert('Evaluation submitted successfully');
      viewCourseMembers(currentCourseId);
    } else {
      throw new Error('Failed to submit evaluation');
    }
  } catch (error) {
    console.error('Error submitting evaluation:', error);
    alert('Failed to submit evaluation');
  }
}

// Initialize
async function init() {
  tracks = await getTracks();
  renderTracks();
  updateTrackSelectors();
}

init();
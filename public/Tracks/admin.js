// Global variable for server URL
const serverUrl = 'http://localhost:3000/Tracks/api'; // Replace with your server URL
// https://assiut-robotics-zeta.vercel.app/members/verify
// State management
let tracks = [];
let courses = {};
let tasks = {};

// DOM Elements
const trackSection = document.getElementById('tracks-section');
const courseSection = document.getElementById('courses-section');
const taskSection = document.getElementById('tasks-section');
const tabButtons = document.querySelectorAll('.tab-button');
const trackModal = document.getElementById('track-modal');
const courseModal = document.getElementById('course-modal');
const taskModal = document.getElementById('task-modal');

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

// Load initial data
async function init() {
  tracks = await getTracks();
  renderTracks();
  updateTrackSelectors();
}

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

async function addTrack(trackData) {
  try {
    const response = await fetch(`${serverUrl}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trackData),
    });
    init()
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

async function addTaskApi(trackId,courseId, taskData) {
  try {
    const response = await fetch(`${serverUrl}/${trackId}/course/${courseId}/task/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    init()
    const jsonResponse=await response.json();
    console.log(jsonResponse);
    return jsonResponse.data;
  } catch (error) {
    console.error('Error adding task:', error.message);
  }
}

async function editTrackApi(id,trackData) {
  try {
    console.log("editTrackApi");
    
    await fetch(`${serverUrl}/update/${id}`, {
      method: 'PUT',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(trackData)
    });
    init()
  } catch (error) {
    console.error('Error  editing Track:', error);
  }
}

async function editCourseApi(Tid,Cid,courseData) {
  try {
    console.log("editTrackApi");
    
    await fetch(`${serverUrl}/${Tid}/course/update/${Cid}`, {
      method: 'PUT',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(courseData)
    });
    
  } catch (error) {
    console.error('Error editing  Course:', error);
  }
}
async function editTaskApi(Tid,Cid,taskId,TaskData) {
  try {
    console.log("editTaskApi");
    
    await fetch(`${serverUrl}/${Tid}/course/${Cid}/task/update/${taskId}`, {
      method: 'PUT',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(TaskData)
    });
    
  } catch (error) {
    console.error('Error editing task:', error);
  }
}


async function deleteTrackApi(id) {
  try {
    console.log("id is :",id);
    
    await fetch(`${serverUrl}/delete/${id}`, {
      method: 'DELETE',
    });
    init()
  } catch (error) {
    console.error('Error deleting track:', error);
  }
}

async function deleteCourseApi(trackId, courseId) {
  try {
    const response=await fetch(`${serverUrl}/${trackId}/course/delete/${courseId}`, {
      method: 'DELETE',
    });
    const jsonResponse=await response.json()
    console.log(jsonResponse);
    
  } catch (error) {
    console.log('Error deleting course:', error.message);
  }
}

async function deleteTaskApi(trackId,courseId, taskId) {
  try {
    await fetch(`${serverUrl}/${trackId}/course/${courseId}/task/delete/${taskId}`, {
      method: 'DELETE',
    });
    console.log("task deleted    :)");
    
  } catch (error) {
    console.log('Error deleting task:', error);
  }
}


// Render functions
function renderTracks() {

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

function renderCourses(trackId) {
  const grid = document.getElementById('courses-grid');
  const trackCourses = courses[trackId] || [];

  grid.innerHTML = trackCourses.map(course => `
    <div class="admin-card">
      <div class="admin-card-header">
        <h3 class="admin-card-title">${course.name}</h3>
        <div class="admin-card-actions">
          <button class="action-button edit-button" onclick="editCourse('${course._id}')">
            <i data-lucide="edit"></i>
          </button>
          <button class="action-button delete-button" onclick="deleteCourse( '${course._id}')">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
  lucide.createIcons();
}

async function renderTasks(trackId,courseId) {
  const grid = document.getElementById('tasks-grid');
  // await getTasks(trackId,courseId)
  const courseTasks =await getTasks(trackId,courseId);

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

// Initialize the page
init();


























// // State management
// let tracks = [];
// let courses = {};
// let tasks = {};

// // DOM Elements
// const trackSection = document.getElementById('tracks-section');
// const courseSection = document.getElementById('courses-section');
// const taskSection = document.getElementById('tasks-section');
// const tabButtons = document.querySelectorAll('.tab-button');
// const trackModal = document.getElementById('track-modal');
// const courseModal = document.getElementById('course-modal');
// const taskModal = document.getElementById('task-modal');

// // Initialize Lucide icons
// lucide.createIcons();

// // Tab switching
// tabButtons.forEach(button => {
//   button.addEventListener('click', () => {
//     const tabName = button.dataset.tab;
    
//     // Update active tab button
//     tabButtons.forEach(btn => btn.classList.remove('active'));
//     button.classList.add('active');
    
//     // Update active section
//     document.querySelectorAll('.admin-section').forEach(section => {
//       section.classList.remove('active');
//     });
//     document.getElementById(`${tabName}-section`).classList.add('active');
//   });
// });

// // Load initial data
// async function init() {
//   tracks = await API.getTracks();
//   renderTracks();
//   updateTrackSelectors();
// }

// // Render functions
// function renderTracks() {
//   const grid = document.getElementById('tracks-grid');
//   grid.innerHTML = tracks.map(track => `
//     <div class="admin-card">
//       <div class="admin-card-header">
//         <h3 class="admin-card-title">${track.name}</h3>
//         <div class="admin-card-actions">
//           <button class="action-button edit-button" onclick="editTrack('${track.id}')">
//             <i data-lucide="edit"></i>
//           </button>
//           <button class="action-button delete-button" onclick="deleteTrack('${track.id}')">
//             <i data-lucide="trash-2"></i>
//           </button>
//         </div>
//       </div>
//       <div class="card-icon">
//         <i data-lucide="${track.icon === 'web' ? 'globe' : track.icon === 'embedded' ? 'cpu' : 'code-2'}"></i>
//       </div>
//     </div>
//   `).join('');
//   lucide.createIcons();
// }

// function renderCourses(trackId) {
//   const grid = document.getElementById('courses-grid');
//   const trackCourses = courses[trackId] || [];
  
//   grid.innerHTML = trackCourses.map(course => `
//     <div class="admin-card">
//       <div class="admin-card-header">
//         <h3 class="admin-card-title">${course.name}</h3>
//         <div class="admin-card-actions">
//           <button class="action-button edit-button" onclick="editCourse('${course.id}')">
//             <i data-lucide="edit"></i>
//           </button>
//           <button class="action-button delete-button" onclick="deleteCourse('${course.id}')">
//             <i data-lucide="trash-2"></i>
//           </button>
//         </div>
//       </div>
//     </div>
//   `).join('');
//   lucide.createIcons();
// }

// function renderTasks(courseId) {
//   const grid = document.getElementById('tasks-grid');
//   const courseTasks = tasks[courseId] || [];
  
//   grid.innerHTML = courseTasks.map(task => `
//     <div class="admin-card">
//       <div class="admin-card-header">
//         <h3 class="admin-card-title">${task.name}</h3>
//         <div class="admin-card-actions">
//           <button class="action-button edit-button" onclick="editTask('${task.id}')">
//             <i data-lucide="edit"></i>
//           </button>
//           <button class="action-button delete-button" onclick="deleteTask('${task.id}')">
//             <i data-lucide="trash-2"></i>
//           </button>
//         </div>
//       </div>
//       <div class="task-meta">
//         <div class="meta-item">
//           <i data-lucide="clock"></i>
//           <span>${task.estimatedTime}</span>
//         </div>
//         <div class="meta-item">
//           <i data-lucide="star"></i>
//           <span>${task.score} points</span>
//         </div>
//       </div>
//     </div>
//   `).join('');
//   lucide.createIcons();
// }

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

// // Load data based on selections
async function loadTrackCourses() {
  
  const trackId = document.getElementById('course-track-select').value;

  if (!trackId) return;

  if (!courses[trackId]) {
    console.log("trackId:",trackId);

    courses[trackId] = await getCourses(trackId);
  }

  renderCourses(trackId);
}

async function loadTaskTrackCourses() {
  const trackId = document.getElementById('task-track-select').value;
  if (!trackId) return;
  
  if (!courses[trackId]) {
    courses[trackId] = await getCourses(trackId);
  }
  
  const courseSelect = document.getElementById('task-course-select');
  courseSelect.innerHTML = '<option value="">Select a course...</option>' +
    courses[trackId].map(course => 
      `<option value="${course._id}">${course.name}</option>`
    ).join('');
}

async function loadCourseTasks() {
  const courseId = document.getElementById('task-course-select').value;
  const trackId = document.getElementById('task-track-select').value;

  if (!courseId) return;
  
  if (!tasks[courseId]) {
    tasks[courseId] = await getTasks(trackId,courseId);
  }
  renderTasks(trackId,courseId);
}

// Modal functions
function showTrackModal() {
  document.getElementById('track-modal-title').textContent = 'Add Track';
  document.getElementById('track-form').reset();
  document.getElementById('track-id').value="";
  console.log("reset form",   document.getElementById('track-form'));

  
  trackModal.classList.add('active');
}

function closeTrackModal() {
  trackModal.classList.remove('active');
}

function showCourseModal() {
  document.getElementById('course-modal-title').textContent = 'Add Course';
  document.getElementById('course-form').reset();
  document.getElementById('course-id').value=""
  courseModal.classList.add('active');
}

function closeCourseModal() {
  courseModal.classList.remove('active');
}

function showTaskModal() {
  document.getElementById('task-modal-title').textContent = 'Add Task';
  document.getElementById('task-form').reset();
  document.getElementById('task-id').value="";
  taskModal.classList.add('active');
}

function closeTaskModal() {
  taskModal.classList.remove('active');
}

// // Form handlers
async function handleTrackSubmit(event) {
  event.preventDefault();
  const formData = {
    id: document.getElementById('track-id').value || Date.now().toString(),
    name: document.getElementById('track-name').value,
    icon: document.getElementById('track-icon').value
  };
  
  // In a real app, this would be an API call
  init()
  if (formData.id) {
    const index = tracks.findIndex(t => t._id === formData.id);
    if (index !== -1) {
      // update
      

      // tracks[index] = formData;
      await editTrackApi( tracks[index]._id,formData);
    } else {
      await addTrack(formData);

      // tracks.push(formData);
    }
  }
  
  renderTracks();
  updateTrackSelectors();
  closeTrackModal();
}

async function handleCourseSubmit(event) {
  event.preventDefault();
  const trackId = document.getElementById('course-track-select').value;
  const formData = {
    id: document.getElementById('course-id').value || Date.now().toString(),
    name: document.getElementById('course-name').value
  };
  
  // In a real app, this would be an API call
  if (!courses[trackId]) {
    courses[trackId] = [];
  }
  

  if (formData.id) {
    const index = courses[trackId].findIndex(c => c._id === formData.id);
    console.log(courses[trackId]);
    console.log(formData.id);
    console.log(index);
    
    
    if (index !== -1) {
      console.log(trackId,courses[trackId][index]._id);
      
      await editCourseApi(trackId,courses[trackId][index]._id,formData)
      // courses[trackId][index] = formData;
    } else {
      await addCourse(trackId,formData);

      courses[trackId].push(formData);
    }
  }
      courses[trackId] = await getCourses(trackId);

  renderCourses(trackId);
  closeCourseModal();
}

async function handleTaskSubmit(event) {
  event.preventDefault();
  const courseId = document.getElementById('task-course-select').value;
  const trackId = document.getElementById('task-track-select').value;

  const formData = {
    id: document.getElementById('task-id').value || Date.now().toString(),
    name: document.getElementById('task-name').value,
    description: document.getElementById('task-description').value,
    time: document.getElementById('task-time').value,
    score: parseInt(document.getElementById('task-score').value),
    materialLink: document.getElementById('task-data-link').value,
    // submissionLink: document.getElementById('task-submission-link').value
  };
 
  // In a real app, this would be an API call
  if (!tasks[courseId]) {
    tasks[courseId] = [];
  }
  
  if (formData.id) {
    const index = tasks[courseId].findIndex(t => t._id === formData.id);
    console.log(index)
    if (index !== -1) {
      console.log("update task" );
      await editTaskApi(trackId,courseId,formData.id,formData);
      // tasks[courseId][index] = formData;
    } else {
      console.log("push Task");
      
      await addTaskApi(trackId,courseId,formData);
      // tasks[courseId].push(formData);
    }
  }
  
  renderTasks(trackId,courseId);
  closeTaskModal();
}

// // Edit functions
async function editTrack(id) {
  const track = tracks.find(t => t._id === id);
  if (!track) return;

  document.getElementById('track-modal-title').textContent = 'Edit Track';
  document.getElementById('track-id').value = track._id;
  document.getElementById('track-name').value = track.name;
  document.getElementById('track-icon').value = track.icon;
  
  trackModal.classList.add('active');
}

function editCourse(id) {
  const trackId = document.getElementById('course-track-select').value;
  const course = courses[trackId]?.find(c => c._id === id);
  if (!course) return;
  
  document.getElementById('course-modal-title').textContent = 'Edit Course';
  document.getElementById('course-id').value = course._id;
  document.getElementById('course-name').value = course.name;
  
  courseModal.classList.add('active');
}

function editTask(id) {
  console.log("edit TAsk function");

  const courseId = document.getElementById('task-course-select').value;
  console.log("course id",courseId);
  console.log("task id",tasks[courseId][0]._id);

  const task = tasks[courseId]?.find(t => t._id === id);
  if (!task) return;
  // console.log("edit TAsk function");
  console.log("id:",id);
  console.log("task._id",task._id);
  
  document.getElementById('task-modal-title').textContent = 'Edit Task';
  document.getElementById('task-id').value = task._id;
  document.getElementById('task-name').value = task.name;
  document.getElementById('task-description').value = task.description;
  document.getElementById('task-time').value = task.time;
  document.getElementById('task-score').value = task.score;
  document.getElementById('task-data-link').value = task.materialLink;
  // document.getElementById('task-submission-link').value = task.submissionLink;
  
  taskModal.classList.add('active');
}

// // Delete functions
function deleteTrack(id) {
  if (!confirm('Are you sure you want to delete this track?')) return;
  
  const index = tracks.findIndex(t => t._id === id);
  if (index !== -1) {
    // tracks.splice(index, 1);
    deleteTrackApi(id);
    delete courses[id];
    renderTracks();
    updateTrackSelectors();
  }
}

async function deleteCourse(Cid) {
  if (!confirm('Are you sure you want to delete this course?')) return;
  
  const trackId = document.getElementById('course-track-select').value;
  console.log(Cid);
  // console.log(trackId);
  

  const index = courses[trackId].findIndex(c => c._id === Cid);
  console.log(index);
  
  if (index !== -1) {
    await deleteCourseApi(trackId,Cid)
    courses[trackId].splice(index, 1);
    // delete tasks[Cid];
    renderCourses(trackId);
  }
}

async function deleteTask(taskId) {
  if (!confirm('Are you sure you want to delete this task?')) return;
  const trackId = document.getElementById('task-track-select').value;
  const courseId = document.getElementById('task-course-select').value;
  const index = tasks[courseId].findIndex(t => t._id === taskId );
  if (index !== -1) {
    tasks[courseId].splice(index, 1);
    await deleteTaskApi(trackId,courseId,taskId);
    renderTasks(trackId,courseId);
  }
}

// // Initialize the page
// init();
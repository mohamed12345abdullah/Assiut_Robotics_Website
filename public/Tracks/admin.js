

// // Initialize the page
// init();





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


const token=window.localStorage.getItem('token')
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
        'authorization':`Bearer ${token}`,
      },
      body: JSON.stringify(trackData),
    });

    const jsonResponse=await response.json()
    alert(jsonResponse.message)
    console.log(jsonResponse.message);
    
    return await jsonResponse;
  } catch (error) {
    console.log('Error adding track:', error.message);
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

async function addTaskApi(trackId, courseId, taskData) {
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

async function editTrackApi(id, trackData) {
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

async function editCourseApi(trackId, courseId, courseData) {
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

async function deleteTrackApi(id) {
  try {
    await fetch(`${serverUrl}/delete/${id}`, {
      method: 'DELETE',
    });
    init();
  } catch (error) {
    console.error('Error deleting track:', error);
  }
}

async function deleteCourseApi(trackId, courseId) {
  try {
    await fetch(`${serverUrl}/${trackId}/course/delete/${courseId}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Error deleting course:', error);
  }
}

async function deleteTaskApi(trackId, courseId, taskId) {
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
          <button class="action-button view-button" onclick="viewCourseMembers('${course._id}','${trackId}')">
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
  tasks = await getTasks(trackId, courseId);

  grid.innerHTML = tasks.map(task => `
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
// async function viewCourseMembers(courseId) {
//   try {
//     const members = await getCourseMembers(courseId);
//     const course = courses[currentTrackId].find(c => c._id === courseId);
//     const tasks = await getTasks(currentTrackId, courseId);
    
//     const modalContent = document.createElement('div');
//     modalContent.className = 'course-members-modal';
    
//     modalContent.innerHTML = `
//       <div class="modal-header">
//         <h2>${course.name} - Member Progress</h2>
//         <button class="close-button" onclick="closeMembersModal()">&times;</button>
//       </div>
//       <div class="members-dashboard">
//         <div class="dashboard-stats">
//           <div class="stat-card">
//             <h3>Total Members</h3>  
//             <p>${members.length}</p>
//           </div>
//           <div class="stat-card">
//             <h3>Total Tasks</h3>
//             <p>${tasks.length}</p>
//           </div>
//         </div>
//         <div class="members-list">
//           ${members.map(member => {
//             const memberProgress = member.startedTracks?.[0]?.courses?.find(c => c.course === courseId);
//             const submittedTasks = memberProgress?.submittedTasks || [];
//             const completionRate = tasks.length ? Math.round((submittedTasks.length / tasks.length) * 100) : 0;
            
//             return `
//               <div class="member-card">
//                 <div class="member-info">
//                   <h4>${member.name}</h4>
//                   <p>${member.email}</p>
//                   <div class="progress-bar">
//                     <div class="progress" style="width: ${completionRate}%"></div>
//                     <span>${completionRate}% complete</span>
//                   </div>
//                 </div>
//                 <div class="task-submissions">
//                   <h5>Task Submissions</h5>
//                   <div class="tasks-grid">
//                     ${tasks.map(task => {
//                       const submission = submittedTasks.find(s => s.task === task._id);
//                       return `
//                         <div class="task-submission-card ${submission ? 'submitted' : 'pending'}">
//                           <h6>${task.name}</h6>
//                           ${submission ? `
//                             <div class="submission-details">
//                               <p>Submitted: ${new Date(submission.submittedAt).toLocaleDateString()}</p>
//                               <a href="${submission.submissionLink}" target="_blank" class="view-submission">
//                                 <i data-lucide="external-link"></i>
//                                 View Submission
//                               </a>
//                               ${submission.evaluation ? `
//                                 <p class="evaluation">Evaluation: ${submission.evaluation}</p>
//                               ` : `
//                                 <button onclick="evaluateSubmission('${member._id}', '${task._id}', '${submission._id}')" class="evaluate-button">
//                                   Add Evaluation
//                                 </button>
//                               `}
//                             </div>
//                           ` : '<p class="pending-text">Not submitted yet</p>'}
//                         </div>
//                       `;
//                     }).join('')}
//                   </div>
//                 </div>
//               </div>
//             `;
//           }).join('')}
//         </div>
//       </div>
//     `;

//     console.log(membersModal);
    
//     membersModal.innerHTML = '';
//     membersModal.appendChild(modalContent);
//     membersModal.classList.add('active');
//     lucide.createIcons();
//   } catch (error) {
//     console.log('Error loading member progress:', error);
//   }
// }
// async function viewCourseMembers(courseId) {
//   try {
//     const members = await getCourseMembers(courseId);
//     const course = courses[currentTrackId].find(c => c._id === courseId);
//     const tasks = await getTasks(currentTrackId, courseId);
    
//     const modalContent = document.createElement('div');
//     modalContent.className = 'course-members-modal';
    
//     modalContent.innerHTML = `
//       <div class="modal-header">
//         <h2>${course.name} - Member Progress</h2>
//         <button class="close-button" onclick="closeMembersModal()">&times;</button>
//       </div>
//       <div class="members-dashboard">
//         <div class="dashboard-stats">
//           <div class="stat-card">
//             <h3>Total Members</h3>  
//             <p>${members.length}</p>
//           </div>
//           <div class="stat-card">
//             <h3>Total Tasks</h3>
//             <p>${tasks.length}</p>
//           </div>
//         </div>
//         <div class="members-list">
//           ${members.map(member => {
//             const memberProgress = member.startedTracks?.[0]?.courses?.find(c => c.course === courseId);
//             const submittedTasks = memberProgress?.submittedTasks || [];
//             const completionRate = tasks.length ? Math.round((submittedTasks.length / tasks.length) * 100) : 0;
            
//             return `
//               <div class="member-card">
//                 <div class="member-info">
//                   <h4>${member.name}</h4>
//                   <p>${member.email}</p>
//                   <div class="progress-bar">
//                     <div class="progress" style="width: ${completionRate}%"></div>
//                     <span>${completionRate}% complete</span>
//                   </div>
//                 </div>
//                 <div class="task-submissions">
//                   <h5>Task Submissions</h5>
//                   <div class="tasks-grid">
//                     ${tasks.map(task => {
//                       const submission = submittedTasks.find(s => s.task === task._id);
//                       return `
//                         <div class="task-submission-card ${submission ? 'submitted' : 'pending'}">
//                           <h6>${task.name}</h6>
//                           ${submission ? `
//                             <div class="submission-details">
//                               <p>Submitted: ${new Date(submission.submittedAt).toLocaleDateString()}</p>
//                               <a href="${submission.submissionLink}" target="_blank" class="view-submission">
//                                 <i data-lucide="external-link"></i>
//                                 View Submission
//                               </a>
//                               <form onsubmit="submitEvaluation(event, '${member._id}', '${task._id}', '${submission._id}')">
//                                 <label>Rate:</label>
//                                 <input type="number" name="rate" min="0" max="100" required value="${submission.rate || ''}" />
//                                 <label>Notes:</label>
//                                 <textarea name="notes" required>${submission.notes || ''}</textarea>
//                                 <button type="submit" class="evaluate-button">Save Evaluation</button>
//                               </form>
//                             </div>
//                           ` : '<p class="pending-text">Not submitted yet</p>'}
//                         </div>
//                       `;
//                     }).join('')}
//                   </div>
//                 </div>
//               </div>
//             `;
//           }).join('')}
//         </div>
//       </div>
//     `;

//     console.log(membersModal);
    
//     membersModal.innerHTML = '';
//     membersModal.appendChild(modalContent);
//     membersModal.classList.add('active');
//     lucide.createIcons();
//   } catch (error) {
//     console.log('Error loading member progress:', error);
//   }
// }


async function viewCourseMembers(courseId,trackId) {
  try {
    
    // Hide current active section and show members section
    membersSection=document.getElementById('members-section')
    document.querySelector('.admin-section.active').classList.remove('active');
    membersSection.classList.add('active');
    
    const members = await getCourseMembers(courseId);
    const course = courses[currentTrackId].find(c => c._id === courseId);
    const tasks = await getTasks(currentTrackId, courseId);
    // console.log('members',members);
    // console.log('course',course);
    // console.log('tasks',tasks);
    
    // Set section title
    document.getElementById('members-section-title').textContent = 
      `${course.name} - Member Progress`;

    // Build members content
    const membersContent = document.getElementById('members-content');
    membersContent.innerHTML = `
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
          const TTrack=member.startedTracks?.find(t=> t.track._id==trackId)
          console.log('memberTrack.track:',TTrack,'trackId',trackId);
          console.log(TTrack.courses);
          
          const memberCourse=TTrack.courses?.find(c=>c.course==courseId)
          console.log('memberCourse:',memberCourse);
          // console.log('track.courses[0].course : ',track.courses[0].course);
          // console.log( 'track.courses[0].submittedTasks',track.courses[0].submittedTasks);
          console.log('courseId:',courseId);
          
          const memberProgress = TTrack.courses?.find(c => c.course === courseId);
          console.log("progress",memberProgress);
          
          const submittedTasks = memberProgress?.submittedTasks || [];
          console.log('submitted',submittedTasks);
          
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
                    console.log('submission',submission)
                    return `
                      <div class="task-submission-card ${submission ? 'submitted' : 'pending'}">
                        <h6>${task.name}</h6>
                        ${submission ?
                        
                        
                        `
                          <div class="submission-details">
                            <p>Submitted: ${new Date(submission.submittedAt).toLocaleDateString()}</p>
                            <a href="${submission.submissionLink}" target="_blank" class="view-submission">
                              <i data-lucide="external-link"></i>
                              View Submission
                            </a>
                            <form onsubmit="submitEvaluation(event, '${member._id}', '${task._id}', '${submission._id}')">
                              <label>Rate:</label>
                              <input type="number" name="rate" min="0" max="100" required value="${submission.rate || ''}" />
                              <label>Notes:</label>
                              <textarea name="notes" required>${submission.notes || ''}</textarea>
                              <button type="submit" class="evaluate-button">Save Evaluation</button>
                            </form>
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
    `;

    lucide.createIcons();
  } catch (error) {
    console.log('Error loading member progress:', error);
  }
}

function goBackToCourses() {
  document.getElementById('members-section').classList.remove('active');
  document.getElementById('courses-section').classList.add('active');
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

// async function handleTaskSubmit(event) {
//   event.preventDefault();
//   const formData = {
//     name: document.getElementById('task-name').value,
//     description: document.getElementById('task-description').value,
//     time: document.getElementById('task-time').value,
//     score: parseInt(document.getElementById('task-score').value),
//     materialLink: document.getElementById('task-data-link').value,
//     submissionLink: document.getElementById('task-submission-link').value
//   };
  
//   const taskId = document.getElementById('task-id').value;
  
//   if (taskId) {
//     await editTaskApi(currentTrackId, currentCourseId, taskId, formData);
//   } else {
//     await addTask(currentTrackId, currentCourseId, formData);
//   }
  
//   await renderTasks(currentTrackId, currentCourseId);
//   closeTaskModal();
// }

// Evaluation function
async function evaluateSubmission(memberId, taskId, submissionId,rate,notes) {
  // const evaluation = prompt('Enter evaluation for this submission:');
  // if (!evaluation) return;
  //   console.log(memberId,taskId,submissionId);
    
  try {
    const response = await fetch(`https://assiut-robotics-zeta.vercel.app/members/${memberId}/tasks/${taskId}/submissions/${submissionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        memberId,
        taskId,
        submissionId,
        rate,
        notes
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

function submitEvaluation(event, memberId, taskId, submissionId) {
  event.preventDefault();
  
  const form = event.target;
  const rate = form.rate.value;
  const notes = form.notes.value;

  evaluateSubmission(memberId, taskId, submissionId, rate, notes);
}

// Initialize
async function init() {
  tracks = await getTracks();
  renderTracks();
  updateTrackSelectors();
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
    const index = tasks.findIndex(t => t._id === formData.id);
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
  console.log("task id",tasks);

  const task = tasks?.find(t => t._id === id);
  // if (!task) return;
  // console.log("edit TAsk function");
  console.log("id:",id);
  // console.log("task._id",task._id);
  
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
  const index = tasks.findIndex(t => t._id === taskId );
  if (index !== -1) {
    // tasks[courseId].splice(index, 1);
    await deleteTaskApi(trackId,courseId,taskId);
    renderTasks(trackId,courseId);
  }
}
init();
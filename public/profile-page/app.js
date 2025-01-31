
        
// API URLs
const API_URL = 'https://assiut-robotics-zeta.vercel.app/members/login';
const VERIFY_URL = 'https://assiut-robotics-zeta.vercel.app/members/verify';
const CHANGE_AVATAR_URL = 'https://assiutroboticswebsite-production.up.railway.app/members/changeProfileImage';
const SUBMIT_TASK_URL = 'https://assiut-robotics-zeta.vercel.app/members/submitTask';

// State management
let currentMemberData = null;
let currentTrackId = null;
let currentCourseId = null;
let currentTaskId = null;

// DOM Elements
const userAvatar = document.getElementById('userAvatar');
const userName = document.getElementById('userName');
const userRole = document.getElementById('userRole');
const userEmail = document.getElementById('userEmail');
const userCommittee = document.getElementById('userCommittee');
const userPhone = document.getElementById('userPhone');
const userStatus = document.getElementById('userStatus');
const tracksList = document.getElementById('tracksList');
const coursesContainer = document.getElementById('coursesContainer');
const tasksContainer = document.getElementById('tasksContainer');
const courseTasksTitle = document.getElementById('courseTasksTitle');
const progressBarFill = document.getElementById('progressBarFill');
const progressText = document.getElementById('progressText');
const darkModeToggle = document.getElementById('darkModeToggle');
const changeAvatarBtn = document.getElementById('changeAvatarBtn');
const avatarInput = document.getElementById('avatarInput');
const submitTaskModal = document.getElementById('submitTaskModal');
const submitTaskForm = document.getElementById('submitTaskForm');
const bino = document.getElementsByClassName('bino')[0];
const body = document.getElementsByTagName('body')[0];
const main = document.getElementsByTagName('main')[0];
const header = document.getElementsByTagName('header')[0];

// Verify token
async function verifyToken() {
 const token = localStorage.getItem('token');
    console.log("verifying");
    
  if (!token) return false;

  try {
    const response = await fetch(VERIFY_URL, {
      method: 'GET',
      headers: {

        'Authorization': `Bearer ${token}`
      }
    });
    if(!response.ok){
      window.location.href = '../login/login.html';
    }
    
    const data = await response.json();
    console.log(data);
    if (data.data) {
    //   localStorage.setItem('token', data.data.token);
      bino.classList.add('disabled');
      body.classList.remove('loading');
      main.classList.remove('disabled');
      header.classList.remove('disabled');
      
      currentMemberData = data.data;
      renderMemberData(data.data);
      
    } else {
      console.log('Invalid data format received from API', data);
    }
    return response.ok;
  } catch (error) {

    console.error('Token verification failed:', error);
    return false;
  }
}

// Fetch member data from API
// async function fetchMemberData() {
//   try {
//     const loginData = {
//       email: "mohamed12345abdullah@gmail.com",
//       password: "Abdullah123$"
//     };

//     const response = await fetch(API_URL, {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(loginData)
//     });

//     const data = await response.json();
//     console.log(data);
//     if (data.status === "success" && data.data.memberData) {
//       localStorage.setItem('token', data.data.token);
//       currentMemberData = data.data.memberData;
      
      
//       renderMemberData(data.data);
      
//     } else {
//       console.error('Invalid data format received from API');
//     }
//   } catch (error) {
//     console.error('Error fetching member data:', error);
//   }
// }

// Change avatar
async function changeAvatar(file) {
  const token = localStorage.getItem('token');
  if (!token || !file) return;

  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch(CHANGE_AVATAR_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (response.ok) {
      const data = await response.json();
      userAvatar.src = data.avatar;
      window.location.reload();
    }
  } catch (error) {
    console.error('Error changing avatar:', error);
  }
}

// Submit task
async function submitTask(submissionLink) {
  const token = localStorage.getItem('token');
 
  if (!token) return;
  console.log(token);
  
  try {
    const response = await fetch(SUBMIT_TASK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        trackId: currentTrackId,
        courseId: currentCourseId,
        taskId: currentTaskId,
        submissionLink
      })
    });

    if (response.ok) {
      // Refresh the tasks display
      const currentTrack = currentMemberData.startedTracks[currentTrackId];
      if (currentTrack) {
        renderTasks(currentTrack.track.courses[currentCourseId].tasks);
      }
    }  
      const res=await response.json()
      console.log(res);
      alert(res.message)
  } catch (error) {
    alert(error);
  }
}

// Render member profile data
function renderMemberData(data) {
  userAvatar.src = data.avatar;
  userAvatar.alt = `${data.name}'s avatar`;
  userName.textContent = data.name;
  userRole.textContent = data.role;
  userEmail.textContent = data.email;
  userCommittee.textContent = data.committee;
  userPhone.textContent = data.phoneNumber;
  userStatus.textContent = data.verified ? 'Verified' : 'Pending';
  userStatus.className = `status-badge ${data.verified ? 'verified' : 'pending'}`;
  
  renderTracks(data.startedTracks);
}

// Render tracks list
function renderTracks(tracks) {
  tracksList.innerHTML = '';
  tracks.forEach((trackData, index) => {
    const trackElement = document.createElement('div');
    trackElement.className = 'track-item';
    trackElement.textContent = trackData.track.name;
    trackElement.dataset.trackIndex = index;
    
    trackElement.addEventListener('click', () => {
      document.querySelectorAll('.track-item').forEach(el => el.classList.remove('active'));
      trackElement.classList.add('active');
      currentTrackId = trackData.track._id;
      renderCourses(trackData.track.courses);
      courseTasksTitle.textContent = trackData.track.name;
    });
    
    tracksList.appendChild(trackElement);
  });
}

// Render courses for selected track
function renderCourses(courses) {
  coursesContainer.innerHTML = '';
  tasksContainer.style.display = 'none';
  
  courses.forEach((course, index) => {
    const courseElement = document.createElement('div');
    courseElement.className = 'course-item';
    courseElement.textContent = course.name;
    courseElement.dataset.courseIndex = index;
    
    courseElement.addEventListener('click', () => {
      document.querySelectorAll('.course-item').forEach(el => el.classList.remove('active'));
      courseElement.classList.add('active');
      currentCourseId = course._id;
      renderTasks(course.tasks);
    });
    
    coursesContainer.appendChild(courseElement);
  });
}

// Render tasks for selected course
function renderTasks(tasks) {
  const tasksList = document.getElementById('tasksList');
  tasksList.innerHTML = '';
  tasksContainer.style.display = 'block';
  
  // Calculate progress
  const completedTasks = tasks.filter(task => task.submittedAt).length;
  const progressPercentage = (completedTasks / tasks.length) * 100;
  
  progressBarFill.style.width = `${progressPercentage}%`;
  progressText.textContent = `${Math.round(progressPercentage)}% Complete`;
  
  tasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.className = 'task-item';
    
    const taskHeader = document.createElement('div');
    taskHeader.className = 'task-header';
    
    const taskTitle = document.createElement('h3');
    taskTitle.className = 'task-title';
    taskTitle.textContent = task.name || task.title;
    
    const taskDeadline = document.createElement('div');
    taskDeadline.className = 'task-deadline';
    taskDeadline.innerHTML = `<i class="icon clock-icon"></i> Due ${task.time   }`;
    
    taskHeader.appendChild(taskTitle);
    taskHeader.appendChild(taskDeadline);
    
    const taskDescription = document.createElement('p');
    taskDescription.className = 'task-description';
    taskDescription.textContent = task.description;

    const taskURL = document.createElement('a');
    taskURL.className = 'task-description';
    taskURL.href = task.materialLink;
    taskURL.innerText = "Material Link";
    
    const taskMeta = document.createElement('div');
    taskMeta.className = 'task-meta';
    
    if (task.submittedAt && task.score) {
      const taskScore = document.createElement('span');
      taskScore.className = 'task-score';
      taskScore.textContent = `Score: ${task.score}/10`;
      taskMeta.appendChild(taskScore);
    }
    
    const taskStatus = document.createElement('span');
    taskStatus.className = 'task-status';
    
    if (!task.submittedAt) {
      const submitButton = document.createElement('button');
      submitButton.className = 'submit-task-btn';
      submitButton.textContent = 'Submit Task';
      submitButton.addEventListener('click', () => {
        currentTaskId = task._id;
        submitTaskModal.style.display = 'block';
      });
      taskStatus.appendChild(submitButton);
    } else {
      taskStatus.textContent = 'Completed';
    }
    
    taskMeta.appendChild(taskStatus);
    
    taskElement.appendChild(taskHeader);
    taskElement.appendChild(taskDescription);
    taskElement.appendChild(taskURL);
    taskElement.appendChild(taskMeta);
    
    tasksList.appendChild(taskElement);
  });
}

// Event Listeners
changeAvatarBtn.addEventListener('click', () => {
  avatarInput.click();
});

avatarInput.addEventListener('change', (e) => {
  if (e.target.files && e.target.files[0]) {
    changeAvatar(e.target.files[0]);
  }
});

submitTaskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const submissionLink = document.getElementById('submissionLink').value;
  await submitTask(submissionLink);
  submitTaskModal.style.display = 'none';
  submitTaskForm.reset();
});

document.querySelector('.cancel-btn').addEventListener('click', () => {
  submitTaskModal.style.display = 'none';
  submitTaskForm.reset();
});

// Dark mode toggle
function initializeDarkMode() {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  document.body.classList.toggle('dark-mode', isDarkMode);
  
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  });
}

// Initialize application
async function initialize() {
    console.log("intialize ")
   await verifyToken();
//   if (!isValid) {
//     await fetchMemberData();
//   }
  // if(!isValid)

initializeDarkMode();
}

// Start the application
initialize();
// DOM Elements
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const sections = document.querySelectorAll('.section');
const memberFilter = document.getElementById('memberFilter');
const statusFilter = document.getElementById('statusFilter');
const startDateFilter = document.getElementById('startDate');
const endDateFilter = document.getElementById('endDate');
const submittedTasksList = document.getElementById('submittedTasks');
const pendingTasksList = document.getElementById('pendingTasks');
const membersGrid = document.getElementById('membersGrid');
const membersList = document.getElementById('membersList');



const adminData = JSON.parse(localStorage.getItem('data'));
const committee = adminData.committee;
if(committee.includes(' hr')){
    committee.replace(' hr','')
}
console.log("admin data:",adminData);

const form = document.getElementById('taskForm')
const token = window.localStorage.getItem('token');
function togglePages(id) {
    if (id == "tasksSection") {
        tasksSection.style.display = "block"
        addNewTaskSection.style.display = "none"
        membersSection.style.display = "none"
    }
    else if (id == "addNewTaskSection") {
        tasksSection.style.display = "none"
        addNewTaskSection.style.display = "block"
        membersSection.style.display = "none"
    }
    else if (id == "memberTasksSection") {
        tasksSection.style.display = "none"
        addNewTaskSection.style.display = "none"
        membersSection.style.display = "block"
    }
}



// State
let members = [];
let tasks = [];
// const token = localStorage.getItem('token');

// Navigation
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navMenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        const sectionId = e.target.dataset.section + 'Section';
        
        // Update active state
        navMenu.querySelectorAll('a').forEach(a => a.classList.remove('active'));
        e.target.classList.add('active');
        
        // Show selected section
        sections.forEach(section => {
            section.classList.add('hidden');
            if (section.id === sectionId) {
                section.classList.remove('hidden');
            }
        });

        // If members section is selected, refresh members list
        if (sectionId === 'membersSection') {
            displayMembers();
        }
    }
});

// Fetch and display members
async function fetchMembers() {
    try {
        const response = await fetch(`https://assiut-robotics-zeta.vercel.app/members/get/${committee}`);
        const data = await response.json();
        members = data.date;
        console.log(members);
        
        // Populate member filter
        memberFilter.innerHTML = '<option value="">All Members</option>';
        members.forEach(member => {
            memberFilter.innerHTML += `
                <option value="${member._id}">${member.name}</option>
            `;
        });
        
        // Populate members grid for task assignment
        membersGrid.innerHTML = members.map(member => `
            <div class="member-checkbox">
                <input type="checkbox" id="member-${member._id}" value="${member._id}">
                <label for="member-${member._id}">${member.name}</label>
            </div>
        `).join('');
        
        // Initial task display
        displayAllTasks();
        // Display members list
        displayMembers();
    } catch (error) {
        console.log(error.message);
        
        console.error('Error fetching members:', error);
    }
}

// Display members  
// function displayMembers() {
//     membersList.innerHTML = '<h2>Team Members</h2> ';
//     members.forEach(member => {
//         const memberCard = document.createElement('div');
//         memberCard.className = 'member-card';
//         memberCard.innerHTML = `
//             <div class="member-info">
//                 <img src="${member.avatar}" alt="${member.name}" class="member-avatar">
//                 <div class="member-details">
//                     <h3>${member.name}</h3>
//                     <p class="member-role">${member.role}</p>
//                     <p class="member-email">${member.email}</p>
//                     <p class="member-committee">${member.committee}</p>
//                 </div>
//             </div>
//             <div class="member-tasks">
//                 <h4>Tasks (${member.tasks.length})</h4>
//                 <div class="task-summary">
//                     <span>Submitted: ${member.tasks.filter(t => t.submissionLink && t.submissionLink !== '*').length}</span>
//                     <span>Pending: ${member.tasks.filter(t => !t.submissionLink || t.submissionLink === '*').length}</span>
//                 </div>
//             </div>
//         `;
//         membersList.appendChild(memberCard);
//     });
// }


// =================================================================================


function displayMembers() {
    // document.querySelector('#membersSection .container').innerHTML= '<h2>Team Members</h2>';

    // membersList.innerHTML = '<h2>Team Members</h2>';
    membersList.innerHTML='';
    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'member-card';
        
        memberCard.innerHTML = `
            <div class="member-info">
                <img src="${member.avatar}" alt="${member.name}" class="member-avatar">
                <div class="member-details">
                    <h3>${member.name}</h3>
                    <p class="member-role">${member.role}</p>
                    <p class="member-email">${member.email}</p>
                    <p class="member-committee">${member.committee}</p>
                </div>
            </div>
            <div class="member-tasks">
                <h4>Tasks (${member.tasks.length})</h4>
                <div class="task-summary">
                    <span>Submitted: ${member.tasks.filter(t => t.submissionLink && t.submissionLink !== '*').length}</span>
                    <span>Pending: ${member.tasks.filter(t => !t.submissionLink || t.submissionLink === '*').length}</span>
                </div>
            </div>
            <div class="member-status-indicator"></div>
        `;

        // إضافة كلاس حسب حالة المهام
        const submittedTasks = member.tasks.filter(t => t.submissionLink && t.submissionLink !== '*').length;
        if (submittedTasks === member.tasks.length) {
            memberCard.classList.add('all-submitted');
        } else if (submittedTasks === 0) {
            memberCard.classList.add('all-pending');
        }

        // حدث النقر لعرض التاسكات
        memberCard.addEventListener('click', (e) => {
            if (!e.target.closest('.task-actions')) { // تجنب التنفيذ عند النقر على الأزرار
                showMemberTasks(member);
            }
        });

        membersList.appendChild(memberCard);
    });

    // إضافة رسومية للتحميل إذا لم يكن هناك أعضاء
    if (members.length === 0) {
        membersList.innerHTML = `
            <div class="empty-state">
                <img src="empty-members.svg" alt="No members">
                <p>No team members found</p>
            </div>
        `;
    }
}
// =================================================================================================================


//  =======================================
function showMemberTasks(member) {
    const tasksContainer = document.createElement('div');
    tasksContainer.className = 'member-tasks-container';
    
    member.tasks.forEach(task => {
        tasksContainer.appendChild(createTaskElement(task, member));
    });
    
    // إضافة زر الإغلاق
    tasksContainer.innerHTML += `
        <button class="close-tasks-btn" onclick="this.parentElement.remove()">
            &times;
        </button>
    `;
    
    document.body.appendChild(tasksContainer);
}





// =============================


// Display tasks
function displayAllTasks() {
    submittedTasksList.innerHTML = '';
    pendingTasksList.innerHTML = '';
    
    members.forEach(member => {
        member.tasks.forEach(task => {
            const taskElement = createTaskElement(task, member);
            if (task.submissionLink && task.submissionLink !== '*') {
                submittedTasksList.appendChild(taskElement);
                addEvent(task.submissionFileId,task.downloadSubmissionUrl) /* adding event to the download btn*/
    
            } else {
                pendingTasksList.appendChild(taskElement);
            }
        });
    });
}
//task.downloadSubmissionUrl
function addEvent(id,URL){
    console.log('id:',id);
    
    let element = document.getElementById(id);
    element.addEventListener('click',()=>{
        window.location.href = URL;
    })
}
// Create task element
function createTaskElement(task, member) {
    const div = document.createElement('div');
    div.className = `task-card ${task.submissionLink && task.submissionLink !== '*' ? 'submitted' : 'pending'}`;
    console.log("task:",task);
    
    div.innerHTML = `
        <div class="task-header" onclick="toggleTaskDetails(this)">
            <h3>${task.title}</h3>
            <span>${member.name}</span>
            <span> <img src="${member.avatar}" alt="${member.name}" class="member-avatar"> </span>
        </div>
        <div class="task-content">
            <div class="task-meta">
                <div>Points: ${task.points}</div>
                <div>start at :: ${new Date(task.startDate).toISOString().replace("T", " ").substring(0, 16) }</div>
                <div>deadline :: ${new Date(task.deadline).toISOString().replace("T", " ").substring(0, 16)
                   }</div>
            </div>
            <p>${task.description}</p>
            <p>Head Percent: ${task.headPercent}%</p>
            <p>DeadLinePercent: ${task.deadlinePercent}%</p>
            ${task.submissionLink && task.submissionLink !== '*' ? `
                <p>Submitted: ${new Date(task.submissionDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}</p>
                <p><a href="${task.submissionLink}" target="_blank">View Submission</a></p>
                <button id="${task.submissionFileId}">download Task</button> 
               
                <h5>Preview </h5>
                <iframe src="https://drive.google.com/file/d/${task.submissionFileId}/preview" width="600" height="400"></iframe>
                <p>head eval: ${task.headEvaluation } </p>
                <p>dead line eval : ${task.deadlineEvaluation }</p>
                <p>task rate : ${task.rate }</p>
            ` : ''}
            <div class="task-actions">
                <button onclick="editTask('${member._id}', '${task._id}')" 
                    style="background-color: var(--primary-color); color: white;">Edit</button>
                <button onclick="deleteTask('${member._id}', '${task._id}')"
                    style="background-color: var(--danger-color); color: white;">Delete</button>
                <button onclick="rateTask('${member._id}', '${task._id}')"
                    style="background-color: var(--success-color); color: white;">Rate</button>
            </div>
        </div>
    `;
                
    return div;
}

// Toggle task details
function toggleTaskDetails(header) {
    const content = header.nextElementSibling;
    const parent = header.parentElement;
    if(parent.style.zIndex == 100) 
    {
        parent.style.zIndex = 0;
    }
    else {
        parent.style.zIndex = 10;
    }
    content.classList.toggle('active');
}

// Filter tasks
function filterTasks() {
    const memberId = memberFilter.value;
    const status = statusFilter.value;
    const startDate = startDateFilter.value;
    const endDate = endDateFilter.value;
    
    submittedTasksList.innerHTML = '';
    pendingTasksList.innerHTML = '';
    
    members.forEach(member => {
        if (!memberId || member._id === memberId) {
            member.tasks.forEach(task => {
                const taskDate = new Date(task.deadline);
                const isInDateRange = (!startDate || taskDate >= new Date(startDate)) &&
                                    (!endDate || taskDate <= new Date(endDate));
                const isSubmitted = task.submissionLink && task.submissionLink !== '*';
                
                if (isInDateRange && 
                    (!status || 
                    (status === 'submitted' && isSubmitted) || 
                    (status === 'pending' && !isSubmitted))) {
                    const taskElement = createTaskElement(task, member);
                    if (isSubmitted) {
                        submittedTasksList.appendChild(taskElement);
                    } else {
                        pendingTasksList.appendChild(taskElement);
                    }
                }
            });
        }
    });
}

// Event listeners for filters
memberFilter.addEventListener('change', filterTasks);
statusFilter.addEventListener('change', filterTasks);
startDateFilter.addEventListener('change', filterTasks);
endDateFilter.addEventListener('change', filterTasks);

// Add Task
document.getElementById('taskForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        title: document.getElementById('taskTitle').value,
        description: document.getElementById('taskDescription').value,
        taskUrl: document.getElementById('taskUrl').value,
        points: parseInt(document.getElementById('points').value),
        // headPercent: parseInt(document.getElementById('headPercent').value),
        startDate: document.getElementById('taskStartDate').value,
        deadline: document.getElementById('taskEndDate').value
    };
    
    const assignedMembers = Array.from(document.querySelectorAll('.member-checkbox input:checked'))
        .map(checkbox => checkbox.value);

    if (assignedMembers.length === 0) {
        alert('Please select at least one member');
        return;
    }

    try {
        const promises = assignedMembers.map(memberId => 
            fetch(`https://assiut-robotics-zeta.vercel.app/members/${memberId}/addTask`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            }).then(res => res.json())
        );

        const results = await Promise.all(promises);
        const failures = results.filter(result => result.status === 'fail');

        if (failures.length > 0) {
            alert(`Failed to add task to ${failures.length} members. ${failures[0].message}`);
        } else {
            alert('Task(s) added successfully!');
            e.target.reset();
            await fetchMembers();
        }
    } catch (error) {
        alert('Error adding task: ' + error.message);
    }
});

// Edit Task
// async function editTask(memberId, taskId) {
//     const member = members.find(m => m._id === memberId);
//     const task = member?.tasks.find(t => t._id === taskId);
    
//     if (!task) return;

//     const newTitle = prompt('Enter new title:', task.title);
//     const newDescription = prompt('Enter new description:', task.description);
//     const newPoints = prompt('Enter new points:', task.points);
//     const newHeadPercent = prompt('Enter new head percent (50-100):', task.headPercent);
//     const newStartDate = prompt('Enter new start date (YYYY-MM-DD):', task.startDate.split('T')[0]);
//     const newDeadline = prompt('Enter new deadline (YYYY-MM-DD):', task.deadline.split('T')[0]);
//     const newTaskUrl = prompt('Enter new task URL:', task.taskUrl);

//     if (!newTitle || !newDescription || !newPoints || !newHeadPercent || !newStartDate || !newDeadline || !newTaskUrl) {
//         alert('All fields are required');
//         return;
//     }

//     const updatedTask = {
//         title: newTitle,
//         description: newDescription,
//         points: parseInt(newPoints),
//         headPercent: parseInt(newHeadPercent),
//         startDate: `${newStartDate}T00:00:00.000Z`,
//         deadline: `${newDeadline}T00:00:00.000Z`,
//         taskUrl: newTaskUrl
//     };

//     try {
//         const response = await fetch(`https://assiut-robotics-zeta.vercel.app/members/${memberId}/editTask/${taskId}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify(updatedTask)
//         });

//         const data = await response.json();
        
//         if (data.status === 'fail') {
//             throw new Error(data.message);
//         }

//         alert('Task updated successfully!');
//         await fetchMembers();
//     } catch (error) {
//         alert('Error updating task: ' + error.message);
//     }
// }

// Delete Task
async function deleteTask(memberId, taskId) {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
        const response = await fetch(`https://assiut-robotics-zeta.vercel.app/members/${memberId}/deleteTask/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message);
        }

        alert('Task deleted successfully!');
        await fetchMembers();
    } catch (error) {
        alert('Error deleting task: ' + error.message);
    }
}

// Rate Task
async function rateTask(memberId, taskId) {
    const isHead = prompt('Are you the head enter 1  for head, enter 0  for HR');
    const rating = prompt('Enter rating (1-100):');

    if (!rating || isNaN(rating) || rating < 1 || rating > 100) {
        alert('Please enter a valid rating between 1 and 100');
        return;
    }

    const ratingData = {
        headEvaluation: isHead==1 ? parseInt(rating) : -1,
        hrEvaluation: isHead!=1 ? parseInt(rating) : -1
    };

    console.log(ratingData);
    
    
    try {
        const response = await fetch(`https://assiut-robotics-zeta.vercel.app/members/members/${memberId}/rateTask/${taskId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(ratingData)
        });

        const data = await response.json();
        
        if (!response.ok) {
            // alert('Error rating task: ' + error.message);

            throw new Error(data.message);
        }

        alert('Task rated successfully!',data.message);
        await fetchMembers();
    } catch (error) {
        alert('Error rating task: ' + error.message);
    }
}




////////////////////////////////////////start here /////////////////////////

function editTask(memberId, taskId) {
    console.log(members);
    
    const member = members.find(m => m._id === memberId);
    if (member) {
        const task = member.tasks.find(t => t._id === taskId);
        console.log(task);
        
        if (task) {
            // Example: Open a modal or form to edit the task
            openEditTaskPopup(task, memberId, taskId,member);
            }
        }
}

function openEditTaskPopup(task, memberId, taskId, member) {
    const popup = document.getElementById('editTaskPopup');
    const form = document.getElementById('editTaskForm');

    // Populate the form with task details
    document.getElementById('editTitle').value = task.title;
    document.getElementById('editDescription').value = task.description;
    document.getElementById('editPoints').value = task.points;
    // document.getElementById('editHeadPercent').value = task.headPercent;
    document.getElementById('editStartDate').value = new Date(task.startDate).toISOString().replace("T", " ").substring(0, 16);

    document.getElementById('editDeadline').value = new Date(task.deadline).toISOString().replace("T", " ").substring(0, 16); // Convert to YYYY-MM-DD format
    document.getElementById('editTaskUrl').value = task.taskUrl;

    // Show the popup
    popup.style.display = 'flex';

    // Handle form submission
    form.onsubmit = function (event) {
        event.preventDefault();
        console.log('sumbsad');
        
        // Get updated values from the form
        const updatedTask = {
            newTitle: document.getElementById('editTitle').value,
            newDescription: document.getElementById('editDescription').value,
            StartDate: document.getElementById('editStartDate').value , // Convert to ISO format
            deadline: document.getElementById('editDeadline').value , // Convert to ISO format
            taskUrl: document.getElementById('editTaskUrl').value,
            points: document.getElementById('editPoints').value,
            // headPercent: document.getElementById('editHeadPercent').value,
        }; 
        console.log('bef f');
        
        if (updatedTask.newTitle && updatedTask.newDescription && updatedTask.StartDate && updatedTask.deadline && updatedTask.taskUrl && updatedTask.points ) {
            task.title = updatedTask.newTitle;
            task.description = updatedTask.newDescription;
            task.startDate = updatedTask.StartDate;
            task.deadline = updatedTask.deadline;
            task.taskUrl = updatedTask.taskUrl;
            task.points = updatedTask.points;
            // task.headPercent = updatedTask.headPercent;
            // task.hrPercent = 100 - updatedTask.headPercent;
            console.log(task);
            
            editrequest(memberId,taskId,member);
            // Close the popup
            closePopup();
        }
}



    
}

// Function to update the task
async function editrequest(memberId,taskId,member){
    fetch(` https://assiut-robotics-zeta.vercel.app/members/${memberId}/editTask/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(member.tasks.find(t => t._id === taskId))
    }).then(response =>response.json()
        
    )
    .then(data => {
        console.log('Success:', data);
        // displayTasks(member.tasks, memberId); // Refresh the task list
        if(data.message=='jwt expired'){
            alert('you have to log in again your session ended')
            window.location.href='../login/login.html'
        }
        alert(data.message);
        fetchMembers()
    }
).catch(error => {
        console.error('Error updating task:', error.message);
        alert('Error updating task');
    })
}
// Function to close the popup
function closePopup() {
    const popup = document.getElementById('editTaskPopup');
    popup.style.display = 'none ';
}












// dark mode ============================\

const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme');

// تطبيق الوضع الحالي
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
} else {
    // الوضع الافتراضي (حسب تفضيلات النظام)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
}

// تبديل الوضع
themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // تحديث أيقونة التبديل
    updateToggleIcon(newTheme);
});

// تحديث أيقونة التبديل
function updateToggleIcon(theme) {
    const lightIcon = document.querySelector('.light-icon');
    const darkIcon = document.querySelector('.dark-icon');
    
    if (theme === 'dark') {
        lightIcon.style.display = 'none';
        darkIcon.style.display = 'inline';
    } else {
        lightIcon.style.display = 'inline';
        darkIcon.style.display = 'none';
    }
}



window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newScheme = e.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newScheme);
    localStorage.setItem('theme', newScheme);
    updateToggleIcon(newScheme);
});


// Initialize
fetchMembers();

// HrEvaluationSection
async function fetchMembersForHr() {
  
    // localStorage.setItem("data", JSON.stringify({ role: "HR web" }));
    let userData = localStorage.getItem("data");
    let parsedData = JSON.parse(userData);
    let hrRole = parsedData.role;
    let words = hrRole.split(" "); 
    let hrCommitte = words.length > 1 ? words[1] : "Not found";
    // console.log(hrCommitte);
    if(hrCommitte !="Not found"){
        try {
      const response = await fetch(`https://assiut-robotics-zeta.vercel.app/members/get/${hrCommitte}`);
      const data = await response.json();
      let members = data.date;
  
      // console.log(members);
      let memberSelect = document.getElementById("memberId");
      memberSelect.innerHTML = '<option value=""> Select Member</option>';
      members.forEach(member => {
        memberSelect.innerHTML += `<option value="${member._id}">${member.name}</option>`;
      });
  
    } catch (error) {
      console.error('Error fetching members:', error);
    }
    }
  }
  
  fetchMembersForHr();
  
  document.getElementById('evaluationForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
  
    const formData = {
      month: document.getElementById('month').value,
      memberId: document.getElementById('memberId').value,
      socialScore: Number(document.getElementById('socialScore').value),
      behaviorScore: Number(document.getElementById('behaviorScore').value),
      interactionScore: Number(document.getElementById('interactionScore').value)
    };
    const messageDiv = document.getElementById('message');
    // console.log(JSON.stringify(formData));
  
    try {
      const response = await fetch('https://assiut-robotics-zeta.vercel.app/members/update-tasks-evaluation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        messageDiv.textContent = 'Evaluation submitted successfully';
        messageDiv.className = 'message success';
        e.target.reset();
  
        setTimeout(() => {
          messageDiv.style.display = 'none';
        }, 5000);
      } else {
        throw new Error('Error submitting evaluation');
      }
    } catch (error) {
      messageDiv.textContent = 'Error submitting evaluation';
      messageDiv.className = 'message error';
    }
  });
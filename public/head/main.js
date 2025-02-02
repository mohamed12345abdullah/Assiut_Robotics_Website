
var addNewTaskSection = document.getElementById("addNewTask")
var tasksSection = document.getElementById("tasksPage")
var membersSection=document.getElementById("membersPage")
const adminData = JSON.parse(localStorage.getItem('data'));
const committee = adminData.committee;
console.log(adminData);

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
document.getElementById('taskForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const taskTitle = document.getElementById('taskTitle').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const additionalURL = document.getElementById('additionalURL').value;
    const taskStartDate = document.getElementById('taskStartDate').value;
    const taskEndDate = document.getElementById('taskEndDate').value;
    const assignedMembers = [];
    const checkboxes = document.querySelectorAll('.members-list input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        assignedMembers.push(checkbox.value);
    });

    const taskData = {
        title: taskTitle,
        description: taskDescription,
        additionalURL: additionalURL,
        startDate: taskStartDate,
        endDate: taskEndDate,
        assignedMembers: assignedMembers
    };

    const jsonData = JSON.stringify(taskData);
    console.log(jsonData);
});

//////////////////////////
//                  document.getElementById('taskForm').addEventListener('submit', function (event) {
//     event.preventDefault();

//     const taskTitle = document.getElementById('taskTitle').value;
//     const taskDescription = document.getElementById('taskDescription').value;
//     const additionalURL = document.getElementById('additionalURL').value;
//     const taskStartDate = document.getElementById('taskStartDate').value;
//     const taskEndDate = document.getElementById('taskEndDate').value;
//     const assignedMembers = [];
//     const checkboxes = document.querySelectorAll('.members-list input[type="checkbox"]:checked');
//     checkboxes.forEach(checkbox => {
//         assignedMembers.push(checkbox.value);
//     });

//     const taskData = {
//         title: taskTitle,
//         description: taskDescription,
//         startDate: taskStartDate,
//         deadline: taskEndDate,
//         taskUrl: additionalURL
//     };
//     assignedMembers.forEach(memberId => {
//     fetch(`https://assiut-robotics-zeta.vercel.app/members/${taskEndDate}/addTask`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}` // Replace with your actual token
//             },
//             body: JSON.stringify(taskData)
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Success:', data);
//             alert('Task added successfully!');
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//             alert('Error adding task');
//         });
//     })
    
//                  });
//////////////////////////
// function editTask(taskId, updatedTaskData) {
//     fetch(`http://localhost:3000/members/6796d854abce3e78f602e9b5/editTask/${taskId}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer YOUR_AUTH_TOKEN' // Replace with your actual token
//         },
//         body: JSON.stringify(updatedTaskData)
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Success:', data);
//         alert('Task updated successfully!');
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//         alert('Error updating task');
//     });
// }

// // Example usage:
// // editTask('679b3afbce8cb1af75e779ba', {
// //     title: "task1 edited",
// //     description: "description task",
// //     startDate: "2025-01-30T07:44:46.344Z",
// //     deadline: "2025-02-30T07:44:46.344Z",
// //     taskUrl: "task url"
// // });
// ///////////////////////////////////////////////////////
// function deleteTask(taskId) {
//     fetch(`http://localhost:3000/members/6796d854abce3e78f602e9b5/deleteTask/${taskId}`, {
//         method: 'DELETE',
//         headers: {
//             'Authorization': 'Bearer YOUR_AUTH_TOKEN' // Replace with your actual token
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Success:', data);
//         alert('Task deleted successfully!');
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//         alert('Error deleting task');
//     });
// }

// // Example usage:
// // deleteTask('679b3d8c0fc5244d8b5b19bb');
// ///////////////////////////////////////////
// function fetchTasks() {
//     fetch('http://localhost:3000/members/6796d854abce3e78f602e9b5/tasks', {
//         method: 'GET',
//         headers: {
//             'Authorization': 'Bearer YOUR_AUTH_TOKEN' // Replace with your actual token
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Tasks:', data);
//         // Update the DOM to display the tasks
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });
// }

// // Example usage:
// // fetchTasks();
// //////////////////////////////////
let membersData = []; // Store all members and their tasks here

document.addEventListener('DOMContentLoaded', function () {
    fetchMembers();
    displayTasks(adminData.tasks, adminData._id);
});
form.addEventListener('submit', function (event) {
    event.preventDefault();
    const taskTitle = document.getElementById('taskTitle').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const url = document.getElementById('additionalURL').value;
    const points = document.getElementById('points').value;
    const headPercent = document.getElementById('headPercent').value;
    const additionalURL = document.getElementById('additionalURL').value;
    const taskStartDate = document.getElementById('taskStartDate').value;
    const taskEndDate = document.getElementById('taskEndDate').value;
    const assignedMembers = [];
    console.log(headPercent);
    
    const checkboxes = document.querySelectorAll('.members-list input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        assignedMembers.push(checkbox.value);
    });
    console.log(assignedMembers);
    
    let body = {
        title: taskTitle,
        description: taskDescription,
        taskUrl: url,
        points: points,
        additionalURL: additionalURL,
        headPercent: headPercent,
        startDate: taskStartDate,
        deadline: taskEndDate,
        assignedMembers: assignedMembers
    }
    addTask(body);
})

function addTask(form) {
    
    form.assignedMembers.forEach(memberId => {
        fetch(`https://assiut-robotics-zeta.vercel.app/members/${memberId}/addTask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Replace with your actual token
            },
            body: JSON.stringify(form)        
        }).then(response => response.json()).then(data => {
            alert(data.message);
            console.log(data);
        })
    })
    
}
function displayMemberCheckboxes(members) {
    const membersList = document.querySelectorAll('.members-list')[0];
    console.log(membersList);
    
    membersList.innerHTML = ''; // Clear existing content
    console.log(members);
    members.forEach(member => {
        console.log(member);
        
        const checkboxContainer = document.createElement('div');
        checkboxContainer.className = 'member-checkbox';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `member-${member._id}`;
        checkbox.name = 'members';
        checkbox.value = member._id; // Set the member's ID as the value

        const label = document.createElement('label');
        label.htmlFor = `member-${member._id}`;
        label.textContent = member.name; // Display the member's name

        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(label);
        membersList.appendChild(checkboxContainer);
    });
}
function fetchMembers() {
    fetch(`https://assiut-robotics-zeta.vercel.app/members/get/web`)
        .then(response => response.json())
        .then(data => {
            membersData = data.date; // Store the fetched data
            displayMembers(membersData); // Display the list of members
            displayMemberCheckboxes(membersData);
        })
        .catch(error => console.error('Error fetching members:', error));
}
function displayMembers(members) {
    const membersList = document.getElementById('membersList');
    membersList.innerHTML = ''; // Clear existing members

    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'member-card';
        memberCard.innerHTML = `
            <h3>${member.name}</h3>
            <p>${member.committee}</p>
            <small>${member.email}</small>
            <button onclick="viewMemberDetails('${member._id}')">View Details</button>
        `;
        membersList.appendChild(memberCard);
    });
}
function viewMemberDetails(memberId) {
    const member = membersData.find(m => m._id === memberId); // Find the member in the stored data
    if (member) {
        displayMemberDetails(member); // Display member details
        displayTasks(member.tasks, memberId); // Display tasks for the member
    }
}

function displayMemberDetails(member) {
    const memberInfo = document.getElementById('memberInfo');
    memberInfo.innerHTML = `
        <p>Name: ${member.name}</p>
        <p>Email: ${member.email}</p>
        <p>Committee: ${member.committee}</p>
        <p>Role: ${member.role}</p>
    `;
    document.getElementById('selectedMemberName').textContent = member.name;
}

function displayTasks(tasks, memberId) {
    const taskList = document.querySelectorAll('#taskList');
    console.log(taskList);
    taskList.forEach(list => {
        list.innerHTML = ''; // Clear existing tasks

        tasks.forEach(task => {
           
            const taskCard = document.createElement('div');
            taskCard.className = 'task-card';
            taskCard.innerHTML = `
             <h2 id="submitted" style = "display : none"><a href ="${task.submissionLink}">Submmitted at ${new Date (task.submissionDate).toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })} </a> </h2>
                <h3>${task.title}</h3>
               
                <p>${task.description}</p>
                <p>Points : ${task.points}</p>
                <p> head percent is ${task.headPercent}%</p>
                <p> hr percent is ${100- task.headPercent}%</p>
                <p>Start Date: ${new Date(task.startDate).toLocaleDateString()}</p>
                <p>Deadline: ${new Date(task.deadline).toLocaleDateString()}</p>
                <p>Rate of the head: ${task.headEvaluation}%</p>
                <p>Rate of the hr: ${task.hrEvaluation }%</p>
                <p>Task URL: <a href="${task.taskUrl}" target="_blank">${task.taskUrl}</a></p>
                
                <button onclick="editTask('${memberId}', '${task._id}')">Edit</button>
                <button onclick="deleteTask('${memberId}', '${task._id}')">Delete</button>
                <button onclick="rateTask('${memberId}', '${task._id}')">Rate</button>
            `;
            if(task.submissionLink != '*'){
                const submitted = taskCard.querySelector('#submitted');
                submitted.style.display = 'block';
            }
            console.log(list);
            
            list.appendChild(taskCard);

        });
    })
    
}

// Function to update the task (you can implement this)

function editTask(memberId, taskId) {
    const member = membersData.find(m => m._id === memberId);
    if (member) {
        const task = member.tasks.find(t => t._id === taskId);
        console.log(task);
        
        if (task) {
            // Example: Open a modal or form to edit the task
            openEditTaskPopup(task, memberId, taskId,member);
            }
        }
}
// Function to open the popup with task details
function openEditTaskPopup(task, memberId, taskId, member) {
    const popup = document.getElementById('editTaskPopup');
    const form = document.getElementById('editTaskForm');

    // Populate the form with task details
    document.getElementById('editTitle').value = task.title;
    document.getElementById('editDescription').value = task.description;
    document.getElementById('editPoints').value = task.points;
    document.getElementById('editHeadPercent').value = task.headPercent;
    document.getElementById('editStartDate').value = task.startDate.split('T')[0]; // Convert to YYYY-MM-DD format
    document.getElementById('editDeadline').value = task.deadline.split('T')[0]; // Convert to YYYY-MM-DD format
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
            StartDate: document.getElementById('editStartDate').value + 'T00:00:00.000Z', // Convert to ISO format
            deadline: document.getElementById('editDeadline').value + 'T00:00:00.000Z', // Convert to ISO format
            taskUrl: document.getElementById('editTaskUrl').value,
            points: document.getElementById('editPoints').value,
            headPercent: document.getElementById('editHeadPercent').value,
        }; 
        console.log('bef f');
        
        if (updatedTask.newTitle && updatedTask.newDescription && updatedTask.StartDate && updatedTask.deadline && updatedTask.taskUrl && updatedTask.points && updatedTask.headPercent) {
            task.title = updatedTask.newTitle;
            task.description = updatedTask.newDescription;
            task.StartDate = updatedTask.StartDate;
            task.deadline = updatedTask.deadline;
            task.taskUrl = updatedTask.taskUrl;
            task.points = updatedTask.points;
            task.headPercent = updatedTask.headPercent;
            task.hrPercent = 100 - updatedTask.headPercent;
            console.log(task);
            
            editrequest(memberId,taskId,member);
            // Close the popup
            closePopup();
        }
}



    
}
// Function to update the task
function editrequest(memberId,taskId,member){
    fetch(`https://assiut-robotics-zeta.vercel.app/members/${memberId}/editTask/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(member.tasks.find(t => t._id === taskId))
    }).then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        displayTasks(member.tasks, memberId); // Refresh the task list
        alert('Task updated successfully!');
    }).catch(error => {
        console.error('Error updating task:', error);
        alert('Error updating task');
    })
}
// Function to close the popup
function closePopup() {
    const popup = document.getElementById('editTaskPopup');
    popup.style.display = 'none ';
}


function deleteTask(memberId, taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        const member = membersData.find(m => m._id === memberId);
        if (member) {
            member.tasks = member.tasks.filter(t => t._id !== taskId); // Remove the task
            
            fetch(`https://assiut-robotics-zeta.vercel.app/members/${memberId}/deleteTask/${taskId}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then(response => response.json()).then(data => {
                console.log('Success:', data);
                if(data.status != 'fail')
                {
                    displayTasks(member.tasks, memberId); // Refresh the task list
                    alert('Task deleted successfully!');                 
                }
                else alert(data.message);
            }).catch(error => {
                console.error('Error deleting task:', error);
                alert('Error deleting task');
            })
        }
    }
}
function rateTask(memberId, taskId) {
    const rater = prompt('Enter your 1 if your are the head 0 if you are the hr: ');
    const rating = Number(prompt('Enter a rating for this task (1-100):'));
    if (rating && rating >= 1 && rating <= 100) {
        const member = membersData.find(m => m._id === memberId);
        let key;
        let body = {
            hrEvaluation: -1,
            headEvaluation: -1
        }
        if (member) {
            const task = member.tasks.find(t => t._id === taskId);
            if (task) {
                if(rater == 1)
                {
                    task.headEvaluation = rating; // Update the task's rating
                    body.headEvaluation = rating;
                }
                else if(rater == 0){
                    task.hrEvaluation = rating;
                    body.hrEvaluation = rating;
                } 
                console.log(body);
                
                fetch(`https://assiut-robotics-zeta.vercel.app/members/members/${memberId}/rateTask/${taskId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(body)
                }).then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    if(data.status != 'fail')
                    {
                        displayTasks(member.tasks, memberId); // Refresh the task list
                        alert(data.message);

                    }
                    else
                        alert(data.message); 
                }).catch(error => {
                    console.error('Error rating task:', error.message);
                    alert('Error rating task');
                })
                
            }
        }
    } else {
        alert('Please enter a valid rating between 1 and 10.');
    }
    
}
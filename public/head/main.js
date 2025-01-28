var addNewTaskSection = document.getElementById("addNewTask")
var tasksSection = document.getElementById("tasksPage")
var membersSection=document.getElementById("membersPage")
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

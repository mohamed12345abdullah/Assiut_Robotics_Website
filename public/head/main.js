



var memberTasksSection=document.getElementById("memberTasks")
var addNewTaskSection=document.getElementById("addNewTask")
var tasksSection=document.getElementById("tasksPage")

function togglePages(id){
if(id=="tasksSection"){
    tasksSection.style.display="block"
    addNewTaskSection.style.display="none"
    memberTasksSection.style.display="none"
    
}
else if(id=="addNewTaskSection"){
    tasksSection.style.display="none"
    addNewTaskSection.style.display="block"
    memberTasksSection.style.display="none"
}
else if(id=="memberTasksSection"){
    tasksSection.style.display="none"
    addNewTaskSection.style.display="none"
    memberTasksSection.style.display="block"
}
}
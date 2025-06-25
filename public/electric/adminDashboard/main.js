// Electric Data Model
const electricData = {
    tracks: [
        {
            name: "Embedded",
            icon: "<i class='fa fa-microchip icon'></i>",
            description: "كل ما يخص الأنظمة المدمجة.",
            courses: [
                {
                    name: "Intro to Embedded",
                    description: "مقدمة عن الأنظمة المدمجة.",
                    tasks: [
                        {
                            name: "Blink LED",
                            description: "برمجة دائرة لجعل LED تضيء وتطفئ.",
                            link: "https://example.com/blink",
                            submitLink: "https://forms.gle/submit-blink"
                        }
                    ]
                }
            ]
        },
        {
            name: "Hardware",
            icon: "<i class='fa fa-cogs icon'></i>",
            description: "كل ما يخص الهاردوير.",
            courses: []
        }
    ]
};

// State
let currentView = 'tracks'; // 'tracks' | 'courses' | 'tasks'
let selectedTrackIndex = null;
let selectedCourseIndex = null;
let editMode = false;
let editIndices = {};

// DOM Elements
const headerTitle = document.getElementById('header-title');
const addBtn = document.getElementById('add-btn');
const coreSection = document.getElementById('core-section');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('close-modal');
const modalForm = document.getElementById('modal-form');
const modalFields = document.getElementById('modal-fields');
const modalSubmit = document.getElementById('modal-submit');

// Notification
function showNotification(msg, type = 'success') {
    let notif = document.createElement('div');
    notif.className = `notif notif-${type}`;
    notif.textContent = msg;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2000);
}

// Render Functions
function renderTracks() {
    currentView = 'tracks';
    selectedTrackIndex = null;
    selectedCourseIndex = null;
    headerTitle.textContent = 'Tracks';
    addBtn.textContent = 'Add Track';
    addBtn.onclick = () => openModal('track');
    coreSection.innerHTML = '';
    electricData.tracks.forEach((track, idx) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            ${track.icon}
            <h3>${track.name}</h3>
            <p>${track.description}</p>
            <div class="card-actions">
                <span class="edit-btn" title="Edit"><i class="fa fa-edit"></i></span>
                <span class="delete-btn" title="Delete"><i class="fa fa-trash"></i></span>
            </div>
        `;
        card.onclick = (e) => {
            if (e.target.closest('.edit-btn')) {
                e.stopPropagation();
                openModal('track', true, { idx });
            } else if (e.target.closest('.delete-btn')) {
                e.stopPropagation();
                if (confirm('Delete this track?')) {
                    electricData.tracks.splice(idx, 1);
                    showNotification('Track deleted', 'success');
                    renderTracks();
                }
            } else {
                renderCourses(idx);
            }
        };
        coreSection.appendChild(card);
    });
}

function renderCourses(trackIdx) {
    currentView = 'courses';
    selectedTrackIndex = trackIdx;
    selectedCourseIndex = null;
    const track = electricData.tracks[trackIdx];
    headerTitle.innerHTML = `${track.icon} ${track.name} - Courses`;
    addBtn.textContent = 'Add Course';
    addBtn.onclick = () => openModal('course');
    coreSection.innerHTML = '';
    // Back button
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = 'Back to Tracks';
    backBtn.onclick = renderTracks;
    coreSection.appendChild(backBtn);
    // Courses
    if (track.courses.length === 0) {
        const empty = document.createElement('div');
        empty.textContent = 'No courses yet.';
        empty.style.margin = '32px auto';
        coreSection.appendChild(empty);
    } else {
        track.courses.forEach((course, idx) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${course.name}</h3>
                <p>${course.description}</p>
                <div class="card-actions">
                    <span class="edit-btn" title="Edit"><i class="fa fa-edit"></i></span>
                    <span class="delete-btn" title="Delete"><i class="fa fa-trash"></i></span>
                </div>
            `;
            card.onclick = (e) => {
                if (e.target.closest('.edit-btn')) {
                    e.stopPropagation();
                    openModal('course', true, { idx });
                } else if (e.target.closest('.delete-btn')) {
                    e.stopPropagation();
                    if (confirm('Delete this course?')) {
                        track.courses.splice(idx, 1);
                        showNotification('Course deleted', 'success');
                        renderCourses(trackIdx);
                    }
                } else {
                    renderTasks(trackIdx, idx);
                }
            };
            coreSection.appendChild(card);
        });
    }
}

function renderTasks(trackIdx, courseIdx) {
    currentView = 'tasks';
    selectedTrackIndex = trackIdx;
    selectedCourseIndex = courseIdx;
    const track = electricData.tracks[trackIdx];
    const course = track.courses[courseIdx];
    headerTitle.innerHTML = `${track.icon} ${track.name} / ${course.name} - Tasks`;
    addBtn.textContent = 'Add Task';
    addBtn.onclick = () => openModal('task');
    coreSection.innerHTML = '';
    // Back button
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = 'Back to Courses';
    backBtn.onclick = () => renderCourses(trackIdx);
    coreSection.appendChild(backBtn);
    // Tasks
    if (!course.tasks || course.tasks.length === 0) {
        const empty = document.createElement('div');
        empty.textContent = 'No tasks yet.';
        empty.style.margin = '32px auto';
        coreSection.appendChild(empty);
    } else {
        course.tasks.forEach((task, idx) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${task.name}</h3>
                <p>${task.description}</p>
                <a href="${task.link}" target="_blank">Task Link</a><br>
                <a href="${task.submitLink}" target="_blank">Submit</a>
                <div class="card-actions">
                    <span class="edit-btn" title="Edit"><i class="fa fa-edit"></i></span>
                    <span class="delete-btn" title="Delete"><i class="fa fa-trash"></i></span>
                </div>
            `;
            card.onclick = (e) => {
                if (e.target.closest('.edit-btn')) {
                    e.stopPropagation();
                    openModal('task', true, { idx });
                } else if (e.target.closest('.delete-btn')) {
                    e.stopPropagation();
                    if (confirm('Delete this task?')) {
                        course.tasks.splice(idx, 1);
                        showNotification('Task deleted', 'success');
                        renderTasks(trackIdx, courseIdx);
                    }
                }
            };
            coreSection.appendChild(card);
        });
    }
}

// Modal Logic
function openModal(type, isEdit = false, indices = {}) {
    modal.classList.add('show');
    modalFields.innerHTML = '';
    editMode = isEdit;
    editIndices = indices;
    let values = {};
    if (isEdit) {
        if (type === 'track') {
            const t = electricData.tracks[indices.idx];
            values = { name: t.name, icon: t.icon, description: t.description };
        } else if (type === 'course') {
            const c = electricData.tracks[selectedTrackIndex].courses[indices.idx];
            values = { name: c.name, description: c.description };
        } else if (type === 'task') {
            const t = electricData.tracks[selectedTrackIndex].courses[selectedCourseIndex].tasks[indices.idx];
            values = { name: t.name, description: t.description, link: t.link, submitLink: t.submitLink };
        }
    }
    modalForm.onsubmit = (e) => {
        e.preventDefault();
        if (type === 'track') {
            const name = document.getElementById('track-name').value;
            const icon = document.getElementById('track-icon').value;
            const description = document.getElementById('track-description').value;
            if (editMode) {
                const t = electricData.tracks[editIndices.idx];
                t.name = name;
                t.icon = icon;
                t.description = description;
                showNotification('Track updated', 'success');
            } else {
                electricData.tracks.push({ name, icon, description, courses: [] });
                showNotification('Track added', 'success');
            }
            renderTracks();
        } else if (type === 'course') {
            const name = document.getElementById('course-name').value;
            const description = document.getElementById('course-description').value;
            if (editMode) {
                const c = electricData.tracks[selectedTrackIndex].courses[editIndices.idx];
                c.name = name;
                c.description = description;
                showNotification('Course updated', 'success');
            } else {
                electricData.tracks[selectedTrackIndex].courses.push({ name, description, tasks: [] });
                showNotification('Course added', 'success');
            }
            renderCourses(selectedTrackIndex);
        } else if (type === 'task') {
            const name = document.getElementById('task-name').value;
            const description = document.getElementById('task-description').value;
            const link = document.getElementById('task-link').value;
            const submitLink = document.getElementById('task-submit-link').value;
            if (editMode) {
                const t = electricData.tracks[selectedTrackIndex].courses[selectedCourseIndex].tasks[editIndices.idx];
                t.name = name;
                t.description = description;
                t.link = link;
                t.submitLink = submitLink;
                showNotification('Task updated', 'success');
            } else {
                electricData.tracks[selectedTrackIndex].courses[selectedCourseIndex].tasks.push({ name, description, link, submitLink });
                showNotification('Task added', 'success');
            }
            renderTasks(selectedTrackIndex, selectedCourseIndex);
        }
        closeModal();
    };
    if (type === 'track') {
        modalFields.innerHTML = `
            <label for="track-name">Track Name</label>
            <input id="track-name" required value="${values.name || ''}">
            <label for="track-icon">Track Icon (HTML)</label>
            <input id="track-icon" value='${values.icon ? values.icon.replace(/'/g, "&apos;") : "<i class=\'fa fa-microchip icon\'></i>"}'>
            <label for="track-description">Description</label>
            <textarea id="track-description" required>${values.description || ''}</textarea>
        `;
    } else if (type === 'course') {
        modalFields.innerHTML = `
            <label for="course-name">Course Name</label>
            <input id="course-name" required value="${values.name || ''}">
            <label for="course-description">Description</label>
            <textarea id="course-description" required>${values.description || ''}</textarea>
        `;
    } else if (type === 'task') {
        modalFields.innerHTML = `
            <label for="task-name">Task Name</label>
            <input id="task-name" required value="${values.name || ''}">
            <label for="task-description">Description</label>
            <textarea id="task-description" required>${values.description || ''}</textarea>
            <label for="task-link">Task Link</label>
            <input id="task-link" type="url" value="${values.link || ''}">
            <label for="task-submit-link">Submit Link</label>
            <input id="task-submit-link" type="url" value="${values.submitLink || ''}">
        `;
    }
}

function closeModal() {
    modal.classList.remove('show');
    modalForm.reset();
    editMode = false;
    editIndices = {};
}
closeModalBtn.onclick = closeModal;
window.onclick = function(event) {
    if (event.target === modal) closeModal();
};

// Notification CSS
(function addNotifCSS() {
    const style = document.createElement('style');
    style.innerHTML = `
    .notif {
        position: fixed;
        top: 32px;
        right: 32px;
        background: #222a44;
        color: #fff;
        padding: 16px 32px;
        border-radius: 8px;
        font-size: 1.1rem;
        z-index: 2000;
        box-shadow: 0 2px 12px rgba(0,0,0,0.18);
        opacity: 0.95;
        transition: opacity 0.3s;
    }
    .notif-success { background: #43a047; }
    .notif-error { background: #e53935; }
    `;
    document.head.appendChild(style);
})();

// Initial Render
renderTracks();
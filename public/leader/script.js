async function fetchCommittees() {
    const response = await fetch('/api/committees');
    return response.json();
}

function renderTabs(committees) {
    const tabs = document.getElementById('tabs');
    committees.forEach((committee, index) => {
        const tab = document.createElement('div');
        tab.className = `tab ${index === 0 ? 'active' : ''}`;
        tab.textContent = committee.name;
        tab.onclick = () => switchTab(index);
        tabs.appendChild(tab);
    });
}

function renderContainers(committees) {
    const containers = document.getElementById('containers');
    committees.forEach((committee, index) => {
        const container = document.createElement('div');
        container.className = `container ${index === 0 ? 'active' : ''}`;
        
        container.innerHTML = `
            <h2>${committee.name}</h2>
            <h3>Members</h3>
            ${committee.members.map(member => `
                <div class="card">
                    <p>${member.name} (${member.role})</p>
                    <button onclick="removeMember(${committee.id}, ${member.id})">Remove</button>
                    ${member.role !== 'Head' ? `<button onclick="setHead(${committee.id}, ${member.id})">Set Head</button>` : ''}
                </div>
            `).join('')}
            <h3>Pending</h3>
            ${committee.pending.map(pending => `
                <div class="card pending">
                    <p>${pending.name}</p>
                    <button onclick="approveMember(${committee.id}, ${pending.id})">Approve</button>
                </div>
            `).join('')}
        `;

        containers.appendChild(container);
    });
}

function switchTab(index) {
    document.querySelectorAll('.tab').forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
    });

    document.querySelectorAll('.container').forEach((container, i) => {
        container.classList.toggle('active', i === index);
    });
}

async function removeMember(committeeId, memberId) {
    await fetch(`/api/committees/${committeeId}/members/${memberId}`, { method: 'DELETE' });
    location.reload();
}

async function approveMember(committeeId, memberId) {
    await fetch(`/api/committees/${committeeId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId })
    });
    location.reload();
}

async function setHead(committeeId, memberId) {
    await fetch(`/api/committees/${committeeId}/set-head`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId })
    });
    location.reload();
}


async function startPage() {
    const committees = await fetchCommittees();
    renderTabs(committees);
    renderContainers(committees);
}

window.onload = function(e){ 
    console.log("Leaders Page: window.onload");
    startPage();
}

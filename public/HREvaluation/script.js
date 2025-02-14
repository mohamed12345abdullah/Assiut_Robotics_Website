async function fetchMembers() {

  //let committee = localStorage.getItem("committee");
  let committee = 'web'
  try {
    const response = await fetch(`https://assiut-robotics-zeta.vercel.app/members/get/${committee}`);
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

fetchMembers();

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
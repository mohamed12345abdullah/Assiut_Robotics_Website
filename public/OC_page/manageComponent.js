

// toggle burger to show the nav bar items in the phone


document.querySelector('.burger').addEventListener('click', () => {
// show the nav bar items in the phone
console.log('click');

document.querySelector('nav').classList.toggle('active');

// show the boxes
document.querySelector('nav .box').classList.toggle('active');

})







// render requested components

const requestedComponents = document.querySelector('.requested-components');

function renderRequestedComponents(){

    console.log('rendering requested components');
    
    requestedComponents.innerHTML = '';
    try {
        fetch('https://assiut-robotics-zeta.vercel.app/components/getRequestedComponent',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.data.forEach(component => {
            const componentCard = document.createElement('div');
            componentCard.classList.add('component-card');
            componentCard.innerHTML = `            
                <div class="component-info">
                    <h3 class="component-name">${component.title}</h3>
                    <img class="component-image" src="${component.image}" alt="">
                    <p class="component-description">${component.category}</p>

                </div>
                <div class="member-info">
                    <p class="member-name">${component.requestToBorrow.name}</p>
                    <img class="member-image" src="${component.requestToBorrow.avatar}" alt="">
                    <p class="member-email">${component.requestToBorrow.email}</p>
                    <p class="member-phone">${component.requestToBorrow.phoneNumber}</p>

                </div>
                <div class="component-actions">
                    <button class="approve" onclick="approveComponent('${component._id}')">Approve</button>
                    <button class="reject" onclick="rejectComponent('${component._id}')">Reject</button>
                </div>
  
            `;
            requestedComponents.appendChild(componentCard);
        });
    })
    } catch (error) {
        console.log('Error fetching requested components:', error);
    }
}



// pop up form for approve

const approveForm = document.querySelector('.approve-form');
const approveFormContent = document.querySelector('.approve-form-content');

document.querySelector('html').addEventListener('click', () => {
    approveForm.classList.remove('active');
    approveFormContent.classList.remove('active');
})

const approveComponent = (componentId) => {
    approveForm.classList.add('active');
    approveFormContent.classList.add('active');
    // set component id
    approveFormContent.querySelector('#componentId').value = componentId;

}

approveForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const componentId = approveFormContent.querySelector('#componentId').value;
    const borrowDate = approveFormContent.querySelector('#borrowDate').value;
    const deadlineDate = approveFormContent.querySelector('#deadlineDate').value;

    // send request to approve component
    fetch('https://assiut-robotics-zeta.vercel.app/components/acceptRequestToBorrow', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            componentId,
            borrowDate,
            deadlineDate
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // close the popup
        approveFormContent.classList.remove('active');
        approveForm.classList.remove('active');
        alert(data.message);
        renderRequestedComponents();
    })
    .catch(error => {
        console.log(error);
        alert(error.message);
    })
})



const rejectComponent = (componentId) => {
    // send request to reject component
    fetch('https://assiut-robotics-zeta.vercel.app/components/rejectRequestToBorrow', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            componentId
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // close the popup
        approveFormContent.classList.toggle('active');
        alert(data.message);
        renderRequestedComponents();
    })
    .catch(error => {
        console.log(error);
        alert(error.message);
    })
}

renderRequestedComponents();
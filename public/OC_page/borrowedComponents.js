document.addEventListener('DOMContentLoaded', () => {
    fetchBorrowedComponents();
});

async function fetchBorrowedComponents() {
    const loadingSpinner = document.getElementById('loadingSpinner');
    const noComponents = document.getElementById('noComponents');
    const componentsContainer = document.getElementById('componentsContainer');

    try {
        loadingSpinner.classList.remove('d-none');
        componentsContainer.innerHTML = '';

        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch('https://assiut-robotics-zeta.vercel.app/components/getBorrowedComponent', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch borrowed components');
        }

        const data = await response.json();
        
        if (data.data.length === 0) {
            noComponents.classList.remove('d-none');
            return;
        }

        data.data.forEach(component => {
            const componentCard = createComponentCard(component);
            componentsContainer.appendChild(componentCard);
        });

    } catch (error) {
        console.error('Error:', error);
        componentsContainer.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-danger" role="alert">
                    Error loading components: ${error.message}
                </div>
            </div>
        `;
    } finally {
        loadingSpinner.classList.add('d-none');
    }
}

function createComponentCard(component) {
    const card = document.createElement('div');
    card.className = 'col-md-6 col-lg-4';
    
    const isOverdue = new Date(component.borrowedBy.deadlineDate) < new Date();
    const statusClass = isOverdue ? 'status-overdue' : 'status-active';
    const statusText = isOverdue ? 'Overdue' : 'Active';

    card.innerHTML = `
        <div class="component-card">
            <div class="position-relative">
                <img src="${component.image}" alt="${component.title}" class="component-image">
                <span class="status-badge ${statusClass}">${statusText}</span>
            </div>
            <div class="component-info">
                <h3 class="component-title">${component.title}</h3>
                <div class="component-details">
                    <p><strong>Category:</strong> ${component.category}</p>
                    <p><strong>Price:</strong> $${component.price}</p>
                </div>
                <div class="borrower-info">
                    <img src="${component.borrowedBy.member.avatar}" alt="${component.borrowedBy.member.name}" class="borrower-avatar">
                    <div class="borrower-details">
                        <p class="borrower-name">${component.borrowedBy.member.name}</p>
                        <p class="borrower-committee">${component.borrowedBy.member.committee}</p>
                    </div>
                </div>
                <div class="dates-info">
                    <p><strong>Borrowed:</strong> ${formatDate(component.borrowedBy.borrowDate)}</p>
                    <p><strong>Deadline:</strong> <span class="deadline-date">${formatDate(component.borrowedBy.deadlineDate)}</span></p>
                </div>
            </div>
        </div>
    `;

    return card;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
} 
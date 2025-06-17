// Scenarios:
// 1. View Components
//    - Display requested components (components that members want to borrow)
//    - Display borrowed components (components currently borrowed by members) // problem
//    - Each component card shows:
//      * Component details (name, image, category)
//      * Member details (name, avatar, email, phone)
//      * Action buttons (Approve/Reject for requested components)

// 2. Approve Component Request
//    - Click "Approve" button on a component card
//    - Modal opens with:
//      * Component details
//      * Date selection fields (borrow date and return date)
//    - Validate dates:
//      * Borrow date cannot be in the past
//      * Return date must be after borrow date
//      * Maximum borrow period is 30 days
//    - Submit approval to API
//    - Show success/error message
//    - Refresh component list

// 3. Reject Component Request
//    - Click "Reject" button on a component card
//    - Show confirmation dialog
//    - Submit rejection to API
//    - Show success/error message
//    - Refresh component list

// 4. Navigation
//    - Switch between requested and borrowed components sections
//    - Mobile responsive navigation menu







// DOM Elements
const burger = document.querySelector('.burger');
const nav = document.querySelector('nav');
const navLinks = document.querySelector('.nav-links');
const approveForm = document.querySelector('.approve-form');
const approveFormContent = document.querySelector('.approve-form-content');
const cancelBtn = document.querySelector('.cancel-btn');
let allcomponents = [];
let errorMessageForAcceptForm = document.getElementById("error-message")
// State Management
let isLoading = false;





// Main function to initialize the page
async function initialize() {
    console.log('Initializing page');
    try {
        showLoading();
        await Promise.all([
            renderRequestedComponents(),
        ]);
        console.log('Components rendered');
    } catch (error) {
        console.error('Error initializing:', error);
        showError('Failed to initialize. Please refresh the page.');
    } finally {
        hideLoading();
    }
}







// ===== Nav bar ===== //
// Toggle Navigation
burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
});

    // Toggle mobile navigation
document.querySelector('.burger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');  // active: حالة القائمة (مفتوحة/مغلقة)
});

    // Close mobile navigation when clicking outside
document.addEventListener('click', (e) => {  // e: حدث النقر
    if (!e.target.closest('.nav-links') && !e.target.closest('.burger')) {  // target: العنصر الذي تم النقر عليه
        document.querySelector('.nav-links').classList.remove('active');
    }
});

    // Close Navigation on Click Outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
    }
});










// ===== View Components Functions ===== //

// Render Requested Components
async function renderRequestedComponents() {
    const container = document.querySelector('.components-container');
    let components = await fetchComponents('getRequestedComponent');
    console.log(components);
    renderComponents(components, container);
}

    // Fetch components from API
async function fetchComponents(endpoint) {
    try {
        const response = await fetch(`https://assiut-robotics-server.vercel.app/components/${endpoint}`, {  // response: استجابة الخادم
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`  // token: توكن المصادقة
            }
        });

        if (!response.ok) {            
            throw new Error('Failed to fetch components');
        }
        
        let  data = await response.json();  // data: البيانات المستلمة من الخادم
        console.log(data);
        allcomponents = data.data;
        return allcomponents;  // إرجاع مصفوفة المكونات أو مصفوفة فارغة
    } catch (error) {
        console.error('Error fetching components:', error);
        showError('Failed to fetch components. Please try again.');
        return [];
    }
}


    // Render components in container
function renderComponents(components, container) {  // components: مصفوفة المكونات, container: حاوية العرض
    console.log("rendering components" );
    
    
    
    container.innerHTML = '';
    components.forEach(component => {  // component: بيانات المكون الحالي
        const card = createComponentCard(component);  // card: عنصر HTML لبطاقة المكون
        container.appendChild(card);
    });

    console.log("finished from rendering components");
}

// Create component card HTML
function createComponentCard(component) {  // component: بيانات المكون
    const card = document.createElement('div');  // card: عنصر HTML جديد
    card.classList.add('component-card');
    
    card.innerHTML = `
        <div class="component-info">
            <h3 class="component-name">${escapeHTML(component.title)}</h3>  
            <img class="component-image" src="${escapeHTML(component.image)}" alt="${escapeHTML(component.title)}">  
            <p class="component-description">${escapeHTML(component.category)}</p>  
        </div>
        <div class="member-info">
            <p class="member-name">${escapeHTML(component.requestToBorrow.name)}</p>  
            <img class="member-image" src="${escapeHTML(component.requestToBorrow.avatar)}" alt="${escapeHTML(component.requestToBorrow.name)}">  
            <p class="member-email">${escapeHTML(component.requestToBorrow.email)}</p>  
            <p class="member-phone">${escapeHTML(component.requestToBorrow.phoneNumber)}</p>
        </div>
        <div class="component-actions">
            <button class="approve" onclick="approveComponent('${component._id}')">Approve</button> 
            <button class="reject" onclick="rejectComponent('${component._id}')">Reject</button>
        </div>
    `;
    
    return card;
}









// Create Approve Form Modal
function createApproveFormModal(component) {
    console.log("creating approve form model");
    const modal = document.createElement('div');
    modal.className = 'approve-form';
    
    modal.innerHTML = `
        <div class="approve-form-content">
            <h2>Approve Component</h2>
            <form id="approve-form">
                <div class="form-group">
                    <label for="borrowDate">Borrow Date</label>
                    <input type="date" id="borrowDate" required>
                </div>
                <div class="form-group">
                    <label for="deadlineDate">Return Date</label>
                    <input type="date" id="deadlineDate" required>
                </div>
                <input type="hidden" id="componentId">
                <div class="form-actions">
                    <button type="submit" class="submit-btn">Approve</button>
                    <button type="button" class="cancel-btn">Cancel</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    const form = modal.querySelector('#approve-form');
    const cancelBtn = modal.querySelector('.cancel-btn');
    
    form.addEventListener('submit', handleApproveSubmit);
    cancelBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    return modal;
}

// Open approve modal
async function approveComponent(componentId) {  // componentId: معرف المكون المختار
    try {
        console.log('Opening approve modal for component:', componentId);
        
        // تخزين معرف المكون
        document.getElementById('componentId').value = componentId;
        
        // الحصول على بيانات المكون
        const component = allcomponents.find(comp => comp._id === componentId);
        console.log(component);
        
        if (!component) {
            throw new Error('Component not found');
        }
        
        // تعبئة بيانات المكون في الفورم
        const form = document.getElementById('approve-form');
        form.querySelector('.component-name').textContent = component.title;
        form.querySelector('.component-image img').src = component.image;
        form.querySelector('.component-image img').alt = component.title;
        form.querySelector('#borrowDate').value = new Date().toISOString().split('T')[0];
        // فتح المودال
        approveForm.classList.add('active');
        approveFormContent.classList.add('active');
        
        console.log('Modal opened successfully with component data');
    } catch (error) {
        console.error('Error opening approve form:', error);
        showError('Failed to open approve form. Please try again.');
    }
}

// Close modal
function closeModal() {
    console.log('Closing modal');
    approveForm.classList.remove('active');
    approveFormContent.classList.remove('active');
    document.getElementById('approve-form').reset();
    console.log('Modal closed');
}

function showMessage(message){
    errorMessageForAcceptForm.innerHTML = message;
    errorMessageForAcceptForm.style.display = 'block';
    setTimeout(() => {
        errorMessageForAcceptForm.style.display = 'none';
    }, 10000);
}

// Handle approve form submission
async function handleApproveSubmit(e) {
    e.preventDefault();
    console.log('Form submitted');
    
    if (isLoading) {
        console.log('Already loading, ignoring submit');
        return;
    }
    
    const componentId = document.getElementById('componentId').value;
    const borrowDate = document.getElementById('borrowDate').value;
    const deadlineDate = document.getElementById('deadlineDate').value;

    console.log('Form data:', { componentId, borrowDate, deadlineDate });

    try {
        validateDates(borrowDate, deadlineDate);
    } catch (error) {
        showMessage(error.message)
        alert(
            error.message
        )
        console.error('Date validation failed:', error);
        showError(error.message);
        return;
    }

    try {
        isLoading = true;
        showLoading();
        console.log('Sending approve request to server');

        const response = await fetch('https://assiut-robotics-server.vercel.app/components/acceptRequestToBorrow', {
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
        });

        const data = await response.json();
        console.log('Server response:', data);

        if (!response.ok) {
            throw new Error(data.message || 'Failed to approve component');
        }

        alert('Component approved successfully');
        closeModal();
        await renderRequestedComponents();
    } catch (error) {
        console.error('Error approving component:', error);
        showError('Failed to approve component. Please try again.');
    } finally {
        isLoading = false;
        hideLoading();
    }
}
document.getElementById('approve-form').addEventListener('submit', handleApproveSubmit);
// Validate dates for approval
function validateDates(borrowDate, deadlineDate) {  // borrowDate: تاريخ الاستعارة, deadlineDate: تاريخ الإعادة
    const today = new Date();  // today: التاريخ الحالي
    today.setHours(0, 0, 0, 0);
    
    const borrow = new Date(borrowDate);  // borrow: تاريخ الاستعارة ككائن Date
    const deadline = new Date(deadlineDate);  // deadline: تاريخ الإعادة ككائن Date
    
    if (borrow < today) {
        throw new Error('Borrow date cannot be in the past');
    }
    
    if (deadline <= borrow) {
        throw new Error('Return date must be after borrow date');
    }
    
    const maxBorrowPeriod = 30;  // maxBorrowPeriod: الحد الأقصى لفترة الاستعارة بالأيام
    const diffTime = Math.abs(deadline - borrow);  // diffTime: الفرق الزمني بالميلي ثانية
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));  // diffDays: الفرق الزمني بالأيام
    
    if (diffDays > maxBorrowPeriod) {
        throw new Error(`Maximum borrow period is ${maxBorrowPeriod} days`);
    }
    
    return true;
}


// Handle component rejection
async function rejectComponent(componentId) {  // componentId: معرف المكون
    if (!confirm('Are you sure you want to reject this request?')) return;

    try {
        isLoading = true;
        showLoading();

        const response = await fetch('/api/components/reject-borrow', {  // response: استجابة الخادم
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`  // token: توكن المصادقة
            },
            body: JSON.stringify({ componentId })
        });

        const data = await response.json();  // data: البيانات المستلمة من الخادم

        if (!response.ok) {
            throw new Error(data.message || 'Failed to reject component');
        }

        showSuccess('Component request rejected');
        await renderRequestedComponents();
    } catch (error) {
        console.error('Error rejecting component:', error);
        showError('Failed to reject component. Please try again.');
    } finally {
        isLoading = false;
        hideLoading();
    }
}





// ===== Utility Functions =====

// Escape HTML to prevent XSS
function escapeHTML(str) {  // str: النص المراد تنظيفه
    const div = document.createElement('div');  // div: عنصر HTML مؤقت
    div.textContent = str;
    return div.innerHTML;
}

// Show loading state
function showLoading() {
    document.body.classList.add('loading');  // loading: class لإظهار حالة التحميل
}

// Hide loading state
function hideLoading() {
    document.body.classList.remove('loading');
}





// Initialize the page
initialize();
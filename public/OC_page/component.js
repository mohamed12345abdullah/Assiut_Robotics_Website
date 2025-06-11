let components = [];
const itemsPerPage = 12;
let currentPage = 1;

// إضافة الحاوية الرئيسية
document.body.innerHTML = `
    <div class="page-container">
        <div class="search-container">
            <input type="text" class="search-input" id="search" placeholder="ابحث عن المكونات...">
        </div>
        <div id="mainComponents"></div>
    </div>
    <button class="theme-toggle" onclick="toggleTheme()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
    </button>
`;

// جلب المكونات
const getComponents = async () => {
    try {
        const response = await fetch("https://assiut-robotics-zeta.vercel.app/components/getComponents");
        if (response.ok) {
            const res = await response.json();
            components = res.data;
            console.log("Components:", res);
            getCat(components)
            displayComponents(components);
            setupPagination(components);
        } else {
            console.error("Error fetching components:", response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

function getCat(data){
    let cat = [];
    data.forEach(element => {
        if(!cat.includes(element.category)){
            cat.push(element.category)
        }
    });
    console.log(cat);
}   

// عرض المكونات
function displayComponents(items) {
    const container = document.getElementById('mainComponents');
    container.innerHTML = "";
    
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = items.slice(start, end);

    paginatedItems.forEach(element => {
        container.innerHTML += `
            <div class="component box" onclick="showPopup('${element.image}', '${element.title}', '${element.description || ''}', '${element.borrowedBy != null ? element.borrowedBy.borrowerName : 'Not Borrowed'}  , '${element._id}')">
                <img src="${element.image}" alt="${element.title}">
                <div class="name">${element.title}</div>
            </div>
        `;
    });
}

// إعداد التنقل بين الصفحات
function setupPagination(items) {
    const pageCount = Math.ceil(items.length / itemsPerPage);
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination';
    
    // زر السابق
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '<span>السابق</span>';
    prevButton.className = 'nav-btn prev';
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            updateDisplay(items);
        }
    };
    paginationContainer.appendChild(prevButton);

    // أزرار الأرقام
    for (let i = 1; i <= pageCount; i++) {
        if (
            i === 1 || 
            i === pageCount || 
            (i >= currentPage - 1 && i <= currentPage + 1)
        ) {
            const button = document.createElement('button');
            button.textContent = i;
            button.className = i === currentPage ? 'active' : '';
            button.onclick = () => {
                currentPage = i;
                updateDisplay(items);
            };
            paginationContainer.appendChild(button);
        } else if (
            i === currentPage - 2 || 
            i === currentPage + 2
        ) {
            const dots = document.createElement('span');
            dots.textContent = '...';
            dots.className = 'dots';
            paginationContainer.appendChild(dots);
        }
    }

    // زر التالي
    const nextButton = document.createElement('button');
    nextButton.innerHTML = '<span>التالي</span>';
    nextButton.className = 'nav-btn next';
    nextButton.disabled = currentPage === pageCount;
    nextButton.onclick = () => {
        if (currentPage < pageCount) {
            currentPage++;
            updateDisplay(items);
        }
    };
    paginationContainer.appendChild(nextButton);

    // إضافة التنقل للصفحة
    const existingPagination = document.querySelector('.pagination');
    if (existingPagination) {
        existingPagination.remove();
    }
    document.querySelector('.page-container').appendChild(paginationContainer);
}

// تحديث العرض
function updateDisplay(items) {
    displayComponents(items);
    setupPagination(items);
}

// البحث
document.getElementById('search').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredComponents = components.filter(component => 
        component.title.toLowerCase().includes(searchTerm)
    );
    currentPage = 1;
    updateDisplay(filteredComponents);
});

// تبديل الثيم
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// استرجاع الثيم المحفوظ
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// تشغيل التطبيق
getComponents();

// إضافة البوب أب للصفحة
document.body.insertAdjacentHTML('beforeend', `
    <div class="popup-overlay" id="popup">
        <div class="popup-content">
            <button class="popup-close" onclick="closePopup()">&times;</button>
            <img class="popup-image" src="" alt="">
            <h2 class="popup-title"></h2>
            <div class="popup-details"></div>
            <div class="borrow-by"></div>
            <button class="borrow-button">I need this</button>

        </div>
    </div>
`);

// دالة لعرض البوب أب
function showPopup(image, title, description, borrower, componentId) {
    console.log(componentId);
    
    const popup = document.getElementById('popup');
    const popupImage = popup.querySelector('.popup-image');
    const popupTitle = popup.querySelector('.popup-title');
    const popupDetails = popup.querySelector('.popup-details');
    const popupBorrower = popup.querySelector('.borrow-by');
    const borrowButton = popup.querySelector('.borrow-button');
    
    popupImage.src = image;
    popupTitle.textContent = title;
    popupDetails.textContent = description || 'لا يوجد وصف متاح';
    popupBorrower.textContent ='borroweed by: '+ borrower ;
    borrowButton.setAttribute('data-component-id', componentId);
    popup.classList.add('active');
    document.body.style.overflow = 'hidden'; // منع التمرير في الخلفية
}

// دالة لإغلاق البوب أب
function closePopup() {
    const popup = document.getElementById('popup');
    popup.classList.remove('active');
    document.body.style.overflow = ''; // إعادة تفعيل التمرير
}

// إغلاق البوب أب عند النقر خارج المحتوى
document.getElementById('popup').addEventListener('click', function(e) {
    if (e.target === this) {
        closePopup();
    }
});

// إغلاق البوب أب عند الضغط على ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePopup();
    }
});

// تفعيل تأثير التركيز عند السكرول
function handleScroll() {
    const components = document.querySelectorAll('.component.box');
    components.forEach(component => {
        const rect = component.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // التحقق مما إذا كان العنصر في منتصف الشاشة تقريباً
        if (rect.top < windowHeight * 0.7 && rect.bottom > windowHeight * 0.3) {
            component.classList.add('in-focus');
        } else {
            component.classList.remove('in-focus');
        }
    });
}

// إضافة مستمع السكرول
window.addEventListener('scroll', handleScroll);
// تشغيل الدالة مرة واحدة عند تحميل الصفحة
handleScroll();










// إضافة هذا الكود في نهاية الملف

// دالة لمراقبة العناصر عند السكرول
function createIntersectionObserver() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, options);

    // مراقبة كل العناصر
    document.querySelectorAll('.component.box').forEach(component => {
        observer.observe(component);
    });
}

// دالة لتأثير التركيز في المنتصف
function handleScrollFocus() {
    const components = document.querySelectorAll('.component.box');
    const windowHeight = window.innerHeight;
    const focusZone = {
        top: windowHeight * 0.3,
        bottom: windowHeight * 0.7
    };

    components.forEach(component => {
        const rect = component.getBoundingClientRect();
        const componentCenter = rect.top + (rect.height / 2);

        if (componentCenter > focusZone.top && componentCenter < focusZone.bottom) {
            component.classList.add('in-focus');
            component.classList.remove('out-of-focus');
        } else {
            component.classList.remove('in-focus');
            component.classList.add('out-of-focus');
        }
    });
}

// تعديل دالة displayComponents لإضافة الفئات الأولية
function displayComponents(items) {
    const container = document.getElementById('mainComponents');
    container.innerHTML = "";
    
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = items.slice(start, end);

    paginatedItems.forEach((element, index) => {
        container.innerHTML += `
            <div class="component box" data-index="${index}" onclick="showPopup('${element.image}', '${element.title}', '${element.description || ''}' , '${element.borrowedBy!=null ? element.borrowedBy.member.name : 'Not Borrowed'}', '${element._id}')">
                <img src="${element.image}" alt="${element.title}">
                <div class="name">${element.title}</div>
   
            </div>
        `;
    });

    // تفعيل المراقبة للعناصر الجديدة
    createIntersectionObserver();
}

// إضافة مستمعي الأحداث
window.addEventListener('scroll', handleScrollFocus);
window.addEventListener('resize', handleScrollFocus);

// تفعيل التأثيرات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    createIntersectionObserver();
    handleScrollFocus();
});

// تحديث التأثيرات عند تغيير الصفحة
function updateDisplay(items) {
    displayComponents(items);
    setupPagination(items);
    setTimeout(() => {
        handleScrollFocus();
    }, 100);
}


const borrowButton = document.querySelector('.borrow-button');
borrowButton.addEventListener('click',async () => {
    try {

    console.log('borrow button clicked');
    console.log("component id",borrowButton.getAttribute('data-component-id'));    
    const componentId = borrowButton.getAttribute('data-component-id');
    const response = await fetch('https://assiut-robotics-zeta.vercel.app/components/requestToBorrow', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            componentId: componentId
        })
    })
    const data = await response.json();

    if (response.ok) {
        alert(data.message);
    
    } else {
        
        alert(`Failed: ${data.message}`);
    }
    console.log(data);
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
});
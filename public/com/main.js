// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Hero Section Image Slider
const heroImages = [
    'https://images.unsplash.com/photo-1581092160607-ee22731c2f54?w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600&auto=format&fit=crop'
];

let currentImageIndex = 0;
const hero = document.querySelector('.hero');

function changeHeroImage() {
    currentImageIndex = (currentImageIndex + 1) % heroImages.length;
    hero.style.backgroundImage = `url('${heroImages[currentImageIndex]}')`;
}

setInterval(changeHeroImage, 5000);

// Committee Details
const committeeDetails = {
    oc: {
        title: "لجنة التنظيم",
        content: `
            <div class="committee-detail-content">
                <h2>لجنة التنظيم (OC) – Organizing Committee</h2>
                <p>لجنة التنظيم هي المسؤولة عن المعمل والمكونات الموجودة فيه، وتنظيم الاحتفالات والفعاليات التي يقيمها الفريق.</p>
                
                <h3>المسؤوليات الرئيسية:</h3>
                <ul>
                    <li>
                        <strong>إدارة المعمل والمكونات</strong>
                        <p>المسؤولية الكاملة عن المعمل وجميع محتوياته من هاردوير وسوفت وير، والتحكم في استعارة المكونات وإدارتها.</p>
                    </li>
                    <li>
                        <strong>تنظيم الفعاليات</strong>
                        <p>تنظيم الاحتفالات والفعاليات مع وضع جدول زمني مناسب وتنظيم المكان وترتيب الفقرات.</p>
                    </li>
                    <li>
                        <strong>إدارة الماليات</strong>
                        <p>إدارة جميع التعاملات المالية للفريق، سواء من دعم الجامعة، الشهريات، أو رعاية الشركات.</p>
                    </li>
                </ul>

                <h3>الفوائد والمهارات المكتسبة:</h3>
                <ul>
                    <li>تعلم المزيد عن المكونات الإلكترونية وكيفية استخدامها</li>
                    <li>اكتساب مهارات إدارة الوقت والتنظيم</li>
                    <li>تطوير مهارات التعامل مع الماليات وإدارة الميزانية</li>
                    <li>بناء شبكة علاقات مع الشركات والفرق الأخرى</li>
                </ul>
            </div>
        `
    },
    pr: {
        title: "لجنة العلاقات العامة",
        content: `
            <div class="committee-detail-content">
                <h2>لجنة العلاقات العامة – Public Relations Committee</h2>
                <p>لجنة العلاقات العامة هي الجسر الذي يربط الفريق بالعالم الخارجي، حيث تتولى مسؤولية بناء صورة مشرفة للفريق وتعزيز تواصله مع الأفراد والجهات المختلفة.</p>
                
                <h3>مهام اللجنة:</h3>
                <ul>
                    <li>
                        <strong>إتمام التصاريح والإجراءات الرسمية</strong>
                        <p>تصاريح المشاركة، السكن والانتقالات، استخدام المعامل والورش.</p>
                    </li>
                    <li>
                        <strong>تنظيم الفعاليات</strong>
                        <p>تنظيم معرض الساحة والأحداث الخاصة بالفريق، توفير المتحدثين وحجز القاعات.</p>
                    </li>
                    <li>
                        <strong>الترويج للفعاليات</strong>
                        <p>تنظيم حملات في الكليات المختلفة لضمان وصول الفعاليات لأكبر شريحة ممكنة.</p>
                    </li>
                </ul>

                <h3>الأهداف:</h3>
                <ul>
                    <li>بناء شبكة علاقات قوية تفتح آفاقاً جديدة للفريق</li>
                    <li>تطوير مهارات التواصل والتفاوض لدى الأعضاء</li>
                </ul>
            </div>
        `
    },
    marketing: {
        title: "لجنة التسويق",
        content: `
            <div class="committee-detail-content">
                <h2>لجنة التسويق – Marketing Committee</h2>
                <p>تعتبر لجنة التسويق القوة الدافعة وراء انتشار اسم الفريق، حيث تتولى مسؤولية الترويج له وجذب الرعاة.</p>
                
                <h3>مهام اللجنة:</h3>
                <ul>
                    <li>
                        <strong>جذب الرعاة (Sponsors)</strong>
                        <p>التواصل مع الشركات والمؤسسات لإبرام شراكات تدعم الفريق مالياً أو لوجستياً.</p>
                    </li>
                    <li>
                        <strong>التسويق للفعاليات</strong>
                        <p>إبراز قيمة الفعاليات التي ينظمها الفريق والترويج لها لجذب الحضور والمشاركين.</p>
                    </li>
                </ul>

                <h3>الأهداف:</h3>
                <ul>
                    <li>بناء علامة تجارية قوية لفريق أسيوط روبوتكس</li>
                    <li>إعداد فريق تسويق محترف يمتلك مهارات التفاوض والتسويق المباشر</li>
                </ul>
            </div>
        `
    },
    design: {
        title: "لجنة التصميم",
        content: `
            <div class="committee-detail-content">
                <h2>لجنة التصميم – Design Committee</h2>
                <p>تُعد لجنة التصميم القلب النابض للفريق، حيث تحمل على عاتقها تحويل الأفكار الإبداعية إلى تصاميم بصرية رائعة.</p>
                
                <h3>مهام اللجنة:</h3>
                <ul>
                    <li>
                        <strong>تصميم المنشورات والبنرات</strong>
                        <p>تصميم المواد البصرية التي تُعبّر عن هوية الفريق بشكل مميز وجذاب.</p>
                    </li>
                    <li>
                        <strong>تطوير الهوية البصرية</strong>
                        <p>العمل على تطوير وتحديث الهوية البصرية للفريق باستمرار.</p>
                    </li>
                    <li>
                        <strong>إنتاج المحتوى البصري</strong>
                        <p>تحويل الأفكار إلى رسومات بصرية تحكي قصة وتُلهم الجميع.</p>
                    </li>
                </ul>

                <h3>الأدوات المستخدمة:</h3>
                <ul>
                    <li>Adobe Photoshop</li>
                    <li>Adobe Illustrator</li>
                    <li>برامج التصميم المتقدمة الأخرى</li>
                </ul>
            </div>
        `
    },
    academic: {
        title: "اللجنة الأكاديمية",
        content: `
            <div class="committee-detail-content">
                <h2>اللجنة الأكاديمية – Academic Committee</h2>
                <p>اللجنة الأكاديمية هي الركيزة الأساسية للعملية التعليمية داخل الفريق، وهي المسؤولة عن تطوير المهارات التقنية والعلمية لأعضاء الفريق.</p>
                
                <h3>مهام اللجنة الأكاديمية:</h3>
                <ul>
                    <li>
                        <strong>المهام التعليمية والتقييم</strong>
                        <p>تصميم مهام دورية للأعضاء وتقييمها وتوفير الحلول والتغذية الراجعة.</p>
                    </li>
                    <li>
                        <strong>تشكيل الفرق الفنية</strong>
                        <p>تكوين فرق المسابقات والمشاريع وفقاً للائحة اللجنة.</p>
                    </li>
                    <li>
                        <strong>إعداد المناهج والمصادر</strong>
                        <p>توفير المواد التعليمية والمصادر الخاصة بكل مسابقة ومشروع.</p>
                    </li>
                    <li>
                        <strong>التوثيق والأرشفة</strong>
                        <p>توثيق جميع المشاريع والمسابقات وحفظها على Google Drive.</p>
                    </li>
                </ul>

                <h3>الأهداف التعليمية:</h3>
                <ul>
                    <li>تطوير المهارات التقنية للأعضاء</li>
                    <li>إعداد فرق قوية للمسابقات</li>
                    <li>توفير بيئة تعليمية محفزة</li>
                    <li>تعزيز التعلم العملي والتطبيقي</li>
                </ul>
            </div>
        `
    },
    web: {
        title: "لجنة الويب",
        content: `
            <div class="committee-detail-content">
                <h2>لجنة الويب – Web Committee</h2>
                <p>تتولى لجنة الويب مسؤولية تصميم وتطوير المواقع الإلكترونية الخاصة بفريق أسيوط روبوتكس.</p>
                
                <h3>هيكلة العمل داخل اللجنة:</h3>
                <ul>
                    <li>
                        <strong>تنظيم الفرق</strong>
                        <p>تنقسم اللجنة إلى فرق، حيث يتعاون الأعضاء على تنفيذ المشاريع وفق خطط واضحة.</p>
                    </li>
                    <li>
                        <strong>تطوير المشاريع</strong>
                        <p>تبدأ عملية تطوير المواقع بتحديد الاحتياجات، ثم تصميم الواجهات وتجهيز الأنظمة الخلفية.</p>
                    </li>
                    <li>
                        <strong>متابعة الأعضاء والتقييم</strong>
                        <p>يتم تقييم أداء الأعضاء وفق آلية محددة تشمل مدى التزامهم وجودة أعمالهم.</p>
                    </li>
                    <li>
                        <strong>تنظيم الورش والتدريبات</strong>
                        <p>عقد ورش عمل دورية لتعليم التقنيات الحديثة في تطوير الويب.</p>
                    </li>
                </ul>

                <h3>التقنيات المستخدمة:</h3>
                <ul>
                    <li>HTML, CSS, JavaScript</li>
                    <li>React.js</li>
                    <li>Node.js</li>
                    <li>أحدث تقنيات تطوير الويب</li>
                </ul>
            </div>
        `
    },
    hr: {
        title: "لجنة الموارد البشرية",
        content: `
            <div class="committee-detail-content">
                <h2>لجنة الموارد البشرية – HR Committee</h2>
                <p>لجنة الموارد البشرية مسؤولة عن متابعة الأعضاء، تقييمهم دورياً، حل مشاكلهم، وتنظيم اللوائح الداخلية.</p>
                
                <h3>المهام الرئيسية:</h3>
                <ul>
                    <li>
                        <strong>قبول الأعضاء الجدد</strong>
                        <p>تحديد موعد القبول سنوياً وتنظيم عملية المقابلات والتقييم.</p>
                    </li>
                    <li>
                        <strong>الانتخابات السنوية</strong>
                        <p>تنظيم انتخابات اللجان وقيادة الفريق وفق معايير محددة.</p>
                    </li>
                    <li>
                        <strong>التقييم الشهري</strong>
                        <p>جمع وتحليل تقييمات الأعضاء من مختلف اللجان والمشاريع.</p>
                    </li>
                    <li>
                        <strong>إدارة شؤون الأعضاء</strong>
                        <p>متابعة حضور وأداء الأعضاء وحل المشكلات التي تواجههم.</p>
                    </li>
                </ul>

                <h3>نظام التقييم:</h3>
                <ul>
                    <li>تقييم الالتزام والحضور</li>
                    <li>تقييم جودة العمل والإنجاز</li>
                    <li>تقييم التعاون وروح الفريق</li>
                    <li>تقييم المبادرة والإبداع</li>
                </ul>
            </div>
        `
    }
};

// Initialize modal functionality when DOM is loaded
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const closeBtn = document.querySelector('.close');
document.addEventListener('DOMContentLoaded', function() {


    if (!modal || !modalContent || !closeBtn) {
        console.error('Modal elements not found');
        return;
    }



    // Close modal when clicking on close button
    closeBtn.onclick = closeModal;

    // Close modal when clicking outside of modal
    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    };

    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
});

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});


function showDetails(committee) {
    if (!committeeDetails[committee]) {
        console.error(`Details for committee ${committee} not found`);
        return;
    }
    
    modal.style.display = 'block';
    modalContent.innerHTML = committeeDetails[committee].content;
}

function closeModal() {
    modal.style.display = 'none';
}
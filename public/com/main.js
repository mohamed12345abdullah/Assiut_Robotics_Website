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
                <p>لجنة العلاقات العامة هي الجسر الذي يربط الفريق بالعالم الخارجي، حيث تتولى مسؤولية بناء صورة مشرفة للفريق وتعزيز تواصله مع الأفراد، الجهات، والمؤسسات المختلفة خارج إطاره.</p>
                
                <h3>مهام اللجنة:</h3>
                <ul>
                    <li>
                        <strong>إتمام التصاريح والإجراءات الرسمية</strong>
                        <p>اللازمة للمسابقات، مثل: (تصاريح المشاركة، السكن والانتقالات، استخدام المعامل والورش...).</p>
                    </li>
                    <li>
                        <strong>تنظيم الفعاليات</strong>
                        <p>مثل معرض الساحة والأحداث الخاصة بالفريق، بما يشمل (توفير المتحدثين، حجز القاعات...).</p>
                    </li>
                    <li>
                        <strong>الترويج للفعاليات</strong>
                        <p>من خلال الحملات في الكليات المختلفة لضمان وصولها إلى أكبر شريحة ممكنة.</p>
                    </li>
                    <li>
                        <strong>تعزيز فرص التعاون والشراكات</strong>
                        <p>مع المؤسسات، الشركات، والجهات الداعمة لتوسيع نطاق تأثير الفريق.</p>
                    </li>
                </ul>

                <h3>هدفنا:</h3>
                <ul>
                    <li>بناء شبكة علاقات قوية تفتح آفاقًا جديدة للفريق وتمكنه من تحقيق المزيد من الإنجازات.</li>
                    <li>تطوير أفراد يمتلكون مهارات تواصل وتفاوض قوية، مع تعزيز قدرتهم على بناء شبكة علاقات فعالة.</li>
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
        title: "اللجان الأكاديمية",
        content: `
            <div class="committee-detail-content">
                <h2>اللجان الأكاديمية – Academic Committees</h2>
                
                <div class="committee-tabs">
                    <button class="tab-btn active" onclick="switchTab('electrical')">كهرباء</button>
                    <button class="tab-btn" onclick="switchTab('mechanical')">ميكانيكا</button>
                </div>

                <div id="electrical-content" class="tab-content active">
                    <h3>اللجنة الأكاديمية الكهربية</h3>
                    <p>تهدف إلى تأهيل الأعضاء للعمل في المجالات التقنية المتعلقة بالأنظمة الكهربائية والإلكترونية، من خلال التدريب العملي والمشاركة في المشاريع والمسابقات.</p>
                    
                    <h4>التخصصات الرئيسية:</h4>
                    <ul>
                        <li>
                            <strong>الأنظمة المدمجة (Embedded Systems)</strong>
                            <p>في هذا التخصص، يتعلم الأعضاء كيفية برمجة المتحكمات الدقيقة (Microcontrollers) للتحكم في الدوائر الإلكترونية وتشغيل الروبوتات والماكينات الذكية. إنه المجال الذي يجمع بين البرمجة والإلكترونيات في قلب كل نظام ذكي.</p>
                        </li>
                        <li>
                            <strong>الأجهزة الإلكترونية (Hardware)</strong>
                            <p>يركز هذا التخصص على تصميم الدوائر الإلكترونية واختبارها وتشغيلها. الأعضاء هنا يتعاملون مع مكونات العالم الحقيقي لبناء أنظمة فعالة تُستخدم في المشاريع التقنية المتنوعة. من لحام المكونات إلى تحليل الإشارات – هذا هو المكان الذي تتحول فيه الأفكار إلى واقع ملموس.</p>
                        </li>
                        <li>
                            <strong>الأنظمة الآلية (Autonomous Systems)</strong>
                            <p>هذا التخصص يمنح الأنظمة القدرة على اتخاذ القرارات والعمل بشكل مستقل وذكي في بيئات متنوعة. وينقسم إلى قسمين متكاملين:</p>
                            <ul>
                                <li>ROS (Robot Operating System): إطار عمل برمجي لتصميم الأنظمة الروبوتية المعقدة والتحكم بها.</li>
                                <li>الرؤية الحاسوبية (Vision): تمكين الأنظمة من "الرؤية" وتحليل البيانات البصرية لفهم البيئة المحيطة واتخاذ قرارات ذكية.</li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <div id="mechanical-content" class="tab-content">
                    <h3>اللجنة الأكاديمية الميكانيكية</h3>
                    <p>تهدف اللجنة الأكاديمية الميكانيكية إلى تأهيل الأعضاء للعمل بكفاءة في المجالات الهندسية المتعلقة بتصميم وتحليل الأنظمة الميكانيكية، وذلك من خلال التدريب العملي على أدوات التصميم والمحاكاة، والمشاركة في المشاريع التطبيقية. تركز اللجنة على تطوير المهارات التقنية والهندسية عبر ثلاثة تخصصات رئيسية:</p>
                    
                    <h4>التخصصات الرئيسية:</h4>
                    <ul>
                        <li>
                            <strong>SolidWorks</strong>
                            <p>في هذا التخصص، يتعلم الأعضاء استخدام برنامج SolidWorks للتصميم الهندسي، بدءًا من الرسم (Drawing)، مرورًا بتصميم الأجزاء ثلاثية الأبعاد (3D Part)، وتجميعها في نظام متكامل (Assembly)، وحتى إجراء المحاكاة (Simulation) لتحليل الحركة والقوى. هذا التخصص هو الخطوة الأولى لتحويل أي فكرة ميكانيكية إلى نموذج واقعي قابل للتنفيذ.</p>
                        </li>
                        <li>
                            <strong>ANSYS</strong>
                            <p>يختص هذا التخصص بتحليل ومحاكاة الأجزاء الميكانيكية باستخدام برنامج ANSYS. يتعلم الأعضاء كيفية تقييم الأداء تحت الأحمال، تحليل الإجهادات، ومعرفة نقاط الضعف في التصميم. الهدف هو ضمان الكفاءة والسلامة قبل مرحلة التصنيع، باستخدام أدوات المحاكاة المتقدمة.</p>
                        </li>
                        <li>
                            <strong>البحث الهندسي (Engineering Research)</strong>
                            <p>هذا التخصص يُنمّي مهارات البحث والتحليل لدى الأعضاء من خلال تعلُّم كيفية الوصول إلى المعلومات العلمية والهندسية الموثوقة، قراءة الداتا شيتس (Datasheets)، فهم المواصفات الفنية للمكونات، ومتابعة أحدث التطورات في مجال التصميم الميكانيكي. هو الأساس لاتخاذ قرارات تصميم ذكية ومبنية على معرفة حقيقية.</p>
                        </li>
                    </ul>
                </div>
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
    },
    media: {
        title: "لجنة الميديا",
        content: `
            <div class="committee-detail-content">
                <h2>لجنة الميديا – Media Committee</h2>
                <p>تعتبر لجنة الميديا هي الصوت والوجه الإعلامي لفريق أسيوط روبوتكس، حيث تتولى مسؤولية إدارة وتطوير المحتوى المرئي والتصميمي والرقمي للفريق. تعمل اللجنة على تقديم صورة احترافية ومميزة للفريق من خلال ثلاثة أقسام متخصصة.</p>
                
                <div class="committee-tabs">
                    <button class="tab-btn active" onclick="switchTab('video')">فيديو</button>
                    <button class="tab-btn" onclick="switchTab('design')">تصميم</button>
                    <button class="tab-btn" onclick="switchTab('social')">سوشيال</button>
                </div>

                <div id="video-content" class="tab-content active">
                    <h3>قسم الفيديو</h3>
                    <p>قسم متخصص في إنتاج وتحرير المحتوى المرئي للفريق، يهدف إلى توثيق وإبراز إنجازات الفريق من خلال محتوى مرئي احترافي.</p>
                    
                    <h4>المهام الرئيسية:</h4>
                    <ul>
                        <li>
                            <strong>تصوير وتوثيق الفعاليات</strong>
                            <p>توثيق كافة فعاليات وأنشطة الفريق بشكل احترافي، بما في ذلك المسابقات، الورش التدريبية، والمناسبات الخاصة.</p>
                        </li>
                        <li>
                            <strong>إنتاج الفيديوهات الترويجية</strong>
                            <p>تصميم وإنتاج فيديوهات ترويجية تعكس هوية الفريق وتبرز إنجازاته، مع التركيز على الجودة العالية والمحتوى الإبداعي.</p>
                        </li>
                        <li>
                            <strong>تحرير وتعديل المحتوى</strong>
                            <p>استخدام برامج التحرير المتقدمة مثل Adobe Premiere Pro و After Effects لإنتاج محتوى مرئي احترافي ومميز.</p>
                        </li>
                        <li>
                            <strong>إدارة المحتوى المرئي</strong>
                            <p>تنظيم وأرشفة المحتوى المرئي للفريق، مع ضمان سهولة الوصول إليه واستخدامه في مختلف المنصات.</p>
                        </li>
                    </ul>

                    <h4>المهارات المكتسبة:</h4>
                    <ul>
                        <li>التصوير الاحترافي وتقنيات الإضاءة</li>
                        <li>تحرير الفيديو باستخدام البرامج المتقدمة</li>
                        <li>إدارة المشاريع المرئية</li>
                        <li>فن سرد القصص من خلال المحتوى المرئي</li>
                    </ul>
                </div>

                <div id="design-content" class="tab-content">
                    <h3>قسم التصميم</h3>
                    <p>قسم متخصص في تصميم وتطوير الهوية البصرية للفريق، يهدف إلى تقديم صورة مميزة ومهنية من خلال تصميمات إبداعية وعصرية.</p>
                    
                    <h4>المهام الرئيسية:</h4>
                    <ul>
                        <li>
                            <strong>تصميم الهوية البصرية</strong>
                            <p>تطوير وتحديث الهوية البصرية للفريق، بما في ذلك الشعار، الألوان، الخطوط، والأنماط البصرية المميزة.</p>
                        </li>
                        <li>
                            <strong>تصميم المواد الترويجية</strong>
                            <p>تصميم البنرات، المنشورات، الكتيبات، والمواد الترويجية المختلفة للفعاليات والأنشطة.</p>
                        </li>
                        <li>
                            <strong>تصميم المحتوى الرقمي</strong>
                            <p>إنشاء تصميمات متوافقة مع مختلف المنصات الرقمية، مع التركيز على تجربة المستخدم والجاذبية البصرية.</p>
                        </li>
                        <li>
                            <strong>تطوير الهوية البصرية</strong>
                            <p>البحث المستمر عن أحدث اتجاهات التصميم وتطبيقها في تطوير هوية الفريق البصرية.</p>
                        </li>
                    </ul>

                    <h4>الأدوات والتقنيات:</h4>
                    <ul>
                        <li>Adobe Photoshop للتصميم والتحرير</li>
                        <li>Adobe Illustrator للرسومات المتجهية</li>
                        <li>Adobe InDesign للتصميم الطباعي</li>
                        <li>Figma للتصميم الرقمي</li>
                    </ul>
                </div>

                <div id="social-content" class="tab-content">
                    <h3>قسم السوشيال</h3>
                    <p>قسم متخصص في إدارة وتطوير حضور الفريق على منصات التواصل الاجتماعي، يهدف إلى بناء مجتمع نشط ومتفاعل حول أنشطة الفريق.</p>
                    
                    <h4>المهام الرئيسية:</h4>
                    <ul>
                        <li>
                            <strong>إدارة المنصات الرقمية</strong>
                            <p>إدارة حسابات الفريق على مختلف منصات التواصل الاجتماعي، مع الحفاظ على هوية موحدة ومميزة.</p>
                        </li>
                        <li>
                            <strong>تخطيط المحتوى</strong>
                            <p>وضع استراتيجيات محتوى متكاملة، مع التركيز على توقيت النشر وتنوع المحتوى.</p>
                        </li>
                        <li>
                            <strong>تحليل الأداء</strong>
                            <p>متابعة وتحليل أداء المحتوى المنشور، واستخدام البيانات في تطوير استراتيجيات المحتوى.</p>
                        </li>
                        <li>
                            <strong>إدارة التفاعل</strong>
                            <p>الرد على تعليقات ورسائل المتابعين، وإدارة النقاشات والتفاعلات على المنصات.</p>
                        </li>
                    </ul>

                    <h4>المنصات المستهدفة:</h4>
                    <ul>
                        <li>Facebook: للتواصل مع المجتمع المحلي</li>
                        <li>Instagram: للمحتوى المرئي والقصص</li>
                        <li>LinkedIn: للتواصل المهني والشراكات</li>
                        <li>YouTube: للمحتوى المرئي الطويل</li>
                    </ul>

                    <h4>المهارات المكتسبة:</h4>
                    <ul>
                        <li>إدارة منصات التواصل الاجتماعي</li>
                        <li>تحليل البيانات وقياس الأداء</li>
                        <li>كتابة المحتوى الإبداعي</li>
                        <li>إدارة الأزمات والسمعة الرقمية</li>
                    </ul>
                </div>
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

function switchTab(tabName) {
    // Handle card tabs
    const cardContents = document.querySelectorAll('.committee-text .tab-content');
    const cardButtons = document.querySelectorAll('.committee-tabs .tab-btn');
    
    cardContents.forEach(content => content.classList.remove('active'));
    cardButtons.forEach(button => button.classList.remove('active'));
    
    const cardContent = document.querySelector(`.committee-text #${tabName}-content`);
    const cardButton = document.querySelector(`.committee-tabs [onclick="switchTab('${tabName}')"]`);
    
    if (cardContent) cardContent.classList.add('active');
    if (cardButton) cardButton.classList.add('active');

    // Handle modal tabs
    const modalContents = document.querySelectorAll('.modal .tab-content');
    const modalButtons = document.querySelectorAll('.modal .tab-btn');
    
    modalContents.forEach(content => content.classList.remove('active'));
    modalButtons.forEach(button => button.classList.remove('active'));
    
    const modalContent = document.querySelector(`.modal #${tabName}-content`);
    const modalButton = document.querySelector(`.modal [onclick="switchTab('${tabName}')"]`);
    
    if (modalContent) modalContent.classList.add('active');
    if (modalButton) modalButton.classList.add('active');
}
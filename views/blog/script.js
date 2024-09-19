// function readMoreShow() {
//     $(document).ready(function () {
//         var contents = $(".text-content");
//         var maxLength = 200;

//         contents.each(function () {
//             var content = $(this);
//             var text = content.text();
//             var fullText = text; // Store the full text

//             if (text.length > maxLength) {
//                 var truncatedText = text.substr(0, maxLength) + "...";
//                 content.addClass("truncated").text(truncatedText);

//                 // Add toggle link after each truncated content
//                 content.after('<a href="#" class="toggle-content show">Show more</a>');
//             }

//             // Delegate click event to dynamically added .toggle-content links
//             $(document).on("click", ".toggle-content", function (event) {
//                 event.preventDefault();
//                 var link = $(this);
//                 var content = link.prev(".text-content");
//                 var text = content.hasClass("truncated") ? fullText : fullText.substr(0, maxLength) + "...";

//                 content.toggleClass("truncated").text(text);
//                 link.text(content.hasClass("truncated") ? "Show more" : "Show less");
//             });
//         });
//     });
// }

// remaining bugs to fix:
// 1. fix the unfocused animation
// 2. fix no focused mode
// 3. fix the toggle button



function modeAction(mode,Blog,Body, BLOG_IMG , textContainer,title,contentContainer,animateIt,Hcontent){
    console.log("modeAction ");
    
    if(mode === "no focused"){
        Body.classList.add("nofocus");
        Blog.classList.add("unfocused");
        setTimeout(() => {
            if(/* BLOG_IMG contains title */  BLOG_IMG.contains(title)){
                // delete title from it 
                console.log("con1");  
                BLOG_IMG.removeChild(title);    
            }
            if(/*text-container Not contains title */  !textContainer.contains(title)){
                // Add title To it 
                console.log("con2");
                textContainer.insertBefore(title,textContainer.firstChild);
            }
            animateIt.classList.add("disabled");
            if(/*text-content Not contains text */  contentContainer.textContent == "" ){
                // Add text To it 
                console.log("con4");
                contentContainer.textContent = Hcontent;
            }

            Body.classList.remove("focus");
            Body.classList.remove("nofocus");
            Blog.classList.remove("focused");
            Blog.classList.remove("unfocused");
        }, 2000);
    }
    else if(mode === "focused"){
        Blog.classList.remove("unfocused");
        Body.classList.remove("nofocus");
        if(/*BLOG_IMG Not contains title */ !BLOG_IMG.contains(title) ){
            // Add title To it  
            console.log("con 1",  !BLOG_IMG.contains(title));
            BLOG_IMG.insertBefore(title,BLOG_IMG.firstChild);
        }
        if(/*text-container  contains title */ textContainer.contains(title)){
            // delete title from it 
            console.log("con 1", textContainer.contains(title) );
            // textContainer.removeChild(title);
        }
            console.log("con 1", !BLOG_IMG.contains(title) );
            animateIt.classList.remove('disabled');
        if(/*text-content contain text */ contentContainer.textContent != ""){
            // remove text from it 
            console.log("con 1", !BLOG_IMG.contains(title) );
            contentContainer.textContent = "";
        }
        Body.classList.add("focus");
        Blog.classList.add("focused");
    }
}
function readMoreShow(toggleButton,id){
    console.log("==================================================================================");
   
    let BlogId = toggleButton.id;
    let mode = "focused";
    let BLOG_IMG = document.querySelectorAll(".BLOG_IMG")[id];
    let contentContainer = document.querySelectorAll(".content-container")[id];
    let title = document.querySelectorAll(".title")[id];
    let TextContent = document.querySelectorAll(".text-content")[id];
    let animateIt = document.querySelectorAll(".animateIt")[id];
    let Hcontent = document.querySelectorAll(".text-content")[id].textContent;
    // let content = document.querySelector(".text-content")[id].textContent;
    let Body = document.querySelector("body");
    let Blog = document.getElementById(BlogId);
    console.log(contentContainer)
    if(id == 0){
        Blog.style.backgroundColor = "rgb(43.9875, 174.012, 226.0065, 0.3) !important";
    }
    toggleButton.addEventListener("click", () => {
    modeAction(mode,Blog,Body ,BLOG_IMG , contentContainer,title,TextContent,animateIt,Hcontent);
    mode = mode === "no focused" ? "focused" : "no focused";
    })
}

let toggleButtons = Array.from(document.querySelectorAll(".toggle-content"));
console.log(toggleButtons)
toggleButtons.forEach((button,id) => {
    readMoreShow(button,id);
})


function loadBlogs() {
    let blogsContainer = document.querySelector(".unPinnedBlogs");
    async function load() {
        try {
            const res = await fetch("../../blogs/getBlogs");
            if (res.ok) {
                let response = await res.json();
                console.log(response);
                let blogs = response.data;
                blogs.forEach((blog) => {
                    let section = `
                    <section class="section">
                        <div class="text-container">
                            <div class="content-container">
                                <h1>${blog.title}</h1>
                                <p class="text-content">${blog.content}</p>
                                <a href="#" class="toggle-content">Show more</a>
                                <!--DATE-->
                                <div class="Date">
                                    <img class="calender" src="../all-images/Calender.png" alt="">
                                    <p class="date-text">${blog.date}</p>
                                </div>
                            </div>
                            <!--IMAGE-->
                            <div class="BLOG_IMG2">
                                <img src="../all-images/blogs/${blog.avatar}" alt="BLOG">
                            </div>
                        </div>
                    </section>`;
                    blogsContainer.innerHTML += section;
                });
            } else {
                console.log("error");
            }
        } catch (error) {
            console.error(error);
        }
    }
    load();
}

try {
    loadBlogs();
} catch (error) {
    console.error(error);
}


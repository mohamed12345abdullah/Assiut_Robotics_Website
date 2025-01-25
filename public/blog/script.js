// function for the action of the read more button
function modeAction(mode,Blog,Body, BLOG_IMG , textContainer,title,contentContainer,animateIt,Hcontent){
    console.log("modeAction "); // debugging
    
    if(mode === "no focused"){
        //adding the removing animations that removes the focused status in an animation  
        Body.classList.add("nofocus");
        Blog.classList.add("unfocused");
        //End of adding the removing animations that removes the focused status in an animation
        
        //waiting for the longest animation to finish and then make the changes that will be in html
        setTimeout(() => {
            if( BLOG_IMG.contains(title)){ 
                BLOG_IMG.removeChild(title);      // remove title from Blog_IMG 
            }
            if( !textContainer.contains(title)){
                textContainer.insertBefore(title,textContainer.firstChild); // Add title to text-container at the first child
            }
            animateIt.classList.add("disabled");  // disable the big paragraph that contains the full content of the blog
            if( contentContainer.textContent == "" ){
                contentContainer.textContent = Hcontent;  // asigning text to the attractive paraghraph that will be shown in the blog at unfocused mode
            }
            // removing the focused mode classes from the body and the blog and the removing animation classes to make the code cleaner 
            Body.classList.remove("focus");
            Body.classList.remove("nofocus");
            Blog.classList.remove("focused");
            Blog.classList.remove("unfocused");
        }, 2000);
    }
    else if(mode === "focused"){
        //remove the removing animations that removes the focused status in an animation  
        Blog.classList.remove("unfocused");
        Body.classList.remove("nofocus");
        //End of remove the removing animations that removes the focused status in an animation  

        if(!BLOG_IMG.contains(title) ){
            BLOG_IMG.insertBefore(title,BLOG_IMG.firstChild);  // Add title to Blog_IMG at the first child
        }
        if(textContainer.contains(title)){
            textContainer.removeChild(title); // removing title from the textContainer because it will be shown in the Blog_IMG container
        }
            animateIt.classList.remove('disabled');  // make the big paragraph that contains the full content of the blog visible
        if(contentContainer.textContent != ""){
            contentContainer.textContent = "";  // remove the text from the attractive paraghraph because its content is already shown in the big paragraph
        }
        // adding the focused mode classes to the body and the blog 
        Body.classList.add("focus");
        Blog.classList.add("focused");
        //End of  adding the focused mode classes to the body and the blog 

    }
}
// End of the function for the action of the read more button

function readMoreShow(toggleButton,id){
    console.log("=================================================================================="); // debugging
    // defining the variables that will be used in the modeAction function
    let BlogId = toggleButton.id;
    let mode = "focused";
    let BLOG_IMG = document.querySelectorAll(".BLOG_IMG")[id];
    let contentContainer = document.querySelectorAll(".content-container")[id];
    let title = document.querySelectorAll(".title")[id];
    let TextContent = document.querySelectorAll(".text-content")[id];
    let animateIt = document.querySelectorAll(".animateIt")[id];
    let Hcontent = document.querySelectorAll(".text-content")[id].textContent;
    let Body = document.querySelector("body");
    let Blog = document.getElementById(BlogId);
    //End of  defining the variables that will be used in the modeAction function
    console.log(contentContainer) // debugging
    // making a spicial style for the pinned blog
    if(id == 0){
        Blog.style.backgroundColor = "rgb(43.9875, 174.012, 226.0065, 0.3) !important";
    }

    // adding the event listener to the read more button
    toggleButton.addEventListener("click", () => {
    console.log("click" , Blog); // debugging
    
    modeAction(mode,Blog,Body ,BLOG_IMG , contentContainer,title,TextContent,animateIt,Hcontent); //calling the modeAction function
    mode = mode === "no focused" ? "focused" : "no focused"; // changing the mode to the opposite mode
    })
}

//load blogs from the server
function loadBlogs() {
    // make it returns a promise to be able to use the above functions after the blogs are loaded
    return new Promise( (resolve,reject) =>{
        let blogsContainer = document.querySelector(".unPinnedBlogs"); // getting the container that will contain the blogs
        // function will make the request to the server to get the blogs and make the html for them 
        async function load() {
            // we used try and catch to handle if there is a problem we can catch it and handle it.   because it is an async function that will not affect the whole code so we can know that from the effect
            try {
                const res = await fetch("https://assiutrobotics-production.up.railway.app/blogs/getBlogs"); // make the request to the server to get the blogs
                if (res.ok) { // if the request is ok
                    let response = await res.json(); // get the response from the server
                    console.log(response); // debugging
                    let blogs = response.data; // get the blogs from the response
                    blogs.forEach((blog) => { // loop through the blogs to make the html for them
                        let headContent = blog.content.slice(0, 200); // get the first 200 characters from the blog content to show it in the attractive paragraph 
                        console.log(headContent); // debugging
                        console.log(blog.title);    // debugging
                        
                        let section = `
                        <section class="section" id="${blog._id}">
                            <div class="text-container">
                                <div class="content-container">
                                    <h1  class="title" style="color: var(--defaultColor);">${blog.title}</h1>
                                    <p class="text-content">${headContent}</p> 
                                    <p style="text-align: justify; overflow: scroll;" class="disabled animateIt">${blog.content}</p>
                                   <a  class="toggle-content" id="${blog._id}"><i class="fa-solid fa-caret-down" style="color: #2eade4; scale: 4;"></i></a>
                                    <!--DATE-->
                                    <div class="Date">
                                        <img class="calender" src="../all-images/Calender.png" alt="">
                                        <p class="date-text">${blog.date}</p>
                                    </div>
                                </div>
                                <!--IMAGE-->
                                <div class="BLOG_IMG">
                                    <img src="../all-images/blogs/${blog.avatar}" alt="BLOG">
                                </div>
                            </div>
                        </section>
                        `; // the html for the blog
                        blogsContainer.innerHTML += section; // add the blog to the container
                    });
                resolve(); // resolve the promise means that the blogs are loaded successfully and go to the then function and run it 

                } else {
                    console.log("error");
                }
            } catch (error) {
                console.error(error);
                reject("error"); // reject the promise means that there is an error and go to the catch function and run it

            }
        }
        
        load(); // call the function to load the blogs
    }).then(() =>{ // then function to run the code after the blogs are loaded
        console.log("done") // debugging
        let toggleButtons = Array.from(document.querySelectorAll(".toggle-content")); // get all the read more buttons
        console.log(toggleButtons); // debugging
        toggleButtons.forEach((button,id) => { // loop through the buttons to add the event listener to them
            readMoreShow(button,id); // call the function 
        })
    }).catch((err) => { // catch function to handle the error
        console.log(err); // log an error if there is an error
    })
   
}

loadBlogs() // call the function to load the blogs


/* 
    The code consists of two main functions:
        1. creating the Blogs includes: 1 big function that will make the request to the server to get the blogs and make the html for them and then add the event listener to the read more button
        2. making the read more button work includes: 2 function that will make the action of the read more button and make the changes in the html to show the full content of the blog and make the blog in  focused and unfocused modes

*/
// every line are commented to make the code clear and easy to understand
// End of the file
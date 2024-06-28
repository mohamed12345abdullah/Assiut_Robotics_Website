

function readMoreShow() {
    $(document).ready(function () {
        var content = $(".text-content");
        var text = content.text();
        var maxLength = 200;
    
        if (text.length > maxLength) {
            var truncatedText = text.substr(0, maxLength) + '...';
            content.addClass("truncated").text(truncatedText);
            $(".toggle-content").addClass("show");
        }
    
        $(".toggle-content").click(function (event) {
            event.preventDefault();
            if (content.hasClass("truncated")) {
                content.removeClass("truncated").text(text);
                $(this).text("Show less");
            } else {
                content.addClass("truncated").text(text.substr(0, maxLength) + '...');
                $(this).text("Show more");
            }
        });
    });
    
}

function loadBlogs() {
    async function load() {
        const res = await fetch("../../blogs/getBlogs");
        if (res.ok) {
            let response =await res.json();
            console.log(response);
            let blogs = response.data;
            let body = document.getElementById("body");
            blogs.forEach(blog => {

                let section = `<div class="secthion">
    <div class="text">
        <h1>${blog.title}</h1>
        <p>
           ${blog.content}
        </p>
        <label for="check">Read More</label>
        <!--DATE-->
        <div class="Date">
            <img class="calender" src="images/Calender.png" alt="">
            <p class="date-text">${blog.date}</p>
        </div>
    </div>
    <!--IMAGE-->
    <div class="BLOG_IMG">
        <img src="${blog.avatar}" alt="BLOG">
    </div>
    
</div>`
                body.innerHTML+=section;

            });
        }
        else{
            console.log("error");
        }
    }
    load();
}


readMoreShow();
loadBlogs();
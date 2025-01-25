var contentList = [];

function readMoreShow() {
    $(document).ready(function() {
        var content = document.querySelectorAll(".text-content");
        content.forEach((element) => {
            var text = element.textContent;
            contentList.push(text);
            var maxLength = 200;
            if (text.length > maxLength) {
                var truncatedText = text.substr(0, maxLength) + "...";
                element.classList.add("truncated")
                element.textContent = truncatedText;
            }
        });
        $(".toggle-content").click(function(event) {
            event.preventDefault(); // Prevent the default action of the inner link
            event.stopPropagation(); // Prevent the event from bubbling up to the outer <a> element
            console.log("Done");
        });
    });
}

function toggleContent(contentId) {
    var content = document.getElementById(contentId);
    var moreText = content.querySelector(".text-content");
    var button = content.querySelector(".toggle-content");
    if (moreText.classList.contains("truncated")) {
        var index = contentId.replace("content", "") - 1;
        var allText = contentList[index];
        moreText.classList.remove("truncated");
        moreText.textContent = allText;
        button.textContent = "Show less";
    } else {
        var index = contentId.replace("content", "") - 1;
        var allText = contentList[index];
        var truncatedText = allText.substr(0, 200) + "...";
        moreText.classList.add("truncated");
        moreText.textContent = truncatedText;
        button.textContent = "Show more";
    }
}

function loadBlogs() {
    async function load() {
        const res = await fetch("../../blogs/getBlogs");
        if (res.ok) {
            let response = await res.json();
            console.log(response);
            let blogs = response.data;
            let body = document.getElementById("body");
            blogs.forEach((blog) => {
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
    
</div>`;
                body.innerHTML += section;
            });
        } else {
            console.log("error");
        }
    }
}

readMoreShow();
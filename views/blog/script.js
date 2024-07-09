function readMoreShow() {
    $(document).ready(function () {
        var contents = $(".text-content");
        var maxLength = 200;

        contents.each(function () {
            var content = $(this);
            var text = content.text();
            var fullText = text; // Store the full text

            if (text.length > maxLength) {
                var truncatedText = text.substr(0, maxLength) + "...";
                content.addClass("truncated").text(truncatedText);

                // Add toggle link after each truncated content
                content.after('<a href="#" class="toggle-content show">Show more</a>');
            }

            // Delegate click event to dynamically added .toggle-content links
            $(document).on("click", ".toggle-content", function (event) {
                event.preventDefault();
                var link = $(this);
                var content = link.prev(".text-content");
                var text = content.hasClass("truncated") ? fullText : fullText.substr(0, maxLength) + "...";

                content.toggleClass("truncated").text(text);
                link.text(content.hasClass("truncated") ? "Show more" : "Show less");
            });
        });
    });
}

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

readMoreShow();

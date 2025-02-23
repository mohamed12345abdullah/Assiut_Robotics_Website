
const token = window.localStorage.getItem("token");

function navButtonClick() {
    const topNav = document.getElementById("myTopnav");

    if (topNav.classList.contains("responsive")) {
        hideNav();
    } else {
        showNav();
    }
}

function isMobile() {
    var k1 = window.matchMedia("only screen and (max-width: 980px)").matches;
    var k2 = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    return k1 && k2;
}

function hideNav() {
    const topNav = document.getElementById("myTopnav");
    const content = document.getElementById("backdrop");
    const navToggleIcon = document.getElementById('js-navbar-toggle');
    if (topNav.classList.contains("responsive")) {
        topNav.classList.remove("responsive");
        content.style.display = "none";
        navToggleIcon.classList.remove("change");
    }
}

function showNav() {
    const topNav = document.getElementById("myTopnav");
    const content = document.getElementById("backdrop");
    const navToggleIcon = document.getElementById('js-navbar-toggle');
    if (!topNav.classList.contains("responsive")) {
        topNav.classList.add("responsive");
        content.style.display = "block";
        navToggleIcon.classList.add("change");
    }
}

function setupScrollNav() {
    const topNav = document.getElementById("myTopnav");
    const content = document.getElementById("backdrop");
    $(document).ready(function () {
        // Function to check if the website is opened on a phone
        if (isMobile()) {
            console.log("The website is being viewed on a phone.");
        } else {
            console.log("The website is being viewed on a non-phone device.");
        }

        // Event listener for window scrolling
        $(window).on("scroll", function () {
            if (isMobile()) {
                hideNav();
            }
        });

        $(window).on("resize", function () {
            if (isMobile()) {
                hideNav();
            }
        });

        document.addEventListener(
            "mousedown",
            (event) => {
                if (event.target !== topNav && event.target === content && topNav.classList.contains("responsive")) {
                    if (isMobile()) {
                        hideNav();
                    }
                }
            },
            { passive: true }
        );
    });
}

function setupColumns() {
    $(document).ready(function () {
        $(".column").click(function () {
            this.scrollIntoView({ behavior: "smooth", block: "center" });
        });
    });
}

function implement_views() {
    $.get("../main/header.html", function (data) {
        $("#myUniqueHeaderID").html(data);
    })
        .done(function () {
            console.log("All HTML content loaded successfully. #Header");
            setupScrollNav();
            setupLogin();
        })
        .fail(function () {
            console.error("Error loading HTML content. #Header");
            $.get("./main/header.html", function (data) {
                $("#myUniqueHeaderID").html(data);
            })
        });

    $.get("../main/footer.html", function (data) {
        $("#myUniqueFooterID").html(data);
    })
        .done(function () {
            console.log("All HTML content loaded successfully. #Footer");
        })
        .fail(function () {
            console.error("Error loading HTML content. #Footer");
            $.get("./main/footer.html", function (data) {
                $("#myUniqueFooterID").html(data);
            })
        });
}

function setupLogin() {
    // Check if the user is logged in (you can replace this with your actual authentication logic)
    //const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Example: Check localStorage

    // Get the buttons
    const loginButton = document.getElementById("login");
    // const registerButton = document.getElementById("register");
    const profileButton = document.getElementById("profile");

    // Update button visibility based on login status
    if (token) {
        // User is logged in → Show Profile, hide Log In and Register
        loginButton.style.display = "none";
        // registerButton.style.display = "none";
        profileButton.style.display = "inline-block";
    } else {
        // User is NOT logged in → Show Log In and Register, hide Profile
        loginButton.style.display = "inline-block";
        // registerButton.style.display = "inline-block";
        profileButton.style.display = "none";
    }
}

implement_views();
setupColumns();

function checkWidth() {
    var maxWidth = 980;
    if (window.innerWidth <= maxWidth) {
        return true;
    } else {
        return false;
    }
}

function navButtonClick() {
    var topNav = document.getElementById("myTopnav");
    if (topNav.classList.contains("responsive")) {
        topNav.classList.remove("responsive");
    } else {
        topNav.classList.add("responsive");
    }
    // if (x.className === "topnav") {
    //     x.className += " responsive";
    // } else {
    //     x.className = "topnav";
    // }
}

function implement_views() {
    $.get("../main/header.html", function(data) {
            $("#myUniqueHeaderID").html(data);
        })
        .done(function() {
            console.log("All HTML content loaded successfully. #Header");
        })
        .fail(function() {
            console.error("Error loading HTML content. #Header");
        });

    $.get("../main/footer.html", function(data) {
            $("#myUniqueFooterID").html(data);
        })
        .done(function() {
            console.log("All HTML content loaded successfully. #Footer");
        })
        .fail(function() {
            console.error("Error loading HTML content. #Footer");
        });
}

implement_views();
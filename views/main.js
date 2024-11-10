
//Nav Bar
let nav =document.getElementById(`nav`);
let toggleNav = document.getElementById(`toggleNav`);
let navBarPhone = document.getElementById("nav-bar-phone");
function toggleNavBar() {
  if (toggleNav.style.display == "flex") {
    toggleNav.style.display = "none";
    nav.style.background="none";
  } else {
    toggleNav.style.display = "flex";
    nav.style.background="#e0f4ff";
  }
}
window.addEventListener("scroll", function () {
  if (window.matchMedia("(max-width: 992px)").matches) {
    toggleNav.style.display = "none";
    nav.style.background="none";

  }
});

function updateNavBarDisplay() {
  if (window.matchMedia("(max-width: 992px)").matches) {
    navBarPhone.style.display = "block";
    toggleNav.classList.remove(`control-buttons-div`);
    toggleNav.classList.add(`phone-respons`);
    toggleNav.style.display = "none";
  } else {
    navBarPhone.style.display = "none";
    toggleNav.style.display = "flex";
    toggleNav.classList.add(`control-buttons-div`);
    toggleNav.classList.remove(`phone-respons`);
  }
}
updateNavBarDisplay();
window.addEventListener("resize", updateNavBarDisplay);

//popup
let popup3 = document.getElementById("popup3");
let popup2 = document.getElementById("popup2");
let popup1 = document.getElementById("popup1");
function showpop3() {
  popup3.style.display = "block";
}
function showpop2() {
  popup2.style.display = "block";
}
function showpop1() {
  popup1.style.display = "block";
}
window.addEventListener("scroll", function () {
  popup3.style.display = "none";
  popup2.style.display = "none";
  popup1.style.display = "none";
});

document.addEventListener("click", function (event) {
  if (
    event.target === popup3 ||
    event.target === popup2 ||
    event.target === popup1
  ) {
    popup3.style.display = "none";
    popup2.style.display = "none";
    popup1.style.display = "none";
  }
});

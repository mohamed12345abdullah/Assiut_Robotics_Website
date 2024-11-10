//


const load = async () => {
  let token = window.localStorage.getItem("token");
  console.log(token);
  let data = {
      token,
  }
  if (token) {
      let response = await fetch("../members/verify", {
          method: "post",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(data),
      });

      if (!response.ok) {

          window.location.href = "../login/login.html"
      } else {
          const JSONresponse = await response.json();
          console.log(JSONresponse);
          if (JSONresponse.data.role < 4) {
              document.getElementById('control-panel').style.display = "flex";
          }
          if ((JSONresponse.data.committee == "HR" && JSONresponse.data.role < 4) || JSONresponse.data.role == 1) {
              document.getElementById('head-hr').style.display = "inline-block";
              document.getElementById('OC-page1').style.display = "inline-block";
              document.getElementById('OC-page2').style.display = "inline-block";
              document.getElementById('blog-page').style.display = "inline-block";
              document.getElementById('addComponent').style.display = "inline-block";


          }
          if (JSONresponse.data.committee == "OC" ) {
              document.getElementById('OC-page1').style.display = "flex";
              document.getElementById('OC-page2').style.display = "flex";
              document.getElementById('addComponent').style.display = "flex";
          }
          if (JSONresponse.data.committee == "media") {
              document.getElementById('blog-page').style.display = "flex";
          }
          document.getElementById("nameHuman").innerHTML = JSONresponse.data.name;
          document.getElementById("email").innerHTML = JSONresponse.data.email;
          document.getElementById("phone").innerHTML = JSONresponse.data.phoneNumber;
          document.getElementById("specialty").innerHTML = JSONresponse.data.committee;
          document.getElementById("human").src = `${JSONresponse.data.avatar}`;
          window.localStorage.setItem("role", JSONresponse.data.role);
          window.localStorage.setItem("committee", JSONresponse.data.committee);
      }
  } else {
      window.location.href = "../login/login.html"

  }


}

const logout = () => {
  window.localStorage.removeItem("token");
  document.querySelector(".container").style.display = "none";
  window.alert("نورتنا  (: ")
  window.location.href = "../"
}







        // for rating section


const circularProgress = document.querySelectorAll(".circular-progress");
Array.from(circularProgress).forEach((progressBar) => {
    const progressValue = progressBar.querySelector(".percentage");
    const innerCircle = progressBar.querySelector(".inner-circle");
    let startValue = 0,
        endValue = Number(progressBar.getAttribute("data-percentage")),
        speed = 50,
        progressColor = progressBar.getAttribute("data-progress-color");

    const progress = setInterval(() => {
        startValue++;
        progressValue.textContent = `${startValue}%`;
        progressValue.style.color = `${progressColor}`;

        progressBar.style.background = `conic-gradient(${progressColor} ${startValue * 3.6
            }deg,${progressBar.getAttribute("data-bg-color")} 0deg)`;
        if (startValue === endValue) {
            clearInterval(progress);
        }
    }, speed);
});













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


var components = [];
const container = document.getElementById("mainComponents");


const getComponents = async () => {
    const response = await fetch("https://assiut-robotics-zeta.vercel.app/components/getComponents")
    if (response.ok) {
        const res = await response.json()
        components = res.data;
        console.log(components);

        // make taps
        let step = (window.innerWidth > 1000 ? 16 : 8);
        const taps = document.querySelector(".taps");
        // calculate the number of taps
        for (let i = 0; i < Math.ceil(components.length / step) ; i++) {
            taps.innerHTML += `<button id="${i}">${i + 1}</button>`;
        }
        const btns = document.querySelectorAll(".taps button");
        console.log(btns);

        // add event listener to each tap
        btns.forEach(button => {
            button.addEventListener("click", () => {
                console.log(button.id);
                // remove active class from all taps
                btns.forEach(btn => {
                    btn.classList.remove("Active");
                });
                // add active class to the clicked tap
                button.classList.add("Active");
                // clear the container
                container.innerHTML = "";
                // loop through the components
                for(let i = button.id * step; i < Math.min(step * (Number(button.id) + 1), components.length); i++) {
                    console.log(i);
                    container.innerHTML += `
                        <div class="component box" ">
                        <img src="${components[i].image}" alt="">
                        <div class="name"> ${components[i].title}</div>
                        </div>
                    `
                }
            })
        })
        // Click the first button by default
        btns[0].click();

    } else {
        console.log(response);
    }
}


getComponents();

console.log("run ");

const search = document.querySelector(".search-input");
search.addEventListener("input", () => {
    var componentsFounded = components.filter((component) => {
        return component.title.toLowerCase().includes(search.value.toLowerCase());
    });
    console.log("component founded", componentsFounded);

    container.innerHTML = "";
    componentsFounded.forEach(element => {
        container.innerHTML += `
                <div class="component box">
                    <img src="${element.image}" alt="">
                    <div class="name"> ${element.title}</div>
                </div>`
    });
});

search.addEventListener("focusout", () => {
    console.log("out of focus");

    if (search.value.trim() === "") {
        container.innerHTML = "";
        getComponents();
    }

});
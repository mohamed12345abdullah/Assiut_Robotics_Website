
var components = [];
const container = document.getElementById("mainComponents");


const getComponents = async () => {
    const response = await fetch("https://assiut-robotics-zeta.vercel.app/components/getComponents")
    if (response.ok) {
        const res = await response.json()
        components = res.data;
        console.log(components);

        components.forEach(element => {
            container.innerHTML += `
            <div class="component box" ">
            <img src="${element.image}" alt="">
            <div class="name"> ${element.title}</div>
            
        </div>`
        });

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
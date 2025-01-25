
// fetch data from  https://assiutrobotics-production.up.railway.app/members/getAllMembers

let contaianer = document.getElementById("rate");
let token = JSON.parse(localStorage.getItem("token"));
let Data;
let objOfAllMembersRated = [];
// push data to https://assiutrobotics-production.up.railway.app/members/rate in the next form

// {"token : "....will be brought from localstorage......", ID"...will be brought from data above....", rate"....will be brought from the html...""}

async function data() {
    let response = await fetch('https://assiutrobotics-production.up.railway.app/members/getAllMembers');
    let data = await response.json();
    return data.data.members;
}

async function makeAll(){
    Data = await data();
    console.log(Data);
    for (let i = 0; i < Data.length; i++) {
        
    let obj = {"token": token, "ID":Data[i]._id, rate: 0};
    objOfAllMembersRated.push(obj);
    // create element with i id with a state attribute also
    contaianer.innerHTML += `
            <div class="member" id="${i}">
                <h1>${Data[i].name}</h1>
                <button class="rate btn" id="${i}">Rate</button>
                <input type="number" name="" class="input disabled" id="${i}">
                <button class="btn ensure disabled" id="${i}">ensure</button>
            </div>
    `
    }
    let rate = Array.from(document.getElementsByClassName("rate"));
    rate.forEach((e) => {
        e.addEventListener("click", (e) => {
            let id = e.target.id;
            console.log("ID of the element :",id);
            let parent = document.getElementById(id);
            
            let allChilds = Array.from(parent.children);
            allChilds[1].classList.add("disabled"); 
            allChilds[2].classList.remove("disabled");
            allChilds[3].classList.remove("disabled");

        })
    })
    let ensure = Array.from(document.getElementsByClassName("ensure"));
    ensure.forEach((e) => {
        e.addEventListener("click", (e) => {
                let id = e.target.id;
                let parent = document.getElementById(id);
                if (parent.children[2].value == 0 || parent.children[2].value == "") {
                    alert("write a rate for the member");
                    return;
                }
                objOfAllMembersRated[id].rate = parent.children[2].value;
                // objOfAllMembersRated[id]
                //
                console.log("Data will be sent :",objOfAllMembersRated[id])
                fetch('https://assiut-robotics-zeta.vercel.app/members/rate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": "Bearer " + localStorage.getItem("token") // update token to be in the header
                   
                    },
                    body: {
                        // ID: Data[id]._id,
                        // rate: parent.children[2].value
                    },
                }).then(response => response.json()).then(data => {console.log(data);
                })
                
                let allChilds = Array.from(parent.children);
                allChilds[1].classList.remove("disabled"); 
                allChilds[2].classList.add("disabled");
                allChilds[3].classList.add("disabled");
            
        })
    })
}
makeAll();
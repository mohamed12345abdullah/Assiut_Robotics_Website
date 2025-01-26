let step = 0;
let email;
let code;
let urls = ["https://assiut-robotics-zeta.vercel.app/members/generateOTP", "https://assiut-robotics-zeta.vercel.app/members/verifyOTP", "https://assiut-robotics-zeta.vercel.app/members/changePassword"];
   
let errorMessagesP = document.getElementsByTagName("p")[0];

function nextStep(step) {
    console.log(step);
    if(step == 3){
        window.location.href = "../login/login.html";
    }
    else{
        let form = document.getElementById(`step${step - 1}`);
        form.classList.add("disabled");

        let form2 = document.getElementById(`step${step}`);
        form2.classList.remove("disabled");
    }
}

async function sendreq (data){
    fetch(urls[step],{
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: data
    }).then((res) => {
        if(res.ok)
        {
            
            step++;
            nextStep(step);
        }
        return res.json()
    }).


    then((JSONresponse) => {

        console.log(JSONresponse);
        errorMessagesP.innerText = JSONresponse.message;
    })
    .catch((err) => {
        console.log(err);
        
        errorMessagesP.innerHTML = err.message;
    })
}

async function getdata(Step)
{
    console.log('step = = ' ,step);
    
    let form = document.getElementById(`step${Step}`);
    console.log(form);
    
    let data = new FormData(form);
    let obj = {};
    for (let [key, value] of data.entries()) {
        obj[key] = value;
    }
    console.log("obj ===> " , obj);
    
    if (Step == 0) 
        {email = obj.email};
    if (Step == 1) {
        obj.email = email;
        code = obj.code};
    if (Step == 2) {
        obj.email = email;
        obj.code = code;
    }
    let jsonData = JSON.stringify(obj);
    console.log(jsonData);
    sendreq(jsonData);
}

    let pargraphs = ["Enter your email to receive a code", "Enter the code you received", "Enter your new password"];
    
    errorMessagesP.innerHTML = pargraphs[step];

    let forms = Array.from(document.getElementsByTagName("form"));
    forms.forEach((form) => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            console.log(step);
            getdata(step);
        })
    })    


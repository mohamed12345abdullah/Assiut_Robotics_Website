//const { log } = require("node:console");
let Token;
let email;
let id;
        const load = async () => {
            let token = localStorage.getItem("token");

            if (localStorage.hasOwnProperty("token")) {
                console.log(token);
                 Token = "Bearer " + localStorage.getItem("token");
                console.log(Token);
                
                let response = await fetch("https://assiut-robotics-zeta.vercel.app/members/verify", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": Token // update token to be in the header
                    },
                }).then(res => {
                
                    return res.json();
                }).then((res) => {
                    {
                        const JSONresponse =   res;
                        console.log(JSONresponse);
                        id = JSONresponse.data.id;
                        edit()
        
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
                        email = JSONresponse.data.email;
                        document.getElementById("phone").innerHTML = JSONresponse.data.phoneNumber;
                        document.getElementById("specialty").innerHTML = JSONresponse.data.committee;
                        document.getElementById("human").src =JSONresponse.data.avatar;
                        document.getElementById("magnified").src = JSONresponse.data.avatar;
                        window.localStorage.setItem("role", JSONresponse.data.role);
                        window.localStorage.setItem("committee", JSONresponse.data.committee);
                    }
                }).catch(err => console.log(err));


                

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
      
        function edit() {
           let field = document.getElementById("changePhoto");
           
           field.addEventListener("change", (e) => {
                let form = document.forms["profile_pic"];
                
                let body = new FormData(form);  
                console.log(body)
                
                fetch("https://assiutroboticswebsite-production.up.railway.app/members/changeProfileImage", {
                    method: "POST",
                    headers: {
                        "Authorization": Token // update token to be in the header
                    },
                    body: body
                }).then(res => res.json()).then(data => {
                    document.getElementById("human").src = data.data.avatar;
                    console.log(data);
                }).catch(err => {
                    console.log(err);
                })
            })
        }
        function magnifyImage(){
            let img = document.getElementById("human");
            let magnify = document.querySelector(".magnify");
            
            img.addEventListener('click',() =>{
                magnify.classList.remove('disabled')
            })

            magnify.addEventListener('click',() =>{
                magnify.classList.add('disabled')
            })
        }
        magnifyImage()
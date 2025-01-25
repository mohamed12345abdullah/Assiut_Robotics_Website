let id;
        const load = async () => {
            if (token) {
                let response = await fetch("https://assiut-robotics-zeta.vercel.app/members/verify", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token") // update token to be in the header
                    },
                });

                if (!response.ok) {

                    window.location.href = "../login/login.html"
                } else {
                    const JSONresponse = await response.json();
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
                    document.getElementById("phone").innerHTML = JSONresponse.data.phoneNumber;
                    document.getElementById("specialty").innerHTML = JSONresponse.data.committee;
                    document.getElementById("human").src =JSONresponse.data.avatar;
                    document.getElementById("magnified").src = JSONresponse.data.avatar;
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
      
      
        function edit() {
           let field = document.getElementById("changePhoto");
           
           field.addEventListener("change", (e) => {
                let form = document.forms["profile_pic"];
                let body = new FormData(form);
                
               
                // let obj = {
                //     token: token,
                //     // ID: id,
                //     file: e.target.files[0]
                // }     
                // console.log(obj); // token : token, ID: undefined, file: File

                fetch("https://assiut-robotics-zeta.vercel.app/members/changeProfileImage", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token") // update token to be in the header
                    },
                    body: body
                }).then(res => res.json()).then(data => {
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
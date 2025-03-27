
try {

    document.forms['loginForm'].addEventListener('submit', async (event) => {
        // alert('submitting form');
        event.preventDefault();
        event.target.action = "https://assiut-robotics-zeta.vercel.app/members/login";
        let data={
            email: event.target.email.value,
            password: event.target.password.value,
            ip: await getip()
        }
        data = JSON.stringify(data);
        console.log(data);
        // alert('data is : ' + data);
       
        // TODO do something here to show user that form is being submitted
        const response = await fetch(event.target.action, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let JSONresponse = await response.json();
        if (!response.ok) {

            console.log(JSONresponse);
            document.querySelector(".message").innerHTML = JSONresponse.message;

        } else {
            console.log('aaa', JSONresponse);
            window.localStorage.setItem('token', JSONresponse.data.token);
            document.querySelector(".message").innerHTML = JSONresponse.message;
            window.location.href = "../profile-page/index.html"
        }



    })

} catch (error) {

}


// getip of user
async function getip() {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
}
// alert('end of script');
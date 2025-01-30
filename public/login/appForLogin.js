try {

    document.forms['loginForm'].addEventListener('submit', async (event) => {
        event.preventDefault();
        // TODO do something here to show user that form is being submitted
        const response = await fetch(event.target.action, {
            method: 'POST',
            body: new URLSearchParams(new FormData(event.target))
        });
        let JSONresponse = await response.json();
        if (!response.ok) {

            console.log(JSONresponse);
            document.querySelector(".message").innerHTML = JSONresponse.message;

        } else {
            console.log('aaa', JSONresponse);
            window.localStorage.setItem('token', JSONresponse.data.token);
            document.querySelector(".message").innerHTML = JSONresponse.message;
            window.location.href = "../profile-page/coursesDashboard/index.html"
        }



    })

} catch (error) {

}
try {

    document.querySelector(".confirm_password").addEventListener('input', () => {
        const password = document.querySelector(".password").value;
        let confirm_password = document.querySelector(".confirm_password").value;
        if (password != confirm_password) {
            document.querySelector(".matched").innerHTML = "password not matched"

        } else {
            document.querySelector(".matched").innerHTML = ""
        }
        console.log("input", password, confirm_password);
    })

    document.forms['signupForm'].addEventListener('submit', async (event) => {
        event.preventDefault();
        // TODO do something here to show user that form is being submitted
        // Create a FormData object
        
        const formData = new URLSearchParams(new FormData(event.target))
        
        const element = document.getElementById("signupForm")
        const data = new FormData(element)
        const form = Array.from(data.entries())
        console.log('---------- for test--------------');
        
        console.log('form ', form);
        console.log('urlsearch ',Array.from(formData.entries()));
        
        // Append file input data to FormData object
        // const fileInput = document.getElementById('picture');
        // console.log('avatar', fileInput.files[0]);
        // formData.append('avatar', fileInput.files[0]);
        const response = await fetch(event.target.action, {
            method: 'POST',

            body: new URLSearchParams(new FormData(event.target))
        }).catch(error => {
            document.getElementsByClassName('error_handler')[0].classList.remove('disabled');
            document.getElementsByClassName('error_handler')[0].innerHTML = error;
            alert(error)}
        )
        
         let JSONresponse = await response.json();
         if (!response.ok) {

             console.log('---->',JSONresponse);
             document.querySelector(".message").innerHTML = JSONresponse.message;
             document.querySelector(".message").classList.remove('success');
             document.querySelector("#signupForm").classList.remove('successAnimation');

         } else {
             console.log('--->', JSONresponse);

             document.querySelector(".message").innerHTML = JSONresponse.message;
             document.querySelector(".message").classList.add('success');
             document.querySelector("#signupForm").classList.add('successAnimation');
         }
    })
}
catch (error) {
    alert(error)
}
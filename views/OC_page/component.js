
var components=[];
const getComponents=async()=>{
    const response=await fetch("../../components/getComponents")
    if( response.ok){
        const res= await response.json()
        components=res.data;
        console.log(components);
        
const container=document.querySelector(".components");
components.forEach(element => {
    container.innerHTML+=`
            <div class="component">
            <img src="../../uploads/${element.image}" alt="">
            <div class="name"> ${element.title}</div>

        </div>`
});

    }else{
        console.log(response);
    }
}


getComponents()
console.log("run ");


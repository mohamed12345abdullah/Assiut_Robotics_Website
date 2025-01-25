
//Setup Members
var membersData = [];
const container = document.getElementsByClassName(".members");


//fetching data from the api
async function fetchingData() {
    try{
    let response = await fetch('https://assiutrobotics-production.up.railway.app/members/getAllMembers');
    let data = await response.json();
    return data.data.members;
    }
    catch(error){
        console.log(error);
    }
}

// testing the data
const UseData = async () => {
        //get data and arrange it 
    membersData = await fetchingData();
    console.table(`membersData array =>`, membersData);                                                          // debuging
    clearDoubled(membersData);
    let heads = [];
    let members = [[], [],[] ,[], [],[] ,[],[]]; // 0 => HR , 1 => PR , 2 => marketing ,3 => OC, 4 => AC-mechanical, 5 => AC-Electrical , 6 => media , 7 => web
    sortMembers(membersData, members)

        // product is -> All members array, members array , and heads array

        //creating the Heads board
    function createHeadsBoard() {
        let data = membersData;
        let teamLeaderPicture = document.getElementById('PTeamLeader')
        let pictureLeader = searchFor(1 , data)

        teamLeaderPicture.innerHTML = `<img src="${pictureLeader}" class="pic">`


        let commitiesHeads = document.getElementById('CSlider') // this will contain the committees taps 
        let arrOfCommities = ['HR', 'PR', 'marketing', 'OC' , 'AC_mechanic','AC_electric', 'media', 'web']  // there is the form of committee name i deal with it if it has been changed change it please 

        for (let i = 0; i < arrOfCommities.length; i++) {
            let pciture = searchFor(arrOfCommities[i], data)

            heads.push(pciture)
            let content = `
            <div class="col-2 heads" id = ${arrOfCommities[i] , i}>
              <div class="circle">
                <img src="${pciture}" class="pic">
              </div>
              <h3>${arrOfCommities[i]}</h3>
            </div>`
            
            commitiesHeads.innerHTML += content
        }
    }
    createHeadsBoard()
        // debugging
    
    
    console.table(`heads array =>`,heads);
    console.table(`members array =>`,members);
    
        //creating the team members board
    {
        let taps = document.querySelectorAll('.heads');
        let tapHead = document.querySelectorAll('.head')[0];
        let hint = document.getElementsByClassName('hint')[0];
        let tapMembers = document.querySelectorAll('.members')[0];    
        let col8 = document.querySelectorAll('.col-8')[0];
        let col4 = document.querySelectorAll('.col-4')[0];
        let vline = document.querySelectorAll('.vline')[0];
        
        taps.forEach((tap,index) => {
            tap.addEventListener('click', (t) => {
                if(window.innerWidth <= 1440){
                    arrow.classList.remove('disabled')

                }

                if(tapHead.classList.contains('disabled')){
                    tapHead.classList.remove('disabled')
                }
                if(col8.classList.contains('disabled')){
                    col8.classList.remove('disabled')
                }
                if(col4.classList.contains('disabled')){
                    col4.classList.remove('disabled')
                }
                if(vline.classList.contains('disabled')){
                    vline.classList.remove('disabled')
                }
                if(!hint.classList.contains('disabled')){
                    hint.classList.add('disabled')
                }   
                tapMembers.innerHTML = '';
                let img = tapHead.querySelector('img');
                let name = tapHead.querySelector('h3');
                
                    // make the head of the committee appear
                
                    members[tap.id].forEach(e => {
                        if(e.role == 2){
                        name.innerHTML = e.name;
                        img.src = e.avatar; 
                    }
                })
                members[tap.id].forEach(e => {
                    if(e.role == 1){
                    members[tap.id].splice(members[tap.id].indexOf(e),1);
                }
            })
                    // make the members of the committee appear
                tapMembers.innerHTML = '';
                members[tap.id].forEach((e,index) => {
                    
                    if(e.role != 2 && e.role != 1){
                       
                        let content = `
                        <div class="col-2" id = ${e.name}>
                        <div class="circle2">
                            <img src="${e.avatar}" class="pic">
                        </div>
                        <h3>${e.name}</h3>
                        </div>`
                        tapMembers.innerHTML += content
                    }
                })
        

                    // make the info content appear
            
            })
        })
    }
        //creating the hall of fame board
    {
        // get the most active member
        let mostActive = searchForRate(membersData);
        let contianer = document.getElementById('hallmember');
        let imgs = Array.from(contianer.querySelectorAll('img'));
        imgs.forEach((e,index) => {
            e.src = mostActive[index].avatar;
            
        })
        
        
            // not commpleted yet 
    }

}

UseData();
function searchForRate(data) {
            // not commpleted yet
    let mostActive = [];
    let rates = []
    let max = 0;
    for(let i = 0; i < data.length; i++){
        let obj = {rate :data[i].rate, avatar : data[i].avatar}
        if(data[i].rate > max){
            max = data[i].rate;
            rates.push(obj);
        }
        else{
            rates.unshift(obj);
        }
    }
    mostActive = rates.slice(-6);
    return mostActive;
}
function includesWordAtStart(str, word) {
    // Create a regular expression to match the word at the start or followed by a hyphen
    const regex = new RegExp(`^${word}\\b|${word}-`, 'i');
    return regex.test(str);
}

function searchFor(Committee, data) {
    if(Committee == 1){
        for (let i = 0; i < data.length; i++) {
            if(data[i].role == Committee){
                return data[i].avatar;
            }
        }
    }
    else{
        for (let i = 0; i < data.length; i++) {
                
            if (includesWordAtStart(data[i].committee, Committee)  && data[i].role == /*For testing we will use the number*/ 2 /*'head'*/) {

                return data[i].avatar;
            }
        }
    }
}

function sortMembers(data, members) {
    for (let i = 0; i < data.length; i++) {
        if (includesWordAtStart(data[i].committee , 'HR')) {
            members[0].push(data[i]);
        } else if (data[i].committee == 'PR') {
            members[1].push(data[i]);
        } else if (data[i].committee == 'marketing') {
            members[2].push(data[i]);
        }else if (data[i].committee == 'OC') {
            members[3].push(data[i]);
        }else if (data[i].committee == 'AC_mechanic') {
            members[4].push(data[i]);
        }else if (data[i].committee == 'AC_electric') {
            members[5].push(data[i]);
        } else if (data[i].committee == 'media') {
            members[6].push(data[i]);
        } else if (data[i].committee == 'web') {
            members[7].push(data[i]);
        }
    }
}

function clearDoubled(data){
    let counterHead = [0,0,0,0,0,0,0];
    let leader = 0;
    for (let i = 0; i < data.length; i++) {
            if(data[i].role == 2){

                let comitteeType; 
                if(data[i].committee == 'HR'){
                    comitteeType = 0}
                else if(data[i].committee == 'PR'){comitteeType = 1}
                else if(data[i].committee == 'marketing'){comitteeType = 2}
                else if(data[i].committee == 'AC-mechanic'){comitteeType = 3}
                else if(data[i].committee == 'AC-electric'){comitteeType = 4}
                else if(data[i].committee == 'media'){comitteeType = 5}
                else if(data[i].committee == 'web'){comitteeType = 6}
                if(counterHead[comitteeType] == 1){
                    data.splice(i,1);
                    i--;
                }
                else{
                    counterHead[comitteeType]++;
                }
            }
            else if(data[i].role == 1){

                if(leader){
                    data.splice(i,1);
                    i--;
                }
                else{
                    leader = 1;
                }
            }
    }
    console.log("Data after filter : " ,data);
    
}


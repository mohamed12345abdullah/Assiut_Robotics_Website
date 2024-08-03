let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let it;
let searchmood = 'title';
function getTotal() {

  if (price.value != '') {
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = result;
    total.style.background = "rgb(27, 81, 161)";
  }
  else {
    total.innerHTML = '';
    total.style.background = 'rgb(192, 13, 13)';
  }
}
let prodata=[];
// if (localStorage.product != null) {
//   prodata = JSON.parse(localStorage.product);
// }
// else {
//   prodata = [];
// }                      //  this code replaced with get the data from DB 
const getComponents=async()=>{
  const res=await fetch("../../components/getComponents")
  if(res.ok){
    const response=await res.json();
    console.log(response);
    prodata=await response.data;
    read();
  }
  else{
    const response=await res.json();
    console.log(response.message);
  }
}
 getComponents();

 const updateComponent=async(id,newpro)=>{
  try {
    let data={
      id,
      newpro
    }
    
  const res=await fetch("../../components/update",{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)

  })
  if(res.ok){
    const response=await res.json()
    console.log(await response.message);
  }else{
    const response=await res.json()
    console.log(await response.message);
  }
  } catch (error) {
    
  }
 }
 
submit.onclick = function () {

  let newpro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  }

  if (title.value != '' && price.value > 0 && taxes.value >= 0 && ads.value >= 0 && discount.value >= 0 && count.value <= 100 && category.value != '') {
    if (mood == 'create') {
      // if (newpro.count > 1) {   i comment this if else becouse if newpro.count ==1 the for loop will run once 
        for (let i = 0; i < newpro.count; i++) {
          // prodata.push(newpro); // now i will push in the mongooe data base
          pushToDB(newpro);
          getComponents();
        }
      // }
      // else {
      //   prodata.push(newpro);
      // }
    }
    else {
      // prodata[it] = newpro;   // update
      let id=prodata[it]._id
      updateComponent(id,newpro);
      getComponents();
      mood = 'create';
      submit.innerHTML = 'Create';
      count.style.display = 'block';
    }
    clear();
  }

  // localStorage.setItem('product', JSON.stringify(prodata));


  read();
}

read();
function clear() {
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';
  total.style.background = 'rgb(192, 13, 13)';
}
function read() {
  let table = "";
  for (let i = 0; i < prodata.length; i++) {
    

    table += `
    <tr>
            <td>${i + 1}</td>
            <td>${prodata[i].title}</td>
            <td>${prodata[i].price}</td>
            <td>${prodata[i].taxes}</td>
            <td>${prodata[i].ads}</td>
            <td>${prodata[i].discount}</td>
            <td>${prodata[i].total}</td>
            <td>${prodata[i].category}</td>
            <td><button  onclick="update(${i}) " id='update'>Update</button></td>
            <td><button  onclick="del(${i})" id='delete'>Delete</button></td>

        </tr>
    `;
  }
  let body = document.getElementById('body');
  body.innerHTML = table;
  let deALL = document.getElementById('delALL');
  if (prodata.length > 0) {
    deALL.innerHTML = `
      <button  onclick="delAll()" id="deleteAll">Delete All ( ${prodata.length} )</button>
      `



  }

  else {
    deALL.innerHTML = '';
  }
}



const deleteOne=async(id)=>{
  data={
    id
  }
  const res = await fetch("../../components/deleteOne",{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)

  })
  if(res.ok){
    const response=await res.json();
    console.log(await response);
    // prodata=await response.data;
    getComponents();
    read();
  }
  else{
    const response=await res.json();
    console.log(await response.message);
  }
}


function del(item) {
  deleteOne(prodata[item]._id)
  prodata.splice(item, 1);
  localStorage.product = JSON.stringify(prodata);
  read();
}
 function delAll() {
  // localStorage.clear();
  // prodata.splice(0);
  deleteAll();
  getComponents();
  read();
}

function update(item) {
  title.value = prodata[item].title;
  price.value = prodata[item].price;
  taxes.value = prodata[item].taxes;
  ads.value = prodata[item].ads;
  discount.value = prodata[item].discount;
  total.innerHTML = prodata[item].total;
  total.style.background = 'rgb(27, 81, 161)';
  count.style.display = 'none';
  category.value = prodata[item].category;
  mood = 'update';
  submit.innerHTML = 'Update';
  it = item;
  scroll({
    top: 0,
    behavior: "smooth",
  })
}
let search = document.getElementById('search');
function searchq(id) {

  if (id == 'search-title') {
    searchmood = 'title';


  }
  else {
    searchmood = 'category';

  }
  search.placeholder = 'Search By ' + searchmood;
  search.value = '';
  read();

}

function searchdata(value) {
  let table = '';
  for (let i = 0; i < prodata.length; i++) {
    if (searchmood == 'title') {


      if (prodata[i].title.includes(value)) {
        table += `
    <tr>
            <td>${i + 1}</td>
            <td>${prodata[i].title}</td>
            <td>${prodata[i].price}</td>
            <td>${prodata[i].taxes}</td>
            <td>${prodata[i].ads}</td>
            <td>${prodata[i].discount}</td>
            <td>${prodata[i].total}</td>
            <td>${prodata[i].category}</td>
            <td><button  onclick="update(${i})" id='update'>Update</button></td>
            <td><button  onclick="del(${i})" id='delete'>Delete</button></td>

        </tr>
    `;
      }
    }

    else {

      if (prodata[i].category.includes(value)) {
        table += `
        <tr>
                <td>${i + 1}</td>
                <td>${prodata[i].title}</td>
                <td>${prodata[i].price}</td>
                <td>${prodata[i].taxes}</td>
                <td>${prodata[i].ads}</td>
                <td>${prodata[i].discount}</td>
                <td>${prodata[i].total}</td>
                <td>${prodata[i].category}</td>
                <td><button  onclick="update(${i})" id='update'>Update</button></td>
                <td><button  onclick="del(${i})" id='delete'>Delete</button></td>
    
            </tr>
        `;
      }

    }
    let body = document.getElementById('body');
    body.innerHTML = table;
  }
}



const pushToDB=async(data)=>{
  try {
    console.log(data);

  const res=await fetch("../../components/add",{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })
  if(res.ok){
    let response=res.json();
    console.log(await response);
    }
  
} catch (error) {
    console.log(error);
}

}



const deleteAll=async()=>{
  const res = await fetch("../../components/deleteAll")
  if(res.ok){
    const response=await res.json();
    console.log(await response);
    // prodata=await response.data;
    getComponents();
    read();
  }
  else{
    const response=await res.json();
    console.log(await response.message);
  }
}
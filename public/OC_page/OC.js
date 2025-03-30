let title = document.getElementById('title');
let price = document.getElementById('price');
let count = document.getElementById('count');
let category = document.getElementById('category');
let componentLocation = document.getElementById('componentLocation');
let imageInput = document.getElementById('image');
let submit = document.getElementById('submit');
let mood = 'create';
let it;
let searchmood = 'title';

let prodata = [];
// if (localStorage.product != null) {
//   prodata = JSON.parse(localStorage.product);
// }
// else {
//   prodata = [];
// }                      //  this code replaced with get the data from DB 
const getComponents = async () => {
  const res = await fetch("https://assiut-robotics-zeta.vercel.app/components/getComponents")
  if (res.ok) {
    const response = await res.json();
    console.log(response);
    prodata = await response.data;
    read();
  }
  else {
    const response = await res.json();
    console.log(response.message);
  }
}
getComponents();

const updateComponent = async (formData) => {
  try {
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    const dataObject = {};
    for (let [key, value] of formData.entries()) {
      dataObject[key] = value;
    }

    const res = await fetch("https://assiut-robotics-zeta.vercel.app/components/update", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: dataObject.id,
        newpro: {
          title: dataObject.title,
          price: dataObject.price,
          category: dataObject.category

        }
      })
    });
    if (res.ok) {
      const response = await res.json();
      console.log(response.message);

      getComponents();
      read();
    } else {
      const response = await res.json();
      console.log(response.message);
    }
  } catch (error) {
    console.error(error);
  }
};

let form = document.getElementById('componentForm');
form.addEventListener('submit', function (event) {
  event.preventDefault();
  if (title.value != '' && price.value > 0 && count.value <= 100 && category.value != '') {
    if (mood == 'create') {

      let countValue = Number(count.value) || 1;
      for (let i = 0; i < countValue; i++) {
        let formData = new FormData();
        formData.append('title', title.value);
        formData.append('price', price.value);
        formData.append('count', '1');
        formData.append('location', componentLocation.value);
        formData.append('category', category.value);
        if (imageInput.files.length > 0) {
          formData.append('image', imageInput.files[0]);
        }
        pushToDB(formData);
      }
    } else {

      let id = prodata[it]._id;
      let formData = new FormData();
      formData.append('id', id);
      formData.append('title', title.value);
      formData.append('price', price.value);
      // formData.append('location', componentLocation.value);
      formData.append('category', category.value);

      // if (imageInput.files.length > 0) {
      //   formData.append('image', imageInput.files[0]);
      // }

      updateComponent(formData);
      mood = 'create';
      submit.innerHTML = 'Create';
      count.style.display = 'block';
    }
    clear();
  }

  read();
});


read();
function clear() {
  title.value = '';
  price.value = '';
  count.value = '';
  category.value = '';
  componentLocation.value = '';
  imageInput.value = '';
}
function read() {
  let table = "";
  for (let i = 0; i < prodata.length; i++) {
    table += `
    <tr>
            <td>${i + 1}</td>
            <td>${prodata[i].title}</td>
            <td>${prodata[i].price}</td>
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



const deleteOne = async (id) => {
  data = {
    id
  }
  const res = await fetch("https://assiut-robotics-zeta.vercel.app/components/deleteOne", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(data)

  })
  if (res.ok) {
    const response = await res.json();
    console.log(await response);
    // prodata=await response.data;
    getComponents();
    read();
  }
  else {
    const response = await res.json();
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
  count.style.display = 'none';
  category.value = prodata[item].category;
  componentLocation.value = prodata[item].location;
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


const pushToDB = async (formData) => {
  try {
    console.log(formData);
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    const res = await fetch("https://assiutroboticswebsite-production.up.railway.app/components/add", {
      method: "post",
      body: formData
    })
    let response = await res.json()
    if (res.ok) {
      ;
      console.log(response);
 

    }
    alert(response.message)
    getComponents();
  } catch (error) {

    alert(error.message)
    console.log(error);
  }

}

const deleteAll = async () => {
  const res = await fetch("https://assiut-robotics-zeta.vercel.app/components/deleteAll")
  if (res.ok) {
    const response = await res.json();
    console.log(await response);
    // prodata=await response.data;
    getComponents();
    read();
  }
  else {
    const response = await res.json();
    console.log(await response.message);
  }
}
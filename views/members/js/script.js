//global variables
const board = document.querySelectorAll('.circle');

const info = document.querySelector('.col-4');
const border = document.querySelector('.vline');

//Setup Members
var membersData = [];
const container = document.getElementsByClassName(".members");

const getMembersData = async () => {
    const response = await fetch("../../members/getAllMembers")
    if (response.ok) {
        const res = await response.json()
        membersData = res.data;
        console.log(membersData);

        membersData.forEach(element => {
            container.innerHTML += `
            <div class="component box">
            <img src="../../uploads/${element.image}" alt="">
            <div class="name"> ${element.title}</div>

        </div>`
        });

    } else {
        console.log(response);
    }
}

getMembersData();

//clicking event for board members
board.forEach(e => {
    e.addEventListener("click", () => {
        if (info.style.display === 'none') {
            info.style.display = 'block';
            border.style.display = 'block';
        } else {
            info.style.display = 'none';
            border.style.display = 'none';
        }
    })
});


const members = document.querySelectorAll('.circle2');
//clicking event for team members
// members.forEach(e => {
//     e.addEventListener("click", () => {
//         if (info.style.display === 'none') {
//             info.style.display = 'block';
//             border.style.display = 'block';
//         } else {
//             info.style.display = 'none';
//             border.style.display = 'none';
//         }
//     })
// });

$('.slider').slick({
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 4,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 4
            }
        },
        {
            breakpoint: 480,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 1
            }
        }
    ]
});
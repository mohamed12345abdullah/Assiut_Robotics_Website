// Image Slider
const sliderContainer = document.querySelector('.slider-container');
const slides = document.querySelectorAll('.slider-container img');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentSlide = 0;
const totalSlides = slides.length;

function updateSlider() {
  sliderContainer.style.transform = `translateX(${currentSlide * 100}%)`;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlider();
}

prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// Auto-advance slides
setInterval(nextSlide, 5000);

// Animated Character Eyes
const eyes = document.querySelectorAll('.eye');

document.addEventListener('mousemove', (e) => {
  eyes.forEach(eye => {
    const rect = eye.getBoundingClientRect();
    const x = (rect.left + rect.width / 2);
    const y = (rect.top + rect.height / 2);
    const rad = Math.atan2(e.pageX - x, e.pageY - y);
    const rotation = (rad * (180 / Math.PI) * -1) + 180;
    eye.style.transform = `rotate(${rotation}deg)`;
  });
});












const plate = document.getElementById('plate');
const cake = document.getElementById('cake');
const message = document.getElementById('message');

let animationCount = 0;

function showCake() {
    cake.style.display = 'block';
    cake.style.transform = 'translate(0, 0)';
}

function hideCake() {
    cake.style.transform = 'translate(0, -100%)';
    setTimeout(() => {
        cake.style.display = 'none';
    }, 2000);
}

function showMessage(text) {
    message.textContent = text;
    message.style.display = 'block';
    setTimeout(() => {
        message.style.display = 'none';
    }, 2000);
}

function startAnimation() {
  console.log("animation");
  
    if (animationCount === 0) {
        showCake();
        setTimeout(() => {
            hideCake();
            showMessage('اتفضل وحدة');
            setTimeout(() => {
                showCake();
                setTimeout(() => {
                    hideCake();
                    showMessage('خد وحدة تانية');
                    setTimeout(() => {
                        showCake();
                        showMessage('كفاية كدا هتاخد كحك كتير بعد العيد');
                    }, 2000);
                }, 2000);
            }, 2000);
        }, 2000);
    }
}

// Start the animation when the page loads
window.onload = startAnimation;
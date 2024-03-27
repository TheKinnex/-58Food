const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let index = 0;

function showSlide() {
    carousel.style.transform = `translateX(-${index * 100}%)`;
}

prevBtn.addEventListener('click', () => {
    index = (index - 1 + 5) % 5;
    showSlide();
});

nextBtn.addEventListener('click', () => {
    index = (index + 1) % 5;
    showSlide();
});



document.getElementById('btnNavToggle').addEventListener('click', () => {
    const navDropDown = document.getElementById('navDropDown');
    if (navDropDown.className.includes('hidden')) {
        navDropDown.classList.remove('hidden');
        navDropDown.classList.add('animate__animated', 'animate__fadeInDown');
    } else {
        navDropDown.classList.remove('animate__fadeInDown');
        navDropDown.classList.add('animate__animated', 'animate__fadeOutUp');
        setTimeout(() => {
            navDropDown.classList.add('hidden');
            navDropDown.classList.remove('animate__fadeOutUp');
        }, 550);
    }
});


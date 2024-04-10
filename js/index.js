window.onload = () => {
    const sesion = JSON.parse(localStorage.getItem('usuario'));

    if (!sesion) {
        return;
    } else {
        document.getElementById('navNoSesion').classList.add('hidden');
        document.getElementById('navSesion').classList.remove('hidden');
        document.getElementById('navDropDownNoSession').classList.add('hidden');
        document.getElementById('navDropDownSession').classList.remove('hidden');
        if (sesion.name === 'admin') {
            document.getElementById('navAdminOption').classList.remove('hidden');
            document.getElementById('navDropDownSessionAdmin').classList.remove('hidden');
        }
    }

}

document.querySelectorAll('.logOut').forEach((e) => {
    e.addEventListener('click', () => {
        localStorage.removeItem('usuario');
        location.replace('./index.html');
    })
})


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


document.getElementById('resetLocalStorage').addEventListener('click', () => {
    localStorage.clear();
})



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


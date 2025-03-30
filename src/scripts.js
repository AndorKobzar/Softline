document.addEventListener("DOMContentLoaded", () => {
    const source = document.querySelector(".offices__regions");
    const target = document.querySelector(".offices__desktop-regions.shadow");

    if (source && target) {
        target.innerHTML = source.innerHTML;
    }
});

document.addEventListener('click', event => {
    const toggleClasses = ['offices__toggle', 'offices__region', 'direction'];

    if (toggleClasses.some(cls => event.target.matches(`.${cls}`))) {
        const parent = event.target.parentElement;
        const siblings = parent.children;

        // Закрываем все соседние элементы
        [...siblings].forEach(sibling => {
            if (sibling !== event.target) {
                sibling.classList.remove('open');
            }
        });

        event.target.classList.toggle('open');
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".life__slider");
    const slides = document.querySelectorAll(".life__slide");
    const prevArrow = document.querySelector(".life__arrow_prev");
    const nextArrow = document.querySelector(".life__arrow_next");
    const pagination = document.querySelector(".life__pagination");

    let currentIndex = 0;
    let startX = 0;
    let isSwiping = false;

    slides.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("life__bar");
        if (index === 0) dot.classList.add("active");
        dot.dataset.index = index;
        pagination.appendChild(dot);
    });

    const dots = document.querySelectorAll(".life__bar");

    function updateSlider(index) {
        slider.style.transition = "transform 0.5s ease-in-out";
        slider.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider(currentIndex);
    }

    nextArrow.addEventListener("click", nextSlide);
    prevArrow.addEventListener("click", prevSlide);

    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            currentIndex = Number(dot.dataset.index);
            updateSlider(currentIndex);
        });
    });

    // Добавление поддержки свайпа
    slider.addEventListener("touchstart", (event) => {
        startX = event.touches[0].clientX;
        isSwiping = true;
        // Отключаем анимацию во время свайпа
        slider.style.transition = "none";
    });

    slider.addEventListener("touchmove", (event) => {
        if (!isSwiping) return;
        let currentX = event.touches[0].clientX;
        let diffX = startX - currentX;

        slider.style.transform = `translateX(calc(-${currentIndex * 100}% - ${diffX}px))`;
    });

    slider.addEventListener("touchend", (event) => {
        if (!isSwiping) return;
        isSwiping = false;
        let endX = event.changedTouches[0].clientX;
        let diffX = startX - endX;

        if (diffX > 50) {
            nextSlide();
        } else if (diffX < -50) {
            prevSlide();
        } else {
            // Возвращаем на место, если свайп слабый
            updateSlider(currentIndex);
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    setAll();

    const regions = document.querySelectorAll("[data-region]");
    const cities = document.querySelectorAll("[data-city]");

    document.addEventListener('click', event => {
        const target = event.target;
        let region = null;
        let city = null;

        if (target.matches('.offices__region')) {
            region = target.closest('[data-region]').getAttribute('data-region');
        } else if (target.matches('[data-region]')) {
            region = target.getAttribute('data-region');
        } else if (target.matches('[data-city]')) {
            city = target.getAttribute('data-city');
        }

        if (region === 'all') {
            setAll();
            return;
        }

        if (region) {
            regions.forEach(el => {
                if (el.getAttribute("data-region") === region) {
                    el.classList.add("active");
                } else {
                    el.classList.remove("active");
                }
            });
        }

        if (city) {
            cities.forEach(el => {
                if (el.getAttribute("data-city") === city) {
                    el.classList.add("active");
                } else {
                    el.classList.remove("active");
                }
            });
            closeCitiesMenu();
        }

    });

    function clearAll() {
        regions?.forEach(el => el.classList.remove('active'));
        cities?.forEach(el => el.classList.remove('active'));
    }

    function setAll() {
        clearAll();
        document.querySelector('[data-region="all"]').classList.add('active');
        document.querySelectorAll('.map [data-city]').forEach(el => el.classList.add('active'));
        console.log('set all', document.querySelectorAll('.map [data-city]')?.length);
    }

    function closeCitiesMenu() {
        document.querySelector('.offices__toggle')?.classList.remove('open');
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    elements.forEach(el => observer.observe(el));
});
window.addEventListener("load", (event) => {
    init();
});


function init() {

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    const body = document.querySelector('body');
    const wrapper = document.querySelector('.wrapper');



    //?  ---------------- burger menu
    const burgerMenu = document.querySelector('.burger-menu');
    const headerMenu = document.querySelector('.nav-menu');

    if (burgerMenu) {
        burgerMenu.classList.add('toggled');
        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active');
            burgerMenu.classList.toggle('toggled');
            let width1 = wrapper.offsetWidth;
            body.classList.toggle('fixed');
            headerMenu.classList.toggle('active');
            let width2 = wrapper.offsetWidth;
            let margin = width2 - width1;
            if (headerMenu.classList.contains('active')) {
                margin = `${margin}px`;
                corrrectionMargin(margin);
            } else {

                corrrectionMargin('0px');
            }
        });
    }

    function closeBurgerMenu() {
        if (burgerMenu && headerMenu) {
            burgerMenu.classList.remove('active');
            burgerMenu.classList.add('toggled');
            body.classList.remove('fixed');
            headerMenu.classList.remove('active');

            corrrectionMargin('0px');
        }
    }

    function corrrectionMargin(margin = '0px') {
        wrapper.style.marginRight = margin;
    }
    document.addEventListener('click', e => {
        if (!e.target.closest('.nav-menu') && !e.target.closest('.burger-menu')) {
            closeBurgerMenu();
        }
    })

    // ? function scroll to element
    function scrollToElement(el, top) {
        let offsetPositon = el.getBoundingClientRect().top - top;
        window.scrollBy({
            top: offsetPositon,
            behavior: 'smooth',
        });
    }

    // ? select event color

    const select = document.querySelector('.donate-form__select-server');
    if (select) {
        select.addEventListener('change', e => {
            select.style.color = '#fff';
        })
    }


    const divServerSlider = document.querySelector('#servers-slider');
    if (divServerSlider) {

        // ? slider  server item progress
        const divProgressbarItems = divServerSlider.querySelectorAll('.server__progress-percent');

        function setPercentProgressbarItems() {
            divProgressbarItems.forEach(item => {
                const percent = item.getAttribute('data-percent');
                item.style.width = `${percent}%`;
            })
        }
        setPercentProgressbarItems();


        // ? slider button copy ip
        const divSliderBtns = divServerSlider.querySelectorAll('.server__btn');

        const pathCopy = `<path d="M2.25 6.75H11.25V15.75H2.25V6.75ZM6.75 2.25V4.5H13.5V11.25H15.75V2.25H6.75Z" fill="#252438" />`;
        const pathCheck = `<path d="M17.0267 0.975006L6.37153 11.6302L1.92325 7.1819L0.474976 8.63018L5.64739 13.8026L6.37153 14.5267L7.09566 13.8026L18.475 2.42328L17.0267 0.975006Z" fill="white"/>`;

        const btnTextCopy = 'скопіювати ip ';
        const btnTextCopied = 'Скопійовано';

        let copyTimerId;



        divSliderBtns.forEach(btn => {
            btn.addEventListener('click', e => {
                copyIp(btn);
            });
        })

        function copyIp(btn) {
            const ip = btn.getAttribute('data-ip');

            copyToClipboard(ip);

            const item = btn.closest('.servers-slider__item');
            item.classList.add('copied');

            const btnText = btn.querySelector('.server__btn-text');
            btnText.innerHTML = btnTextCopied;

            const btnSvg = btn.querySelector('.server__btn-svg');
            btnSvg.innerHTML = pathCheck;

            copyTimerId = setTimeout(() => {
                clearTimeout(copyTimerId);
                btnText.innerHTML = btnTextCopy;
                btnSvg.innerHTML = pathCopy;
                item.classList.remove('copied');
            }, 1000);
        }


        function copyToClipboard(text) {
            if (window.isSecureContext && navigator.clipboard) {
                navigator.clipboard.writeText(text);
            } else {
                const int = document.createElement("textarea");
                int.value = text;
                document.body.appendChild(int);
                int.focus();
                int.select();
                try {
                    document.execCommand('copy');
                } catch (err) {
                    console.error('Unable to copy to clipboard', err);
                }
                document.body.removeChild(int);
            }
        }

    }


    // ? gsap animation

    let tl = gsap.timeline();
    let mm = gsap.matchMedia();

    const pageHome = document.querySelector('.page-home');
    const pageDonate = document.querySelector('.page-donate');
    if (pageHome) {
        gsap.registerPlugin(ScrollTrigger);


        tl.to('.preloader', {
            opacity: 0,
            'z-index': '-1',
        });
        tl.fromTo('.header__logo', { opacity: 0, scale: 0.6 }, {
            opacity: 1,
            scale: 1
        });
        mm.add("(min-width: 901px)", () => {
            tl.fromTo('.header-menu__item', { opacity: 0, y: -100 }, {
                opacity: 1,
                stagger: 0.1,
                y: 0
            });
        });
        tl.fromTo('.header__link-btn', { opacity: 0 }, {
            opacity: 1,
        });
        // ? hero
        tl.fromTo('.hero-decor__text-top', { opacity: 0 }, {
            opacity: 1,
        });
        tl.fromTo('.hero__title', { opacity: 0, x: -100 }, {
            opacity: 1,
            x: 0
        });
        tl.fromTo('.hero__description', { opacity: 0, y: 50 }, {
            duration: 0.3,
            opacity: 1,
            y: 0
        });
        tl.fromTo('.hero__links', { opacity: 0, x: -50 }, {
            duration: 0.4,
            opacity: 1,
            x: 0
        });
        tl.fromTo('.hero__img', { opacity: 0, x: 400, scale: 0 }, {
            opacity: 1,
            x: 0,
            scale: 1
        });
        tl.fromTo('.hero-social__item', { opacity: 0, scale: 0.4 }, {
            stagger: 0.2,
            opacity: 1,
            scale: 1
        });
        tl.fromTo('.hero-decor__text-bottom', { opacity: 0, x: 50 }, {
            duration: 0.2,
            opacity: 1,
            x: 0
        });
        tl.fromTo('.hero-decor', { opacity: 0 }, {
            duration: 0.4,
            stagger: 0.1,
            opacity: 1,
        });

        // ? ScrollTrigger
        gsap.fromTo('.servers__title', { opacity: 0, scale: 0.9 }, {
            opacity: 1,
            scale: 1,
            scrollTrigger: {
                trigger: ".servers",
                // markers: true,
                start: "top center",
                end: 'bottom bottom',
            }
        })
        gsap.fromTo('.servers__description', { opacity: 0, scale: 0.9 }, {
            opacity: 1,
            scale: 1,
            scrollTrigger: {
                trigger: ".servers__description",
                // markers: true,
                start: "top center",
                end: 'bottom bottom',
            }
        })
        gsap.fromTo('.servers__item-slider', { opacity: 0, x: 200 }, {
            opacity: 1,
            x: 0,
            scrollTrigger: {
                trigger: ".servers__item-slider",
                // markers: true,
                start: "top center",
                end: 'bottom bottom',
            }
        })

        // ? instruction
        let tgIn = gsap.timeline({
            scrollTrigger: {
                trigger: ".instruction",
                // markers: true,
                start: "top center",
                end: 'bottom bottom',
            }
        });
        tgIn.fromTo('.instruction__title', { opacity: 0, y: 100 }, {
            opacity: 1,
            y: 0,
        })
        mm.add("(min-width: 1001px)", () => {
            tgIn.fromTo('.instruction__image', { opacity: 0, scale: 0 }, {
                opacity: 1,
                scale: 1,
            })
        });

        tgIn.fromTo('.instruction__item-step-1', { opacity: 0, x: -100 }, {
            opacity: 1,
            x: 0,
        })

        mm.add("(max-width: 1000px)", () => {
            tgIn.fromTo('.instruction__image', { opacity: 0, scale: 0 }, {
                opacity: 1,
                scale: 1,
            })
        });
        mm.add("(min-width: 501px)", () => {
            tgIn.fromTo('.instruction-decor-line svg path', { opacity: 0, scale: 0, fill: 'transparent' }, {
                duration: 0.3,
                opacity: 1,
                scale: 1,
                fill: 'white'
            })
        });
        tgIn.fromTo('.instruction__item-step-2', { opacity: 0, x: 100 }, {
            opacity: 1,
            x: 0,
        })
        tgIn.fromTo('.footer__logo', { opacity: 0, scale: 0 }, {
            opacity: 1,
            scale: 1
        })
    }

    if (pageDonate) {

        tl.to('.preloader', {
            opacity: 0,
            'z-index': '-1',
        });
        tl.fromTo('.header__logo', { opacity: 0, scale: 0.6 }, {
            opacity: 1,
            scale: 1
        });
        mm.add("(min-width: 901px)", () => {
            tl.fromTo('.header-menu__item', { opacity: 0, y: -100 }, {
                opacity: 1,
                stagger: 0.1,
                y: 0
            });
        });
        tl.fromTo('.header__link-btn', { opacity: 0 }, {
            opacity: 1,
        });
        tl.fromTo('.donate__title', { opacity: 0, scale: 0, y: 100 }, {
            opacity: 1,
            scale: 1,
            y: 0
        });
        tl.fromTo('.donate__description', { opacity: 0 }, {
            duration: 0.1,
            opacity: 1,
        });
        tl.fromTo('.donate-form', { opacity: 0, scale: 0, y: 100 }, {
            opacity: 1,
            scale: 1,
            y: 0
        });
        tl.fromTo('.donate-decor', { opacity: 0, scale: 0 }, {
            stagger: 0.2,
            opacity: 1,
            scale: 1,
        });
        tl.fromTo('.footer__logo', { opacity: 0, scale: 0 }, {
            opacity: 1,
            scale: 1
        })
    }


    if (pageHome) {
        const swiper = new Swiper('#servers-slider', {

            spaceBetween: 20,
            navigation: {
                nextEl: '.servers-slider__next',
                prevEl: '.servers-slider__prev',
            },

            mousewhell: true,
            pagination: {
                el: ".servers-slider__progress",
                type: "progressbar",
            },
            breakpoints: {
                400: {
                    slidesPerView: 1.5,
                    spaceBetween: 20,
                },
                530: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                800: {
                    slidesPerView: 'auto',
                },
                1270: {
                    slidesPerView: 2.5,
                },

                1440: {
                    slidesPerView: 2.8,
                }
            },
            on: {
                reachEnd: function () {
                    swiper.slides[swiper.slides.length - 1].classList.add('active-last');
                },
                navigationPrev: function () {
                    swiper.slides[swiper.slides.length - 1].classList.remove('active-last');
                },
            }
        });
    }
}


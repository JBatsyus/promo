document.addEventListener("DOMContentLoaded", (event) => {
    // плавный скролл
    // $("a.scroll-to").on("click", function (e) {
    //     e.preventDefault();
    //     let anchor = $(this).attr("href");
    //     $("html, body")
    //         .stop()
    //         .animate({
    //                 scrollTop: $(anchor).offset().top,
    //             },
    //             500,
    //         );
    // });
    $(window).on('scroll', function () {
        let scrollDistance = $(window).scrollTop();

        $('.section').each(function () {
            let sectionTop = $(this).offset().top - 250;
            let sectionBottom = sectionTop + $(this).outerHeight();

            if (scrollDistance >= sectionTop && scrollDistance < sectionBottom) {
                let id = $(this).attr('id');
                $('.nav__link').removeClass('nav__link--active');
                $(`.nav__link[href="#${id}"]`).addClass('nav__link--active');
            }
        });
    });



    //вычисляем ширину экрана
    const windowWidth = window.screen.width;

    // вычисление переменных ширины контейнера и экрана, передача их в css
    const container = document.querySelector(".container");
    const wrapper = document.querySelector(".wrapper");
    if (container && wrapper) {
        const containerWidth = container.offsetWidth;
        const wrapperWidth = wrapper.offsetWidth;
        document.documentElement.style.setProperty(
            "--js-container-width",
            containerWidth + "px",
        );
        document.documentElement.style.setProperty(
            "--js-wrapper-width",
            wrapperWidth + "px",
        );
    }
    // табы
    $("._js-tabs-title").on("click", function () {
        let tabAttr = $(this).attr("data-tab"),
            tabInfo = $("._js-tabs-info[data-tab= '" + tabAttr + "']");
        $(this).addClass("active").siblings().removeClass("active");
        tabInfo.addClass("active").siblings().removeClass("active");
    });

    // обработка инпутов
    $(".promo-form__input").on("focus", function () {
        $(this).closest(".promo-form__field-group").addClass("active");
    });

    $(".promo-form__input").on("blur", function () {
        $(this).closest(".promo-form__field-group").removeClass("active");
    });

    window.addEventListener("scroll", function () {
        const header = document.querySelector(".header");

        if (window.scrollY > 50) {
            header.classList.add("header--scrolled");
        } else {
            header.classList.remove("header--scrolled");
        }
    });

    // МОБИЛЬНОЕ МЕНЮ
    const burger = document.querySelector(".burger");
    const menu = document.querySelector(".menu-mob");
    const body = document.body;
    const main = document.querySelector("main");

    // 1. Логика открытия/закрытия бургера
    if (burger && menu) {
        burger.addEventListener("click", () => {
            const isActive = burger.classList.toggle("is-active");
            menu.classList.toggle("is-active");
            body.classList.toggle("no-scroll", isActive);
            main.classList.toggle("is-hidden");
        });

        // 2. Логика клика по ссылкам (включая скролл)
        const allLinks = document.querySelectorAll('a[href^="#"]');

        allLinks.forEach((link) => {
            link.addEventListener("click", function (e) {
                lenis.start();
                const targetId = this.getAttribute("href");
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    e.preventDefault(); // Убираем хеш из URL и отменяем прыжок

                    // Закрываем мобильное меню, если клик был в нем
                    burger.classList.remove("is-active");
                    menu.classList.remove("is-active");
                    body.classList.remove("no-scroll");
                    main.classList.remove("is-hidden");

                    // Плавный скролл с учетом высоты шапки
                    const headerHeight =
                        document.querySelector(".header").offsetHeight || 0;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition =
                        elementPosition + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                    });
                }
            });
        });
    }

    // Инициализация Swiper
    // Слайдер Конверсии
    const conversionSwiper = new Swiper(".conversion-block__swiper", {
        slidesPerView: 1.01,
        spaceBetween: 12,
        grabCursor: true,
        speed: 600,
        loop: true,
        freeMode: true,
        speed: 5000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        navigation: {
            nextEl: ".conversion-block__arrow--next",
            prevEl: ".conversion-block__arrow--prev",
        },

        breakpoints: {
            480: {
                slidesPerView: 1.4,
            },
            675: {
                slidesPerView: 2.001,
            },
            1024: {
                slidesPerView: 2.1,
                spaceBetween: 16,
            },
            1279: {
                slidesPerView: 3.0001,
                spaceBetween: 16,
            },
        },

        a11y: {
            prevSlideMessage: "Предыдущий слайд",
            nextSlideMessage: "Следующий слайд",
        },
    });

    // Сладйер о Компании
    var swiperBullet = new Swiper(".about-company__swiper-bullet", {
        spaceBetween: 12,
        slidesPerView: 2.04,
        freeMode: true,
        watchSlidesProgress: true,
        loop: true,
        breakpoints: {
            576: {
                slidesPerView: 2,
                spaceBetween: 12,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 16,
            },
        },
    });

    var swiperBase = new Swiper(".about-company__swiper-base", {
        spaceBetween: 0,
        effect: "fade",
        fadeEffect: {
            crossFade: true,
        },
        loop: true,
        slidesPerView: 1,
        thumbs: {
            swiper: swiperBullet,
        },
    });

    // слайдер Клиенты
    const swiperClients = new Swiper(".clients-slider", {
        slidesPerView: "auto",
        slidesPerGroup: 1,
        loop: true,
        freeMode: true,
        speed: 3000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
    /* слайдер с рейтингом на Главной (места премии...) */
    const swiperRaitingMain = new Swiper(".new_raiting_wrapper", {
        slidesPerView: 4,
        spaceBetween: 16,
        slidesPerGroup: 1,
        loop: true,
        freeMode: true,
        speed: 10000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            250: {
                slidesPerView: "auto",
                slidesPerGroupAuto: true,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
            },
            // when window width is >= 768px
            768: {
                slidesPerView: 2,
            },
            // when window width is >= 991px
            991: {
                slidesPerView: 3,
            },
            1300: {
                slidesPerView: 4,
            },
        },
    });

    var swiper = new Swiper(".number-slider__swiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        effect: "fade",
        fadeEffect: {
            crossFade: true,
        },
        speed: 1000,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        autoHeight: false,
    });

    // Инициализация Swiper
    const promoSlider = new Swiper(".promo-landing__slider", {
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 600,
        effect: "fade",
        observer: true,
        observeParents: true,
        watchSlidesProgress: true,

        navigation: {
            nextEl: ".promo-landing__arrow--next",
            prevEl: ".promo-landing__arrow--prev",
        },
        fadeEffect: {
            crossFade: true,
        },
        autoHeight: true,
    });
    const scrollBlocks = document.querySelectorAll('.promo-landing__inner');

    scrollBlocks.forEach(block => {
        block.addEventListener('wheel', (e) => {
            const delta = e.deltaY;
            const contentHeight = block.scrollHeight;
            const viewHeight = block.offsetHeight;
            const scrollTop = block.scrollTop;

            // Если скроллим вниз и мы не в самом низу, ИЛИ скроллим вверх и мы не в самом верху
            if ((delta > 0 && scrollTop + viewHeight < contentHeight) || (delta < 0 && scrollTop > 0)) {
                e.stopPropagation(); // Останавливаем событие, чтобы страница не дергалась
            }
        }, {
            passive: false
        });
    });


    // Логика табов
    const tabs = document.querySelectorAll(".tabs__tab");

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            // Убираем активный класс со всех табов
            tabs.forEach((t) => {
                t.classList.remove("tabs__tab--active");
                t.setAttribute("aria-selected", "false");
            });

            // Добавляем активный класс нажатому табу
            tab.classList.add("tabs__tab--active");
            tab.setAttribute("aria-selected", "true");

            // Получаем значение data-tab
            const tabValue = tab.getAttribute("data-tab");

            // Переключаем слайд
            const targetSlideIndex = Array.from(promoSlider.slides).findIndex(
                (slide) => slide.getAttribute("data-slide") === tabValue,
            );

            if (targetSlideIndex !== -1) {
                promoSlider.slideTo(targetSlideIndex);
            }
        });
    });

    // Синхронизация: если слайд меняется, обновляем табы
    promoSlider.on("slideChange", () => {
        const activeIndex = promoSlider.activeIndex;
        const activeSlide = promoSlider.slides[activeIndex];
        const slideValue = activeSlide.getAttribute("data-slide");

        tabs.forEach((tab) => {
            tab.classList.remove("tabs__tab--active");
            tab.setAttribute("aria-selected", "false");

            if (tab.getAttribute("data-tab") === slideValue) {
                tab.classList.add("tabs__tab--active");
                tab.setAttribute("aria-selected", "true");
            }
        });
    });

    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    const tl = gsap.timeline({
        defaults: {
            duration: 1.5,
            ease: "power3.out",
        },
    });

    tl.from(".hero__image-block:first-child", {
            y: 300,
            opacity: 0,
        })
        .from(
            ".hero__image-block:last-child", {
                y: -300,
                opacity: 0,
            },
            "<",
        )

        // 2. Плавное появление белого фона самого блока
        // Убираем прозрачность у всего контейнера
        .from(
            ".hero__info", {
                opacity: 0,
                y: 20,
                duration: 1,
            },
            "-=1",
        ) // Начинается чуть раньше окончания анимации картинок

        // 3. Появление текста внутри по очереди (Stagger)
        .from(
            ".hero__info > *", {
                opacity: 0,
                y: 20,
                duration: 0.8,
                stagger: 0.15,
            },
            "-=0.5",
        ); // Накладывается на появление фона

    // карточки Особенности

    // gsap.from(".features__card", {
    //     scrollTrigger: {
    //         trigger: ".features__grid",
    //         start: "top 80%",
    //         toggleActions: "play reverse play reverse",
    //     },
    //     opacity: 0,
    //     y: 30,
    //     duration: 1.5,
    //     stagger: 0.4,
    //     ease: "power2.out"
    // });

    // --- Код для анимации стандартного заголовка (section-header) ---
    gsap.utils.toArray(".section-header").forEach((header) => {
        // Анимация kicker
        const kicker = header.querySelector(".section-header__kicker");
        // Анимация заголовка
        const title = header.querySelector(".section-header__title");

        const headerTl = gsap.timeline({
            scrollTrigger: {
                trigger: header,
                toggleActions: "play none none reverse",
                start: "top 80%",
                end: "top center",
                // markers: true
            },
        });

        if (kicker) {
            headerTl.from(
                kicker, {
                    duration: 0.8,
                    opacity: 0,
                    y: 20,
                    force3D: false,
                    ease: "power2.out",
                },
                0,
            );
        }

        if (title) {
            headerTl.from(
                title, {
                    duration: 0.8,
                    opacity: 0,
                    y: 30,
                    force3D: false,
                    ease: "power2.out",
                },
                "-=0.5",
            );
        }
    });
    // gsap.utils.toArray('.gsap-block').forEach(block => {
    //     gsap.from(block, {
    //         scrollTrigger: {
    //             trigger: block,
    //             toggleActions: "play none none reverse",
    //             start: "top 75%", // чуть позже заголовка для плавности потока
    //         },
    //         duration: 0.8,
    //         opacity: 0,
    //         y: 40,
    //         ease: "power2.out",
    //         force3D: true, // принудительно используем видеокарту
    //         clearProps: "all"

    //     });
    // });

    // --- Анимация футера ---
    gsap.utils.toArray(".footer__column").forEach((col, i) => {
        gsap.from(col, {
            duration: 0.8,
            opacity: 0,
            y: 30,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".footer",
                start: "top 95%",
            },
            delay: i * 0.3,
        });
    });

    // Анимация копирайта и политики
    gsap.from(".footer__bottom", {
        duration: 1,
        opacity: 0,
        y: 40,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".footer__bottom",
            start: "top 98%",
        },
    });

    // mask phone
    $(function () {
        $("#phone").mask("+7 (999) 999 - 99 - 99");
    });
});
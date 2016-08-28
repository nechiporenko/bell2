// Application Scripts:

// Переключатель валют
// Покажем - спрячем форму поиска
// Десктоп меню (выпадайки)
// Мобильное меню
// Кнопка скролла страницы
// Загрузка изображений при скролле
// Модальное окно
// HERO слайдер
// Вкладки
// Рейтинг (некликабельный)
// Рейтинг (кликабельный)
// Слайдеры предложений
// Слайдер флагов стран
// Слайдер отзывов
// Галерея изображений (страница тура)
// Маска для телефонного номера
// Покажем скрытый SEO текст при клике на ссылку
// Стилизуем таблицы в описании тура
// Проверка полей цены для фильтра туров
// Хелперы
// Если браузер не знает о плейсхолдерах в формах

jQuery(document).ready(function ($) {
    $('body').append('<div id="overlay" class="overlay"></div>');//оверлей - будем использовать при открытии модального окна и мобильного меню

    //
    // Переключатель валют
    //---------------------------------------------------------------------------------------
    (function () {
        var $curr = $('.js-curr'),
            $menu = $curr.find('.h-curr__list'),
            $btn = $curr.find('.h-curr__btn--current'),
            $body = $('body'),
            method = {};

        method.show = function () {
            $btn.addClass('active');
            $menu.fadeIn(400);
            method.hideAlt();
        };
        method.hide = function () {
            $btn.removeClass('active');
            $menu.hide();
            $body.unbind('click', method.hide);
        };
        method.hideAlt = function () {//скроем список валют по клику в документе
            $curr.on('mouseleave', function () {
                $body.bind('click', method.hide);
            }).on('mouseenter', function () {
                $body.unbind('click', method.hide);
            });
        };
        $curr.on('click', '.h-curr__btn--current', function (e) {
            e.preventDefault();
            if ($(this).hasClass('active')) {
                method.hide();
            } else {
                method.show();
            };
        });
    })();

    //
    // Покажем - спрячем форму поиска
    //---------------------------------------------------------------------------------------
    (function () {
        var $action=$('.js-action'),
            $search__btn = $action.find('.h-btn--search'),
            $form = $action.find('.h-search'),
            $body = $('body'),
            method = {};

        method.show = function () {
            $form.addClass('active');
            method.changeIcon('close');
            method.closeOnClick();
        };
        method.hide = function () {
            $form.removeClass('active');
            method.changeIcon('search');
            $body.unbind('click', method.hide);
        };

        method.changeIcon = function (event) {//поменяем иконку на кнопке в хидере
            if (event === 'close') {
                $search__btn.find('i[class^="icon-"]').removeAttr('class').addClass('icon-close');
            } else {
                if (event === 'search') {
                    $search__btn.find('i[class^="icon-"]').removeAttr('class').addClass('icon-search');
                }
            }
        };

        method.closeOnClick = function () {//доп.метод закрытия формы
            $action.on('mouseleave', function () {
                $body.bind('click', method.hide);
            }).on('mouseenter', function () {
                $body.unbind('click', method.hide);
            });
        }

        $action.on('click', '.h-btn--search', function (e) {
            e.preventDefault();
            if (!$form.hasClass('active')) {
                method.show();
            } else {
                method.hide();
            }
        });
    })();

    //
    // Десктоп меню (выпадайки)
    //---------------------------------------------------------------------------------------
    (function () {
        var $menu = $('.js-menu li');
        $menu.has('ul').children('a').addClass('has-menu');

        $menu.on({
            mouseenter: function () {
                $(this).find('ul:first').stop(true, true).fadeIn('fast');
                $(this).find('a:first').addClass('hover');
            },
            mouseleave: function () {
                $(this).find('ul').stop(true, true).fadeOut('slow');
                $(this).find('a:first').removeClass('hover');
            }
        });
    })();
    

    //
    // Мобильное меню
    //---------------------------------------------------------------------------------------
    (function () {
        var $btn = $('.js-mmenu-toggle'),
            $menu = $('.js-mmenu'),
            $overlay = $('#overlay'),
            $html = $('html'),
            method = {};

        method.hideMenu = function () {
            $btn.removeClass('active');
            $menu.removeClass('active');
            $html.css('overflow', 'auto');
            $overlay.unbind('click', method.hideMenu).hide();
            method.hideAllSubmenu();
        };

        method.showMenu = function () {
            $btn.addClass('active');
            $menu.addClass('active');
            $html.css('overflow', 'hidden');
            $overlay.show().bind('click', method.hideMenu);
        };

        method.showSubmenu = function (el) {
            el.find('.m-menu__toggle').addClass('active');
            el.find('.m-submenu').slideDown(400);
        };

        method.hideSubmenu = function (el) {
            el.find('.m-menu__toggle').removeClass('active');
            el.find('.m-submenu').slideUp(400);
        };

        method.hideAllSubmenu = function () {
            $menu.find('.m-menu__toggle').removeClass('active');
            $menu.find('.m-submenu').slideUp(400);
        };


        $menu.find('.m-menu__item').has('ul').addClass('has-menu').append('<button type="button" class="m-menu__toggle"><i class="icon-down"></i></button>');

        $('.js-action').on('click', '.js-mmenu-toggle', function () {//покажем - спрячем панель моб.меню
            if ($(this).hasClass('active')) {
                method.hideMenu();
            } else {
                method.showMenu();
            };
        });

        $menu.on('click', '.m-menu__label', method.hideMenu); //закроем панель по клику по заголовку

        $menu.on('click', '.m-menu__toggle', function () {
            var $el = $(this).parent('li');
            if ($(this).hasClass('active')) {
                method.hideSubmenu($el);
            } else {
                method.hideAllSubmenu();
                method.showSubmenu($el);
            };
        });
    })();

    //
    // Кнопка скролла страницы
    //---------------------------------------------------------------------------------------
    (function () {
        var $scroller = $('<button type="button" class="scroll-up-btn"><i class="icon-up"></i></button>');
        $('body').append($scroller);
        $(window).on('scroll', function () {
            if ($(this).scrollTop() > 300) {
                $scroller.show();
            } else {
                $scroller.hide();
            }
        });
        $scroller.on('click', function () {
            $('html, body').animate({ scrollTop: 0 }, 800);
            return false;
        });
    })();

    //
    // Загрузка изображений при скролле
    //---------------------------------------------------------------------------------------
    $('.js-lazyimg').unveil();

    //
    // Модальное окно
    //---------------------------------------------------------------------------------------
    var showModal = (function (link) {
        var
        method = {},
        $modal,
        $window = $(window),
        $overlay = $('#overlay'),
        $close;

        $close = $('<button type="button" class="modal__close"><i class="icon-close"></i></button>'); //иконка закрыть


        $close.on('click', function (e) {
            e.preventDefault();
            method.close();
        });

        // центрируем окно
        method.center = function () {
            var top, left;
            top = Math.max($window.height() - $modal.outerHeight(), 0) / 2;
            left = Math.max($window.width() - $modal.outerWidth(), 0) / 2;

            $modal.css({
                top: top + $window.scrollTop(),
                left: left + $window.scrollLeft()
            });
        };


        // открываем
        method.open = function (link) {
            $modal = $(link);
            $modal.append($close);
            method.center();
            $window.bind('resize.modal', method.center);
            $modal.show();
            $overlay.show().bind('click', method.close);
        };

        // закрываем
        method.close = function () {
            $modal.hide();
            $overlay.hide().unbind('click', method.close);
            $window.unbind('resize.modal');
        };

        // клик по кнопке с атрибутом data-modal - открываем модальное окно
        $('[data-modal]').on('click', function (e) {//передаем айди модального окна
            e.preventDefault();
            var link = $(this).data('modal');
            if (link) { showModal.open(link); }
        });

        return method;
    }());


    //
    // HERO слайдер
    //---------------------------------------------------------------------------------------
    function initHeroSlider() {
        var $slider = $('.js-hero'),
            method = {};

        method.addImages = function () {//добавим изображения в слайдер (чтобы ускорить загрузку страницы - делаем это сейчас)
            var count = $slider.children('li').length;
            for (var i = 1; i < count; i++) {//для первого элемента вывели изображенния скриптом на странице, начинаем цикл со второго
                var $el = $slider.children('li').eq(i),
                    $elXS = $el.find('.b-hero__bg--xs'),
                    $elXL = $el.find('.b-hero__bg--xl');
                $elXS.css('background-image', 'url(' + heroSlider.imgXS[i] + ')');
                $elXL.css('background-image', 'url(' + heroSlider.imgXL[i] + ')');
            };
        };

        $slider.bxSlider({
            mode: 'fade',
            pager: true,
            pagerSelector:'.b-hero__pager .g-container',
            controls: false,
            auto: true,
            pause: 12000,
            autoHover: true,
            onSliderLoad: function () {
                method.addImages();
                var $pager = $('.b-hero__pager');
                $pager.on({//фиксим авто-стоп слайдера при наведении на пейджер
                    mouseenter: function () {
                        $slider.stopAuto();
                    },
                    mouseleave: function () {
                        $slider.startAuto();
                    }
                });
            }
        });
    };
    if ($('.js-hero').length) {
        initHeroSlider();
    };

    //
    // Вкладки
    //---------------------------------------------------------------------------------------
    function initTabs() {
        var $list = $('.js-tabs'),
            $content = $('.js-tabs-content > div'),
            method = {};

        method.init = (function () {//спрячем "лишние" вкладки
            $content.hide()
            $list.each(function () {
                var current = $(this).find('li.current');
                if (current.length < 1) { $(this).find('li:first').addClass('current'); }
                current = $(this).find('li.current a').attr('href');
                $(current).show();
            });
        })();

        method.showImages = function (tab) {//если во вкладке есть lazy-load картинки - покажем их принудительно
            tab.find('.js-lazyimg').trigger('unveil');
        };

        method.show = function (el) {//обработка клика по вкладке
            var $tabs = el.parents('ul').find('li');
            var tab_next = el.attr('href');
            var tab_current = $tabs.filter('.current').find('a').attr('href');
            $(tab_current).hide();
            $tabs.removeClass('current');
            el.parent().addClass('current');
            $(tab_next).fadeIn();
            history.pushState(null, null, window.location.search + el.attr('href'));
            method.showImages($(tab_next)); //если есть lazy-load изображения
        };

        $list.on('click', 'a[href^="#"]', function (e) {//клик по вкладке
            e.preventDefault();
            method.show($(this));
        });

        method.parsing = (function () {//парсим линк и открываем нужную вкладку при загрузке
            var hash = window.location.hash;
            if (hash) {
                var selectedTab = $list.find('a[href="' + hash + '"]');
                selectedTab.trigger('click', true);
                $('html, body').animate({ scrollTop: 0 }, 800);//после парсинга, промотаем в начало страницы
            };
        })();
    };
    if ($('.js-tabs').length) { initTabs(); };

    //
    // Рейтинг (некликабельный)
    //---------------------------------------------------------------------------------------
    function showRating() {
        var $rating = $('.js-rating'),
            stars = [
                '<i class="icon-star-empty"></i><i class="icon-star-empty"></i><i class="icon-star-empty"></i><i class="icon-star-empty"></i><i class="icon-star-empty"></i>',
                '<i class="icon-star"></i><i class="icon-star-empty"></i><i class="icon-star-empty"></i><i class="icon-star-empty"></i><i class="icon-star-empty"></i>',
                '<i class="icon-star"></i><i class="icon-star"></i><i class="icon-star-empty"></i><i class="icon-star-empty"></i><i class="icon-star-empty"></i>',
                '<i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star-empty"></i><i class="icon-star-empty"></i>',
                '<i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star-empty"></i>',
                '<i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i>'
            ];
        $rating.each(function () {
            var $el = $(this),
                rating = +$el.data('rating');

            if (rating >= 0 || rating <= 5) {
                $el.html(stars[rating]);
            } else {
                $el.html(stars[0]);
            };
            $el.removeClass('js-rating');
        });
    };
    if ($('.js-rating').length) {
        showRating();
    };

    //
    // Рейтинг (кликабельный)
    //---------------------------------------------------------------------------------------
    $('.js-stars').barrating({
        theme: 'fontawesome-stars',
        showSelectedRating: true,
    });

    //
    // Слайдеры предложений
    //---------------------------------------------------------------------------------------
    function initSlider(slider) {
        var $slider = slider,
            rtime, //переменные для пересчета ресайза окна с задержкой delta - будем показывать разное кол-во слайдов на разных разрешениях
            timeout = false,
            delta = 200,
            isImagesLoaded = false, //при загрузке слайдера покажем 4 первые фотки, остальные - после первой прокрутки слайдера
            method = {};

        method.getSliderSettings = function () {
            var setting,
                    settings1 = {
                        maxSlides: 1,
                        minSlides: 1,
                    },
                    settings2 = {
                        maxSlides: 2,
                        minSlides: 2,
                    },
                    settings3 = {
                        maxSlides: 3,
                        minSlides: 3,
                    },
                    settings4 = {
                        maxSlides: 4,
                        minSlides: 4,
                    },
                    common = {
                        slideWidth: 300,
                        moveSlides: 1,
                        slideMargin: 0,
                        auto: false,
                        infiniteLoop: false,
                        hideControlOnEnd: true,
                        useCSS: false,
                        nextText: '<i class="icon-right"></i>',
                        prevText: '<i class="icon-left"></i>',
                        nextSelector: $slider.parent().find('.b-slider__next'),
                        prevSelector: $slider.parent().find('.b-slider__prev'),
                        pager: false,
                        onSlideBefore: function () {//если картинки не загружены - загружаем
                            if (!isImagesLoaded) {
                                method.showAllImages();
                            };
                        }
                    },
                    winW = $.viewportW(); //ширина окна

            if (winW < 640) {
                setting = $.extend(settings1, common);
            };
            if (winW >= 640 && winW < 768) {
                setting = $.extend(settings2, common);
            };
            if (winW >= 768 && winW < 992) {
                setting = $.extend(settings3, common);
            };
            if (winW >= 992 && winW < 1200) {
                setting = $.extend(settings4, common);
            };
            if (winW >= 1200) {
                setting = $.extend(settings3, common);
            };
            return setting;
        };

        method.reloadSliderSettings = function () {
            method.destroy(); //без этого отваливаются стрелки навигации
            $slider.reloadSlider($.extend(method.getSliderSettings(), { startSlide: $slider.getCurrentSlide() }));
        };


        method.endResize = function () {
            if (new Date() - rtime < delta) {
                setTimeout(method.endResize, delta);
            } else {
                timeout = false;
                //ресайз окончен - пересчитываем
                method.reloadSliderSettings();
            }
        };

        method.startResize = function () {
            rtime = new Date();
            if (timeout === false) {
                timeout = true;
                setTimeout(method.endResize, delta);
            }
        };

        method.show4images = function () {//при загрузке слайдера, сперва загрузим первые 4 картинки
            for (var i = 0; i < 4; i++) {
                var $img = $slider.children('li').eq(i).find('.js-slider-img');
                if ($img.length) {
                    loadSliderImage($img);
                };
            };
        };

        method.showAllImages = function () {//дозагрузим остальные картинки в слайдер после первой прокрутки
            isImagesLoaded = true;
            $slider.children('li').each(function () {
                var $img = $(this).find('.js-slider-img');
                if ($img.length) {
                    loadSliderImage($img);
                };
            });
        };

        method.destroy = function () {
            $slider.destroySlider();
        };

        //запускаем
        $slider.bxSlider(method.getSliderSettings());//запускаем слайдер
        method.show4images();//загрузили видимые картинки
        $(window).bind('resize', method.startResize);//пересчитываем кол-во видимых элементов при ресайзе окна с задержкой .2с
    };

    $('.js-slider').each(function () {
        if ($(this).length) {
            initSlider($(this));
        };
    });

    //
    // Слайдер флагов стран
    //---------------------------------------------------------------------------------------
    function initFlagSlider() {
        var $slider = $('.js-flags-slider'),
            isImagesLoaded = false, //при загрузке слайдера покажем 9 флагов (первый блок слайдера), остальные - после первой прокрутки
            method = {};

        method.show9images = function () {//при загрузке слайдера, покажем первые 9 флагов
            for (var i = 0; i < 9; i++) {
                var $img = $slider.find('.b-flags__link').eq(i).find('.js-slider-img');
                if ($img.length) {
                    loadSliderImage($img);
                };
            };
        };

        method.showAllImages = function () {//дозагрузим остальные флаги в слайдер после первой прокрутки
            isImagesLoaded = true;
            $slider.find('.b-flags__link').each(function () {
                var $img = $(this).find('.js-slider-img');
                if ($img.length) {
                    loadSliderImage($img);
                };
            });
        };

        $slider.bxSlider({
            mode: 'vertical',
            auto: false,
            infiniteLoop: false,
            hideControlOnEnd: true,
            useCSS: false,
            nextText: '<i class="icon-right"></i>',
            prevText: '<i class="icon-left"></i>',
            nextSelector: $slider.parent().find('.b-flags__next'),
            prevSelector: $slider.parent().find('.b-flags__prev'),
            pager: false,
            onSlideBefore: function () {//если картинки не загружены - загружаем
                if (!isImagesLoaded) {
                    method.showAllImages();
                };
            }
        });

        method.show9images();//загрузим флаги первого блока
    };
    if ($('.js-flags-slider').length) {
        initFlagSlider();
    };

    //
    // Слайдер новостей
    //---------------------------------------------------------------------------------------
    function initNewsSlider() {
        var $slider = $('.js-news-slider'),
            isImagesLoaded = false, //при загрузке слайдера покажем превые 5 картинок, остальные - после первой прокрутки
            method = {};

        method.show6images = function () {//при загрузке слайдера, покажем первые 6 картинок
            for (var i = 0; i < 6; i++) {
                var $img = $slider.children('li').eq(i).find('.js-slider-img');
                if ($img.length) {
                    loadSliderImage($img);
                };
            };
        };

        method.showAllImages = function () {//дозагрузим остальные картинки в слайдер после первой прокрутки
            isImagesLoaded = true;
            $slider.children('li').each(function () {
                var $img = $(this).find('.js-slider-img');
                if ($img.length) {
                    loadSliderImage($img);
                };
            });
        };

        $slider.bxSlider({
            mode: 'vertical',
            auto: false,
            infiniteLoop: false,
            hideControlOnEnd: true,
            useCSS: false,
            nextText: '<i class="icon-right"></i>',
            prevText: '<i class="icon-left"></i>',
            nextSelector: $slider.parent().find('.b-news__next'),
            prevSelector: $slider.parent().find('.b-news__prev'),
            pager: false,
            minSlides: 6,
            maxSlides: 6,
            moveSlides: 1,
            onSlideBefore: function () {//если картинки не загружены - загружаем
                if (!isImagesLoaded) {
                    method.showAllImages();
                };
            }
        });

        method.show6images();//загрузим первые 6 картинок
    };
    if ($('.js-news-slider').length) {
        initNewsSlider();
    };

    //
    // Слайдер отзывов
    //---------------------------------------------------------------------------------------
    function initReviewSlider() {
        var $slider = $('.js-review-slider');
        $slider.bxSlider({
            mode: 'vertical',
            auto: false,
            infiniteLoop: false,
            hideControlOnEnd: true,
            useCSS: false,
            nextText: '<i class="icon-right"></i>',
            prevText: '<i class="icon-left"></i>',
            nextSelector: $slider.parents('.b-review').find('.b-review__next'),
            prevSelector: $slider.parents('.b-review').find('.b-review__prev'),
            pager: false,
            minSlides: 2,
            maxSlides: 2,
            moveSlides: 1
        });
    };
    if ($('.js-review-slider').length) {
        initReviewSlider();
    };

    //
    // Галерея изображений (страница тура)
    //---------------------------------------------------------------------------------------
    function initGallery() {
        var $gallery = $('.js-gallery'),
            isImagesLoaded = false,
            $tabs = $gallery.parents('.b-tabs').find('.js-tabs'),
            method = {};

        method.initSlider = function () {
            $gallery.bxSlider({
                slideWidth: 240,
                maxSlides: 4,
                minSlides: 4,
                moveSlides: 1,
                slideMargin: 10,
                auto: false,
                infiniteLoop: false,
                hideControlOnEnd: true,
                useCSS: false,
                nextText: '<i class="icon-arrow-right"></i>',
                prevText: '<i class="icon-arrow-left"></i>',
                nextSelector: $gallery.parent().find('.b-gallery__next'),
                prevSelector: $gallery.parent().find('.b-gallery__prev'),
                pager: false,
                onSlideBefore: function () {//если картинки не загружены - загружаем
                    if (!isImagesLoaded) {
                        method.showAllImages();
                    };
                }
            });
        };

        method.show4images = function () {//при загрузке слайдера, сперва загрузим первые 4 картинки
            for (var i = 0; i < 4; i++) {
                var $img = $gallery.children('li').eq(i).find('.js-gallery-img');
                if ($img.length) {
                    loadSliderImage($img);
                };
            };
        };

        method.showAllImages = function () {//дозагрузим остальные картинки в слайдер после первой прокрутки
            isImagesLoaded = true;
            $gallery.children('li').each(function () {
                var $img = $(this).find('.js-gallery-img');
                if ($img.length) {
                    loadSliderImage($img);
                };
            });
        };

        method.initLightBox = function () {
            $gallery.find('.b-gallery__link').simpleLightbox({
                navText: ['<i class="icon-left"></i>', '<i class="icon-right"></i>'],
                captions: true,
                captionSelector: 'self',
                captionType: 'data',
                captionsData: 'caption',
                close: true,
                closeText: '<i class="icon-close"></i>',
                showCounter: true,
                disableScroll: false
            });
        };

        method.reloadGallery = function () {
            $gallery.reloadSlider();
        };

        //запускаем
        method.show4images();//показали первые 4 картинки
        method.initSlider();//включили слайдер
        method.initLightBox();//подключили Лайтбокс

        $tabs.on('click', 'a', method.reloadGallery);
    };
    if ($('.js-gallery').length) {//при переключении вкладок перезагрузим слайдер, иначе он будет невидим
        initGallery();
    };

    //
    // Маска для телефонного номера
    //---------------------------------------------------------------------------------------
    $('.js-phone-input').mask('+7 (999) 999 - 99 - 99');

    //
    // Стилизация Select
    //---------------------------------------------------------------------------------------
    $('.js-select').each(function () {
        $(this).selectric({
            disableOnMobile: false,
            responsive: true
        });
    });
    

    //
    // Покажем скрытый SEO текст при клике на ссылку
    //---------------------------------------------------------------------------------------
    $('.js-read-more').one('click', function (e) {
        e.preventDefault();
        var target = $(this).attr('href');
        $(target).removeClass('g-hidden');
        $(this).hide();
    });

    //
    // Стилизуем таблицы в описании тура
    //---------------------------------------------------------------------------------------
    $('.page__article, .b-tabs__content').find('table').each(function () {
        var $el = $(this);
        $el.addClass('g-table g-table--bordered');
        if ($el.parent('div').hasClass('g-table-wrap')) {//если есть обертка
            return;
        } else {//если нет "обертки"
            $el.wrap('<div class="g-table-wrap"></div>');
        };
    });

    //
    // Проверка полей цены для фильтра туров
    //---------------------------------------------------------------------------------------
    function checkPriceInputs() {
        var $price = $('.js-price'),//поля для проверки
            $priceMin = $price.filter('.js-price--min'),//поле мин.цена
            $priceMax = $price.filter('.js-price--max'),//поле макс.цена
            min = +$priceMin.val(), //минимальное значение поля
            max = +$priceMax.val(); //максимальное значение поля

        $price.on('keydown', function (e) {//разрешим вводить только цифры в поля
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                (e.keyCode >= 35 && e.keyCode <= 40)) {
                return;
            }
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });
        

        $priceMin.on('blur', function () {//проверяем поле мин.цены после потери фокуса
            var num = Math.round($(this).val()), //округлили до целого
                priceMax = +$priceMax.val(); //текущее значение макс.цены
            if (isNaN(num) || num < min || num > max) {
                num = min;
            };            
            if (num > priceMax) {
                num = priceMax;
            };

            $(this).val(num);
        });

        $priceMax.on('blur', function () {//проверяем поле макс.цены после потери фокуса
            var num = Math.round($(this).val()),
                priceMin = +$priceMin.val();
            if (isNaN(num) || num < min || num > max) {
                num = max;
            };
            if (num < priceMin) {
                num = priceMin;
            };
            $(this).val(num);
        });
    }
    if ($('.js-price').length) {
        checkPriceInputs();
    };


    //
    // Хелперы
    //---------------------------------------------------------------------------------------
    function loadSliderImage(el) {//загрузим изображение в слайдер
        var source = el.data('img');
        if (source != '') {
            el.attr('src', source);
            el.removeClass('js-load-img');
        };
    };

    //
    // Если браузер не знает о плейсхолдерах в формах
    //---------------------------------------------------------------------------------------
    if ($('html').hasClass('no-placeholder')) {
        /* Placeholders.js v4.0.1 */
        !function (a) { "use strict"; function b() { } function c() { try { return document.activeElement } catch (a) { } } function d(a, b) { for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return !0; return !1 } function e(a, b, c) { return a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent ? a.attachEvent("on" + b, c) : void 0 } function f(a, b) { var c; a.createTextRange ? (c = a.createTextRange(), c.move("character", b), c.select()) : a.selectionStart && (a.focus(), a.setSelectionRange(b, b)) } function g(a, b) { try { return a.type = b, !0 } catch (c) { return !1 } } function h(a, b) { if (a && a.getAttribute(B)) b(a); else for (var c, d = a ? a.getElementsByTagName("input") : N, e = a ? a.getElementsByTagName("textarea") : O, f = d ? d.length : 0, g = e ? e.length : 0, h = f + g, i = 0; h > i; i++) c = f > i ? d[i] : e[i - f], b(c) } function i(a) { h(a, k) } function j(a) { h(a, l) } function k(a, b) { var c = !!b && a.value !== b, d = a.value === a.getAttribute(B); if ((c || d) && "true" === a.getAttribute(C)) { a.removeAttribute(C), a.value = a.value.replace(a.getAttribute(B), ""), a.className = a.className.replace(A, ""); var e = a.getAttribute(I); parseInt(e, 10) >= 0 && (a.setAttribute("maxLength", e), a.removeAttribute(I)); var f = a.getAttribute(D); return f && (a.type = f), !0 } return !1 } function l(a) { var b = a.getAttribute(B); if ("" === a.value && b) { a.setAttribute(C, "true"), a.value = b, a.className += " " + z; var c = a.getAttribute(I); c || (a.setAttribute(I, a.maxLength), a.removeAttribute("maxLength")); var d = a.getAttribute(D); return d ? a.type = "text" : "password" === a.type && g(a, "text") && a.setAttribute(D, "password"), !0 } return !1 } function m(a) { return function () { P && a.value === a.getAttribute(B) && "true" === a.getAttribute(C) ? f(a, 0) : k(a) } } function n(a) { return function () { l(a) } } function o(a) { return function () { i(a) } } function p(a) { return function (b) { return v = a.value, "true" === a.getAttribute(C) && v === a.getAttribute(B) && d(x, b.keyCode) ? (b.preventDefault && b.preventDefault(), !1) : void 0 } } function q(a) { return function () { k(a, v), "" === a.value && (a.blur(), f(a, 0)) } } function r(a) { return function () { a === c() && a.value === a.getAttribute(B) && "true" === a.getAttribute(C) && f(a, 0) } } function s(a) { var b = a.form; b && "string" == typeof b && (b = document.getElementById(b), b.getAttribute(E) || (e(b, "submit", o(b)), b.setAttribute(E, "true"))), e(a, "focus", m(a)), e(a, "blur", n(a)), P && (e(a, "keydown", p(a)), e(a, "keyup", q(a)), e(a, "click", r(a))), a.setAttribute(F, "true"), a.setAttribute(B, T), (P || a !== c()) && l(a) } var t = document.createElement("input"), u = void 0 !== t.placeholder; if (a.Placeholders = { nativeSupport: u, disable: u ? b : i, enable: u ? b : j }, !u) { var v, w = ["text", "search", "url", "tel", "email", "password", "number", "textarea"], x = [27, 33, 34, 35, 36, 37, 38, 39, 40, 8, 46], y = "#ccc", z = "placeholdersjs", A = new RegExp("(?:^|\\s)" + z + "(?!\\S)"), B = "data-placeholder-value", C = "data-placeholder-active", D = "data-placeholder-type", E = "data-placeholder-submit", F = "data-placeholder-bound", G = "data-placeholder-focus", H = "data-placeholder-live", I = "data-placeholder-maxlength", J = 100, K = document.getElementsByTagName("head")[0], L = document.documentElement, M = a.Placeholders, N = document.getElementsByTagName("input"), O = document.getElementsByTagName("textarea"), P = "false" === L.getAttribute(G), Q = "false" !== L.getAttribute(H), R = document.createElement("style"); R.type = "text/css"; var S = document.createTextNode("." + z + " {color:" + y + ";}"); R.styleSheet ? R.styleSheet.cssText = S.nodeValue : R.appendChild(S), K.insertBefore(R, K.firstChild); for (var T, U, V = 0, W = N.length + O.length; W > V; V++) U = V < N.length ? N[V] : O[V - N.length], T = U.attributes.placeholder, T && (T = T.nodeValue, T && d(w, U.type) && s(U)); var X = setInterval(function () { for (var a = 0, b = N.length + O.length; b > a; a++) U = a < N.length ? N[a] : O[a - N.length], T = U.attributes.placeholder, T ? (T = T.nodeValue, T && d(w, U.type) && (U.getAttribute(F) || s(U), (T !== U.getAttribute(B) || "password" === U.type && !U.getAttribute(D)) && ("password" === U.type && !U.getAttribute(D) && g(U, "text") && U.setAttribute(D, "password"), U.value === U.getAttribute(B) && (U.value = T), U.setAttribute(B, T)))) : U.getAttribute(C) && (k(U), U.removeAttribute(B)); Q || clearInterval(X) }, J); e(a, "beforeunload", function () { M.disable() }) } }(this);
    };
});

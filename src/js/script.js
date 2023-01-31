$(document).ready(function() {
    $('.carousel__inner').slick({
        adaptiveHeight: true,
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/prev_arrow.svg" alt="prev arrow"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/next_arrow.svg" alt="next arrow"></button>',
        initialSlide: 1,
        responsive: [
            {
              breakpoint: 768,
              settings: {
                dots: true,
                arrows: false
              }
            }
        ]
    });

    $('.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active').closest('div.container').find('.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).click(function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal .modal__close').click(function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

    $('.button_mini').each(function(i) {
        $(this).click(function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    $('input[name=phone]').mask('+7 (999) 999-99-99');

    function validateForm(form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Будь ласка, введіть своє ім'я",
                phone: "Будь ласка, введіть свій номер телефону",
                email: {
                    required: "Будь ласка, введіть свою пошту",
                    email: "Неправильно введена електронна адреса"
                }
            }
        });
    }

    validateForm('#consultation-form');
    validateForm('#consultation form');
    validateForm('#order form');

    new WOW().init();

    $(document).scroll(function() {
        if($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn('slow');
        } else {
            $('.pageup').fadeOut('slow');
        }
    });

    $('a[href=#up]').click(function() {
        const _href = $(this).attr('href');
        $('html, body').animate({scrollTop: $(_href).offset().top}, 0);
        return false;
    });

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: 'mailer/smart.php',
            type: 'POST',
            data: $(this).serialize()
        }).done(function() {
            $(this).find('input').val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });
});
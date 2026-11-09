document.addEventListener('DOMContentLoaded', function () {
    // Gift card carousel: use the Swiper library already included in this repository.
    const giftSwiperElement = document.querySelector('.gift-swiper');
    if (giftSwiperElement && typeof Swiper !== 'undefined') {
        new Swiper(giftSwiperElement, {
            slidesPerView: 1.12,
            spaceBetween: 14,
            watchOverflow: true,
            navigation: {
                nextEl: '.gift-next',
                prevEl: '.gift-prev'
            },
            breakpoints: {
                600: {
                    slidesPerView: 2,
                    spaceBetween: 18
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 24
                }
            }
        });
    }

    // BRAND dropdown: click, outside click, and Escape-key handling.
    const brandNavItem = document.querySelector('.nav-item--brand');
    const brandTrigger = document.querySelector('.brand-trigger');

    if (brandNavItem && brandTrigger) {
        function setBrandDropdown(isOpen) {
            brandNavItem.classList.toggle('is-open', isOpen);
            brandTrigger.setAttribute('aria-expanded', String(isOpen));
        }

        brandTrigger.addEventListener('click', function (event) {
            event.stopPropagation();
            setBrandDropdown(!brandNavItem.classList.contains('is-open'));
        });

        document.addEventListener('click', function (event) {
            if (!brandNavItem.contains(event.target)) {
                setBrandDropdown(false);
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && brandNavItem.classList.contains('is-open')) {
                setBrandDropdown(false);
                brandTrigger.focus();
            }
        });

        brandNavItem.querySelectorAll('.brand-dropdown a').forEach(function (link) {
            link.addEventListener('click', function () {
                setBrandDropdown(false);
            });
        });
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const categoryButtons = document.querySelectorAll('.menu-category');
    const menuGroups = document.querySelectorAll('[data-menu-group]');

    categoryButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const selectedCategory = button.dataset.category;

            categoryButtons.forEach(function (item) {
                const isActive = item === button;
                item.classList.toggle('is-active', isActive);
                item.setAttribute('aria-pressed', String(isActive));
            });

            menuGroups.forEach(function (group) {
                const shouldShow = selectedCategory === 'all' || group.dataset.menuGroup === selectedCategory;
                group.hidden = !shouldShow;
            });

            if (selectedCategory !== 'all') {
                const selectedGroup = document.querySelector('[data-menu-group="' + selectedCategory + '"]');
                if (selectedGroup) {
                    selectedGroup.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
                }
            } else {
                document.querySelector('#menu-categories').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
            }
        });
    });


    // Menu card image <-> details toggle
    document.querySelectorAll('.menu-card--cube-latte, .menu-card--honey-cube').forEach(function (card) {
        const imageButton = card.querySelector('.menu-card-image-toggle');
        const detailsPanel = card.querySelector('.cube-latte-details');
        if (!imageButton || !detailsPanel) return;

        function showDetails(showDetails) {
            imageButton.hidden = showDetails;
            detailsPanel.hidden = !showDetails;
            imageButton.setAttribute('aria-expanded', String(showDetails));
            if (showDetails) {
                detailsPanel.focus();
            } else {
                imageButton.focus();
            }
        }

        imageButton.addEventListener('click', function () {
            showDetails(true);
        });
        detailsPanel.addEventListener('click', function () {
            showDetails(false);
        });
        detailsPanel.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                showDetails(false);
            }
        });
    });

    const brandTrigger = document.querySelector('.brand-trigger');
    const brandNavItem = document.querySelector('.nav-item--brand');
    if (brandTrigger && brandNavItem) {
        brandTrigger.addEventListener('click', function (event) {
            event.stopPropagation();
            const isOpen = brandNavItem.classList.toggle('is-open');
            brandTrigger.setAttribute('aria-expanded', String(isOpen));
        });
        document.addEventListener('click', function (event) {
            if (!brandNavItem.contains(event.target)) {
                brandNavItem.classList.remove('is-open');
                brandTrigger.setAttribute('aria-expanded', 'false');
            }
        });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                brandNavItem.classList.remove('is-open');
                brandTrigger.setAttribute('aria-expanded', 'false');
                brandTrigger.focus();
            }
        });
    }
});
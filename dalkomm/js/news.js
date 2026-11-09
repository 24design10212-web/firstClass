// NEWS 카테고리 필터와 검색을 함께 적용
document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.querySelector('.news-search');
    const searchInput = document.querySelector('#news-search-input');
    const filterButtons = Array.from(document.querySelectorAll('.news-filter'));
    const newsItems = Array.from(document.querySelectorAll('.news-featured, .news-archive-card'));
    const count = document.querySelector('#news-count');
    const emptyMessage = document.querySelector('#news-empty');

    if (!searchForm || !searchInput || !count || !emptyMessage || newsItems.length === 0) return;

    let activeCategory = 'all';

    function filterNews() {
        const keyword = searchInput.value.trim().toLocaleLowerCase('ko');
        let visibleCount = 0;

        newsItems.forEach(function (item) {
            const category = item.dataset.category || '';
            const searchableText = (item.dataset.search || '') + ' ' + item.textContent;
            const matchesCategory = activeCategory === 'all' || category === activeCategory;
            const matchesKeyword = searchableText.toLocaleLowerCase('ko').includes(keyword);
            const isVisible = matchesCategory && matchesKeyword;

            item.hidden = !isVisible;
            if (isVisible) visibleCount += 1;
        });

        count.textContent = visibleCount;
        emptyMessage.hidden = visibleCount !== 0;
    }

    filterButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            activeCategory = button.dataset.filter || 'all';

            filterButtons.forEach(function (filterButton) {
                const isActive = filterButton === button;
                filterButton.classList.toggle('is-active', isActive);
                filterButton.setAttribute('aria-pressed', String(isActive));
            });

            filterNews();
        });
    });

    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        filterNews();
    });

    searchInput.addEventListener('input', filterNews);

    // 검색어 초기화 시 전체 목록을 다시 표시
    searchInput.addEventListener('search', filterNews);
});

// 메인페이지와 같은 BRAND 드롭다운 동작
document.addEventListener('DOMContentLoaded', function () {
    const brandNavItem = document.querySelector('.nav-item--brand');
    const brandTrigger = document.querySelector('.brand-trigger');

    if (!brandNavItem || !brandTrigger) return;

    function setBrandDropdown(isOpen) {
        brandNavItem.classList.toggle('is-open', isOpen);
        brandTrigger.setAttribute('aria-expanded', String(isOpen));
    }

    brandTrigger.addEventListener('click', function (event) {
        event.stopPropagation();
        setBrandDropdown(!brandNavItem.classList.contains('is-open'));
    });

    document.addEventListener('click', function (event) {
        if (!brandNavItem.contains(event.target)) setBrandDropdown(false);
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
});

// 뉴스 제목과 요약을 기준으로 카드 검색
document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.querySelector('.news-search');
    const searchInput = document.querySelector('#news-search-input');
    const cards = Array.from(document.querySelectorAll('.news-archive-card'));
    const count = document.querySelector('#news-count');
    const emptyMessage = document.querySelector('#news-empty');

    if (!searchForm || !searchInput || !count || !emptyMessage) return;

    function filterNews() {
        const keyword = searchInput.value.trim().toLocaleLowerCase('ko');
        let visibleCount = 0;

        cards.forEach(function (card) {
            const searchableText = (card.dataset.search + ' ' + card.textContent).toLocaleLowerCase('ko');
            const isMatched = searchableText.includes(keyword);

            card.hidden = !isMatched;
            if (isMatched) visibleCount += 1;
        });

        count.textContent = visibleCount;
        emptyMessage.hidden = visibleCount !== 0;
    }

    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        filterNews();
    });

    searchInput.addEventListener('input', filterNews);
});

// 메인페이지와 같은 BRAND 드롭다운 동작
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
}

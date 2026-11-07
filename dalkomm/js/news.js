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
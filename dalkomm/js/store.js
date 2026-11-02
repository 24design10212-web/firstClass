/* STORE page search
 * 일반 지도 검색은 유사한 이름의 타 브랜드 매장을 함께 보여줄 수 있습니다.
 * 브랜드가 확인된 매장만 제공하는 달콤 공식 매장찾기를 검색 결과의 기준으로 사용합니다.
 */
(function () {
    const form = document.getElementById('store-search-form');
    const openMapLink = document.getElementById('store-open-map');
    const emptyState = document.getElementById('store-empty-state');
    const summary = document.getElementById('store-search-summary');
    const resultsCount = document.getElementById('store-results-count');
    const brandOptions = document.querySelectorAll('.store-brand-option');
    const officialStoreUrl = 'https://www.dalkomm.com/findStore';

    if (!form || !openMapLink || !emptyState || !summary) return;

    function applySearch() {
        const selected = form.querySelector('input[name="brand"]:checked');
        const brand = selected ? selected.value : 'all';
        const region = document.getElementById('store-region').value.trim();
        const keyword = document.getElementById('store-keyword').value.trim();

        // 공식 매장 데이터에 연결할 수 없는 외부 지도 검색은 사용하지 않습니다.
        // 공식 매장찾기에서 브랜드/지역/검색어를 다시 선택해 검증된 매장만 확인합니다.
        openMapLink.href = officialStoreUrl;
        openMapLink.textContent = '달콤 공식 매장찾기에서 검색 ↗';
        emptyState.hidden = true;
        summary.hidden = false;

        const brandLabel = brand === 'all' ? '전체(달콤·달콤.N)' : brand;
        const conditions = [
            '선택한 브랜드: ' + brandLabel,
            region ? '지역: ' + region : '지역: 전국',
            keyword ? '검색어: ' + keyword : '검색어: 없음'
        ];

        summary.innerHTML =
            '<strong>공식 매장 목록에서 확인해 주세요.</strong>' +
            '<p>' + conditions.map(escapeHtml).join('<br>') +
            '<br>타 브랜드 매장이 섞이지 않도록 달콤 공식 매장찾기로 연결합니다. 이동한 페이지에서 같은 검색 조건을 선택해 주세요.</p>';
        resultsCount.textContent = '공식 매장 기준';
    }

    function escapeHtml(value) {
        return value.replace(/[&<>"']/g, function (character) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            }[character];
        });
    }

    brandOptions.forEach(function (option) {
        const input = option.querySelector('input');
        if (!input) return;
        input.addEventListener('change', function () {
            brandOptions.forEach(function (item) {
                const itemInput = item.querySelector('input');
                item.classList.toggle('is-selected', !!itemInput && itemInput.checked);
            });
        });
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        applySearch();
    });

    const keywordInput = document.getElementById('store-keyword');
    if (keywordInput) {
        keywordInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                applySearch();
            }
        });
    }

    openMapLink.href = officialStoreUrl;
})();
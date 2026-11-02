/* STORE page search
 * 검색어가 비슷한 일반 매장이 섞이지 않도록 브랜드의 공식 영문 표기를 우선 검색합니다.
 * 지도 서비스의 검색 결과는 외부 서비스가 결정하므로 완전한 브랜드 검증에는 공식 매장 데이터/API가 필요합니다.
 */
(function () {
    const form = document.getElementById('store-search-form');
    const regionSelect = document.getElementById('store-region');
    const keywordInput = document.getElementById('store-keyword');
    const mapFrame = document.getElementById('store-map');
    const openMapLink = document.getElementById('store-open-map');
    const emptyState = document.getElementById('store-empty-state');
    const summary = document.getElementById('store-search-summary');
    const resultsCount = document.getElementById('store-results-count');
    const brandOptions = document.querySelectorAll('.store-brand-option');

    if (!form || !mapFrame || !openMapLink) return;

    function getSelectedBrand() {
        const selected = form.querySelector('input[name="brand"]:checked');
        return selected ? selected.value : 'all';
    }

    function buildSearchQuery() {
        const brand = getSelectedBrand();
        const region = regionSelect.value.trim();
        const keyword = keywordInput.value.trim();
        const parts = [];

        if (brand === 'all') {
            parts.push('"Dal.Komm"');
        } else {
            parts.push(brand === '달콤N' ? '"Dal.KommN"' : '"Dal.Komm"');
        }

        if (region) parts.push(region);
        if (keyword) parts.push(keyword);
        parts.push('대한민국');

        return parts.join(' ');
    }

    function applySearch() {
        const query = buildSearchQuery();
        const encodedQuery = encodeURIComponent(query);
        mapFrame.src = 'https://maps.google.com/maps?q=' + encodedQuery + '&output=embed';
        openMapLink.href = 'https://www.google.com/maps/search/?api=1&query=' + encodedQuery;

        emptyState.hidden = true;
        summary.hidden = false;
        summary.innerHTML = '<strong>지도에서 검색 결과를 확인하세요.</strong><p>검색 조건: ' +
            escapeHtml(query) +
            '<br>지도 안의 장소 정보를 선택하면 위치와 길찾기 정보를 확인할 수 있습니다.</p>';
        resultsCount.textContent = '지도 검색';
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
        input.addEventListener('change', function () {
            brandOptions.forEach(function (item) {
                item.classList.toggle('is-selected', item.querySelector('input').checked);
            });
        });
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        applySearch();
    });

    keywordInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            applySearch();
        }
    });
})();

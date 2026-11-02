/* STORE page search
 * 실제 매장 데이터/API가 저장소에 없으므로 임의의 매장명·주소·개수를 생성하지 않습니다.
 * 검색 조건을 지도 서비스의 검색어로 전달해 실제 지도 결과를 확인하도록 구성합니다.
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
            parts.push('달콤 카페');
        } else {
            parts.push(brand + ' 카페');
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

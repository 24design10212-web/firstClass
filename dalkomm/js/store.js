/* STORE page
 * 달콤 공식 매장찾기(https://www.dalkomm.com/findStore)에서 확인한 매장만 목록에 표시합니다.
 * 아래 데이터는 공식 페이지 검색 결과에서 확인된 항목이며, 전체 매장 DB/API를 의미하지 않습니다.
 * Google Maps iframe에는 선택한 공식 매장 1곳을 정확한 이름과 주소로 검색해 표시합니다.
 */
(function () {
    const form = document.getElementById('store-search-form');
    const regionSelect = document.getElementById('store-region');
    const keywordInput = document.getElementById('store-keyword');
    const mapFrame = document.getElementById('store-map');
    const openMapLink = document.getElementById('store-open-map');
    const summary = document.getElementById('store-search-summary');
    const resultsCount = document.getElementById('store-results-count');
    const brandOptions = document.querySelectorAll('.store-brand-option');

    if (!form || !mapFrame || !openMapLink || !summary) return;

    // 공식 매장찾기 페이지의 검색 결과에서 매장명·브랜드·주소를 확인한 데이터
    const officialStores = [
        { name: '대림점', brand: '달콤N', region: '서울', address: '서울특별시 영등포구 도림로38길 6-1, 1층 104호' },
        { name: '다날스퀘어점', brand: '달콤N', region: '서울', address: '서울특별시 성동구 연무장15길 11 SFACTORY 1-2층' },
        { name: '영종하늘도시점', brand: '달콤N', region: '인천', address: '인천광역시 영종구 하늘별빛로65번길 7-9, 1층 104호' },
        { name: '군산문화점', brand: '달콤N', region: '전북', address: '전북 군산시 문화동 1F' },
        { name: '압구정리앤스타점', brand: '달콤N', region: '서울', address: '서울 강남구 언주로174길27 1F' },
        { name: '신림녹두거리점', brand: '달콤N', region: '서울', address: '서울 관악구 대학길 18 1F' },
        { name: '부산송도케이블카점', brand: '달콤', region: '부산', address: '부산광역시 서구 송도해변로 171, 1층 105호(암남동, 송도해상케이블카 하부정류장)' }
    ];

    let selectedStore = null;

    function getSelectedBrand() {
        const selected = form.querySelector('input[name="brand"]:checked');
        return selected ? selected.value : 'all';
    }

    function getFilteredStores() {
        const brand = getSelectedBrand();
        const region = regionSelect.value.trim();
        const keyword = keywordInput.value.trim().toLocaleLowerCase();

        return officialStores.filter(function (store) {
            const matchesBrand = brand === 'all' || store.brand === brand;
            const matchesRegion = !region || store.region === region;
            const searchableText = (store.name + ' ' + store.address + ' ' + store.brand + ' ' + store.region).toLocaleLowerCase();
            const matchesKeyword = !keyword || searchableText.includes(keyword);
            return matchesBrand && matchesRegion && matchesKeyword;
        });
    }

    function showStoreOnMap(store) {
        selectedStore = store;
        const query = encodeURIComponent(store.name + ' ' + store.address);
        mapFrame.src = 'https://maps.google.com/maps?q=' + query + '&output=embed';
        openMapLink.href = 'https://www.google.com/maps/search/?api=1&query=' + query;
        const caption = document.querySelector('.store-map-caption');
        if (caption) caption.textContent = store.name + ' · ' + store.brand;
        renderStoreList(getFilteredStores());
    }

    function renderStoreList(stores) {
        resultsCount.textContent = stores.length + '개 매장';
        summary.hidden = false;

        if (!stores.length) {
            summary.innerHTML = '<p class="store-no-results">선택한 조건에 해당하는 공식 매장이 없습니다. 지역이나 검색어를 바꿔 보세요.</p>';
            return;
        }

        summary.innerHTML = '<p class="store-list-note">공식 매장찾기에서 확인한 매장입니다. 매장을 선택하면 해당 위치가 지도에 표시됩니다.</p>' +
            '<ul class="store-result-list">' + stores.map(function (store) {
                const isSelected = selectedStore && selectedStore.name === store.name && selectedStore.address === store.address;
                return '<li><button type="button" class="store-result-item' + (isSelected ? ' is-active' : '') + '" data-store-name="' + escapeHtml(store.name) + '">' +
                    '<span class="store-result-brand">' + escapeHtml(store.brand) + '</span>' +
                    '<strong>' + escapeHtml(store.name) + '</strong>' +
                    '<span class="store-result-address">' + escapeHtml(store.address) + '</span>' +
                    '</button></li>';
            }).join('') + '</ul>';

        summary.querySelectorAll('[data-store-name]').forEach(function (button) {
            button.addEventListener('click', function () {
                const store = stores.find(function (item) { return item.name === button.dataset.storeName; });
                if (store) showStoreOnMap(store);
            });
        });
    }

    function escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, function (character) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            }[character];
        });
    }

    function applySearch() {
        const stores = getFilteredStores();
        renderStoreList(stores);
        if (stores.length) {
            const currentStillVisible = selectedStore && stores.some(function (store) {
                return store.name === selectedStore.name && store.address === selectedStore.address;
            });
            showStoreOnMap(currentStillVisible ? selectedStore : stores[0]);
        } else {
            selectedStore = null;
            const caption = document.querySelector('.store-map-caption');
            if (caption) caption.textContent = '검색 결과 없음';
            summary.innerHTML = '<p class="store-no-results">선택한 조건에 해당하는 공식 매장이 없습니다. 지역이나 검색어를 바꿔 보세요.</p>';
            mapFrame.src = 'about:blank';
            openMapLink.href = 'https://www.dalkomm.com/findStore';
        }
    }

    brandOptions.forEach(function (option) {
        const input = option.querySelector('input');
        input.addEventListener('change', function () {
            brandOptions.forEach(function (item) {
                item.classList.toggle('is-selected', item.querySelector('input').checked);
            });
            applySearch();
        });
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        applySearch();
    });

    // 최초 진입 시 공식 매장 목록을 보여주고 첫 번째 매장을 지도에 표시합니다.
    applySearch();
})();
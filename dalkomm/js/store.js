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
        // 달콤 공식 매장 상세 페이지에서 확인한 주소
        { name: '부산송도케이블카점', brand: '달콤', region: '부산', address: '부산광역시 서구 송도해변로 171, 1층 105호(암남동, 송도해상케이블카 하부정류장)' },
        { name: '부산아쿠아리움점', brand: '달콤', region: '부산', address: '부산시 해운대구 해운대해변로 266' },
        { name: '제주공항점', brand: '달콤', region: '제주', address: '제주특별자치도 제주시 공항로 2, 제주공항 1층 도착장 로비' },
        { name: '판교아이디스점', brand: '달콤', region: '경기', address: '경기도 성남시 분당구 판교로 344 아이디스타워 지상 1층' },
        { name: '분당정자점', brand: '달콤', region: '경기', address: '경기도 성남시 분당구 정자일로 135 푸르지오시티 3차 108호, 109호' },
        { name: '부천시청역점', brand: '달콤', region: '경기', address: '경기 부천시 석천로 171 1층 달콤커피' },
        { name: '송파점', brand: '달콤', region: '서울', address: '서울시 송파구 올림픽로 49길 13' },
        { name: '죽전휴게소(서울방향)점', brand: '달콤', region: '경기', address: '경기 용인시 수지구 경부고속도로 400 (죽전동 866-2번지)' },
        { name: '면천휴게소(대전)점', brand: '달콤', region: '충남', address: '충청남도 당진시 면천면 당진영덕고속도로 10' },
        { name: '면천휴게소(당진)점', brand: '달콤', region: '충남', address: '충청남도 당진시 면천면 당진영덕고속도로 9' },
        { name: '통도사휴게소점', brand: '달콤', region: '경남', address: '경남 양산시 하북면 경부고속도로 31-1, 통도사 휴게소' },
        { name: '덕평휴게소(강릉)점', brand: '달콤', region: '경기', address: '경기도 이천시 마장면 덕이로154번길 287-76 (덕평휴게소)' },
        { name: '대림점', brand: '달콤N', region: '서울', address: '서울특별시 영등포구 도림로38길 6-1, 1층 104호' },
        { name: '다날스퀘어점', brand: '달콤N', region: '서울', address: '서울특별시 성동구 연무장15길 11 SFACTORY 1-2층' },
        { name: '영종하늘도시점', brand: '달콤N', region: '인천', address: '인천광역시 영종구 하늘별빛로65번길 7-9, 1층 104호' },
        { name: '군산문화점', brand: '달콤N', region: '전북', address: '전북 군산시 문화동 1F' },
        { name: '압구정리앤스타점', brand: '달콤N', region: '서울', address: '서울 강남구 언주로174길27 1F' },
        { name: '신림녹두거리점', brand: '달콤N', region: '서울', address: '서울 관악구 대학길 18 1F' }
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

        const selectedName = selectedStore && stores.some(function (store) {
            return store.name === selectedStore.name && store.address === selectedStore.address;
        }) ? selectedStore.name : stores[0].name;

        summary.innerHTML =
            '<label class="store-list-select-label" for="store-list-select">매장 선택</label>' +
            '<select class="store-list-select" id="store-list-select" aria-label="지도에 표시할 매장 선택">' +
            stores.map(function (store) {
                return '<option value="' + escapeHtml(store.name) + '"' +
                    (store.name === selectedName ? ' selected' : '') + '>' +
                    escapeHtml(store.name) + ' · ' + escapeHtml(store.brand) + '</option>';
            }).join('') +
            '</select>' +
            '<p class="store-selected-address" id="store-selected-address"></p>' +
            '<p class="store-list-note">매장을 선택하면 오른쪽 지도에서 위치를 확인할 수 있습니다.</p>';

        const select = summary.querySelector('#store-list-select');
        const address = summary.querySelector('#store-selected-address');

        function updateSelectedStore() {
            const store = stores.find(function (item) {
                return item.name === select.value;
            });
            if (!store) return;
            address.textContent = store.address;
            showStoreOnMap(store);
        }

        select.addEventListener('change', updateSelectedStore);
        const initialStore = stores.find(function (store) {
            return store.name === selectedName;
        });
        if (initialStore) address.textContent = initialStore.address;
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
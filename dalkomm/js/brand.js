/* 브랜드 페이지의 GNB 드롭다운: 클릭/키보드로 접근 가능하게 처리 */
(function () {
    const item = document.querySelector('.nav-item--brand');
    const trigger = document.querySelector('.brand-trigger');
    if (!item || !trigger) return;

    function setOpen(open) {
        item.classList.toggle('is-open', open);
        trigger.setAttribute('aria-expanded', String(open));
    }

    trigger.addEventListener('click', function (event) {
        event.stopPropagation();
        setOpen(!item.classList.contains('is-open'));
    });
    document.addEventListener('click', function (event) {
        if (!item.contains(event.target)) setOpen(false);
    });
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            setOpen(false);
            trigger.focus();
        }
    });
})();
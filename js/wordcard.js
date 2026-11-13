// Word flashcard modal
(function () {
    const modal = document.getElementById('wordModal');
    const openBtn = document.getElementById('wordBtn');
    const nextBtn = document.getElementById('wordNext');
    if (!modal || !openBtn || typeof WORDS === 'undefined') return;

    const elType = document.getElementById('wordType');
    const elWord = document.getElementById('wordHeadword');
    const elPron = document.getElementById('wordPron');
    const elDef = document.getElementById('wordDef');

    let lastIndex = -1;
    let touchStartX = null;
    const SWIPE_THRESHOLD = 40;

    function pick() {
        let i;
        do {
            i = Math.floor(Math.random() * WORDS.length);
        } while (i === lastIndex && WORDS.length > 1);
        lastIndex = i;
        return i;
    }

    function show() {
        const item = WORDS[pick()];
        elType.textContent = item.t;
        elWord.textContent = item.w;
        elPron.textContent = '[' + item.p + ']';
        elDef.textContent = item.d;
    }

    function open() {
        show();
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        nextBtn.focus();
    }

    function close() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        openBtn.focus();
    }

    openBtn.addEventListener('click', open);
    nextBtn.addEventListener('click', show);
    modal.querySelectorAll('[data-word-close]').forEach(el => el.addEventListener('click', close));
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('open')) close();
    });

    // Swipe left or right on the card to shuffle
    const card = modal.querySelector('.word-card');
    card.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    card.addEventListener('touchend', e => {
        if (touchStartX === null) return;
        const dx = e.changedTouches[0].screenX - touchStartX;
        touchStartX = null;
        if (Math.abs(dx) >= SWIPE_THRESHOLD) show();
    }, { passive: true });
})();

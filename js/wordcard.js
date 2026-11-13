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
    const elCount = document.getElementById('wordCount');

    let lastIndex = -1;

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
        elCount.textContent = WORDS.length + ' words in the deck';
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
})();

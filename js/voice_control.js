var scr = document.createElement('script');
scr.src = 'https://cdnjs.cloudflare.com/ajax/libs/annyang/2.6.1/annyang.min.js';
document.body.appendChild(scr);

scr.onload = () => {
    let kittScr = document.createElement('script');
    kittScr.src = 'https://cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/speechkitt.min.js';
    document.body.appendChild(kittScr);

    kittScr.onload = () => {
        if (annyang) {
            annyang.setLanguage('ru');

            annyang.addCommands({
                "открой главную": () => window.location.href = "index.html",
                "главная": () => window.location.href = "index.html",
                "открой отзывы": () => window.location.href = "revies.html",
                "отзывы":() => window.location.href = "revies.html"
            });

            SpeechKITT.annyang();
            SpeechKITT.setStylesheet('https://cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/themes/flat.css');
            SpeechKITT.vroom();

            console.log('Annyang is ready!');
        } else {
            console.error('Annyang not available.');
        }
    };
};
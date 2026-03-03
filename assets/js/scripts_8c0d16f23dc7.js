$(document).ready(function(){



$('.tosurvey').click(function(){
    $('[data-page="index"]').fadeOut(0)
    $('[data-page="survey"]').fadeIn(0)
    $('[data-el="survey-question-1"]').fadeIn(300)
    $('html, body').animate({ scrollTop: 0 }, 300);
    startTimer()
})

$('[data-el="survey-question-1"] button').click(function(){
    $('[data-el="survey-question-1"]').fadeOut(0)
    $('[data-el="survey-question-2"]').fadeIn(300)
    $('[data-el="survey-progress"]').fadeIn(300)
    setProgress(0 , 33)
})

$('[data-el="survey-question-2"] button').click(function(){
    $('[data-el="survey-question-2"]').fadeOut(0)
    $('[data-el="survey-question-3"]').fadeIn(300)
    setProgress(33 , 66)
})

$('[data-el="survey-question-3"] button').click(function(){
    $('[data-el="survey-question-3"]').fadeOut(0)
    $('[data-el="survey-loader"]').fadeIn(300)
    setProgress(66 , 100)


    setTimeout(()=>{
        $('[data-el="survey-loader"]').fadeOut(0)
        $('[data-el="progress-requirements"]').fadeOut(0)
        $('[data-el="survey-final"]').fadeIn(300)
    },5300)
})

const setProgress = (oldValue, newValue) => {
    const container = document.querySelector('[data-el="survey-progress"]');
    if (!container) return;

    container.style.display = 'block';

    const percentageText = container.querySelector('.flex.justify-between span:last-child');
    const bar = container.querySelector('div.bg-gray-200 > div');

    const duration = 2000; 
    const frameRate = 60; 
    const totalFrames = Math.round(duration / (1000 / frameRate));
    const step = (newValue - oldValue) / totalFrames;

    let current = oldValue;
    let frame = 0;

    const animate = () => {
        current += step;
        frame++;

        const currentValue = Math.round(current);
        const clamped = Math.max(0, Math.min(100, currentValue));
        percentageText.textContent = `${clamped}%`;
        bar.style.width = `${clamped}%`;

        if (frame < totalFrames) {
            requestAnimationFrame(animate);
        }
    };

    animate();
};

const startTimer = () => {
    const timerEl = document.getElementById('timer');
    if (!timerEl) return;

    let remainingSeconds = 15 * 60;

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    timerEl.textContent = formatTime(remainingSeconds);

    const interval = setInterval(() => {
        remainingSeconds--;

        if (remainingSeconds <= 0) {
            timerEl.textContent = "00:00";
            clearInterval(interval);
            return;
        }

        timerEl.textContent = formatTime(remainingSeconds);
    }, 1000);
};

window.getURLParameter = (sUrl, sParam) => {
    let sPageURL = decodeURI(sUrl.substring(sUrl.indexOf('?') + 1));
    let sURLVariables = sPageURL.split('&');
    for (let i = 0; i < sURLVariables.length; i++) {
        let sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}   

const rtkcid = window.getURLParameter(window.location.href, 'rtkcid');
const rtkcmpid = window.getURLParameter(window.location.href, 'rtkcmpid');

let isClicked = false;

$(".offer_link").click(function(e){
    e.preventDefault();

    if (isClicked) return;
    isClicked = true;

    fbq('track', 'PageView');

    setTimeout(() => {
        window.location.href = $(this).attr("href");
    }, 500);

    setTimeout(() => {
        isClicked = false;
    }, 5000);
});


// test
// $('[data-page="index"]').fadeOut(0)
// $('[data-page="survey"]').fadeIn(0)
// $('[data-el="survey-question-1"]').fadeIn(300)
// startTimer()

})
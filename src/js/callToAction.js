const callToAction = document.querySelector('#callToAction');
const closeButton = document.querySelector('.close');
const registerButton = document.querySelector('#registerButton');

function showBanner() {
  callToAction.style.display = 'block';
}

function hideBanner() {
    callToAction.style.display = 'none';
}

closeButton.addEventListener('click', () => {
    hideBanner();
});

registerButton.addEventListener('click', () => {
    hideBanner();
});

window.addEventListener('load', () => {
    const visitedBefore = localStorage.getItem('visitedBefore');
    if (visitedBefore === null || visitedBefore === false) {
        showBanner();
        localStorage.setItem('visitedBefore', true);
    } else {
        hideBanner();
    }
})
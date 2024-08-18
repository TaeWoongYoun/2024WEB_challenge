let question = [];
let locationIndex = 0;
let index = 0;
let completedCourse = {};
let isFileLoaded = false;

fetch('quiz.json')
    .then(response => response.json())
    .then(data => {
        question = data;
        initMap();
        window.addEventListener('DOMContentLoaded', eventChange());
    });

const toggleModal = show => document.querySelector('.modal').classList.toggle('show-modal', show);
document.querySelector('.coupon').addEventListener('click', () => {
    if(document.querySelector('.quiz-box').classList.contains('show-box')){
        alert("퀴즈가 이미 시작되어서 쿠폰을 발급 받을 수 없습니다.")
    } else {
        toggleModal(true);
    };
});
document.querySelector('.close-btn').addEventListener('click', () => toggleModal(false));

document.querySelector('.submit').addEventListener('click', () => {
    const ctx = document.getElementById('canvas').getContext('2d');
    const image = new Image();
    image.src = document.getElementById('coupon-image').src;
    image.onload = () => {
        document.getElementById('canvas').width = image.width;
        document.getElementById('canvas').height = image.height;
        ctx.drawImage(image, 0, 0);
        ctx.fillText(document.getElementById('name').value, canvas.width - 185, canvas.height - 305);
        ctx.fillText(new Date().toISOString().split('T')[0], canvas.width - 185, canvas.height - 355);

        const link = document.createElement('a');
        link.href = document.getElementById('canvas').toDateURL('image/png')
        link.download = 'stamp_card.png';
        link.click();
    }
})
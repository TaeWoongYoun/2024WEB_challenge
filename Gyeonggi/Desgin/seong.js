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
    if (document.querySelector('.quiz-box').classList.contains('show-box')) {
        alert ("퀴즈가 이미 시작되어서 쿠폰을 발급 받을 수 없습니다.")
    } else {
        toggleModal(true);
    }
});
document.querySelector('.close-btn').addEventListener('click', () => toggleModal(false));

document.querySelector('.submit').addEventListener('click', () => {
    const ctx = document.getElementById('canvas').getContext('2d');
    const image = new Image();
    image.src = document.getElementById('coupon-image').src;
    image.onload = () => {
        document.getElementById('canvas').width = image.width;
        document.getElementById('canvas').height = image.height;
        ctx.drawImage(image, 0, 0)
        ctx.fillText(document.getElementById('name').value, canvas.width - 185, canvas.height - 305)
        ctx.fillText(new Date().toISOString().split('T')[0], canvas.width - 185, canvas.height - 355)
        const link = document.createElement('a')
        link.href = document.getElementById('canvas').toDataURL('image/png');
        link.download = 'stamp_card.png';
        link.click();
    }
})

const startQuiz = () => {
    const selectedCourse = document.querySelector('.select').value;
    if (completedCourse[selectedCourse]){
        alert("이미 완주한 코스입니다.")
    } else if (!isFileLoaded) {
        document.getElementById('file-input').click();
    } else {
        document.querySelector('.quiz-box').classList.add('show-box')
        loadQuestion();
    }
}
document.querySelector('.quiz-start').addEventListener('click', startQuiz);
document.getElementById('file-input').addEventListener('change', event => {
    const file = event.target.file[0];
    if (file && file.name === 'stamp_card.png') {
        document.getElementById('this-file').innerHTML = file.name;
        isFileLoaded = true;
        startQuiz;
    } else {
        alert('내가 준 이미지를 사용해 시발')
    }
})
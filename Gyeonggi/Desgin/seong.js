let question = [];
let locationIndex = 0;
let index = 0;
let completedCourse = {};
let isFIleLoaded = false;

fetch('quiz.json')
    .then(response => response.json())
    .then(data => {
        question = data;
        initMap();
        window.addEventListener('DOMContentLoaded', eventChange());
    });

const toggleModal = show => document.querySelector('.modal').classList.toggle('show-modal', show);
document.querySelector('coupon').addEventListener('click', () => {
    if (document.querySelector('.quiz-box').classList.contains('show-box')) {
        alert("이미 퀴즈가 시작되어서 쿠폰을 발급 받을 수 없습니다");
    } else {
        toggleModal(true);
    }
})
document.querySelector('.close-btn').addEventListener('click', () => toggleModal(false));

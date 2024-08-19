document.addEventListener('DOMContentLoaded', () => {
    let question = [];
    let index = 0;
    let locationIndex = 0;
    let completedCourse = {};
    let isFileLoaded = false;

    fetch('quiz.json')
        .then(response => response.json())
        .then(data => {
            question = data;
            initMap();
            eventChange();
        })

    const toggleModal = show => document.querySelector('.modal').classList.toggle('show-modal', show);
    document.querySelector('.coupon').addEventListener('click', () => {
        if (document.querySelector('.quiz-box').classList.contains('show-box')) {
            alert('퀴즈가 이미 시작되어서 쿠폰을 발급 받을 수 없습니다.');
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
            ctx.drawImage(image, 0, 0);
            ctx.fillText(document.getElementById('name').value, canvas.width - 185, canvas.height - 305);
            ctx.fillText(new Date().toISOString().split('T')[0], canvas.width - 185, canvas.height - 355);
            const link = document.createElement('a');
            link.href = document.getElementById('canvas').toDataURL('image/png');
            link.download = 'stamp_card.png';
            link.click();
        };
    });

    const startQuiz = () => {
        const selectedCourse = document.querySelector('.select').value;
        if (completedCourse[selectedCourse]) {
            alert('이미 완주한 코스입니다.');
        } else if (!isFileLoaded) {
            document.getElementById('file-input').click();
        } else {
            document.querySelector('.quiz-box').classList.add('show-box');
            loadQuestion();
        }
    };
    document.querySelector('.quiz-start').addEventListener('click', startQuiz);
    document.getElementById('file-input').addEventListener('change', event => {
        const file = event.target.files[0];
        if (file && file.name === 'stamp_card.png') {
            document.getElementById('this-file').innerHTML = file.name;
            isFileLoaded = true;
            startQuiz();
        } else {
            alert('우리가 발급해준 쿠폰을 사용하세요');
        }
    });

    const loadQuestion = () => {
        const {idx, question: dataQuestion, correct, incorrect} = question[locationIndex].quiz[index];
        const allAnswers = [correct, ...incorrect].sort(() => Math.random() - 0.5); 

        document.querySelector('.quiz-box').innerHTML = `
        <div>
            <h2>${idx}번 문제</h2>
            <p>${dataQuestion}</p>
            ${allAnswers.map(item => `<button class="answer">${item}</button>`).join('')}
        </div>`;

        document.querySelectorAll('.answer').forEach(btn => btn.addEventListener('click', () => handleAnswer(btn.textContent === correct)));
    };

    const handleAnswer = isCorrect => {
        document.querySelector('.result-box').textContent = isCorrect ? '정답입니다' : '오답입니다. 다시 시도';
        if (isCorrect) {
            index++;
            document.querySelectorAll('.waypoint').forEach(waypoint => {
                if (index == waypoint.innerHTML) waypoint.classList.add('complete-way');
            })
        }

        document.querySelector('.result-box').style.display = 'block';
        document.querySelector('.quiz-box').style.display = 'none';

        setTimeout(() => {
            if (index < question[locationIndex].quiz.length) {
                loadQuestion();
            } else {
                finishQuiz();
            }
            document.querySelector('.result-box').style.display = 'none';
            document.querySelector('.quiz-box').style.display = 'block';
        }, 1000);
    };

    const finishQuiz = () => {
        const selectedCourse = document.querySelector('.select').value;
        index = 0;
        completedCourse[selectedCourse] = true;
        document.querySelector('.quiz-box').classList.remove('show-box');
        alert(Object.keys(completedCourse).length == 3 ? '모든 코스를 완주했습니다' : '해당코스를 완주했습니다');
        if (Object.keys(completedCourse).length == 3) {
            isFileLoaded = false;
            document.getElementById('this-file').innerHTML = '';
        }
    };

    const initMap = () => {
        updateMap(document.querySelector('.select').value);
        eventChange();
    };

    document.querySelector('.select').addEventListener('change', () => {
        updateMap(this.value)
        eventChange();
    });

    const updateMap = value => {
        document.getElementById('map-image').src =  `map/${value}.png`;
        locationIndex = ['창덕궁', '경복궁', '신라'].indexOf(value);
    };

    const pathCanvas = document.createElement('canvas');
    document.querySelector('.map').appendChild(pathCanvas);

    const setCanvasSize = () => {
        Object.assign(pathCanvas, {
            width : document.querySelector('.map').offsetWidth,
            height : document.querySelector('.map').offsetHeight,
            style : "pointion: absolute; left: -15px; top: -15px;"
        })
    }
});
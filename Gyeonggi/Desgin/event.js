const question = [
    [
      {
        "name": "창덕궁 달빛기행",
        "quiz": [
          {
            "idx": 1,
            "question": "창덕궁 희정당에 알맞은 의미는?",
            "correct": "정치를 빛낸다.",
            "incorrect": [
              "정치를 뒤흔든다.",
              "정치를 차지한다."
            ],
            "location": [470, 100]
          },
    
          {
            "idx": 2,
            "question": "창덕궁 금천교를 지은 이유는?",
            "correct": "금천을 건너기 위해 지었다.",
            "incorrect": [
              "금나라를 치기위해 지었다.",
              "금광산을 지을려고 지었다."
            ],
            "location": [640, 230]
          },
    
          {
            "idx": 3,
            "question": "창덕궁 낙선재는 무슨 흔적을 느낄 수 있었는가?",
            "correct": "사람",
            "incorrect": [
              "다람쥐",
              "강아지"
            ], 
            "location": [590, 295]
          },
    
          {
            "idx": 4,
            "question": "창덕궁 평원루는 어디 구역에 있는 정자인가?",
            "correct": "낙선재 구역",
            "incorrect": [
              "주정차 금지구역",
              "어린이 보호구역"
            ], 
            "location": [680, 360]
          },
    
          {
            "idx": 5,
            "question": "불로문을 지나가는 사람은 어떻게 되는가?",
            "correct": "무병장생한다",
            "incorrect": [
              "돈이 쏟아짐",
              "과거로 돌아가짐"
            ], 
            "location": [690, 480]
          },
    
          {
            "idx": 6,
            "question": "창덕궁 연경당에 연경은 무슨 의미인가?",
            "correct": "경사스러운 행사를 연행",
            "incorrect": [
              "연도마다 벌어지는 경사",
              "연도마다 한 번 있는 경찰의 축제"
            ], 
            "location": [545, 545]
          }
        ]
      },
      {
        "name": "경복궁 달빛기행",
        "quiz": [
          {
            "idx": 1,
            "question": "경복궁 소주방을 복원공사는 언제 완공되었나?",
            "correct": "2015년 2월 16일",
            "incorrect": [
              "2024년 3월 24일",
              "2000년 1월 13일"
            ],
            "location": [540, 40]
          },
    
          {
            "idx": 2,
            "question": "경복궁 집옥재는 어떤것을 보관하던 곳인가?",
            "correct": "어진과 도서",
            "incorrect": [
              "펜과 종이",
              "돈과 유물"
            ],
            "location": [610, 315]
          },
    
          {
            "idx": 3,
            "question": "경복궁 향원정의 의미는?",
            "correct": "향기가 멀리 간다.",
            "incorrect": [
              "사람이 오래 산다.",
              "향기가 향기롭다."
            ],
            "location": [760, 315]
          },
    
          {
            "idx": 4,
            "question": "도슭은 무엇의 옛말인가?",
            "correct": "도시락",
            "incorrect": [
              "도자기",
              "도라지"
            ],
            "location": [630, 430]
          },
    
          {
            "idx": 5,
            "question": "건청궁을 건설한 이유는?",
            "correct": "아버지의 영향력으로부터 벗어나기 위한 정치적 행보",
            "incorrect": [
              "어머니의 영향력으로부터 벗어나기 위한 정치적 행보",
              "할머니의 영향력으로부터 벗어나기 위한 정치적 행보"
            ],
            "location": [650, 500]
          },
    
          {
            "idx": 6,
            "question": "궁궐에서 장고를 따로 관리하는 상궁의 이름은?",
            "correct": "장고마마",
            "incorrect": [
              "석빙고",
              "장고파파"
            ],
            "location": [640, 665]
          }
        ]
      },
      {
        "name": "신라 달빛기행",
        "quiz": [
          {
            "idx": 1,
            "question": "신라 월정교는 어디 위에 설치 되었는가?",
            "correct": "남천",
            "incorrect": [
              "한강",
              "동천"
            ],
            "location": [360, 340]
          },
    
          {
            "idx": 2,
            "question": "신라 첨성대는 벽돌 몇개를 이용하여 제작 하였는가?",
            "correct": "364개",
            "incorrect": [
              "365개",
              "123개"
            ],
            "location": [535, 510]
          },
    
          {
            "idx": 3,
            "question": "신라 불국사의 입장료는 언제 무료가 되었는가?",
            "correct": "2023년 5월 4일",
            "incorrect": [
              "1989년 5월 5일",
              "1945년 8월 15일"
            ],
            "location": [480, 180]
          },
    
          {
            "idx": 4,
            "question": "신라 달빛기행은 언제부터 시작되었는가?",
            "correct": "1994년",
            "incorrect": [
              "2003년",
              "2006년"
            ],
            "location": [615, 120]
          },
    
          {
            "idx": 5,
            "question": "신라달빛기행 - X을 품은 달에서 X는 무엇인가?",
            "correct": "별",
            "incorrect": [
              "눈",
              "입"
            ],
            "location": [790, 290]
          },
    
          {
            "idx": 6,
            "question": "신라 달빛기행은 2006년부터 어디 도시의 후원을 받는가?",
            "correct": "경주시",
            "incorrect": [
              "신라",
              "안산시"
            ],
            "location": [955, 165]
          }
        ]
      }
    ]
  ]
  
  // 쿠폰 발급 모달창
  const openCoupon = document.querySelector('.coupon');
  const closeCoupon = document.querySelector('.close-btn');
  const modal = document.querySelector('.modal');
  
  openCoupon.addEventListener('click', function() {
    if (quizBox.classList.contains("show-box")) {
  
      alert("이미 퀴즈가 시작되어 쿠폰을 발급 받을 수 없습니다!");
  
    } else {
      modal.classList.add("show-modal");
    }
  });
  
  closeCoupon.addEventListener('click', function() {
    modal.classList.remove("show-modal");
  });
  
  // 캔버스 이미지 생성 및 이미지 다운로드
  const submitBtn = document.querySelector('.submit');
  const nameInput = document.getElementById('name');
  const canvas = document.getElementById('canvas');
  const couponImage = document.getElementById('coupon-image');
  
  // 오늘 날짜
  var date = new Date();
  var year = date.getFullYear();
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var day = date.getDate();
  var today = year + '-' + month + '-' + day;
  
  const image = new Image();
  let inputName = '';
  
  submitBtn.addEventListener('click', function() {
    const imgCanvas = canvas.getContext('2d');
    inputName = nameInput.value;
    image.src = couponImage.src; // 캔버스에 삽입할 이미지 경로
  
    image.onload = function() { // 캔버스 이미지 생성
      canvas.width = image.width;
      canvas.height = image.height;
  
      imgCanvas.drawImage(image, 0, 0);
      
      imgCanvas.font = '20px Arial, Helvetica, sans-serif';
      imgCanvas.fillStyle = 'black';
      imgCanvas.textAlign = 'left';
      imgCanvas.fillText(inputName, canvas.width - 185, canvas.height - 305);
      imgCanvas.fillText(today, canvas.width - 185, canvas.height - 355);
  
      const link = document.createElement('a'); // 이미지 다운로드
      link.href = canvas.toDataURL('image/png');
      link.download = 'stamp_card.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  });
  
  
  //파일 가져오기(업로드) 및 퀴즈 시작
  const fileInput = document.getElementById('file-input');
  const quizStart = document.querySelector('.quiz-start');
  const quizBox = document.querySelector('.quiz-box');
  const thisFile = document.getElementById('this-file');
  let loaded = false;
  
  // 퀴즈 시작 버튼
  quizStart.addEventListener('click', function() {
    if (quizBox.classList.contains("show-box")) {
  
      alert("이미 퀴즈가 시작되었습니다!");
  
    } else {
      startQuiz();
    }
  });
  
  
  // 퀴즈 시작
  fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
  
    if (file && file.name === 'stamp_card.png') {
      
      alert("퀴즈가 시작되었습니다!");
      loaded = true;
      thisFile.innerHTML = file.name;
      fileInput.value = '';
  
      startQuiz();
  
    } else {
      alert("저희가 발급한 스탬프 카드를 등록 해주세요.");
    }
  });
  
  const startQuiz = function() {
    const selectedCourse = locationSelect.value;
  
    if (completedCourse[selectedCourse]) {
  
      alert("이미 완주한 코스입니다.");
      return;
  
    } else if (!loaded) {
      fileInput.click();
      return;
    }
  
    quizBox.classList.add("show-box");
    loadQuestion();
  };
  
  const resultBox = document.querySelector('.result-box');
  let currentIndex = 0;
  let locationIndex = 0;
  let completedCourse = [];
  
  // 문제를 랜덤(무작위)으로 출력
  const shuffle = function(answer) {
    for (let i = answer.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // + 1을 추가한 이유는 0 ~ 2 미만이기 때문
      
      [answer[i], answer[j]] = [answer[j], answer[i]];
    }
    return answer;
  };
  
  // 문제 로드
  const loadQuestion = function() {
    question.map(function(item) {
      const getData = item[locationIndex].quiz[currentIndex];
      const dataQuestion = getData.question;
      const correct = getData.correct;
      const incorrect = getData.incorrect;
  
      const allAnswers = shuffle([correct, ...incorrect]);
      const answer = allAnswers.map(function(item) {
        return `<button class="answer">${item}</button>`;
      }).join("");
  
      quizBox.innerHTML = `
        <div>
          <h2>${getData.idx}번 문제</h2>
          <p>${dataQuestion}</p>
          ${answer}
        </div>
      `;
  
      const answerBtns = document.querySelectorAll('.answer');
  
      answerBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
          const selectedCourse = locationSelect.value;
  
          if (btn.textContent === correct) {
  
            resultBox.textContent = '정답입니다!';
            currentIndex++;
  
            document.querySelectorAll('.waypoint').forEach(function(waypoint) {
              const orderCourse = waypoint.innerHTML;
  
              if (currentIndex == orderCourse) {
                waypoint.classList.add("complete-way");
              }
            });
  
          } else {
            resultBox.textContent = '오답입니다! 다시 풀어보세요!';
          }
  
          if (currentIndex === item[locationIndex].quiz.length) {
  
            resultBox.textContent = '축하합니다! 해당 코스 퀴즈풀이가 완료되었습니다!';
            completedCourse[selectedCourse] = true;
            completedCourse.push(selectedCourse);
            updateStamp();
  
          }
  
          resultBox.style.display = 'block';
          quizBox.style.display = 'none';
  
          setTimeout(function() {
            if (currentIndex < item[locationIndex].quiz.length) {
  
              loadQuestion();
  
            } else {
              quizBox.classList.remove("show-box");
              currentIndex = 0;
  
              if (completedCourse.length == 3) {
  
                alert("모든 코스를 완주하였습니다!");
                thisFile.innerHTML = '';
  
              } else {
                alert("축하합니다! 해당 코스 퀴즈풀이가 완료되었습니다!");
              }
            }
  
            resultBox.style.display = 'none';
            quizBox.style.display = 'block';
          }, 2000);
        });
      });
    });
  };
  
  
  // 지도 변경효과
  const locationSelect = document.getElementById('location');
  const mapImage = document.getElementById('map-image');
  
  locationSelect.addEventListener('change', function() {
    const value = this.value;
  
    const changeWaypoint = document.querySelectorAll('.waypoint');
    
    changeWaypoint.forEach(function(waypoint) {
      waypoint.remove();
    });
  
    switch(value) {
      case '창덕궁':
        mapImage.src = 'map/창덕궁.png';
        locationIndex = 0;
        break;
  
      case '경복궁':
        mapImage.src = 'map/경복궁.png';
        locationIndex = 1;
        break;
  
      case '신라':
        mapImage.src = 'map/신라.png';
        locationIndex = 2;
        break;
  
      default:
        mapImage.src = '';
        locationIndex = 0;
        break;
    }
  
    eventChange();
  });
  
  
  // 해당 코스 완료 후 이미지 업데이트
  const updateStamp = function() {
    const imgCanvas = canvas.getContext('2d');
    const stamp = new Image();
    stamp.src = 'coupon/stamp_card.png';
    image.src = couponImage.src;
  
    image.onload = function() {
      canvas.width = image.width;
      canvas.height = image.height;
  
      imgCanvas.drawImage(image, 0, 0);
  
      imgCanvas.font = '20px Arial, Helvetica, sans-serif';
      imgCanvas.fillStyle = 'black';
      imgCanvas.textAlign = 'left';
      imgCanvas.fillText(inputName, canvas.width - 185, canvas.height - 305);
      imgCanvas.fillText(today, canvas.width - 185, canvas.height - 355);
  
      stamp.onload = function() {
        imgCanvas.drawImage(stamp, 55, 165);
  
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image.png');
        link.download = 'stamp_card.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    };
  };
  
  
  // 지도 위에 경로 표시
  const map = document.querySelector('.map');
  
  const eventChange = function() {
    question.map(function(item) {
      const wayData = item[locationIndex].quiz;
  
      wayData.forEach(function(ping) {
        const way = document.createElement('div');
        const selectedCourse = locationSelect.value;
  
        way.className = 'waypoint';
        way.style.left = ping.location[0] + 'px';
        way.style.top = ping.location[1] + 'px';
        way.innerHTML = ping.idx;
  
        map.appendChild(way);
  
        if (completedCourse[selectedCourse]) {
          way.classList.add("complete-way");
        }
      });
    });
  };
  
  window.addEventListener('DOMContentLoaded', eventChange);
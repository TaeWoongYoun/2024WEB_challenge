document.addEventListener("DOMContentLoaded", function() {
    // 'keywords.json' 파일을 가져와서 JSON으로 파싱
    fetch('keywords.json')
        .then(response => response.json())
        .then(jsonData => {
            // JSON 데이터에서 'data' 필드 추출
            const dataArray = jsonData.data; // JSON 객체의 data 필드 접근
            // 데이터를 기반으로 워드 클라우드를 생성하는 함수 호출
            createWordCloud(dataArray);
        });

    // 워드 클라우드를 생성하는 함수
    function createWordCloud(data) {
        // 'word-cloud'라는 id를 가진 HTML 요소를 선택
        const container = document.getElementById('word-cloud');
        // 컨테이너의 중앙 좌표를 계산
        const centerX = container.offsetWidth / 2.2;
        const centerY = container.offsetHeight / 2.2;

        let angle = 0;  // 각도 초기화
        let radius = 1;  // 반경 초기화
        const step = 15;  // 각도 증가량
        const fontSizeStep = 2;  // 폰트 크기 감소량
        const maxFontSize = 64;  // 최대 폰트 크기

        // 데이터의 빈도수에 따라 내림차순으로 정렬
        data.sort((a, b) => b.frequency - a.frequency);

        // 각 단어에 대해 워드 클라우드에서 위치를 지정
        data.forEach((item, index) => {
            // 새로운 div 요소를 생성하여 단어를 표시
            const div = document.createElement('div');
            div.className = 'word';  // CSS 클래스 지정
            div.style.fontSize = `${maxFontSize - index * fontSizeStep}px`;  // 폰트 크기 설정
            div.innerText = item.word;  // 단어 텍스트 설정

            // 랜덤 색상 생성
            const color = getRandomColor();
            div.style.color = color;

            // 마우스 이벤트 추가
            div.addEventListener('mouseover', function(event) {
                showPopup(item.frequency, event.clientX, event.clientY);
            });
            div.addEventListener('mouseout', hidePopup);

            let x, y;
            // 위치가 겹치지 않도록 하는 반복문
            do {
                angle += step;  // 각도 증가
                radius += 0.5;  // 반경 증가
                // (x, y) 좌표 계산
                x = centerX + radius * Math.cos(angle * Math.PI / 180);
                y = centerY + radius * Math.sin(angle * Math.PI / 180);
            } while (checkOverlap(container, div, x, y));  // 위치가 겹치면 다시 시도
            
            // 계산된 좌표에 위치 설정
            div.style.left = `${x}px`;
            div.style.top = `${y}px`;

            // 컨테이너에 div 요소를 추가
            container.appendChild(div);
        });
    }

    // 랜덤 색상을 생성하는 함수
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // 위치가 겹치는지 확인하는 함수
    function checkOverlap(container, element, x, y) {
        // 요소의 위치를 설정
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        // 컨테이너에 임시로 요소를 추가
        container.appendChild(element);
        // 컨테이너의 자식 요소들과 겹치는지 확인
        const isOverlapping = [...container.children].some(child => {
            if (child === element) return false;  // 현재 검사 중인 요소는 제외
            // 두 요소의 경계 사각형을 가져옴
            const rect1 = child.getBoundingClientRect();
            const rect2 = element.getBoundingClientRect();
            // 사각형이 겹치는지 여부를 반환
            return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
        });
        // 임시로 추가한 요소를 제거
        container.removeChild(element);
        return isOverlapping;  // 겹치는 경우 true 반환
    }

    // 팝업을 보여주는 함수
    function showPopup(frequency, x, y) {
        const popup = document.getElementById('popup');
        popup.innerText = `Frequency: ${frequency}`;
        popup.style.left = `${x}px`;
        popup.style.top = `${y}px`;
        popup.style.display = 'block';
    }

    // 팝업을 숨기는 함수
    function hidePopup() {
        const popup = document.getElementById('popup');
        popup.style.display = 'none';
    }
});

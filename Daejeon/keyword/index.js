document.addEventListener("DOMContentLoaded", function() {
    let wordColors = {}; // 각 단어에 대한 색상을 저장하는 객체
    let activeWords = []; // 현재 활성화된 단어(체크박스가 선택된 단어)를 저장하는 배열

    // 'keywords.json' 파일에서 데이터를 가져옴
    fetch('keywords.json')
        .then(response => response.json()) // JSON 형식의 응답을 파싱
        .then(jsonData => {
            const dataArray = jsonData.data; // 'data' 속성에 있는 배열을 가져옴

            activeWords = dataArray.map(item => item.word); // 모든 단어를 활성 단어로 설정

            createWordCloud(dataArray); // 단어 구름 생성
            createTable(dataArray); // 단어 테이블 생성
        });

    // 단어 구름을 생성하는 함수
    function createWordCloud(data) {
        const container = document.getElementById('word-cloud'); // 단어 구름을 표시할 컨테이너
        const centerX = container.offsetWidth / 2.2; // 컨테이너의 중심 X 좌표
        const centerY = container.offsetHeight / 2.2; // 컨테이너의 중심 Y 좌표
        let angle = 0; // 초기 각도
        let radius = 1; // 초기 반지름
        const step = 15; // 각도 증가 값
        const fontSizeStep = 2; // 폰트 크기 감소 값
        const maxFontSize = 64; // 최대 폰트 크기

        // 활성화된 단어만 필터링하여 정렬
        const activeData = data.filter(item => activeWords.includes(item.word));
        activeData.sort((a, b) => b.frequency - a.frequency); // 빈도수에 따라 내림차순 정렬

        container.innerHTML = ''; // 기존 단어 구름을 초기화

        // 각 단어에 대해 구름에서의 위치와 스타일을 설정
        activeData.forEach((item, index) => {
            const div = document.createElement('div'); // 단어를 표시할 div 생성
            div.className = 'word';
            div.style.fontSize = `${maxFontSize - index * fontSizeStep}px`; // 빈도수에 따라 폰트 크기 설정
            div.innerText = item.word; // div에 단어 텍스트 삽입

            // 단어의 색상을 설정 (이미 설정된 경우 기존 색상 사용)
            div.style.color = wordColors[item.word] || (wordColors[item.word] = getRandomColor());

            // 마우스를 올렸을 때 팝업을 보여줌
            div.addEventListener('mouseover', event => showPopup(item.frequency, event.clientX, event.clientY));
            // 마우스를 벗어났을 때 팝업을 숨김
            div.addEventListener('mouseout', hidePopup);

            let x, y;
            // 다른 단어와 겹치지 않도록 위치를 계산
            do {
                angle += step; // 각도를 증가시킴
                radius += 0.5; // 반지름을 증가시킴
                x = centerX + radius * Math.cos(angle * Math.PI / 180); // x 좌표 계산
                y = centerY + radius * Math.sin(angle * Math.PI / 180); // y 좌표 계산
            } while (checkOverlap(container, div, x, y)); // 겹치는지 확인하고, 겹치면 다시 계산

            // 계산된 위치에 단어를 배치
            div.style.left = `${x}px`;
            div.style.top = `${y}px`;
            container.appendChild(div); // 컨테이너에 단어를 추가
        });
    }

    // 임의의 색상을 생성하는 함수
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]; // 16진수 문자를 랜덤으로 선택
        }
        return color; // 생성된 색상 반환
    }

    // 두 요소가 겹치는지 확인하는 함수
    function checkOverlap(container, element, x, y) {
        element.style.left = `${x}px`; // 요소의 가로 위치 설정
        element.style.top = `${y}px`; // 요소의 세로 위치 설정
        container.appendChild(element); // 일시적으로 요소를 컨테이너에 추가

        // 요소가 다른 요소와 겹치는지 확인
        const isOverlapping = [...container.children].some(child => {
            if (child === element) return false; // 자기 자신과는 비교하지 않음
            const rect1 = child.getBoundingClientRect(); // 비교 대상 요소의 사각형 영역
            const rect2 = element.getBoundingClientRect(); // 현재 요소의 사각형 영역
            // 두 요소가 겹치는지 확인
            return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
        });
        container.removeChild(element); // 일시적으로 추가한 요소를 다시 제거
        return isOverlapping; // 겹치는지 여부를 반환
    }

    // 빈도수 팝업을 표시하는 함수
    function showPopup(frequency, x, y) {
        const popup = document.getElementById('popup');
        popup.innerText = `빈도수: ${frequency}`; // 빈도수 텍스트 설정
        popup.style.left = `${x}px`; // 팝업의 가로 위치 설정
        popup.style.top = `${y}px`; // 팝업의 세로 위치 설정
        popup.style.display = 'block'; // 팝업 표시
    }

    // 빈도수 팝업을 숨기는 함수
    function hidePopup() {
        document.getElementById('popup').style.display = 'none'; // 팝업 숨기기
    }

    // 단어 테이블을 생성하는 함수
    function createTable(data) {
        const container = document.getElementById('table-container'); // 테이블을 표시할 컨테이너
        const table = document.createElement('table'); // 테이블 요소 생성
        table.innerHTML = `
            <tr>
                <th></th>
                <th>키워드</th>
                <th>빈도수</th>
            </tr>
        `; // 테이블 헤더 생성
        
        data.forEach(item => {
            const row = document.createElement('tr'); // 테이블 행 생성
            row.innerHTML = `
                <td><input type="checkbox" ${activeWords.includes(item.word) ? 'checked' : ''}></td>
                <td style="color: ${wordColors[item.word] || getRandomColor()}">${item.word}</td>
                <td>${item.frequency}</td>
            `; // 각 행에 체크박스, 단어, 빈도수를 추가
            
            const checkbox = row.querySelector('input[type="checkbox"]'); // 체크박스 요소 선택
            checkbox.addEventListener('change', function() {
                if (!checkbox.checked && activeWords.length <= 15) {
                    checkbox.checked = true; // 체크박스 선택 상태로 유지
                    alert("리스트는 최소 15개 이상이여야 합니다."); // 최소 15개 경고 메시지
                    return;
                }

                if (checkbox.checked) {
                    activeWords.push(item.word); // 체크된 단어를 활성 단어 목록에 추가
                } else {
                    activeWords = activeWords.filter(word => word !== item.word); // 체크 해제된 단어를 목록에서 제거
                }

                createWordCloud(data); // 단어 구름을 다시 생성하여 업데이트
            });

            table.appendChild(row); // 생성된 행을 테이블에 추가
        });

        container.innerHTML = ''; // 기존 테이블을 초기화
        container.appendChild(table); // 새로 생성된 테이블을 컨테이너에 추가
    }
});

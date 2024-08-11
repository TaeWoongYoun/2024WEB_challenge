document.addEventListener('DOMContentLoaded', function() {
    // 데이터 저장을 위한 Set 객체를 생성합니다.
    const sidoSet = new Set();
    const gunguSet = new Set();
    const typeSet = new Set();

    // 결과를 표시할 DOM 요소를 가져옵니다.
    const resultContent = document.getElementById("resultContent");
    let currentPage = 1; // 현재 페이지를 추적하는 변수
    const resultsPerPage = 5; // 페이지 당 결과 수
    let festivals = []; // 축제 데이터를 저장할 배열

    // JSON 파일에서 축제 데이터를 불러옵니다.
    fetch('json/festivals.json')
        .then(response => response.json())
        .then(data => {
            festivals = data; // 축제 데이터를 배열에 저장

            // 축제 데이터를 기반으로 옵션을 업데이트하기 위해 Set에 추가합니다.
            festivals.forEach(festival => {
                sidoSet.add(festival.sido);
                gunguSet.add(festival.gungu);
                typeSet.add(festival.type);
            });

            // 셀렉트 박스에 옵션을 추가합니다.
            updateSelectOptions(document.getElementById("sidoSelect"), Array.from(sidoSet));
            updateSelectOptions(document.getElementById("gunguSelect"), Array.from(gunguSet));
            updateSelectOptions(document.getElementById("typeSelect"), Array.from(typeSet));
        })

    // 버튼에 클릭 이벤트 리스너를 추가합니다.
    document.getElementById("searchButton").addEventListener("click", searchFestivals);
    document.getElementById("startDateInput").addEventListener("input", formatDateString);

    document.getElementById("prevButton").addEventListener("click", () => {
        currentPage--; // 페이지 번호를 감소시키고
        searchFestivals(); // 축제 검색을 다시 수행합니다.
    });

    document.getElementById("nextButton").addEventListener("click", () => {
        currentPage++; // 페이지 번호를 증가시키고
        searchFestivals(); // 축제 검색을 다시 수행합니다.
    });

    // 셀렉트 박스의 옵션을 업데이트하는 함수
    function updateSelectOptions(selectElement, options) {
        // 기존의 모든 옵션을 제거합니다.
        // selectElement.innerHTML = ''; //이거 사용하면 인풋에 내용 다 입력해야 정상 작동
    
        // 각 옵션을 `<option>` 태그로 생성하여 `selectElement`에 추가합니다.
        options.forEach(option => {
            const opt = document.createElement("option");
            opt.value = option;
            opt.textContent = option;
            selectElement.appendChild(opt);
        });
    }
    // 날짜 입력 형식을 포맷하는 함수
    function formatDateString(event) {
        let input = event.target.value.replace(/\D/g, ''); // 숫자가 아닌 문자를 제거합니다.
        if (input.length >= 6) {
            input = input.slice(0, 4) + '-' + input.slice(4, 6) + '-' + input.slice(6, 8); // YYYY-MM-DD 형식으로 변환
        } else if (input.length >= 4) {
            input = input.slice(0, 4) + '-' + input.slice(4, 6); // YYYY-MM 형식으로 변환
        }
        event.target.value = input; // 변환된 값을 입력 필드에 설정합니다.
    }

    // 축제 검색을 수행하는 함수
    function searchFestivals() {
        // 입력된 값들을 가져와서 필터링에 사용합니다.
        const searchInput = document.getElementById("searchInput").value.toLowerCase();
        const sidoSelect = document.getElementById("sidoSelect").value;
        const gunguSelect = document.getElementById("gunguSelect").value;
        const typeSelect = document.getElementById("typeSelect").value;
        const startDateInput = document.getElementById("startDateInput").value;

        // 축제를 필터링합니다.
        const filteredFestivals = festivals.filter(festival => {
            const matchesSearch = festival.title.toLowerCase().includes(searchInput);
            const matchesSido = !sidoSelect || festival.sido === sidoSelect;
            const matchesGungu = !gunguSelect || festival.gungu === gunguSelect;
            const matchesType = !typeSelect || festival.type === typeSelect;
            const matchesStartDate = !startDateInput || festival.startdate.startsWith(startDateInput);

            return matchesSearch && matchesSido && matchesGungu && matchesType && matchesStartDate;
        });

        // 필터링된 결과를 정렬하고 페이지네이션을 수행하여 표시합니다.
        displayResults(filteredFestivals.sort((a, b) => new Date(a.startdate) - new Date(b.startdate)));
    }

    // 필터링된 결과를 페이지에 표시하는 함수
    function displayResults(results) {
        resultContent.innerHTML = ""; // 이전 결과를 지웁니다.
        const totalResults = results.length;
        const totalPages = Math.ceil(totalResults / resultsPerPage);

        // 현재 페이지에 해당하는 결과의 시작 인덱스와 끝 인덱스를 계산합니다.
        const startIndex = (currentPage - 1) * resultsPerPage;
        const endIndex = Math.min(startIndex + resultsPerPage, totalResults);

        // 결과를 카드 형태로 페이지에 추가합니다.
        results.slice(startIndex, endIndex).forEach(festival => {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <h3>${festival.sido} <span>${festival.gungu}</span></h3>
                <p>축제명: ${festival.title}</p>
                <p>축제 유형: ${festival.type}</p>
                <p>개최 기간: <br>${festival.startdate} ~ ${festival.enddate}</p>
                <button onclick="showModal(${festival.id})">더보기</button>
            `;

            resultContent.appendChild(card);
        });

        // 페이지 버튼의 상태를 업데이트합니다.
        document.getElementById("prevButton").disabled = currentPage === 1;
        document.getElementById("nextButton").disabled = currentPage === totalPages;
    }

    // 모달을 표시하는 함수
    window.showModal = function(festivalId) {
        const festival = festivals.find(f => f.id === festivalId);
        if (!festival) return;

        // 모달 요소를 생성하고 내용으로 채웁니다.
        const modal = document.createElement("div");
        modal.className = "modal";
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-button" onclick="closeModal()">&times;</span>
                <img src="images/${festival.photo}" alt="${festival.title}">
                <div>
                    <h1>${festival.title}</h1>
                    <p>축제 기간: ${festival.startdate} ~ ${festival.enddate}</p>
                    <p>개최 장소: ${festival.place}</p>
                    <p>축제 개최조직: ${festival.organization}</p>
                    <p>담당 지자체: ${festival.government}</p>
                    <p>담당 부서: ${festival.department}</p>
                    <p>담당자 직책: ${festival.position}</p>
                    <p>담당자명: ${festival.staff}</p>
                    <p>담당자 연락처: ${festival.tel}</p>
                    <p>2023년도 방문객 정보: <br> 내국인 수: ${festival.visitor_native_2023}, 외국인 수: ${festival.visitor_foreigner_2023}, 합계: ${festival.visitor_total_2023}</p>
                </div>
                <div class='modal_btn_area'>
                    <button>좋아요</button>
                    <button>싫어요</button>
                    <button>내 여행 일정에 추가</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal); // 모달을 문서의 body에 추가합니다.
    };

    // 모달을 닫는 함수
    window.closeModal = function() {
        const modal = document.querySelector(".modal");
        if (modal) {
            modal.remove(); // 모달을 문서에서 제거합니다.
        }
    };
});

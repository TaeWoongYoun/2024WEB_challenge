document.addEventListener("DOMContentLoaded", () => {
    const sidoSet = new Set();
    const gunguSet = new Set();
    const typeSet = new Set();
    const resultContent = document.getElementById("resultContent");
    let currentPage = 1;
    const resultsPerPage = 5;
    let festivals = [];

    fetch('json/festivals.json')
        .then(response => response.json())
        .then(data => {
            festivals = data;

            festivals.forEach(festival => {
                sidoSet.add(festival.sido);
                gunguSet.add(festival.gungu);
                typeSet.add(festival.type);
            });

            updateSelectOptions(document.getElementById("sidoSelect"), Array.from(sidoSet));
            updateSelectOptions(document.getElementById("gunguSelect"), Array.from(gunguSet));
            updateSelectOptions(document.getElementById("typeSelect"), Array.from(typeSet));
        })
        .catch(error => console.error('Error loading festivals:', error));

    document.getElementById("searchButton").addEventListener("click", searchFestivals);
    document.getElementById("startDateInput").addEventListener("input", formatDateString);

    document.getElementById("prevButton").addEventListener("click", () => {
        currentPage--;
        searchFestivals();
    });

    document.getElementById("nextButton").addEventListener("click", () => {
        currentPage++;
        searchFestivals();
    });

    function updateSelectOptions(selectElement, options) {
        options.forEach(option => {
            const opt = document.createElement("option");
            opt.value = option;
            opt.textContent = option;
            selectElement.appendChild(opt);
        });
    }

    function formatDateString(event) {
        let input = event.target.value.replace(/\D/g, '');
        if (input.length >= 6) {
            input = input.slice(0, 4) + '-' + input.slice(4, 6) + '-' + input.slice(6, 8);
        } else if (input.length >= 4) {
            input = input.slice(0, 4) + '-' + input.slice(4, 6);
        }
        event.target.value = input;
    }

    function searchFestivals() {
        const searchInput = document.getElementById("searchInput").value.toLowerCase();
        const sidoSelect = document.getElementById("sidoSelect").value;
        const gunguSelect = document.getElementById("gunguSelect").value;
        const typeSelect = document.getElementById("typeSelect").value;
        const startDateInput = document.getElementById("startDateInput").value;

        const filteredFestivals = festivals.filter(festival => {
            const matchesSearch = festival.title.toLowerCase().includes(searchInput);
            const matchesSido = !sidoSelect || festival.sido === sidoSelect;
            const matchesGungu = !gunguSelect || festival.gungu === gunguSelect;
            const matchesType = !typeSelect || festival.type === typeSelect;
            const matchesStartDate = !startDateInput || festival.startdate.startsWith(startDateInput);

            return matchesSearch && matchesSido && matchesGungu && matchesType && matchesStartDate;
        });

        displayResults(filteredFestivals.sort((a, b) => new Date(a.startdate) - new Date(b.startdate)));
    }

    function displayResults(results) {
        resultContent.innerHTML = "";
        const totalResults = results.length;
        const totalPages = Math.ceil(totalResults / resultsPerPage);

        const startIndex = (currentPage - 1) * resultsPerPage;
        const endIndex = Math.min(startIndex + resultsPerPage, totalResults);

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

        document.getElementById("prevButton").disabled = currentPage === 1;
        document.getElementById("nextButton").disabled = currentPage === totalPages;
    }

    window.showModal = function (festivalId) {
        const festival = festivals.find(f => f.id === festivalId);
        if (!festival) return;

        const modal = document.createElement("div");
        modal.className = "modal";
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-button" onclick="closeModal()">&times;</span>
                <img src="${festival.photo}" alt="${festival.title}">
                <h2>${festival.title}</h2>
                <p>축제 기간: ${festival.startdate} ~ ${festival.enddate}</p>
                <p>개최 장소: ${festival.place}</p>
                <p>축제 개최조직: ${festival.organization}</p>
                <p>담당 지자체: ${festival.government}</p>
                <p>담당 부서: ${festival.department}</p>
                <p>담당자 직책: ${festival.position}</p>
                <p>담당자명: ${festival.staff}</p>
                <p>담당자 연락처: ${festival.tel}</p>
                <p>2023년도 방문객 정보: 내국인 수: ${festival.visitor_native_2023}, 외국인 수: ${festival.visitor_foreigner_2023}, 합계: ${festival.visitor_total_2023}</p>
                <button>좋아요</button>
                <button>싫어요</button>
                <button>내 여행 일정에 추가</button>
            </div>
        `;

        document.body.appendChild(modal);
    };

    window.closeModal = function () {
        const modal = document.querySelector(".modal");
        if (modal) {
            modal.remove();
        }
    };
});

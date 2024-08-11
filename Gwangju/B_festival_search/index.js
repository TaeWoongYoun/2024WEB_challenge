document.addEventListener('DOMContentLoaded', function() {
    // JSON 데이터를 불러오는 함수
    function fetchFestivalData() {
        return fetch('json/festivals.json')
            .then(response => response.json())
            .then(data => data.sort((a, b) => b.like - a.like).slice(0, 10));
    }

    // 축제 카드를 생성하는 함수
    function createFestivalCard(festival) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="images/${festival.photo}" alt="${festival.title}">
            <h3>${festival.title}</h3>
            <p>기간 : ${festival.startdate} ~ ${festival.enddate}</p>
            <p>개최 장소 : ${festival.place}</p>
            <p>좋아요 : ${festival.like}개</p>
            <button>더보기</button>
        `;
        return card;
    }

    // 모달 창에 데이터를 표시하는 함수
    function showModal(festival) {
        document.getElementById('modal_img').src = `images/${festival.photo}`;
        document.getElementById('modal_title').textContent = festival.title;
        document.getElementById('modal_period').textContent = `축제 기간: ${festival.startdate} ~ ${festival.enddate}`;
        document.getElementById('modal_place').textContent = `개최 장소: ${festival.place}`;
        document.getElementById('modal_organization').textContent = `축제 개최조직: ${festival.organization}`;
        document.getElementById('modal_government').textContent = `담당 지자체: ${festival.government}`;
        document.getElementById('modal_department').textContent = `담당 부서: ${festival.department}`;
        document.getElementById('modal_position').textContent = `담당자 직책: ${festival.position}`;
        document.getElementById('modal_staff').textContent = `담당자명: ${festival.staff}`;
        document.getElementById('modal_tel').textContent = `담당자 연락처: ${festival.tel}`;
        document.getElementById('modal_visitors').innerHTML = `2023년도 방문객 정보: <br> 내국인 수: ${festival.visitor_native_2023}, 외국인 수: ${festival.visitor_foreigner_2023}, 합계: ${festival.visitor_total_2023}`;

        document.getElementById('festa_modal').style.display = 'block';
    }

    // JSON 데이터를 불러와서 축제 카드 및 이벤트 핸들러 설정
    fetchFestivalData().then(festivals => {
        const contentDiv = document.querySelector('.content');
        
        festivals.forEach(festival => {
            const card = createFestivalCard(festival);
            contentDiv.appendChild(card);

            card.querySelector('button').addEventListener('click', function() {
                showModal(festival);
            });
        });
    });

    // 모달 닫기 버튼 클릭 이벤트 핸들러
    document.getElementById('close_button').addEventListener('click', function() {
        document.getElementById('festa_modal').style.display = 'none';
    });
});

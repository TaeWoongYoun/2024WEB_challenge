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
        card.className = 'festa_card';
        card.innerHTML = `
            <img src="images/${festival.photo}" alt="${festival.title}">
            <div class="festa_txt">
                <h3>${festival.title}</h3>
                <p>기간 : ${festival.startdate} ~ ${festival.enddate}</p>
                <p>개최 장소 : ${festival.place}</p>
                <p>좋아요 : ${festival.like}개</p>
                <button>더보기</button>
            </div>
        `;
        return card;
    }

    // JSON 데이터를 불러와서 축제 카드 및 이벤트 핸들러 설정
    fetchFestivalData().then(festivals => {
        const bestFestaDiv = document.querySelector('.best_festa');
        
        festivals.forEach(festival => {
            const card = createFestivalCard(festival);
            bestFestaDiv.appendChild(card);

            // 카드의 "더보기" 버튼 클릭 시 모달 표시
            card.querySelector('button').addEventListener('click', function() {
                document.querySelector('.festa_modal img').src = `images/${festival.photo}`;
                document.querySelector('.festa_modal_txt h1').textContent = festival.title;
                document.querySelector('.festa_modal_txt p:nth-of-type(1)').textContent = `축제 기간: ${festival.startdate} ~ ${festival.enddate}`;
                document.querySelector('.festa_modal_txt p:nth-of-type(2)').textContent = `개최 장소: ${festival.place}`;
                document.querySelector('.festa_modal_txt p:nth-of-type(3)').textContent = `축제 개최조직: ${festival.organization}`;
                document.querySelector('.festa_modal_txt p:nth-of-type(4)').textContent = `담당 지자체: ${festival.government}`;
                document.querySelector('.festa_modal_txt p:nth-of-type(5)').textContent = `담당 부서: ${festival.department}`;
                document.querySelector('.festa_modal_txt p:nth-of-type(6)').textContent = `담당자 직책: ${festival.position}`;
                document.querySelector('.festa_modal_txt p:nth-of-type(7)').textContent = `담당자명: ${festival.staff}`;
                document.querySelector('.festa_modal_txt p:nth-of-type(8)').textContent = `담당자 연락처: ${festival.tel}`;
                document.querySelector('.festa_modal_txt p:nth-of-type(9)').innerHTML = `2023년도 방문객 정보: <br> 내국인 수: ${festival.visitor_native_2023}, 외국인 수: ${festival.visitor_foreigner_2023}, 합계: ${festival.visitor_total_2023}`;

                document.querySelector('.festa_modal_back').style.display = 'block';
            });
        });
    });

    // 모달 창 닫기 버튼 클릭 이벤트 핸들러
    document.querySelector('.festa_modal_txt span').addEventListener('click', function(){
        document.querySelector('.festa_modal_back').style.display = 'none';
    });
});

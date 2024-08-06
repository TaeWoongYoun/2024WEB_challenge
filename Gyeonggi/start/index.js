document.addEventListener('DOMContentLoaded', () => {
    let mapData;
    let currentSpeed = 3; // 초기값 도보 속도
    let currentCourseIndex = 0; // 현재 선택된 코스의 인덱스

    // course.json 파일을 가져와서 초기 데이터를 로드
    fetch('course.json')
        .then(response => response.json())
        .then(data => {
            mapData = data; // JSON 데이터를 mapData에 저장
            renderMap(mapData[currentCourseIndex]); // 첫 번째 코스를 렌더링
            calculateRoutes(mapData[currentCourseIndex]); // 첫 번째 코스의 경로를 계산
        });

    // 포인터 요소를 생성하는 함수
    const createPointerElement = pointer => {
        const pointerElement = document.createElement('div');
        pointerElement.className = 'pointer';
        pointerElement.style.left = `${pointer.location[0]}px`;
        pointerElement.style.top = `${pointer.location[1]}px`;
        pointerElement.textContent = pointer.idx; // 포인터의 인덱스를 텍스트로 표시
        return pointerElement;
    };

    // 링크를 그리는 함수, highlightPath는 하이라이트할 경로
    const renderLinks = (pointers, highlightPath = []) => {
        const canvas = document.getElementById('mapCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = document.getElementById('mapContainer').offsetWidth;
        canvas.height = document.getElementById('mapContainer').offsetHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스를 초기화

        // 포인터 간의 기본 링크를 그림
        pointers.forEach(pointer => {
            pointer.link.forEach(linkIdx => {
                const targetPointer = pointers.find(p => p.idx === linkIdx);
                if (targetPointer) {
                    ctx.beginPath();
                    ctx.moveTo(pointer.location[0] + 15, pointer.location[1] + 15);
                    ctx.lineTo(targetPointer.location[0] + 15, targetPointer.location[1] + 15);
                    ctx.strokeStyle = '#111';
                    ctx.lineWidth = 5;
                    ctx.stroke();
                }
            });
        });

        // 하이라이트할 경로가 있는 경우, 경로를 빨간색으로 그림
        if (highlightPath.length > 0) {
            for (let i = 0; i < highlightPath.length - 1; i++) {
                const start = pointers.find(p => p.idx === highlightPath[i]);
                const end = pointers.find(p => p.idx === highlightPath[i + 1]);
                if (start && end) {
                    ctx.beginPath();
                    ctx.moveTo(start.location[0] + 15, start.location[1] + 15);
                    ctx.lineTo(end.location[0] + 15, end.location[1] + 15);
                    ctx.strokeStyle = '#FF0000';
                    ctx.lineWidth = 5;
                    ctx.stroke();
                }
            }
        }
    };

    // 맵을 렌더링하는 함수
    const renderMap = data => {
        const mapContainer = document.getElementById('mapContainer');
        mapContainer.innerHTML = ''; // 맵 컨테이너를 초기화
        const canvas = document.createElement('canvas');
        canvas.id = 'mapCanvas';
        mapContainer.appendChild(canvas);

        // 포인터를 맵에 추가
        data.pointer.forEach(pointer => {
            mapContainer.appendChild(createPointerElement(pointer));
        });

        renderLinks(data.pointer); // 포인터 간의 링크를 그림
    };

    // 경로를 계산하는 함수
    const calculateRoutes = data => {
        const routes = [];
        const startPointer = data.pointer.find(p => p.idx === 1); // 시작 포인터를 찾음
        if (!startPointer) return;

        // 재귀적으로 경로를 탐색하는 함수
        const traverse = (current, path, distance) => {
            if (current.idx === 6) { // 목적지에 도달한 경우
                routes.push({ path: [...path, current.idx], distance });
                return;
            }
            current.link.forEach(linkIdx => {
                if (!path.includes(linkIdx)) { // 이미 방문한 포인터를 제외
                    const nextPointer = data.pointer.find(p => p.idx === linkIdx);
                    if (nextPointer) {
                        const dist = Math.hypot(nextPointer.location[0] - current.location[0], nextPointer.location[1] - current.location[1]);
                        traverse(nextPointer, [...path, current.idx], distance + dist);
                    }
                }
            });
        };

        traverse(startPointer, [], 0); // 경로 탐색 시작
        routes.sort((a, b) => a.distance - b.distance); // 경로를 거리 기준으로 정렬
        renderRouteList(routes.slice(0, 5)); // 상위 5개의 경로만 선택 후 렌더링
    };

    // 경로 목록을 렌더링하는 함수
    const renderRouteList = routes => {
        const routeList = document.getElementById('routeList');
        routeList.innerHTML = ''; // 경로 목록을 초기화

        // 각 경로를 목록에 추가
        routes.forEach(route => {
            const listItem = document.createElement('div');
            listItem.className = 'route-item';
            const time = (route.distance / currentSpeed).toFixed(2);
            listItem.innerHTML = `경로: ${route.path.join(' -> ')}<br>이동시간: ${convertTime(time)}<br>이동거리: ${route.distance.toFixed(2)}m`;
            listItem.addEventListener('click', () => {
                highlightRoute(route.path); // 경로를 클릭하면 해당 경로를 하이라이트
            });
            routeList.appendChild(listItem);
        });
    };

    // 시간을 변환하는 함수
    const convertTime = time => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.round(time % 60);
        return `${minutes}분 ${seconds}초`;
    };

    // 경로를 하이라이트하는 함수
    const highlightRoute = path => {
        renderMap(mapData[currentCourseIndex]);
        renderLinks(mapData[currentCourseIndex].pointer, path);
    };

    // 코스를 변경하는 이벤트 핸들러
    const handleCourseChange = event => {
        const index = event.target.id.slice(-1) - 1; // 코스 인덱스를 추출
        currentCourseIndex = index;
        renderMap(mapData[index]); // 선택된 코스를 렌더링
        calculateRoutes(mapData[index]); // 선택된 코스의 경로를 계산
    };

    // 이동 속도를 변경하는 이벤트 핸들러
    const handleTabChange = event => {
        currentSpeed = event.target.id === 'move01' ? 3 : 10; // 탭 메뉴에 따라 이동 속도 변경
        calculateRoutes(mapData[currentCourseIndex]); // 현재 코스의 경로를 다시 계산
    };

    // 코스 변경 이벤트 리스너를 추가
    ['festa01', 'festa02', 'festa03'].forEach(id => {
        document.getElementById(id).addEventListener('change', handleCourseChange);
    });

    // 탭 메뉴 변경 이벤트 리스너를 추가
    ['move01', 'move02'].forEach(id => {
        document.getElementById(id).addEventListener('change', handleTabChange);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    let mapData;

    fetch('course.json')
        .then(response => response.json())
        .then(data => {
            mapData = data;
            renderMap(mapData[0]);  // 첫 번째 지도 렌더링
        })
        .catch(error => console.error('Error fetching the JSON:', error));

    const createPointerElement = pointer => {
        const pointerElement = document.createElement('div');
        pointerElement.className = 'pointer';
        pointerElement.style.left = `${pointer.location[0]}px`;
        pointerElement.style.top = `${pointer.location[1]}px`;
        pointerElement.textContent = pointer.idx;  // 포인터의 idx 값을 텍스트로 추가
        return pointerElement;
    };

    const renderLinks = pointers => {
        const canvas = document.getElementById('mapCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = document.getElementById('mapContainer').offsetWidth;
        canvas.height = document.getElementById('mapContainer').offsetHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화
        ctx.strokeStyle = '#111';
        ctx.lineWidth = 5;

        pointers.forEach(pointer => {
            pointer.link.forEach(linkIdx => {
                const targetPointer = pointers.find(p => p.idx === linkIdx);
                if (targetPointer) {
                    ctx.beginPath();
                    ctx.moveTo(pointer.location[0] + 10, pointer.location[1] + 10); // 포인터의 중앙으로 이동
                    ctx.lineTo(targetPointer.location[0] + 10, targetPointer.location[1] + 10); // 타겟 포인터의 중앙으로 이동
                    ctx.stroke();
                }
            });
        });
    };

    const renderMap = data => {
        const mapContainer = document.getElementById('mapContainer');
        mapContainer.innerHTML = '';  // 이전 포인터 제거
        const canvas = document.createElement('canvas');
        canvas.id = 'mapCanvas';
        mapContainer.appendChild(canvas);

        data.pointer.forEach(pointer => {
            mapContainer.appendChild(createPointerElement(pointer));
        });

        renderLinks(data.pointer); // 링크 그리기
    };

    const handleCourseChange = event => {
        const index = event.target.id.slice(-1) - 1;
        renderMap(mapData[index]);
    };

    ['course01', 'course02', 'course03'].forEach(id => {
        document.getElementById(id).addEventListener('change', handleCourseChange);
    });
});

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
        return pointerElement;
    };

    const renderMap = data => {
        const mapContainer = document.getElementById('mapContainer');
        mapContainer.innerHTML = '';  // 이전 포인터 제거
        data.pointer.forEach(pointer => {
            mapContainer.appendChild(createPointerElement(pointer));
        });
    };

    const handleCourseChange = event => {
        const index = event.target.id.slice(-1) - 1;
        renderMap(mapData[index]);
    };

    ['course01', 'course02', 'course03'].forEach(id => {
        document.getElementById(id).addEventListener('change', handleCourseChange);
    });
});

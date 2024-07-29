document.addEventListener('DOMContentLoaded', function() {
    fetch('course.json')
        .then(response => response.json())
        .then(data => {
            renderMap(data[0]);  // 첫 번째 지도를 렌더링
        })
        .catch(error => console.error('Error fetching the JSON:', error));

    function createPointerElement(pointer) {
        const pointerElement = document.createElement('div');
        pointerElement.className = 'pointer';
        pointerElement.style.left = `${pointer.location[0]}px`;
        pointerElement.style.top = `${pointer.location[1]}px`;
        return pointerElement;
    }

    function renderMap(data) {
        const mapContainer = document.getElementById('mapContainer');
        data.pointer.forEach(pointer => {
            const pointerElement = createPointerElement(pointer);
            mapContainer.appendChild(pointerElement);
        });
    }
});
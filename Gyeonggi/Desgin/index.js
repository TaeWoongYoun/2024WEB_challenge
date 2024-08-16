document.addEventListener('DOMContentLoaded', () => {
    let mapData;
    let speed = 3;
    let courseIndex = 0;

    fetch('course.json')
        .then(response => response.json())
        .then(data => {
            mapData = data;
            renderMap(mapData[courseIndex]);
            calculateRoutes(mapData[courseIndex]);
        });

    const createPointer = pointer => {
        const pointerElement = document.createElement('div');
        pointerElement.className = 'pointer';
        pointerElement.style.left = `${pointer.location[0]}px`;
        pointerElement.style.top = `${pointer.location[1]}px`;
        pointerElement.textContent = pointer.idx;
        return pointerElement;
    }

    const renderLinks = (pointers, highlight = []) => {
        const canvas = document.getElementById('mapCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = document.getElementById('mapContainer').offsetWidth;
        canvas.height = document.getElementById('mapContainer').offsetHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

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

        if (highlight.length > 0) {
            ctx.beginPath();
            for (let i = 0; i < highlight.length - 1; i++) {
                const start = pointers.find(p => p.idx === highlight[i]);
                const end = pointers.find(p => p.idx === highlight[i + 1]);
                if (start && end) {
                    ctx.moveTo(start.location[0] + 15, start.location[1] + 15);
                    ctx.lineTo(end.location[0] + 15, end.location[1] + 15);
                }
            }
            ctx.strokeStyle = '#FF0000';
            ctx.lineWidth = 5;
            ctx.stroke();
        }
    };

    const renderMap = data => {
        const mapContainer = document.getElementById('mapContainer');
        mapContainer.innerHTML = '';
        const canvas = document.createElement('canvas');
        canvas.id = 'mapCanvas';

        mapContainer.appendChild(canvas);

        data.pointer.forEach(pointer => {
            mapContainer.appendChild(createPointer(pointer));
        });
        renderLinks(data.pointer);
    };

    const calculateRoutes = data => {
        const routes = [];
        const startPointer = data.pointer.find(p => p.idx === 1);
        if (!startPointer) return;

        const traverse = (current, path, distance) => {
            if (current.idx === 6) {
                routes.push({ path: [...path, current.idx], distance });
                return;
            }
            current.link.forEach(linkIdx => {
                if(!path.includes(linkIdx)){
                    const nextPointer = data.pointer.find(p => p.idx === linkIdx);
                    if (nextPointer) {
                        const dist = Math.hypot(nextPointer.location[0] - current.location[0], nextPointer.location[1] - current.location[1]);
                        traverse(nextPointer, [...path, current.idx], distance + dist);
                    }
                }
            });
        };

        traverse(startPointer, [], 0);
        routes.sort((a,b) => a.distance - b.distance);
        renderRouteList(routes.slice(0, 5));
    };
    
    const renderRouteList = routes => {
        const routeList = document.getElementById('routeList');
        routeList.innerHTML = '';
        routes.forEach(route => {
            const listItem = document.createElement('div');
            listItem.className = 'route-item';
            const time = (route.distance / speed).toFixed(2);
            listItem.innerHTML = `경로: ${route.path.join(' -> ')}<br>이동시간: ${convertTime(time)}<br>이동거리: ${route.distance.toFixed(2)}m`;
            listItem.addEventListener('click', () => {
                highlightRoute(route.path);
            });
            routeList.appendChild(listItem);
        });
    };

    const convertTime = time => {
        const min = Math.floor(time / 60);
        const sec = Math.round(time % 60);
        return `${min}분 ${sec}초`;
    };

    const highlightRoute = path => {
        renderMap(mapData[courseIndex]);
        renderLinks(mapData[courseIndex].pointer, path);
    };

    const handleCourseChange = event => {
        const index = event.target.id.slice(-1) - 1;
        courseIndex = index;
        renderMap(mapData[index]);
        calculateRoutes(mapData[index]);
    };

    const handleTabChange = event => {
        speed = event.target.id === 'move01' ? 3 : 10;
        calculateRoutes(mapData[courseIndex]);
    };

    ['festa01', 'festa02', 'festa03'].forEach(id => {
        document.getElementById(id).addEventListener('change', handleCourseChange);
    });

    ['move01', 'move02'].forEach(id => {
        document.getElementById(id).addEventListener('change', handleTabChange);
    });
});
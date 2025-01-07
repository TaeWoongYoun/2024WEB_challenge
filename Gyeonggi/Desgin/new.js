document.addEventListener('DOMContentLoaded', () => {
    let mapData, speed = 3, courseIndex = 0;

    fetch('course.json')
        .then(response => response.json())
        .then(data => {
            mapData = data;
            renderMap(mapData[courseIndex]); 
            calculateRoutes(mapData[courseIndex]);
        });

    const createPointer = ({location: [x, y], idx}) => Object.assign(document.createElement('div'), {
        className: 'pointer', style: `left: ${x}px; top: ${y}px`, textContent: idx
    });

    const renderLinks = (pointers, highlight = []) => {
        const ctx = (document.getElementById('mapCanvas').getContext('2d'));
        Object.assign(ctx.canvas, {width: document.getElementById('mapContainer').offsetWidth, height: document.getElementById('mapContainer').offsetHeight});
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        pointers.forEach(p => p.link.forEach(l => {
            const t = pointers.find(p => p.idx === l);
            t && (ctx.beginPath(), ctx.moveTo(p.location[0] + 15, p.location[1] + 15), 
            ctx.lineTo(t.location[0] + 15, t.location[1] + 15), 
            Object.assign(ctx, {strokeStyle: '#111', lineWidth: 5}).stroke());
        }));

        highlight.length && (ctx.beginPath(), highlight.slice(0, -1).forEach((h, i) => {
            const [s, e] = [pointers.find(p => p.idx === h), pointers.find(p => p.idx === highlight[i + 1])];
            s && e && (ctx.moveTo(s.location[0] + 15, s.location[1] + 15), 
            ctx.lineTo(e.location[0] + 15, e.location[1] + 15));
        }), Object.assign(ctx, {strokeStyle: '#FF0000', lineWidth: 5}).stroke());
    };

    const renderMap = data => {
        const m = document.getElementById('mapContainer');
        m.innerHTML = '<canvas id="mapCanvas"></canvas>';
        data.pointer.forEach(p => m.appendChild(createPointer(p)));
        renderLinks(data.pointer);
    };

    const calculateRoutes = data => {
        const routes = [], traverse = (c, p = [], d = 0) => {
            c.idx === 6 ? routes.push({path: [...p, c.idx], distance: d}) :
            c.link.forEach(l => {
                !p.includes(l) && data.pointer.find(n => n.idx === l) && 
                traverse(data.pointer.find(n => n.idx === l), [...p, c.idx], 
                d + Math.hypot(data.pointer.find(n => n.idx === l).location[0] - c.location[0], 
                data.pointer.find(n => n.idx === l).location[1] - c.location[1]));
            });
        };
        traverse(data.pointer.find(p => p.idx === 1));
        renderRouteList(routes.sort((a,b) => a.distance - b.distance).slice(0, 5));
    };

    const renderRouteList = r => {
        const l = document.getElementById('routeList');
        l.innerHTML = '';
        r.forEach(r => {
            const i = document.createElement('div');
            i.className = 'route-item';
            const t = (r.distance / speed).toFixed(2);
            i.innerHTML = `경로: ${r.path.join('→')}<br>이동시간: ${~~(t/60)}분${Math.round(t%60)}초<br>이동거리: ${r.distance.toFixed(2)}m`;
            i.addEventListener('click', () => (renderMap(mapData[courseIndex]), renderLinks(mapData[courseIndex].pointer, r.path)));
            l.appendChild(i);
        });
    };

    ['festa01', 'festa02', 'festa03'].forEach(id => 
        document.getElementById(id).addEventListener('change', e => 
            (courseIndex = e.target.id.slice(-1) - 1, renderMap(mapData[courseIndex]), 
            calculateRoutes(mapData[courseIndex]))));

    ['move01', 'move02'].forEach(id => 
        document.getElementById(id).addEventListener('change', e => 
            (speed = e.target.id === 'move01' ? 3 : 10, calculateRoutes(mapData[courseIndex]))));
});
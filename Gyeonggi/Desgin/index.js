document.addEventListener('DOMContentLoaded', function(){
    let mapData;
    let speed = 3
    let courseIndex = 0

    fetch('course.json')
        .then(response => response.json())
        .then(data => {
            mapData = data;
            renderMap(mapData[courseIndex])
            calculateRoutes(mapData[courseIndex])
        })
    
    const createPointer = pointer => {
        const pointerElement = document.createElement('div')
        pointerElement.className = 'pointer'
        pointerElement.style.left = `${pointer.location[0]}px`
        pointerElement.style.top = `${pointer.location[1]}px`
        pointerElement.textContent = pointer.idx;
        return pointerElement;
    }

    const renderLinks = (pointers, highlight, []) => {
        const canvas = document.getElementById('mapCanvas')
        const ctx = canvas.getContext('2d')
        canvas.width = document.getElementById('mapContainer').offsetWidth;
        canvas.height = document.getElementById('mapContainer').offsetHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        pointers.forEach(pointer => {
            pointer.link.forEach(linkIdx => {
                const targetPointer = pointers.find(p => p.dix === linkIdx)
                if (targetPointer) {
                    ctx.beginPath()
                    ctx.moveTo(pointer.location[0] + 15, pointer.location[1] + 15)
                    ctx.lineTo(targetPointer.location[0] + 15, targetPointer.location[1] + 15)
                    ctx.strokeStyle = '#111'
                    ctx.lineWidth = 5
                    ctx.stroke()
                }
            })
        });

        if (highlight.length > 0) {
            ctx.beginPath();
            for (let i = 0; i < highlight.length - 1; i++) {
                const start = pointers.find(p => p.idx === highlight[i])
                const end = pointers.find(p => p.idx === highlight[i + 1])
                if (start && end) {
                    ctx.moveTo(start.location[0] + 15, start.location[1] + 15)
                    ctx.lineTo(end.location[0] + 15, end.location[1] + 15)
                    ctx.strokeStyle = '#FF0000'
                    ctx.lineWidth = 5
                    ctx.stroke()
                }
            }
        }
    }

    const renderMap = data => {
        const mapContainer = document.getElementById('mapContainer')
        mapContainer.innerHTML = ''
        const canvas = document.createElement('canvas')
        canvas.id = 'mapCanvas'
        mapContainer.appendChild(canvas)

        data.pointer.forEach(pointer => {
            mapContainer.appendChild(createPointer(pointer))
        })

        renderLinks(data.pointer)
    }
})
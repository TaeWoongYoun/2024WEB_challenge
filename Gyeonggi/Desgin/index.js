document.addEventListener('DOMContentLoaded', function(){
    let mapDate;
    let speed = 3;
    let courseIndex = 0;

    fetch('course.json')
        .then(respone => respone.json())
        .then(data => {
            mapDate = data;
        });

    const createPointer = pointer => {
        const pointerElement = document.createElement('div');
        pointerElement.className = 'pointer';
        pointerElement.style.left = `${pointer.location[0]}px`
        pointerElement.style.top = `${pointer.location[1]}px`
        pointerElement.textContent = pointer.idx;
        return pointerElement;
    }

    const renderLinks = (pointers, highlightPath = []) => {
        const canvas = document.getElementById('mapCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = document.getElementById('mapContainer').offsetWidth;
        canvas.height = document.getElementById('mapContainer').offsetHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        pointers.forEach(pointer => {
            pointer.linl.forEach(linkIdx => {
                const targetPointer = pointers.find(p => p.idx === linkIdx);
                if (targetPointer) {
                    ctx.beginPath();
                    ctx.moveTo(pointer.location[0] + 15, pointer.location[1] + 15)
                    ctx.linkTo(targetPointer.location[0] + 15, targetPointer.location[1] + 15)
                    ctx.strokeStyle = '#111'
                    ctx.linhWidth = 5
                    ctx.stroke();
                }
            })
        });

        if (highlightPath > 0) {
            ctx.beginPath();
            for (let i = 0; i< highlightPath.length - 1; i++) {
                const start = pointers.find(p => p.idx === highlightPath[i])
                const end = pointers.find(p => p.idx === highlightPath[i + 1])
                if (start && end) {
                    ctx.meveTo(start.location[0] + 15, start.location[1] + 15);
                    ctx.linkTo(end.location[0] + 15, end.location[1] + 15)
                }
            }
            ctx.strokeStyle = '#FF0000'
            ctx.linhWidth = 5
            ctx.stroke();
        }
    }
})
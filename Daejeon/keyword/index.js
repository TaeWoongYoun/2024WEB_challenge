document.addEventListener("DOMContentLoaded", function() {
    let wordColors = {};
    let activeWords = [];

    fetch('keywords.json')
        .then(response => response.json())
        .then(jsonData => {
            const dataArray = jsonData.data;

            activeWords = dataArray.map(item => item.word);

            createWordCloud(dataArray);
            createTable(dataArray);
        });

    function createWordCloud(data) {
        const container = document.getElementById('word-cloud');
        const centerX = container.offsetWidth / 2.2;
        const centerY = container.offsetHeight / 2.2;
        let angle = 0;
        let radius = 1;
        const step = 15;
        const fontSizeStep = 2;
        const maxFontSize = 64;

        const activeData = data.filter(item => activeWords.includes(item.word));
        activeData.sort((a, b) => b.frequency - a.frequency);

        container.innerHTML = '';

        activeData.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'word';
            div.style.fontSize = `${maxFontSize - index * fontSizeStep}px`;
            div.innerText = item.word;

            div.style.color = wordColors[item.word] || (wordColors[item.word] = getRandomColor());

            div.addEventListener('mouseover', event => showPopup(item.frequency, event.clientX, event.clientY));
            div.addEventListener('mouseout', hidePopup);

            let x, y;
            do {
                angle += step;
                radius += 0.5;
                x = centerX + radius * Math.cos(angle * Math.PI / 180);
                y = centerY + radius * Math.sin(angle * Math.PI / 180);
            } while (checkOverlap(container, div, x, y));
            
            div.style.left = `${x}px`;
            div.style.top = `${y}px`;
            container.appendChild(div);
        });
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function checkOverlap(container, element, x, y) {
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        container.appendChild(element);

        const isOverlapping = [...container.children].some(child => {
            if (child === element) return false;
            const rect1 = child.getBoundingClientRect();
            const rect2 = element.getBoundingClientRect();
            return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
        });
        container.removeChild(element);
        return isOverlapping;
    }

    function showPopup(frequency, x, y) {
        const popup = document.getElementById('popup');
        popup.innerText = `빈도수: ${frequency}`;
        popup.style.left = `${x}px`;
        popup.style.top = `${y}px`;
        popup.style.display = 'block';
    }

    function hidePopup() {
        document.getElementById('popup').style.display = 'none';
    }

    function createTable(data) {
        const container = document.getElementById('table-container');
        const table = document.createElement('table');
        table.innerHTML = `
            <tr>
                <th></th>
                <th>키워드</th>
                <th>빈도수</th>
            </tr>
        `;
        
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><input type="checkbox" ${activeWords.includes(item.word) ? 'checked' : ''}></td>
                <td style="color: ${wordColors[item.word] || getRandomColor()}">${item.word}</td>
                <td>${item.frequency}</td>
            `;
            
            const checkbox = row.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', function() {
                if (!checkbox.checked && activeWords.length <= 15) {
                    checkbox.checked = true;
                    alert("리스트는 최소 15개 이상이여야 합니다.");
                    return;
                }

                if (checkbox.checked) {
                    activeWords.push(item.word);
                } else {
                    activeWords = activeWords.filter(word => word !== item.word);
                }

                createWordCloud(data);
            });

            table.appendChild(row);
        });

        container.innerHTML = '';
        container.appendChild(table);
    }
});

document.addEventListener("DOMContentLoaded", function() {
    let wordColors = {};
    let activeWords = [];

    fetch('keywords.json')
        .then(response => response.json())
        .then(jsonData => {
            const dataArray = jsonData.data;
            
            // 초기 activeWords 설정
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

        data.sort((a, b) => b.frequency - a.frequency);

        container.innerHTML = ''; // Clear previous words

        data.forEach((item, index) => {
            if (!activeWords.includes(item.word)) return;

            const div = document.createElement('div');
            div.className = 'word';
            div.style.fontSize = `${maxFontSize - index * fontSizeStep}px`;
            div.innerText = item.word;

            const color = wordColors[item.word] || getRandomColor();
            wordColors[item.word] = color;
            div.style.color = color;

            div.addEventListener('mouseover', function(event) {
                showPopup(item.frequency, event.clientX, event.clientY);
            });
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
        popup.innerText = `Frequency: ${frequency}`;
        popup.style.left = `${x}px`;
        popup.style.top = `${y}px`;
        popup.style.display = 'block';
    }

    function hidePopup() {
        const popup = document.getElementById('popup');
        popup.style.display = 'none';
    }

    function createTable(data) {
        const container = document.getElementById('table-container');
        const table = document.createElement('table');
        const headerRow = document.createElement('tr');
        const headerWord = document.createElement('th');
        headerWord.innerText = 'Word';
        const headerFrequency = document.createElement('th');
        headerFrequency.innerText = 'Frequency';
        const headerCheckbox = document.createElement('th');
        headerCheckbox.innerText = 'Show/Hide';

        headerRow.appendChild(headerWord);
        headerRow.appendChild(headerFrequency);
        headerRow.appendChild(headerCheckbox);
        table.appendChild(headerRow);

        data.forEach(item => {
            const row = document.createElement('tr');
            const wordCell = document.createElement('td');
            wordCell.innerText = item.word;
            wordCell.style.color = wordColors[item.word] || getRandomColor();

            const freqCell = document.createElement('td');
            freqCell.innerText = item.frequency;

            const checkboxCell = document.createElement('td');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = activeWords.includes(item.word);

            checkbox.addEventListener('change', function() {
                if (!checkbox.checked && activeWords.length <= 15) {
                    checkbox.checked = true;
                    alert("At least 15 words must be shown.");
                    return;
                }

                if (checkbox.checked) {
                    activeWords.push(item.word);
                } else {
                    activeWords = activeWords.filter(word => word !== item.word);
                }

                createWordCloud(data);
            });

            checkboxCell.appendChild(checkbox);
            row.appendChild(wordCell);
            row.appendChild(freqCell);
            row.appendChild(checkboxCell);
            table.appendChild(row);
        });

        container.innerHTML = '';
        container.appendChild(table);
    }
});
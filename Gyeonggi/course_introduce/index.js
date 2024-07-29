const tabMenu = document.querySelectorAll('.tab_menu li');
for (let i = 0; i < tabMenu.length; i++) {
    tabMenu[i].querySelector('.btn').addEventListener('click', function(e) {
        e.preventDefault();
        for (let j = 0; j < tabMenu.length; j++) {
            tabMenu[j].classList.remove('on');
        }
        this.parentNode.classList.add('on');
    });
}
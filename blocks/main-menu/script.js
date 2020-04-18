const mobileMenu = {
    menu: document.querySelector('.main-menu'),
    dropdownSelector: '.main-menu__dropdown',

    toggleDropDown: function(dropDown) {
        dropDown.classList.toggle('--is-active');
    },

    init: function () {
        this.menu.addEventListener('click', function (e) {
            const dropDown = e.target.closest(mobileMenu.dropdownSelector);
            if (dropDown) {
                mobileMenu.toggleDropDown(dropDown);
            }

        });
    }
};

mobileMenu.init();
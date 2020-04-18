class Tabs {
    constructor(tabContainer, tabPanelContainer) {
        this.tabContainer = document.querySelector(tabContainer);
        this.tabPanelContainer = document.querySelector(tabPanelContainer);

        this.setTabIndex();
        this.openTab(0);

        this.tabContainer.addEventListener('click', event => {
            const tab = event.target.closest('[data-tab-index]');
            if (tab === null)
                return false;
            const index = tab.dataset.tabIndex;

            this.openTab(index);
        });
    }

    /**
     * Проставляем индексы табов
     */
    setTabIndex() {
        const tabList = this.tabContainer.children;
        const tabPanelList = this.tabPanelContainer.children;
        let tabIndex = 0;

        for (let tab of tabList) {
            tab.setAttribute('data-tab-index', tabIndex);
            if (tabPanelList[tabIndex])
                tabPanelList[tabIndex].setAttribute('data-tabpanel-index', tabIndex);
            tabIndex ++;
        }
    }

    /**
     * Открываем таб с выбранным индексом
     * @param index
     */
    openTab(index) {
        const tabActive = this.tabContainer.querySelector('.--is-active');
        const tabPanelActive = this.tabPanelContainer.querySelector('.--is-active');

        if (tabActive)
            tabActive.classList.remove('--is-active');
        if (tabPanelActive)
            tabPanelActive.classList.remove('--is-active');

        this.tabContainer.querySelector(`[data-tab-index = "${index}"]`).classList.add('--is-active');
        this.tabPanelContainer.querySelector(`[data-tabpanel-index = "${index}"]`).classList.add('--is-active');
    }
}

const app = {
    pathToTemplate: '/local/templates/extrapla.st/', // Абсолютный путь до шаблона сайта

    /**
     * Для подгрузки svg-спрайта на сервере
     */
    svgLoad: function() {
        const ajax = new XMLHttpRequest();
        ajax.open("GET", app.pathToTemplate+"images/icons.svg", true);
        ajax.send();
        ajax.onload = function(e) {
            const svgDiv = document.createElement("div");
            svgDiv.style.display = "none";
            svgDiv.innerHTML = ajax.responseText;
            document.body.insertBefore(svgDiv, document.body.childNodes[0]);
        };
    },

    /**
     * Переключалка мобильного меню
     */
    burgerToggle: function() {
        const navBlock = document.querySelector('.js-nav');
        const body = document.querySelector('body');
        document.addEventListener('click', function (e) {
            if (e.target.closest('.js-burger')) {
                navBlock.classList.toggle('--is-active');
                body.classList.toggle('--no-scroll');
            }
        });
    },

    init: function() {
        this.burgerToggle();
        //this.svgLoad();
    }
};

app.init();
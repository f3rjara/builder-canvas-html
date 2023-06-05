const panel__items = document.querySelectorAll('.panel__item');
const submenus = document.querySelectorAll('.submenu');

const hiddenAllPanels = () => {
  panel__items.forEach( panel__item => {
    panel__item.classList.remove('active');
  });
}

const hiddenAllSubmenus = () => {
  submenus.forEach( submenu => {
    submenu.classList.remove('active');
  });
}

panel__items.forEach( panel__item => {
  panel__item.addEventListener('click', (event) => {
    hiddenAllPanels();
    hiddenAllSubmenus();
    const panel__item__active = event.currentTarget;
    panel__item__active.classList.add('active');
    const dataControl = panel__item__active.dataset.control;
    const submenu__active = document.querySelector(`.menu__${dataControl}`);
    submenu__active.classList.add('active');
  });
});
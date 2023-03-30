import { disableScroll } from '../functions/disable-scroll';
import { enableScroll } from '../functions/enable-scroll';
import { isBig } from '../functions/check-viewport';

(function(){
  const burger = document?.querySelector('[data-burger]');
  const menu = document?.querySelector('[data-menu]');
  const menuItems = document?.querySelectorAll('[data-menu-item]');
  const overlay = document?.querySelector('[data-menu-overlay]');

  burger?.addEventListener('click', (e) => {
    burger?.classList.toggle('burger__active');
    menu?.classList.toggle('header-mobile__active');

    if (menu?.classList.contains('header-mobile__active')) {
      burger?.setAttribute('aria-expanded', 'true');
      burger?.setAttribute('aria-label', 'Закрыть меню');
      disableScroll();
    } else {
      burger?.setAttribute('aria-expanded', 'false');
      burger?.setAttribute('aria-label', 'Открыть меню');
      enableScroll();
    }
  });

  window.addEventListener('resize', () => {
    if (isBig()) {
      burger?.classList.remove('burger__active');
      menu?.classList.remove('header-mobile__active');
      enableScroll();
    }
  })

  // overlay?.addEventListener('click', () => {
  //   burger?.setAttribute('aria-expanded', 'false');
  //   burger?.setAttribute('aria-label', 'Открыть меню');
  //   burger.classList.remove('burger--active');
  //   menu.classList.remove('header-mobile__active');
  //   enableScroll();
  // });

  // menuItems?.forEach(el => {
  //   el.addEventListener('click', () => {
  //     burger?.setAttribute('aria-expanded', 'false');
  //     burger?.setAttribute('aria-label', 'Открыть меню');
  //     burger.classList.remove('burger--active');
  //     menu.classList.remove('header-mobile__active');
  //     enableScroll();
  //   });
  // });
})();

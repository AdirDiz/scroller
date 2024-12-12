function initMyScroller(selector, options) {
  const scrollers = document.querySelectorAll(selector);

  // Проверка на системное отключение анимаций
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    console.log("Анимации отключены на уровне системы. Скрипт не запускается.");
    return; // Не инициализируем анимации
  }

  addAnimation(scrollers, options);

  function addAnimation(scrollers, options) {
    scrollers.forEach((scroller) => {
      scroller.setAttribute("data-animated", true);

      // Проверка наличия параметров и применение стилей
      if (options?.speed) {
        scroller.style.setProperty('--_animation-duration', `${options.speed}ms`);
      }

      if (options?.direction) {
        const animationDirection = options.direction === 'right' ? 'reverse' : 'forwards';
        scroller.style.setProperty('--_animation-direction', animationDirection);
      }

      if (options?.columnGap) {
        scroller.querySelector(".scroller-wrapper").style.gridColumnGap = `${options.columnGap}rem`;
        const translationValue = `calc(-50% - ${options.columnGap / 2}rem)`;
        scroller.style.setProperty('--_translation-value', translationValue);
      }

      let duplicates = options?.duplicates > 0 ? options.duplicates : 1;

      const scrollerWrapper = scroller.querySelector(".scroller-wrapper");
      const scrollerContent = Array.from(scrollerWrapper.children);

      for (let i = 0; i < duplicates; i++) {
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute("aria-hidden", true);
          scrollerWrapper.appendChild(duplicatedItem);
        });
      }
    });
  }
}

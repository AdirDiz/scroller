function initMyScroller(selector, options) {
  const scrollers = document.querySelectorAll(selector);

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation(scrollers, options);
  }

  function addAnimation(scrollers, options) {
    scrollers.forEach((scroller) => {
      scroller.setAttribute("data-animated", true);

      // Check if the speed option is present in the parameter object
      if (options && options.speed) {
        const speed = options.speed;
        scroller.style.setProperty('--_animation-duration', speed + 'ms');
      }

      // Check if the direction option is present in the parameter object
      if (options && options.direction) {
        const direction = options.direction;
        const animationDirection = direction === 'right' ? 'reverse' : 'forwards';
        scroller.style.setProperty('--_animation-direction', animationDirection);
      }

      // Check if the columnGap option is present in the parameter object
      if (options && options.columnGap) {
        const columnGap = options.columnGap;
        scroller.querySelector(".scroller-wrapper").style.gridColumnGap = columnGap + 'rem';
        const translationValue = `calc(-50% - ${columnGap / 2}rem)`;
        scroller.style.setProperty('--_translation-value', translationValue);
      }

      // Check if the duplicates option is present in the parameter object
      let duplicates = 1;
      if (options && options.duplicates && options.duplicates > 0) {
        duplicates = options.duplicates;
      }

      // Duplicate the contents of .scroller-wrapper
      const scrollerWrapper = scroller.querySelector(".scroller-wrapper");
      const scrollerContent = Array.from(scrollerWrapper.children);

      // Create a copy of the scrollerContent array
      const scrollerContentCopy = scrollerContent.slice();

      // Add copied elements to .scroller-wrapper
      for (let i = 0; i < duplicates; i++) {
        scrollerContentCopy.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute("aria-hidden", true);
          scrollerWrapper.appendChild(duplicatedItem);
        });
      }
    });
  }
}

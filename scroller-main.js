function initMyScroller(n, t) {
  function r(n, t) {
    n.forEach(n => {
      if (n.setAttribute("data-animated", !0), t && t.speed) {
        const i = t.speed;
        n.style.setProperty("--_animation-duration", i + "s")
      }
      if (t && t.direction) {
        const i = t.direction,
              r = i === "right" ? "reverse" : "forwards";
        n.style.setProperty("--_animation-direction", r)
      }
      if (t && t.columnGap) {
        const i = t.columnGap;
        n.querySelector(".scroller-wrapper").style.gridColumnGap = i + "rem";
        const r = calc(-50% - ${i / 2}rem);
        n.style.setProperty("--_translation-value", r)
      }
      let i = 1;
      t && t.duplicates && t.duplicates > 0 && (i = t.duplicates);
      const r = n.querySelector(".scroller-wrapper"),
            u = Array.from(r.children),
            f = u.slice();
      for (let n = 0; n < i; n++) f.forEach(n => {
        const t = n.cloneNode(!0);
        t.setAttribute("aria-hidden", !0);
        r.appendChild(t);

        if (t.tagName === "VIDEO") {
          t.onloadeddata = function() {
            t.play();
          };
        }
      })
    })
  }
  const i = document.querySelectorAll(n);
  //window.matchMedia("(prefers-reduced-motion: reduce)").matches || r(i, t)
   r(i, t)
}

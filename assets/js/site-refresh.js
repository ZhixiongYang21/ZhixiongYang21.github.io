(function () {
  "use strict";

  var root = document.documentElement;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealItems = Array.prototype.slice.call(document.querySelectorAll(".reveal-on-scroll"));
  var masthead = document.querySelector(".masthead");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll("[data-section]"));
  var hero = document.querySelector(".hero-section");
  var heroVisual = document.querySelector(".hero-visual");

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.setAttribute("target", "_self");
  });

  document.querySelectorAll('a[href^="http"]').forEach(function (link) {
    link.setAttribute("rel", "noopener noreferrer");
  });

  if (!reducedMotion && "IntersectionObserver" in window) {
    root.classList.add("motion-ready");

    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.08
    });

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  function updateMasthead() {
    if (masthead) {
      masthead.classList.toggle("is-scrolled", window.scrollY > 18);
    }
  }

  updateMasthead();
  window.addEventListener("scroll", updateMasthead, { passive: true });

  if ("IntersectionObserver" in window && navLinks.length) {
    var sections = navLinks.map(function (link) {
      return document.getElementById(link.getAttribute("data-section"));
    }).filter(Boolean);

    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        navLinks.forEach(function (link) {
          var active = link.getAttribute("data-section") === entry.target.id;
          link.classList.toggle("is-active", active);
          if (active) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    }, {
      rootMargin: "-25% 0px -65% 0px",
      threshold: 0
    });

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  if (hero && heroVisual && !reducedMotion && window.matchMedia("(pointer: fine)").matches) {
    var frameRequested = false;
    var pointerX = 0;
    var pointerY = 0;

    hero.addEventListener("pointermove", function (event) {
      var bounds = hero.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 10;
      pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 8;

      if (!frameRequested) {
        frameRequested = true;
        window.requestAnimationFrame(function () {
          heroVisual.style.setProperty("--hero-x", pointerX.toFixed(2) + "px");
          heroVisual.style.setProperty("--hero-y", pointerY.toFixed(2) + "px");
          frameRequested = false;
        });
      }
    });

    hero.addEventListener("pointerleave", function () {
      heroVisual.style.setProperty("--hero-x", "0px");
      heroVisual.style.setProperty("--hero-y", "0px");
    });
  }
}());

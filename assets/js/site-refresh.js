(function () {
  "use strict";

  function markExternalLinks() {
    var links = document.querySelectorAll("a[href]");

    Array.prototype.forEach.call(links, function (link) {
      var href = link.getAttribute("href");

      if (!href || !/^https?:\/\//i.test(href)) return;

      var parsed = document.createElement("a");
      parsed.href = href;

      if (parsed.host && parsed.host !== window.location.host) {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
      }
    });
  }

  function initSectionNavigation() {
    var masthead = document.querySelector(".masthead");
    var links = document.querySelectorAll("#site-nav a[href*='#']");
    var items = [];
    var ticking = false;

    Array.prototype.forEach.call(links, function (link) {
      var hash = link.hash;
      var target;
      var section;

      if (!hash) return;

      target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;

      section = target.classList.contains("anchor") && target.nextElementSibling
        ? target.nextElementSibling
        : target;

      items.push({ link: link, section: section });
    });

    if (!items.length) return;

    items.sort(function (first, second) {
      return first.section.compareDocumentPosition(second.section) & Node.DOCUMENT_POSITION_FOLLOWING
        ? -1
        : 1;
    });

    function setActiveItem(activeItem) {
      items.forEach(function (item) {
        var isActive = item === activeItem;
        item.link.classList.toggle("is-active", isActive);

        if (isActive) {
          item.link.setAttribute("aria-current", "location");
        } else {
          item.link.removeAttribute("aria-current");
        }
      });
    }

    function updateActiveItem() {
      var offset = (masthead ? masthead.offsetHeight : 0) + 32;
      var activeItem = items[0];

      items.forEach(function (item) {
        if (item.section.getBoundingClientRect().top <= offset) {
          activeItem = item;
        }
      });

      if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 2) {
        activeItem = items[items.length - 1];
      }

      setActiveItem(activeItem);
      ticking = false;
    }

    function requestUpdate() {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveItem);
        ticking = true;
      }
    }

    updateActiveItem();
    window.addEventListener("scroll", requestUpdate, false);
    window.addEventListener("resize", requestUpdate, false);
    window.addEventListener("load", requestUpdate, false);
  }

  function init() {
    markExternalLinks();
    initSectionNavigation();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

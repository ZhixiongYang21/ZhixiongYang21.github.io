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

  function initVisitorStats() {
    var container = document.querySelector("[data-visitor-stats]");
    if (!container) return;

    var totalElement = container.querySelector("[data-visitors-total]");
    var todayElement = container.querySelector("[data-visitors-today]");
    var siteId = container.getAttribute("data-histats-site-id");
    if (!totalElement || !todayElement || !siteId) return;

    var attempts = 0;
    var timer;

    function readCount(field) {
      if (typeof field !== "string") return null;
      var equals = field.indexOf("=");
      if (equals < 1) return null;
      var value = field.slice(equals + 1).trim();
      // Histats supplies full integers, not the shortened text painted on a canvas.
      if (!/^(?:\d+|\d{1,3}(?:[,\s\u00a0]\d{3})+)$/.test(value)) return null;
      var number = Number(value.replace(/[,\s\u00a0]/g, ""));
      return isFinite(number) && number <= 9007199254740991 ? number : null;
    }

    function update() {
      var stats = window.Histats;
      // Read the same response as the original widget; do not send another hit.
      // In Histats' eight-field mask, positions 3 and 4 are today's and total UV.
      // These runtime fields are provider-specific; fail closed if they change.
      if (!stats || String(stats.s_id) !== siteId || !stats.s_asc2) return false;
      var today = readCount(stats.s_asc2[3]);
      var total = readCount(stats.s_asc2[4]);
      if (today === null || total === null || total < today) return false;

      totalElement.textContent = total.toLocaleString("en-US");
      todayElement.textContent = today.toLocaleString("en-US");
      container.setAttribute("aria-busy", "false");
      container.removeAttribute("title");
      return true;
    }

    if (update()) return;

    timer = window.setInterval(function () {
      attempts += 1;
      if (update()) {
        window.clearInterval(timer);
      } else if (attempts >= 120) {
        window.clearInterval(timer);
        // Leave em dashes instead of inventing zeroes when tracking is blocked.
        container.setAttribute("aria-busy", "false");
        container.setAttribute("title", "Visitor statistics are temporarily unavailable");
      }
    }, 250);
  }

  function init() {
    markExternalLinks();
    initSectionNavigation();
    initVisitorStats();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

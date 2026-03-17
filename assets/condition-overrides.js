(function () {
  var dataset = window.__POULIN_CONDITION_ARTICLES__;
  var ACTIVE_CONDITION = null;
  var ACTIVE_PANEL = null;
  var OBSERVER = null;
  var ROUTE_HOOKED = false;

  if (!dataset || !dataset.articles || !dataset.aliases) {
    return;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function normalizeConditionName(name) {
    var key = dataset.aliases[(name || "").trim()];
    return key || null;
  }

  function slugifyConditionName(name) {
    return String(name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function getConditionByName(name) {
    var key = normalizeConditionName(name);
    return key ? dataset.articles[key] || null : null;
  }

  function getConditionFromHref(href) {
    if (!href || href.indexOf("ConditionDetail?") === -1) {
      return null;
    }

    try {
      var parsed = new URL(href, window.location.origin);
      return parsed.searchParams.get("name") || "";
    } catch (error) {
      return null;
    }
  }

  function isConditionsRoute() {
    return window.location.pathname.indexOf("/Conditions") === 0;
  }

  function getArticleBodyHtml(condition) {
    if (!condition || !condition.contentHtml) {
      return '<p>This condition is available, but its article content could not be loaded locally.</p>';
    }

    return condition.contentHtml;
  }

  function buildDetailMarkup(conditionName, compact) {
    var condition = getConditionByName(conditionName);
    if (!condition) {
      return "";
    }

    var wrapperClass = compact
      ? "rounded-3xl border border-border bg-card p-6 shadow-sm"
      : "rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm";

    return (
      '<article class="' +
      wrapperClass +
      '">' +
      '<div class="mb-8 border-b border-border pb-5">' +
      '<p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Full Article</p>' +
      '<h2 class="mt-3 font-display text-2xl text-foreground">' +
      escapeHtml(condition.title || conditionName) +
      "</h2>" +
      "</div>" +
      '<div class="prose prose-slate max-w-none prose-headings:font-display prose-headings:text-foreground prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4 prose-li:text-muted-foreground prose-li:leading-relaxed prose-ul:my-4 prose-ol:my-4 prose-strong:text-foreground">' +
      getArticleBodyHtml(condition) +
      "</div>" +
      "</article>"
    );
  }

  function clearActiveCard() {
    document.querySelectorAll("[data-inline-condition-active='true']").forEach(function (node) {
      node.dataset.inlineConditionActive = "false";
      node.classList.remove("border-primary/40", "shadow-lg");
    });
  }

  function markActiveCard(anchor) {
    clearActiveCard();
    anchor.dataset.inlineConditionActive = "true";
    anchor.classList.add("border-primary/40", "shadow-lg");
  }

  function closeInlinePanel() {
    clearActiveCard();
    ACTIVE_CONDITION = null;

    if (ACTIVE_PANEL && ACTIVE_PANEL.parentNode) {
      ACTIVE_PANEL.parentNode.removeChild(ACTIVE_PANEL);
    }

    ACTIVE_PANEL = null;
  }

  function showInlinePanel(anchor, conditionName) {
    var normalizedKey = normalizeConditionName(conditionName);
    var condition = normalizedKey ? dataset.articles[normalizedKey] : null;
    var cardWrapper = anchor.parentElement || anchor;

    if (!condition) {
      return;
    }

    if (ACTIVE_CONDITION === normalizedKey && ACTIVE_PANEL && ACTIVE_PANEL.parentNode === cardWrapper.parentNode) {
      closeInlinePanel();
      return;
    }

    closeInlinePanel();

    var panel = document.createElement("div");
    panel.className = "mt-4";
    panel.dataset.inlineConditionPanel = normalizedKey;
    panel.innerHTML = buildDetailMarkup(conditionName, true);

    cardWrapper.insertAdjacentElement("afterend", panel);
    ACTIVE_PANEL = panel;
    ACTIVE_CONDITION = normalizedKey;

    markActiveCard(anchor);
    panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function enhanceConditionLinks() {
    document.querySelectorAll("a[href*='ConditionDetail?']").forEach(function (anchor) {
      var conditionName = getConditionFromHref(anchor.getAttribute("href"));
      if (!getConditionByName(conditionName)) {
        return;
      }

      anchor.dataset.inlineCondition = conditionName;

      if (isConditionsRoute()) {
        anchor.setAttribute("href", "#condition-" + slugifyConditionName(conditionName));
      }

      anchor.setAttribute("title", "Read the full article for " + conditionName);
      anchor.setAttribute("aria-expanded", ACTIVE_CONDITION === normalizeConditionName(conditionName) ? "true" : "false");
    });
  }

  function buildStandaloneDetailPage(conditionName) {
    var condition = getConditionByName(conditionName);
    if (!condition) {
      return "";
    }

    return (
      '<section class="bg-foreground py-16 px-6">' +
      '<div class="max-w-4xl mx-auto">' +
      '<a class="inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white" href="/Conditions/">' +
      '<span aria-hidden="true">←</span>' +
      "<span>Back to Conditions</span>" +
      "</a>" +
      '<div class="mt-10">' +
      '<p class="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Condition Detail</p>' +
      '<h1 class="font-display text-3xl md:text-4xl text-white">' +
      escapeHtml(condition.title || conditionName) +
      "</h1>" +
      "</div>" +
      "</div>" +
      "</section>" +
      '<section class="py-16 px-6">' +
      '<div class="max-w-4xl mx-auto">' +
      buildDetailMarkup(conditionName, false) +
      "</div>" +
      "</section>"
    );
  }

  function renderConditionDetailRoute() {
    if (window.location.pathname.indexOf("/ConditionDetail") !== 0) {
      return;
    }

    var searchParams = new URLSearchParams(window.location.search);
    var conditionName = searchParams.get("name") || "";
    var main = document.querySelector("main");

    if (!main || !getConditionByName(conditionName) || main.dataset.inlineConditionHydrated === "true") {
      return;
    }

    main.dataset.inlineConditionHydrated = "true";
    main.innerHTML = buildStandaloneDetailPage(conditionName);
  }

  function applyOverrides() {
    enhanceConditionLinks();
    renderConditionDetailRoute();
  }

  function scheduleApply() {
    window.requestAnimationFrame(applyOverrides);
  }

  function hookRoutes() {
    if (ROUTE_HOOKED) {
      return;
    }

    ROUTE_HOOKED = true;

    ["pushState", "replaceState"].forEach(function (methodName) {
      var original = window.history[methodName];
      window.history[methodName] = function () {
        var result = original.apply(this, arguments);
        window.dispatchEvent(new Event("inline-condition-route-change"));
        return result;
      };
    });

    window.addEventListener("popstate", scheduleApply);
    window.addEventListener("inline-condition-route-change", scheduleApply);
  }

  function bindDelegatedClicks() {
    document.addEventListener(
      "click",
      function (event) {
        var anchor = event.target && event.target.closest ? event.target.closest("a[data-inline-condition]") : null;

        if (!anchor) {
          return;
        }

        var conditionName = anchor.dataset.inlineCondition || getConditionFromHref(anchor.getAttribute("href"));
        if (!getConditionByName(conditionName)) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        showInlinePanel(anchor, conditionName);
        anchor.setAttribute("aria-expanded", "true");
      },
      true
    );
  }

  function bootObserver() {
    if (OBSERVER) {
      return;
    }

    OBSERVER = new MutationObserver(scheduleApply);
    OBSERVER.observe(document.body, { childList: true, subtree: true });
  }

  hookRoutes();
  bindDelegatedClicks();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      applyOverrides();
      bootObserver();
    });
  } else {
    applyOverrides();
    bootObserver();
  }
})();

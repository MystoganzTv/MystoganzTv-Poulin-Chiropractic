(function () {
  var dataset = window.__POULIN_CONDITION_ARTICLES__;
  var ACTIVE_CONDITION = null;
  var ACTIVE_PANEL = null;
  var OBSERVER = null;
  var ROUTE_HOOKED = false;
  var STYLE_ID = "pc-condition-overrides-style";

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

    return beautifyArticleHtml(condition.contentHtml);
  }

  function normalizeHeadingText(text) {
    return String(text || "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function looksLikeSectionHeading(text) {
    var normalized = normalizeHeadingText(text);

    if (!normalized || normalized.length > 60) {
      return false;
    }

    if (/[.!?]/.test(normalized)) {
      return false;
    }

    return /^(Introduction|Definition|Description|Examination|Treatment|At Home Care|At-Home Care|At Home Focus|At-Home Focus|Summary|Clinical Case Reports?|Clinical Focus|Common Symptoms|What Patients May Notice|Where It Can Occur|Where it can occur|Treatment Approach|Typical Complaints|Common coccygeal issues|Common symptoms|Examination|Treatment|At-Home Considerations|At-Home Focus|Why this matters|Why this approach matters|Why conservative care is considered|Clinical Case Report|At Home Considerations|What patients may experience|What symptoms can feel like|What patients may notice)$/i.test(
      normalized
    );
  }

  function beautifyArticleHtml(html) {
    if (!html) {
      return "";
    }

    return html
      .replace(/<p>\s*<span>\s*<strong>([\s\S]*?)<\/strong>\s*<\/span>\s*<\/p>/gi, function (match, text) {
        var heading = normalizeHeadingText(text);
        return looksLikeSectionHeading(heading) ? "<h2>" + escapeHtml(heading) + "</h2>" : match;
      })
      .replace(/<p>\s*<strong>\s*<span>([\s\S]*?)<\/span>\s*<\/strong>\s*<\/p>/gi, function (match, text) {
        var heading = normalizeHeadingText(text);
        return looksLikeSectionHeading(heading) ? "<h2>" + escapeHtml(heading) + "</h2>" : match;
      })
      .replace(/<p>\s*<strong>([\s\S]*?)<\/strong>\s*<\/p>/gi, function (match, text) {
        var heading = normalizeHeadingText(text);
        return looksLikeSectionHeading(heading) ? "<h2>" + escapeHtml(heading) + "</h2>" : match;
      })
      .replace(/<p>\s*<em>(Video[\s\S]*?|Graphic Animation[\s\S]*?|Cervical Spine Exam Description|Thoracic Spine Exam Description|Lumbar Spine Exam Description|Sacroiliac Joint Pain Condition Description|Subluxation Condition Description)\s*<\/em>\s*<\/p>/gi, function (match, text) {
        return '<p class="pc-condition-note">' + escapeHtml(normalizeHeadingText(text)) + "</p>";
      });
  }

  function getConditionHeadings(condition) {
    var source = getArticleBodyHtml(condition);
    var matches = source.match(/<h2>([\s\S]*?)<\/h2>/gi) || [];

    return matches
      .map(function (match) {
        return normalizeHeadingText(match);
      })
      .filter(Boolean)
      .slice(0, 5);
  }

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) {
      return;
    }

    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent =
      "[data-inline-condition-filters='true']{" +
      "position:relative !important;" +
      "top:auto !important;" +
      "z-index:auto !important;" +
      "border-bottom:none !important;" +
      "padding-top:2.5rem !important;" +
      "padding-bottom:3.5rem !important;" +
      "background:linear-gradient(180deg, rgba(242,249,247,0.92) 0%, rgba(255,255,255,0.98) 35%, rgba(255,255,255,1) 100%) !important;" +
      "}" +
      "[data-inline-condition-filters='true'] [data-inline-condition-filters-inner='true']{" +
      "max-width:72rem !important;" +
      "}" +
      "[data-inline-condition-search-wrap='true']{" +
      "padding:0.45rem;" +
      "border-radius:1.75rem;" +
      "background:rgba(255,255,255,0.92);" +
      "border:1px solid rgba(25,84,74,0.12);" +
      "box-shadow:0 20px 45px rgba(15,23,42,0.08);" +
      "backdrop-filter:blur(10px);" +
      "}" +
      "[data-inline-condition-search='true']{" +
      "height:4.6rem !important;" +
      "border:none !important;" +
      "box-shadow:none !important;" +
      "background:transparent !important;" +
      "font-size:1.15rem;" +
      "padding-left:4rem !important;" +
      "padding-right:1.5rem !important;" +
      "color:hsl(var(--foreground));" +
      "}" +
      "[data-inline-condition-search='true']::placeholder{" +
      "color:rgba(71,85,105,0.82);" +
      "}" +
      "[data-inline-condition-chip-row='true']{" +
      "display:flex;" +
      "flex-wrap:wrap;" +
      "gap:0.85rem;" +
      "margin-bottom:1.25rem;" +
      "}" +
      "[data-inline-condition-filter-chip='true']{" +
      "border-radius:999px !important;" +
      "border:1px solid rgba(25,84,74,0.14) !important;" +
      "background:rgba(255,255,255,0.9) !important;" +
      "box-shadow:0 4px 16px rgba(15,23,42,0.04);" +
      "padding:0.85rem 1.35rem !important;" +
      "transition:transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease !important;" +
      "}" +
      "[data-inline-condition-filter-chip='true']:hover{" +
      "transform:translateY(-1px);" +
      "box-shadow:0 10px 24px rgba(15,23,42,0.08);" +
      "border-color:rgba(25,84,74,0.28) !important;" +
      "}" +
      "[data-inline-condition-card-wrap='true']{" +
      "margin-bottom:1rem;" +
      "}" +
      "[data-inline-condition-card='true']{" +
      "border-radius:1.5rem !important;" +
      "border:1px solid rgba(25,84,74,0.1) !important;" +
      "background:linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(250,253,252,1) 100%) !important;" +
      "box-shadow:0 14px 32px rgba(15,23,42,0.05);" +
      "padding:1.15rem 1.25rem !important;" +
      "transition:transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease !important;" +
      "}" +
      "[data-inline-condition-card='true']:hover{" +
      "transform:translateY(-2px);" +
      "box-shadow:0 20px 40px rgba(15,23,42,0.1);" +
      "border-color:rgba(25,84,74,0.24) !important;" +
      "}" +
      "[data-inline-condition-active='true']{" +
      "border-color:rgba(25,84,74,0.32) !important;" +
      "box-shadow:0 22px 44px rgba(25,84,74,0.12) !important;" +
      "}" +
      ".pc-inline-condition-panel{" +
      "margin:1rem 0 2rem;" +
      "}" +
      ".pc-condition-shell{" +
      "position:relative;" +
      "overflow:hidden;" +
      "border:1px solid rgba(25,84,74,0.12);" +
      "border-radius:2rem;" +
      "background:linear-gradient(180deg, #ffffff 0%, #fcfefd 100%);" +
      "box-shadow:0 28px 70px rgba(15,23,42,0.08);" +
      "padding:2rem;" +
      "}" +
      ".pc-condition-shell--page{" +
      "padding:2.5rem;" +
      "}" +
      ".pc-condition-shell::before{" +
      "content:'';" +
      "position:absolute;" +
      "top:0;left:0;right:0;" +
      "height:12rem;" +
      "background:radial-gradient(circle at top left, rgba(46,139,120,0.14), transparent 58%), linear-gradient(135deg, rgba(223,243,239,0.75), rgba(255,255,255,0));" +
      "pointer-events:none;" +
      "}" +
      ".pc-condition-header{" +
      "position:relative;" +
      "display:flex;" +
      "justify-content:space-between;" +
      "gap:1.5rem;" +
      "padding-bottom:1.5rem;" +
      "margin-bottom:1.75rem;" +
      "border-bottom:1px solid rgba(148,163,184,0.18);" +
      "}" +
      ".pc-condition-header-main{" +
      "max-width:48rem;" +
      "}" +
      ".pc-condition-kicker{" +
      "display:inline-flex;" +
      "align-items:center;" +
      "gap:0.55rem;" +
      "padding:0.5rem 0.85rem;" +
      "border-radius:999px;" +
      "background:rgba(25,84,74,0.08);" +
      "color:hsl(var(--primary));" +
      "font-size:0.72rem;" +
      "font-weight:700;" +
      "letter-spacing:0.22em;" +
      "text-transform:uppercase;" +
      "}" +
      ".pc-condition-title{" +
      "margin:1rem 0 0;" +
      "font-family:var(--font-display);" +
      "font-size:clamp(2rem, 4vw, 3.35rem);" +
      "line-height:1.04;" +
      "letter-spacing:-0.03em;" +
      "color:hsl(var(--foreground));" +
      "text-wrap:balance;" +
      "}" +
      ".pc-condition-subtitle{" +
      "margin:1rem 0 0;" +
      "max-width:42rem;" +
      "font-size:1rem;" +
      "line-height:1.75;" +
      "color:hsl(var(--muted-foreground));" +
      "}" +
      ".pc-condition-meta{" +
      "display:flex;" +
      "flex-wrap:wrap;" +
      "gap:0.75rem;" +
      "margin-top:1.15rem;" +
      "}" +
      ".pc-condition-badge{" +
      "display:inline-flex;" +
      "align-items:center;" +
      "padding:0.55rem 0.9rem;" +
      "border-radius:999px;" +
      "border:1px solid rgba(25,84,74,0.12);" +
      "background:#fff;" +
      "font-size:0.84rem;" +
      "font-weight:600;" +
      "color:hsl(var(--foreground));" +
      "box-shadow:0 10px 25px rgba(15,23,42,0.05);" +
      "}" +
      ".pc-condition-close{" +
      "position:relative;" +
      "z-index:2;" +
      "display:inline-flex;" +
      "align-items:center;" +
      "justify-content:center;" +
      "width:2.75rem;height:2.75rem;" +
      "border-radius:999px;" +
      "border:1px solid rgba(25,84,74,0.12);" +
      "background:rgba(255,255,255,0.86);" +
      "color:hsl(var(--muted-foreground));" +
      "box-shadow:0 12px 24px rgba(15,23,42,0.05);" +
      "transition:all 180ms ease;" +
      "}" +
      ".pc-condition-close:hover{" +
      "transform:translateY(-1px);" +
      "color:hsl(var(--foreground));" +
      "border-color:rgba(25,84,74,0.22);" +
      "}" +
      ".pc-condition-body{" +
      "position:relative;" +
      "max-width:none;" +
      "color:hsl(var(--muted-foreground));" +
      "font-size:1.03rem;" +
      "line-height:1.88;" +
      "}" +
      ".pc-condition-body h2,.pc-condition-body h3{" +
      "font-family:var(--font-display);" +
      "color:hsl(var(--foreground));" +
      "line-height:1.12;" +
      "letter-spacing:-0.025em;" +
      "}" +
      ".pc-condition-body h2{" +
      "font-size:clamp(1.7rem, 2vw, 2.2rem);" +
      "margin:2.4rem 0 0.9rem;" +
      "}" +
      ".pc-condition-body h3{" +
      "font-size:1.35rem;" +
      "margin:2rem 0 0.75rem;" +
      "}" +
      ".pc-condition-body p{" +
      "margin:0 0 1rem;" +
      "}" +
      ".pc-condition-body p:first-of-type{" +
      "font-size:1.08rem;" +
      "color:hsl(var(--foreground) / 0.86);" +
      "}" +
      ".pc-condition-layout{" +
      "display:grid;" +
      "grid-template-columns:minmax(0, 240px) minmax(0, 1fr);" +
      "gap:1.5rem;" +
      "align-items:start;" +
      "}" +
      ".pc-condition-rail{" +
      "position:sticky;" +
      "top:1.25rem;" +
      "display:flex;" +
      "flex-direction:column;" +
      "gap:1rem;" +
      "}" +
      ".pc-condition-sidecard{" +
      "padding:1rem 1.05rem;" +
      "border-radius:1.25rem;" +
      "border:1px solid rgba(25,84,74,0.1);" +
      "background:rgba(248,252,251,0.9);" +
      "box-shadow:0 16px 32px rgba(15,23,42,0.04);" +
      "}" +
      ".pc-condition-sideeyebrow{" +
      "font-size:0.72rem;" +
      "font-weight:700;" +
      "letter-spacing:0.18em;" +
      "text-transform:uppercase;" +
      "color:hsl(var(--primary));" +
      "margin:0 0 0.55rem;" +
      "}" +
      ".pc-condition-sidetext{" +
      "font-size:0.95rem;" +
      "line-height:1.7;" +
      "color:hsl(var(--muted-foreground));" +
      "margin:0;" +
      "}" +
      ".pc-condition-toc{" +
      "display:grid;" +
      "gap:0.55rem;" +
      "}" +
      ".pc-condition-toc-item{" +
      "display:flex;" +
      "align-items:center;" +
      "gap:0.65rem;" +
      "font-size:0.92rem;" +
      "line-height:1.4;" +
      "color:hsl(var(--foreground));" +
      "}" +
      ".pc-condition-toc-item::before{" +
      "content:'';" +
      "width:0.45rem;height:0.45rem;" +
      "border-radius:999px;" +
      "background:hsl(var(--primary));" +
      "opacity:0.5;" +
      "flex-shrink:0;" +
      "}" +
      ".pc-condition-content{" +
      "min-width:0;" +
      "}" +
      ".pc-condition-body ul,.pc-condition-body ol{" +
      "margin:1rem 0 1.2rem;" +
      "padding-left:1.2rem;" +
      "}" +
      ".pc-condition-body li{" +
      "margin:0.45rem 0;" +
      "padding-left:0.25rem;" +
      "}" +
      ".pc-condition-body strong{" +
      "color:hsl(var(--foreground));" +
      "}" +
      ".pc-condition-note{" +
      "display:inline-flex;" +
      "align-items:center;" +
      "padding:0.65rem 0.9rem;" +
      "border-radius:999px;" +
      "background:rgba(25,84,74,0.07);" +
      "color:hsl(var(--primary));" +
      "font-size:0.85rem;" +
      "font-weight:600;" +
      "margin:0.25rem 0 1rem;" +
      "}" +
      ".pc-condition-page-hero{" +
      "padding:4.5rem 1.5rem 2.25rem;" +
      "background:linear-gradient(180deg, #12212b 0%, #17333a 42%, #f7fbfa 42%, #f7fbfa 100%);" +
      "}" +
      ".pc-condition-page-hero-inner{" +
      "max-width:72rem;" +
      "margin:0 auto;" +
      "}" +
      ".pc-condition-back{" +
      "display:inline-flex;" +
      "align-items:center;" +
      "gap:0.55rem;" +
      "color:rgba(255,255,255,0.82);" +
      "font-size:0.95rem;" +
      "font-weight:600;" +
      "}" +
      ".pc-condition-page-card{" +
      "margin-top:2rem;" +
      "}" +
      "@media (max-width: 768px){" +
      "[data-inline-condition-filters='true']{" +
      "padding-top:1.75rem !important;" +
      "padding-bottom:2.5rem !important;" +
      "}" +
      ".pc-condition-shell,.pc-condition-shell--page{" +
      "padding:1.3rem;" +
      "border-radius:1.4rem;" +
      "}" +
      ".pc-condition-header{" +
      "flex-direction:column;" +
      "margin-bottom:1.2rem;" +
      "padding-bottom:1.15rem;" +
      "}" +
      ".pc-condition-layout{" +
      "grid-template-columns:minmax(0,1fr);" +
      "}" +
      ".pc-condition-rail{" +
      "position:relative;" +
      "top:auto;" +
      "order:2;" +
      "}" +
      ".pc-condition-content{" +
      "order:1;" +
      "}" +
      ".pc-condition-title{" +
      "font-size:2rem;" +
      "}" +
      ".pc-condition-body{" +
      "font-size:0.98rem;" +
      "line-height:1.75;" +
      "}" +
      "}";
    document.head.appendChild(style);
  }

  function getConditionSummary(condition, conditionName) {
    var source = getArticleBodyHtml(condition).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (!source) {
      return "Explore a complete local article for this condition with Poulin Chiropractic treatment context and educational detail.";
    }

    return source.slice(0, 220).trim() + (source.length > 220 ? "..." : "");
  }

  function buildDetailMarkup(conditionName, compact) {
    var condition = getConditionByName(conditionName);
    if (!condition) {
      return "";
    }

    var wrapperClass = compact ? "pc-condition-shell" : "pc-condition-shell pc-condition-shell--page";
    var category = condition.category ? escapeHtml(condition.category) : "Condition";
    var title = escapeHtml(condition.title || conditionName);
    var summary = escapeHtml(getConditionSummary(condition, conditionName));
    var headings = getConditionHeadings(condition);
    var closeButton = compact
      ? '<button type="button" class="pc-condition-close" data-inline-condition-close="true" aria-label="Close article">×</button>'
      : "";
    var tocMarkup = headings.length
      ? headings
          .map(function (heading) {
            return '<div class="pc-condition-toc-item">' + escapeHtml(heading) + "</div>";
          })
          .join("")
      : '<div class="pc-condition-toc-item">Full local care overview</div><div class="pc-condition-toc-item">Symptoms and definition</div><div class="pc-condition-toc-item">Examination and treatment</div>';

    return (
      '<article class="' +
      wrapperClass +
      '">' +
      '<div class="pc-condition-header">' +
      '<div class="pc-condition-header-main">' +
      '<p class="pc-condition-kicker">Condition Guide</p>' +
      '<h2 class="pc-condition-title">' +
      title +
      "</h2>" +
      '<p class="pc-condition-subtitle">' +
      summary +
      "</p>" +
      '<div class="pc-condition-meta">' +
      '<span class="pc-condition-badge">' +
      category +
      "</span>" +
      '<span class="pc-condition-badge">Local Full Article</span>' +
      "</div>" +
      "</div>" +
      closeButton +
      "</div>" +
      '<div class="pc-condition-layout">' +
      '<aside class="pc-condition-rail">' +
      '<div class="pc-condition-sidecard">' +
      '<p class="pc-condition-sideeyebrow">Quick Overview</p>' +
      '<p class="pc-condition-sidetext">' +
      summary +
      "</p>" +
      "</div>" +
      '<div class="pc-condition-sidecard">' +
      '<p class="pc-condition-sideeyebrow">In This Article</p>' +
      '<div class="pc-condition-toc">' +
      tocMarkup +
      "</div>" +
      "</div>" +
      "</aside>" +
      '<div class="pc-condition-content pc-condition-body">' +
      getArticleBodyHtml(condition) +
      "</div>" +
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
    panel.className = "pc-inline-condition-panel";
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
      anchor.dataset.inlineConditionCard = "true";

      if (isConditionsRoute()) {
        anchor.setAttribute("href", "#condition-" + slugifyConditionName(conditionName));
      }

      if (anchor.parentElement) {
        anchor.parentElement.dataset.inlineConditionCardWrap = "true";
      }

      anchor.setAttribute("title", "Read the full article for " + conditionName);
      anchor.setAttribute("aria-expanded", ACTIVE_CONDITION === normalizeConditionName(conditionName) ? "true" : "false");
    });
  }

  function enhanceConditionsLayout() {
    if (!isConditionsRoute()) {
      return;
    }

    var searchInput = document.querySelector("input[placeholder*='Search conditions']");
    if (!searchInput) {
      return;
    }

    var section = searchInput.closest("section");
    if (!section) {
      return;
    }

    section.dataset.inlineConditionFilters = "true";
    section.classList.remove("sticky", "top-[72px]", "z-30", "border-b");
    section.style.position = "static";
    section.style.top = "auto";
    section.style.zIndex = "auto";
    section.style.boxShadow = "none";
    section.style.transform = "none";

    var inner = section.querySelector(".max-w-4xl");
    if (inner) {
      inner.dataset.inlineConditionFiltersInner = "true";
    }

    searchInput.dataset.inlineConditionSearch = "true";

    var searchWrap = searchInput.closest(".relative");
    if (searchWrap) {
      searchWrap.dataset.inlineConditionSearchWrap = "true";
    }

    var chips = Array.prototype.slice.call(section.querySelectorAll("button"));
    chips.forEach(function (chip) {
      chip.dataset.inlineConditionFilterChip = "true";
    });

    if (chips.length && chips[0].parentElement) {
      chips[0].parentElement.dataset.inlineConditionChipRow = "true";
    }

    section.querySelectorAll("a[data-inline-condition]").forEach(function (anchor) {
      anchor.dataset.inlineConditionCard = "true";
      if (anchor.parentElement) {
        anchor.parentElement.dataset.inlineConditionCardWrap = "true";
      }
    });
  }

  function buildStandaloneDetailPage(conditionName) {
    var condition = getConditionByName(conditionName);
    if (!condition) {
      return "";
    }

    return (
      '<section class="pc-condition-page-hero">' +
      '<div class="pc-condition-page-hero-inner">' +
      '<a class="pc-condition-back" href="/Conditions/">' +
      '<span aria-hidden="true">←</span>' +
      "<span>Back to Conditions</span>" +
      "</a>" +
      '<div class="pc-condition-page-card">' +
      buildDetailMarkup(conditionName, false) +
      "</div>" +
      "</section>" +
      '<section class="px-6 pb-16 bg-background"><div class="max-w-6xl mx-auto"></div></section>'
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
    injectStyles();
    enhanceConditionLinks();
    enhanceConditionsLayout();
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
        var closeButton = event.target && event.target.closest ? event.target.closest("[data-inline-condition-close]") : null;

        if (closeButton) {
          event.preventDefault();
          closeInlinePanel();
          return;
        }

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

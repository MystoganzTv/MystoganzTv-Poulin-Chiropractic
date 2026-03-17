(function () {
  var dataset = window.__POULIN_CONDITION_ARTICLES__;
  var ACTIVE_CONDITION = null;
  var ACTIVE_PANEL = null;
  var OBSERVER = null;
  var ROUTE_HOOKED = false;
  var STYLE_ID = "pc-condition-overrides-style";
  var HERO_IMAGES = {
    Home: "https://www.poulinchiro.com/img/data/images/Dr%20Pouli%20Herndon%201920x960.jpg?t=1737663495",
    About: "https://www.poulinchiro.com/corporate/images/Our%20Team.png",
    Services: "https://www.poulinchiro.com/corporate/images/chiropractic-services-cadeusus.jpg",
    Conditions: "https://www.poulinchiro.com/data/uploads/Doctor-Cox-with-Doctor-Poulin.jpg",
    Testimonials: "https://www.poulinchiro.com/corporate/images/Depositphotos_187007346_l-2015-430.jpg",
    Contact: "https://www.poulinchiro.com/data/uploads/ashburnoffice20130523.jpg",
    ConditionDetail: "https://www.poulinchiro.com/data/uploads/doctor_cox_with_doctor_poulin.jpg",
  };
  var HERO_CARD_IMAGES = {
    Home: "https://www.poulinchiro.com/data/uploads/Poulin-Cox-9-2021.jpg",
    About: "https://www.poulinchiro.com/data/images/mikepoulin--1--1.jpg",
  };
  var VIDEO_LIBRARY = [
    {
      title: "Educational Video Spotlight",
      description: "A patient-friendly video resource that fits naturally into Poulin Chiropractic's educational approach.",
      youtubeId: "AMPFZ9gH-tE",
      youtubeUrl: "https://www.youtube.com/watch?v=AMPFZ9gH-tE",
    },
  ];
  var HERO_POSITIONS = {
    Home: "center 22%",
    About: "center 18%",
    Services: "center 28%",
    Conditions: "center 36%",
    Testimonials: "center 24%",
    Contact: "center 44%",
    ConditionDetail: "center 24%",
  };

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

  function cleanConditionTitle(name, condition) {
    var display = String(name || "").trim();
    if (display) {
      return display;
    }

    return String((condition && condition.title) || "")
      .replace(/^About\s+Ashburn\s+and\s+Herndon\s+Chiropractic\s+and\s+Ashburn\s+and\s+Herndon\s+/i, "")
      .replace(/^About\s+Ashburn\s+and\s+Herndon\s+/i, "")
      .trim();
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

  function stripLeadingHeadingLabel(text) {
    return String(text || "")
      .replace(
        /^(Introduction|Definition|Description|Examination|Treatment|At Home Care|At-Home Care|At Home Focus|At-Home Focus|Summary|Clinical Case Reports?|Clinical Focus|Common Symptoms|What Patients May Notice|Where It Can Occur|Treatment Approach|Typical Complaints|At-Home Considerations|Why this matters|Why this approach matters|What patients may experience|What symptoms can feel like)\s+/i,
        ""
      )
      .trim();
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
      "padding-top:1.6rem !important;" +
      "padding-bottom:2rem !important;" +
      "background:linear-gradient(180deg, rgba(242,249,247,0.92) 0%, rgba(255,255,255,0.98) 35%, rgba(255,255,255,1) 100%) !important;" +
      "}" +
      "[data-inline-condition-filters='true'] [data-inline-condition-filters-inner='true']{" +
      "max-width:72rem !important;" +
      "}" +
      "[data-inline-condition-search-wrap='true']{" +
      "display:block;" +
      "width:min(100%, 43rem);" +
      "margin:0 auto 1.15rem;" +
      "padding:0.2rem 0.3rem;" +
      "border-radius:1.2rem;" +
      "background:rgba(255,255,255,0.92);" +
      "border:1px solid rgba(25,84,74,0.12);" +
      "box-shadow:0 12px 26px rgba(15,23,42,0.05);" +
      "backdrop-filter:blur(10px);" +
      "}" +
      "[data-inline-condition-search='true']{" +
      "height:3rem !important;" +
      "border:none !important;" +
      "box-shadow:none !important;" +
      "background:transparent !important;" +
      "font-size:0.98rem;" +
      "padding-left:3.2rem !important;" +
      "padding-right:1rem !important;" +
      "color:hsl(var(--foreground));" +
      "}" +
      "[data-inline-condition-search='true']::placeholder{" +
      "color:rgba(71,85,105,0.82);" +
      "}" +
      "[data-inline-condition-chip-row='true']{" +
      "display:flex;" +
      "flex-wrap:wrap;" +
      "align-items:center;" +
      "gap:0.85rem;" +
      "margin-bottom:1.25rem;" +
      "}" +
      "[data-inline-condition-filter-chip='true']{" +
      "display:inline-flex;" +
      "align-items:center;" +
      "justify-content:center;" +
      "min-height:3.1rem;" +
      "border-radius:999px !important;" +
      "border:1px solid rgba(25,84,74,0.14) !important;" +
      "background:rgba(255,255,255,0.9) !important;" +
      "box-shadow:0 4px 16px rgba(15,23,42,0.04);" +
      "padding:0.72rem 1.15rem !important;" +
      "color:#64748b !important;" +
      "transition:transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease !important;" +
      "}" +
      "[data-inline-condition-filter-chip='true'],[data-inline-condition-filter-chip='true'] *{" +
      "color:#64748b !important;" +
      "}" +
      "[data-inline-condition-filter-chip='true'][data-inline-active='true']," +
      "[data-inline-condition-filter-chip='true'].bg-primary," +
      "[data-inline-condition-filter-chip='true'].text-primary-foreground{" +
      "background:linear-gradient(135deg, #1d6f66 0%, #257c72 100%) !important;" +
      "border-color:rgba(29,111,102,0.22) !important;" +
      "box-shadow:0 12px 24px rgba(29,111,102,0.22) !important;" +
      "}" +
      "[data-inline-condition-filter-chip='true'][data-inline-active='true'],[data-inline-condition-filter-chip='true'][data-inline-active='true'] *,[data-inline-condition-filter-chip='true'].bg-primary,[data-inline-condition-filter-chip='true'].bg-primary *,[data-inline-condition-filter-chip='true'].text-primary-foreground,[data-inline-condition-filter-chip='true'].text-primary-foreground *{" +
      "color:#ffffff !important;" +
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
      "overflow:hidden;" +
      "border:1px solid rgba(25,84,74,0.1);" +
      "border-radius:2rem;" +
      "background:#ffffff;" +
      "box-shadow:0 24px 64px rgba(15,23,42,0.08);" +
      "}" +
      ".pc-condition-shell--page{" +
      "box-shadow:0 32px 76px rgba(15,23,42,0.1);" +
      "}" +
      ".pc-condition-header{" +
      "display:flex;" +
      "justify-content:space-between;" +
      "gap:1.5rem;" +
      "padding:2rem 2rem 1.7rem;" +
      "background:linear-gradient(135deg, rgba(225,245,240,0.88), rgba(245,251,249,0.92) 48%, rgba(255,255,255,0.98) 100%);" +
      "border-bottom:1px solid rgba(148,163,184,0.18);" +
      "}" +
      ".pc-condition-shell--page .pc-condition-header{" +
      "padding:2.35rem 2.35rem 1.9rem;" +
      "}" +
      ".pc-condition-header-main{" +
      "max-width:46rem;" +
      "}" +
      ".pc-condition-kicker{" +
      "display:inline-flex;" +
      "align-items:center;" +
      "gap:0.55rem;" +
      "padding:0.42rem 0.7rem;" +
      "border-radius:999px;" +
      "background:rgba(255,255,255,0.62);" +
      "color:hsl(var(--primary));" +
      "font-size:0.72rem;" +
      "font-weight:700;" +
      "letter-spacing:0.16em;" +
      "text-transform:uppercase;" +
      "}" +
      ".pc-condition-title{" +
      "margin:1rem 0 0;" +
      "font-family:var(--font-display);" +
      "font-size:clamp(2rem, 3vw, 2.85rem);" +
      "line-height:1.02;" +
      "letter-spacing:-0.03em;" +
      "color:hsl(var(--foreground));" +
      "text-wrap:balance;" +
      "}" +
      ".pc-condition-deck{" +
      "max-width:38rem;" +
      "margin:0.9rem 0 0;" +
      "font-size:0.98rem;" +
      "line-height:1.7;" +
      "color:rgba(71,85,105,0.88);" +
      "}" +
      ".pc-condition-close{" +
      "display:inline-flex;" +
      "align-items:center;" +
      "justify-content:center;" +
      "width:2.75rem;height:2.75rem;" +
      "border-radius:999px;" +
      "border:1px solid rgba(25,84,74,0.1);" +
      "background:rgba(255,255,255,0.92);" +
      "color:rgba(71,85,105,0.88);" +
      "box-shadow:0 10px 24px rgba(15,23,42,0.06);" +
      "transition:all 180ms ease;" +
      "}" +
      ".pc-condition-close:hover{" +
      "transform:translateY(-1px);" +
      "color:hsl(var(--foreground));" +
      "border-color:rgba(25,84,74,0.22);" +
      "}" +
      ".pc-condition-body-wrap{" +
      "padding:1.9rem 2rem 2.35rem;" +
      "}" +
      ".pc-condition-shell--page .pc-condition-body-wrap{" +
      "padding:2.1rem 2.35rem 2.7rem;" +
      "}" +
      ".pc-condition-body{" +
      "max-width:56rem;" +
      "margin:0 auto;" +
      "color:hsl(var(--muted-foreground));" +
      "font-size:1.02rem;" +
      "line-height:1.84;" +
      "}" +
      ".pc-condition-body h2,.pc-condition-body h3{" +
      "font-family:var(--font-display);" +
      "color:hsl(var(--foreground));" +
      "line-height:1.12;" +
      "letter-spacing:-0.025em;" +
      "}" +
      ".pc-condition-body h2{" +
      "font-size:clamp(1.55rem, 2vw, 2rem);" +
      "margin:2.25rem 0 0.8rem;" +
      "}" +
      ".pc-condition-body h3{" +
      "font-size:1.22rem;" +
      "margin:1.75rem 0 0.7rem;" +
      "}" +
      ".pc-condition-body > h2:first-child{" +
      "margin-top:0;" +
      "}" +
      ".pc-condition-body p{" +
      "margin:0 0 1.05rem;" +
      "}" +
      ".pc-condition-body p:first-of-type{" +
      "font-size:1.04rem;" +
      "color:hsl(var(--foreground) / 0.86);" +
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
      "[data-inline-hero='true']{" +
      "position:relative;" +
      "isolation:isolate;" +
      "overflow:hidden;" +
      "background:transparent !important;" +
      "}" +
      "[data-inline-hero='true']::before{" +
      "content:'';" +
      "position:absolute;" +
      "inset:0;" +
      "z-index:0;" +
      "background:linear-gradient(180deg, rgba(7,18,26,0.56) 0%, rgba(15,30,37,0.5) 52%, rgba(8,18,26,0.38) 100%), var(--pc-hero-image) var(--pc-hero-position, center) / cover no-repeat;" +
      "transform:scale(1.03);" +
      "}" +
      "[data-inline-hero='true']::after{" +
      "content:'';" +
      "position:absolute;" +
      "inset:0;" +
      "z-index:0;" +
      "background:linear-gradient(135deg, rgba(240,248,246,0.14), rgba(255,255,255,0.04));" +
      "pointer-events:none;" +
      "}" +
      "[data-inline-hero='true'] .max-w-4xl,[data-inline-hero='true'] .max-w-6xl,[data-inline-hero='true'] .max-w-7xl{" +
      "position:relative;" +
      "z-index:1;" +
      "}" +
      "[data-inline-hero='true'] h1,[data-inline-hero='true'] h2,[data-inline-hero='true'] h3,[data-inline-hero='true'] p,[data-inline-hero='true'] a:not(.bg-primary):not(.bg-secondary){" +
      "text-shadow:0 8px 24px rgba(7,18,26,0.26);" +
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
      "[data-inline-home-hero='true'] a,[data-inline-home-hero='true'] button{" +
      "position:relative;" +
      "z-index:1;" +
      "}" +
      ".pc-home-hero-card-float{" +
      "background:rgba(255,255,255,0.95) !important;" +
      "color:#10212b !important;" +
      "border:1px solid rgba(15,23,42,0.08) !important;" +
      "box-shadow:0 20px 45px rgba(15,23,42,0.14) !important;" +
      "backdrop-filter:blur(10px);" +
      "}" +
      ".pc-home-hero-card-float *{" +
      "color:inherit !important;" +
      "}" +
      ".pc-video-section{" +
      "padding:5rem 1.5rem;" +
      "background:linear-gradient(180deg, #f7fbfa 0%, #ffffff 100%);" +
      "}" +
      ".pc-video-shell{" +
      "max-width:72rem;" +
      "margin:0 auto;" +
      "padding:2.1rem;" +
      "border-radius:2rem;" +
      "border:1px solid rgba(25,84,74,0.1);" +
      "background:#ffffff;" +
      "box-shadow:0 28px 68px rgba(15,23,42,0.08);" +
      "}" +
      ".pc-video-grid{" +
      "display:grid;" +
      "grid-template-columns:minmax(0, 1.3fr) minmax(320px, 0.9fr);" +
      "gap:2rem;" +
      "align-items:center;" +
      "}" +
      ".pc-video-kicker{" +
      "display:inline-flex;" +
      "align-items:center;" +
      "padding:0.42rem 0.72rem;" +
      "border-radius:999px;" +
      "background:rgba(29,111,102,0.08);" +
      "color:hsl(var(--primary));" +
      "font-size:0.72rem;" +
      "font-weight:700;" +
      "letter-spacing:0.16em;" +
      "text-transform:uppercase;" +
      "}" +
      ".pc-video-title{" +
      "margin:1rem 0 0;" +
      "font-family:var(--font-display);" +
      "font-size:clamp(2rem, 3vw, 2.9rem);" +
      "line-height:1.03;" +
      "letter-spacing:-0.03em;" +
      "color:hsl(var(--foreground));" +
      "text-wrap:balance;" +
      "}" +
      ".pc-video-copy{" +
      "margin:1rem 0 0;" +
      "max-width:34rem;" +
      "font-size:1rem;" +
      "line-height:1.75;" +
      "color:rgba(71,85,105,0.9);" +
      "}" +
      ".pc-video-actions{" +
      "display:flex;" +
      "flex-wrap:wrap;" +
      "gap:0.9rem;" +
      "margin-top:1.4rem;" +
      "}" +
      ".pc-video-button{" +
      "display:inline-flex;" +
      "align-items:center;" +
      "justify-content:center;" +
      "min-height:3rem;" +
      "padding:0.85rem 1.3rem;" +
      "border-radius:999px;" +
      "font-size:0.95rem;" +
      "font-weight:600;" +
      "text-decoration:none;" +
      "transition:transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;" +
      "}" +
      ".pc-video-button--primary{" +
      "background:linear-gradient(135deg, #1d6f66 0%, #257c72 100%);" +
      "color:#ffffff;" +
      "box-shadow:0 16px 34px rgba(29,111,102,0.24);" +
      "}" +
      ".pc-video-button--ghost{" +
      "border:1px solid rgba(25,84,74,0.14);" +
      "background:#ffffff;" +
      "color:hsl(var(--foreground));" +
      "}" +
      ".pc-video-button:hover{" +
      "transform:translateY(-1px);" +
      "}" +
      ".pc-video-frame-wrap{" +
      "position:relative;" +
      "overflow:hidden;" +
      "border-radius:1.5rem;" +
      "border:1px solid rgba(25,84,74,0.1);" +
      "box-shadow:0 20px 48px rgba(15,23,42,0.12);" +
      "background:#0f172a;" +
      "}" +
      ".pc-video-frame-wrap::before{" +
      "content:'';" +
      "display:block;" +
      "padding-top:56.25%;" +
      "}" +
      ".pc-video-frame{" +
      "position:absolute;" +
      "inset:0;" +
      "width:100%;" +
      "height:100%;" +
      "border:0;" +
      "}" +
      ".pc-video-note{" +
      "margin-top:1rem;" +
      "font-size:0.9rem;" +
      "color:rgba(100,116,139,0.92);" +
      "}" +
      "@media (max-width: 768px){" +
      "[data-inline-condition-filters='true']{" +
      "padding-top:1.2rem !important;" +
      "padding-bottom:1.75rem !important;" +
      "}" +
      ".pc-condition-shell,.pc-condition-shell--page{" +
      "border-radius:1.4rem;" +
      "}" +
      ".pc-condition-header{" +
      "flex-direction:column;" +
      "padding:1.4rem 1.4rem 1.2rem;" +
      "gap:1rem;" +
      "}" +
      ".pc-condition-shell--page .pc-condition-header{" +
      "padding:1.55rem 1.55rem 1.25rem;" +
      "}" +
      ".pc-condition-title{" +
      "font-size:1.85rem;" +
      "}" +
      ".pc-condition-body-wrap,.pc-condition-shell--page .pc-condition-body-wrap{" +
      "padding:1.35rem 1.4rem 1.65rem;" +
      "}" +
      ".pc-condition-body{" +
      "font-size:0.98rem;" +
      "line-height:1.75;" +
      "}" +
      ".pc-video-section{" +
      "padding:4rem 1rem;" +
      "}" +
      ".pc-video-shell{" +
      "padding:1.35rem;" +
      "border-radius:1.5rem;" +
      "}" +
      ".pc-video-grid{" +
      "grid-template-columns:minmax(0, 1fr);" +
      "gap:1.35rem;" +
      "}" +
      ".pc-video-title{" +
      "font-size:1.9rem;" +
      "}" +
      "}";
    document.head.appendChild(style);
  }

  function getConditionSummary(condition, conditionName) {
    var label = cleanConditionTitle(conditionName, condition) || "this condition";
    return "A focused guide to symptoms, spinal mechanics, examination findings, and conservative care for " + label + ".";
  }

  function buildDetailMarkup(conditionName, compact) {
    var condition = getConditionByName(conditionName);
    if (!condition) {
      return "";
    }

    var wrapperClass = compact ? "pc-condition-shell" : "pc-condition-shell pc-condition-shell--page";
    var title = escapeHtml(cleanConditionTitle(conditionName, condition));
    var deck = escapeHtml(getConditionSummary(condition, conditionName));
    var closeButton = compact
      ? '<button type="button" class="pc-condition-close" data-inline-condition-close="true" aria-label="Close article">×</button>'
      : "";

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
      '<p class="pc-condition-deck">' +
      deck +
      "</p>" +
      "</div>" +
      closeButton +
      "</div>" +
      '<div class="pc-condition-body-wrap">' +
      '<div class="pc-condition-body">' +
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
      var condition = getConditionByName(conditionName);
      if (!condition) {
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
      hideCategoryBadge(anchor, condition);
    });
  }

  function hideCategoryBadge(anchor, condition) {
    var category = normalizeHeadingText(condition && condition.category);
    if (!category) {
      return;
    }

    Array.prototype.slice.call(anchor.querySelectorAll("span, div, p")).forEach(function (node) {
      if (normalizeHeadingText(node.textContent) !== category) {
        return;
      }

      node.style.display = "none";
      if (node.parentElement && normalizeHeadingText(node.parentElement.textContent) === category) {
        node.parentElement.style.display = "none";
      }
    });
  }

  function chipLooksActive(chip) {
    return !!(
      chip &&
      (chip.classList.contains("bg-primary") ||
        chip.classList.contains("text-primary-foreground") ||
        chip.getAttribute("aria-pressed") === "true" ||
        chip.getAttribute("data-state") === "active" ||
        chip.querySelector(".bg-primary, .text-primary-foreground, [data-state='active'], [aria-pressed='true']"))
    );
  }

  function syncFilterChipStates(chips) {
    chips.forEach(function (chip) {
      var isActive = chipLooksActive(chip);
      chip.dataset.inlineActive = isActive ? "true" : "false";
      chip.style.color = isActive ? "#ffffff" : "#64748b";
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
    syncFilterChipStates(chips);

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

  function getRouteKey() {
    var segments = window.location.pathname.split("/").filter(Boolean);
    var page = segments[0] || "Home";
    return page === "ConditionDetail" ? "ConditionDetail" : page;
  }

  function applyHeroImages() {
    var routeKey = getRouteKey();
    var imageUrl = HERO_IMAGES[routeKey];
    var imagePosition = HERO_POSITIONS[routeKey] || "center";
    var hero = document.querySelector("main > div > section");

    if (!hero || !imageUrl) {
      return;
    }

    hero.dataset.inlineHero = "true";
    hero.style.setProperty("--pc-hero-image", "url('" + imageUrl + "')");
    hero.style.setProperty("--pc-hero-position", imagePosition);
    hero.style.background = "transparent";
  }

  function scoreVisualCandidate(node) {
    if (!node) {
      return 0;
    }

    var rect = node.getBoundingClientRect();
    var area = Math.max(rect.width, 0) * Math.max(rect.height, 0);
    return area;
  }

  function replaceHeroCardMedia(hero, routeKey, positionOverride, fitMode) {
    var replacementUrl = HERO_CARD_IMAGES[routeKey];
    if (!replacementUrl) {
      return;
    }
    var imagePosition = positionOverride || "center 20%";
    var imageFit = fitMode || "cover";

    var visuals = Array.prototype.slice.call(hero.querySelectorAll("img, [style*='background-image']"));
    var candidate = null;
    var candidateScore = 0;

    visuals.forEach(function (node) {
      var score = scoreVisualCandidate(node);
      if (score > candidateScore) {
        candidate = node;
        candidateScore = score;
      }
    });

    if (!candidate) {
      return;
    }

    if (candidate.tagName === "IMG") {
      candidate.src = replacementUrl;
      candidate.srcset = "";
      candidate.alt = "Poulin Chiropractic care";
      candidate.style.objectFit = imageFit;
      candidate.style.objectPosition = imagePosition;
      candidate.style.width = "100%";
      candidate.style.height = "100%";
      if (imageFit === "contain" && candidate.parentElement) {
        candidate.parentElement.style.background = "linear-gradient(180deg, #e8e1d8 0%, #f5f1eb 100%)";
      }
    } else {
      candidate.style.backgroundImage = "url('" + replacementUrl + "')";
      candidate.style.backgroundPosition = imagePosition;
      candidate.style.backgroundSize = imageFit;
      candidate.style.backgroundRepeat = "no-repeat";
    }
  }

  function findSectionByText(snippet) {
    var normalizedSnippet = normalizeHeadingText(snippet).toLowerCase();
    var sections = Array.prototype.slice.call(document.querySelectorAll("main section"));
    var match = null;

    sections.some(function (section) {
      if (normalizeHeadingText(section.textContent).toLowerCase().indexOf(normalizedSnippet) === -1) {
        return false;
      }

      match = section;
      return true;
    });

    return match;
  }

  function buildVideoSectionMarkup(video) {
    return (
      '<section class="pc-video-section" data-inline-video-section="true">' +
      '<div class="pc-video-shell">' +
      '<div class="pc-video-grid">' +
      '<div>' +
      '<p class="pc-video-kicker">Video Resources</p>' +
      '<h2 class="pc-video-title">Hear the care philosophy directly from video.</h2>' +
      '<p class="pc-video-copy">' +
      escapeHtml(video.description) +
      " Start here with a featured educational clip, and we can keep building a stronger video library from here." +
      "</p>" +
      '<div class="pc-video-actions">' +
      '<a class="pc-video-button pc-video-button--primary" href="' +
      escapeHtml(video.youtubeUrl) +
      '" target="_blank" rel="noopener noreferrer">Watch on YouTube</a>' +
      '<a class="pc-video-button pc-video-button--ghost" href="/Contact/">Ask About This Treatment</a>' +
      "</div>" +
      '<p class="pc-video-note">' +
      escapeHtml(video.title) +
      "</p>" +
      "</div>" +
      '<div class="pc-video-frame-wrap">' +
      '<iframe class="pc-video-frame" src="https://www.youtube.com/embed/' +
      escapeHtml(video.youtubeId) +
      '?rel=0" title="' +
      escapeHtml(video.title) +
      '" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>' +
      "</div>" +
      "</div>" +
      "</div>" +
      "</section>"
    );
  }

  function insertVideoSection() {
    if (window.location.pathname !== "/" && window.location.pathname !== "/Home/") {
      return;
    }

    if (document.querySelector("[data-inline-video-section='true']")) {
      return;
    }

    var video = VIDEO_LIBRARY[0];
    if (!video) {
      return;
    }

    var anchorSection = findSectionByText("Dedicated to Your Spinal Health");
    if (anchorSection && anchorSection.parentNode) {
      anchorSection.insertAdjacentHTML("afterend", buildVideoSectionMarkup(video));
      return;
    }

    var main = document.querySelector("main");
    if (main) {
      main.insertAdjacentHTML("beforeend", buildVideoSectionMarkup(video));
    }
  }

  function isLightColor(color) {
    var match = String(color || "").match(/rgba?\(([^)]+)\)/i);
    if (!match) {
      return false;
    }

    var parts = match[1].split(",").map(function (part) {
      return Number(part.trim());
    });
    var red = parts[0] || 0;
    var green = parts[1] || 0;
    var blue = parts[2] || 0;
    var alpha = parts.length > 3 ? parts[3] : 1;
    var luminance = (red * 299 + green * 587 + blue * 114) / 1000;

    return alpha > 0.75 && luminance > 180;
  }

  function polishHomeHeroCards(hero) {
    hero.dataset.inlineHomeHero = "true";

    Array.prototype.slice.call(hero.querySelectorAll("a, button, div")).forEach(function (node) {
      var rect = node.getBoundingClientRect();
      if (rect.width < 120 || rect.height < 44) {
        return;
      }

      var styles = window.getComputedStyle(node);
      if (!isLightColor(styles.backgroundColor)) {
        return;
      }

      node.classList.add("pc-home-hero-card-float");
    });
  }

  function applyRouteHeroEnhancements() {
    var routeKey = getRouteKey();
    var hero = document.querySelector("main > div > section");

    if (!hero) {
      return;
    }

    if (routeKey === "Home") {
      replaceHeroCardMedia(hero, routeKey);
      polishHomeHeroCards(hero);
    }

    if (routeKey === "About") {
      replaceHeroCardMedia(findSectionByText("Dedicated to Your Spinal Health") || hero, routeKey, "center center", "contain");
    }
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
    applyHeroImages();
    applyRouteHeroEnhancements();
    insertVideoSection();
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

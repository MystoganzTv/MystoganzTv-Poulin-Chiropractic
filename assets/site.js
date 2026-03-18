(function () {
  var data = window.__POULIN_CONDITION_ARTICLES__ || { aliases: {}, articles: {} };
  var root = document.getElementById("app");

  if (!root) {
    return;
  }

  var TOPICS = [
    {
      slug: "back-pain",
      title: "Back Pain",
      excerpt: "Our chiropractic relief of back pain is hands-on and research-documented.",
      image: "https://www.poulinchiro.com/corporate/uploads/patient-bending-pain-newspaper-small.JPG",
      imagePosition: "center center",
      summary:
        "Back pain can come from discs, joints, ligaments, muscle overload, or irritated nerves. The goal is not to guess but to identify the true pain generator and then choose a conservative treatment path that actually matches the pattern.",
      sections: [
        {
          heading: "Why back pain needs real diagnosis",
          paragraphs: [
            "Low back pain is one of the most common reasons people seek care, but it is not one single problem. Pain may stay local in the low back, reach the buttock, travel into the thigh, or extend farther into the leg and foot. Those differences matter because they often point to different tissues being involved.",
            "The reference content from Poulin Chiropractic emphasizes that as symptoms travel farther down the leg, the case tends to become more mechanically complex. That can mean disc irritation, stenosis, or nerve root involvement rather than a simpler strain."
          ]
        },
        {
          heading: "What may be driving it",
          list: [
            "Disc irritation or disc herniation creating pressure and inflammation.",
            "Facet or sacroiliac joint irritation that flares with motion.",
            "Muscle and ligament overload after lifting, twisting, or sitting too long.",
            "Nerve irritation that creates tingling, heaviness, or referred pain into the leg."
          ]
        },
        {
          heading: "Why conservative care matters",
          paragraphs: [
            "Poulin's educational material consistently points patients toward conservative care first when the case allows it. That means trying to reduce mechanical irritation, improve motion, and restore a better environment for healing before escalating too quickly.",
            "Cox Technic Flexion Distraction and Decompression is highlighted because it aims to lower disc pressure and open spinal spaces without the kind of force that many painful backs simply do not tolerate well."
          ]
        }
      ],
      relatedConditions: ["Back Pain", "Degenerative Disc Disease", "Disc Herniation (Lumbar)", "Facet Syndrome", "Sacroiliac Joint Dysfunction", "Spinal Stenosis"]
    },
    {
      slug: "arm-shoulder-pain",
      title: "Arm & Shoulder Pain",
      excerpt: "",
      image: "https://images.unsplash.com/photo-1519824145371-296894a0daa9?auto=format&fit=crop&w=1200&q=80",
      imagePosition: "center center",
      summary:
        "Arm and shoulder pain do not always start in the shoulder. In many patients, the neck is part of the story, especially when numbness, tingling, or pain below the elbow shows up.",
      sections: [
        {
          heading: "Why the shoulder is not always the source",
          paragraphs: [
            "Pain in the shoulder blade, upper arm, elbow, forearm, or hand may still be driven by the cervical spine. That is one reason arm pain becomes frustrating so quickly: the spot that hurts is not always the structure causing the problem.",
            "Poulin's topic pages stress the need to identify whether the issue is local shoulder mechanics, cervical nerve irritation, or another pattern such as thoracic outlet involvement."
          ]
        },
        {
          heading: "Clinical clues that change the picture",
          list: [
            "Numbness or tingling can point toward nerve involvement.",
            "Weak grip or altered sensation below the elbow matters.",
            "Pain with overhead motion may suggest a stronger shoulder component.",
            "Neck stiffness with arm pain makes cervical evaluation especially important."
          ]
        }
      ],
      relatedConditions: ["Arm Pain / Radiculopathy", "Neck Pain", "Disc Herniation (Cervical)", "Thoracic Outlet Syndrome", "Whiplash"]
    },
    {
      slug: "neck-pain",
      title: "Neck Pain",
      excerpt: "",
      image: "https://images.unsplash.com/photo-1591343395902-1adcb454c4b9?auto=format&fit=crop&w=1200&q=80",
      imagePosition: "center center",
      summary:
        "Neck pain may build from posture, trauma, disc changes, arthritis, or nerve irritation. The key question is not just where it hurts, but which structure is being repeatedly provoked.",
      sections: [
        {
          heading: "Neck pain is common, but not simple",
          paragraphs: [
            "The cervical spine contains joints, discs, ligaments, muscles, and nerves packed into a relatively small region. That is why neck pain can show up as stiffness, headaches, shoulder blade pain, or arm symptoms rather than one neat presentation.",
            "Some people trace it to a sudden event, while others notice it after months of desk work, poor posture, or repeated strain."
          ]
        },
        {
          heading: "What the examination needs to sort out",
          list: [
            "Is the pain staying local in the neck or traveling into the arm?",
            "Is this more consistent with joint irritation, disc change, or a nerve pattern?",
            "Did a crash, sports injury, or sudden movement start the problem?",
            "How much has motion become limited or guarded?"
          ]
        }
      ],
      relatedConditions: ["Neck Pain", "Whiplash", "Disc Herniation (Cervical)", "Arthritis", "Arm Pain / Radiculopathy"]
    },
    {
      slug: "leg-pain",
      title: "Leg Pain",
      excerpt: "",
      image: "https://www.poulinchiro.com/corporate/uploads/lower-dermatomes.jpg",
      imagePosition: "center center",
      summary:
        "Leg pain often makes patients focus on the leg itself, but many of the most meaningful causes begin in the low back. The symptom route through the thigh, calf, shin, or foot often gives the best clue.",
      sections: [
        {
          heading: "Why leg pain often starts in the spine",
          paragraphs: [
            "Leg pain may feel like burning, tingling, heaviness, numbness, or a deep ache. It can live in the buttock, back of the thigh, groin, calf, or foot. That path matters because it often follows irritated nerve patterns.",
            "The Poulin leg pain content makes the key point clearly: the leg may be where symptoms show up, but the back is often where the real mechanical irritation begins."
          ]
        },
        {
          heading: "Patterns that need to be separated",
          list: [
            "Sciatic-type pain down the back or side of the leg.",
            "Femoral-type pain into the groin or front of the thigh.",
            "Pain worse with standing or walking that may fit a stenosis pattern.",
            "Leg symptoms connected to post-surgical or SI-related mechanics."
          ]
        }
      ],
      relatedConditions: ["Leg Pain / Sciatica", "Femoral Nerve Root Pain", "Disc Herniation (Lumbar)", "Spinal Stenosis", "Back Pain"]
    },
    {
      slug: "post-surgical-continued-pain",
      title: "Post-Surgical Continued Pain",
      excerpt: "",
      image: "https://images.unsplash.com/photo-1511174511562-5f97f4f4a1f4?auto=format&fit=crop&w=1200&q=80",
      imagePosition: "center center",
      summary:
        "Surgery can solve one problem while leaving scar tissue, adjacent-level stress, persistent nerve symptoms, or new mechanical strain behind. Patients still need a thoughtful conservative plan when pain does not fully resolve.",
      sections: [
        {
          heading: "When surgery is not the end of the story",
          paragraphs: [
            "Persistent or returning pain after surgery can feel discouraging because many patients believed the operation would be the final chapter. The reality is that the spine has still been altered mechanically, and recovery does not always finish at the operating room door.",
            "That does not mean the situation is hopeless. It means the next stage of care has to respect the surgical history and the current tolerance of the tissues."
          ]
        },
        {
          heading: "Reasons pain may remain or return",
          list: [
            "Scar tissue and persistent nerve sensitivity around the surgical site.",
            "Stress transferred to discs and joints next to the operated level.",
            "Residual stenosis or instability patterns.",
            "Biomechanical changes that make sitting, walking, or bending feel guarded."
          ]
        }
      ],
      relatedConditions: ["Persistent Post-Surgical Pain", "Post-Surgical Continued Pain", "Failed Back Surgical Syndrome", "Spinal Instability"]
    },
    {
      slug: "other-conditions",
      title: "Other Conditions",
      excerpt: "",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
      imagePosition: "center center",
      summary:
        "Not every patient fits neatly into back, neck, arm, leg, or post-surgical categories. The full condition library lets people browse structural, degenerative, inflammatory, disc, and nerve patterns in one place.",
      sections: [
        {
          heading: "Why a broader library helps",
          paragraphs: [
            "Some visitors come in with a diagnosis already attached to them, like scoliosis, arthritis, stenosis, or osteoporosis. Others only know that something has felt wrong for a long time. A broader condition library gives both groups a clearer path.",
            "Instead of forcing every symptom into one label, this section opens the wider educational library and connects people to the specific diagnoses they have heard before."
          ]
        }
      ],
      relatedConditions: ["Arthritis", "Compression Fracture", "Hyperkyphosis", "Osteoporosis", "Scoliosis", "Viscerosomatic Disease"]
    }
  ];

  var TOPIC_MAP = {};
  TOPICS.forEach(function (topic) {
    TOPIC_MAP[topic.slug] = topic;
  });

  var CATEGORY_ORDER = ["All", "Pain", "Disc", "Structural", "Nerve", "Degenerative", "Inflammatory", "Other"];

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function pagePath() {
    var path = window.location.pathname.replace(/index\.html$/, "");
    return path.endsWith("/") ? path : path + "/";
  }

  function normalizeConditionName(name) {
    return data.aliases[(name || "").trim()] || null;
  }

  function cleanConditionTitle(name, condition) {
    var display = String(name || "").trim();
    if (display) return display;
    return String((condition && condition.title) || "")
      .replace(/^About\s+Ashburn\s+and\s+Herndon\s+Chiropractic\s+and\s+Ashburn\s+and\s+Herndon\s+/i, "")
      .replace(/^About\s+Radicular\s+Ashburn\s+and\s+Herndon\s+/i, "")
      .replace(/^About\s+Ashburn\s+and\s+Herndon\s+/i, "")
      .replace(/^Poulin Chiropractic of Herndon and Ashburn Explains\s+/i, "")
      .trim();
  }

  function slugify(value) {
    return String(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function invertAliases() {
    var map = {};
    Object.keys(data.aliases || {}).forEach(function (name) {
      var key = data.aliases[name];
      if (!map[key] || name.length < map[key].length) {
        map[key] = name;
      }
    });
    return map;
  }

  var REVERSE_ALIASES = invertAliases();

  function listConditions() {
    return Object.keys(data.articles || {})
      .map(function (key) {
        var article = data.articles[key];
        var alias = REVERSE_ALIASES[key] || "";
        var title = cleanConditionTitle(alias, article);
        return {
          key: key,
          title: title,
          category: article.category || "Other",
          article: article,
          excerpt: buildConditionExcerpt(article, title)
        };
      })
      .sort(function (a, b) {
        return a.title.localeCompare(b.title);
      });
  }

  var CONDITION_LIST = listConditions();

  function textFromHtml(html) {
    var temp = document.createElement("div");
    temp.innerHTML = html || "";
    return (temp.textContent || temp.innerText || "").replace(/\s+/g, " ").trim();
  }

  function buildConditionExcerpt(article, title) {
    var text = textFromHtml(article && article.contentHtml);
    if (!text) {
      return "Read the full local article for " + title + ".";
    }
    return text.slice(0, 180).trim() + (text.length > 180 ? "..." : "");
  }

  function conditionMetaSentence(article, title) {
    var category = (article && article.category) || "Condition";
    if (category === "Disc") {
      return title + " overview with symptoms, mechanical patterns, examination ideas, and conservative care considerations.";
    }
    if (category === "Nerve") {
      return title + " guide focused on pain patterns, nerve irritation clues, and practical next-step education.";
    }
    if (category === "Degenerative") {
      return title + " guide covering common symptoms, progression patterns, and non-surgical care discussion.";
    }
    return title + " overview with symptoms, examination notes, and conservative treatment considerations.";
  }

  function noteParagraph(text) {
    var normalized = String(text || "").trim();
    return /^(video|graphic animation|goal of cox technic|description of|cervical spine exam description|lumbar spine exam description|thoracic spine exam description)/i.test(normalized);
  }

  function beautifyArticleHtml(html) {
    if (!html) return "<p>Article content is not available.</p>";

    return String(html)
      .replace(/<p>\s*<span>\s*<strong>(.*?)<\/strong>\s*<\/span>\s*<\/p>/gi, "<h2>$1</h2>")
      .replace(/<p>\s*<strong>\s*<span>(.*?)<\/span>\s*<\/strong>\s*<\/p>/gi, "<h2>$1</h2>")
      .replace(/<p>\s*<strong>(Introduction|Definition|Description|Examination|Treatment|At Home Care|Clinical Case Reports?|Summary|At-Home Focus|Treatment Approach|Common Symptoms|Why this matters.*?)<\/strong>\s*<\/p>/gi, "<h2>$1</h2>");
  }

  function formattedArticleHtml(article) {
    var container = document.createElement("div");
    container.innerHTML = beautifyArticleHtml(article && article.contentHtml);

    Array.prototype.slice.call(container.querySelectorAll("p")).forEach(function (paragraph) {
      var text = (paragraph.textContent || "").replace(/\s+/g, " ").trim();
      if (!text) {
        paragraph.remove();
        return;
      }
      if (/^Contact Poulin Chiropractic/i.test(text)) {
        paragraph.remove();
        return;
      }
      if (noteParagraph(text)) {
        var note = document.createElement("p");
        note.className = "article-note";
        note.textContent = text;
        paragraph.parentNode.replaceChild(note, paragraph);
      }
    });

    Array.prototype.slice.call(container.querySelectorAll("h2, h3")).forEach(function (heading) {
      heading.textContent = heading.textContent.replace(/\s+/g, " ").trim();
    });

    return container.innerHTML;
  }

  function getTopicForCondition(title) {
    var lower = title.toLowerCase();
    if (lower.indexOf("neck") !== -1) return TOPIC_MAP["neck-pain"];
    if (lower.indexOf("arm") !== -1 || lower.indexOf("shoulder") !== -1) return TOPIC_MAP["arm-shoulder-pain"];
    if (lower.indexOf("leg") !== -1 || lower.indexOf("sciatica") !== -1 || lower.indexOf("femoral") !== -1) return TOPIC_MAP["leg-pain"];
    if (lower.indexOf("surgical") !== -1) return TOPIC_MAP["post-surgical-continued-pain"];
    if (lower.indexOf("back") !== -1 || lower.indexOf("lumbar") !== -1 || lower.indexOf("stenosis") !== -1 || lower.indexOf("disc") !== -1) return TOPIC_MAP["back-pain"];
    return TOPIC_MAP["other-conditions"];
  }

  function navMarkup(active) {
    var links = [
      { href: "/", label: "Home", key: "home" },
      { href: "/About/", label: "About", key: "about" },
      { href: "/Services/", label: "Services", key: "services" },
      { href: "/Conditions/", label: "Conditions", key: "conditions" },
      { href: "/Blog/", label: "Blog", key: "blog" },
      { href: "/Testimonials/", label: "Testimonials", key: "testimonials" },
      { href: "/Contact/", label: "Contact", key: "contact" }
    ];

    return (
      '<header class="site-header">' +
      '<div class="container site-header__inner">' +
      '<a class="brand" href="/">' +
      '<span class="brand__mark">P</span>' +
      '<span class="brand__text"><strong>Poulin</strong><span>Chiropractic</span></span>' +
      "</a>" +
      '<nav class="site-nav">' +
      links
        .map(function (link) {
          return '<a href="' + link.href + '" class="' + (active === link.key ? "is-active" : "") + '">' + link.label + "</a>";
        })
        .join("") +
      "</nav>" +
      '<a class="site-cta site-cta--primary" href="/Contact/">Book Appointment</a>' +
      "</div>" +
      "</header>"
    );
  }

  function footerMarkup() {
    return (
      '<footer class="site-footer">' +
      '<div class="container site-footer__inner">' +
      "<div>Poulin Chiropractic of Herndon and Ashburn</div>" +
      '<div class="site-footer__links">' +
      '<a href="/About/">About</a>' +
      '<a href="/Conditions/">Conditions</a>' +
      '<a href="/Blog/">Blog</a>' +
      '<a href="/Contact/">Contact</a>' +
      "</div>" +
      "</div>" +
      "</footer>"
    );
  }

  function topicTileMarkup(topic, featured) {
    return (
      '<a class="topic-tile" href="/Blog/' +
      topic.slug +
      '/" style="--tile-image:url(\'' +
      topic.image +
      "');background-position:" +
      topic.imagePosition +
      ';">' +
      '<div class="topic-tile__content">' +
      "<h3>" +
      escapeHtml(topic.title) +
      "</h3>" +
      (featured && topic.excerpt ? "<p>" + escapeHtml(topic.excerpt) + "</p>" : "") +
      "</div>" +
      "</a>"
    );
  }

  function topicsGridMarkup() {
    return '<div class="topics-grid">' + TOPICS.map(function (topic, index) { return topicTileMarkup(topic, index === 0); }).join("") + "</div>";
  }

  function homePage() {
    return (
      '<section class="hero">' +
      '<div class="container hero__panel">' +
      '<div class="hero__copy">' +
      '<span class="eyebrow">Non-Surgical Spine Care</span>' +
      "<h1>Gentle chiropractic care for back, neck, arm and leg pain.</h1>" +
      "<p>Poulin Chiropractic has cared for Herndon and Ashburn patients since 1993 with Cox Technic Flexion-Distraction and Decompression, clear explanations, and conservative care plans built around what each patient is actually feeling.</p>" +
      '<div class="hero__actions">' +
      '<a class="site-cta site-cta--primary" href="/Contact/">Schedule a Visit</a>' +
      '<a class="site-cta site-cta--ghost" href="/Conditions/">Explore Conditions</a>' +
      "</div>" +
      '<div class="hero__stats">' +
      '<div class="hero__stat"><strong>33+</strong><span>Years serving local patients</span></div>' +
      '<div class="hero__stat"><strong>Cox®</strong><span>Part III certified care focus</span></div>' +
      '<div class="hero__stat"><strong>2</strong><span>Clinics in Herndon & Ashburn</span></div>' +
      "</div>" +
      "</div>" +
      '<div class="hero__media">' +
      '<div class="hero__badge"><strong>33+</strong><span>Years of Experience</span></div>' +
      '<div class="hero__caption"><strong>Herndon and Ashburn community care</strong><span>Conservative spine treatment with clear patient education</span></div>' +
      "</div>" +
      "</div>" +
      "</section>" +
      '<section class="section">' +
      '<div class="container">' +
      '<div class="section-header">' +
      "<div><h2 class=\"section-title\">Conditions We Treat</h2><p class=\"section-copy\">Start with the symptom area that sounds most familiar. Each card opens a dedicated page with a clearer explanation, related condition links, and a more focused reading experience.</p></div>" +
      '<a class="site-cta site-cta--ghost" href="/Blog/">View All Blog Topics</a>' +
      "</div>" +
      topicsGridMarkup() +
      "</div>" +
      "</section>" +
      '<section class="section">' +
      '<div class="container split-card">' +
      '<div class="split-card__copy">' +
      '<span class="eyebrow" style="background:rgba(32,116,104,0.08);color:var(--brand-deep);">About Dr. Poulin</span>' +
      "<h2>Dedicated to Your Spinal Health</h2>" +
      "<p>Dr. Mike Poulin has been serving the Herndon and Ashburn communities since 1993, providing expert chiropractic care with a specialization in Cox® Technic Flexion-Distraction and Decompression.</p>" +
      "<p>Our office works closely with medical doctors, neurosurgeons, pain management specialists, and orthopedic surgeons to build practical, conservative treatment paths that patients can actually follow.</p>" +
      '<div class="split-card__bullets">' +
      "<div>Cox® Part 3 Certified</div>" +
      "<div>Gentle, evidence-aware conservative treatment</div>" +
      "<div>Personalized treatment plans for each patient</div>" +
      "</div>" +
      '<div class="hero__actions"><a class="site-cta site-cta--primary" href="/About/">Learn More About Dr. Poulin</a></div>' +
      "</div>" +
      '<div class="media-stack">' +
      '<div class="media-frame media-frame--portrait">' +
      '<img class="media-photo media-photo--contain" src="https://www.poulinchiro.com/data/uploads/Poulin-Cox-9-2021.jpg" alt="Dr. Poulin with Dr. James Cox" />' +
      "</div>" +
      '<div class="caption-card"><strong>Dr. Poulin with the late Dr. James Cox</strong><span>Founder of Cox® Technic</span></div>' +
      "</div>" +
      "</div>" +
      "</section>" +
      '<section class="alone">' +
      '<div class="container alone__grid">' +
      '<div class="alone__copy">' +
      "<h2>You Are Not Alone</h2>" +
      "<p>If you suffer with spine pain or spine-related pain, neck pain, arm pain, leg pain or low back pain, you are not alone.</p>" +
      "<p><strong>One in 3 people in the U.S.</strong> suffers back pain at any given time, and studies show that 80% of Ashburn and Herndon residents will suffer back pain at some time in their lives. Spine pain robs you of your quality of life, and when it does, you want and deserve your pain-free life back as gently, effectively, and swiftly as possible.</p>" +
      "<p>At Poulin Chiropractic of Herndon and Ashburn, we have educational resources, research, and treatment options to get you back on your feet.</p>" +
      "</div>" +
      '<div class="alone__image"></div>' +
      "</div>" +
      "</section>"
    );
  }

  function aboutPage() {
    return (
      '<section class="about-hero">' +
      '<div class="container about-hero__panel">' +
      '<span class="eyebrow">About Poulin Chiropractic</span>' +
      "<h1>Experienced, conservative care with a strong educational philosophy.</h1>" +
      "<p>Poulin Chiropractic has spent decades helping patients understand what is happening in the spine, what their symptoms may mean, and what conservative care can realistically do next.</p>" +
      "</div>" +
      "</section>" +
      '<section class="section">' +
      '<div class="container split-card">' +
      '<div class="media-stack">' +
      '<div class="media-frame media-frame--portrait">' +
      '<img class="media-photo media-photo--contain" src="https://www.poulinchiro.com/data/uploads/Poulin-Cox-9-2021.jpg" alt="Dr. Poulin with Dr. James Cox" />' +
      "</div>" +
      '<div class="caption-card"><strong>Dr. Poulin with the late Dr. James Cox</strong><span>Founder of Cox® Technic - Cox Technic Seminar 2021</span></div>' +
      "</div>" +
      '<div class="split-card__copy">' +
      '<span class="eyebrow" style="background:rgba(32,116,104,0.08);color:var(--brand-deep);">Dedicated to Your Spinal Health</span>' +
      "<h2>Dedicated to Your Spinal Health</h2>" +
      "<p>Dr. Mike Poulin has been serving the Herndon and Ashburn communities since 1993, providing expert chiropractic care with a specialization in Cox® Technic Flexion-Distraction and Decompression.</p>" +
      "<p>He works closely with medical doctors, neurosurgeons, pain management specialists, and orthopedic surgeons so patients have a clear, coordinated, and conservative path forward.</p>" +
      '<div class="split-card__bullets">' +
      "<div>Cox® Part 3 Certified - less than 1% of chiropractors worldwide</div>" +
      "<div>Non-surgical, gentle, evidence-aware treatment</div>" +
      "<div>Focused on communication, education and realistic progress</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</section>" +
      '<section class="section">' +
      '<div class="container split-card split-card--reverse">' +
      '<div class="split-card__copy">' +
      '<span class="eyebrow" style="background:rgba(32,116,104,0.08);color:var(--brand-deep);">Approach</span>' +
      "<h2>What patients can expect</h2>" +
      "<p>Poulin Chiropractic combines examination, patient education, Cox Technic protocols, and practical home guidance. The point is not to bury patients in vague wellness language. It is to explain the mechanics clearly and reduce the fear that often comes with persistent spinal pain.</p>" +
      "<p>The office also uses educational resources because patients do better when they understand their condition, the treatment plan, and what progress should realistically look like over time.</p>" +
      "</div>" +
      '<div class="media-frame">' +
      '<img class="media-photo media-photo--contain" src="https://www.poulinchiro.com/data/uploads/Doctor-Cox-with-Doctor-Poulin.jpg" alt="Dr. Poulin at a Cox Technic seminar" />' +
      "</div>" +
      "</div>" +
      "</section>"
    );
  }

  function blogLandingPage() {
    return (
      '<section class="blog-hero">' +
      '<div class="container blog-hero__panel">' +
      '<span class="eyebrow">Blog</span>' +
      "<h1>Educational articles organized in one place.</h1>" +
      "<p>Browse symptom-based reading pages for back pain, arm pain, neck pain, leg pain, post-surgical pain, and other conditions, then move into the full condition library when you want more detail.</p>" +
      "</div>" +
      "</section>" +
      '<section class="section">' +
      '<div class="container">' +
      '<div class="section-header">' +
      "<div><h2 class=\"section-title\">Browse Pain Topics</h2><p class=\"section-copy\">Start with the topic that sounds most like your symptoms. From there, you can move into conditions and deeper articles without getting lost.</p></div>" +
      "</div>" +
      '<div class="blog-grid">' +
      TOPICS.map(function (topic) {
        return (
          '<a class="blog-card" href="/Blog/' +
          topic.slug +
          '/">' +
          '<div class="blog-card__media" style="--card-image:url(\'' +
          topic.image +
          "');background-position:" +
          topic.imagePosition +
          ';"></div>' +
          '<div class="blog-card__body"><h3>' +
          escapeHtml(topic.title) +
          "</h3><p>" +
          escapeHtml(topic.summary) +
          "</p></div></a>"
        );
      }).join("") +
      "</div>" +
      "</div>" +
      "</section>"
    );
  }

  function servicesPage() {
    return (
      '<section class="about-hero">' +
      '<div class="container about-hero__panel">' +
      '<span class="eyebrow">Services</span>' +
      "<h1>Conservative care built around spinal mechanics and patient education.</h1>" +
      "<p>Poulin Chiropractic focuses on gentle, non-surgical care that helps patients understand their pain pattern, their diagnosis, and the treatment path being recommended.</p>" +
      "</div>" +
      "</section>" +
      '<section class="section"><div class="container content-grid">' +
      '<article class="panel-card"><h2>Cox® Technic Flexion-Distraction</h2><p>A signature service of the practice, used to reduce mechanical irritation, decompress spinal structures, and create a treatment approach many painful patients tolerate better than high-force care.</p></article>' +
      '<article class="panel-card"><h2>Condition-Focused Evaluation</h2><p>Every treatment plan starts with a closer look at what tissue or pattern may actually be responsible for the symptoms, rather than relying on generic back or neck pain language.</p></article>' +
      '<article class="panel-card"><h2>Post-Surgical Conservative Support</h2><p>Patients with persistent pain after surgery often need a thoughtful, lower-force plan that respects the surgical history while addressing current mechanics and function.</p></article>' +
      '<article class="panel-card"><h2>Collaborative Care</h2><p>The office works alongside medical doctors, pain management specialists, neurosurgeons, and orthopedists when patients need a broader care team.</p></article>' +
      "</div></section>"
    );
  }

  function testimonialsPage() {
    return (
      '<section class="blog-hero">' +
      '<div class="container blog-hero__panel">' +
      '<span class="eyebrow">Testimonials</span>' +
      "<h1>Patient experience matters.</h1>" +
      "<p>People come here for clarity, gentler treatment options, and a sense that someone is actually paying attention to the pattern of their pain.</p>" +
      "</div>" +
      "</section>" +
      '<section class="section"><div class="container content-grid">' +
      '<article class="panel-card"><p class="quote">“I finally felt like someone explained what was going on instead of rushing me through another appointment.”</p><strong>Back pain patient</strong></article>' +
      '<article class="panel-card"><p class="quote">“The office was calm, clear, and conservative. That mattered because my spine was too sensitive for aggressive treatment.”</p><strong>Post-surgical patient</strong></article>' +
      '<article class="panel-card"><p class="quote">“I appreciated that the plan was explained step by step, including what improvement should realistically look like.”</p><strong>Neck and arm pain patient</strong></article>' +
      "</div></section>"
    );
  }

  function contactPage() {
    return (
      '<section class="conditions-hero">' +
      '<div class="container conditions-hero__panel">' +
      '<span class="eyebrow">Contact</span>' +
      "<h1>Schedule a visit or get in touch.</h1>" +
      "<p>Poulin Chiropractic serves patients in Herndon and Ashburn who are looking for a gentler, more explanatory approach to spine care.</p>" +
      "</div>" +
      '</section>' +
      '<section class="section"><div class="container contact-layout">' +
      '<div class="panel-card"><h2>Herndon Office</h2><p>12973 Highland Crossing Drive<br />Herndon, VA 20171</p><p><a href="tel:703-435-4445">(703) 435-4445</a></p></div>' +
      '<div class="panel-card"><h2>Ashburn Office</h2><p>44355 Premier Plaza, Suite 210<br />Ashburn, VA 20147</p><p><a href="tel:703-858-0080">(703) 858-0080</a></p></div>' +
      '<div class="panel-card"><h2>Next Step</h2><p>If you are unsure whether your symptoms fit chiropractic care, start with the educational pages or contact the office to discuss your situation before booking.</p><div class="hero__actions"><a class="site-cta site-cta--primary" href="/Conditions/">Browse Conditions</a></div></div>' +
      "</div></section>"
    );
  }

  function relatedConditionsMarkup(topic) {
    var links = (topic.relatedConditions || [])
      .map(function (name) {
        return normalizeConditionName(name) ? '<a class="site-cta site-cta--ghost" href="/ConditionDetail/?name=' + encodeURIComponent(name) + '">' + escapeHtml(name) + "</a>" : "";
      })
      .filter(Boolean)
      .join("");

    if (!links) return "";

    return (
      '<section class="section">' +
      '<div class="container">' +
      '<div class="section-header"><div><h2 class="section-title">Related Conditions</h2><p class="section-copy">Move from symptom language into the specific condition articles that best match this pattern.</p></div></div>' +
      '<div style="display:flex;flex-wrap:wrap;gap:12px;">' +
      links +
      "</div>" +
      "</div>" +
      "</section>"
    );
  }

  function topicSectionsMarkup(topic) {
    return topic.sections
      .map(function (section) {
        return (
          '<h2>' +
          escapeHtml(section.heading) +
          "</h2>" +
          (section.paragraphs || [])
            .map(function (paragraph) {
              return "<p>" + escapeHtml(paragraph) + "</p>";
            })
            .join("") +
          ((section.list || []).length
            ? "<ul>" +
              section.list
                .map(function (item) {
                  return "<li>" + escapeHtml(item) + "</li>";
                })
                .join("") +
              "</ul>"
            : "")
        );
      })
      .join("");
  }

  function blogDetailPage(topic) {
    if (!topic) return blogLandingPage();
    return (
      '<section class="article-hero">' +
      '<div class="container article-hero__panel article-hero__panel--image" style="--hero-image:url(\'' +
      topic.image +
      "');background-position:" +
      topic.imagePosition +
      ';">' +
      '<span class="eyebrow">Blog Topic</span>' +
      "<h1>" +
      escapeHtml(topic.title) +
      "</h1>" +
      "<p>" +
      escapeHtml(topic.summary) +
      "</p>" +
      '<div class="hero__actions"><a class="site-cta site-cta--primary" href="/Blog/">Back to Blog</a><a class="site-cta site-cta--ghost" href="/Conditions/">Open Conditions</a></div>' +
      "</div>" +
      "</section>" +
      '<section class="section"><div class="container article-shell"><div class="article-body">' +
      topicSectionsMarkup(topic) +
      "</div></div></section>" +
      relatedConditionsMarkup(topic)
    );
  }

  function conditionsPage() {
    return (
      '<section class="conditions-hero">' +
      '<div class="container conditions-hero__panel">' +
      '<span class="eyebrow">Conditions</span>' +
      "<h1>Browse the local condition library.</h1>" +
      "<p>Search by name, filter by category, and open the full local article for each condition. This library is meant to help patients move from vague symptom labels into clearer condition-specific reading.</p>" +
      "</div>" +
      "</section>" +
      '<section class="section"><div class="container conditions-layout">' +
      '<div class="filters">' +
      '<p class="filters__title">Find a condition</p>' +
      '<input id="condition-search" class="search" type="search" placeholder="Search conditions..." />' +
      '<div id="condition-chips" class="chip-row"></div>' +
      "</div>" +
      '<div class="conditions-results">' +
      '<p id="conditions-count" class="conditions-results__count"></p>' +
      '<div id="conditions-grid" class="condition-grid"></div>' +
      "</div>" +
      "</div></section>"
    );
  }

  function conditionDetailPage(name) {
    var key = normalizeConditionName(name) || "";
    var article = data.articles[key];
    if (!article) {
      return (
        '<section class="article-hero"><div class="container article-hero__panel"><span class="eyebrow">Condition Detail</span><h1>Condition not found</h1><p>The requested article could not be found locally.</p></div></section>'
      );
    }

    var title = cleanConditionTitle(name, article);
    var topic = getTopicForCondition(title);
    return (
      '<section class="article-hero">' +
      '<div class="container article-hero__panel">' +
      '<span class="eyebrow">Condition Guide</span>' +
      "<h1>" +
      escapeHtml(title) +
      "</h1>" +
      "<p>" +
      escapeHtml(conditionMetaSentence(article, title)) +
      "</p>" +
      '<div class="hero__actions"><a class="site-cta site-cta--primary" href="/Conditions/">Back to Conditions</a><a class="site-cta site-cta--ghost" href="/Blog/' +
      topic.slug +
      '/">Related Blog Topic</a></div>' +
      "</div>" +
      "</section>" +
      '<section class="section"><div class="container article-shell"><div class="article-body">' +
      formattedArticleHtml(article) +
      "</div></div></section>"
    );
  }

  function renderConditionCards(items) {
    return items
      .map(function (item) {
        return (
          '<a class="condition-card" href="/ConditionDetail/?name=' +
          encodeURIComponent(item.title) +
          '">' +
          '<div><h3>' +
          escapeHtml(item.title) +
          "</h3><p>" +
          escapeHtml(item.excerpt) +
          '</p></div><span class="condition-card__meta">' +
          escapeHtml(item.category || "Other") +
          "</span></a>"
        );
      })
      .join("");
  }

  function mountConditionsControls() {
    var search = document.getElementById("condition-search");
    var chipsRoot = document.getElementById("condition-chips");
    var count = document.getElementById("conditions-count");
    var grid = document.getElementById("conditions-grid");

    if (!search || !chipsRoot || !count || !grid) return;

    var activeCategory = "All";
    var categories = CATEGORY_ORDER.filter(function (category) {
      if (category === "All") return true;
      return CONDITION_LIST.some(function (item) {
        return item.category === category;
      });
    });

    chipsRoot.innerHTML = categories
      .map(function (category) {
        return '<button class="chip ' + (category === "All" ? "is-active" : "") + '" data-category="' + escapeHtml(category) + '">' + escapeHtml(category) + "</button>";
      })
      .join("");

    function renderList() {
      var query = search.value.trim().toLowerCase();
      var items = CONDITION_LIST.filter(function (item) {
        var matchCategory = activeCategory === "All" || item.category === activeCategory;
        var matchQuery =
          !query ||
          item.title.toLowerCase().indexOf(query) !== -1 ||
          item.excerpt.toLowerCase().indexOf(query) !== -1;
        return matchCategory && matchQuery;
      });

      count.textContent = items.length + " conditions found";
      grid.innerHTML = renderConditionCards(items);
    }

    chipsRoot.addEventListener("click", function (event) {
      var button = event.target.closest("[data-category]");
      if (!button) return;
      activeCategory = button.getAttribute("data-category");
      Array.prototype.slice.call(chipsRoot.querySelectorAll(".chip")).forEach(function (chip) {
        chip.classList.toggle("is-active", chip === button);
      });
      renderList();
    });

    search.addEventListener("input", renderList);
    renderList();
  }

  function routeInfo() {
    var path = pagePath();
    var params = new URLSearchParams(window.location.search);

    if (path === "/" || path === "/Home/") return { key: "home" };
    if (path === "/About/") return { key: "about" };
    if (path === "/Services/") return { key: "services" };
    if (path === "/Conditions/") return { key: "conditions" };
    if (path === "/ConditionDetail/") return { key: "condition-detail", name: params.get("name") || "" };
    if (path === "/Blog/") return { key: "blog" };
    if (path === "/Testimonials/") return { key: "testimonials" };
    if (path === "/Contact/") return { key: "contact" };
    if (path.indexOf("/Blog/") === 0) {
      var pieces = path.split("/").filter(Boolean);
      return { key: "blog-detail", slug: pieces[1] || "" };
    }
    return { key: "home" };
  }

  function pageContent(route) {
    if (route.key === "about") return aboutPage();
    if (route.key === "services") return servicesPage();
    if (route.key === "blog") return blogLandingPage();
    if (route.key === "blog-detail") return blogDetailPage(TOPIC_MAP[route.slug]);
    if (route.key === "conditions") return conditionsPage();
    if (route.key === "condition-detail") return conditionDetailPage(route.name);
    if (route.key === "testimonials") return testimonialsPage();
    if (route.key === "contact") return contactPage();
    return homePage();
  }

  function activeNavKey(route) {
    if (route.key === "blog-detail") return "blog";
    if (route.key === "condition-detail") return "conditions";
    return route.key;
  }

  function render() {
    var route = routeInfo();
    root.innerHTML =
      navMarkup(activeNavKey(route)) +
      '<main class="site-main">' +
      pageContent(route) +
      "</main>" +
      footerMarkup();

    if (route.key === "conditions") {
      mountConditionsControls();
    }
  }

  render();
})();

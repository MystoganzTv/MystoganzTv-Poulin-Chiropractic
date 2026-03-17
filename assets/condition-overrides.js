(function () {
  var dataset = window.__POULIN_CONDITION_ARTICLES__;
  var ACTIVE_CONDITION = null;
  var ACTIVE_PANEL = null;
  var ACTIVE_TOPIC = null;
  var ACTIVE_TOPIC_PANEL = null;
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
    About: "https://www.poulinchiro.com/data/uploads/Poulin-Cox-9-2021.jpg",
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

  var PAIN_TOPIC_LIBRARY = [
    {
      slug: "back-pain",
      title: "Back Pain",
      category: "Lumbar Focus",
      imageUrl: "https://www.poulinchiro.com/corporate/uploads/patient-bending-pain-newspaper-small.JPG",
      imagePosition: "center 42%",
      excerpt:
        "Back pain can feel similar from the outside while coming from very different tissues underneath. The goal is to identify whether the driver is disc, joint, ligament, muscle, stenosis, or nerve irritation before choosing care.",
      sourceUrl: "https://www.poulinchiro.com/chiropractic-topics/ashburn-and-herndon-back-pain",
      sections: [
        {
          heading: "Why back pain needs a real workup",
          paragraphs: [
            "Low back pain often gets treated like one single diagnosis, but the experience can be completely different from one patient to the next. Some people have pain only in the low back. Others feel it spread into the buttock, thigh, calf, or foot. That travel pattern matters.",
            "The Poulin reference material emphasizes that as symptoms travel farther down the leg, the problem is often more mechanically complex. That can point to disc pressure, stenosis, or nerve root involvement instead of a simpler strain."
          ]
        },
        {
          heading: "What may be causing it",
          list: [
            "Disc irritation or disc herniation creating pressure changes in the low back.",
            "Facet joint or sacroiliac irritation that feels local but flares with movement.",
            "Muscle and ligament overload after lifting, twisting, or long periods of sitting.",
            "Nerve irritation that sends pain, tingling, or heaviness into the buttock or leg."
          ]
        },
        {
          heading: "How Poulin approaches it conservatively",
          paragraphs: [
            "The chiropractic topic pages consistently point patients toward a conservative, non-surgical path first when it is clinically appropriate. The idea is to reduce mechanical irritation, improve motion, and calm the tissues that are keeping the spine irritated.",
            "Cox Technic Flexion Distraction and Decompression is presented as the office's signature approach because it aims to lower disc pressure, open spinal spaces, and create a better environment for healing without aggressive force."
          ]
        },
        {
          heading: "What usually helps patients most",
          list: [
            "A precise exam instead of guessing from symptoms alone.",
            "Matching care to the pattern of pain instead of using the same plan for everyone.",
            "Avoiding the positions and routines that keep re-aggravating the area.",
            "Knowing when leg symptoms or weakness mean the case needs closer attention."
          ]
        }
      ],
      relatedConditions: ["Back Pain", "Degenerative Disc Disease", "Disc Herniation (Lumbar)", "Facet Syndrome", "Sacroiliac Joint Dysfunction", "Spinal Stenosis"],
    },
    {
      slug: "arm-shoulder-pain",
      title: "Arm & Shoulder Pain",
      category: "Cervical & Shoulder",
      imageUrl: "https://www.poulinchiro.com/corporate/uploads/arm-dermatomes.jpg",
      imagePosition: "center center",
      excerpt:
        "Arm and shoulder pain can come from the shoulder itself, but it can also start in the neck. Tingling, numbness, weakness, and pain patterns help separate a local shoulder problem from a cervical nerve problem.",
      sourceUrl: "https://www.poulinchiro.com/chiropractic-topics/ashburn-and-herndon-arm-pain",
      sections: [
        {
          heading: "Why the source is not always the shoulder",
          paragraphs: [
            "One of the biggest frustrations with arm pain is that the sore area is not always the true source. Pain at the shoulder blade, elbow, hand, or fingers may actually start higher up in the cervical spine.",
            "That is why Poulin's arm pain material keeps returning to the same theme: diagnose the generator first. A painful shoulder, a compressed cervical nerve, and an irritated thoracic outlet can all feel similar at first glance."
          ]
        },
        {
          heading: "Patterns that matter",
          list: [
            "Pain with numbness or tingling can suggest nerve involvement.",
            "Weak grip, altered sensation, or pain below the elbow often changes the clinical picture.",
            "Pain tied to overhead motion may point more strongly to shoulder mechanics.",
            "Neck stiffness with radiating arm symptoms makes cervical evaluation especially important."
          ]
        },
        {
          heading: "How conservative care fits in",
          paragraphs: [
            "The source pages describe a gentle path that begins with examination and uses care to reduce irritation around the involved spinal tissues. When arm symptoms are neck related, decompressing the cervical spine and restoring motion can be part of the strategy.",
            "That same approach is paired with movement guidance and home advice so patients are not just feeling temporary relief in the office."
          ]
        },
        {
          heading: "What this section is designed to answer",
          list: [
            "Is the arm pain being driven by the neck?",
            "Does the symptom pattern sound like radiculopathy?",
            "Is there a mechanical reason the pain keeps returning?",
            "Which related conditions should I read next?"
          ]
        }
      ],
      relatedConditions: ["Arm Pain / Radiculopathy", "Neck Pain", "Disc Herniation (Cervical)", "Thoracic Outlet Syndrome", "Myelopathy", "Whiplash"],
    },
    {
      slug: "neck-pain",
      title: "Neck Pain",
      category: "Cervical Focus",
      imageUrl: "https://www.poulinchiro.com/corporate/images/chiropractic-services-cadeusus.jpg",
      imagePosition: "center center",
      excerpt:
        "Neck pain can build from posture, stress, trauma, disc changes, arthritis, or nerve irritation. The important question is not just where it hurts, but what movement or structure is actually provoking it.",
      sourceUrl: "https://www.poulinchiro.com/chiropractic-topics/ashburn-and-herndon-neck-pain",
      sections: [
        {
          heading: "Neck pain is common, but not simple",
          paragraphs: [
            "Neck pain can show up as stiffness, headaches, pain into the shoulder blade, or symptoms that travel down the arm. Some patients feel it after a sudden event like a crash or sports injury. Others notice it after months of desk work, poor posture, or repeated strain.",
            "The Poulin neck pain topic page frames the problem well: the cervical spine contains joints, muscles, ligaments, discs, and nerves, so several structures can create similar pain until a proper examination sorts them out."
          ]
        },
        {
          heading: "Clues that help narrow it down",
          list: [
            "Pain only in the neck often behaves differently than pain that runs into the arm or hand.",
            "Headaches, upper back tightness, and shoulder blade pain can still come from the neck.",
            "A history of trauma changes the questions that need to be asked.",
            "Limited range of motion and pain with rotation may signal joint and disc involvement."
          ]
        },
        {
          heading: "What the office aims to do",
          paragraphs: [
            "The conservative model used across Poulin's educational pages is built around reducing mechanical stress, restoring motion, and improving how the cervical spine handles load throughout the day.",
            "When the clinical picture fits, that means using gentle decompressive care, not simply forcing motion into an already irritated area."
          ]
        },
        {
          heading: "Why patients keep reading from here",
          list: [
            "To understand whether symptoms are staying local or becoming nerve related.",
            "To compare neck pain with whiplash, arthritis, disc herniation, and arm pain patterns.",
            "To move from a vague symptom label into a more specific explanation."
          ]
        }
      ],
      relatedConditions: ["Neck Pain", "Whiplash", "Disc Herniation (Cervical)", "Arthritis", "Arm Pain / Radiculopathy", "Thoracic Outlet Syndrome"],
    },
    {
      slug: "leg-pain",
      title: "Leg Pain",
      category: "Radicular Patterns",
      imageUrl: "https://www.poulinchiro.com/corporate/uploads/lower-dermatomes.jpg",
      imagePosition: "center center",
      excerpt:
        "Leg pain often makes people focus on the leg itself, but many cases are driven from the low back. Sciatica, femoral nerve irritation, stenosis, SI dysfunction, and hip-related patterns can overlap until the exam makes the source clearer.",
      sourceUrl: "https://www.poulinchiro.com/chiropractic-topics/ashburn-and-herndon-leg-pain",
      sections: [
        {
          heading: "Why leg pain is usually a spine conversation too",
          paragraphs: [
            "Leg pain can feel like burning, tingling, heaviness, numbness, or a deep ache. It may live in the buttock, back of the thigh, calf, shin, groin, or front of the thigh. That route matters because it often follows irritated nerve pathways.",
            "The Poulin leg pain page explains that the leg may be where symptoms show up, but the low back is frequently where the real irritation begins."
          ]
        },
        {
          heading: "Common pain patterns patients describe",
          list: [
            "Sciatic-type pain down the back or side of the leg.",
            "Femoral-type pain into the groin or front of the thigh.",
            "Pain that is worse with standing or walking and eases with flexion.",
            "Numbness, tingling, or weakness that feels more neurological than muscular."
          ]
        },
        {
          heading: "What needs to be differentiated",
          paragraphs: [
            "A patient with leg pain may be dealing with disc herniation, stenosis, SI dysfunction, hip referral, or a post-surgical issue. Those are not interchangeable problems, and they should not all be managed with the same assumptions.",
            "That is why this section is built to connect the symptom to its related condition articles instead of stopping at the generic phrase leg pain."
          ]
        },
        {
          heading: "How conservative care is positioned",
          list: [
            "Lower mechanical pressure on the involved spinal tissues.",
            "Make room for calmer nerve function when irritation is driving symptoms.",
            "Support walking, sitting, and daily movement with less flare-up.",
            "Help patients understand when a symptom pattern deserves faster follow-up."
          ]
        }
      ],
      relatedConditions: ["Leg Pain / Sciatica", "Femoral Nerve Root Pain", "Disc Herniation (Lumbar)", "Spinal Stenosis", "Sacroiliac Joint Dysfunction", "Back Pain"],
    },
    {
      slug: "post-surgical-continued-pain",
      title: "Post-Surgical Continued Pain",
      category: "Post-Surgical Care",
      imageUrl: "https://www.poulinchiro.com/data/uploads/doctor_cox_with_doctor_poulin.jpg",
      imagePosition: "center 32%",
      excerpt:
        "Surgery can solve one problem while leaving irritation, scar tissue, adjacent-level stress, or persistent nerve symptoms behind. Patients still need a thoughtful conservative plan when pain does not fully resolve or returns later.",
      sourceUrl: "https://www.poulinchiro.com/id-your-pain/by-conditions/persistent-post-surgical-pain",
      sections: [
        {
          heading: "When surgery is not the end of the story",
          paragraphs: [
            "Persistent or returning pain after surgery is emotionally exhausting because many patients expected the operation to be the final step. The Poulin reference page meets that reality directly: pain may improve, change, or remain because the spine has still been altered mechanically.",
            "That does not automatically mean the situation is hopeless. It means the next stage of care has to respect the surgical history and the current tissue behavior."
          ]
        },
        {
          heading: "Why pain may remain or come back",
          list: [
            "Scar tissue and persistent nerve sensitivity around the surgical site.",
            "Stress transferred to discs and joints next to the operated level.",
            "Residual stenosis or instability patterns that still need management.",
            "Biomechanical changes that make daily movement feel guarded or painful."
          ]
        },
        {
          heading: "How conservative management fits after surgery",
          paragraphs: [
            "The source material presents chiropractic flexion distraction and decompression as a cautious, non-surgical option for appropriate post-surgical cases. The emphasis is not on pretending surgery never happened. It is on working safely with what the spine is now.",
            "That usually means a gentler pace, careful re-evaluation, and a plan built around tolerance instead of force."
          ]
        },
        {
          heading: "Topics patients usually want next",
          list: [
            "Is this more like persistent post-surgical pain or failed back surgical syndrome?",
            "Are nearby levels now taking extra stress?",
            "What can still improve without another procedure?"
          ]
        }
      ],
      relatedConditions: ["Persistent Post-Surgical Pain", "Post-Surgical Continued Pain", "Failed Back Surgical Syndrome", "Spinal Instability", "Degenerative Disc Disease"],
    },
    {
      slug: "other-conditions",
      title: "Other Conditions",
      category: "Condition Library",
      imageUrl: "https://www.poulinchiro.com/data/uploads/ashburnoffice20130523.jpg",
      imagePosition: "center center",
      excerpt:
        "Not every patient fits neatly into the back, neck, arm, leg, or post-surgical buckets. This section opens the wider condition library so people can explore structural, inflammatory, degenerative, nerve, and other patterns in one place.",
      sourceUrl: "https://www.poulinchiro.com/id-your-pain/by-conditions",
      sections: [],
      relatedConditions: ["Arthritis", "Compression Fracture", "Hyperkyphosis", "Osteoporosis", "Scoliosis", "Viscerosomatic Disease"],
    },
  ];

  function getPainTopicBySlug(slug) {
    var match = null;

    PAIN_TOPIC_LIBRARY.some(function (topic) {
      if (topic.slug !== slug) {
        return false;
      }

      match = topic;
      return true;
    });

    return match;
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

  function buildTopicSectionsHtml(sections) {
    return (sections || [])
      .map(function (section) {
        var html = '<section class="pc-topic-copy-section">';
        html += "<h3>" + escapeHtml(section.heading || "") + "</h3>";

        (section.paragraphs || []).forEach(function (paragraph) {
          html += "<p>" + escapeHtml(paragraph) + "</p>";
        });

        if (section.list && section.list.length) {
          html += "<ul>";
          section.list.forEach(function (item) {
            html += "<li>" + escapeHtml(item) + "</li>";
          });
          html += "</ul>";
        }

        html += "</section>";
        return html;
      })
      .join("");
  }

  function groupConditionsByCategory(limitPerCategory) {
    var grouped = {};
    var categories = ["Pain", "Degenerative", "Structural", "Nerve", "Inflammatory", "Other"];
    var names = Object.keys(dataset.aliases || {});

    names.forEach(function (name) {
      var condition = getConditionByName(name);
      var category = normalizeHeadingText(condition && condition.category) || "Other";

      if (grouped[category]) {
        return;
      }

      grouped[category] = [];
    });

    names.forEach(function (name) {
      var condition = getConditionByName(name);
      var category = normalizeHeadingText(condition && condition.category) || "Other";

      if (!grouped[category]) {
        grouped[category] = [];
      }

      if (grouped[category].indexOf(name) !== -1) {
        return;
      }

      if (grouped[category].length >= limitPerCategory) {
        return;
      }

      grouped[category].push(name);
    });

    return categories
      .filter(function (category) {
        return grouped[category] && grouped[category].length;
      })
      .map(function (category) {
        return {
          name: category,
          items: grouped[category],
        };
      });
  }

  function buildOtherConditionsShowcaseHtml() {
    return groupConditionsByCategory(6)
      .map(function (group) {
        var items = group.items
          .map(function (item) {
            return '<li><a href="/Conditions/#condition-' + escapeHtml(slugifyConditionName(item)) + '">' + escapeHtml(item) + "</a></li>";
          })
          .join("");

        return (
          '<article class="pc-topic-related-group">' +
          '<p class="pc-topic-related-kicker">' +
          escapeHtml(group.name) +
          "</p>" +
          "<ul>" +
          items +
          "</ul>" +
          "</article>"
        );
      })
      .join("");
  }

  function buildTopicBodyHtml(topic) {
    if (!topic) {
      return "";
    }

    if (topic.slug === "other-conditions") {
      return (
        '<section class="pc-topic-copy-section">' +
        "<h3>The broader condition library</h3>" +
        "<p>Some patients walk in knowing they have a diagnosis like scoliosis, spinal stenosis, arthritis, or osteoporosis. Others only know that something is not right. This library-style view gives those visitors a cleaner way to browse by category without leaving the site.</p>" +
        "<p>Instead of forcing every symptom into one bucket, this section opens the rest of the Poulin condition collection so patients can move from symptom language into the specific diagnoses they have already been told about.</p>" +
        "</section>" +
        '<section class="pc-topic-copy-section">' +
        "<h3>Explore by category</h3>" +
        '<div class="pc-topic-related-grid">' +
        buildOtherConditionsShowcaseHtml() +
        "</div>" +
        "</section>"
      );
    }

    return buildTopicSectionsHtml(topic.sections);
  }

  function buildTopicRelatedHtml(topic) {
    var names = (topic && topic.relatedConditions) || [];
    var items = names
      .filter(function (name) {
        return !!getConditionByName(name);
      })
      .map(function (name) {
        return (
          '<a class="pc-topic-related-pill" href="/Conditions/#condition-' +
          escapeHtml(slugifyConditionName(name)) +
          '">' +
          escapeHtml(name) +
          "</a>"
        );
      })
      .join("");

    if (!items) {
      return "";
    }

    return (
      '<section class="pc-topic-copy-section">' +
      "<h3>Related conditions to explore next</h3>" +
      '<div class="pc-topic-related-pills">' +
      items +
      "</div>" +
      "</section>"
    );
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
      ".pc-topic-section,.pc-blog-section{" +
      "padding:4.75rem 1.5rem;" +
      "background:linear-gradient(180deg, #f8fcfb 0%, #ffffff 100%);" +
      "}" +
      ".pc-topic-shell,.pc-blog-shell{" +
      "max-width:76rem;" +
      "margin:0 auto;" +
      "}" +
      ".pc-topic-intro,.pc-blog-intro{" +
      "display:flex;" +
      "justify-content:space-between;" +
      "gap:1.5rem;" +
      "align-items:end;" +
      "margin-bottom:1.8rem;" +
      "}" +
      ".pc-topic-eyebrow,.pc-blog-eyebrow{" +
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
      ".pc-topic-heading,.pc-blog-heading{" +
      "margin:0.95rem 0 0;" +
      "font-family:var(--font-display);" +
      "font-size:clamp(2.1rem, 3vw, 3.25rem);" +
      "line-height:1.03;" +
      "letter-spacing:-0.035em;" +
      "color:hsl(var(--foreground));" +
      "text-wrap:balance;" +
      "}" +
      ".pc-topic-copy,.pc-blog-copy{" +
      "margin:1rem 0 0;" +
      "max-width:40rem;" +
      "font-size:1rem;" +
      "line-height:1.75;" +
      "color:rgba(71,85,105,0.92);" +
      "}" +
      ".pc-topic-grid{" +
      "display:grid;" +
      "grid-template-columns:repeat(3, minmax(0, 1fr));" +
      "gap:1rem;" +
      "}" +
      ".pc-topic-card{" +
      "position:relative;" +
      "overflow:hidden;" +
      "display:flex;" +
      "align-items:flex-end;" +
      "min-height:17rem;" +
      "padding:1.5rem;" +
      "border:none;" +
      "border-radius:1.6rem;" +
      "background:linear-gradient(180deg, rgba(10,19,29,0.08), rgba(7,18,26,0.68)), var(--pc-topic-card-image) var(--pc-topic-card-position, center center) / cover no-repeat;" +
      "box-shadow:0 24px 52px rgba(15,23,42,0.12);" +
      "text-align:left;" +
      "cursor:pointer;" +
      "isolation:isolate;" +
      "transition:transform 180ms ease, box-shadow 180ms ease;" +
      "}" +
      ".pc-topic-card::after{" +
      "content:'';" +
      "position:absolute;" +
      "inset:0;" +
      "background:linear-gradient(180deg, rgba(7,18,26,0.02) 0%, rgba(7,18,26,0.08) 30%, rgba(7,18,26,0.74) 100%);" +
      "z-index:0;" +
      "}" +
      ".pc-topic-card:hover{" +
      "transform:translateY(-3px);" +
      "box-shadow:0 30px 60px rgba(15,23,42,0.16);" +
      "}" +
      ".pc-topic-card[data-inline-active='true']{" +
      "box-shadow:0 0 0 2px rgba(35,118,107,0.28), 0 32px 66px rgba(15,23,42,0.18);" +
      "}" +
      ".pc-topic-card-content{" +
      "position:relative;" +
      "z-index:1;" +
      "display:flex;" +
      "flex-direction:column;" +
      "gap:0.55rem;" +
      "}" +
      ".pc-topic-card-label{" +
      "display:inline-flex;" +
      "align-items:center;" +
      "width:max-content;" +
      "padding:0.34rem 0.62rem;" +
      "border-radius:999px;" +
      "background:rgba(255,255,255,0.14);" +
      "border:1px solid rgba(255,255,255,0.18);" +
      "font-size:0.7rem;" +
      "font-weight:700;" +
      "letter-spacing:0.14em;" +
      "text-transform:uppercase;" +
      "color:rgba(255,255,255,0.88);" +
      "}" +
      ".pc-topic-card-title{" +
      "margin:0;" +
      "font-family:var(--font-display);" +
      "font-size:clamp(1.55rem, 2vw, 2.2rem);" +
      "line-height:1.06;" +
      "letter-spacing:-0.03em;" +
      "color:#ffffff;" +
      "text-wrap:balance;" +
      "}" +
      ".pc-topic-card-excerpt{" +
      "margin:0;" +
      "max-width:26rem;" +
      "font-size:0.95rem;" +
      "line-height:1.5;" +
      "color:rgba(255,255,255,0.92);" +
      "}" +
      ".pc-topic-card-meta{" +
      "display:flex;" +
      "align-items:center;" +
      "gap:0.6rem;" +
      "font-size:0.92rem;" +
      "font-weight:600;" +
      "color:rgba(255,255,255,0.88);" +
      "}" +
      ".pc-topic-panel{" +
      "margin-top:1.4rem;" +
      "}" +
      ".pc-topic-article{" +
      "overflow:hidden;" +
      "border-radius:2rem;" +
      "border:1px solid rgba(25,84,74,0.1);" +
      "background:#ffffff;" +
      "box-shadow:0 32px 78px rgba(15,23,42,0.1);" +
      "}" +
      ".pc-topic-hero{" +
      "display:grid;" +
      "grid-template-columns:minmax(280px, 0.9fr) minmax(0, 1.1fr);" +
      "gap:0;" +
      "background:linear-gradient(135deg, rgba(227,245,240,0.9) 0%, rgba(250,252,251,0.94) 44%, rgba(255,255,255,1) 100%);" +
      "}" +
      ".pc-topic-hero-media{" +
      "min-height:20rem;" +
      "background:linear-gradient(180deg, rgba(10,19,29,0.14), rgba(7,18,26,0.3)), var(--pc-topic-hero-image) var(--pc-topic-hero-position, center center) / cover no-repeat;" +
      "}" +
      ".pc-topic-hero-copy{" +
      "padding:2.25rem 2.2rem;" +
      "display:flex;" +
      "flex-direction:column;" +
      "justify-content:center;" +
      "gap:1rem;" +
      "}" +
      ".pc-topic-hero-kicker{" +
      "display:inline-flex;" +
      "width:max-content;" +
      "padding:0.42rem 0.7rem;" +
      "border-radius:999px;" +
      "background:rgba(255,255,255,0.7);" +
      "color:hsl(var(--primary));" +
      "font-size:0.72rem;" +
      "font-weight:700;" +
      "letter-spacing:0.15em;" +
      "text-transform:uppercase;" +
      "}" +
      ".pc-topic-hero-title{" +
      "margin:0;" +
      "font-family:var(--font-display);" +
      "font-size:clamp(2.15rem, 3vw, 3.15rem);" +
      "line-height:1.02;" +
      "letter-spacing:-0.04em;" +
      "color:hsl(var(--foreground));" +
      "text-wrap:balance;" +
      "}" +
      ".pc-topic-hero-copy p{" +
      "margin:0;" +
      "font-size:1rem;" +
      "line-height:1.8;" +
      "color:rgba(71,85,105,0.92);" +
      "}" +
      ".pc-topic-hero-actions{" +
      "display:flex;" +
      "flex-wrap:wrap;" +
      "gap:0.8rem;" +
      "padding-top:0.2rem;" +
      "}" +
      ".pc-topic-badge{" +
      "display:inline-flex;" +
      "align-items:center;" +
      "justify-content:center;" +
      "min-height:2.6rem;" +
      "padding:0.7rem 1rem;" +
      "border-radius:999px;" +
      "background:rgba(29,111,102,0.08);" +
      "color:hsl(var(--primary));" +
      "font-size:0.9rem;" +
      "font-weight:600;" +
      "text-decoration:none;" +
      "}" +
      ".pc-topic-close{" +
      "display:inline-flex;" +
      "align-items:center;" +
      "justify-content:center;" +
      "width:2.75rem;" +
      "height:2.75rem;" +
      "border-radius:999px;" +
      "border:1px solid rgba(25,84,74,0.12);" +
      "background:#ffffff;" +
      "box-shadow:0 12px 24px rgba(15,23,42,0.07);" +
      "font-size:1.45rem;" +
      "color:rgba(71,85,105,0.88);" +
      "}" +
      ".pc-topic-body{" +
      "padding:2rem 2.2rem 2.3rem;" +
      "display:grid;" +
      "grid-template-columns:minmax(0, 1fr);" +
      "gap:1.4rem;" +
      "}" +
      ".pc-topic-copy-section h3{" +
      "margin:0 0 0.7rem;" +
      "font-family:var(--font-display);" +
      "font-size:clamp(1.45rem, 2vw, 1.95rem);" +
      "line-height:1.08;" +
      "letter-spacing:-0.03em;" +
      "color:hsl(var(--foreground));" +
      "}" +
      ".pc-topic-copy-section p{" +
      "margin:0 0 1rem;" +
      "font-size:1rem;" +
      "line-height:1.85;" +
      "color:rgba(71,85,105,0.92);" +
      "}" +
      ".pc-topic-copy-section ul{" +
      "margin:0;" +
      "padding-left:1.2rem;" +
      "color:rgba(71,85,105,0.92);" +
      "}" +
      ".pc-topic-copy-section li{" +
      "margin:0.5rem 0;" +
      "line-height:1.75;" +
      "}" +
      ".pc-topic-related-pills{" +
      "display:flex;" +
      "flex-wrap:wrap;" +
      "gap:0.8rem;" +
      "}" +
      ".pc-topic-related-pill{" +
      "display:inline-flex;" +
      "align-items:center;" +
      "min-height:2.7rem;" +
      "padding:0.72rem 1rem;" +
      "border-radius:999px;" +
      "border:1px solid rgba(25,84,74,0.14);" +
      "background:#ffffff;" +
      "color:hsl(var(--foreground));" +
      "text-decoration:none;" +
      "font-weight:600;" +
      "box-shadow:0 10px 20px rgba(15,23,42,0.05);" +
      "}" +
      ".pc-topic-related-grid{" +
      "display:grid;" +
      "grid-template-columns:repeat(3, minmax(0, 1fr));" +
      "gap:1rem;" +
      "}" +
      ".pc-topic-related-group{" +
      "padding:1.2rem;" +
      "border:1px solid rgba(25,84,74,0.1);" +
      "border-radius:1.3rem;" +
      "background:linear-gradient(180deg, rgba(250,253,252,1) 0%, rgba(255,255,255,1) 100%);" +
      "box-shadow:0 14px 28px rgba(15,23,42,0.05);" +
      "}" +
      ".pc-topic-related-kicker{" +
      "margin:0 0 0.8rem;" +
      "font-size:0.78rem;" +
      "font-weight:700;" +
      "letter-spacing:0.14em;" +
      "text-transform:uppercase;" +
      "color:hsl(var(--primary));" +
      "}" +
      ".pc-topic-related-group ul{" +
      "margin:0;" +
      "padding-left:1rem;" +
      "}" +
      ".pc-topic-related-group li{" +
      "margin:0.45rem 0;" +
      "}" +
      ".pc-topic-related-group a{" +
      "color:hsl(var(--foreground));" +
      "text-decoration:none;" +
      "}" +
      ".pc-blog-preview-grid{" +
      "display:grid;" +
      "grid-template-columns:repeat(3, minmax(0, 1fr));" +
      "gap:1rem;" +
      "margin-top:1.4rem;" +
      "}" +
      ".pc-blog-preview-card{" +
      "display:block;" +
      "overflow:hidden;" +
      "border-radius:1.5rem;" +
      "border:1px solid rgba(25,84,74,0.1);" +
      "background:#ffffff;" +
      "box-shadow:0 18px 40px rgba(15,23,42,0.08);" +
      "text-decoration:none;" +
      "}" +
      ".pc-blog-preview-media{" +
      "height:12rem;" +
      "background:linear-gradient(180deg, rgba(10,19,29,0.06), rgba(7,18,26,0.28)), var(--pc-blog-card-image) var(--pc-blog-card-position, center center) / cover no-repeat;" +
      "}" +
      ".pc-blog-preview-body{" +
      "padding:1.25rem;" +
      "}" +
      ".pc-blog-preview-body h3{" +
      "margin:0;" +
      "font-family:var(--font-display);" +
      "font-size:1.45rem;" +
      "line-height:1.12;" +
      "letter-spacing:-0.03em;" +
      "color:hsl(var(--foreground));" +
      "}" +
      ".pc-blog-preview-body p{" +
      "margin:0.8rem 0 0;" +
      "font-size:0.95rem;" +
      "line-height:1.7;" +
      "color:rgba(71,85,105,0.88);" +
      "}" +
      ".pc-blog-hero{" +
      "padding:5.25rem 1.5rem 2rem;" +
      "background:linear-gradient(180deg, #10212b 0%, #17363a 50%, #f8fcfb 50%, #f8fcfb 100%);" +
      "}" +
      ".pc-blog-hero-card{" +
      "max-width:76rem;" +
      "margin:0 auto;" +
      "padding:2.1rem;" +
      "border-radius:2rem;" +
      "background:linear-gradient(135deg, rgba(13,29,36,0.88) 0%, rgba(16,42,46,0.78) 44%, rgba(17,46,50,0.72) 100%), url('https://www.poulinchiro.com/data/uploads/Doctor-Cox-with-Doctor-Poulin.jpg') center 30% / cover no-repeat;" +
      "box-shadow:0 28px 70px rgba(7,18,26,0.22);" +
      "}" +
      ".pc-blog-hero-card .pc-blog-eyebrow{" +
      "background:rgba(255,255,255,0.12);" +
      "color:#d8f4ee;" +
      "}" +
      ".pc-blog-hero-card .pc-blog-heading,.pc-blog-hero-card .pc-blog-copy{" +
      "color:#ffffff;" +
      "}" +
      ".pc-blog-hero-card .pc-blog-copy{" +
      "max-width:42rem;" +
      "color:rgba(255,255,255,0.84);" +
      "}" +
      ".pc-alone-section{" +
      "padding:5rem 1.5rem 5.5rem;" +
      "background:linear-gradient(180deg, #f4f6f7 0%, #eef2f3 100%);" +
      "}" +
      ".pc-alone-shell{" +
      "max-width:76rem;" +
      "margin:0 auto;" +
      "display:grid;" +
      "grid-template-columns:minmax(0, 1.1fr) minmax(320px, 0.8fr);" +
      "gap:2.5rem;" +
      "align-items:center;" +
      "}" +
      ".pc-alone-copy{" +
      "max-width:42rem;" +
      "margin:0 auto;" +
      "}" +
      ".pc-alone-copy h2{" +
      "margin:0 0 1.5rem;" +
      "font-size:clamp(2.3rem, 3vw, 3.4rem);" +
      "line-height:1.02;" +
      "letter-spacing:-0.04em;" +
      "font-family:var(--font-display);" +
      "color:hsl(var(--foreground));" +
      "}" +
      ".pc-alone-copy p{" +
      "margin:0 0 1.3rem;" +
      "font-size:1.06rem;" +
      "line-height:1.78;" +
      "color:rgba(31,41,55,0.92);" +
      "}" +
      ".pc-alone-media{" +
      "min-height:31rem;" +
      "border-radius:0;" +
      "background:url('https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80') center center / cover no-repeat;" +
      "box-shadow:0 18px 40px rgba(15,23,42,0.08);" +
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
      ".pc-topic-section,.pc-blog-section{" +
      "padding:4rem 1rem;" +
      "}" +
      ".pc-topic-intro,.pc-blog-intro{" +
      "flex-direction:column;" +
      "align-items:flex-start;" +
      "}" +
      ".pc-topic-grid,.pc-blog-preview-grid,.pc-topic-related-grid{" +
      "grid-template-columns:minmax(0, 1fr);" +
      "}" +
      ".pc-topic-card{" +
      "min-height:14.5rem;" +
      "padding:1.2rem;" +
      "}" +
      ".pc-topic-hero{" +
      "grid-template-columns:minmax(0, 1fr);" +
      "}" +
      ".pc-topic-hero-media{" +
      "min-height:14rem;" +
      "}" +
      ".pc-topic-hero-copy,.pc-topic-body{" +
      "padding:1.4rem;" +
      "}" +
      ".pc-topic-hero-title,.pc-topic-heading,.pc-blog-heading{" +
      "font-size:1.95rem;" +
      "}" +
      ".pc-blog-hero{" +
      "padding:4.6rem 1rem 1.6rem;" +
      "}" +
      ".pc-blog-hero-card{" +
      "padding:1.4rem;" +
      "border-radius:1.5rem;" +
      "}" +
      ".pc-alone-section{" +
      "padding:4rem 1rem;" +
      "}" +
      ".pc-alone-shell{" +
      "grid-template-columns:minmax(0, 1fr);" +
      "gap:1.4rem;" +
      "}" +
      ".pc-alone-media{" +
      "min-height:18rem;" +
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

  function clearActiveTopicCards() {
    document.querySelectorAll("[data-inline-topic][data-inline-active='true']").forEach(function (node) {
      node.dataset.inlineActive = "false";
    });
  }

  function markActiveTopicCardBySlug(slug) {
    clearActiveTopicCards();

    document.querySelectorAll("[data-inline-topic]").forEach(function (node) {
      if (node.getAttribute("data-inline-topic") === slug) {
        node.dataset.inlineActive = "true";
      }
    });
  }

  function closeTopicPanel() {
    clearActiveTopicCards();
    ACTIVE_TOPIC = null;

    if (!ACTIVE_TOPIC_PANEL) {
      return;
    }

    ACTIVE_TOPIC_PANEL.innerHTML = "";
    ACTIVE_TOPIC_PANEL = null;
  }

  function showTopicPanel(trigger, slug, slot, options) {
    var topic = getPainTopicBySlug(slug);
    var shouldScroll = !options || options.scroll !== false;

    if (!topic || !slot) {
      return;
    }

    if (ACTIVE_TOPIC === slug && ACTIVE_TOPIC_PANEL === slot) {
      closeTopicPanel();
      return;
    }

    closeTopicPanel();

    slot.innerHTML = buildTopicDetailMarkup(topic);
    ACTIVE_TOPIC = slug;
    ACTIVE_TOPIC_PANEL = slot;
    markActiveTopicCardBySlug(slug);

    if (window.location.pathname.indexOf("/Blog") === 0) {
      try {
        window.history.replaceState({}, "", window.location.pathname + "#" + slug);
      } catch (error) {}
    }

    if (shouldScroll) {
      slot.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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

    if (routeKey === "Blog" || !hero || !imageUrl) {
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

  function getTopicPath(topic) {
    return "/Blog/" + topic.slug + "/";
  }

  function buildTopicCardMarkup(topic, options) {
    var settings = options || {};
    var isLink = settings.isLink !== false;
    var showExcerpt = !!settings.showExcerpt;
    var tagName = isLink ? "a" : "button";
    var href = isLink ? ' href="' + escapeHtml(getTopicPath(topic)) + '"' : ' type="button"';
    var attrs =
      ' class="pc-topic-card" data-inline-topic="' +
      escapeHtml(topic.slug) +
      '" style="--pc-topic-card-image:url(\'' +
      escapeHtml(topic.imageUrl) +
      "');--pc-topic-card-position:" +
      escapeHtml(topic.imagePosition || "center center") +
      ';"';

    return (
      "<" +
      tagName +
      href +
      attrs +
      '>' +
      '<span class="pc-topic-card-content">' +
      '<span class="pc-topic-card-label">' +
      escapeHtml(topic.category) +
      "</span>" +
      '<h3 class="pc-topic-card-title">' +
      escapeHtml(topic.title) +
      "</h3>" +
      (showExcerpt
        ? '<p class="pc-topic-card-excerpt">' + escapeHtml(topic.excerpt) + "</p>"
        : "") +
      '<span class="pc-topic-card-meta">Read topic guide</span>' +
      "</span>" +
      "</" +
      tagName +
      ">"
    );
  }

  function buildTopicDetailMarkup(topic, standalone) {
    if (!topic) {
      return "";
    }

    var closeButton = standalone
      ? ""
      : '<button type="button" class="pc-topic-close" data-inline-topic-close="true" aria-label="Close article">×</button>';
    var topActions = standalone
      ? '<a class="pc-topic-badge" href="/Blog/">Back to Blog</a><a class="pc-topic-badge" href="/Conditions/">Browse all conditions</a>'
      : '<a class="pc-topic-badge" href="/Conditions/">Browse all conditions</a>';

    return (
      '<article class="pc-topic-article">' +
      '<div class="pc-topic-hero">' +
      '<div class="pc-topic-hero-media" style="--pc-topic-hero-image:url(\'' +
      escapeHtml(topic.imageUrl) +
      "');--pc-topic-hero-position:" +
      escapeHtml(topic.imagePosition || "center center") +
      ';"></div>' +
      '<div class="pc-topic-hero-copy">' +
      '<div style="display:flex;justify-content:space-between;gap:1rem;align-items:flex-start;">' +
      '<div>' +
      '<p class="pc-topic-hero-kicker">' +
      escapeHtml(topic.category) +
      "</p>" +
      '<h2 class="pc-topic-hero-title">' +
      escapeHtml(topic.title) +
      "</h2>" +
      "</div>" +
      closeButton +
      "</div>" +
      "<p>" +
      escapeHtml(topic.excerpt) +
      "</p>" +
      '<div class="pc-topic-hero-actions">' +
      topActions +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="pc-topic-body">' +
      buildTopicBodyHtml(topic) +
      buildTopicRelatedHtml(topic) +
      "</div>" +
      "</article>"
    );
  }

  function buildPainTopicsSectionMarkup() {
    var cards = PAIN_TOPIC_LIBRARY.map(function (topic) {
      return buildTopicCardMarkup(topic, {
        isLink: true,
        showExcerpt: topic.slug === "back-pain",
      });
    }).join("");

    return (
      '<section class="pc-topic-section" data-inline-pain-topics="true">' +
      '<div class="pc-topic-shell">' +
      '<div class="pc-topic-intro">' +
      "<div>" +
      '<p class="pc-topic-eyebrow">Pain Topics</p>' +
      '<h2 class="pc-topic-heading">Conditions We Treat, organized the way patients actually search.</h2>' +
      '<p class="pc-topic-copy">Choose the area that feels closest to what you are dealing with. Each card opens its own page with a cleaner explanation, related conditions, and a more focused reading experience.</p>' +
      "</div>" +
      '<a class="pc-topic-badge" href="/Blog/">Open Blog</a>' +
      "</div>" +
      '<div class="pc-topic-grid">' + cards + "</div>" +
      "</section>"
    );
  }

  function insertPainTopicsSection() {
    if (window.location.pathname !== "/" && window.location.pathname !== "/Home/") {
      return;
    }

    if (document.querySelector("[data-inline-pain-topics='true']")) {
      return;
    }

    var main = document.querySelector("main");

    if (main) {
      main.insertAdjacentHTML("beforeend", buildPainTopicsSectionMarkup());
    }
  }

  function buildYouAreNotAloneSectionMarkup() {
    return (
      '<section class="pc-alone-section" data-inline-you-are-not-alone="true">' +
      '<div class="pc-alone-shell">' +
      '<div class="pc-alone-copy">' +
      "<h2>You Are Not Alone</h2>" +
      "<p>If you suffer with spine pain or spine-related pain, neck pain, arm pain, leg pain or low back pain, you are not alone.</p>" +
      "<p><strong>One in 3 people in the U.S.</strong> suffers back pain at any given time, and studies show that 80% of Ashburn and Herndon residents will suffer back pain at some time in their lives. Spine pain robs you of your quality of life, and when it does, you want and deserve your pain-free life back as gently, effectively, and swiftly as possible.</p>" +
      "<p>At Poulin Chiropractic of Herndon and Ashburn, we have educational resources, research, and treatment options to get you back on your feet.</p>" +
      "</div>" +
      '<div class="pc-alone-media" aria-hidden="true"></div>' +
      "</div>" +
      "</section>"
    );
  }

  function insertYouAreNotAloneSection() {
    if (window.location.pathname !== "/" && window.location.pathname !== "/Home/") {
      return;
    }

    if (document.querySelector("[data-inline-you-are-not-alone='true']")) {
      return;
    }

    var main = document.querySelector("main");
    if (main) {
      main.insertAdjacentHTML("beforeend", buildYouAreNotAloneSectionMarkup());
    }
  }

  function getBlogPathParts() {
    var segments = window.location.pathname.split("/").filter(Boolean);
    if (!segments.length || segments[0] !== "Blog") {
      return [];
    }

    return segments.slice(1);
  }

  function buildBlogLandingMarkup() {
    var cards = PAIN_TOPIC_LIBRARY.map(function (topic) {
      return buildTopicCardMarkup(topic, {
        isLink: true,
        showExcerpt: topic.slug === "back-pain",
      });
    }).join("");

    return (
      '<section class="pc-blog-hero">' +
      '<div class="pc-blog-hero-card">' +
      '<p class="pc-blog-eyebrow">Poulin Blog</p>' +
      '<h1 class="pc-blog-heading">Clear, dedicated blog pages for the questions patients ask most.</h1>' +
      '<p class="pc-blog-copy">This tab is now its own space. Browse the major pain topics here, then open the full page for the one that matches your symptoms best.</p>' +
      '<div class="pc-topic-hero-actions" style="margin-top:1.25rem;">' +
      '<a class="pc-topic-badge" href="/Home/">Back to Home</a>' +
      '<a class="pc-topic-badge" href="/Conditions/">Open conditions library</a>' +
      "</div>" +
      "</div>" +
      "</section>" +
      '<section class="pc-blog-section" data-inline-blog-route="landing">' +
      '<div class="pc-blog-shell">' +
      '<div class="pc-blog-intro">' +
      "<div>" +
      '<p class="pc-blog-eyebrow">Pain Library</p>' +
      '<h2 class="pc-blog-heading">Choose a topic and open its full page.</h2>' +
      '<p class="pc-blog-copy">Each card now opens a dedicated page instead of expanding in the home page. That keeps the landing cleaner and makes the reading experience much more focused.</p>' +
      "</div>" +
      "</div>" +
      '<div class="pc-topic-grid">' +
      cards +
      "</div>" +
      "</div>" +
      "</section>"
    );
  }

  function buildBlogDetailPageMarkup(topic) {
    if (!topic) {
      return "";
    }

    return (
      '<section class="pc-blog-hero">' +
      '<div class="pc-blog-hero-card">' +
      '<p class="pc-blog-eyebrow">Topic Page</p>' +
      '<h1 class="pc-blog-heading">' +
      escapeHtml(topic.title) +
      "</h1>" +
      '<p class="pc-blog-copy">' +
      escapeHtml(topic.excerpt) +
      "</p>" +
      '<div class="pc-topic-hero-actions" style="margin-top:1.25rem;">' +
      '<a class="pc-topic-badge" href="/Blog/">Back to Blog</a>' +
      '<a class="pc-topic-badge" href="/Conditions/">Conditions</a>' +
      "</div>" +
      "</div>" +
      "</section>" +
      '<section class="pc-blog-section" data-inline-blog-route="detail">' +
      '<div class="pc-blog-shell">' +
      '<article class="pc-topic-article">' +
      '<div class="pc-topic-body">' +
      buildTopicBodyHtml(topic) +
      buildTopicRelatedHtml(topic) +
      "</div>" +
      "</article>" +
      "</div>" +
      "</section>"
    );
  }

  function renderBlogRoute() {
    if (window.location.pathname.indexOf("/Blog") !== 0) {
      return;
    }

    var main = document.querySelector("main");
    var parts = getBlogPathParts();
    var topic = parts.length ? getPainTopicBySlug(parts[0]) : null;

    if (!main || main.dataset.inlineBlogHydrated === "true") {
      return;
    }

    main.dataset.inlineBlogHydrated = "true";
    main.innerHTML = topic ? buildBlogDetailPageMarkup(topic) : buildBlogLandingMarkup();
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

    if (routeKey === "Blog" || !hero) {
      return;
    }

    if (routeKey === "Home") {
      replaceHeroCardMedia(hero, routeKey);
      polishHomeHeroCards(hero);
    }

    if (routeKey === "About") {
      replaceHeroCardMedia(findSectionByText("Dedicated to Your Spinal Health") || hero, routeKey, "center center", "contain");
      fixAboutFeatureSection();
    }
  }

  function fixAboutFeatureSection() {
    var section = findSectionByText("Dedicated to Your Spinal Health");

    if (!section) {
      return;
    }

    Array.prototype.slice.call(section.querySelectorAll("img")).forEach(function (image) {
      image.src = HERO_CARD_IMAGES.About;
      image.srcset = "";
      image.alt = "Dr. Poulin with Dr. James Cox";
      image.style.objectFit = "contain";
      image.style.objectPosition = "center top";
      image.style.width = "100%";
      image.style.height = "100%";
      image.style.background = "#f4efe8";
    });

    Array.prototype.slice.call(section.querySelectorAll("[style*='background-image']")).forEach(function (node) {
      node.style.backgroundImage = "url('" + HERO_CARD_IMAGES.About + "')";
      node.style.backgroundSize = "contain";
      node.style.backgroundPosition = "center top";
      node.style.backgroundRepeat = "no-repeat";
      node.style.backgroundColor = "#f4efe8";
    });
  }

  function ensureBlogNavLink() {
    if (document.querySelector("a[href='/Blog/'], a[href='/Blog']")) {
      return;
    }

    var navLinks = Array.prototype.slice.call(document.querySelectorAll("header a"));
    var referenceLink = null;

    navLinks.some(function (link) {
      var text = normalizeHeadingText(link.textContent).toLowerCase();
      if (text === "testimonials" || text === "contact") {
        referenceLink = link;
        return true;
      }
      return false;
    });

    if (!referenceLink || !referenceLink.parentElement) {
      return;
    }

    var item = referenceLink.parentElement.cloneNode(true);
    var anchor = item.querySelector("a");

    if (!anchor) {
      return;
    }

    anchor.href = "/Blog/";
    anchor.textContent = "Blog";
    anchor.removeAttribute("aria-current");
    referenceLink.parentElement.insertAdjacentElement("beforebegin", item);
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
    renderBlogRoute();
    applyHeroImages();
    applyRouteHeroEnhancements();
    insertPainTopicsSection();
    insertYouAreNotAloneSection();
    ensureBlogNavLink();
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
        var topicTrigger = event.target && event.target.closest ? event.target.closest("[data-inline-topic]") : null;
        var topicCloseButton = event.target && event.target.closest ? event.target.closest("[data-inline-topic-close]") : null;

        if (topicCloseButton) {
          event.preventDefault();
          closeTopicPanel();
          return;
        }

        if (closeButton) {
          event.preventDefault();
          closeInlinePanel();
          return;
        }

        if (topicTrigger) {
          var topicSlug = topicTrigger.getAttribute("data-inline-topic");
          var topicSection = topicTrigger.closest("[data-inline-pain-topics='true'], [data-inline-blog-route='true']");
          var topicSlot = topicSection ? topicSection.querySelector("[data-inline-topic-panel-slot]") : null;

          if (topicSlot && getPainTopicBySlug(topicSlug)) {
            event.preventDefault();
            showTopicPanel(topicTrigger, topicSlug, topicSlot, { scroll: true });
            return;
          }
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

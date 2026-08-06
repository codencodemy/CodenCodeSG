// codencode.sg — shared interactivity (no framework, no build step)
(function () {
  "use strict";

  /* ---------- Theme toggle ---------- */
  var root = document.documentElement;
  var saved = localStorage.getItem("ccsg-theme");
  if (saved) root.setAttribute("data-theme", saved);

  function currentTheme() {
    var attr = root.getAttribute("data-theme");
    if (attr) return attr;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-theme-toggle]");
    if (!btn) return;
    var next = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("ccsg-theme", next);
  });

  /* ---------- Mobile nav ---------- */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-hamburger]");
    if (!btn) return;
    var menu = document.querySelector("[data-mobile-menu]");
    if (menu) menu.classList.toggle("open");
  });

  /* ---------- FAQ accordion ---------- */
  document.addEventListener("click", function (e) {
    var q = e.target.closest(".faq-q");
    if (!q) return;
    var item = q.closest(".faq-item");
    var wasOpen = item.classList.contains("open");
    item.parentElement.querySelectorAll(".faq-item.open").forEach(function (el) {
      if (el !== item) el.classList.remove("open");
    });
    item.classList.toggle("open", !wasOpen);
    q.setAttribute("aria-expanded", String(!wasOpen));
  });
  // keyboard support (Enter/Space handled natively by <button>)

  /* ---------- Hero language rotator ---------- */
  var rotatorPhrases = [
    { lang: "EN", text: "Stop Googling. Start Building." },
    { lang: "中文", text: "别再搜索了，开始动手做吧。" },
    { lang: "BM", text: "Berhenti Google. Mula Bina." },
    { lang: "TA", text: "தேடுவதை நிறுத்துங்கள். உருவாக்கத் தொடங்குங்கள்." }
  ];
  var rotatorEl = document.querySelector("[data-lang-rotator]");
  if (rotatorEl) {
    var idx = 0;
    setInterval(function () {
      idx = (idx + 1) % rotatorPhrases.length;
      rotatorEl.style.opacity = 0;
      setTimeout(function () {
        rotatorEl.textContent = rotatorPhrases[idx].text;
        rotatorEl.setAttribute("lang", rotatorPhrases[idx].lang === "中文" ? "zh" : rotatorPhrases[idx].lang === "TA" ? "ta" : rotatorPhrases[idx].lang === "BM" ? "ms" : "en");
        rotatorEl.style.opacity = 1;
      }, 260);
    }, 3200);
  }

  /* ---------- Announcement bar rotator ---------- */
  var announceMsgs = [
    "🔥 Aug 2026 cohort — 6 seats left. <a href=\"__WA_ANNOUNCE__\" target=\"_blank\" rel=\"noopener\">Chat on WhatsApp →</a>",
    "🎓 SkillsFuture Credit accepted — offset your course fee. <a href=\"__WA_ANNOUNCE__\" target=\"_blank\" rel=\"noopener\">Ask us how →</a>",
    "🧪 Free trial class this week — no obligation. <a href=\"__WA_ANNOUNCE__\" target=\"_blank\" rel=\"noopener\">Book your seat →</a>"
  ];
  var announceEl = document.querySelector("[data-announce-text]");
  if (announceEl) {
    var aIdx = 0;
    var waHref = announceEl.getAttribute("data-wa") || "#";
    function renderAnnounce() {
      announceEl.innerHTML = announceMsgs[aIdx].replace(/__WA_ANNOUNCE__/g, waHref);
    }
    renderAnnounce();
    setInterval(function () {
      aIdx = (aIdx + 1) % announceMsgs.length;
      renderAnnounce();
    }, 4500);
  }

  /* ---------- Terminal typing animation ---------- */
  var termEl = document.querySelector("[data-terminal-body]");
  if (termEl) {
    var full = termEl.innerHTML;
    // Strip to plain text-with-tags typing: reveal by characters, tags kept intact via a simple approach —
    // we type the raw HTML but chunk on tag boundaries so markup isn't broken mid-tag.
    var tokens = full.match(/<[^>]+>|[^<]/g) || [];
    termEl.innerHTML = "";
    var i = 0;
    function typeNext() {
      if (i >= tokens.length) {
        var cursor = document.createElement("span");
        cursor.className = "cursor";
        termEl.appendChild(cursor);
        return;
      }
      var tok = tokens[i];
      if (tok.charAt(0) === "<") {
        termEl.insertAdjacentHTML("beforeend", tok);
      } else {
        termEl.insertAdjacentHTML("beforeend", tok);
      }
      i++;
      var delay = tok === "\n" ? 40 : 14;
      setTimeout(typeNext, delay);
    }
    // small delay before starting so hero settles first
    setTimeout(typeNext, 400);
  }

  /* ---------- Language demo rotators inside "Why codencode" cards ---------- */
  var demoRows = document.querySelectorAll("[data-demo-rotate]");
  demoRows.forEach(function (group) {
    var rows = group.querySelectorAll(".demo-row");
    var active = 0;
    rows.forEach(function (r, ri) { r.style.opacity = ri === 0 ? 1 : 0.35; });
    setInterval(function () {
      rows[active].style.opacity = 0.35;
      active = (active + 1) % rows.length;
      rows[active].style.opacity = 1;
    }, 1800);
  });

  /* ---------- /paths.html filter tabs ---------- */
  var tabs = document.querySelectorAll("[data-filter-tab]");
  if (tabs.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) { t.classList.remove("active"); });
        tab.classList.add("active");
        var target = tab.getAttribute("data-filter-tab");
        document.querySelectorAll("[data-path-section]").forEach(function (sec) {
          var match = target === "all" || sec.getAttribute("data-path-section") === target;
          sec.classList.toggle("visible", match);
        });
        history.replaceState(null, "", target === "all" ? location.pathname : "#" + target);
      });
    });
    var hash = location.hash.replace("#", "");
    if (hash) {
      var match = document.querySelector('[data-filter-tab="' + hash + '"]');
      if (match) match.click();
    }
  }

  /* ---------- footer year ---------- */
  var yEl = document.querySelector("[data-year]");
  if (yEl) yEl.textContent = new Date().getFullYear();
})();

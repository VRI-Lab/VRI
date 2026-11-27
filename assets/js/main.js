/* =========================================================================
   VRI Lab — interactions and generative visuals
   ========================================================================= */
(function () {
  "use strict";
  var D = window.VRI;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var el = function (tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]; }); };
  var personById = {}; D.people.forEach(function (p) { personById[p.id] = p; });

  var AV_GRADS = [
    "linear-gradient(135deg,#22c3b5,#3d8bff)",
    "linear-gradient(135deg,#3d8bff,#7b5cff)",
    "linear-gradient(135deg,#7b5cff,#b14dff)",
    "linear-gradient(135deg,#16a3c9,#22c3b5)",
    "linear-gradient(135deg,#b14dff,#3d8bff)",
    "linear-gradient(135deg,#22c3b5,#7b5cff)"
  ];
  function avatar(p, i) {
    var d = el("div", "av");
    d.style.setProperty("--av", AV_GRADS[i % AV_GRADS.length]);
    if (p.photo) {
      d.classList.add("has-photo");
      var img = new Image(); img.src = p.photo; img.alt = p.name; img.loading = "lazy";
      img.onerror = function () { d.classList.remove("has-photo"); d.textContent = p.initials; };
      d.appendChild(img);
    } else {
      d.textContent = p.initials;
      d.setAttribute("role", "img"); d.setAttribute("aria-label", p.name);
    }
    return d;
  }

  /* ------------------------------------------------------------------ */
  /* Icons                                                              */
  /* ------------------------------------------------------------------ */
  var ICON = {
    scholar: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3Zm-6.82 9.5L5 15.5 12 19l7-3.5-.18-3L12 16l-6.82-3.5Z"/></svg>',
    web: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a10.9 10.9 0 0 1 5.76 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.82 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.84v1.54h.05c.53-1.01 1.84-2.07 3.79-2.07 4.05 0 4.8 2.67 4.8 6.13V21h-4v-5.02c0-1.2-.02-2.74-1.67-2.74-1.67 0-1.93 1.3-1.93 2.65V21h-4V9.75Z"/></svg>',
    compass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/></svg>',
    mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
    grant: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4ZM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
    brain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V5a3 3 0 0 0-3-1Z"/><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1"/><path d="M12 9h2M12 14h3"/></svg>',
    flask: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6M10 3v6L4.5 19A1.5 1.5 0 0 0 5.8 21h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3"/><path d="M7.5 14h9"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/></svg>',
    building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6"/></svg>'
  };
  var LINK_LABEL = { scholar: "Google Scholar", web: "Homepage", github: "GitHub", linkedin: "LinkedIn" };
  var CHIP_LABEL = { arXiv: "arXiv", code: "Code", paper: "Paper", project: "Project", page: "Author page" };

  /* ------------------------------------------------------------------ */
  /* Render content                                                     */
  /* ------------------------------------------------------------------ */
  function renderNews() {
    var wrap = $("#news"); if (!wrap || !D.news) return;
    D.news.forEach(function (n, i) {
      var d = el("li", "news-item reveal");
      d.style.transitionDelay = (i * 70) + "ms";
      d.innerHTML = '<span class="news-tag">' + esc(n.tag) + '</span><p>' + esc(n.text) + '</p>';
      wrap.appendChild(d);
    });
  }

  function renderMission() {
    var m = $("#missionText"); if (!m || !D.mission) return;
    var txt = esc(D.mission);
    ["predicts", "grounds", "adapts", "acts"].forEach(function (w) { txt = txt.replace(new RegExp("\\b" + w + "\\b"), '<span class="grad">' + w + "</span>"); });
    m.innerHTML = txt.replace("From models to brain:", "<strong>From models to brain:</strong>");
  }

  function renderPrinciples() {
    var wrap = $("#principles"); if (!wrap) return;
    D.principles.forEach(function (t, i) {
      var card = el("article", "topic reveal");
      card.style.setProperty("--c", t.color);
      card.style.transitionDelay = (i % 3) * 60 + "ms";
      var cv = el("canvas"); cv.setAttribute("aria-hidden", "true"); cv.dataset.scene = t.scene; cv.dataset.color = t.color;
      card.appendChild(cv);
      var body = el("div", "topic-body");
      body.innerHTML = '<span class="topic-num">' + esc(t.brain) + '</span><h3>' + esc(t.title) + '</h3><p>' + esc(t.text) + '</p>';
      card.appendChild(body);
      wrap.appendChild(card);
    });
    var ap = $("#approach");
    if (ap && D.approach) D.approach.forEach(function (x, i) {
      var d = el("div", "appr reveal");
      d.style.transitionDelay = i * 80 + "ms";
      d.innerHTML = '<span class="ico" aria-hidden="true">' + (ICON[x.icon] || "") + '</span><h3>' + esc(x.title) + '</h3><p>' + esc(x.text) + '</p>';
      ap.appendChild(d);
    });
  }

  function renderPeople() {
    var wrap = $("#peopleGrid");
    var glows = ["rgba(34,195,181,.28)", "rgba(61,139,255,.28)", "rgba(123,92,255,.3)", "rgba(177,77,255,.26)", "rgba(22,163,201,.28)", "rgba(61,139,255,.28)"];
    D.people.forEach(function (p, i) {
      var c = el("article", "person reveal");
      c.style.setProperty("--glow", glows[i % glows.length]);
      c.style.transitionDelay = (i % 3) * 80 + "ms";
      var ph = el("div", "photo"); ph.appendChild(avatar(p, i)); c.appendChild(ph);
      c.appendChild(el("h3", null, esc(p.name)));
      c.appendChild(el("p", "role", esc(p.role)));
      c.appendChild(el("p", "org", esc(p.org) + " · " + esc(p.place)));
      c.appendChild(el("span", "focus", esc(p.focus)));
      var l = el("div", "links");
      Object.keys(p.links || {}).forEach(function (k) {
        if (!p.links[k]) return;
        var a = el("a", "icon-link", ICON[k] || ICON.web);
        a.href = p.links[k]; a.target = "_blank"; a.rel = "noopener";
        a.setAttribute("aria-label", p.name + " – " + (LINK_LABEL[k] || k));
        a.title = LINK_LABEL[k] || k;
        l.appendChild(a);
      });
      c.appendChild(l);
      wrap.appendChild(c);
    });
  }

  function highlightAuthors(s) {
    var out = esc(s);
    D.memberNames.forEach(function (n) { out = out.split(esc(n)).join("<b>" + esc(n) + "</b>"); });
    return out;
  }

  function renderWork() {
    var track = $("#workTrack");
    D.papers.forEach(function (p, i) {
      var c = el("article", "paper");
      var cover = el("div", "cover");
      if (p.img) {
        cover.classList.add("is-figure");
        var img = new Image(); img.src = p.img; img.alt = "Figure from " + p.short; img.loading = "lazy"; img.decoding = "async";
        cover.appendChild(img);
      } else {
        cover.classList.add("is-generated");
        var cv = el("canvas"); cv.setAttribute("aria-hidden", "true"); cv.dataset.seed = p.seed || i;
        cover.appendChild(cv);
        cover.appendChild(el("span", "gen-title", esc(p.short)));
      }
      c.appendChild(cover);
      var b = el("div", "body");
      b.appendChild(el("span", "venue", esc(p.venue)));
      b.appendChild(el("h3", null, esc(p.title)));
      b.appendChild(el("p", "authors", highlightAuthors(p.authors)));
      var pl = el("div", "plinks");
      Object.keys(p.links || {}).forEach(function (k) {
        var a = el("a", "chip", esc(CHIP_LABEL[k] || k));
        a.href = p.links[k]; a.target = "_blank"; a.rel = "noopener";
        a.setAttribute("aria-label", (CHIP_LABEL[k] || k) + ": " + p.short);
        pl.appendChild(a);
      });
      b.appendChild(pl);
      c.appendChild(b);
      track.appendChild(c);
    });
    var step = function (dir) { var card = track.querySelector(".paper"); var w = card ? card.getBoundingClientRect().width + 18 : 360; track.scrollBy({ left: dir * w * 2, behavior: reduceMotion ? "auto" : "smooth" }); };
    $("#workPrev").addEventListener("click", function () { step(-1); });
    $("#workNext").addEventListener("click", function () { step(1); });
    var upd = function () {
      var max = track.scrollWidth - track.clientWidth - 4;
      $("#workPrev").disabled = track.scrollLeft <= 4;
      $("#workNext").disabled = track.scrollLeft >= max;
      track.classList.toggle("at-end", track.scrollLeft >= max);
      track.classList.toggle("at-start", track.scrollLeft <= 4);
    };
    track.addEventListener("scroll", upd, { passive: true }); window.addEventListener("resize", upd); upd();
  }

  function renderVenues() {
    var t = $("#venueTrack");
    var html = D.venues.map(function (v) { return "<span>" + esc(v) + "</span>"; }).join("");
    t.innerHTML = html + '<span class="dup" aria-hidden="true">' + D.venues.map(esc).join('</span><span class="dup" aria-hidden="true">') + "</span>";
  }

  function renderPlan() {
    var a = $("#activities");
    D.activities.forEach(function (x, i) {
      var d = el(x.href ? "a" : "div", "act reveal");
      if (x.href) { d.href = x.href; d.target = "_blank"; d.rel = "noopener"; }
      d.style.transitionDelay = (i % 3) * 70 + "ms";
      d.innerHTML = '<span class="ico" aria-hidden="true">' + (ICON[x.icon] || "") + '</span><b>' + esc(x.title) + '</b><small>' + esc(x.text || "") + '</small>';
      a.appendChild(d);
    });
    var r = $("#roadmap");
    D.roadmap.forEach(function (x) {
      var li = el("li"); li.innerHTML = '<div class="when">' + esc(x.when) + '</div><p>' + esc(x.what) + '</p>'; r.appendChild(li);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Nav, reveal                                                        */
  /* ------------------------------------------------------------------ */
  function setupNav() {
    var nav = $("#nav"), btn = $("#navToggle"), ul = $("#navLinks");
    var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 30); };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
    var setOpen = function (open) {
      ul.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    btn.addEventListener("click", function (e) { e.stopPropagation(); setOpen(!ul.classList.contains("open")); });
    ul.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("click", function (e) { if (ul.classList.contains("open") && !nav.contains(e.target)) setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && ul.classList.contains("open")) { setOpen(false); btn.focus(); } });
    var links = Array.prototype.slice.call(ul.querySelectorAll('a[href^="#"]'));
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id && !a.classList.contains("nav-cta")); });
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      ["top", "philosophy", "people", "work", "plan", "join"].forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
    }
  }

  function setupReveal() {
    var items = document.querySelectorAll(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) { items.forEach(function (x) { x.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (x) { io.observe(x); });
  }

  /* ------------------------------------------------------------------ */
  /* Canvas helpers                                                     */
  /* ------------------------------------------------------------------ */
  // Cache CSS sizes with ResizeObserver so draw loops never force layout.
  var sizeCache = new WeakMap();
  var ro = "ResizeObserver" in window ? new ResizeObserver(function (entries) {
    entries.forEach(function (en) { var r = en.contentRect; sizeCache.set(en.target, { w: r.width, h: r.height }); });
  }) : null;
  function watchSize(cv) { if (ro) ro.observe(cv); }
  function fitCanvas(cv, maxDpr) {
    var s = sizeCache.get(cv);
    if (!s) { var r = cv.getBoundingClientRect(); s = { w: r.width, h: r.height }; sizeCache.set(cv, s); }
    var dpr = Math.min(DPR, maxDpr || DPR);
    var w = Math.max(1, Math.round(s.w * dpr)), h = Math.max(1, Math.round(s.h * dpr));
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
    return { w: s.w, h: s.h, dpr: dpr };
  }
  function rng(seed) { var s = seed >>> 0 || 1; return function () { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) % 100000) / 100000; }; }
  function lerpColor(a, b, t) {
    var pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
    var r = (pa >> 16) + ((pb >> 16) - (pa >> 16)) * t, g = ((pa >> 8) & 255) + (((pb >> 8) & 255) - ((pa >> 8) & 255)) * t, bl = (pa & 255) + ((pb & 255) - (pa & 255)) * t;
    return "rgb(" + (r | 0) + "," + (g | 0) + "," + (bl | 0) + ")";
  }
  // 64-entry lookup table for the brand gradient (teal → blue → violet).
  var LUT = []; for (var li = 0; li < 64; li++) { var tt = li / 63; LUT.push(tt < 0.5 ? lerpColor("#22c3b5", "#3d8bff", tt * 2) : lerpColor("#3d8bff", "#9a5cff", (tt - 0.5) * 2)); }
  function grad3(t) { return LUT[Math.max(0, Math.min(63, (t * 63) | 0))]; }

  // Runs a draw loop only while the canvas is on screen and the tab is visible.
  function animateWhenVisible(cv, draw, opts) {
    opts = opts || {};
    watchSize(cv);
    var running = false, onScreen = false, raf = 0, t0 = performance.now(), last = 0;
    var minGap = opts.fps ? 1000 / opts.fps - 2 : 0;
    var loop = function (t) {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      if (minGap && t - last < minGap) return;
      last = t; draw((t - t0) / 1000);
    };
    var start = function () { if (!running && onScreen && !document.hidden) { running = true; raf = requestAnimationFrame(loop); } };
    var stop = function () { running = false; cancelAnimationFrame(raf); };
    if (reduceMotion) {
      var still = function () { draw(opts.still || 2.5); };
      requestAnimationFrame(still);
      if (ro) new ResizeObserver(function () { requestAnimationFrame(still); }).observe(cv);
      return;
    }
    if (!("IntersectionObserver" in window)) { onScreen = true; start(); return; }
    new IntersectionObserver(function (en) {
      onScreen = en[0].isIntersecting;
      if (onScreen) start(); else stop();
    }, { rootMargin: "100px" }).observe(cv);
    document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else start(); });
  }

  /* ------------------------------------------------------------------ */
  /* HERO: morphing 3D point cloud (cube → sphere → torus → trefoil)     */
  /* ------------------------------------------------------------------ */
  function hero() {
    var cv = $("#heroCanvas"); if (!cv) return;
    var ctx = cv.getContext("2d");
    var small = window.innerWidth < 760;
    var N = small ? 380 : 820, K = 2;
    var label = $("#shapeName"), labelDot = $("#shapeDot");
    var R = rng(42);
    var inner = $(".hero-inner");
    var PI2 = Math.PI * 2;

    // Coordinates: x = left/right on screen (anterior is +x for the brain),
    // y = down on screen (so "up" is negative), z = depth (negative = towards viewer).
    function fit(list) { var out = []; for (var i = 0; i < N; i++) out.push(list[Math.floor(i * list.length / N)]); return out; }
    function fib(n) { var p = [], g = Math.PI * (3 - Math.sqrt(5)); for (var i = 0; i < n; i++) { var y = 1 - (i / (n - 1)) * 2, r = Math.sqrt(1 - y * y), th = g * i; p.push([Math.cos(th) * r, y, Math.sin(th) * r]); } return p; }

    /* ---------- EYE: almond eyelids, iris rings, pupil, eyeball ---------- */
    function eye() {
      var p = [];
      // eyelids: three parallel strands per lid for thickness
      var nl = Math.round(N * 0.07);
      for (var lid = -1; lid <= 1; lid += 2) for (var s = 0; s < 3; s++) for (var i = 0; i < nl; i++) {
        var u = (i / (nl - 1)) * 2 - 1, x = u * 1.55, h = 0.78 + s * 0.07;
        p.push({ v: [x, lid * h * (1 - u * u) * (1 - 0.12 * u), -1.0 - s * 0.03], g: 2 });
      }
      // iris: concentric rings in a shallow dome, pupil left empty
      var rings = 8;
      for (var r = 0; r < rings; r++) {
        var rad = 0.2 + (r / (rings - 1)) * 0.36, cnt = Math.round(14 + rad * 70);
        for (var k = 0; k < cnt; k++) { var a = (k / cnt) * PI2 + r * 0.3; p.push({ v: [Math.cos(a) * rad, Math.sin(a) * rad, -0.93 + rad * rad * 0.35], g: 1 }); }
      }
      // eyeball, only the part visible between the lids
      fib(Math.round(N * 1.1)).forEach(function (q) {
        var x = q[0] * 0.98, y = q[1] * 0.98, z = q[2] * 0.98 - 0.02;
        if (z > -0.2) return;                                   // back half hidden by lids
        if (x * x + y * y < 0.6 * 0.6 && z < -0.75) return;     // leave room for the iris
        var lim = 0.78 * (1 - Math.pow(x / 1.55, 2)); if (Math.abs(y) > lim) return;
        p.push({ v: [x, y, z], g: 0 });
      });
      return fit(p);
    }

    /* ---------- BRAIN: two folded hemispheres, cerebellum, brainstem ---------- */
    function brain() {
      var p = [];
      var hemi = fib(Math.round(N * 1.25));
      [-1, 1].forEach(function (side) {
        hemi.forEach(function (q) {
          if (q[2] * side < -0.55) return;                       // open medial wall → longitudinal fissure
          var th = Math.atan2(q[1], q[0]), ph = Math.acos(Math.max(-1, Math.min(1, q[2])));
          var fold = 1 + 0.045 * Math.sin(th * 9 + ph * 3) * Math.sin(ph * 7);  // gyri
          var x = q[0] * 1.08 * fold, y = q[1] * 0.8 * fold, z = q[2] * 0.48 * fold + side * 0.5;
          if (y > 0.42) y = 0.42 + (y - 0.42) * 0.35;           // flatter underside
          if (x < -0.3 && y > 0.25) y = 0.25 + (y - 0.25) * 0.5;  // tuck the occipital base
          // lateral (Sylvian) fissure: a thin gap separating the temporal lobe
          var fis = y - (0.08 - 0.32 * x);
          if (x > -0.35 && x < 0.75 && Math.abs(fis) < 0.035 && Math.abs(z) > 0.75) return;
          p.push({ v: [x, y, z], g: 0 });
        });
      });
      // cerebellum with horizontal folia
      fib(Math.round(N * 0.32)).forEach(function (q) {
        var x = -0.72 + q[0] * 0.34, y = 0.55 + q[1] * 0.22 * (1 + 0.08 * Math.sin(q[1] * 26)), z = q[2] * 0.62;
        if (q[0] > 0.35 && q[1] < 0) return;
        p.push({ v: [x, y, z], g: 1 });
      });
      // brainstem
      var ns = Math.round(N * 0.06);
      for (var i = 0; i < ns; i++) {
        var t = (i / ns), a = (i * 2.4) % PI2;
        p.push({ v: [-0.28 - t * 0.12 + Math.cos(a) * 0.1, 0.42 + t * 0.55, Math.sin(a) * 0.1], g: 1 });
      }
      return fit(p);
    }

    // Regions lit in turn: perceive → ground → predict → reason → act.
    var REGIONS = [
      { name: "Visual cortex", role: "Perception", color: "#16a3c9", test: function (v, g) { return g === 0 && v[0] < -0.55; } },
      { name: "Association cortex", role: "Grounding", color: "#7b5cff", test: function (v, g) { return g === 0 && v[0] >= -0.55 && v[0] < 0.1 && v[1] < -0.05; } },
      { name: "Hippocampus · Cerebellum", role: "Prediction", color: "#22c3b5", test: function (v, g) { return g === 1 ? v[1] < 0.8 : (v[1] > 0.12 && v[0] > -0.45 && v[0] < 0.55 && Math.abs(v[2]) > 0.6); } },
      { name: "Prefrontal cortex", role: "Reasoning & planning", color: "#b14dff", test: function (v, g) { return g === 0 && v[0] > 0.52; } },
      { name: "Motor cortex", role: "Action", color: "#3d8bff", test: function (v, g) { return g === 0 && v[0] >= 0.06 && v[0] < 0.5 && v[1] < -0.12; } }
    ];

    var EYE = eye(), BRAIN = brain();
    // shuffle the brain so points travel organically between shapes
    for (var i = N - 1; i > 0; i--) { var j = (R() * (i + 1)) | 0, tmp = BRAIN[i]; BRAIN[i] = BRAIN[j]; BRAIN[j] = tmp; }
    var region = new Int8Array(N).fill(-1);
    BRAIN.forEach(function (o, idx) { for (var r = 0; r < REGIONS.length; r++) if (REGIONS[r].test(o.v, o.g)) { region[idx] = r; break; } });
    var eyeGroup = new Int8Array(N); EYE.forEach(function (o, idx) { eyeGroup[idx] = o.g; });

    function knn(list) {
      var out = new Int16Array(N * K).fill(-1), dists = [];
      for (var i = 0; i < N; i++) {
        var a = list[i].v, b0 = 1e9, b1 = 1e9, i0 = -1, i1 = -1;
        for (var j = 0; j < N; j++) { if (i === j) continue;
          var b = list[j].v, dx = a[0] - b[0], dy = a[1] - b[1], dz = a[2] - b[2], d = dx * dx + dy * dy + dz * dz;
          if (d < 1e-6) continue;
          if (d < b0) { b1 = b0; i1 = i0; b0 = d; i0 = j; } else if (d < b1) { b1 = d; i1 = j; }
        }
        out[i * K] = i0; out[i * K + 1] = i1; dists.push(b0, b1);
      }
      var sorted = dists.slice().sort(function (a, b) { return a - b; }), lim = sorted[sorted.length >> 1] * 3;
      for (var e = 0; e < N * K; e++) if (dists[e] > lim) out[e] = -1;
      return out;
    }
    var NB_EYE = knn(EYE), NB_BRAIN = knn(BRAIN);

    var pulses = []; for (var pq = 0; pq < 24; pq++) pulses.push({ i: (R() * N) | 0, k: 0, t: R() });
    var mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    window.addEventListener("pointermove", function (e) { mouse.tx = (e.clientX / window.innerWidth - 0.5); mouse.ty = (e.clientY / window.innerHeight - 0.5); }, { passive: true });

    var glow = document.createElement("canvas"); glow.width = glow.height = 40;
    var gctx = glow.getContext("2d"), gg = gctx.createRadialGradient(20, 20, 0, 20, 20, 20);
    gg.addColorStop(0, "rgba(255,255,255,1)"); gg.addColorStop(0.25, "rgba(150,235,255,.55)"); gg.addColorStop(1, "rgba(34,195,181,0)");
    gctx.fillStyle = gg; gctx.fillRect(0, 0, 40, 40);

    var layout = { ox: 0, oy: 0, scale: 1, narrow: false };
    function computeLayout(W, H) {
      var narrow = W < 1000 || W / H < 1.05;
      layout.narrow = narrow;
      if (narrow) {
        var eb = inner && inner.querySelector(".eyebrow");
        var top = inner ? inner.offsetTop + (eb ? eb.offsetTop : 0) : H * 0.5, avail = top - 72;
        if (avail < 90) { layout.scale = W * 0.24; layout.ox = W * 0.55; layout.oy = H * 0.36; cv.style.opacity = "0.32"; }
        else { layout.scale = Math.min(W * 0.27, avail / 2.4); layout.ox = W * 0.5; layout.oy = 72 + avail / 2; cv.style.opacity = ""; }
      } else {
        var textRight = inner ? inner.getBoundingClientRect().right : W * 0.45;
        var room = W - textRight - 40;
        layout.scale = Math.max(90, Math.min(H * 0.26, room / 3.6));
        layout.ox = textRight + 20 + room / 2; layout.oy = H * 0.48;
        cv.style.opacity = "";
      }
    }
    var lastW = 0, lastH = 0;

    // Timeline: eye (hold) → morph → brain with five regions → morph → loop
    var EYE_HOLD = 4.6, MORPH = 2.4, REG_T = 2.5, BRAIN_HOLD = REG_T * REGIONS.length;
    var CYCLE = EYE_HOLD + MORPH + BRAIN_HOLD + MORPH;
    var px = new Float32Array(N), py = new Float32Array(N), pz = new Float32Array(N);
    var BUCKETS = 5, lastLabel = "";
    function ease(x) { return x * x * (3 - 2 * x); }
    function hexA(hex, a) { var n = parseInt(hex.slice(1), 16); return "rgba(" + (n >> 16) + "," + ((n >> 8) & 255) + "," + (n & 255) + "," + a + ")"; }

    function draw(time) {
      var sz = fitCanvas(cv, 1.5), W = sz.w, H = sz.h;
      if (W !== lastW || H !== lastH) { computeLayout(W, H); lastW = W; lastH = H; }
      ctx.setTransform(sz.dpr, 0, 0, sz.dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // m: 0 = eye, 1 = brain
      var ph = time % CYCLE, m, active = -1, regLocal = 0;
      if (ph < EYE_HOLD) m = 0;
      else if (ph < EYE_HOLD + MORPH) m = ease((ph - EYE_HOLD) / MORPH);
      else if (ph < EYE_HOLD + MORPH + BRAIN_HOLD) { m = 1; var bt = ph - EYE_HOLD - MORPH; active = Math.floor(bt / REG_T); regLocal = (bt % REG_T) / REG_T; }
      else m = 1 - ease((ph - EYE_HOLD - MORPH - BRAIN_HOLD) / MORPH);
      var hl = active >= 0 ? Math.min(1, regLocal * 5, (1 - regLocal) * 5) : 0; // highlight fade in/out

      var txt = m < 0.5 ? "Perception · the eye" : (active >= 0 ? REGIONS[active].role + " · " + REGIONS[active].name : "Reasoning · the brain");
      if (txt !== lastLabel && label) {
        label.textContent = txt; lastLabel = txt;
        if (labelDot) labelDot.style.background = m < 0.5 ? "#22c3b5" : (active >= 0 ? REGIONS[active].color : "#7b5cff");
      }

      mouse.x += (mouse.tx - mouse.x) * 0.05; mouse.y += (mouse.ty - mouse.y) * 0.05;
      // eye faces the viewer; the brain is seen from the side, swaying to show depth
      var yawEye = Math.sin(time * 0.5) * 0.28, yawBrain = -0.35 + Math.sin(time * 0.35) * 0.45;
      var ry = yawEye + (yawBrain - yawEye) * m + mouse.x * 0.6;
      var rx = (Math.sin(time * 0.4) * 0.06) * (1 - m) + (-0.18 + Math.sin(time * 0.3) * 0.06) * m + mouse.y * 0.4;
      var cy = Math.cos(ry), sy = Math.sin(ry), cx = Math.cos(rx), sx = Math.sin(rx);
      var scale = layout.scale * (0.68 + 0.27 * m), ox = layout.ox, oy = layout.oy;
      // the eye looks around
      var gx = Math.sin(time * 0.9) * 0.16 + Math.sin(time * 2.3) * 0.03, gyv = Math.sin(time * 0.6 + 1) * 0.07;
      var blink = Math.max(0, 1 - Math.abs(((time % 5.2) - 4.9) / 0.12)); // brief blink near the end of each 5.2 s
      for (var i = 0; i < N; i++) {
        var A = EYE[i].v, B = BRAIN[i].v, g = eyeGroup[i];
        var ax = A[0], ay = A[1], az = A[2];
        if (g === 1) { ax += gx; ay += gyv; }
        else if (g === 2) ay *= (1 - blink * 0.85);
        var x0 = ax + (B[0] - ax) * m, y0 = ay + (B[1] - ay) * m, z0 = az + (B[2] - az) * m;
        var x = x0 * cy - z0 * sy, z = x0 * sy + z0 * cy, y = y0 * cx - z * sx; z = y0 * sx + z * cx;
        var f = 4.5 / (4.5 + z); px[i] = ox + x * scale * f; py[i] = oy + y * scale * f; pz[i] = z;
      }

      var nb = m < 0.5 ? NB_EYE : NB_BRAIN;
      var edgeAlpha = 0.32 * (1 - Math.sin(m * Math.PI) * 0.8);
      ctx.lineWidth = 1;
      ctx.globalCompositeOperation = "lighter";
      for (var bk = 0; bk < BUCKETS; bk++) {
        ctx.beginPath();
        var lo = -1.6 + bk * (3.2 / BUCKETS), hi = lo + 3.2 / BUCKETS;
        for (i = 0; i < N; i++) {
          var zz = pz[i]; if (zz < lo || zz >= hi) continue;
          for (var k = 0; k < K; k++) { var jn = nb[i * K + k]; if (jn < 0) continue; ctx.moveTo(px[i], py[i]); ctx.lineTo(px[jn], py[jn]); }
        }
        ctx.strokeStyle = "rgba(110,160,255," + (edgeAlpha * (1 - (bk / (BUCKETS - 1)) * 0.7) * (active >= 0 ? 0.75 : 1)).toFixed(3) + ")";
        ctx.stroke();
      }
      // highlighted region edges
      if (active >= 0 && hl > 0) {
        ctx.beginPath();
        for (i = 0; i < N; i++) { if (region[i] !== active) continue;
          for (k = 0; k < K; k++) { jn = NB_BRAIN[i * K + k]; if (jn < 0 || region[jn] !== active) continue; ctx.moveTo(px[i], py[i]); ctx.lineTo(px[jn], py[jn]); } }
        ctx.strokeStyle = hexA(REGIONS[active].color, (0.75 * hl).toFixed(3)); ctx.lineWidth = 1.3; ctx.stroke(); ctx.lineWidth = 1;
      }
      // points
      var pr = Math.max(1.1, Math.min(2, scale / 70));
      var glowS = Math.max(9, Math.min(20, scale * 0.13));
      var cxs = 0, cys = 0, cn = 0;
      for (i = 0; i < N; i++) {
        var dpt = Math.max(0, Math.min(1, (pz[i] + 1.4) / 2.8));
        var hue = (i / N + time * 0.02) % 1, rr = pr * (1.35 - dpt * 0.75), alpha = 0.95 - dpt * 0.6;
        var inReg = active >= 0 && region[i] === active;
        if (m < 0.5 && eyeGroup[i] === 1) { ctx.fillStyle = grad3(0.2 + 0.6 * ((i * 7) % 13) / 13); }
        else ctx.fillStyle = grad3(hue < 0.5 ? hue * 2 : 2 - hue * 2);
        if (active >= 0) {
          if (inReg) { ctx.fillStyle = REGIONS[active].color; rr *= 1 + (layout.narrow ? 0.35 : 0.7) * hl; alpha = Math.min(1, alpha + 0.4 * hl); cxs += px[i]; cys += py[i]; cn++; }
          else alpha *= 1 - 0.45 * hl;
        }
        ctx.globalAlpha = alpha;
        ctx.fillRect(px[i] - rr, py[i] - rr, rr * 2, rr * 2);
      }
      ctx.globalAlpha = 1;
      // pupil glow while the eye is showing
      if (m < 0.6) {
        // project the (moving) iris centre with the same transform as the points
        var icx = gx * (1 - m), icy = gyv * (1 - m), icz = -0.93;
        var tx = icx * cy - icz * sy, tz = icx * sy + icz * cy, ty = icy * cx - tz * sx; tz = icy * sx + tz * cx;
        var ff = 4.5 / (4.5 + tz), pcx = ox + tx * scale * ff, pcy = oy + ty * scale * ff;
        var a0 = (1 - m / 0.6);
        var pg = ctx.createRadialGradient(pcx, pcy, 0, pcx, pcy, scale * 0.24);
        pg.addColorStop(0, "rgba(6,10,24," + (0.95 * a0) + ")"); pg.addColorStop(0.7, "rgba(6,10,24," + (0.75 * a0) + ")"); pg.addColorStop(1, "rgba(6,10,24,0)");
        ctx.globalCompositeOperation = "source-over"; ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(pcx, pcy, scale * 0.24, 0, PI2); ctx.fill();
        ctx.globalCompositeOperation = "lighter"; ctx.globalAlpha = 0.9 * a0;
        ctx.drawImage(glow, pcx - scale * 0.1 + scale * 0.06, pcy - scale * 0.1 - scale * 0.06, scale * 0.12, scale * 0.12); // catch-light
        ctx.globalAlpha = 1;
      }
      // message-passing pulses (inside the active region when one is lit)
      for (var q2 = 0; q2 < pulses.length; q2++) {
        var pu = pulses[q2]; pu.t += 0.04;
        var to = nb[pu.i * K + pu.k];
        if (to < 0 || pu.t >= 1) {
          if (to >= 0 && pu.t >= 1 && (active < 0 || region[to] === active)) pu.i = to;
          else if (active >= 0) { var tries = 0; do { pu.i = (R() * N) | 0; } while (region[pu.i] !== active && ++tries < 40); }
          else pu.i = (R() * N) | 0;
          pu.k = (R() * K) | 0; pu.t = 0; continue;
        }
        var gxp = px[pu.i] + (px[to] - px[pu.i]) * pu.t, gyp = py[pu.i] + (py[to] - py[pu.i]) * pu.t;
        ctx.drawImage(glow, gxp - glowS / 2, gyp - glowS / 2, glowS, glowS);
      }
      ctx.globalCompositeOperation = "source-over"; ctx.globalAlpha = 1;
      // region callout (desktop only): label sits above or below the brain, joined by a leader line
      if (active >= 0 && cn > 4 && !layout.narrow && hl > 0.05) {
        var rcx = cxs / cn, rcy = cys / cn, below = rcy > oy + scale * 0.15;
        var ey = below ? oy + scale * 1.05 : oy - scale * 1.1, ex = rcx;
        ctx.font = "600 14px Inter, sans-serif";
        var tw = Math.max(ctx.measureText(REGIONS[active].name).width, REGIONS[active].role.length * 8);
        var tx0 = Math.max(16 + tw / 2, Math.min(W - 16 - tw / 2, ex));
        ctx.globalAlpha = hl;
        ctx.strokeStyle = hexA(REGIONS[active].color, 0.8); ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(rcx, rcy); ctx.lineTo(ex, ey + (below ? -6 : 6)); ctx.stroke();
        ctx.fillStyle = REGIONS[active].color; ctx.beginPath(); ctx.arc(rcx, rcy, 3.5, 0, PI2); ctx.fill();
        ctx.textAlign = "center"; ctx.fillStyle = "#e9edff";
        var ty0 = below ? ey + 10 : ey - 22;
        ctx.fillText(REGIONS[active].name, tx0, ty0);
        ctx.font = "600 11.5px Inter, sans-serif"; ctx.fillStyle = hexA(REGIONS[active].color, 1);
        ctx.fillText(REGIONS[active].role.toUpperCase(), tx0, ty0 + 17);
        ctx.textAlign = "left"; ctx.globalAlpha = 1;
      }
    }
    window.addEventListener("resize", function () { lastW = 0; });
    animateWhenVisible(cv, draw, { fps: small ? 30 : 0, still: EYE_HOLD + MORPH + REG_T * 3 + 1.2 });
  }

  /* ------------------------------------------------------------------ */
  /* Topic scenes                                                       */
  /* ------------------------------------------------------------------ */
  var SCENES = {
    // World model: an agent moving through a field, imagining futures.
    world: function (ctx, W, H, t) {
      ctx.fillStyle = "#0b1230"; ctx.fillRect(0, 0, W, H);
      var u = Math.min(W, H * 1.4) / 100; // scene unit
      ctx.strokeStyle = "rgba(61,139,255,.16)"; ctx.lineWidth = 1;
      var hz = H * 0.3;
      for (var i = -14; i <= 14; i++) { ctx.beginPath(); ctx.moveTo(W / 2 + i * u * 2.2, hz); ctx.lineTo(W / 2 + i * W * 0.14, H); ctx.stroke(); }
      for (var j = 0; j < 14; j++) { var yy = hz + Math.pow(((j + (t * 0.6) % 1) / 14), 2) * (H - hz); ctx.beginPath(); ctx.moveTo(0, yy); ctx.lineTo(W, yy); ctx.stroke(); }
      var path = function (s) { return [W * 0.48 + Math.sin(s * 0.9) * W * 0.19 + Math.sin(s * 2.1) * W * 0.04, H * 0.56 + Math.cos(s * 0.7) * H * 0.12]; };
      ctx.lineWidth = Math.max(2, u * 0.45); ctx.lineCap = "round";
      for (var k = 0; k < 40; k++) { var p0 = path(t - k * 0.04), p1 = path(t - (k + 1) * 0.04); ctx.strokeStyle = "rgba(34,195,181," + (0.9 - k / 44) + ")"; ctx.beginPath(); ctx.moveTo(p0[0], p0[1]); ctx.lineTo(p1[0], p1[1]); ctx.stroke(); }
      var cur = path(t), dir = path(t + 0.05);
      var ang = Math.atan2(dir[1] - cur[1], dir[0] - cur[0]);
      var stepLen = Math.min(u * 2.2, H * 0.045, Math.min(W, H) * 0.015);
      for (var r = 0; r < 7; r++) {
        var a = ang + (r - 3) * 0.26, x = cur[0], y = cur[1];
        ctx.setLineDash([u * 0.7, u]); ctx.lineWidth = Math.max(1.4, u * 0.22);
        ctx.strokeStyle = r === 3 ? "rgba(255,255,255,.9)" : "rgba(154,120,255,.6)";
        ctx.beginPath(); ctx.moveTo(x, y);
        for (var s = 1; s <= 12; s++) { a += Math.sin(t * 1.3 + r * 1.7 + s * 0.4) * 0.08; x += Math.cos(a) * stepLen; y += Math.sin(a) * stepLen; ctx.lineTo(x, y); }
        ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = r === 3 ? "#fff" : "rgba(177,77,255,.85)"; ctx.beginPath(); ctx.arc(x, y, r === 3 ? u * 0.7 : u * 0.45, 0, 6.283); ctx.fill();
      }
      // imagined future frames (only where there is room)
      if (W < 520 || H < 220) { drawAgent(); return; }
      var fw = Math.max(54, W * 0.11), fh = fw * 0.72;
      ctx.font = "500 " + Math.round(Math.max(10, fw * 0.16)) + "px ui-monospace,Menlo,monospace";
      for (var f = 0; f < 3; f++) {
        var fx = W - 24 - (3 - f) * (fw + 12), fy = 24;
        ctx.fillStyle = "rgba(11,18,48,.8)"; ctx.fillRect(fx, fy, fw, fh);
        ctx.strokeStyle = "rgba(255,255,255," + (0.3 + f * 0.2) + ")"; ctx.lineWidth = 1; ctx.strokeRect(fx, fy, fw, fh);
        ctx.strokeStyle = "rgba(61,139,255,.25)";
        for (var g = 1; g < 4; g++) { ctx.beginPath(); ctx.moveTo(fx, fy + fh * 0.55 + g * fh * 0.1); ctx.lineTo(fx + fw, fy + fh * 0.55 + g * fh * 0.1); ctx.stroke(); }
        ctx.fillStyle = "rgba(34,195,181," + (0.45 + f * 0.2) + ")";
        var bx = fx + 6 + ((t * fw * 0.3 + f * fw * 0.25) % (fw - 18)); ctx.beginPath(); ctx.arc(bx + 6, fy + fh * 0.6, fw * 0.07, 0, 6.283); ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,.6)"; ctx.fillText("t+" + (f + 1), fx, fy + fh + fw * 0.2);
      }
      drawAgent();
      function drawAgent() {
        var g2 = ctx.createRadialGradient(cur[0], cur[1], 0, cur[0], cur[1], u * 4.5); g2.addColorStop(0, "rgba(34,195,181,.65)"); g2.addColorStop(1, "rgba(34,195,181,0)");
        ctx.fillStyle = g2; ctx.beginPath(); ctx.arc(cur[0], cur[1], u * 4.5, 0, 6.283); ctx.fill();
        ctx.fillStyle = "#22c3b5"; ctx.beginPath(); ctx.arc(cur[0], cur[1], u * 1.1, 0, 6.283); ctx.fill();
      }
    },

    // Language → action: an instruction is read word by word, then the arm acts.
    action: function (ctx, W, H, t) {
      ctx.fillStyle = "#0b1230"; ctx.fillRect(0, 0, W, H);
      var words = ["pick", "up", "the", "blue", "cube"];
      var fs = Math.max(11, Math.min(14, W / 26));
      ctx.font = "600 " + fs + "px Inter, sans-serif";
      var cyc = (t * 0.6) % (words.length + 2.5);
      var x = 16, y = 18;
      for (var i = 0; i < words.length; i++) {
        var w = ctx.measureText(words[i]).width + 16, on = cyc > i, now = cyc > i && cyc < i + 1;
        ctx.globalAlpha = on ? 1 : 0.35;
        ctx.fillStyle = now ? "rgba(34,195,181,.3)" : "rgba(61,139,255,.2)"; ctx.strokeStyle = now ? "#22c3b5" : "rgba(61,139,255,.8)"; ctx.lineWidth = 1;
        roundRect(ctx, x, y, w, fs + 12, (fs + 12) / 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = "#e3ecff"; ctx.fillText(words[i], x + 8, y + fs + 3);
        x += w + 6;
      }
      ctx.globalAlpha = 1;
      var act = Math.max(0, Math.min(1, (cyc - words.length) / 1.5)); act = act * act * (3 - 2 * act);
      var bx = W * 0.74, by = H * 0.96;
      var tgt = [W * 0.36, H * 0.86];
      var L1 = H * 0.42, L2 = H * 0.34, L3 = H * 0.14;
      var a1 = -1.95 + Math.sin(t * 0.7) * 0.1 - act * 0.55, a2 = 1.25 + act * 0.25, a3 = 0.95 + Math.sin(t * 2) * 0.1;
      var j1 = [bx + Math.cos(a1) * L1, by + Math.sin(a1) * L1];
      var j2 = [j1[0] + Math.cos(a1 + a2) * L2, j1[1] + Math.sin(a1 + a2) * L2];
      var j3 = [j2[0] + Math.cos(a1 + a2 + a3) * L3, j2[1] + Math.sin(a1 + a2 + a3) * L3];
      ctx.lineCap = "round";
      [[bx, by, j1, 12], [j1[0], j1[1], j2, 9], [j2[0], j2[1], j3, 6]].forEach(function (sg, k) {
        var gr = ctx.createLinearGradient(sg[0], sg[1], sg[2][0], sg[2][1]); gr.addColorStop(0, "#3d8bff"); gr.addColorStop(1, k === 2 ? "#22c3b5" : "#7b5cff");
        ctx.strokeStyle = gr; ctx.lineWidth = sg[3]; ctx.beginPath(); ctx.moveTo(sg[0], sg[1]); ctx.lineTo(sg[2][0], sg[2][1]); ctx.stroke();
      });
      [[bx, by], j1, j2].forEach(function (j) { ctx.fillStyle = "#e9edff"; ctx.beginPath(); ctx.arc(j[0], j[1], 4.5, 0, 6.283); ctx.fill(); });
      var cs = Math.max(14, H * 0.11);
      ctx.fillStyle = act > 0.9 ? "rgba(34,195,181,.9)" : "rgba(61,139,255,.85)"; ctx.fillRect(tgt[0] - cs / 2, tgt[1] - cs, cs, cs);
      ctx.strokeStyle = "#9cc3ff"; ctx.lineWidth = 1; ctx.strokeRect(tgt[0] - cs / 2, tgt[1] - cs, cs, cs);
      ctx.setLineDash([3, 5]); ctx.strokeStyle = "rgba(34,195,181," + (0.25 + act * 0.5) + ")"; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(j3[0], j3[1]); ctx.lineTo(tgt[0], tgt[1] - cs); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = "#22c3b5"; ctx.beginPath(); ctx.arc(j3[0], j3[1], 4.5, 0, 6.283); ctx.fill();
    },

    // MLLM: image patches become tokens alongside text, with attention arcs.
    mllm: function (ctx, W, H, t) {
      ctx.fillStyle = "#0b1230"; ctx.fillRect(0, 0, W, H);
      var n = 4, cell = H * 0.1, gx = W * 0.06, gy = H * 0.08;
      var tok = Math.max(17, H * 0.085), seqX0 = W * 0.06, seqY = H * 0.6;
      var cycle = (t * 0.3) % 1.25;
      var lx = W * 0.66, ly = H * 0.08, lw = W * 0.28, lh = H * 0.36;
      var tokPos = [];
      for (var i = 0; i < n * n; i++) {
        var r = (i / n) | 0, c = i % n;
        var col = grad3(0.5 + 0.5 * Math.sin(r * 0.9 + c * 0.7 + 1.2));
        var sx = gx + c * (cell + 2), sy = gy + r * (cell + 2);
        var k = i / (n * n), local = Math.max(0, Math.min(1, cycle * 1.6 - k * 0.6)); local = local * local * (3 - 2 * local);
        var tx = seqX0 + (i % 8) * (tok + 3), ty = seqY + ((i / 8) | 0) * (tok + 3);
        var x = sx + (tx - sx) * local, y = sy + (ty - sy) * local, sz = cell + (tok - cell) * local;
        ctx.fillStyle = col; ctx.globalAlpha = 0.95; ctx.fillRect(x, y, sz, sz);
        if (local > 0.99) tokPos.push([tx + tok / 2, ty]);
      }
      ctx.globalAlpha = 1;
      // text tokens after the image tokens
      var words = ["what", "is", "it", "doing", "?"];
      ctx.font = "600 " + Math.max(10, Math.round(tok * 0.6)) + "px Inter, sans-serif";
      var wx = seqX0 + 8 * (tok + 3) + 8, wy = seqY;
      for (var w = 0; w < words.length; w++) {
        var ww = ctx.measureText(words[w]).width + 10;
        if (wx + ww > W - 8) { wx = seqX0 + 8 * (tok + 3) + 8; wy += tok + 3; }
        ctx.fillStyle = "rgba(255,255,255,.1)"; ctx.strokeStyle = "rgba(255,255,255,.45)"; ctx.lineWidth = 1;
        roundRect(ctx, wx, wy, ww, tok, 5); ctx.fill(); ctx.stroke();
        ctx.fillStyle = "#e9edff"; ctx.fillText(words[w], wx + 5, wy + tok * 0.72);
        tokPos.push([wx + ww / 2, wy]);
        wx += ww + 4;
      }
      // tokens flow into the language model
      ctx.lineWidth = 1;
      tokPos.forEach(function (p, j) {
        var a = 0.12 + 0.45 * Math.abs(Math.sin(t * 1.6 + j * 0.7));
        ctx.strokeStyle = "rgba(150,120,255," + a.toFixed(2) + ")";
        ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.bezierCurveTo(p[0], p[1] - H * 0.18, lx + lw / 2, ly + lh + H * 0.12, lx + lw / 2, ly + lh); ctx.stroke();
      });
      var gr = ctx.createLinearGradient(lx, ly, lx + lw, ly + lh); gr.addColorStop(0, "rgba(123,92,255,.55)"); gr.addColorStop(1, "rgba(61,139,255,.3)");
      ctx.fillStyle = gr; roundRect(ctx, lx, ly, lw, lh, 12); ctx.fill();
      for (var b = 0; b < 3; b++) { ctx.fillStyle = "rgba(255,255,255," + (0.15 + 0.2 * Math.abs(Math.sin(t * 2 + b))) + ")"; ctx.fillRect(lx + 10, ly + 10 + b * 7, lw - 20, 3); }
      ctx.fillStyle = "#fff"; ctx.font = "700 " + Math.round(lh * 0.28) + "px 'Space Grotesk', Inter, sans-serif"; ctx.textAlign = "center";
      ctx.fillText("LLM", lx + lw / 2, ly + lh * 0.82); ctx.textAlign = "left";
    },

    // Unified model: two streams braid into one and diverge to outputs.
    unified: function (ctx, W, H, t) {
      ctx.fillStyle = "#0b1230"; ctx.fillRect(0, 0, W, H);
      var mid = H * 0.48;
      for (var s = 0; s < 2; s++) {
        for (var i = 0; i < 70; i++) {
          var u = ((i / 70) + t * 0.12) % 1;
          var x = u * W;
          var spread = u < 0.35 ? (0.35 - u) / 0.35 : u > 0.7 ? (u - 0.7) / 0.3 : 0;
          var braid = Math.sin(u * 22 + s * Math.PI) * 10 * (1 - spread);
          var y = mid + (s ? 1 : -1) * spread * H * 0.3 + braid;
          var col = s ? "#b14dff" : "#22c3b5";
          ctx.fillStyle = col; ctx.globalAlpha = 0.25 + 0.75 * Math.sin(u * Math.PI);
          ctx.beginPath(); ctx.arc(x, y, 2.6 + (1 - spread) * 1.2, 0, 6.283); ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      var cx = W * 0.52, r = Math.min(W, H) * 0.12 + Math.sin(t * 2) * 3;
      var g = ctx.createRadialGradient(cx, mid, 0, cx, mid, r * 2.2); g.addColorStop(0, "rgba(61,139,255,.55)"); g.addColorStop(1, "rgba(61,139,255,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, mid, r * 2.2, 0, 6.283); ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,.7)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, mid, r, 0, 6.283); ctx.stroke();
      ctx.font = "600 12px Inter, sans-serif"; ctx.fillStyle = "rgba(255,255,255,.75)";
      ctx.fillText("image", 14, mid - H * 0.3 - 8); ctx.fillText("text", 14, mid + H * 0.3 + 18);
      ctx.textAlign = "right"; ctx.fillText("understand", W - 14, mid - H * 0.3 - 8); ctx.fillText("generate", W - 14, mid + H * 0.3 + 18); ctx.textAlign = "left";
    },

    // Foundation models for narrow domains: time series feeding one model.
    foundation: function (ctx, W, H, t) {
      ctx.fillStyle = "#0b1230"; ctx.fillRect(0, 0, W, H);
      var cx = W * 0.68, cy = H * 0.46, R0 = Math.min(W, H) * 0.2;
      var cols = ["#22c3b5", "#3d8bff", "#7b5cff", "#16a3c9"];
      for (var s = 0; s < 4; s++) {
        var y0 = H * (0.16 + s * 0.17);
        ctx.strokeStyle = cols[s]; ctx.lineWidth = 2; ctx.globalAlpha = 0.9; ctx.beginPath();
        for (var x = 0; x <= W * 0.42; x += 3) {
          var u = x / (W * 0.42);
          var v = Math.sin(x * 0.05 * (1 + s * 0.4) - t * (2 + s * 0.5)) * 10 + Math.sin(x * 0.13 + s - t * 3) * 4;
          var yy = y0 + v * (1 - u * 0.7) + (cy - y0) * Math.pow(u, 3);
          var xx = 14 + x + (cx - R0 - 14 - W * 0.42) * Math.pow(u, 4);
          x === 0 ? ctx.moveTo(xx, yy) : ctx.lineTo(xx, yy);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      // rotating sphere of points
      var M = 160;
      for (var i = 0; i < M; i++) {
        var yv = 1 - (i / (M - 1)) * 2, rr = Math.sqrt(1 - yv * yv), th = i * 2.39996 + t * 0.6;
        var px = Math.cos(th) * rr, pz = Math.sin(th) * rr;
        var d = (pz + 1) / 2;
        ctx.fillStyle = grad3(i / M); ctx.globalAlpha = 0.3 + d * 0.7;
        ctx.beginPath(); ctx.arc(cx + px * R0, cy + yv * R0, 1.2 + d * 1.8, 0, 6.283); ctx.fill();
      }
      ctx.globalAlpha = 1;
      var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R0); g.addColorStop(0, "rgba(61,139,255,.35)"); g.addColorStop(1, "rgba(61,139,255,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R0, 0, 6.283); ctx.fill();
    },

    // Adaptation: two clusters drift (domain shift) and the boundary recalibrates without labels.
    adapt: function (ctx, W, H, t) {
      ctx.fillStyle = "#0b1230"; ctx.fillRect(0, 0, W, H);
      var R = rng(5), ph = t * 0.45;
      var shift = Math.sin(ph) * 0.5 + 0.5; // 0 = source, 1 = target domain
      var cA = [W * (0.32 + 0.12 * shift), H * (0.38 + 0.22 * shift)], cB = [W * (0.68 - 0.06 * shift), H * (0.66 - 0.26 * shift)];
      var lag = Math.sin(ph - 0.7) * 0.5 + 0.5;
      var lA = [W * (0.32 + 0.12 * lag), H * (0.38 + 0.22 * lag)], lB = [W * (0.68 - 0.06 * lag), H * (0.66 - 0.26 * lag)];
      // boundary = perpendicular bisector of the (lagging) estimated centres
      var mx = (lA[0] + lB[0]) / 2, my = (lA[1] + lB[1]) / 2, dx = lB[0] - lA[0], dy = lB[1] - lA[1];
      var len = Math.hypot(dx, dy) || 1, nx = -dy / len, ny = dx / len, L = Math.max(W, H);
      ctx.save();
      ctx.beginPath(); ctx.moveTo(mx + nx * L, my + ny * L); ctx.lineTo(mx - nx * L, my - ny * L);
      ctx.lineTo(mx - nx * L - dx / len * L, my - ny * L - dy / len * L); ctx.lineTo(mx + nx * L - dx / len * L, my + ny * L - dy / len * L); ctx.closePath();
      ctx.fillStyle = "rgba(34,195,181,.07)"; ctx.fill(); ctx.restore();
      ctx.strokeStyle = "rgba(255,255,255,.85)"; ctx.lineWidth = 2; ctx.setLineDash([6, 6]);
      ctx.beginPath(); ctx.moveTo(mx + nx * L, my + ny * L); ctx.lineTo(mx - nx * L, my - ny * L); ctx.stroke(); ctx.setLineDash([]);
      var sp = Math.min(W, H) * 0.11;
      for (var i = 0; i < 46; i++) {
        var a = R() * 6.283, r = Math.sqrt(R()) * sp, k = i % 2, c = k ? cB : cA;
        var x = c[0] + Math.cos(a) * r, y = c[1] + Math.sin(a) * r * 0.8;
        ctx.fillStyle = k ? "rgba(177,77,255,.9)" : "rgba(34,195,181,.9)";
        ctx.beginPath(); ctx.arc(x, y, 3, 0, 6.283); ctx.fill();
      }
      [lA, lB].forEach(function (c, k) {
        ctx.strokeStyle = k ? "rgba(177,77,255,.9)" : "rgba(34,195,181,.9)"; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(c[0], c[1], sp * 1.25, 0, 6.283); ctx.stroke();
      });
      ctx.font = "600 11px Inter, sans-serif"; ctx.fillStyle = "rgba(255,255,255,.7)";
      ctx.fillText(shift < 0.5 ? "source domain" : "shifted domain", 14, 20);
      var bw = Math.min(110, W * 0.3); ctx.fillStyle = "rgba(255,255,255,.12)"; ctx.fillRect(W - bw - 14, 12, bw, 6);
      ctx.fillStyle = "#2fd39a"; ctx.fillRect(W - bw - 14, 12, bw * shift, 6);
    },

  };

  function roundRect(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }

  function topicScenes() {
    document.querySelectorAll(".topic canvas").forEach(function (cv) {
      var ctx = cv.getContext("2d"), fn = SCENES[cv.dataset.scene]; if (!fn) return;
      var body = cv.parentNode.querySelector(".topic-body");
      var band = 0;
      var measure = function () { band = body ? body.offsetTop - 10 : 0; };
      measure(); window.addEventListener("resize", measure);
      if (ro && body) new ResizeObserver(measure).observe(body);
      animateWhenVisible(cv, function (t) {
        var s = fitCanvas(cv); ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
        ctx.fillStyle = "#0b1230"; ctx.fillRect(0, 0, s.w, s.h);
        var bh = Math.max(60, Math.min(s.h, band || s.h * 0.55));
        ctx.save(); ctx.beginPath(); ctx.rect(0, 0, s.w, bh); ctx.clip();
        fn(ctx, s.w, bh, t, cv.dataset.color);
        ctx.restore();
      }, { still: 4.5, fps: 30 });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Generated paper covers: four seeded motifs                          */
  /* ------------------------------------------------------------------ */
  var COVER = {
    flow: function (ctx, W, H, R, pal) {
      var f1 = 0.004 + R() * 0.006, f2 = 0.004 + R() * 0.006, ph = R() * 10;
      ctx.globalCompositeOperation = "lighter"; ctx.lineWidth = 1;
      for (var i = 0; i < 240; i++) {
        var x = R() * W, y = R() * H;
        ctx.strokeStyle = lerpColor(pal[0], pal[1], x / W); ctx.globalAlpha = 0.16 + R() * 0.25; ctx.beginPath(); ctx.moveTo(x, y);
        for (var k = 0; k < 40; k++) { var a = Math.sin(x * f1 + ph) * 2.2 + Math.cos(y * f2 - ph) * 2.2; x += Math.cos(a) * 3; y += Math.sin(a) * 3; ctx.lineTo(x, y); }
        ctx.stroke();
      }
    },
    graph: function (ctx, W, H, R, pal) {
      var P = []; for (var i = 0; i < 46; i++) P.push([R() * W, R() * H * 0.9]);
      ctx.lineWidth = 1;
      for (i = 0; i < P.length; i++) for (var j = i + 1; j < P.length; j++) {
        var d = Math.hypot(P[i][0] - P[j][0], P[i][1] - P[j][1]);
        if (d < W * 0.17) { ctx.strokeStyle = lerpColor(pal[0], pal[1], P[i][0] / W); ctx.globalAlpha = 0.5 * (1 - d / (W * 0.17)); ctx.beginPath(); ctx.moveTo(P[i][0], P[i][1]); ctx.lineTo(P[j][0], P[j][1]); ctx.stroke(); }
      }
      ctx.globalAlpha = 1;
      P.forEach(function (p) { ctx.fillStyle = lerpColor(pal[0], pal[1], p[0] / W); ctx.beginPath(); ctx.arc(p[0], p[1], 1.5 + R() * 2.5, 0, 6.283); ctx.fill(); });
    },
    rings: function (ctx, W, H, R, pal) {
      ctx.lineWidth = 1.2;
      for (var c = 0; c < 4; c++) {
        var cx = R() * W, cy = R() * H * 0.8, n = 6 + ((R() * 6) | 0);
        for (var k = 1; k <= n; k++) { ctx.strokeStyle = lerpColor(pal[0], pal[1], k / n); ctx.globalAlpha = 0.6 - k / (n * 2); ctx.beginPath(); ctx.arc(cx, cy, k * (8 + R() * 6), 0, 6.283); ctx.stroke(); }
      }
    },
    grid: function (ctx, W, H, R, pal) {
      var n = 12, cw = W / n, ch = H / (n * 0.62);
      for (var i = 0; i < n; i++) for (var j = 0; j < n * 0.62; j++) {
        var v = 0.5 + 0.5 * Math.sin(i * 0.5 + R() * 0.8) * Math.cos(j * 0.6);
        ctx.fillStyle = lerpColor(pal[0], pal[1], v); ctx.globalAlpha = 0.08 + v * 0.5;
        ctx.fillRect(i * cw + 1, j * ch + 1, cw - 2, ch - 2);
      }
    }
  };
  var MOTIFS = ["flow", "graph", "rings", "grid"];
  function covers() {
    var palettes = [["#22c3b5", "#3d8bff"], ["#3d8bff", "#b14dff"], ["#7b5cff", "#22c3b5"], ["#16a3c9", "#7b5cff"]];
    var idx = 0;
    document.querySelectorAll(".paper canvas").forEach(function (cv) {
      var seed = +cv.dataset.seed || 1, motif = MOTIFS[idx++ % MOTIFS.length];
      var paint = function () {
        var r = cv.getBoundingClientRect(), W = r.width, H = r.height; if (W < 10) return;
        cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR);
        var ctx = cv.getContext("2d"); ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
        var R = rng(seed * 9973), pal = palettes[seed % palettes.length];
        var bg = ctx.createLinearGradient(0, 0, W, H); bg.addColorStop(0, "#0a1130"); bg.addColorStop(1, "#141c44");
        ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
        COVER[motif](ctx, W, H, R, pal);
        ctx.globalAlpha = 1; ctx.globalCompositeOperation = "source-over";
        var shade = ctx.createLinearGradient(0, H * 0.35, 0, H); shade.addColorStop(0, "rgba(6,10,24,0)"); shade.addColorStop(1, "rgba(6,10,24,.8)");
        ctx.fillStyle = shade; ctx.fillRect(0, 0, W, H);
      };
      paint();
      var to; window.addEventListener("resize", function () { clearTimeout(to); to = setTimeout(paint, 150); });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Join band: drifting constellation                                  */
  /* ------------------------------------------------------------------ */
  function joinBg() {
    var cv = $("#joinCanvas"); if (!cv) return;
    var ctx = cv.getContext("2d"), R = rng(7), P = [];
    for (var i = 0; i < 60; i++) P.push({ x: R(), y: R(), vx: (R() - 0.5) * 0.0006, vy: (R() - 0.5) * 0.0006 });
    animateWhenVisible(cv, function () {
      var s = fitCanvas(cv, 1.5), W = s.w, H = s.h; ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0); ctx.clearRect(0, 0, W, H);
      P.forEach(function (p) { p.x = (p.x + p.vx + 1) % 1; p.y = (p.y + p.vy + 1) % 1; });
      ctx.lineWidth = 1;
      for (var i = 0; i < P.length; i++) for (var j = i + 1; j < P.length; j++) {
        var dx = (P[i].x - P[j].x) * W, dy = (P[i].y - P[j].y) * H, d2 = dx * dx + dy * dy;
        if (d2 < 16900) { var d = Math.sqrt(d2); ctx.strokeStyle = "rgba(110,160,255," + (0.22 * (1 - d / 130)).toFixed(3) + ")"; ctx.beginPath(); ctx.moveTo(P[i].x * W, P[i].y * H); ctx.lineTo(P[j].x * W, P[j].y * H); ctx.stroke(); }
      }
      P.forEach(function (p, k) { ctx.fillStyle = k % 3 ? "rgba(34,195,181,.8)" : "rgba(177,77,255,.8)"; ctx.fillRect(p.x * W - 1.5, p.y * H - 1.5, 3, 3); });
    }, { fps: 30 });
  }

  /* ------------------------------------------------------------------ */
  renderMission(); renderNews(); renderPrinciples(); renderPeople(); renderWork(); renderVenues(); renderPlan();
  setupNav(); setupReveal();
  hero(); topicScenes(); covers(); joinBg();
  var y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear();
})();

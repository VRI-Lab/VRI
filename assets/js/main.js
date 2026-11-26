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
      var img = new Image(); img.src = p.photo; img.alt = p.name; img.loading = "lazy";
      img.onerror = function () { d.textContent = p.initials; };
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
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 8h18M8 21h8"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/></svg>',
    building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6"/></svg>'
  };
  var LINK_LABEL = { scholar: "Google Scholar", web: "Homepage", github: "GitHub", linkedin: "LinkedIn" };

  /* ------------------------------------------------------------------ */
  /* Render content                                                     */
  /* ------------------------------------------------------------------ */
  function renderTopics() {
    var wrap = $("#topics");
    D.topics.forEach(function (t, i) {
      var card = el("article", "topic reveal");
      card.style.setProperty("--c", t.color);
      card.style.transitionDelay = (i * 60) + "ms";
      var cv = el("canvas"); cv.setAttribute("aria-hidden", "true"); cv.dataset.scene = t.scene; cv.dataset.color = t.color;
      card.appendChild(cv);
      var body = el("div", "topic-body");
      body.innerHTML = '<span class="topic-num">TOPIC ' + t.num + '</span><h3>' + esc(t.title) + '</h3><p>' + esc(t.blurb) + '</p>';
      var leads = el("div", "leads");
      var stack = el("div", "avatar-stack");
      var names = [];
      t.leads.forEach(function (id) {
        var p = personById[id]; if (!p) return;
        stack.appendChild(avatar(p, D.people.indexOf(p)));
        names.push(p.name);
      });
      leads.appendChild(stack);
      leads.appendChild(el("span", null, "Led by " + esc(names.join(" & "))));
      body.appendChild(leads);
      card.appendChild(body);
      wrap.appendChild(card);
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
        var img = new Image(); img.src = p.img; img.alt = "Figure from " + p.short; img.loading = "lazy"; img.decoding = "async";
        cover.appendChild(img);
      } else {
        var cv = el("canvas"); cv.setAttribute("aria-hidden", "true"); cv.dataset.seed = p.seed || i;
        cover.appendChild(cv);
        cover.appendChild(el("span", "gen-title", esc(p.short)));
        cover.style.background = "#0b1230";
      }
      cover.appendChild(el("span", "badge", esc(p.venue)));
      c.appendChild(cover);
      var b = el("div", "body");
      b.appendChild(el("h3", null, esc(p.title)));
      b.appendChild(el("p", "authors", highlightAuthors(p.authors)));
      var pl = el("div", "plinks");
      Object.keys(p.links || {}).forEach(function (k) {
        var a = el("a", "chip", esc(k === "page" ? "Author page" : k.charAt(0).toUpperCase() + k.slice(1)));
        if (k === "arXiv") a.textContent = "arXiv";
        a.href = p.links[k]; a.target = "_blank"; a.rel = "noopener";
        a.setAttribute("aria-label", a.textContent + ": " + p.short);
        pl.appendChild(a);
      });
      b.appendChild(pl);
      c.appendChild(b);
      track.appendChild(c);
    });
    var step = function (dir) { var card = track.querySelector(".paper"); var w = card ? card.getBoundingClientRect().width + 18 : 360; track.scrollBy({ left: dir * w * 2, behavior: reduceMotion ? "auto" : "smooth" }); };
    $("#workPrev").addEventListener("click", function () { step(-1); });
    $("#workNext").addEventListener("click", function () { step(1); });
  }

  function renderVenues() {
    var t = $("#venueTrack");
    var html = D.venues.map(function (v) { return "<span>" + esc(v) + "</span>"; }).join("");
    t.innerHTML = html + html.replace(/<span>/g, '<span aria-hidden="true">');
  }

  function renderPlan() {
    var a = $("#activities");
    D.activities.forEach(function (x, i) {
      var d = el("div", "act reveal");
      d.style.transitionDelay = (i % 2) * 70 + "ms";
      d.innerHTML = '<span class="ico" aria-hidden="true">' + (ICON[x.icon] || "") + '</span><span><b>' + esc(x.title) + '</b><small>' + esc(x.owner) + '</small></span>';
      a.appendChild(d);
    });
    var r = $("#roadmap");
    D.roadmap.forEach(function (x) {
      var li = el("li"); li.innerHTML = '<div class="when">' + esc(x.when) + '</div><p>' + esc(x.what) + '</p>'; r.appendChild(li);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Nav, reveal, counters                                              */
  /* ------------------------------------------------------------------ */
  function setupNav() {
    var nav = $("#nav"), btn = $("#navToggle"), ul = $("#navLinks");
    var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 30); };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
    btn.addEventListener("click", function () {
      var open = ul.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    ul.addEventListener("click", function (e) { if (e.target.tagName === "A") { ul.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); btn.setAttribute("aria-label", "Open menu"); } });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && ul.classList.contains("open")) { ul.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); btn.focus(); } });
    // active section highlight
    var links = Array.prototype.slice.call(ul.querySelectorAll('a[href^="#"]'));
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) links.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id && !a.classList.contains("nav-cta")); });
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      ["research", "people", "work", "plan", "join"].forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
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

  function setupCounters() {
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    var nums = document.querySelectorAll("[data-count]");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var e = en.target, target = +e.dataset.count, t0 = performance.now();
        (function tick(t) { var k = Math.min(1, (t - t0) / 1100); e.textContent = Math.round(target * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(tick); })(t0);
        io.unobserve(e);
      });
    }, { threshold: 0.6 });
    nums.forEach(function (n) { n.textContent = "0"; io.observe(n); });
  }

  /* ------------------------------------------------------------------ */
  /* Canvas helpers                                                     */
  /* ------------------------------------------------------------------ */
  function fitCanvas(cv) {
    var r = cv.getBoundingClientRect();
    var w = Math.max(1, Math.round(r.width * DPR)), h = Math.max(1, Math.round(r.height * DPR));
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
    return { w: r.width, h: r.height };
  }
  function rng(seed) { var s = seed >>> 0 || 1; return function () { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) % 100000) / 100000; }; }
  function lerpColor(a, b, t) {
    var pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
    var r = (pa >> 16) + ((pb >> 16) - (pa >> 16)) * t, g = ((pa >> 8) & 255) + (((pb >> 8) & 255) - ((pa >> 8) & 255)) * t, bl = (pa & 255) + ((pb & 255) - (pa & 255)) * t;
    return "rgb(" + (r | 0) + "," + (g | 0) + "," + (bl | 0) + ")";
  }
  function grad3(t) { return t < 0.5 ? lerpColor("#22c3b5", "#3d8bff", t * 2) : lerpColor("#3d8bff", "#9a5cff", (t - 0.5) * 2); }

  // Runs a draw loop only while the canvas is on screen.
  function animateWhenVisible(cv, draw) {
    var running = false, raf = 0, t0 = performance.now();
    var loop = function (t) { draw((t - t0) / 1000); if (running) raf = requestAnimationFrame(loop); };
    if (reduceMotion) { draw(2.5); window.addEventListener("resize", function () { draw(2.5); }); return; }
    if (!("IntersectionObserver" in window)) { running = true; raf = requestAnimationFrame(loop); return; }
    new IntersectionObserver(function (en) {
      var vis = en[0].isIntersecting;
      if (vis && !running) { running = true; raf = requestAnimationFrame(loop); }
      else if (!vis && running) { running = false; cancelAnimationFrame(raf); }
    }, { rootMargin: "100px" }).observe(cv);
    document.addEventListener("visibilitychange", function () {
      if (document.hidden && running) { running = false; cancelAnimationFrame(raf); }
    });
  }

  /* ------------------------------------------------------------------ */
  /* HERO: morphing 3D point cloud (cube → sphere → torus → trefoil)     */
  /* ------------------------------------------------------------------ */
  function hero() {
    var cv = $("#heroCanvas"); if (!cv) return;
    var ctx = cv.getContext("2d");
    var small = window.innerWidth < 760;
    var N = small ? 340 : 620, K = 2;
    var label = $("#shapeName");
    var R = rng(42);

    function cube() {
      var p = []; for (var i = 0; i < N; i++) {
        var f = (R() * 6) | 0, a = R() * 2 - 1, b = R() * 2 - 1, s = 0.95;
        if (i % 4 === 0) { // bias some points onto cube edges for crisp structure
          var e = (R() * 12) | 0, t = R() * 2 - 1, sx = e & 1 ? 1 : -1, sy = e & 2 ? 1 : -1, ax = (e >> 2) % 3;
          p.push(ax === 0 ? [t * s, sx * s, sy * s] : ax === 1 ? [sx * s, t * s, sy * s] : [sx * s, sy * s, t * s]); continue;
        }
        var v = [a * s, b * s, (f & 1 ? 1 : -1) * s];
        p.push(f < 2 ? v : f < 4 ? [v[2], v[0], v[1]] : [v[1], v[2], v[0]]);
      } return p;
    }
    function sphere() {
      var p = [], g = Math.PI * (3 - Math.sqrt(5)); for (var i = 0; i < N; i++) {
        var y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = g * i; p.push([Math.cos(th) * r * 1.15, y * 1.15, Math.sin(th) * r * 1.15]);
      } return p;
    }
    function torus() {
      var p = []; for (var i = 0; i < N; i++) {
        var u = (i / N) * Math.PI * 2 * 1, v = (i * 0.618034 % 1) * Math.PI * 2, Rr = 1.0, rr = 0.42;
        u = R() * Math.PI * 2; v = R() * Math.PI * 2;
        p.push([(Rr + rr * Math.cos(v)) * Math.cos(u), rr * Math.sin(v), (Rr + rr * Math.cos(v)) * Math.sin(u)]);
      } return p;
    }
    function trefoil() {
      var p = []; for (var i = 0; i < N; i++) {
        var t = (i / N) * Math.PI * 2, x = Math.sin(t) + 2 * Math.sin(2 * t), y = Math.cos(t) - 2 * Math.cos(2 * t), z = -Math.sin(3 * t);
        var a = R() * Math.PI * 2, rr = 0.28;
        p.push([x * 0.42 + Math.cos(a) * rr * 0.5, y * 0.42 + Math.sin(a) * rr * 0.5, z * 0.42 + Math.cos(a + 1) * rr * 0.4]);
      } return p;
    }
    var shapes = [cube(), sphere(), torus(), trefoil()];
    var names = ["cube", "sphere", "torus", "trefoil knot"];
    // shuffle point correspondence for organic morphs
    shapes.forEach(function (s, k) { if (k) for (var i = s.length - 1; i > 0; i--) { var j = (R() * (i + 1)) | 0, tmp = s[i]; s[i] = s[j]; s[j] = tmp; } });
    // nearest neighbours per shape
    var nbrs = shapes.map(function (s) {
      var out = new Int16Array(N * K);
      for (var i = 0; i < N; i++) {
        var best = [1e9, 1e9], bi = [i, i];
        for (var j = 0; j < N; j++) { if (i === j) continue;
          var dx = s[i][0] - s[j][0], dy = s[i][1] - s[j][1], dz = s[i][2] - s[j][2], d = dx * dx + dy * dy + dz * dz;
          if (d < best[0]) { best[1] = best[0]; bi[1] = bi[0]; best[0] = d; bi[0] = j; } else if (d < best[1]) { best[1] = d; bi[1] = j; }
        }
        out[i * K] = bi[0]; out[i * K + 1] = bi[1];
      } return out;
    });
    var cur = shapes[0].map(function (v) { return v.slice(); });
    var pulses = []; for (var q = 0; q < 26; q++) pulses.push({ i: (R() * N) | 0, k: 0, t: R() });
    var mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    window.addEventListener("pointermove", function (e) { mouse.tx = (e.clientX / window.innerWidth - 0.5); mouse.ty = (e.clientY / window.innerHeight - 0.5); }, { passive: true });

    var HOLD = 4.2, MORPH = 2.2, CYCLE = HOLD + MORPH;
    var proj = new Float32Array(N * 3);
    var lastIdx = -1;

    function draw(time) {
      var sz = fitCanvas(cv), W = sz.w, H = sz.h;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.clearRect(0, 0, W, H);
      var phase = time % (CYCLE * shapes.length), idx = Math.floor(phase / CYCLE), local = phase - idx * CYCLE;
      var a = shapes[idx], b = shapes[(idx + 1) % shapes.length];
      var m = local < HOLD ? 0 : (local - HOLD) / MORPH; m = m * m * (3 - 2 * m);
      var showIdx = m > 0.5 ? (idx + 1) % shapes.length : idx;
      if (showIdx !== lastIdx && label) { label.textContent = names[showIdx]; lastIdx = showIdx; }
      for (var i = 0; i < N; i++) for (var c = 0; c < 3; c++) cur[i][c] = a[i][c] + (b[i][c] - a[i][c]) * m;
      mouse.x += (mouse.tx - mouse.x) * 0.05; mouse.y += (mouse.ty - mouse.y) * 0.05;
      var ry = time * 0.25 + mouse.x * 0.9, rx = -0.35 + mouse.y * 0.6 + Math.sin(time * 0.3) * 0.08;
      var cy = Math.cos(ry), sy = Math.sin(ry), cx = Math.cos(rx), sx = Math.sin(rx);
      var narrow = W < 760;
      var scale = Math.min(W, H) * (narrow ? 0.30 : 0.27), ox = narrow ? W * 0.5 : W * 0.7, oy = narrow ? H * 0.32 : H * 0.5;
      for (i = 0; i < N; i++) {
        var p = cur[i], x = p[0] * cy - p[2] * sy, z = p[0] * sy + p[2] * cy, y = p[1] * cx - z * sx; z = p[1] * sx + z * cx;
        var f = 3.2 / (3.2 + z); proj[i * 3] = ox + x * scale * f; proj[i * 3 + 1] = oy + y * scale * f; proj[i * 3 + 2] = z;
      }
      var nb = m > 0.5 ? nbrs[(idx + 1) % shapes.length] : nbrs[idx];
      var edgeAlpha = 0.28 * (1 - Math.sin(m * Math.PI) * 0.75);
      ctx.lineWidth = 1;
      ctx.globalCompositeOperation = "lighter";
      for (i = 0; i < N; i++) {
        for (var k = 0; k < K; k++) {
          var j = nb[i * K + k];
          var depth = (proj[i * 3 + 2] + 1.3) / 2.6;
          ctx.strokeStyle = "rgba(110,160,255," + (edgeAlpha * (1 - depth * 0.7)).toFixed(3) + ")";
          ctx.beginPath(); ctx.moveTo(proj[i * 3], proj[i * 3 + 1]); ctx.lineTo(proj[j * 3], proj[j * 3 + 1]); ctx.stroke();
        }
      }
      for (i = 0; i < N; i++) {
        var dpt = Math.max(0, Math.min(1, (proj[i * 3 + 2] + 1.3) / 2.6));
        var r = (narrow ? 1.5 : 1.9) * (1.35 - dpt * 0.75);
        var hue = (i / N + time * 0.02) % 1;
        ctx.fillStyle = grad3(hue < 0.5 ? hue * 2 : 2 - hue * 2);
        ctx.globalAlpha = 0.95 - dpt * 0.6;
        ctx.beginPath(); ctx.arc(proj[i * 3], proj[i * 3 + 1], r, 0, 6.283); ctx.fill();
      }
      // message-passing pulses travelling along graph edges
      ctx.globalAlpha = 1;
      for (var q2 = 0; q2 < pulses.length; q2++) {
        var pu = pulses[q2]; pu.t += 0.035;
        if (pu.t >= 1) { pu.i = nb[pu.i * K + pu.k]; pu.k = (R() * K) | 0; pu.t = 0; }
        var from = pu.i, to = nb[from * K + pu.k];
        var px = proj[from * 3] + (proj[to * 3] - proj[from * 3]) * pu.t, py = proj[from * 3 + 1] + (proj[to * 3 + 1] - proj[from * 3 + 1]) * pu.t;
        var g = ctx.createRadialGradient(px, py, 0, px, py, 9);
        g.addColorStop(0, "rgba(160,255,245,.95)"); g.addColorStop(1, "rgba(34,195,181,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px, py, 9, 0, 6.283); ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over"; ctx.globalAlpha = 1;
    }
    animateWhenVisible(cv, draw);
  }

  /* ------------------------------------------------------------------ */
  /* Topic scenes                                                       */
  /* ------------------------------------------------------------------ */
  var SCENES = {
    // World model: an agent moving through a field, imagining futures.
    world: function (ctx, W, H, t, col) {
      ctx.fillStyle = "#0b1230"; ctx.fillRect(0, 0, W, H);
      // perspective grid
      ctx.strokeStyle = "rgba(61,139,255,.16)"; ctx.lineWidth = 1;
      var hz = H * 0.28;
      for (var i = -12; i <= 12; i++) { ctx.beginPath(); ctx.moveTo(W / 2 + i * 18, hz); ctx.lineTo(W / 2 + i * W * 0.16, H); ctx.stroke(); }
      for (var j = 0; j < 14; j++) { var yy = hz + Math.pow(((j + (t * 0.6) % 1) / 14), 2) * (H - hz); ctx.beginPath(); ctx.moveTo(0, yy); ctx.lineTo(W, yy); ctx.stroke(); }
      var path = function (s) { return [W * 0.42 + Math.sin(s * 0.9) * W * 0.2 + Math.sin(s * 2.1) * W * 0.04, H * 0.66 + Math.cos(s * 0.7) * H * 0.12]; };
      // past trail
      ctx.lineWidth = 3; ctx.lineCap = "round";
      for (var k = 0; k < 40; k++) { var p0 = path(t - k * 0.04), p1 = path(t - (k + 1) * 0.04); ctx.strokeStyle = "rgba(34,195,181," + (0.9 - k / 44) + ")"; ctx.beginPath(); ctx.moveTo(p0[0], p0[1]); ctx.lineTo(p1[0], p1[1]); ctx.stroke(); }
      // imagined rollouts
      var cur = path(t), dir = path(t + 0.05);
      var ang = Math.atan2(dir[1] - cur[1], dir[0] - cur[0]);
      for (var r = 0; r < 7; r++) {
        var a = ang + (r - 3) * 0.28, x = cur[0], y = cur[1];
        ctx.setLineDash([4, 6]); ctx.lineWidth = 1.6;
        ctx.strokeStyle = r === 3 ? "rgba(255,255,255,.85)" : "rgba(154,120,255,.55)";
        ctx.beginPath(); ctx.moveTo(x, y);
        for (var s = 1; s <= 12; s++) { a += Math.sin(t * 1.3 + r * 1.7 + s * 0.4) * 0.08; x += Math.cos(a) * 11; y += Math.sin(a) * 11; ctx.lineTo(x, y); }
        ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = r === 3 ? "#fff" : "rgba(177,77,255,.8)"; ctx.beginPath(); ctx.arc(x, y, r === 3 ? 4 : 2.6, 0, 6.283); ctx.fill();
      }
      // imagined frames
      for (var f = 0; f < 3; f++) {
        var fx = W - 30 - (3 - f) * 64, fy = 26, fw = 54, fh = 40;
        ctx.strokeStyle = "rgba(255,255,255," + (0.25 + f * 0.2) + ")"; ctx.strokeRect(fx, fy, fw, fh);
        ctx.fillStyle = "rgba(34,195,181," + (0.15 + f * 0.1) + ")";
        var bx = fx + 8 + ((t * 20 + f * 12) % (fw - 20)); ctx.fillRect(bx, fy + fh - 16, 10, 10);
        ctx.fillStyle = "rgba(255,255,255,.5)"; ctx.font = "10px ui-monospace,monospace"; ctx.fillText("t+" + (f + 1), fx, fy + fh + 13);
      }
      // agent
      var g = ctx.createRadialGradient(cur[0], cur[1], 0, cur[0], cur[1], 26); g.addColorStop(0, "rgba(34,195,181,.65)"); g.addColorStop(1, "rgba(34,195,181,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cur[0], cur[1], 26, 0, 6.283); ctx.fill();
      ctx.fillStyle = "#22c3b5"; ctx.beginPath(); ctx.arc(cur[0], cur[1], 7, 0, 6.283); ctx.fill();
    },

    // Language → action: tokens stream into a robot arm reaching for a cube.
    action: function (ctx, W, H, t) {
      ctx.fillStyle = "#0b1230"; ctx.fillRect(0, 0, W, H);
      var words = ["pick", "up", "the", "blue", "cube"];
      ctx.font = "600 12px Inter, sans-serif";
      for (var i = 0; i < words.length; i++) {
        var span = words.length * 76, x = ((t * 40 + i * 76) % span) - 50, y = H * 0.2 + Math.sin(t + i) * 5;
        var w = ctx.measureText(words[i]).width + 16, alpha = Math.min(1, Math.max(0, (span - 110 - x) / 60), Math.max(0, (x + 50) / 40));
        ctx.globalAlpha = alpha;
        ctx.fillStyle = "rgba(61,139,255,.22)"; ctx.strokeStyle = "rgba(61,139,255,.8)";
        roundRect(ctx, x, y - 12, w, 22, 11); ctx.fill(); ctx.stroke();
        ctx.fillStyle = "#cfe0ff"; ctx.fillText(words[i], x + 8, y + 3);
      }
      ctx.globalAlpha = 1;
      // arm
      var bx = W * 0.72, by = H * 0.84;
      var target = [W * 0.42 + Math.sin(t * 0.8) * W * 0.12, H * 0.72];
      var a1 = -1.9 + Math.sin(t * 0.8) * 0.35, a2 = 1.2 + Math.cos(t * 1.1) * 0.25, a3 = 0.9 + Math.sin(t * 1.6) * 0.3;
      var L1 = H * 0.32, L2 = H * 0.26, L3 = H * 0.12;
      var j1 = [bx + Math.cos(a1) * L1, by + Math.sin(a1) * L1];
      var j2 = [j1[0] + Math.cos(a1 + a2) * L2, j1[1] + Math.sin(a1 + a2) * L2];
      var j3 = [j2[0] + Math.cos(a1 + a2 + a3) * L3, j2[1] + Math.sin(a1 + a2 + a3) * L3];
      ctx.fillStyle = "rgba(255,255,255,.1)"; ctx.fillRect(bx - 34, by, 68, 10);
      ctx.lineCap = "round";
      [[bx, by, j1, 12], [j1[0], j1[1], j2, 9], [j2[0], j2[1], j3, 6]].forEach(function (s, k) {
        var gr = ctx.createLinearGradient(s[0], s[1], s[2][0], s[2][1]); gr.addColorStop(0, "#3d8bff"); gr.addColorStop(1, k === 2 ? "#22c3b5" : "#7b5cff");
        ctx.strokeStyle = gr; ctx.lineWidth = s[3]; ctx.beginPath(); ctx.moveTo(s[0], s[1]); ctx.lineTo(s[2][0], s[2][1]); ctx.stroke();
      });
      [[bx, by], j1, j2].forEach(function (j) { ctx.fillStyle = "#e9edff"; ctx.beginPath(); ctx.arc(j[0], j[1], 5, 0, 6.283); ctx.fill(); });
      // cube target
      ctx.save(); ctx.translate(target[0], target[1]); ctx.rotate(Math.sin(t) * 0.1);
      ctx.fillStyle = "rgba(61,139,255,.85)"; ctx.fillRect(-14, -14, 28, 28); ctx.strokeStyle = "#9cc3ff"; ctx.strokeRect(-14, -14, 28, 28); ctx.restore();
      // action tokens trail from text to gripper
      ctx.setLineDash([3, 5]); ctx.strokeStyle = "rgba(34,195,181,.55)"; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(W * 0.55, H * 0.2); ctx.quadraticCurveTo(W * 0.75, H * 0.1, j3[0], j3[1]); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = "#22c3b5"; ctx.beginPath(); ctx.arc(j3[0], j3[1], 4.5, 0, 6.283); ctx.fill();
    },

    // MLLM: image patches become tokens alongside text, with attention arcs.
    mllm: function (ctx, W, H, t) {
      ctx.fillStyle = "#0b1230"; ctx.fillRect(0, 0, W, H);
      var n = 4, cell = H * 0.1, gx = W * 0.06, gy = H * 0.08;
      var tok = Math.max(10, H * 0.085), seqX0 = W * 0.06, seqY = H * 0.62;
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
      ctx.font = "600 " + Math.round(tok * 0.62) + "px Inter, sans-serif";
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
    }
  };

  function roundRect(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }

  function topicScenes() {
    // Each scene is drawn in the upper band of its tile so the title text below stays clear.
    var BAND = { world: 0.66, action: 0.54, mllm: 0.54, unified: 0.54, foundation: 0.54 };
    document.querySelectorAll(".topic canvas").forEach(function (cv) {
      var ctx = cv.getContext("2d"), fn = SCENES[cv.dataset.scene]; if (!fn) return;
      animateWhenVisible(cv, function (t) {
        var s = fitCanvas(cv); ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
        ctx.fillStyle = "#0b1230"; ctx.fillRect(0, 0, s.w, s.h);
        var bh = s.h * (BAND[cv.dataset.scene] || 0.6);
        ctx.save(); ctx.beginPath(); ctx.rect(0, 0, s.w, bh); ctx.clip();
        fn(ctx, s.w, bh, t, cv.dataset.color);
        ctx.restore();
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Generated paper covers (static flow-field art, seeded)              */
  /* ------------------------------------------------------------------ */
  function covers() {
    var palettes = [["#22c3b5", "#3d8bff"], ["#3d8bff", "#b14dff"], ["#7b5cff", "#22c3b5"], ["#16a3c9", "#7b5cff"]];
    document.querySelectorAll(".paper canvas").forEach(function (cv) {
      var seed = +cv.dataset.seed || 1;
      var paint = function () {
        var s = fitCanvas(cv), W = s.w, H = s.h; if (W < 10) return;
        var ctx = cv.getContext("2d"); ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
        var R = rng(seed * 9973), pal = palettes[seed % palettes.length];
        var bg = ctx.createLinearGradient(0, 0, W, H); bg.addColorStop(0, "#0a1130"); bg.addColorStop(1, "#141c44");
        ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
        var f1 = 0.004 + R() * 0.006, f2 = 0.004 + R() * 0.006, ph = R() * 10;
        ctx.globalCompositeOperation = "lighter"; ctx.lineWidth = 1;
        for (var i = 0; i < 260; i++) {
          var x = R() * W, y = R() * H, col = lerpColor(pal[0], pal[1], x / W);
          ctx.strokeStyle = col; ctx.globalAlpha = 0.18 + R() * 0.25; ctx.beginPath(); ctx.moveTo(x, y);
          for (var k = 0; k < 40; k++) { var a = Math.sin(x * f1 + ph) * 2.2 + Math.cos(y * f2 - ph) * 2.2; x += Math.cos(a) * 3; y += Math.sin(a) * 3; ctx.lineTo(x, y); }
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
        for (var j = 0; j < 22; j++) { ctx.fillStyle = lerpColor(pal[0], pal[1], R()); ctx.beginPath(); ctx.arc(R() * W, R() * H, 1 + R() * 2.5, 0, 6.283); ctx.fill(); }
        ctx.globalCompositeOperation = "source-over";
        var shade = ctx.createLinearGradient(0, H * 0.4, 0, H); shade.addColorStop(0, "rgba(6,10,24,0)"); shade.addColorStop(1, "rgba(6,10,24,.75)");
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
    for (var i = 0; i < 70; i++) P.push({ x: R(), y: R(), vx: (R() - 0.5) * 0.0006, vy: (R() - 0.5) * 0.0006 });
    animateWhenVisible(cv, function () {
      var s = fitCanvas(cv), W = s.w, H = s.h; ctx.setTransform(DPR, 0, 0, DPR, 0, 0); ctx.clearRect(0, 0, W, H);
      P.forEach(function (p) { p.x = (p.x + p.vx + 1) % 1; p.y = (p.y + p.vy + 1) % 1; });
      for (var i = 0; i < P.length; i++) for (var j = i + 1; j < P.length; j++) {
        var dx = (P[i].x - P[j].x) * W, dy = (P[i].y - P[j].y) * H, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 130) { ctx.strokeStyle = "rgba(110,160,255," + (0.22 * (1 - d / 130)) + ")"; ctx.beginPath(); ctx.moveTo(P[i].x * W, P[i].y * H); ctx.lineTo(P[j].x * W, P[j].y * H); ctx.stroke(); }
      }
      P.forEach(function (p, k) { ctx.fillStyle = k % 3 ? "rgba(34,195,181,.8)" : "rgba(177,77,255,.8)"; ctx.beginPath(); ctx.arc(p.x * W, p.y * H, 1.8, 0, 6.283); ctx.fill(); });
    });
  }

  /* ------------------------------------------------------------------ */
  renderTopics(); renderPeople(); renderWork(); renderVenues(); renderPlan();
  setupNav(); setupReveal(); setupCounters();
  hero(); topicScenes(); covers(); joinBg();
  var y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear();
})();

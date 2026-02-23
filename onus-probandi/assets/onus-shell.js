(function () {
  "use strict";

  var BASE = "/onus-probandi/";

  function fallbackHeaderHtml() {
    return (
      '<header class="onus-header">' +
        '<div class="wrap">' +
          '<a class="brand" href="index.html" aria-label="Onus Probandi Overview">' +
            '<img src="/assets/logo.png" alt="Onus Probandi" width="180" height="60" loading="eager" decoding="async" />' +
          '</a>' +
          '<nav class="onus-nav" aria-label="Onus Probandi navigation">' +
            '<a href="index.html" data-nav="overview">Overview</a>' +
            '<a href="concept.html" data-nav="concept">Concept</a>' +
            '<a href="actors.html" data-nav="actors">Actors</a>' +
            '<a href="crew.html" data-nav="crew">Crew Bio</a>' +
            '<a href="involvers.html" data-nav="involvers">Involvers</a>' +
            '<a href="signup.html" data-nav="signup">Signup/Contact</a>' +
          '</nav>' +
        '</div>' +
      '</header>'
    );
  }

  function fallbackFooterHtml() {
    return (
      '<footer class="onus-footer">' +
        '<div class="wrap">' +
          '<div class="foot-left"><small>© <span id="yearNow"></span> Webstreamedia — Onus Probandi</small></div>' +
          '<div class="foot-right"><a href="../index.html">Webstreamedia Home</a> <span aria-hidden="true">•</span> <a href="../news.html">News</a></div>' +
        '</div>' +
      '</footer>'
    );
  }

  function setYear() {
    var y = document.getElementById("yearNow");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  function markActiveNav() {
    var path = (location.pathname || "").toLowerCase();
    var file = path.split("/").pop() || "index.html";

    var key =
      file === "index.html" ? "overview" :
      file === "concept.html" ? "concept" :
      file === "actors.html" ? "actors" :
      file === "crew.html" ? "crew" :
      file === "involvers.html" ? "involvers" :
      file === "signup.html" ? "signup" :
      "";

    if (!key) return;

    var links = document.querySelectorAll(".onus-nav a[data-nav]");
    for (var i = 0; i < links.length; i++) {
      if (links[i].getAttribute("data-nav") === key) {
        links[i].setAttribute("aria-current", "page");
        links[i].classList.add("is-active");
      }
    }
  }

  function inject(id, url, after, fallbackHtml) {
    var el = document.getElementById(id);
    if (!el) return Promise.resolve();

    var u = url + "?v=" + Date.now();

    return fetch(u, { cache: "no-store" })
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status + " for " + url);
        return r.text();
      })
      .then(function (html) {
        el.innerHTML = html;
        if (typeof after === "function") after();
      })
      .catch(function (err) {
        console.warn("[onus-shell] Inject failed for", url, err);
        // Fallback so you ALWAYS get a header/footer even if partial fetch fails
        el.innerHTML = fallbackHtml();
        if (typeof after === "function") after();
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    inject("siteHeader", BASE + "partials/header.html", markActiveNav, fallbackHeaderHtml);
    inject("siteFooter", BASE + "partials/footer.html", setYear, fallbackFooterHtml);
  });
})();

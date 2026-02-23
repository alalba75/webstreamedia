(function () {
  "use strict";

  function setYear() {
    var y = document.getElementById("yearNow");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  function markActiveNav() {
    // Map file name -> nav key
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

    var links = document.querySelectorAll('.onus-nav a[data-nav]');
    for (var i = 0; i < links.length; i++) {
      if (links[i].getAttribute("data-nav") === key) {
        links[i].setAttribute("aria-current", "page");
        links[i].classList.add("is-active");
      }
    }
  }

  function inject(id, url, after) {
    var el = document.getElementById(id);
    if (!el) return Promise.resolve();

    return fetch(url, { cache: "force-cache" })
      .then(function (r) { return r.ok ? r.text() : ""; })
      .then(function (html) {
        if (!html) return;
        el.innerHTML = html;
        if (typeof after === "function") after();
      })
      .catch(function () { /* keep pages usable even if partial fails */ });
  }

  document.addEventListener("DOMContentLoaded", function () {
    inject("siteHeader", "partials/header.html", markActiveNav);
    inject("siteFooter", "partials/footer.html", setYear);
  });
})();


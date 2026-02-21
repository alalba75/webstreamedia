/* Webstreamedia - shared partial loader (footer) */

(function () {
  function setYear() {
    var y = document.getElementById("year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  function loadPartial(targetId, url, callback) {
    var el = document.getElementById(targetId);
    if (!el) return;

    fetch(url, { cache: "no-cache" })
      .then(function (r) {
        if (!r.ok) throw new Error("Failed to load " + url + " (" + r.status + ")");
        return r.text();
      })
      .then(function (html) {
        el.innerHTML = html;
        if (callback) callback();
      })
      .catch(function (err) {
        // Fail quietly but leave a breadcrumb for debugging
        console.error(err);
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    loadPartial("site-footer", "partials/footer.html", setYear);
  });
})();
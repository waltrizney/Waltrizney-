(() => {
  "use strict";

  const originalUrl = "https://raw.githubusercontent.com/waltrizney/Waltrizney-/4fdb42dfed96672fea838f52294fb0697683c7c2/whack-a-track.js";

  fetch(originalUrl)
    .then(response => {
      if (!response.ok) throw new Error(`Unable to load the game: ${response.status}`);
      return response.text();
    })
    .then(source => {
      let patched = source;

      // Make both meters compact, and give each one a clear label.
      patched = patched.replace(
        ".wat-timer{margin:4px 0 8px;color:var(--bright-purple);font-weight:bold}",
        ".wat-timer{margin:4px 0 8px;color:var(--bright-purple);font-weight:bold}.wat-meter{width:min(100%,360px);margin:3px auto 6px;text-align:left}.wat-meter-label{display:block;margin-bottom:2px;color:var(--bright-gold);font-size:.68rem;font-weight:bold;letter-spacing:.06em}.wat-health,.wat-time{height:10px;width:100%;margin:0;border-width:1px}.wat-time-fill{height:100%;width:100%;background:linear-gradient(90deg,#7b4de8,#d98cff);transition:width .15s linear}.wat-health-fill{height:100%}.wat-playing #whack-a-track-game{position:absolute;max-height:none;overflow:visible}",
      );

      patched = patched.replace(
        "<div class=\"wat-health\"><div class=\"wat-health-fill\"></div></div><div class=\"wat-time\"><div class=\"wat-time-fill\"></div></div><p class=\"wat-timer\"></p>",
        "<div class=\"wat-meter\"><span class=\"wat-meter-label\">MOLE HEALTH</span><div class=\"wat-health\"><div class=\"wat-health-fill\"></div></div></div><div class=\"wat-meter\"><span class=\"wat-meter-label\">TIME REMAINING</span><div class=\"wat-time\"><div class=\"wat-time-fill\"></div></div></div><p class=\"wat-timer\"></p>"
      );

      // Place the game in the document flow below the controls and scroll to it
      // when opened, so the header does not cover the board on smaller screens.
      patched = patched.replace(
        "game.panel.hidden = false; health = 6; seconds = 60; whacks = 0; active = true;",
        "game.panel.hidden = false; document.body.classList.add(\"wat-playing\"); const toolbarBottom = controls()?.getBoundingClientRect().bottom || 0; game.panel.style.top = `${window.scrollY + toolbarBottom + 8}px`; requestAnimationFrame(() => game.panel.scrollIntoView({ behavior: \"smooth\", block: \"start\" })); health = 6; seconds = 60; whacks = 0; active = true;"
      );

      patched = patched.replace(
        "function closeGame() { active = false;",
        "function closeGame() { document.body.classList.remove(\"wat-playing\"); active = false;"
      );

      (0, eval)(patched);
    })
    .catch(error => console.error("Whack-a-track could not start:", error));
})();

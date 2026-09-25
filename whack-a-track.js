(() => {
  "use strict";

  // Keep the existing game/site implementation intact, then apply the game-rule
  // changes below. The pinned URL prevents this patch from loading itself.
  const originalUrl = "https://raw.githubusercontent.com/waltrizney/Waltrizney-/4fdb42dfed96672fea838f52294fb0697683c7c2/whack-a-track.js";

  fetch(originalUrl)
    .then(response => {
      if (!response.ok) throw new Error(`Unable to load the game: ${response.status}`);
      return response.text();
    })
    .then(source => {
      let patched = source;

      // The health bar remains the six-hit penalty bar. Add a separate 60-second
      // countdown bar and a visible 20-mole progress counter.
      patched = patched.replace(
        ".wat-timer{margin:4px 0 8px;color:var(--bright-purple);font-weight:bold}",
        ".wat-timer{margin:4px 0 8px;color:var(--bright-purple);font-weight:bold}.wat-time{height:18px;width:min(100%,460px);margin:4px auto 8px;border:2px solid var(--gold);border-radius:999px;background:#000;overflow:hidden}.wat-time-fill{height:100%;width:100%;background:linear-gradient(90deg,#7b4de8,#d98cff);transition:width .15s linear}"
      );

      patched = patched.replace(
        "let game = null, active = false, health = 6, seconds = 60, moleTimer = null, gameTimer = null;",
        "let game = null, active = false, health = 6, seconds = 60, whacks = 0, moleTimer = null, gameTimer = null;"
      );

      patched = patched.replace(
        "function updateTimer() { if (game) game.timer.textContent = `Time: ${seconds}s`; }",
        "function updateTimer() { if (!game) return; game.timeFill.style.width = `${Math.max(0, seconds) / 60 * 100}%`; game.timer.textContent = `Moles whacked: ${whacks}/20`; }"
      );

      patched = patched.replace(
        "function whack(hole) { if (!active || hole.dataset.active !== \"true\") return; hole.dataset.active = \"false\"; hole.textContent = \"✨\"; health = Math.max(0, health - 1); updateHealth(); if (health === 0) finish(true); }",
        "function whack(hole) { if (!active || hole.dataset.active !== \"true\") return; hole.dataset.active = \"false\"; hole.textContent = \"✨\"; whacks = Math.min(20, whacks + 1); updateTimer(); if (whacks >= 20) finish(true); }"
      );

      patched = patched.replace(
        "<div class=\"wat-health\"><div class=\"wat-health-fill\"></div></div><p class=\"wat-timer\"></p>",
        "<div class=\"wat-health\"><div class=\"wat-health-fill\"></div></div><div class=\"wat-time\"><div class=\"wat-time-fill\"></div></div><p class=\"wat-timer\"></p>"
      );

      patched = patched.replace(
        "const healthFill = $(\".wat-health-fill\", panel), healthText = status, timer = $(\".wat-timer\", panel);",
        "const healthFill = $(\".wat-health-fill\", panel), healthText = status, timer = $(\".wat-timer\", panel), timeFill = $(\".wat-time-fill\", panel);"
      );

      patched = patched.replace(
        "game = { panel, board, status, healthFill, healthText, timer };",
        "game = { panel, board, status, healthFill, healthText, timer, timeFill };"
      );

      patched = patched.replace(
        "health = 6; seconds = 60; active = true; updateHealth(); updateTimer();",
        "health = 6; seconds = 60; whacks = 0; active = true; updateHealth(); updateTimer();"
      );

      patched = patched.replace(
        "game.status.textContent = \"Whack all the moles!\";",
        "game.status.textContent = \"Whack 20 moles to whack the track!\";"
      );

      (0, eval)(patched);
    })
    .catch(error => console.error("Whack-a-track could not start:", error));
})();

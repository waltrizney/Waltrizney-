(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const controls = () => $(".controls");

  let game = null, active = false, health = 6, seconds = 60, whacks = 0, targetWhacks = 20, moleTimer = null, gameTimer = null;

  function addStyles() {
    if ($("#whack-a-track-styles")) return;

    const style = document.createElement("style");
    style.id = "whack-a-track-styles";
    style.textContent = `
      #whack-a-track-game{position:fixed;top:var(--whack-toolbar-bottom,0px);left:50%;transform:translateX(-50%);z-index:99;display:block;width:min(calc(100vw - 16px),620px);max-height:calc(100vh - var(--whack-toolbar-bottom,0px) - 16px);overflow-y:auto;padding:16px;background:#160c1a;border:2px solid var(--gold);border-radius:12px}
      #whack-a-track-game[hidden]{display:none!important}
      #whack-a-track-game h2{margin:0 0 6px;padding:0;border:0;font-size:1rem}
      #wat-status{margin:4px 0;font-size:.85rem}
      .wat-health,.wat-time{height:18px;width:min(100%,460px);margin:0 auto 8px;border:2px solid var(--gold);border-radius:999px;background:#000;overflow:hidden}
      .wat-health-fill{height:100%;width:100%;background:linear-gradient(90deg,#e05252,#f5d76e);transition:width .15s ease}
      .wat-time-fill{height:100%;width:100%;background:linear-gradient(90deg,#7b4de8,#d98cff);transition:width .15s linear}
      .wat-timer{margin:4px 0 8px;color:var(--bright-purple);font-weight:bold}
      .wat-board{display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(2,1fr);gap:10px;width:100%;max-width:500px;margin:8px auto 0;padding:10px;border:2px solid var(--gold);border-radius:10px;background:#090509}
      .wat-hole{min-height:clamp(58px,14vh,106px);padding:6px;font-size:clamp(1.8rem,6vw,2.8rem);line-height:1;border:2px solid var(--gold);border-radius:10px;background:#090509;color:#fff;cursor:pointer;transition:background .1s ease}
      .wat-hole:hover{background:#21102e}
      @media(max-width:500px){.wat-board{gap:6px;padding:7px;margin-top:6px}}
    `;
    document.head.appendChild(style);
  }

  function syncGamePosition() {
    const bar = controls();

    if (bar) {
      document.documentElement.style.setProperty(
        "--whack-toolbar-bottom",
        `${Math.max(0, bar.getBoundingClientRect().bottom)}px`
      );
    }
  }

  function hideMoles() {
    game?.board.querySelectorAll(".wat-hole").forEach(h => {
      h.dataset.active = "false";
      h.textContent = "🕳️";
    });
  }

  function updateHealth() {
    if (!game) return;

    game.healthFill.style.width =
      `${Math.max(0, health) / 6 * 100}%`;

    game.healthText.textContent =
      `Hits remaining: ${health}`;
  }

  function updateTimer() {
    if (!game) return;

    game.timeFill.style.width =
      `${Math.max(0, seconds) / 60 * 100}%`;

    game.timer.textContent =
      `Moles whacked: ${whacks}/${targetWhacks}`;
  }

  function closeGame() {
    active = false;
    clearTimeout(moleTimer);
    clearInterval(gameTimer);
    hideMoles();

    if (game) game.panel.hidden = true;
  }

  function finish(won) {
    active = false;
    clearTimeout(moleTimer);
    clearInterval(gameTimer);
    hideMoles();

    if (!game) return;

    if (won) {
      game.status.textContent = "TRACK COMPLETE!";

      setTimeout(() => {
        closeGame();
        document.querySelector("#next-song")?.click();
      }, 500);

      return;
    }

    game.status.textContent = "Time ran out.";
    setTimeout(closeGame, 700);
  }

  function whack(hole) {
    if (!active || hole.dataset.active !== "true") return;

    hole.dataset.active = "false";
    hole.textContent = "💥";

    whacks = Math.min(
      targetWhacks,
      whacks + 1
    );

    updateTimer();

    if (whacks >= targetWhacks) {
      finish(true);
    }
  }

  function spawnMole() {
    if (!active || !game) return;

    hideMoles();

    const hole =
      [...game.board.children][
        Math.floor(
          Math.random() *
          game.board.children.length
        )
      ];

    if (!hole) return;

    hole.dataset.active = "true";
    hole.textContent = "🐭";

    clearTimeout(moleTimer);

    moleTimer = setTimeout(() => {
      if (
        !active ||
        hole.dataset.active !== "true"
      ) {
        return;
      }

      hole.dataset.active = "false";
      hole.textContent = "🕳️";
    }, 1200);
  }

  function createGame() {
    if (game) return game;

    const panel =
      document.createElement("section");

    panel.id = "whack-a-track-game";
    panel.hidden = true;

    panel.innerHTML = `
      <div class="wat-health">
        <div class="wat-health-fill"></div>
      </div>

      <div class="wat-time">
        <div class="wat-time-fill"></div>
      </div>

      <p class="wat-timer"></p>
      <p id="wat-status"></p>

      <div class="wat-board"></div>
    `;

    const board = $(".wat-board", panel);
    const status = $("#wat-status", panel);
    const healthFill =
      $(".wat-health-fill", panel);
    const healthText = status;
    const timer =
      $(".wat-timer", panel);
    const timeFill =
      $(".wat-time-fill", panel);

    for (let i = 0; i < 6; i++) {
      const hole =
        document.createElement("button");

      hole.type = "button";
      hole.className = "wat-hole";
      hole.dataset.active = "false";
      hole.textContent = "🕳️";

      hole.addEventListener(
        "click",
        () => whack(hole)
      );

      board.appendChild(hole);
    }

    const parent = controls();

    if (parent) {
      parent.insertAdjacentElement(
        "afterend",
        panel
      );
    } else {
      ($("#main") || document.body).prepend(panel);
    }

    game = {
      panel,
      board,
      status,
      healthFill,
      healthText,
      timer,
      timeFill
    };

    return game;
  }

  function toggleGame(event) {
    event.preventDefault();
    event.stopPropagation();

    if (
      active ||
      (game && !game.panel.hidden)
    ) {
      closeGame();
      return;
    }

    game = createGame();
    syncGamePosition();

    game.panel.hidden = false;

    health = 6;
    seconds = 60;
    whacks = 0;
    active = true;

    updateHealth();
    updateTimer();

    game.status.textContent =
      "Whack 20 moles to whack the track!";

    clearInterval(gameTimer);

    gameTimer = setInterval(() => {
      seconds -= 1;
      updateTimer();

      if (seconds <= 0) {
        finish(false);
        return;
      }

      spawnMole();
    }, 1000);

    requestAnimationFrame(() => {
      const isMobile = window.innerWidth <= 500;
      const dock = $(".player-dock");
      if (isMobile && dock) {
        dock.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      } else if (!isMobile) {
        game.panel.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });

    spawnMole();
  }

  function init() {
    addStyles();
    syncGamePosition();

    window.addEventListener("resize", syncGamePosition);

    window.addEventListener(
      "scroll",
      syncGamePosition,
      { passive: true }
    );

    $("#whack-track")?.addEventListener(
      "click",
      toggleGame
    );
  }

  if (
    document.readyState === "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      init,
      { once: true }
    );
  } else {
    init();
  }
})();

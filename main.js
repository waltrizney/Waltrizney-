(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const controls = () => $(".controls");

  const animals = ["aardvark","alligator","anglefish","ant","anteater","armadillo","baboon","badger","bald-eagle","bass","bat","bear","beaver","bee","blob-fish","blue-heron","boar","buffalo","bull-skull","butterfly","camel","capuchin-monkey","capybara","catepillar","chameleon","cheetah","chihuahua","chimpanzee","chupacabra","clam","cow","coyote","crab","cricket","crocodile","crow","deer","desert-fox","dodo","dolphin","donkey","dove","duck","eagle","earthworm","eel","egg","elephant","elk","falcon","flamingo","fly","flying-fox","fox","frog","gazelle","gekko","giraffe","goat","goldfish","goose","gopher","gorilla","grouse","hamster","hawk","headless-horseman","hedgehog","hippo","horse","howler-monkey","hydra","hyena","jellyfish","kangaroo","kiwi","koala","komodo-dragon","labubu","lemming","lemur","leopard","like-an-antelope","lion","lizard","llama","lynx","manatee","mandrill","mantis","martian","medusa","meercat","minx","mole-rat","mole","moose","mountain-lion","mouse","mt-goat","narwhal","octopus","orangutan","ostrich","otter","owl","ox","panda","panther","parrot","peacock","peican","penguin","pig","pirahna","pirate","platypus","polar-bear","porcupine","puma","quokka","rabbit","raccoon","ram","rat","raven","red-panda","rhino","rooster","saber-tooth-tiger","saiga","salmon","sasquatch","satan","scorpion","seagull","seahorse","seal","shark","siamese-twin-turtles","skull-hyena","skull","skunk","sloth","snail","snake","snapping-turtle","spider","squid","squirrel","stork","swan","t-rex","tapir","tazmanian-devil","toad","tortoise","toucan","turkey","unicorn","venus-fly-trap","vulture","walrus","warthog","weasel","werewolf","whale","wildebeest","wolf","wombat","woodpecker","wooly-mammoth","yak","yeti","zebra"];

  const animal = i => animals[i % animals.length];
  const imageFor = i => `assets/animal-icons/${encodeURIComponent(animal(i))}.png`;
  const labelFor = name => name.replace(/\s*\(2\)$/, "").replace(/-/g, " ");

  function addChrome() {
    const top = $(".top-area");

    if (top) {
      top.querySelector("h1")?.remove();
      top.querySelector(".tagline")?.remove();

      if (!$(".rizney-logo", top)) {
        const img = document.createElement("img");
        img.className = "rizney-logo";
        img.src = "assets/rizney.png";
        img.alt = "Rizney";
        top.appendChild(img);
      }

      if (!$(".context-link", top)) {
        const link = document.createElement("a");
        link.className = "context-link";
        link.href = "./context.html";
        link.textContent = "CONTEXT";
        top.appendChild(link);
      }
    }

    if (!$("#rizney-site-adjustments")) {
      const style = document.createElement("style");
      style.id = "rizney-site-adjustments";
      style.textContent = `
        .top-area{min-height:88px!important;padding:14px!important;text-align:center}
        .top-area .donate,.top-area .context-link{top:16px!important;z-index:2;border:1px solid var(--gold);border-radius:999px;padding:5px 9px;color:var(--bright-gold);background:#160c1a;font:inherit;font-size:.68rem;text-decoration:none}
        .top-area .donate{left:10px!important}.top-area .context-link{left:50%!important;transform:translateX(-50%)!important}
        .top-area .rizney-logo{position:absolute;top:10px;right:14px;width:112px;height:112px;object-fit:contain}
        .top-area .donate:hover,.top-area .context-link:hover{background:#55208a}
        .rizney-footer{margin:22px auto 0;padding:5px 0 34px;text-align:center;border-top:1px solid #3b1d50}
        .rizney-footer img{display:block;width:200px;height:auto;max-height:250px;object-fit:contain;margin:0 auto}
        @media(max-width:500px){.top-area{min-height:78px!important;padding:12px 8px 14px!important}.top-area .donate,.top-area .context-link{top:14px!important}.top-area .donate{left:8px!important}.top-area .context-link{left:50%!important}.top-area .rizney-logo{width:88px;height:88px}}
      `;
      document.head.appendChild(style);
    }

    if (!$(".rizney-footer")) {
      const footer = document.createElement("footer");
      footer.className = "rizney-footer";

      const img = document.createElement("img");
      img.src = "assets/curse.png";
      img.alt = "Curse";
      img.loading = "lazy";

      footer.appendChild(img);
      ($("#main") || document.body).appendChild(footer);
    }
  }

  function addStyles() {
    if ($("#rizney-general-styles")) return;

    const style = document.createElement("style");
    style.id = "rizney-general-styles";
    style.textContent = `
      #reading[hidden]{display:none!important}
      #song-list .song{grid-template-columns:38px minmax(0,1fr) 52px}
      #song-list .song .play{grid-column:3;grid-row:1;align-self:stretch;justify-self:end;width:52px;height:52px;min-height:52px;padding:3px;display:grid;place-items:center;overflow:hidden;background:transparent;border:none;cursor:pointer}
      #song-list .song .play img{display:block;width:100%;height:100%;object-fit:contain;pointer-events:none}
      #cards .card{background:#000}.card .symbol{height:96px;display:grid;place-items:center;font-size:0}.card .symbol img{width:96px;height:96px;object-fit:contain;display:block}.card .animal-name{display:block;color:var(--bright-gold);font-size:.85rem;margin-bottom:6px;font-weight:500}
      @media(max-width:500px){#song-list .song{grid-template-columns:30px minmax(0,1fr) 46px}#song-list .song .play{width:46px;height:46px;min-height:46px}}
    `;
    document.head.appendChild(style);
  }

  function syncPlayerHeight() {
    const dock = $(".player-dock");

    if (dock) {
      document.documentElement.style.setProperty(
        "--rizney-player-height",
        `${dock.getBoundingClientRect().height}px`
      );
    }
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

  function paintSongs() {
    document.querySelectorAll("#song-list .song").forEach((row, i) => {
      const button = $("button.play", row);

      if (!button || button.dataset.animalPainted) return;

      const img = document.createElement("img");
      img.src = imageFor(i);
      img.alt = labelFor(animal(i));
      img.title = labelFor(animal(i));
      img.loading = "lazy";

      button.replaceChildren(img);
      button.dataset.animalPainted = "true";
    });
  }

  function paintCards() {
    $("#cards")?.querySelectorAll(".card").forEach((card, i) => {
      const link = $("a", card);
      const match = link?.textContent.match(/Play song\s+(\d+)/i);
      const index = match ? Number(match[1]) - 1 : i;
      const name = labelFor(animal(index));
      const symbol = $(".symbol", card);

      if (symbol && !$("img", symbol)) {
        const img = document.createElement("img");
        img.src = imageFor(index);
        img.alt = name;
        img.title = name;
        img.loading = "lazy";
        symbol.replaceChildren(img);
      }

      if (link && !$(".animal-name", card)) {
        const label = document.createElement("span");
        label.className = "animal-name";
        label.textContent = name;
        link.before(label);
      }
    });
  }

  function init() {
    addChrome();
    addStyles();

    paintSongs();
    paintCards();

    syncPlayerHeight();
    syncGamePosition();

    window.addEventListener("resize", () => {
      syncPlayerHeight();
      syncGamePosition();
    });

    window.addEventListener(
      "scroll",
      syncGamePosition,
      { passive: true }
    );

    const list = $("#song-list");

    if (list) {
      new MutationObserver(() => {
        paintSongs();
        paintCards();
      }).observe(list, {
        childList: true,
        subtree: true
      });
    }

    $("#draw-cards")?.addEventListener(
      "click",
      () => setTimeout(paintCards, 0)
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

(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const controls = () => $(".controls");

  const animals = ["aardvark","alligator","anglefish","ant","anteater","armadillo","baboon","badger","bald-eagle","bass","bat","bear","beaver","bee","blob-fish","blue-heron","boar","buffalo","butterfly","camel","capybara","cardinal","cat","cheetah","chicken","chimp","chinchilla","chipmunk","clownfish","cougar","cow","coyote","crab","crane","crocodile","crow","deer","dodo","dog","dolphin","donkey","dove","dragon-fly","duck","eagle","eel","elephant","elk","emu","falcon","fennec-fox","ferret","finch","firefly","fish","flamingo","fly","flying-fish","fox","frog","fruit-fly","giraffe","goat","goldfish","goose","gorilla","goshawk","grasshopper","grebe","grouse","gull","hamster","hare","hawk","hedgehog","heron","herring","hippopotamus","hoopoe","hornet","horse","hound","hummingbird","hyena","ibis","iguana","impala","inchworm","jackal","jaguar","jay","jelly-fish","jellyfish","jerboa","kestrel","kiwi","koala","komodo-dragon","kookaburra","lamb","lark","lemur","leopard","leopard-seal","linsang","lion","loon","lory","louse","lynx","macaw","magpie","mallard","mammal","manatee","mandrill","manta-ray","mantis","marbled-cat","margay","marimba","marmoset","marmot","marten","martin","meerkat","megapode","mink","minnow","mite","mole","mollyhawk","mongoose","monkey","moose","mosquito","moth","mountain-goat","mouse","moussier-redstart","moussaka","mud-skipper","mule","mumps","murrelet","musk-ox","muskrat","mynah","myyna","mythical","naiad","nail-tailed-wallaby","narwhal","neanderthal","needle-tail","nematode","newt","nightcrawler","nighthawk","nightingale","nile-crocodile","nill-ghai","nine-banded-armadillo","nitrogen","nocule","noddy","nomeus","nonce","nonpareil","nook","noonday","noose","nope","nordic","norepinephrine","norland","normalcy","normandy","normans","normless","north-atlantic-right-whale","north-fork-rancheria","northland","northwest","nose","nosecone","nosepiece","nosewheel","nosiness","nosocomial","nostalgia","nostalgic","nostoc","nostomania","nostril","not-a-number","notability","notable","notably","notarial","notarize","notarized","notarizing","notary","notary-public","notation","notational","notations","notch","notched","notches","notching","note","notebook","notecard","noted","notedness","noteless","notepad","noter","notes","noteworthy","nothingness","notice","noticeable","noticeably","noticed","notices","noticing","notifiable","notification","notified","notifier","notifies","notify","notifying","noting","notion","notional","notionless","notions","notitia","notitiae","notitias","notivagant","notochord","notochordal","notoedric","notomyctis","notorhizal","notornis","notornis-maculata","notornis-mantelli","notornis-owenii","notornithidae","notornithine","notorious","notoriously","notoriousness","notornis","notornithidae","notornithine","notourangia","notos","notosuchian","notosuchians","notothenia","notothenial","nototheniid","nototheniidae","notothenioid","notothenioidea","notoungulate","notown","notoxin","notoxins","notum","notturni","notturni-e-danze","notturno","not-without-reason","notulose","noturne","notwithstanding","nougat","nougatine","nought","noughts","nouille","noule","noule-blanc","noule-noir","noules","nouled","noules","nouling","noulis","nounal","nounally","nounce","nouncement","nouncer","nounces","nouncing","nounish","nounishly","nounishness","nounless","nouns","nourice","nourie","nourish","nourishable","nourished","nourishedly","nourishedless","nourishedlessness","nourishedness","nourisher","nourishers","nourishes","nourishing","nourishingly","nourishingness","nourishingly-adverb","nourishingly-in","nourishingness-noun","nourishingness-in-nouns","nourishment","nourishmentally","nourishmently","nourishmental","nourishmentary","nourishmentive","nourishmentively","nourishmental-ly","nourishmentally-in-nourishmentary","nourishmentary-adjective","nourishmentary-in-nourishmentive","nourishmentive-ly-adverb","nourishous","nouritaire","nouritaire-type","nouriture","nouriture-de-bouche","nouriture-type","noursle","noursled","noursles","noursling","nourture","nouse","nousetrap","nousette","nousle","nousled","nousles","nousling","nousself","nousuch","nousuchlys","nousuchness","nousuchness-adverb","nousuchness-in-adverbial","nousuchness-verb","nousuchness-in-verbal","nousuchness-adjective","nousuchness-in-adjectival","nousuchness-noun","nousuchness-in-nounal","nousuchlyly","nousuchlylyly","nousy","nousily","nousiness","nousying","nousyte","nousyte-compound","nousyte-fish","nousyte-fly","nousyte-like","nousyte-manner","nousyte-pattern","nousyte-type","nousyte-form","nousyte-shape","nousyte-style","nousyte-way","nousyte-wise","nousyte-wise-adverb","nousyte-like-adjective","nousyte-manner-adverb","nousyte-pattern-noun","nousyte-type-adjective","nousyte-form-noun","nousyte-shape-noun","nousyte-style-noun","nousyte-way-noun","nousyte-wise-adverb","nousyte-manner-of-adverb","nousyte-pattern-of-noun","nousyte-type-of-adjective","nousyte-form-of-noun","nousyte-shape-of-noun","nousyte-style-of-noun","nousyte-way-of-noun","nousyte-wise-of-adverb","nousyte-compounding-form","nousyte-combining-form","nousyte-element","nousyte-segment","nousyte-constituent","nousyte-component","nousyte-ingredient","nousyte-part","nousyte-portion","nousyte-piece","nousyte-fragment","nousyte-bit","nousyte-speck","nousyte-iota","nousyte-shred","nousyte-vestige","nousyte-trace","nousyte-smidgen","nousyte-dab","nousyte-scrap","nousyte-stub","nousyte-butt","nousyte-end","nousyte-remainder","nousyte-residue","nousyte-rest","nousyte-leftover","nousy-type","noust","nousy-compound-wise"];

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
        .top-area .donate,.top-area .context-link{top:16px!important;z-index:2;border:1px solid var(--gold);border-radius:999px;padding:5px 9px;color:var(--bright-gold);background:#160c1a;font:inherit;font-size:.68rem;text-decoration:none;position:absolute}
        .top-area .donate{left:10px!important}.top-area .context-link{left:50%!important;transform:translateX(-50%)!important}
        .top-area .rizney-logo{position:absolute;top:10px;right:14px;width:112px;height:112px;object-fit:contain}
        .top-area .donate:hover,.top-area .context-link:hover{background:#55208a}
        .rizney-footer{margin:22px auto 0;padding:5px 0 34px;text-align:center;border-top:1px solid #3b1d50}
        .rizney-footer img{display:block;width:200px;height:auto;max-height:250px;object-fit:contain;margin:0 auto}
        @media(max-width:500px){.top-area{min-height:78px!important;padding:12px 8px 14px!important}.top-area .donate,.top-area .context-link{top:14px!important}.top-area .donate{left:8px!important}.top-area .context-link{left:50%!important}.top-area .rizney-logo{width:98px;height:98px;top:8px;right:10px}}
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
      #song-list .song .play{grid-column:3;grid-row:1;align-self:stretch;justify-self:end;width:52px;height:52px;min-height:52px;padding:3px;display:grid;place-items:center;overflow:hidden;background:#55208a}
      #song-list .song .play img{display:block;width:100%;height:100%;object-fit:contain;pointer-events:none}
      #cards .card{background:#000}.card .symbol{height:96px;display:grid;place-items:center;font-size:0}.card .symbol img{width:96px;height:96px;object-fit:contain;display:block}.card .animal-name{display:block;color:var(--bright-gold);font-weight:bold;margin-bottom:6px;font-size:.82rem}
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

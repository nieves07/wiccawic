(() => {
  "use strict";

  const characters = [
    {
      name: "Reha Karan",
      age: "26 yaşında",
      location: "Los Santos",
      occupation: "CK yemişsin kusen",
      imageUrl: "assets/reha.png",
      avatar: "💀",
      quote: "Payloco yüzünden CK yedi...",
      gag: true
    }
  ];

  const style = document.createElement("style");

  style.textContent = `
        .character-cards {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 14px;
      width: min(560px, calc(100% - 32px));
      margin: 26px auto 0;
      filter: drop-shadow(0 14px 28px #0008);
    }

    .character-cards > .section-title {
      flex: 0 0 100%;
      margin-bottom: 2px;
    }

    .character-card {
      --character-scale: 1;
      position: relative;
      flex: 0 0 auto;
      align-self: center;
      width: 100%;
      max-width: 100%;
      max-height: none;
      overflow-y: visible;
            padding: 18px;
      color: var(--cream);
      border: 1px solid #d9a74a88;
      border-radius: 6px 22px 6px 22px;
      background:
        linear-gradient(135deg, #4a2865e8, #170b25f5 68%),
        radial-gradient(circle at 90% 0%, #d9a74a22, transparent 35%),
        var(--plum);
      box-shadow:
        0 0 0 1px #8a63d222,
        0 0 20px #8a63d255,
        0 18px 42px #0009,
        inset 0 0 25px #d9a74a12;
      backdrop-filter: blur(14px);
      scrollbar-width: none;
      scroll-behavior: smooth;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
      animation: character-card-float 4s ease-in-out infinite;
      transition:
        width .2s ease,
        height .2s ease,
        max-height .2s ease,
        padding .25s ease,
        border-radius .25s ease,
        box-shadow .3s ease;
    }

    .character-card.is-resizing {
      animation: none !important;
      transition: none !important;
    }

    .character-card::-webkit-scrollbar {
      display: none;
    }

    .character-card:nth-child(2) { animation-delay: -1.5s; }
    .character-card:nth-child(3) { animation-delay: -2.8s; }

    .character-card__resize {
      position: sticky;
      top: -16px;
      left: -16px;
      z-index: 20;
      display: block;
      width: 30px;
      height: 30px;
      margin: -16px 0 -30px -16px;
      cursor: nwse-resize;
      touch-action: none;
            background: linear-gradient(135deg, #d9a74a18, transparent);
      border-radius: 0 0 12px 0;
    }

    .character-card__resize::before {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 13px;
      height: 13px;
      content: "";
            border-top: 2px solid #d9a74a;
      border-left: 2px solid #d9a74a;
      border-radius: 4px 0 0;
      opacity: .8;
      transition: opacity .2s ease, transform .2s ease;
    }

    .character-card__resize:hover::before,
    .character-card.is-resizing .character-card__resize::before {
      opacity: 1;
      transform: scale(1.2);
    }

        .character-card__header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 14px;
    }

    .character-card__avatar {
      display: grid;
      place-items: center;
      flex: 0 0 62px;
      width: 62px;
      height: 62px;
      padding: 0;
      overflow: hidden;
            border: 1px solid #d9a74acc;
      border-radius: 8px 16px 8px 16px;
      color: #f1d78f;
      background: linear-gradient(145deg, #2a163d, #0d0715);
      box-shadow: 0 0 14px #d9a74a33, inset 0 0 12px #8a63d222;
      font-size: calc(25px * var(--character-scale));
      cursor: pointer;
      touch-action: manipulation;
      transition: transform .3s ease, box-shadow .3s ease;
    }

    .character-card__avatar:hover,
    .character-card__avatar:focus-visible {
      transform: scale(1.08) rotate(-2deg);
      box-shadow: 0 0 18px var(--gold), 0 0 30px var(--witch);
    }

        .character-card__avatar img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      pointer-events: none;
    }

    .character-card__name {
            color: #f1d78f;
      font-family: "Eagle Lake", cursive;
      font-size: calc(21px * var(--character-scale));
      text-shadow: 0 0 10px #d9a74a88;
    }

    .character-card__age,
    .character-card__detail small {
      color: var(--mute);
      font-size: calc(12px * var(--character-scale));
    }

    .character-card__badge {
      display: inline-flex;
      margin-bottom: 12px;
      padding: 5px 9px;
            border: 1px solid #d9a74a66;
      border-radius: 4px 12px 4px 12px;
      color: #e8c878;
      background: linear-gradient(90deg, #d9a74a1c, #8a63d21c);
      letter-spacing: .5px;
      font-size: calc(10px * var(--character-scale));
      font-weight: 700;
      text-transform: uppercase;
    }

    .character-card__details {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-bottom: 14px;
    }

    .character-card__detail {
      padding: 9px;
            border: 1px solid #d9a74a2e;
      border-radius: 4px 10px 4px 10px;
      background: #09051166;
      box-shadow: inset 0 0 12px #d9a74a08;
    }

    .character-card__detail small {
      display: block;
      margin-bottom: 3px;
      font-size: calc(10px * var(--character-scale));
    }

    .character-card__detail strong {
      font-size: calc(12px * var(--character-scale));
    }

    .character-card__quote {
      padding: 10px 12px;
            border-left: 2px solid #d9a74a;
      border-radius: 0 10px 10px 0;
      color: #d9c18d;
      background: linear-gradient(90deg, #d9a74a18, transparent);
      box-shadow: inset 0 0 14px #d9a74a08;
      font-size: calc(11px * var(--character-scale));
      font-style: italic;
      line-height: 1.5;
    }

    .character-card__story {
      margin-top: 14px;
      padding-top: 12px;
            border-top: 1px solid #d9a74a44;
      scroll-margin-top: 20px;
      animation: story-fade-in .5s ease both;
    }

    .character-card__story summary {
      cursor: pointer;
            color: #e8c878;
      font-size: calc(12px * var(--character-scale));
      font-weight: 700;
      text-shadow: 0 0 8px #d9a74a66;
    }

    .character-card__story p {
      margin-top: 10px;
      color: var(--mute);
      font-size: calc(11px * var(--character-scale));
      line-height: 1.65;
      white-space: pre-line;
    }

    .character-card__memorial {
      margin-top: 16px;
      padding-top: 14px;
      border-top: 1px solid #e0b45c55;
      text-align: center;
    }

    .character-card__memorial img {
      display: block;
      width: 100%;
      max-height: 180px;
      object-fit: cover;
      border: 1px solid #e0b45c88;
      border-radius: 12px;
      box-shadow: 0 0 18px #e0b45c44;
      pointer-events: none;
    }

    .character-card__memorial p {
      margin-top: 10px;
      color: var(--gold);
      font-family: "Eagle Lake", cursive;
      font-size: calc(13px * var(--character-scale));
      line-height: 1.7;
      white-space: pre-line;
      text-shadow: 0 0 10px #e0b45c88;
    }

    .character-card__fail {
      margin-top: 12px;
      padding: 10px;
      border: 1px solid #ff5c8a99;
      border-radius: 12px;
      color: #ffd5e1;
      background: #ff3d7a30;
      font-size: calc(11px * var(--character-scale));
      font-weight: 800;
      text-align: center;
    }

        .character-card.is-collapsed {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 74px;
      height: 74px;
      max-width: 74px;
      max-height: 74px;
      overflow: hidden;
      padding: 5px;
      border-radius: 8px 20px 8px 20px;
      border-color: #d9a74a99;
      background: linear-gradient(145deg, #38204fe8, #12091df5);
      box-shadow: 0 0 14px #8a63d266, 0 0 28px #d9a74a22, inset 0 0 15px #d9a74a12;
    }

            .character-card.is-collapsed .character-card__header {
      position: absolute;
      inset: 5px;
      display: grid;
      place-items: center;
      width: auto;
      height: auto;
      margin: 0;
    }

    .character-card.is-collapsed .character-card__avatar {
      display: grid;
      place-items: center;
      width: 62px;
      height: 62px;
      flex: 0 0 62px;
      margin: 0;
    }

    .character-card.is-collapsed .character-card__avatar img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% 50%;
    }

    .character-card.is-collapsed .character-card__name,
    .character-card.is-collapsed .character-card__age,
    .character-card.is-collapsed .character-card__badge,
    .character-card.is-collapsed .character-card__details,
    .character-card.is-collapsed .character-card__quote,
    .character-card.is-collapsed .character-card__fail,
    .character-card.is-collapsed .character-card__story,
    .character-card.is-collapsed .character-card__resize {
      display: none;
    }

    .character-card.reha-card {
      border-color: #ff5c8a99;
      background: linear-gradient(145deg, #642645ee, #210d20f5 65%), var(--plum);
    }

    @keyframes story-fade-in {
      from { opacity: 0; transform: translateY(-8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes character-card-float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }

    @media (max-width: 1150px) {
      .character-cards {
        align-items: center;
        width: min(560px, calc(100% - 32px));
      }

      .character-card {
        max-width: 100%;
        max-height: none;
      }
    }

    @media (max-width: 600px) {
      .character-cards {
        width: calc(100% - 32px);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .character-card,
      .character-card__story {
        animation: none;
        transition: none;
      }
    }
  `;

  document.head.appendChild(style);

  const container = document.createElement("section");
  container.className = "character-cards";
  container.setAttribute("aria-label", "Karakter kartları");

  const heading = document.createElement("p");
  heading.className = "section-title";
  heading.textContent = "Karakter Kartları";
  container.appendChild(heading);

  function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value ?? "";
    return div.innerHTML;
  }

  function createCharacterCard(character) {
    const card = document.createElement("aside");
    card.className = `character-card is-collapsed${character.gag ? " reha-card" : ""}`;
    card.setAttribute("aria-label", `${character.name} karakter kartı`);

    const avatar = character.imageUrl
      ? `<img draggable="false" src="${escapeHtml(character.imageUrl)}" alt="${escapeHtml(character.name)} karakter görseli">`
      : escapeHtml(character.avatar);

    const story = character.story
      ? `
        <details class="character-card__story">
          <summary>Hikâyeyi oku</summary>
          <p>${escapeHtml(character.story)}</p>
          ${
            character.memorialImage
              ? `
                <div class="character-card__memorial">
                  <img draggable="false" src="${escapeHtml(character.memorialImage)}" alt="${escapeHtml(character.memorialText)}">
                  <p>${escapeHtml(character.memorialText)}</p>
                </div>
              `
              : ""
          }
        </details>
      `
      : "";

    const failNotice = character.gag
      ? `
        <div class="character-card__fail">
          💀 CK *****İ 💀<br>
          PALYOCO ÖLDÜRDÜ
        </div>
      `
      : "";

    card.innerHTML = `
      <div class="character-card__resize"
        role="button"
        tabindex="0"
        aria-label="${escapeHtml(character.name)} kartını köşeden genişlet"
        title="Sol üst köşeden sürükleyerek genişlet"></div>

      <div class="character-card__header">
        <button
          class="character-card__avatar"
          type="button"
          aria-label="${escapeHtml(character.name)} kartını büyüt"
          title="Kartı büyüt">
          ${avatar}
        </button>

        <div>
          <h2 class="character-card__name">${escapeHtml(character.name)}</h2>
          <p class="character-card__age">${escapeHtml(character.age)}</p>
        </div>
      </div>

      <div class="character-card__badge">${escapeHtml(character.occupation)}</div>

      <div class="character-card__details">
        <div class="character-card__detail">
          <small>Yaş</small>
          <strong>${escapeHtml(character.age)}</strong>
        </div>

        <div class="character-card__detail">
          <small>Konum</small>
          <strong>${escapeHtml(character.location)}</strong>
        </div>
      </div>

      <div class="character-card__quote">
        “${escapeHtml(character.quote)}”
      </div>

      ${failNotice}
      ${story}
    `;

    const avatarButton = card.querySelector(".character-card__avatar");
    const resizeHandle = card.querySelector(".character-card__resize");

    function resetCardSize() {
      card.style.width = "";
      card.style.height = "";
      card.style.maxHeight = "";
      card.style.maxWidth = "";
      card.style.setProperty("--character-scale", "1");
    }

    avatarButton.addEventListener("click", () => {
      const collapsed = card.classList.toggle("is-collapsed");

      if (collapsed) resetCardSize();

      avatarButton.setAttribute(
        "aria-label",
        collapsed
          ? `${character.name} kartını büyüt`
          : `${character.name} kartını küçült`
      );

      avatarButton.title = collapsed ? "Kartı büyüt" : "Kartı küçült";
    });

    let resizing = false;
    let pointerId = null;

    resizeHandle.addEventListener("pointerdown", event => {
      if (card.classList.contains("is-collapsed")) return;

      event.preventDefault();
      event.stopPropagation();

      resizing = true;
      pointerId = event.pointerId;
      resizeHandle.setPointerCapture(pointerId);
      card.classList.add("is-resizing");
    });

    resizeHandle.addEventListener("pointermove", event => {
      if (!resizing || event.pointerId !== pointerId) return;

      const rect = card.getBoundingClientRect();
      const isMobile = innerWidth <= 1150;
      const containerRect = container.getBoundingClientRect();

      const minWidth = 240;
      const minHeight = 180;
      const maxWidth = Math.min(
        620,
        isMobile ? innerWidth - 32 : innerWidth - 48
      );
      const maxHeight = innerHeight - 32;

      const rightEdge = isMobile
        ? Math.min(containerRect.right, innerWidth - 16)
        : innerWidth - 24;

      const width = Math.max(
        minWidth,
        Math.min(maxWidth, rightEdge - event.clientX)
      );

      const height = Math.max(
        minHeight,
        Math.min(maxHeight, rect.bottom - event.clientY)
      );

      const scale = Math.max(1, Math.min(1.35, width / 320));

      card.style.width = `${width}px`;
      card.style.height = `${height}px`;
      card.style.maxWidth = `${maxWidth}px`;
      card.style.maxHeight = `${height}px`;
      card.style.setProperty("--character-scale", scale.toFixed(2));
    });

    function stopResize(event) {
      if (!resizing || (event && event.pointerId !== pointerId)) return;

      resizing = false;
      card.classList.remove("is-resizing");

      if (resizeHandle.hasPointerCapture(pointerId)) {
        resizeHandle.releasePointerCapture(pointerId);
      }

      pointerId = null;
    }

    resizeHandle.addEventListener("pointerup", stopResize);
    resizeHandle.addEventListener("pointercancel", stopResize);
    resizeHandle.addEventListener("lostpointercapture", stopResize);

    resizeHandle.addEventListener("keydown", event => {
      if (event.key !== "Enter" && event.key !== " ") return;

      event.preventDefault();
      card.classList.remove("is-collapsed");
      card.style.width = "420px";
      card.style.height = "520px";
      card.style.maxWidth = "calc(100vw - 32px)";
      card.style.maxHeight = "520px";
      card.style.setProperty("--character-scale", "1.31");
    });

    const storyDetails = card.querySelector(".character-card__story");

    if (storyDetails) {
      storyDetails.addEventListener("toggle", () => {
        if (!storyDetails.open) return;

        requestAnimationFrame(() => {
          card.scrollBy({
            top: 80,
            behavior: "smooth"
          });
        });
      });
    }

    return card;
  }

  characters.forEach(character => {
    container.appendChild(createCharacterCard(character));
  });

  // Kartları sayfa akışına yerleştir (footer'dan önce).
  const footer = document.querySelector("main .site-footer");
  const mountParent = footer ? footer.parentNode : (document.querySelector("main") || document.body).parentNode;
  const mountBefore = footer || document.querySelector("main") || null;
  mountParent.insertBefore(container, mountBefore);
})();

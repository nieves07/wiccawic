(() => {
  "use strict";

  const style = document.createElement("style");

  style.textContent = `
    html,
    body {
      background: #020207 !important;
    }

    body:has(.nieves-hack-overlay) {
      overflow: hidden !important;
    }

    .nieves-hack-overlay {
      position: fixed;
      inset: 0;
      z-index: 99999;
      display: grid;
      place-items: center;
      overflow: hidden;
      width: 100vw;
      height: 100vh;
      min-height: 100dvh;
      color: #f5f7ff;
      background: #030308;
      font-family: "Courier New", monospace;
      isolation: isolate;
      opacity: 1;
      visibility: visible;
    }

    .nieves-hack-overlay::before,
    .nieves-hack-overlay::after {
      position: absolute;
      inset: 0;
      content: "";
      pointer-events: none;
    }

    .nieves-hack-overlay::before {
      z-index: -1;
      opacity: .3;
      background:
        linear-gradient(#ff246b18 1px, transparent 1px),
        linear-gradient(90deg, #ff246b18 1px, transparent 1px);
      background-size: 42px 42px;
      mask-image: radial-gradient(circle, #000 15%, transparent 80%);
      animation: nieves-grid-move 8s linear infinite;
    }

    .nieves-hack-overlay::after {
      z-index: 5;
      opacity: .22;
      background: repeating-linear-gradient(
        0deg,
        transparent 0 3px,
        #ff246b 4px,
        transparent 5px 8px
      );
      mix-blend-mode: screen;
      animation: nieves-scan 5s linear infinite;
    }

    .nieves-glow {
      position: absolute;
      width: 45vw;
      height: 45vw;
      border: 1px solid #ff246b44;
      border-radius: 50%;
      box-shadow:
        0 0 30px #ff246b55,
        inset 0 0 35px #ff246b33;
      opacity: .6;
      animation: nieves-pulse 4s ease-in-out infinite;
    }

    .nieves-glow::before,
    .nieves-glow::after {
      position: absolute;
      inset: 12%;
      content: "";
      border: 1px dashed #00eaff55;
      border-radius: inherit;
      transform: rotate(45deg);
    }

    .nieves-glow::after {
      inset: 25%;
      border-color: #ff246b66;
      transform: rotate(-35deg);
    }

    .nieves-particle {
      position: absolute;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: #00eaff;
      box-shadow: 0 0 10px #00eaff;
      animation: nieves-particle 5s linear infinite;
    }

    .nieves-panel {
      position: relative;
      z-index: 3;
      width: min(760px, calc(100% - 30px));
      padding: 34px 26px 26px;
      border: 1px solid #ff246baa;
      border-radius: 10px;
      background:
        linear-gradient(145deg, #160713, #050509),
        #08030b;
      box-shadow:
        0 0 20px #ff246b99,
        0 0 90px #ff246b44,
        inset 0 0 35px #ff246b18;
      text-align: center;
      opacity: 1;
      visibility: visible;
      animation: nieves-panel-glitch 4s steps(1) infinite;
    }

    .nieves-panel::before,
    .nieves-panel::after {
      position: absolute;
      width: 22px;
      height: 22px;
      content: "";
      border-color: #00eaff;
    }

    .nieves-panel::before {
      top: -1px;
      left: -1px;
      border-top: 2px solid;
      border-left: 2px solid;
    }

    .nieves-panel::after {
      right: -1px;
      bottom: -1px;
      border-right: 2px solid;
      border-bottom: 2px solid;
    }

    .nieves-status {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 20px;
      padding: 7px 13px;
      border: 1px solid #ff246b88;
      border-radius: 20px;
      color: #ff7da8;
      background: #ff246b14;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 2px;
    }

    .nieves-status i {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #ff246b;
      box-shadow: 0 0 12px #ff246b;
      animation: nieves-blink 1s steps(1) infinite;
    }

    .nieves-title {
      margin: 0;
      color: #fff;
      font-family: Arial, sans-serif;
      font-size: clamp(42px, 11vw, 100px);
      font-weight: 900;
      letter-spacing: clamp(2px, 1vw, 10px);
      line-height: .9;
      text-transform: uppercase;
      text-shadow:
        4px 0 #ff246b,
        -4px 0 #00eaff,
        0 0 20px #ff246b,
        0 0 55px #ff246b;
      animation: nieves-title-glitch 2.7s steps(1) infinite;
    }

    .nieves-by {
      margin-top: 18px;
      color: #00eaff;
      font-size: clamp(16px, 4vw, 28px);
      font-weight: 700;
      letter-spacing: 8px;
      text-shadow: 0 0 12px #00eaff;
    }

    .nieves-divider {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 24px auto;
      color: #ff246b;
      font-size: 12px;
    }

    .nieves-divider::before,
    .nieves-divider::after {
      flex: 1;
      height: 1px;
      content: "";
      background: linear-gradient(90deg, transparent, #ff246b);
      box-shadow: 0 0 8px #ff246b;
    }

    .nieves-divider::after {
      background: linear-gradient(90deg, #ff246b, transparent);
    }

    .nieves-terminal {
      padding: 17px;
      border: 1px solid #00eaff44;
      border-radius: 5px;
      color: #b8f8ff;
      background: #010507;
      box-shadow: inset 0 0 20px #00eaff0d;
      font-size: 12px;
      line-height: 1.9;
      text-align: left;
    }

    .nieves-terminal div {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .nieves-terminal strong {
      color: #ff246b;
    }

    .nieves-terminal em {
      color: #00eaff;
      font-style: normal;
    }

    .nieves-message {
      margin-top: 22px;
      padding: 14px 12px;
      border: 1px solid #ff246b;
      color: #fff;
      background: linear-gradient(90deg, #ff246b22, #00eaff12, #ff246b22);
      box-shadow: 0 0 18px #ff246b55;
      font-size: clamp(11px, 2.5vw, 15px);
      font-weight: 700;
      letter-spacing: 1px;
      text-shadow: 0 0 8px #ff246b;
    }

    .nieves-hint {
      margin-top: 19px;
      color: #87919d;
      font-size: 11px;
      letter-spacing: 1px;
    }

    .nieves-hint kbd {
      padding: 3px 7px;
      border: 1px solid #00eaff88;
      border-radius: 3px;
      color: #00eaff;
      background: #00eaff12;
      box-shadow: 0 0 8px #00eaff33;
    }

    .nieves-corner {
      position: absolute;
      z-index: 4;
      color: #ff246b;
      font-size: 10px;
      letter-spacing: 1px;
      opacity: .8;
    }

    .nieves-corner.top {
      top: 18px;
      left: 20px;
    }

    .nieves-corner.bottom {
      right: 20px;
      bottom: 18px;
    }

    .nieves-hack-overlay.is-closing {
      animation: nieves-close .65s ease forwards;
    }

    @keyframes nieves-close {
      to {
        opacity: 0;
        transform: scale(1.08);
        filter: blur(8px);
        visibility: hidden;
      }
    }

    @keyframes nieves-title-glitch {
      0%, 88%, 100% { transform: none; clip-path: none; }
      90% {
        transform: translateX(-7px) skewX(-8deg);
        clip-path: inset(20% 0 55% 0);
      }
      93% {
        transform: translateX(7px);
        clip-path: inset(60% 0 10% 0);
      }
    }

    @keyframes nieves-panel-glitch {
      0%, 94%, 100% { transform: none; }
      95% { transform: translateX(3px); }
      97% { transform: translateX(-3px); }
    }

    @keyframes nieves-scan {
      to { background-position: 0 80px; }
    }

    @keyframes nieves-grid-move {
      to { background-position: 42px 42px; }
    }

    @keyframes nieves-pulse {
      50% { transform: scale(1.08) rotate(8deg); opacity: .35; }
    }

    @keyframes nieves-particle {
      from {
        opacity: 0;
        transform: translateY(20px);
      }

      20%, 80% { opacity: .8; }

      to {
        opacity: 0;
        transform: translateY(-100vh);
      }
    }

    @keyframes nieves-blink {
      50% { opacity: .25; }
    }

    @media (max-width: 600px) {
      .nieves-panel {
        padding: 27px 16px 21px;
      }

      .nieves-title {
        letter-spacing: 2px;
      }

      .nieves-by {
        letter-spacing: 4px;
      }

      .nieves-glow {
        width: 90vw;
        height: 90vw;
      }

      .nieves-corner {
        font-size: 8px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .nieves-hack-overlay *,
      .nieves-hack-overlay::before,
      .nieves-hack-overlay::after {
        animation: none !important;
      }
    }
  `;

  document.head.appendChild(style);

  const overlay = document.createElement("section");
  overlay.className = "nieves-hack-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-labelledby", "nievesHackTitle");

  overlay.innerHTML = `
    <div class="nieves-glow" aria-hidden="true"></div>

    <span class="nieves-particle" style="left:12%;top:80%;animation-delay:-1s"></span>
    <span class="nieves-particle" style="left:24%;top:65%;animation-delay:-3s"></span>
    <span class="nieves-particle" style="left:76%;top:75%;animation-delay:-2s"></span>
    <span class="nieves-particle" style="left:88%;top:55%;animation-delay:-4s"></span>

    <div class="nieves-corner top">NIEVES_OS // SYSTEM OVERRIDE</div>
    <div class="nieves-corner bottom">SECURE CHANNEL // 0xNIEVES</div>

    <div class="nieves-panel">
      <div class="nieves-status">
        <i></i>
        SYSTEM BREACH DETECTED
      </div>

      <h1 class="nieves-title" id="nievesHackTitle">HACKED</h1>
      <div class="nieves-by">BY NIEVES</div>

      <div class="nieves-divider">✦ ACCESS GRANTED ✦</div>

      <div class="nieves-terminal" aria-label="Sistem durumu">
        <div><strong>[+]</strong> Wiccawic network located...</div>
        <div><strong>[+]</strong> Security layer bypassed...</div>
        <div><em>[!]</em> Unauthorized access confirmed.</div>
        <div><em>[+]</em> Nieves control protocol active_</div>
      </div>

      <div class="nieves-message">
        BU SİTE NİEVES TARAFINDAN DESTURLANMIŞTIR
      </div>

      <p class="nieves-hint">
        <kbd>WICA</kbd>
      </p>
    </div>
  `;

  document.body.appendChild(overlay);

  let typedText = "";
  let closeStarted = false;

  function closeHackScreen() {
    if (closeStarted || !document.body.contains(overlay)) return;

    closeStarted = true;
    overlay.classList.add("is-closing");

    window.setTimeout(() => {
      overlay.remove();
      document.body.style.overflow = "";
    }, 650);
  }

  document.addEventListener("keydown", event => {
    if (!document.body.contains(overlay)) return;

    if (event.key === "Escape") {
      closeHackScreen();
      return;
    }

    if (event.key.length !== 1) return;

    typedText += event.key.toLowerCase();
    typedText = typedText.slice(-4);

    if (typedText === "wica") {
      closeHackScreen();
    }
  });
})();

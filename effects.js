(() => {
  "use strict";

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(pointer: fine) and (hover: hover)").matches;
  const style = document.createElement("style");

  style.textContent = `
    .potion-link,
    .feature-button,
    .stream-card,
    .potion-result,
    .kick-badge {
      isolation: isolate;
    }

    .potion-link,
    .feature-button, 
    .stream-card,
    .kick-badge {
      overflow: hidden;
    }

    .potion-link::before {
      transition: width .35s ease, box-shadow .35s ease;
    }

    .potion-link:hover::before,
    .potion-link:focus-visible::before {
      width: 100%;
      opacity: .12;
      box-shadow: 0 0 28px 8px var(--link-glow);
    }

    .kick-badge {
      position: relative;
      border-color: #c6a8ff66;
      background: linear-gradient(120deg, #8a63d233, #302044cc 45%, #8a63d233);
      box-shadow: inset 0 0 14px #c6a8ff12;
      transition: .3s ease;
    }

    .kick-badge::before {
      position: absolute;
      top: 0;
      left: -75%;
      z-index: -1;
      width: 45%;
      height: 100%;
      content: "";
      background: linear-gradient(100deg, transparent, #ffffff66, transparent);
      transform: skewX(-22deg);
      transition: left .7s ease;
    }

    .kick-badge:hover,
    .kick-badge:focus-visible {
      color: #fff;
      border-color: var(--glow);
      box-shadow:
        0 0 14px #8a63d288,
        0 0 30px #8a63d244,
        inset 0 0 18px #c6a8ff25;
      transform: translateY(-3px) scale(1.025);
    }

    .kick-badge:hover::before,
    .kick-badge:focus-visible::before {
      left: 135%;
    }

    .kick-badge span {
      position: relative;
      z-index: 1;
    }

    .feature-button {
      position: relative;
      border-color: #c6a8ff66;
      box-shadow: inset 0 0 18px #8a63d21c;
    }

    .feature-button:hover,
    .feature-button:focus-visible {
      box-shadow:
        inset 0 0 24px #c6a8ff2c,
        0 0 22px #8a63d255;
    }

    .stream-card {
      position: relative;
      transition: .3s ease;
    }

    .stream-card:hover {
      border-color: var(--glow);
      box-shadow:
        0 0 24px #8a63d255,
        inset 0 0 28px #8a63d21c;
      transform: translateY(-3px);
    }

    .stream-frame {
      position: relative;
      isolation: isolate;
      border: 1px solid transparent;
      transition: border-color .5s ease, box-shadow .5s ease, filter .5s ease;
    }

    .stream-frame::before,
    .stream-frame::after {
      position: absolute;
      inset: 0;
      z-index: 2;
      content: "";
      border-radius: inherit;
      pointer-events: none;
      opacity: 0;
      transition: opacity .5s ease;
    }

    .stream-frame::before {
      border: 1px solid var(--glow);
      box-shadow: 0 0 8px var(--glow), 0 0 18px var(--witch);
    }

    .stream-frame.neon-live {
      border-color: var(--glow);
      box-shadow: 0 0 22px #8a63d288;
    }

    .stream-frame.neon-live::before {
      opacity: 1;
    }

    .stream-frame iframe {
      position: relative;
      z-index: 1;
    }

    /* Daha cadı temalı İksir Rafı simgeleri */
    .potion-link .bottle {
      display: grid;
      place-items: center;
      flex: 0 0 36px;
      width: 36px;
      height: 36px;
      font-size: 28px;
      line-height: 1;
      filter:
        drop-shadow(0 0 5px var(--link-glow))
        drop-shadow(0 0 11px var(--link-glow));
      transition: transform .3s ease, filter .3s ease;
    }

    .potion-link .bottle::before {
      position: static;
      width: auto;
      height: auto;
      content: "🧪";
      border-radius: 0;
      background: transparent;
      box-shadow: none;
    }

    .potion-link .bottle::after {
      display: none;
    }

    .potion-link:nth-child(1) .bottle::before {
      content: "🧪";
    }

    .potion-link:nth-child(2) .bottle::before {
      content: "🔮";
    }

    .potion-link:nth-child(3) .bottle::before {
      content: "🕯️";
    }

    .potion-link:nth-child(4) .bottle::before {
      content: "🐈‍⬛";
    }

    .potion-link:nth-child(5) .bottle::before {
      content: "🌙";
    }

    .potion-link:nth-child(6) .bottle::before {
      content: "🧿";
    }

    .potion-link:hover .bottle,
    .potion-link:focus-visible .bottle {
      transform: translateY(-2px) rotate(-8deg) scale(1.16);
      filter:
        drop-shadow(0 0 7px var(--glow))
        drop-shadow(0 0 16px var(--link-glow));
    }

    @media (prefers-reduced-motion: reduce) {
      .kick-badge::before {
        display: none;
      }

      .potion-link .bottle {
        transition: none;
      }

      .potion-link:hover .bottle,
      .potion-link:focus-visible .bottle {
        transform: scale(1.08);
      }
    }
  `;

  document.head.appendChild(style);

  const cauldron = document.querySelector(".cauldron-wrap");

  if (cauldron && !reduceMotion) {
    const sparkColors = ["var(--glow)", "var(--gold)", "var(--pink)"];

    for (let index = 0; index < 8; index++) {
      const spark = document.createElement("span");
      spark.className = "cauldron-orbit-spark";
      spark.style.animationDelay = `${-index * .7}s`;
      spark.style.setProperty("--spark-color", sparkColors[index % sparkColors.length]);
      cauldron.appendChild(spark);
    }
  }

  function initMagicPotionIcons() {
    const icons = ["🧪", "🔮", "🕯️", "🐈‍⬛", "🌙", "🧿"];

    document.querySelectorAll(".potion-link .bottle").forEach((bottle, index) => {
      bottle.setAttribute("aria-hidden", "true");
      bottle.dataset.icon = icons[index % icons.length];
    });
  }

  initMagicPotionIcons();
})();

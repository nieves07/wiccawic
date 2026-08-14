(() => {
  "use strict";

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(pointer: fine) and (hover: hover)").matches;
  const style = document.createElement("style");

  style.textContent = `
    *,
    *::before,
    *::after {
      user-select: none !important;
      -webkit-user-select: none !important;
      -webkit-touch-callout: none;
    }

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
      cursor: none !important;
      transition: border-color .5s ease, box-shadow .5s ease, filter .5s ease;
    }

    .stream-frame::before {
      position: absolute;
      inset: 0;
      z-index: 2;
      content: "";
      border-radius: inherit;
      border: 1px solid var(--glow);
      box-shadow: 0 0 8px var(--glow), 0 0 18px var(--witch);
      pointer-events: none;
      opacity: 0;
      transition: opacity .5s ease;
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
      cursor: none !important;
      pointer-events: none;
    }

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

    .potion-link:nth-child(1) .bottle::before { content: "🧪"; }
    .potion-link:nth-child(2) .bottle::before { content: "🔮"; }
    .potion-link:nth-child(3) .bottle::before { content: "🕯️"; }
    .potion-link:nth-child(4) .bottle::before { content: "🐈‍⬛"; }
    .potion-link:nth-child(5) .bottle::before { content: "🌙"; }
    .potion-link:nth-child(6) .bottle::before { content: "🧿"; }

    .potion-link:hover .bottle,
    .potion-link:focus-visible .bottle {
      transform: translateY(-2px) rotate(-8deg) scale(1.16);
      filter:
        drop-shadow(0 0 7px var(--glow))
        drop-shadow(0 0 16px var(--link-glow));
    }

    .witch-cursor,
    .witch-cursor-ring {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9999;
      pointer-events: none;
      opacity: 0;
      transform: translate(-50%, -50%);
    }

    .witch-cursor {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--glow);
      box-shadow:
        0 0 8px var(--glow),
        0 0 18px var(--witch),
        0 0 30px var(--witch);
      transition: width .2s ease, height .2s ease, opacity .2s ease;
    }

    .witch-cursor-ring {
      width: 34px;
      height: 34px;
      border: 1px solid var(--gold);
      border-radius: 50%;
      box-shadow:
        0 0 10px var(--gold),
        inset 0 0 8px var(--witch);
      transition:
        width .25s ease,
        height .25s ease,
        border-color .25s ease,
        opacity .25s ease;
    }

    body.has-witch-cursor,
    body.has-witch-cursor *,
    body.has-witch-cursor iframe,
    body.has-witch-cursor .cauldron-wrap,
    body.has-witch-cursor .cauldron-wrap *,
    body.has-witch-cursor .cauldron-image,
    body.has-witch-cursor button,
    body.has-witch-cursor a,
    body.has-witch-cursor [role="button"] {
      cursor: none !important;
    }

    body.cursor-hover .witch-cursor {
      width: 16px;
      height: 16px;
    }

    body.cursor-hover .witch-cursor-ring {
      width: 48px;
      height: 48px;
      border-color: var(--glow);
    }

    .cursor-particle {
      position: fixed;
      z-index: 9997;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--particle-color, var(--glow));
      box-shadow:
        0 0 6px var(--particle-color, var(--glow)),
        0 0 14px var(--particle-color, var(--witch));
      pointer-events: none;
      animation: cursor-particle-fade .75s ease-out forwards;
    }

    @keyframes cursor-particle-fade {
      0% {
        opacity: .95;
        transform: translate(-50%, -50%) scale(1);
      }

      100% {
        opacity: 0;
        transform:
          translate(
            calc(-50% + var(--particle-x)),
            calc(-50% + var(--particle-y))
          )
          scale(.15);
      }
    }

    .cursor-spark {
      position: fixed;
      z-index: 9998;
      width: 6px;
      height: 6px;
      color: var(--gold);
      pointer-events: none;
      text-shadow: 0 0 8px var(--glow);
      animation: cursor-spark-rise .8s ease-out forwards;
    }

    @keyframes cursor-spark-rise {
      from {
        opacity: 1;
        transform: translate(-50%, -50%) scale(.5) rotate(0);
      }

      to {
        opacity: 0;
        transform:
          translate(
            calc(-50% + var(--spark-x)),
            calc(-50% + var(--spark-y))
          )
          scale(1.5)
          rotate(180deg);
      }
    }

    @media (max-width: 600px), (pointer: coarse) {
      .witch-cursor,
      .witch-cursor-ring,
      .cursor-spark,
      .cursor-particle {
        display: none;
      }
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

      .witch-cursor-ring,
      .cursor-particle {
        animation: none;
        transition: none;
      }
    }
  `;

  document.head.appendChild(style);

  document.addEventListener("copy", event => {
    event.preventDefault();
  });

  document.addEventListener("cut", event => {
    event.preventDefault();
  });

  document.addEventListener("selectstart", event => {
    event.preventDefault();
  });

  function initWitchCursor() {
    if (!finePointer) return;

    const cursor = document.createElement("span");
    const ring = document.createElement("span");

    cursor.className = "witch-cursor";
    ring.className = "witch-cursor-ring";

    document.body.append(cursor, ring);
    document.body.classList.add("has-witch-cursor");

    let mouseX = innerWidth / 2;
    let mouseY = innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let lastParticleTime = 0;

    function moveCursor(event) {
      mouseX = event.clientX;
      mouseY = event.clientY;

      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
      cursor.style.opacity = "1";
      ring.style.opacity = "1";

      createCursorParticle(event);
    }

    function createCursorParticle(event) {
      if (reduceMotion) return;

      const now = performance.now();

      if (now - lastParticleTime < 35) return;
      lastParticleTime = now;

      const particle = document.createElement("span");
      const colors = ["var(--glow)", "var(--gold)", "var(--pink)"];

      particle.className = "cursor-particle";
      particle.style.left = `${event.clientX}px`;
      particle.style.top = `${event.clientY}px`;
      particle.style.setProperty(
        "--particle-color",
        colors[Math.floor(Math.random() * colors.length)]
      );
      particle.style.setProperty(
        "--particle-x",
        `${Math.random() * 34 - 17}px`
      );
      particle.style.setProperty(
        "--particle-y",
        `${Math.random() * 34 - 17}px`
      );

      document.body.appendChild(particle);
      particle.addEventListener("animationend", () => particle.remove(), {
        once: true
      });
    }

    function animateRing() {
      ringX += (mouseX - ringX) * .18;
      ringY += (mouseY - ringY) * .18;

      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;

      requestAnimationFrame(animateRing);
    }

    function createCursorSparks(event) {
      if (reduceMotion) return;

      for (let index = 0; index < 4; index++) {
        const spark = document.createElement("span");

        spark.className = "cursor-spark";
        spark.textContent = index % 2 ? "✦" : "✧";
        spark.style.left = `${event.clientX}px`;
        spark.style.top = `${event.clientY}px`;
        spark.style.setProperty("--spark-x", `${Math.random() * 46 - 23}px`);
        spark.style.setProperty("--spark-y", `${Math.random() * 46 - 23}px`);

        document.body.appendChild(spark);
        spark.addEventListener("animationend", () => spark.remove(), {
          once: true
        });
      }
    }

    document.addEventListener("pointermove", moveCursor);
    document.addEventListener("click", createCursorSparks);

    document.querySelectorAll("a, button, [role='button']").forEach(element => {
      element.addEventListener("mouseenter", () => {
        document.body.classList.add("cursor-hover");
      });

      element.addEventListener("mouseleave", () => {
        document.body.classList.remove("cursor-hover");
      });
    });

    animateRing();
  }

  initWitchCursor();

  const cauldron = document.querySelector(".cauldron-wrap");

  if (cauldron && !reduceMotion) {
    const sparkColors = ["var(--glow)", "var(--gold)", "var(--pink)"];

    for (let index = 0; index < 8; index++) {
      const spark = document.createElement("span");

      spark.className = "cauldron-orbit-spark";
      spark.style.animationDelay = `${-index * .7}s`;
      spark.style.setProperty(
        "--spark-color",
        sparkColors[index % sparkColors.length]
      );

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

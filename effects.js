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

    .kick-badge .dot {
      flex: 0 0 7px;
      transition: .3s ease;
    }

    .kick-badge:hover .dot,
    .kick-badge:focus-visible .dot {
      transform: scale(1.25);
      box-shadow:
        0 0 8px 2px var(--witch),
        0 0 18px 5px var(--glow);
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

    .stream-frame iframe {
      pointer-events: none;
    }

    .cauldron-wrap {
      perspective: 800px;
    }

    .cauldron-wrap::after {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 0;
      width: 270px;
      height: 270px;
      content: "";
      border: 1px solid transparent;
      border-top-color: var(--gold);
      border-right-color: var(--glow);
      border-radius: 50%;
      opacity: .65;
      pointer-events: none;
      box-shadow: 0 0 12px var(--gold), 0 0 28px var(--witch);
      transform: translate(-50%, -50%) rotateX(68deg);
      animation: cauldron-orbit 8s linear infinite;
    }

    .cauldron-wrap:hover::after {
      opacity: 1;
      animation-duration: 3s;
    }

    .cauldron-frame,
    .magic-ring {
      animation: none !important;
    }

    .cauldron-image {
      animation: cauldron-image-glow 3s ease-in-out infinite;
      transform-origin: center;
    }

    .cauldron-image:hover {
      filter:
        blur(0)
        brightness(1.18)
        saturate(1.25)
        drop-shadow(0 0 8px var(--glow))
        drop-shadow(0 0 22px var(--witch))
        drop-shadow(0 0 38px var(--gold))
        drop-shadow(0 12px 17px #000b);
      transform: translateX(-50%);
    }

    .cauldron-orbit-spark {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 6;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--spark-color, var(--glow));
      box-shadow:
        0 0 7px var(--spark-color, var(--glow)),
        0 0 16px var(--spark-color, var(--glow));
      pointer-events: none;
      animation: orbit-spark 5s linear infinite;
    }

    .cauldron-orbit-spark:nth-child(2n) {
      width: 5px;
      height: 5px;
      animation-duration: 7s;
      animation-direction: reverse;
    }

    .cauldron-orbit-spark:nth-child(3n) {
      --spark-color: var(--gold);
      animation-duration: 6s;
    }

    .cauldron-orbit-spark:nth-child(4n) {
      --spark-color: var(--pink);
      animation-duration: 8s;
    }

    @keyframes cauldron-orbit {
      to {
        transform: translate(-50%, -50%) rotateX(68deg) rotate(360deg);
      }
    }

    @keyframes cauldron-image-glow {
      0%, 100% {
        filter:
          blur(0)
          drop-shadow(0 0 4px var(--glow))
          drop-shadow(0 0 10px var(--witch))
          drop-shadow(0 12px 17px #000b);
      }

      50% {
        filter:
          blur(0)
          brightness(1.08)
          drop-shadow(0 0 8px var(--glow))
          drop-shadow(0 0 20px var(--witch))
          drop-shadow(0 0 30px #e0b45c88)
          drop-shadow(0 12px 17px #000b);
      }
    }

    @keyframes orbit-spark {
      from {
        opacity: 0;
        transform: rotate(0deg) translateX(122px) scale(.4);
      }

      15%, 80% {
        opacity: 1;
      }

      to {
        opacity: 0;
        transform: rotate(360deg) translateX(122px) scale(1.2);
      }
    }

    .footer-signature {
      position: relative;
      display: inline-block;
      animation: signature-float 3.5s ease-in-out infinite;
      transition: .3s ease;
    }

    .footer-signature:hover,
    .footer-signature:focus-visible {
      color: var(--glow);
      text-shadow:
        0 0 8px var(--cream),
        0 0 18px var(--glow),
        0 0 32px var(--witch);
    }

    @keyframes signature-float {
      50% {
        transform: translateY(-4px);
      }
    }

    .cat-scene {
      isolation: isolate;
      transition: transform .35s ease;
    }

    .cat-scene::before {
      position: absolute;
      inset: 18px 35px 20px;
      z-index: -1;
      content: "";
      border: 1px solid var(--glow);
      border-radius: 50%;
      opacity: .35;
      background: radial-gradient(circle, var(--witch), transparent 68%);
      filter: blur(9px);
      animation: cat-aura-pulse 2.6s ease-in-out infinite;
    }

    .cat-scene:hover {
      transform: translateY(-5px) scale(1.03);
    }

    .cat-scene:hover::before {
      opacity: .8;
      box-shadow: 0 0 22px var(--witch), 0 0 50px var(--glow);
    }

    .cat-scene:hover .cat {
      filter:
        drop-shadow(0 0 10px var(--pink))
        drop-shadow(0 0 24px var(--glow));
    }

    @keyframes cat-aura-pulse {
      0%, 100% {
        opacity: .3;
        transform: scale(.9);
      }

      50% {
        opacity: .8;
        transform: scale(1.12);
      }
    }

    .magic-cursor {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 99999;
      width: 16px;
      height: 16px;
      pointer-events: none;
      opacity: 0;
      visibility: hidden;
      will-change: transform;
      border: 1px solid var(--pink);
      background: linear-gradient(
        135deg,
        var(--pink),
        var(--witch) 55%,
        var(--gold)
      );
      box-shadow:
        0 0 8px var(--pink),
        0 0 18px var(--witch),
        0 0 32px #8a63d288;
      transform: translate(-50%, -50%) rotate(45deg);
      transition:
        width .25s ease,
        height .25s ease,
        box-shadow .25s ease,
        opacity .2s ease,
        visibility .2s ease;
    }

    .magic-cursor::before {
      position: absolute;
      inset: -7px;
      content: "";
      border: 1px solid var(--glow);
      border-radius: 50%;
      opacity: .5;
      pointer-events: none;
      animation: cursor-aura 2s ease-in-out infinite;
    }

    .cursor-particle {
      position: fixed;
      z-index: 99997;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      pointer-events: none;
      background: var(--particle-color, var(--glow));
      box-shadow:
        0 0 6px var(--particle-color, var(--glow)),
        0 0 14px var(--particle-color, var(--glow));
      animation: cursor-particle-fade .65s ease-out forwards;
    }

    .cursor-particle.star {
      width: auto;
      height: auto;
      background: transparent;
      box-shadow: none;
      color: var(--particle-color, var(--glow));
      font-size: 11px;
      line-height: 1;
    }

    @keyframes cursor-aura {
      0%, 100% {
        opacity: .3;
        transform: scale(.85);
      }

      50% {
        opacity: .75;
        transform: scale(1.2);
      }
    }

    @keyframes cursor-particle-fade {
      from {
        opacity: .95;
        transform: translate(-50%, -50%) scale(1);
      }

      to {
        opacity: 0;
        transform:
          translate(
            calc(-50% + var(--move-x)),
            calc(-50% + var(--move-y))
          )
          scale(.1)
          rotate(120deg);
      }
    }

    body.cursor-visible .magic-cursor {
      opacity: 1;
      visibility: visible;
    }

    body.cursor-visible,
    body.cursor-visible a,
    body.cursor-visible button,
    body.cursor-visible [role="button"],
    body.cursor-visible .cauldron-wrap,
    body.cursor-visible .cauldron-wrap * {
      cursor: none !important;
    }

    body.cursor-hover .magic-cursor {
      width: 24px;
      height: 24px;
      box-shadow:
        0 0 10px var(--pink),
        0 0 24px var(--glow),
        0 0 44px var(--witch);
    }

    body.cursor-click .magic-cursor {
      width: 11px;
      height: 11px;
      box-shadow:
        0 0 10px var(--gold),
        0 0 22px var(--glow),
        0 0 36px var(--pink);
    }

    .cursor-ripple {
      position: fixed;
      z-index: 99998;
      width: 12px;
      height: 12px;
      border: 1px solid var(--gold);
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%, -50%);
      animation: cursor-ripple .65s ease-out forwards;
    }

    @keyframes cursor-ripple {
      from {
        opacity: .9;
        transform: translate(-50%, -50%) scale(.5);
      }

      to {
        opacity: 0;
        transform: translate(-50%, -50%) scale(4);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .cauldron-wrap::after,
      .cauldron-orbit-spark,
      .cat-scene::before,
      .footer-signature,
      .magic-cursor::before {
        animation: none;
      }

      .kick-badge::before,
      .magic-cursor {
        display: none;
      }
    }

    @media (max-width: 600px) {
      .cauldron-wrap::after {
        width: 245px;
        height: 245px;
      }

      .kick-badge:hover,
      .kick-badge:focus-visible {
        transform: translateY(-2px) scale(1.015);
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
      spark.style.setProperty(
        "--spark-color",
        sparkColors[index % sparkColors.length]
      );

      cauldron.appendChild(spark);
    }
  }

  function initMagicCursor() {
    if (!finePointer || reduceMotion) return;

    const cursor = document.createElement("span");
    cursor.className = "magic-cursor";
    document.body.appendChild(cursor);

    let mouseX = innerWidth / 2;
    let mouseY = innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let lastParticleTime = 0;

    function animateCursor() {
      cursorX += (mouseX - cursorX) * .18;
      cursorY += (mouseY - cursorY) * .18;

      cursor.style.transform =
        `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%) rotate(45deg)`;

      requestAnimationFrame(animateCursor);
    }

    function createParticle(x, y, burst = false) {
      const particle = document.createElement("span");
      const angle = Math.random() * Math.PI * 2;
      const distance = burst
        ? 24 + Math.random() * 38
        : 8 + Math.random() * 18;
      const isStar = Math.random() > .72;

      particle.className = `cursor-particle${isStar ? " star" : ""}`;
      particle.textContent = isStar ? "✦" : "";
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.setProperty("--move-x", `${Math.cos(angle) * distance}px`);
      particle.style.setProperty("--move-y", `${Math.sin(angle) * distance}px`);
      particle.style.setProperty(
        "--particle-color",
        Math.random() > .5 ? "var(--glow)" : "var(--pink)"
      );

      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 700);
    }

    function createTrail() {
      const now = performance.now();

      if (now - lastParticleTime < 42) return;

      lastParticleTime = now;
      createParticle(mouseX, mouseY);
    }

    function createRipple() {
      const ripple = document.createElement("span");

      ripple.className = "cursor-ripple";
      ripple.style.left = `${mouseX}px`;
      ripple.style.top = `${mouseY}px`;

      document.body.appendChild(ripple);

      for (let index = 0; index < 7; index++) {
        createParticle(mouseX, mouseY, true);
      }

      setTimeout(() => ripple.remove(), 700);
    }

    document.addEventListener("pointermove", event => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      document.body.classList.add("cursor-visible");
      createTrail();
    });

    document.addEventListener("pointerover", event => {
      if (event.target.closest("a, button, [role='button'], input, textarea")) {
        document.body.classList.add("cursor-hover");
      }
    });

    document.addEventListener("pointerout", event => {
      if (
        event.target.closest("a, button, [role='button'], input, textarea") &&
        !event.relatedTarget?.closest?.("a, button, [role='button'], input, textarea")
      ) {
        document.body.classList.remove("cursor-hover");
      }
    });

    document.addEventListener("pointerdown", () => {
      document.body.classList.add("cursor-click");
      createRipple();
    });

    document.addEventListener("pointerup", () => {
      document.body.classList.remove("cursor-click");
    });

    document.addEventListener("pointerleave", () => {
      document.body.classList.remove("cursor-visible", "cursor-hover");
    });

    animateCursor();
  }

  initMagicCursor();
})();

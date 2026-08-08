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
      box-shadow:
        0 0 8px var(--glow),
        0 0 18px var(--witch),
        inset 0 0 12px #c6a8ff55;
    }

    .stream-frame::after {
      inset: -35%;
      z-index: 0;
      background: conic-gradient(
        from 0deg,
        transparent 0deg,
        transparent 265deg,
        var(--pink) 292deg,
        var(--glow) 315deg,
        transparent 340deg
      );
      filter: blur(16px);
      animation: stream-neon-spin 5s linear infinite;
    }

    .stream-frame.neon-live {
      border-color: var(--glow);
      box-shadow:
        0 0 8px #c6a8ffcc,
        0 0 22px #8a63d288,
        0 0 46px #8a63d244,
        inset 0 0 18px #c6a8ff33;
      animation: stream-neon-pulse 2.4s ease-in-out infinite;
    }

    .stream-frame.neon-live::before,
    .stream-frame.neon-live::after {
      opacity: 1;
    }

    .stream-frame iframe {
      position: relative;
      z-index: 1;
      pointer-events: none;
    }

    @keyframes stream-neon-pulse {
      0%, 100% { filter: saturate(1); }
      50% { filter: saturate(1.25) brightness(1.06); }
    }

    @keyframes stream-neon-spin {
      to { transform: rotate(360deg); }
    }

    .shooting-star {
      position: absolute;
      z-index: 1;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      opacity: 0;
      background: #fff;
      box-shadow:
        0 0 5px 1px #fff,
        0 0 12px 2px var(--glow),
        0 0 22px 3px var(--witch);
      transform: rotate(135deg);
      animation: shooting-star linear infinite;
    }

    .shooting-star::after {
      position: absolute;
      top: 1px;
      right: 2px;
      width: var(--tail-length, 115px);
      height: 1px;
      content: "";
      background: linear-gradient(90deg, transparent, var(--glow) 55%, #fff);
      box-shadow: 0 0 7px var(--glow);
      transform-origin: right center;
    }

    .shooting-star.gold {
      background: var(--gold);
      box-shadow:
        0 0 5px 1px #fff8d6,
        0 0 12px 2px var(--gold),
        0 0 22px 3px #e0b45caa;
    }

    .shooting-star.gold::after {
      background: linear-gradient(90deg, transparent, var(--gold) 55%, #fff8d6);
    }

    @keyframes shooting-star {
      0% {
        opacity: 0;
        transform: translate3d(0, 0, 0) rotate(135deg) scale(.55);
      }

      8%, 22% {
        opacity: 1;
      }

      38%, 100% {
        opacity: 0;
        transform: translate3d(-390px, 390px, 0) rotate(135deg) scale(1);
      }
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
      to { transform: translate(-50%, -50%) rotateX(68deg) rotate(360deg); }
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

      15%, 80% { opacity: 1; }

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
      50% { transform: translateY(-4px); }
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
      width: 18px;
      height: 18px;
      border: 1px solid var(--pink);
      border-radius: 50%;
      pointer-events: none;
      opacity: 0;
      visibility: hidden;
      will-change: transform, width, height, border-color, box-shadow;
      background: radial-gradient(circle, #fff8 0 8%, var(--pink) 20%, transparent 68%);
      box-shadow:
        0 0 8px var(--pink),
        0 0 18px var(--glow),
        0 0 32px #8a63d288;
      transform: translate(-50%, -50%);
      transition:
        width .35s cubic-bezier(.2, .8, .2, 1),
        height .35s cubic-bezier(.2, .8, .2, 1),
        border-color .35s ease,
        background .35s ease,
        box-shadow .35s ease,
        opacity .25s ease,
        visibility .25s ease;
    }

    .magic-cursor::before,
    .magic-cursor::after {
      position: absolute;
      content: "";
      border-radius: 50%;
      pointer-events: none;
    }

    .magic-cursor::before {
      inset: -8px;
      border: 1px solid var(--glow);
      opacity: .45;
      animation: cursor-aura 2.8s ease-in-out infinite;
    }

    .magic-cursor::after {
      inset: 4px;
      border: 1px solid #fff9;
      opacity: .75;
    }

    .cursor-particle {
      position: fixed;
      z-index: 99997;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      pointer-events: none;
      background: var(--particle-color, var(--glow));
      box-shadow:
        0 0 6px var(--particle-color, var(--glow)),
        0 0 14px var(--particle-color, var(--glow));
      animation: cursor-particle-fade .9s cubic-bezier(.2, .7, .2, 1) forwards;
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
        opacity: .25;
        transform: scale(.86);
      }

      50% {
        opacity: .72;
        transform: scale(1.18);
      }
    }

    @keyframes cursor-particle-fade {
      from {
        opacity: .9;
        transform: translate(-50%, -50%) scale(.7) rotate(0deg);
      }

      45% {
        opacity: .8;
      }

      to {
        opacity: 0;
        transform:
          translate(
            calc(-50% + var(--move-x)),
            calc(-50% + var(--move-y))
          )
          scale(.08)
          rotate(150deg);
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
      width: 34px;
      height: 34px;
      border-color: var(--cursor-hover-color, var(--glow));
      background: radial-gradient(
        circle,
        var(--cursor-hover-color, var(--glow)) 0 8%,
        transparent 58%
      );
      box-shadow:
        0 0 10px var(--cursor-hover-color, var(--glow)),
        0 0 24px var(--glow),
        0 0 46px var(--witch);
    }

    body.cursor-click .magic-cursor {
      width: 12px;
      height: 12px;
      border-color: var(--gold);
      background: radial-gradient(circle, #fff, var(--gold) 35%, transparent 72%);
      box-shadow:
        0 0 12px var(--gold),
        0 0 28px var(--glow),
        0 0 50px var(--pink);
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
      animation: cursor-ripple .72s cubic-bezier(.15, .7, .25, 1) forwards;
    }

    .cursor-ripple::before,
    .cursor-ripple::after {
      position: absolute;
      inset: -6px;
      content: "";
      border: 1px solid var(--pink);
      border-radius: inherit;
      box-shadow: 0 0 12px var(--glow);
      animation: cursor-ripple-ring .72s ease-out forwards;
    }

    .cursor-ripple::after {
      inset: -11px;
      border-color: var(--glow);
      animation-delay: .06s;
    }

    @keyframes cursor-ripple {
      from {
        opacity: 1;
        transform: translate(-50%, -50%) scale(.35);
      }

      to {
        opacity: 0;
        transform: translate(-50%, -50%) scale(3.4);
      }
    }

    @keyframes cursor-ripple-ring {
      from {
        opacity: .9;
        transform: scale(.3) rotate(0deg);
      }

      to {
        opacity: 0;
        transform: scale(1.35) rotate(160deg);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .cauldron-wrap::after,
      .cauldron-orbit-spark,
      .cat-scene::before,
      .footer-signature,
      .magic-cursor::before,
      .stream-frame.neon-live,
      .stream-frame::after {
        animation: none;
      }

      .kick-badge::before,
      .magic-cursor,
      .shooting-star {
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

      .stream-frame::after {
        filter: blur(12px);
      }

      .shooting-star::after {
        width: calc(var(--tail-length, 115px) * .72);
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

  function initShootingStars() {
    const starsContainer = document.querySelector("#stars");

    if (!starsContainer || reduceMotion) return;

    const fragment = document.createDocumentFragment();

    for (let index = 0; index < 7; index++) {
      const shootingStar = document.createElement("span");
      const isGold = index % 4 === 0;

      shootingStar.className = `shooting-star${isGold ? " gold" : ""}`;
      shootingStar.style.top = `${Math.random() * 48 + 2}%`;
      shootingStar.style.left = `${Math.random() * 58 + 42}%`;
      shootingStar.style.animationDuration = `${6 + Math.random() * 7}s`;
      shootingStar.style.animationDelay = `${-Math.random() * 14}s`;
      shootingStar.style.setProperty("--tail-length", `${85 + Math.random() * 75}px`);

      fragment.appendChild(shootingStar);
    }

    starsContainer.appendChild(fragment);
  }

  initShootingStars();

  function initStreamNeon() {
    const streamFrame = document.querySelector("#streamFrame");

    if (!streamFrame) return;

    const syncNeonState = () => {
      streamFrame.classList.toggle(
        "neon-live",
        !streamFrame.hidden &&
        Boolean(streamFrame.querySelector("iframe")?.src)
      );
    };

    syncNeonState();

    const observer = new MutationObserver(syncNeonState);

    observer.observe(streamFrame, {
      attributes: true,
      attributeFilter: ["hidden"]
    });

    const streamEmbed = streamFrame.querySelector("iframe");

    if (streamEmbed) {
      observer.observe(streamEmbed, {
        attributes: true,
        attributeFilter: ["src"]
      });
    }
  }

  initStreamNeon();

  function initMagicCursor() {
    if (!finePointer || reduceMotion) return;

    const cursor = document.createElement("span");
    cursor.className = "magic-cursor";
    document.body.appendChild(cursor);

    let mouseX = innerWidth / 2;
    let mouseY = innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let velocityX = 0;
    let velocityY = 0;
    let lastParticleTime = 0;
    let lastTrailX = mouseX;
    let lastTrailY = mouseY;

    function animateCursor() {
      const previousX = cursorX;
      const previousY = cursorY;

      cursorX += (mouseX - cursorX) * .13;
      cursorY += (mouseY - cursorY) * .13;

      velocityX = cursorX - previousX;
      velocityY = cursorY - previousY;

      cursor.style.transform =
        `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;

      requestAnimationFrame(animateCursor);
    }

    function createParticle(x, y, burst = false) {
      const particle = document.createElement("span");
      const angle = Math.random() * Math.PI * 2;
      const speed = burst
        ? 28 + Math.random() * 48
        : 10 + Math.random() * 24;

      const driftX = Math.cos(angle) * speed + velocityX * (burst ? 1.2 : 2.4);
      const driftY = Math.sin(angle) * speed + velocityY * (burst ? 1.2 : 2.4);
      const isStar = burst || Math.random() > .7;

      particle.className = `cursor-particle${isStar ? " star" : ""}`;
      particle.textContent = isStar ? (Math.random() > .5 ? "✦" : "·") : "";
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.setProperty("--move-x", `${driftX}px`);
      particle.style.setProperty("--move-y", `${driftY}px`);
      particle.style.setProperty(
        "--particle-color",
        Math.random() > .5 ? "var(--glow)" : "var(--pink)"
      );

      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), burst ? 800 : 900);
    }

    function createNaturalTrail() {
      const now = performance.now();
      const distance = Math.hypot(mouseX - lastTrailX, mouseY - lastTrailY);

      if (distance < 5 || now - lastParticleTime < 22) return;

      lastParticleTime = now;
      lastTrailX = mouseX;
      lastTrailY = mouseY;

      createParticle(
        mouseX - velocityX * 1.8,
        mouseY - velocityY * 1.8
      );
    }

    function createRipple() {
      const ripple = document.createElement("span");

      ripple.className = "cursor-ripple";
      ripple.style.left = `${mouseX}px`;
      ripple.style.top = `${mouseY}px`;

      document.body.appendChild(ripple);

      // Daha küçük patlama, fakat daha fazla ve daha sıkı parçacık.
      for (let index = 0; index < 20; index++) {
        createParticle(mouseX, mouseY, true);
      }

      setTimeout(() => ripple.remove(), 800);
    }

    function updateHoverState(target) {
      const element = target?.closest?.(
        "a, button, [role='button'], input, textarea"
      );

      document.body.classList.toggle("cursor-hover", Boolean(element));

      if (!element) {
        document.body.style.removeProperty("--cursor-hover-color");
        return;
      }

      const linkColor = getComputedStyle(element)
        .getPropertyValue("--link-glow")
        .trim();

      document.body.style.setProperty(
        "--cursor-hover-color",
        linkColor || "var(--glow)"
      );
    }

    document.addEventListener("pointermove", event => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      document.body.classList.add("cursor-visible");
      createNaturalTrail();
    });

    document.addEventListener("pointerover", event => {
      updateHoverState(event.target);
    });

    document.addEventListener("pointerout", event => {
      if (!event.relatedTarget) {
        document.body.classList.remove("cursor-hover");
      } else {
        updateHoverState(event.relatedTarget);
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
      document.body.classList.remove(
        "cursor-visible",
        "cursor-hover",
        "cursor-click"
      );
      document.body.style.removeProperty("--cursor-hover-color");
    });

    animateCursor();
  }

  initMagicCursor();
})();

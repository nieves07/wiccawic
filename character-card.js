(() => {
  "use strict";

  const characters = [
    {
      name: "Rhea Thorne",
      age: "26 yaşında",
      location: "Amerika",
      occupation: "Şerif adayı",
      imageUrl: "https://i.hizliresim.com/24uubc81.png",
      avatar: "🐺",
      quote: "Yetkimi korkutmak için değil, güven vermek için kullanacağım.",
      story: `
Rhea Thorne, Amerika'nın Oregon eyaletine bağlı Eugene şehrinde dünyaya geldi.
Babası oto tamircisi, annesi ise halk kütüphanesinde görevliydi. Ailesi ona
dürüst olmayı, çalışmayı ve kendi ayakları üzerinde durmayı öğretti.

Çocukluğundan itibaren arabalara, motorlara ve tamir işlerine ilgi duydu.
Bisiklete binmek, fotoğraf çekmek, uzun araba ve motor sürüşlerine çıkmak,
akrobasi çalışmak ve kum torbasında antrenman yapmak hobileri arasındaydı.

Üniversite eğitimini yarıda bıraktıktan sonra farklı işlerde çalıştı. Eugene'deki
hayatının artık kendisine dar geldiğini hissedince fotoğraf makinesini,
valizlerini ve bir miktar birikimini alarak Sandy Shores'a taşındı.

Kasabada şahit olduğu kazalar, kavgalar ve polis müdahaleleri onu etkiledi.
İnsanların zor anlarında yalnızca izleyen biri olmak istemediğini fark etti.
Bu nedenle Polis Departmanı'na yöneldi.

Rhea polisliği güç sahibi olmak olarak görmez. Ona göre polislik, insanların en
zor anlarında yanında olmak ve yaşadığı kasabaya karşı sorumluluk almaktır.
En büyük amacı adil, güvenilir ve görevini hakkıyla yapan bir polis olmaktır.
`
    },
    {
      name: "Hera Soykan",
      age: "26 yaşında",
      location: "Türkiye",
      occupation: "Gözlemci ve psikoloji meraklısı",
      imageUrl: "https://s3.kngl.gg/knglrp-media/characters/5d8bb04c-3150-4bff-addc-73b4ed1a3595.png",
      avatar: "🖤",
      quote: "İnsanları tanımak için söylediklerinden çok sustuklarına bakarım.",
      story: `
Hera Soykan, İzmir'in Karşıyaka ilçesinde dünyaya geldi. Babası emekli bir
astsubay, annesi ise devlet hastanesinde hemşireydi. Ailesi disiplinli,
kurallara bağlı ve duygularını göstermeyi tercih etmeyen insanlardı.

Hera çocukluğundan beri nesneleri söküp incelemeye ve insanların davranışlarını
gözlemlemeye meraklıydı. Sessiz, başarılı ve disiplinli bir öğrenciydi ancak
insanlarla güçlü duygusal bağlar kurmakta zorlanıyordu.

Üniversitede psikoloji bölümünü seçti. İnsan zihninden çok, insanların neden
kolay yönlendirilebildiğini merak ediyordu. Davranış bilimi, beden dili, adli
psikoloji ve suç psikolojisi üzerine çalıştı ancak eğitimini yarıda bıraktı.

İzmir'de güvenlik görevlisi, teknik servis çalışanı ve gece vardiyalarında
çeşitli işlerde çalıştı. Analog fotoğrafçılık, eski saatleri tamir etmek,
gece yürüyüşleri ve psikoloji kitapları en sevdiği uğraşlardı.

Hera baskı altında paniklemez, duygularını belli etmez ve kararlarını aceleyle
vermez. Siyah deri eldivenleri, titizliği ve düzen takıntısı onun ayrılmaz
özellikleri haline gelmiştir.

İzmir'de çevresindeki insanları çözdüğünü hissettiğinde daha karmaşık ve kaotik
bir hayat arayarak Los Santos'a taşındı. Dışarıdan sakin ve sıradan görünse de
gerçek dünyası sessizlik, gözlem, kontrol ve insan davranışlarını çözmek
üzerine kuruludur.
`
    }
  ];

  const style = document.createElement("style");

  style.textContent = `
    .character-cards {
      position: fixed;
      top: 50%;
      right: 24px;
      z-index: 10;
      display: flex;
      flex-direction: column;
      gap: 14px;
      width: min(320px, calc(100vw - 48px));
      max-height: calc(100vh - 48px);
      transform: translateY(-50%);
    }

    .character-card {
      position: relative;
      width: 100%;
      max-height: calc(50vh - 26px);
      overflow-y: auto;
      overflow-x: hidden;
      padding: 16px;
      color: var(--cream);
      border: 1px solid #c6a8ff66;
      border-radius: 20px;
      background:
        linear-gradient(145deg, #493167e8, #160d25f2 65%),
        var(--plum);
      box-shadow:
        0 0 18px #8a63d255,
        0 0 45px #8a63d222,
        inset 0 0 25px #c6a8ff12;
      backdrop-filter: blur(12px);
      scrollbar-width: none;
      animation: character-card-float 4s ease-in-out infinite;
      transition:
        width .35s ease,
        height .35s ease,
        max-height .35s ease,
        padding .35s ease,
        border-radius .35s ease;
    }

    .character-card::-webkit-scrollbar {
      display: none;
      width: 0;
      height: 0;
    }

    .character-card:nth-child(2) {
      animation-delay: -1.5s;
    }

    .character-card::before {
      position: absolute;
      inset: 0;
      z-index: -1;
      content: "";
      border-radius: inherit;
      background: linear-gradient(
        120deg,
        transparent 20%,
        #c6a8ff18 45%,
        transparent 70%
      );
      background-size: 220% 100%;
      animation: character-card-shine 5s linear infinite;
      pointer-events: none;
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
      border: 1px solid var(--gold);
      border-radius: 15px;
      color: var(--gold);
      background:
        radial-gradient(circle, #8a63d255, transparent 65%),
        #090511aa;
      box-shadow: 0 0 14px #e0b45c55;
      font: inherit;
      font-size: 25px;
      cursor: none;
      transition: .35s ease;
    }

    .character-card__avatar:hover,
    .character-card__avatar:focus-visible {
      border-color: var(--glow);
      box-shadow:
        0 0 14px var(--gold),
        0 0 28px var(--witch);
      transform: scale(1.04);
      outline: none;
    }

    .character-card__avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .character-card__name {
      color: var(--glow);
      font-family: "Eagle Lake", cursive;
      font-size: 21px;
      line-height: 1.2;
      text-shadow: 0 0 10px #8a63d288;
    }

    .character-card__age {
      margin-top: 5px;
      color: var(--mute);
      font-size: 12px;
    }

    .character-card__badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 12px;
      padding: 5px 9px;
      border: 1px solid #8a63d266;
      border-radius: 20px;
      color: var(--glow);
      background: #8a63d222;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: .6px;
      text-transform: uppercase;
    }

    .character-card__badge::before {
      width: 6px;
      height: 6px;
      content: "";
      border-radius: 50%;
      background: var(--gold);
      box-shadow: 0 0 8px var(--gold);
    }

    .character-card__details {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-bottom: 14px;
    }

    .character-card__detail {
      padding: 9px;
      border: 1px solid #c6a8ff22;
      border-radius: 10px;
      background: #09051144;
    }

    .character-card__detail small {
      display: block;
      margin-bottom: 3px;
      color: var(--mute);
      font-size: 10px;
    }

    .character-card__detail strong {
      color: var(--cream);
      font-size: 12px;
    }

    .character-card__quote {
      margin-bottom: 14px;
      padding: 10px 12px;
      border-left: 2px solid var(--gold);
      color: var(--glow);
      background: #e0b45c12;
      font-size: 11px;
      font-style: italic;
      line-height: 1.5;
    }

    .character-card__story {
      border-top: 1px solid #c6a8ff22;
      padding-top: 12px;
    }

    .character-card__story summary {
      cursor: none;
      color: var(--gold);
      font-size: 12px;
      font-weight: 700;
      list-style: none;
      user-select: none;
    }

    .character-card__story summary::-webkit-details-marker {
      display: none;
    }

    .character-card__story summary::before {
      margin-right: 6px;
      content: "✦";
    }

    .character-card__story p {
      margin-top: 10px;
      color: var(--mute);
      font-size: 11px;
      line-height: 1.65;
      white-space: pre-line;
    }

    .character-card.is-collapsed {
      width: 74px;
      height: 74px;
      max-height: 74px;
      overflow: hidden;
      align-self: flex-end;
      padding: 6px;
      border-radius: 20px;
    }

    .character-card.is-collapsed .character-card__header {
      margin: 0;
    }

    .character-card.is-collapsed .character-card__avatar {
      width: 62px;
      height: 62px;
      flex-basis: 62px;
      border-radius: 16px;
    }

    .character-card.is-collapsed .character-card__name,
    .character-card.is-collapsed .character-card__age,
    .character-card.is-collapsed .character-card__badge,
    .character-card.is-collapsed .character-card__details,
    .character-card.is-collapsed .character-card__quote,
    .character-card.is-collapsed .character-card__story {
      display: none;
    }

    @keyframes character-card-float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }

    @keyframes character-card-shine {
      from { background-position: 220% 0; }
      to { background-position: -220% 0; }
    }

    @media (max-width: 1150px) {
      .character-cards {
        position: relative;
        top: auto;
        right: auto;
        width: min(560px, calc(100% - 32px));
        max-height: none;
        margin: 26px auto 0;
        transform: none;
      }

      .character-card {
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
      .character-card::before {
        animation: none;
      }
    }
  `;

  document.head.appendChild(style);

  const container = document.createElement("section");
  container.className = "character-cards";
  container.setAttribute("aria-label", "Karakter kartları");

  function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML;
  }

  function createCharacterCard(character) {
    const card = document.createElement("aside");

    card.className = "character-card is-collapsed";
    card.setAttribute("aria-label", `${character.name} karakter kartı`);

    const avatar = character.imageUrl
      ? `<img src="${escapeHtml(character.imageUrl)}" alt="${escapeHtml(character.name)} karakter görseli">`
      : character.avatar;

    card.innerHTML = `
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
          <small>Uyruk</small>
          <strong>${escapeHtml(character.location)}</strong>
        </div>
      </div>

      <div class="character-card__quote">
        “${escapeHtml(character.quote)}”
      </div>

      <details class="character-card__story">
        <summary>Hikâyeyi oku</summary>
        <p>${escapeHtml(character.story)}</p>
      </details>
    `;

    const avatarButton = card.querySelector(".character-card__avatar");

    avatarButton.addEventListener("click", () => {
      const collapsed = card.classList.toggle("is-collapsed");

      avatarButton.setAttribute(
        "aria-label",
        collapsed
          ? `${character.name} kartını büyüt`
          : `${character.name} kartını küçült`
      );

      avatarButton.title = collapsed
        ? "Kartı büyüt"
        : "Kartı küçült";
    });

    return card;
  }

  characters.forEach(character => {
    container.appendChild(createCharacterCard(character));
  });

  document.body.appendChild(container);
})(); 

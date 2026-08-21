(() => {
  "use strict";

  const KICK_USERNAME = "Wiccawic";
  const videosApi =
    `https://kick.com/api/v2/channels/${KICK_USERNAME.toLowerCase()}/videos`;

  const lastStream = document.querySelector("#lastStream"); 

  if (!lastStream) return;

  function normalizeDateValue(value) {
    if (value === null || value === undefined || value === "") {
      return null;
    }

    if (typeof value === "number" && Number.isFinite(value)) {
      const milliseconds = value < 100000000000 ? value * 1000 : value;
      return new Date(milliseconds);
    }

    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function formatDate(value) {
    const date = normalizeDateValue(value);

    return date
      ? new Intl.DateTimeFormat("tr-TR", {
          dateStyle: "medium",
          timeStyle: "short"
        }).format(date)
      : "Tarih bilgisi bulunamadı";
  }

  function validDate(value) {
    const date = normalizeDateValue(value);
    return date ? date.toISOString() : null;
  }

  function firstValidDate(...values) {
    for (const value of values) {
      const date = validDate(value);

      if (date) return date;
    }

    return null;
  }

  function parseDuration(value, fieldName = "") {
    if (value === null || value === undefined || value === "") {
      return 0;
    }

    if (typeof value === "number" && Number.isFinite(value)) {
      return fieldName.toLowerCase().includes("millisecond")
        ? value / 1000
        : value > 100000
          ? value / 1000
          : value;
    }

    if (typeof value !== "string") return 0;

    if (/^PT/i.test(value)) {
      const match = value.match(
        /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?/i
      );

      if (!match) return 0;

      return (
        Number(match[1] || 0) * 3600 +
        Number(match[2] || 0) * 60 +
        Number(match[3] || 0)
      );
    }

    const parts = value.split(":").map(Number);

    if (parts.every(Number.isFinite)) {
      if (parts.length === 3) {
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
      }

      if (parts.length === 2) {
        return parts[0] * 60 + parts[1];
      }
    }

    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) return 0;

    return fieldName.toLowerCase().includes("millisecond")
      ? numericValue / 1000
      : numericValue > 100000
        ? numericValue / 1000
        : numericValue;
  }

  function getDuration(video, livestream, session) {
    const durationFields = [
      ["duration_seconds", video.duration_seconds],
      ["durationSeconds", video.durationSeconds],
      ["duration_ms", video.duration_ms],
      ["durationMilliseconds", video.durationMilliseconds],
      ["duration", video.duration],
      ["length", video.length],
      ["duration", livestream.duration],
      ["duration_seconds", livestream.duration_seconds],
      ["duration", session.duration]
    ];

    for (const [fieldName, value] of durationFields) {
      const duration = parseDuration(value, fieldName);

      if (duration > 0) return duration;
    }

    return 0;
  }

  function getStreamDates(video) {
    const livestream = video.livestream || video.live_stream || {};
    const session = video.session || {};

    const explicitStartDate = firstValidDate(
      video.started_at,
      video.start_time,
      video.startedAt,
      video.startTime,
      livestream.started_at,
      livestream.start_time,
      livestream.startedAt,
      livestream.startTime,
      session.started_at,
      session.start_time,
      session.startedAt,
      session.startTime
    );

    const explicitEndDate = firstValidDate(
      video.ended_at,
      video.end_time,
      video.finished_at,
      video.completed_at,
      video.stop_time,
      video.endedAt,
      video.endTime,
      video.finishedAt,
      video.completedAt,
      livestream.ended_at,
      livestream.end_time,
      livestream.finished_at,
      livestream.completed_at,
      livestream.endedAt,
      livestream.endTime,
      session.ended_at,
      session.end_time,
      session.finished_at,
      session.completed_at,
      session.endedAt,
      session.endTime
    );

    const createdDate = firstValidDate(
      video.created_at,
      video.createdAt,
      video.published_at,
      video.publishedAt
    );

    const duration = getDuration(video, livestream, session);

    let startDate = explicitStartDate;
    let endDate = explicitEndDate;

    if (!endDate && startDate && duration > 0) {
      const date = new Date(startDate);
      date.setSeconds(date.getSeconds() + duration);
      endDate = date.toISOString();
    }

    /*
     * Kick çoğu zaman VOD'un created_at alanını yayın bittikten
     * sonra oluşturulan video tarihi olarak döndürür.
     */
    if (!endDate && createdDate) {
      endDate = createdDate;
    }

    if (!startDate && endDate && duration > 0) {
      const date = new Date(endDate);
      date.setSeconds(date.getSeconds() - duration);
      startDate = date.toISOString();
    }

    return {
      startDate,
      endDate
    };
  }

  function replaceStartDate(startDate) {
    const walker = document.createTreeWalker(
      lastStream,
      NodeFilter.SHOW_TEXT
    );

    let node;

    while ((node = walker.nextNode())) {
      if (node.nodeValue.includes("🕒")) {
        node.nodeValue = `🕒 Yayın başlangıcı: ${formatDate(startDate)}`;
        return;
      }
    }
  }

  function addEndDate(endDate) {
    let endElement = lastStream.querySelector(".last-stream-end");

    if (!endElement) {
      endElement = document.createElement("div");
      endElement.className = "last-stream-end";
      lastStream.appendChild(endElement);
    }

    endElement.textContent = endDate
      ? `🏁 Yayın bitişi: ${formatDate(endDate)}`
      : "🏁 Yayın bitişi: Tarih bilgisi bulunamadı";
  }

  function renderDates(video) {
    if (!video || !lastStream.classList.contains("visible")) return;

    const { startDate, endDate } = getStreamDates(video);

    if (startDate) {
      replaceStartDate(startDate);
    }

    addEndDate(endDate);
  }

  async function updateStreamDates() {
    try {
      const response = await fetch(videosApi, {
        cache: "no-store"
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      const videos = Array.isArray(data) ? data : data?.data;
      const latestVideo = videos?.[0];

      renderDates(latestVideo);
    } catch (error) {
      console.warn("Yayın tarihleri alınamadı:", error);
    }
  }

  const observer = new MutationObserver(() => {
    if (lastStream.classList.contains("visible")) {
      setTimeout(updateStreamDates, 0);
    }
  });

  observer.observe(lastStream, {
    attributes: true,
    attributeFilter: ["class"]
  });

  updateStreamDates();
})();

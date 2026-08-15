(() => {
  "use strict";

  const KICK_USERNAME = "Wiccawic";
  const videosApi =
    `https://kick.com/api/v2/channels/${KICK_USERNAME.toLowerCase()}/videos`;

  const lastStream = document.querySelector("#lastStream");

  if (!lastStream) return;

  function formatDate(value) {
    const date = new Date(value);

    return value && !Number.isNaN(date.getTime())
      ? new Intl.DateTimeFormat("tr-TR", {
          dateStyle: "medium",
          timeStyle: "short"
        }).format(date)
      : "Tarih bilgisi bulunamadı";
  }

  function validDate(value) {
    if (!value) return null;

    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : value;
  }

  function parseDuration(value) {
    if (typeof value === "number" && Number.isFinite(value)) {
      return value > 100000 ? value / 1000 : value;
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

    if (parts.some(Number.isNaN)) {
      return Number(value) || 0;
    }

    if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }

    if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    }

    return Number(value) || 0;
  }

  function firstValidDate(...values) {
    for (const value of values) {
      const date = validDate(value);

      if (date) return date;
    }

    return null;
  }

  function getStreamDates(video) {
    const livestream = video.livestream || video.live_stream || {};
    const session = video.session || {};

    const startDate = firstValidDate(
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
      session.startTime,
      video.created_at
    );

    const explicitEndDate = firstValidDate(
      video.ended_at,
      video.end_time,
      video.finished_at,
      video.completed_at,
      video.stop_time,
      video.endedAt,
      video.endTime,
      livestream.ended_at,
      livestream.end_time,
      livestream.finished_at,
      livestream.completed_at,
      livestream.endedAt,
      livestream.endTime,
      session.ended_at,
      session.end_time,
      session.endedAt,
      session.endTime
    );

    const duration = parseDuration(
      video.duration ??
      video.duration_seconds ??
      video.durationSeconds ??
      video.length ??
      livestream.duration ??
      livestream.duration_seconds ??
      session.duration
    );

    let endDate = explicitEndDate;

    if (!endDate && startDate && duration > 0) {
      const date = new Date(startDate);
      date.setSeconds(date.getSeconds() + duration);
      endDate = date.toISOString();
    }

    return {
      startDate,
      endDate
    };
  }

  function replaceStartDate(startDate) {
    const textNodes = [];

    const walker = document.createTreeWalker(
      lastStream,
      NodeFilter.SHOW_TEXT
    );

    let node;

    while ((node = walker.nextNode())) {
      textNodes.push(node);
    }

    const dateNode = textNodes.find(node =>
      node.nodeValue.includes("🕒")
    );

    if (dateNode) {
      dateNode.nodeValue = `🕒 Yayın başlangıcı: ${formatDate(startDate)}`;
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

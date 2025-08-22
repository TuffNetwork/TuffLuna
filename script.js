const newsData = [
  {
    title: "Tuff Client 1.1 In Development!",
    preview:
      "Tuff Client 1.1 wil include revamps, significant preformance improvements, ability to go under y0, ViaBlocks, and 1.21 entity support!",
    badge: "Article",
    badgeColor: "#4CAF50",
  },
  {
    title: "Astra 2 is in development",
    preview:
      "A sucessors which will be rewritted from the ground up to be faster, more stable, and more secure.",
    badge: "Article",
    badgeColor: "#4CAF50",
  }
];

function populateNews() {
  const container = document.getElementById("news-container");
  container.innerHTML = "";

  newsData.forEach((item, index) => {
    const newsItem = document.createElement("div");
    newsItem.className = "news-item";
    newsItem.innerHTML = `
                    <div class="news-item-header">
                        <span class="news-badge" style="background: linear-gradient(45deg, ${item.badgeColor}, ${item.badgeColor}aa);">${item.badge}</span>
                    </div>
                    <div class="news-title-text">${item.title}</div>
                    <div class="news-preview">${item.preview}</div>
                `;

    newsItem.addEventListener("click", () => {
      alert(`Opening: ${item.title}\n\n${item.preview}`);
    });

    container.appendChild(newsItem);
  });
}

let currentVersion = "tuff-wasm";

function handleVersionChange() {
  const versionSelect = document.getElementById("version-select");
  const versionDisplay = document.getElementById("version-display");

  if (!versionSelect || !versionDisplay) {
    console.error("Version selector elements not found");
    return;
  }

  const selectedVersion = versionSelect.value;
  currentVersion = selectedVersion;

  const versionText = versionSelect.options[versionSelect.selectedIndex].text;
  versionDisplay.textContent = `Lunar Client ${versionText}`;

  const currentUrl = window.location.href.split("?")[0].split("#")[0];
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set("version", selectedVersion);

  const newUrl = `${currentUrl}?${urlParams.toString()}`;
  window.history.pushState({}, "", newUrl);

  versionSelect.style.transform = "scale(1.05)";
  versionSelect.style.borderColor = "#00ff88";
  versionSelect.style.boxShadow = "0 0 20px rgba(0, 255, 136, 0.6)";

  setTimeout(() => {
    versionSelect.style.transform = "";
    versionSelect.style.borderColor = "#00ff88";
    versionSelect.style.boxShadow = "";
  }, 200);

  showVersionNotification(versionText);

  console.log("Version changed to:", selectedVersion, versionText);
}

function showVersionNotification(versionText) {
  const existingNotifications = document.querySelectorAll(
    ".version-notification"
  );
  existingNotifications.forEach((n) => n.remove());

  const notification = document.createElement("div");
  notification.className = "version-notification";
  notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(45deg, #00ff88, #00cc6a);
                color: white;
                padding: 15px 20px;
                border-radius: 12px;
                font-weight: bold;
                z-index: 1000;
                transform: translateX(100%);
                opacity: 0;
                transition: all 0.3s ease-out;
                box-shadow: 0 10px 25px rgba(0, 255, 136, 0.3);
            `;
  notification.innerHTML = `✅ Version switched to ${versionText}`;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = "translateX(0)";
    notification.style.opacity = "1";
  }, 50);

  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    notification.style.opacity = "0";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

function launch() {
  const btn = event.target.closest(".launch-btn");
  const versionSelect = document.getElementById("version-select");

  if (!btn || !versionSelect) {
    console.error("Launch elements not found");
    return;
  }

  const selectedVersion = versionSelect.value || "tuff-wasm";
  const selectedOption = Array.from(versionSelect.options).find(
    (opt) => opt.value === selectedVersion
  );
  const versionText = selectedOption ? selectedOption.text : "tuff-wasm";

  btn.innerHTML = "Loading...";
  btn.disabled = true;

  const urlParams = new URLSearchParams(window.location.search);

  setTimeout(() => {
    window.location.href = `versions/${selectedVersion}`;
  }, 2000);
}

document.addEventListener("DOMContentLoaded", () => {
  populateNews();
  setInterval(updateOnlineCount, 10000);

  setTimeout(() => {
    const versionSelect = document.getElementById("version-select");
    const versionDisplay = document.getElementById("version-display");

    if (versionSelect && versionDisplay) {
      versionSelect.removeEventListener("change", handleVersionChange);

      versionSelect.addEventListener("change", function (e) {
        console.log("Dropdown changed to:", e.target.value);
        handleVersionChange();
      });

      const urlParams = new URLSearchParams(window.location.search);
      const versionParam = urlParams.get("version");

      if (
        versionParam &&
        Array.from(versionSelect.options).some(
          (opt) => opt.value === versionParam
        )
      ) {
        versionSelect.value = versionParam;
        currentVersion = versionParam;
        const selectedOption =
          versionSelect.options[versionSelect.selectedIndex];
        versionDisplay.textContent = `Lunar Client ${selectedOption.text}`;
      } else {
      }
    }
  }, 100);
});

document.querySelectorAll(".game-btn").forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    btn.style.boxShadow = "0 10px 25px rgba(0, 255, 136, 0.3)";
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.boxShadow = "";
  });
});

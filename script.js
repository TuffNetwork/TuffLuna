const newsData = [
  {
    title: "New Minecraft Update 1.21.8 Available",
    preview:
      "Experience enhanced cave generation, new biomes, and improved multiplayer stability. Perfect for Lunar Client optimization.",
    date: "2 hours ago",
    badge: "Update",
    badgeColor: "#4CAF50",
  },
  {
    title: "Lunar Client Performance Boost",
    preview:
      "Latest client update improves FPS by up to 40% and reduces memory usage. Automatic mod optimization included.",
    date: "1 day ago",
    badge: "Performance",
    badgeColor: "#2196F3",
  },
  {
    title: "Weekly Tournament Announced",
    preview:
      "Join thousands of players in our weekly PvP tournament. Prize pool of $5,000 and exclusive cosmetics available.",
    date: "2 days ago",
    badge: "Event",
    badgeColor: "#FF9800",
  },
  {
    title: "Security Patch Released",
    preview:
      "Important security improvements and bug fixes. Auto-update recommended for all users running previous versions.",
    date: "3 days ago",
    badge: "Security",
    badgeColor: "#F44336",
  },
  {
    title: "New Mod Support Added",
    preview:
      "Extended compatibility with popular mods including OptiFine alternatives and shader packs. Better mod management tools.",
    date: "5 days ago",
    badge: "Feature",
    badgeColor: "#9C27B0",
  },
  {
    title: "Server Maintenance Complete",
    preview:
      "All servers are back online with improved stability and reduced latency. Thank you for your patience during the maintenance window.",
    date: "1 week ago",
    badge: "Maintenance",
    badgeColor: "#607D8B",
  },
  {
    title: "Halloween Event Live Now",
    preview:
      "Spooky cosmetics, special game modes, and limited-time rewards are now available. Event runs until November 2nd.",
    date: "1 week ago",
    badge: "Event",
    badgeColor: "#FF6600",
  },
  {
    title: "Anti-Cheat System Updated",
    preview:
      "Enhanced detection algorithms and improved reporting system. Fair play is our top priority for all players.",
    date: "10 days ago",
    badge: "Security",
    badgeColor: "#F44336",
  },
  {
    title: "Community Spotlight: Best Builds",
    preview:
      "Check out the most impressive builds from our community this month. Featured creators receive special recognition badges.",
    date: "2 weeks ago",
    badge: "Community",
    badgeColor: "#9C27B0",
  },
  {
    title: "Mobile App Beta Testing",
    preview:
      "Sign up for early access to the Lunar Client mobile companion app. Monitor stats, chat with friends, and more on the go.",
    date: "2 weeks ago",
    badge: "Beta",
    badgeColor: "#FF9800",
  },
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
                        <span class="news-date">${item.date}</span>
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

// ====== 读取与官网共用的 update.json，显示最新版本号 ======
// 该文件随网站一起放在 GitHub Pages（与 index.html 同级），
// 因此用相对路径 ./update.json 即可，无需写死用户名。

document.getElementById("year").textContent = new Date().getFullYear();

async function loadLatestVersion() {
  try {
    const res = await fetch("./update.json", { cache: "no-store" });
    if (!res.ok) return;
    const data = await res.json();
    const v = (data.version || "").replace(/^v/i, "");
    if (v) {
      document.getElementById("latest-version").textContent  = "v" + v;
      document.getElementById("latest-version-2").textContent = "v" + v;
    }
    if (data.date) {
      document.getElementById("latest-date").textContent = data.date;
    }
  } catch (e) {
    // 读取失败不影响页面，沿用默认占位文案
  }
}

loadLatestVersion();

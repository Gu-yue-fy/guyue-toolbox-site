// ====== 年份 ======
document.getElementById("year").textContent = new Date().getFullYear();

// ====== 滚动入场动画 ======
(function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach((e) => e.classList.add("visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((e) => io.observe(e));
})();

// ====== 读取与官网共用的 update.json ======
async function loadUpdate() {
  try {
    const res = await fetch("./update.json", { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

// ====== 读取更新日志 ======
async function loadChangelog() {
  try {
    const res = await fetch("./changelog.json", { cache: "no-store" });
    if (!res.ok) return [];
    const d = await res.json();
    return Array.isArray(d) ? d : [];
  } catch (e) {
    return [];
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}

function renderChangelog(list) {
  const box = document.getElementById("changelog-list");
  if (!box) return;
  if (!list.length) {
    box.innerHTML = '<p class="center-sub small">暂无更新记录。</p>';
    return;
  }
  box.innerHTML = list
    .map((e) => {
      const v = (e.version || "").replace(/^v/i, "");
      const tag = e.latest ? '<span class="cl-tag">最新</span>' : "";
      const items =
        Array.isArray(e.items) && e.items.length
          ? '<ul class="cl-items">' +
            e.items.map((i) => `<li>${escapeHtml(i)}</li>`).join("") +
            "</ul>"
          : e.notes
          ? `<p class="cl-title">${escapeHtml(e.notes)}</p>`
          : "";
      const title = e.title ? `<div class="cl-title">${escapeHtml(e.title)}</div>` : "";
      return `<div class="changelog-item">
        <div class="cl-head">
          <span class="cl-ver"><a href="https://github.com/Gu-yue-fy/guyue-toolbox/releases/tag/v${v}" target="_blank" rel="noopener">v${v}</a></span>
          <span class="cl-date">${escapeHtml(e.date || "")}</span>
          ${tag}
        </div>
        ${title}
        ${items}
      </div>`;
    })
    .join("");
}

// ====== 主流程 ======
(async function () {
  const upd = await loadUpdate();
  if (upd) {
    const v = (upd.version || "").replace(/^v/i, "");
    if (v) {
      const v1 = document.getElementById("latest-version");
      if (v1) v1.textContent = "v" + v;
      const v2 = document.getElementById("latest-version-2");
      if (v2) v2.textContent = "v" + v;
    }
    if (upd.date) {
      const d = document.getElementById("latest-date");
      if (d) d.textContent = upd.date;
    }
    if (upd.url) {
      const btn = document.getElementById("dl-btn");
      if (btn) {
        btn.href = upd.url;
        btn.target = "_blank";
        btn.rel = "noopener";
      }
      const ext = document.getElementById("dl-ext");
      if (ext && v) ext.textContent = `.exe · 免费下载 v${v}`;
    }
  }
  const cl = await loadChangelog();
  renderChangelog(cl);
})();

// ====== 移动端汉堡菜单 ======
(function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  if (!toggle || !links) return;
  function setOpen(open) {
    links.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }
  toggle.addEventListener("click", () => setOpen(!links.classList.contains("open")));
  links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") setOpen(false);
  });
  document.addEventListener("click", (e) => {
    if (!links.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
  });
})();

// ====== 导航滚动高亮（scroll-spy） ======
(function initScrollSpy() {
  const links = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  if (!links.length) return;
  const map = new Map();
  links.forEach((a) => {
    const id = a.getAttribute("href").slice(1);
    const sec = document.getElementById(id);
    if (sec) map.set(sec, a);
  });
  const sections = Array.from(map.keys());
  if (!sections.length || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          links.forEach((a) => a.classList.remove("active"));
          const target = map.get(en.target);
          if (target) target.classList.add("active");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((s) => io.observe(s));
})();

// ====== 返回顶部 ======
(function initToTop() {
  const btn = document.getElementById("to-top");
  if (!btn) return;
  const onScroll = () => {
    btn.classList.toggle("show", window.scrollY > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
})();

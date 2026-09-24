# 古月工具包 GuyueBox 官网（站点仓库）

本仓库是**官网静态站点**，由 **GitHub Pages** 免费托管，地址：
👉 https://gu-yue-fy.github.io/guyue-toolbox-site/

它与工具包仓库 `guyue-toolbox` 分离：本站只负责展示与版本清单，安装包仍由工具包仓库的 Releases 分发。

## 目录内容

```
guyue-toolbox-site/
├─ index.html            # 落地页（介绍 / 功能 / 使用 / 下载 / 更新日志 / 常见问题）
├─ 404.html             # GitHub Pages 自定义 404 页
├─ assets/
│  ├─ css/style.css
│  ├─ img/screenshot-main.png   # 首屏真实界面截图（同时用作 og:image）
│  └─ js/main.js                # 加载 update.json / changelog.json，渲染版本号与更新日志
├─ update.json          # 版本清单副本（与 toolkit 仓库根目录内容一致）
├─ changelog.json       # 更新日志数据源（官网「更新日志」区块渲染自这里）
├─ robots.txt / sitemap.xml
├─ LICENSE
└─ .gitignore
```

## 版本清单 update.json

客户端 `UpdateChecker` 读取的字段为 **version / url / sha256 / notes**，并对安装包做**强制 SHA256 校验**。

- 单一真值在**工具包仓库根目录**的 `update.json`；
- 本仓库的 `update.json` 是回退副本（官网 JS 先读远程、失败再读本地），内容需与前者保持一致。

## 发版时的同步操作

1. 工具包仓库：上传新 exe 到对应 Release，更新根目录 `update.json`；
2. 本仓库：同步 `update.json`，并在 `changelog.json` 头部插入新版本条目（旧版 `latest` 置 false）；
3. 两个仓库分别提交推送，GitHub Pages 约 1–2 分钟生效。

## 本地预览

用任意静态服务器打开即可（直接双击 `index.html` 时 fetch 的 JSON 会被浏览器拦下，版本号显示为默认值，不影响布局）：

```
python -m http.server 8000
```

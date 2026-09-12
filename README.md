# 古月工具箱 GuyueBox 官网（站点仓库）

本仓库是**官网静态站点**，由 **GitHub Pages** 免费托管，地址：
👉 https://Gu-yue-fy.github.io/guyue-toolbox-site/

它与工具包仓库 `guyue-toolbox` 分离：本站只负责展示与版本清单，安装包仍由工具包仓库的 Releases 分发。

## 目录内容

```
guyue-toolbox-site/
├─ index.html            # 落地页（首页 / 功能 / 为什么选 / 模块 / 使用 / 下载 / FAQ）
├─ assets/
│  ├─ css/style.css
│  └─ js/main.js         # 读取 ./update.json 显示最新版本号
├─ update.json           # 版本清单（官网与客户端 UpdateChecker 共用）
├─ LICENSE
└─ .gitignore
```

## 部署到 GitHub Pages

1. 在 GitHub 新建仓库 `guyue-toolbox-site`（公开）；
2. 把本目录内容推上去（`main` 分支）；
3. 仓库 **Settings → Pages → Build and deployment → Source 选 Deploy from a branch**，
   分支选 `main`、目录选 **/ (root)**，保存；
4. 约 1 分钟后访问 https://Gu-yue-fy.github.io/guyue-toolbox-site/ 。

> 注意：Pages 是静态站，每次修改 `update.json` / 页面后需重新推送；Pages 一般会自动重建。

## 版本清单 update.json

```json
{
  "version": "1.0.0",
  "date": "2026-09-12",
  "notes": "首个公开版本发布。",
  "releasePage": "https://github.com/Gu-yue-fy/guyue-toolbox/releases",
  "assets": {
    "win": "https://github.com/Gu-yue-fy/guyue-toolbox/releases/download/v1.0.0/古月工具箱_setup.exe"
  }
}
```

客户端 `UpdateChecker.cs` 读取的正是本仓库根目录下的 `update.json`，因此**发版时只改这一个文件 + 上传安装包到工具包仓库**，官网版本号与软件更新提示即同步。

## 本地预览

直接用浏览器打开 `index.html` 即可（版本号需通过 HTTP 访问 `update.json`，本地双击打开若读不到版本号属正常，不影响页面布局）。

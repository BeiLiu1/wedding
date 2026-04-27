# 💍 婚礼电子邀请函 Wedding Invitation

一个精致的手机端婚礼电子邀请函，支持全屏滚动切换、背景音乐播放、宾客签到等功能。

## 快速开始

```bash
npm install
npm run dev
```

浏览器打开 http://localhost:3000（推荐使用手机模式预览）

## 自定义内容

### 1. 修改婚礼信息

编辑 `app/page.tsx` 顶部的常量：

```ts
const GROOM = '张三'            // 新郎姓名
const BRIDE = '李四'            // 新娘姓名
const WEDDING_DATE_SOLAR = '2025年10月1日 星期三'
const WEDDING_DATE_LUNAR = '农历八月十九 12:00 PM'
const VENUE_NAME = 'XX大酒店 · 宴会厅'
const VENUE_ADDRESS = 'XX省XX市XX区XX路XX号'
```

### 2. 添加照片

将照片放到 `public/images/` 目录下，然后在 `app/page.tsx` 中：

- **封面照片**：替换 Section 1 中的占位区域为 `<img src="/images/couple-cover.png" />`
  - 推荐使用 **PNG 透明背景抠图**，效果最佳
- **婚纱照**：替换 Section 3 中的占位区域为 `<img src="/images/couple-detail.jpg" />`
- **地图截图**：替换 Section 3 中地图占位为实际地图截图

### 3. 添加背景音乐

将 MP3 文件放到 `public/music/bgm.mp3`

### 4. 修改色彩主题

编辑 `tailwind.config.ts` 中的 `wedding` 颜色配置，以及 `app/globals.css` 中的 CSS 变量。

## 项目结构

```
├── app/
│   ├── layout.tsx      # 根布局 & meta 信息
│   ├── globals.css     # 全局样式 & 动画
│   └── page.tsx        # 主页面（4 个全屏区域）
├── public/
│   ├── images/         # 婚纱照片
│   └── music/          # 背景音乐 (bgm.mp3)
├── tailwind.config.ts  # Tailwind 主题配置
└── package.json
```

## 功能特性

- 📱 手机端优先，全屏滚动切换（scroll-snap）
- 🎵 右上角旋转碟片音乐播放器
- ❤️ 滚动进入动画（IntersectionObserver）
- 📝 宾客签到表单（localStorage 存储）
- 🎨 红色婚礼主题，统一色彩体系
- 🀄 中式双喜元素

## 技术栈

Next.js 14 + React 18 + TailwindCSS + TypeScript + Lucide Icons

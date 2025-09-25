# 🎬 Movie Aggregator (Cloudflare + Upstash)

## ✨ 特性
- Netflix 风格聚合播放器
- 多源搜索 & 自动切换
- 收藏 / 历史 / 播放进度 / 云端账号
- Cloudflare Workers/Pages 部署
- Upstash Redis 云存储

## 🚀 部署步骤

### 1. Cloudflare + Upstash
- 注册 [Upstash](https://upstash.com/) 获取 `UPSTASH_REDIS_REST_URL` 和 `UPSTASH_REDIS_REST_TOKEN`
- 在 Cloudflare Dashboard → Pages/Workers → 设置环境变量：
  - `UPSTASH_REDIS_REST_URL`
  - `UPSTASH_REDIS_REST_TOKEN`
  - `JWT_SECRET`

### 2. 本地构建
```bash
npm install
npm run build
npx wrangler deploy
```

### 3. GitHub Actions 自动化
推送到 GitHub，触发 `.github/workflows/deploy-cloudflare.yml`，自动部署到 Cloudflare。

---
MIT License

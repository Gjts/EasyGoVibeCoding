# deploy

当前主部署入口不在本目录。

实际部署链路：

- 前端：`src/frontend/EasyGoVibeCoding`
- 构建：`pnpm build`
- Pages 部署：`pnpm pages:deploy`
- Cloudflare Pages Functions：`src/frontend/EasyGoVibeCoding/functions/api`
- 模型动态 Worker：`src/backend/model-updater`

本目录仅保留为未来集中放置部署脚本或环境说明的占位目录。新增部署配置时，应同步更新根目录 `README.md` 和前端 `CLOUDFLARE_DEPLOY.md`。

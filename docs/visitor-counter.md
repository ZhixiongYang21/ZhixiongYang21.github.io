# 页脚访客统计

已接入你创建的 Histats 计数器：站点 ID `5049707`，计数器 ID `7412113`。
显示你在后台选择的 **今日访客数（vis.today）** 和 **累计访客数（visitors）**。
沿用后台生成的灰白色样式和嵌入代码，不需要 Google 服务账号或 GitHub Secrets。

## 如何上线

1. 将本次工程修改提交并推送到 GitHub 的 `main` 分支。
2. 等 GitHub Pages 部署成功，打开 `https://zhixiongyang21.github.io/` 并滚动到底部。
3. 如未显示，先检查网络和广告拦截扩展是否阻止了 Histats；也可以在 Histats 控制面板检查是否收到访问。

代码已接入不等于已经发布；本次不会自动提交或推送仓库。

## 统计口径与隐私

- 初始值保持 0，只累计接入之后的访问，不能补回未曾记录的历史访客。
- 人数按 Histats 的访客识别规则估算，不等于精确的真人数，也不是浏览次数。
- 在 Histats 的 Website Account 中确认时区为北京时间（UTC+08:00），以便按北京时间划分“今日”。
- Histats 是第三方统计服务；页脚已注明统计提供方，并链接到其隐私政策。完整后台报表可保持私有。
- 不在本地伪造计数；服务被拦截或不可用时，数字可能无法显示。

## 后续维护

- 嵌入代码：`_includes/histats-counter.html`。需要换样式时，从 Histats 重新生成代码并替换此文件中的官方片段。
- 总开关：`_config.yml` 中的 `histats_enabled`；设为 `false` 可关闭页脚统计。
- 仅生产构建（`JEKYLL_ENV=production`）启用；普通本地预览不加载 Histats，避免测试访问进入正式统计。页面设置 `analytics: false` 时也不加载。
- 原 Google Analytics 埋点保持不变；旧 GA4 页脚取数逻辑已移除，导出工作流只保留手动运行入口。

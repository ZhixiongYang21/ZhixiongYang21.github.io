# 页脚访客统计

已接入你创建的 Histats 计数器：站点 ID `5049707`，计数器 ID `7412113`。
显示你在后台选择的 **今日访客数** 和 **累计访客数**。
页脚使用与正文相同的字体，显示为 `Total visitors … · Today …`。
原始 Histats 代码保持不变，仅隐藏它自带的灰色图形计数器，不需要 Google 服务账号或 GitHub Secrets。

## 如何上线

1. 将本次工程修改提交并推送到 GitHub 的 `main` 分支。
2. 等 GitHub Pages 部署成功，打开 `https://zhixiongyang21.github.io/` 并滚动到底部。
3. 初次加载时会短暂显示 `—`。如果部署后一直不更新，先强制刷新（Windows：Ctrl+F5），排除旧脚本/样式缓存；再检查网络和广告拦截扩展是否阻止了 Histats。

代码已接入不等于已经发布；本次不会自动提交或推送仓库。

## 统计口径与隐私

- 初始值保持 0，只累计接入之后的访问，不能补回未曾记录的历史访客。
- 人数按 Histats 的访客识别规则估算，不等于精确的真人数，也不是浏览次数。
- 在 Histats 的 Website Account 中确认时区为北京时间（UTC+08:00），以便按北京时间划分“今日”。
- Histats 是第三方统计服务；完整后台报表可保持私有。[服务隐私说明](https://www.histats.com/?act=5)。按你的要求，页脚不再展示品牌说明链接。
- 不在本地伪造计数；服务被拦截或不可用时，显示 `—`，不会用假数字或旧缓存代替。

## 后续维护

- 嵌入代码：`_includes/histats-counter.html`。保留原片段即可，不需要再去后台换计数器皮肤。
- 页脚样式：`_sass/_site-footer.scss`；数字读取：`assets/js/site-refresh.js` 的 `initVisitorStats()`。
- 页面只读取本次 Histats 加载所得的 `Histats.s_asc2[3]`（今日访客）和 `[4]`（累计访客），并核对站点 ID；不会额外调用统计接口，也不会重复计数。最多等待 30 秒。
- 这是对当前 Histats 脚本运行时数据的适配，不是官方承诺稳定的 JSON API。如果服务以后更改字段，需要更新适配；格式不符时保持 `—`。
- 主样式和 `site-refresh.js` 的地址带有构建时间版本号，防止发布新 HTML 后浏览器仍使用旧的脚本或样式。
- 总开关：`_config.yml` 中的 `histats_enabled`；设为 `false` 可关闭页脚统计。
- 仅生产构建（`JEKYLL_ENV=production`）启用；普通本地预览不加载 Histats，避免测试访问进入正式统计。页面设置 `analytics: false` 时也不加载。
- 原 Google Analytics 埋点保持不变；旧 GA4 页脚取数逻辑已移除，导出工作流只保留手动运行入口。

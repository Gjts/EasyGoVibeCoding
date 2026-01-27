import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, GraduationCap, Globe, BarChart3, CheckCircle2, AlertTriangle, Zap, Code, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

const chapters = [
  { title: "实践篇概述", href: "/practice" },
  { title: "文科生 / 商科生项目", href: "/practice/humanities" },
  { title: "理工科学生项目", href: "/practice/engineering" },
  { title: "职场人士项目", href: "/practice/professional" },
  { title: "核心技能：AI Agent 开发", href: "/practice/agent" },
  { title: "核心技能：全栈项目实战", href: "/practice/fullstack" },
  { title: "核心技能：工具与效率", href: "/practice/efficiency" },
]

export default function HumanitiesPage() {
  return (
    <CourseLayout
      title="实践篇"
      description="项目实战"
      chapters={chapters}
      currentChapter="文科生 / 商科生项目"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 1 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          文科生 / 商科生项目
        </h1>
        <p className="text-lg text-muted-foreground">
          适合零基础用户的入门项目，通过可视化工具和AI辅助，快速完成个人作品，体验AI编程的魅力和效率。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Project 1: 个人博客网站 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Globe className="h-6 w-6 text-primary" />
            项目1：个人博客网站
          </h2>
          
          {/* 项目概述 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">项目概述</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">1</span>
                <div>
                  <strong className="text-foreground">项目目标</strong>：创建一个美观的个人博客网站，展示文章、支持搜索和分类
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">2</span>
                <div>
                  <strong className="text-foreground">工具栈</strong>：v0（UI生成）+ Cursor（功能完善）+ Vercel（部署）
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">3</span>
                <div>
                  <strong className="text-foreground">时间估算</strong>：4-6小时（包含学习和调试时间）
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">4</span>
                <div>
                  <strong className="text-foreground">难度等级</strong>：入门级（适合零基础用户）
                </div>
              </div>
            </div>
          </div>

          {/* 技术选型分析 */}
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5 mb-6">
            <h3 className="font-semibold text-foreground mb-4">技术选型分析：为什么选择这个工具组合？</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">v0：UI生成的革命性工具</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>自然语言到UI</strong>：用文字描述就能生成React组件，零基础用户也能快速上手</li>
                  <li>• <strong>即时预览</strong>：实时看到生成效果，快速迭代设计</li>
                  <li>• <strong>Figma集成</strong>：可以直接从Figma设计稿生成代码，设计师友好</li>
                  <li>• <strong>学习成本低</strong>：不需要学习HTML/CSS，专注于内容表达</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Cursor：AI辅助的功能完善</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>代码理解</strong>：AI能理解v0生成的代码结构，便于后续修改</li>
                  <li>• <strong>功能扩展</strong>：添加搜索、分类、评论等功能，AI辅助生成代码</li>
                  <li>• <strong>错误修复</strong>：遇到问题可以直接问AI，快速解决</li>
                  <li>• <strong>代码优化</strong>：AI可以优化代码性能，添加最佳实践</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Vercel：零配置部署</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>一键部署</strong>：连接GitHub仓库，自动部署，无需服务器配置</li>
                  <li>• <strong>免费额度</strong>：个人项目免费使用，适合学习</li>
                  <li>• <strong>全球CDN</strong>：自动优化访问速度，用户体验好</li>
                  <li>• <strong>预览环境</strong>：每次提交都有预览链接，方便测试</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50 mt-4">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">工具协同效应</strong>：v0负责快速生成UI，Cursor负责功能完善和优化，Vercel负责部署和托管。这个组合让零基础用户也能在几小时内完成一个完整的Web项目，体验从想法到上线的完整流程。
                </p>
              </div>
            </div>
          </div>

          {/* 详细步骤 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">详细步骤</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-foreground mb-3">Step 1: 使用v0生成博客首页（30-45分钟）</h4>
                <div className="space-y-2 text-sm text-muted-foreground ml-4">
                  <p>1. 访问 v0.dev，注册/登录账号</p>
                  <p>2. 在输入框中描述你的博客首页需求：</p>
                  <div className="p-3 rounded-lg bg-secondary/50 font-mono text-xs">
                    "创建一个现代风格的个人博客首页，包含：<br/>
                    - 顶部导航栏（首页、关于、文章）<br/>
                    - 英雄区域（大标题、简介、CTA按钮）<br/>
                    - 最新文章列表（卡片式布局，显示标题、摘要、日期）<br/>
                    - 页脚（社交媒体链接、版权信息）<br/>
                    使用深色主题，配色方案：深蓝+白色+金色"
                  </div>
                  <p>3. v0会生成多个设计方案，选择你喜欢的版本</p>
                  <p>4. 点击"Export"导出代码到本地</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-3">Step 2: 使用Cursor完善功能和样式（2-3小时）</h4>
                <div className="space-y-2 text-sm text-muted-foreground ml-4">
                  <p>1. 在Cursor中打开导出的项目</p>
                  <p>2. 使用Cursor Agent模式，告诉AI你的需求：</p>
                  <div className="p-3 rounded-lg bg-secondary/50 font-mono text-xs">
                    "帮我添加以下功能：<br/>
                    - 文章详情页（从列表点击进入）<br/>
                    - 文章分类功能（技术、生活、思考）<br/>
                    - 搜索功能（搜索文章标题和内容）<br/>
                    - 响应式设计（移动端适配）"
                  </div>
                  <p>3. Cursor会生成代码，你可以实时预览效果</p>
                  <p>4. 根据预览结果，继续优化和调整</p>
                  <p>5. 添加Markdown支持，让文章内容更丰富</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-3">Step 3: 配置Vercel部署（15-30分钟）</h4>
                <div className="space-y-2 text-sm text-muted-foreground ml-4">
                  <p>1. 在GitHub创建新仓库，推送代码</p>
                  <p>2. 访问 vercel.com，使用GitHub账号登录</p>
                  <p>3. 点击"New Project"，选择你的仓库</p>
                  <p>4. Vercel会自动检测项目类型（Next.js），点击"Deploy"</p>
                  <p>5. 等待部署完成（通常1-2分钟）</p>
                  <p>6. 获得你的博客网址，分享给朋友！</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-3">Step 4: 添加内容管理功能（1-2小时）</h4>
                <div className="space-y-2 text-sm text-muted-foreground ml-4">
                  <p>1. 使用Cursor添加文章管理功能：</p>
                  <div className="p-3 rounded-lg bg-secondary/50 font-mono text-xs">
                    "创建一个简单的文章管理系统：<br/>
                    - 文章数据存储在JSON文件中<br/>
                    - 支持添加、编辑、删除文章<br/>
                    - 文章包含：标题、内容、分类、日期、封面图"
                  </div>
                  <p>2. 或者集成CMS服务（如Contentful、Sanity）</p>
                  <p>3. 添加图片上传功能（使用Cloudinary或Vercel Blob）</p>
                </div>
              </div>
            </div>
          </div>

          {/* 代码示例 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">关键代码示例</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">文章列表组件（v0生成后优化）</h4>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                  <pre>{`// app/blog/page.tsx
import { articles } from '@/data/articles'

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">我的博客</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <article key={article.id} className="border rounded-lg p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
            <p className="text-muted-foreground mb-4">{article.excerpt}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{article.date}</span>
              <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                {article.category}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}`}</pre>
                </div>
              </div>
            </div>
          </div>

          {/* 常见问题 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              常见问题与解决方案
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">问题1：v0生成的代码无法运行</h4>
                <p className="ml-4">解决方案：检查Node.js版本（需要18+），运行 <code className="bg-secondary/50 px-1 rounded">npm install</code> 安装依赖，查看终端错误信息，使用Cursor AI帮助修复。</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">问题2：样式显示不正确</h4>
                <p className="ml-4">解决方案：确保Tailwind CSS配置正确，检查 <code className="bg-secondary/50 px-1 rounded">tailwind.config.js</code> 文件，使用Cursor询问AI如何修复样式问题。</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">问题3：Vercel部署失败</h4>
                <p className="ml-4">解决方案：检查构建日志，常见原因包括：环境变量未配置、依赖版本冲突、构建命令错误。在Cursor中询问AI如何解决具体的构建错误。</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">问题4：文章内容更新困难</h4>
                <p className="ml-4">解决方案：考虑使用Headless CMS（如Contentful、Sanity），或者使用GitHub作为内容存储，通过Git提交更新文章。</p>
              </div>
            </div>
          </div>

          {/* 项目检查清单 */}
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              项目检查清单
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>博客首页设计完成，包含导航、英雄区域、文章列表</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>文章详情页功能正常，可以点击查看文章</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>文章分类功能实现，可以按分类筛选</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>搜索功能正常，可以搜索文章标题和内容</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>响应式设计完成，移动端显示正常</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>网站已部署到Vercel，可以正常访问</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>至少添加3篇示例文章，内容完整</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>代码已提交到GitHub，包含README说明</span>
              </div>
            </div>
          </div>
        </section>

        {/* Project 2: 数据分析仪表板 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            项目2：数据分析仪表板
          </h2>
          
          {/* 项目概述 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">项目概述</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">1</span>
                <div>
                  <strong className="text-foreground">项目目标</strong>：创建一个数据分析仪表板，可视化展示业务数据，支持多维度分析
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">2</span>
                <div>
                  <strong className="text-foreground">工具栈</strong>：Fabric（数据处理）+ Cursor（可视化组件）
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">3</span>
                <div>
                  <strong className="text-foreground">时间估算</strong>：6-8小时（包含数据准备和可视化设计）
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">4</span>
                <div>
                  <strong className="text-foreground">难度等级</strong>：入门到中级（需要基本的数据理解能力）
                </div>
              </div>
            </div>
          </div>

          {/* 技术选型分析 */}
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5 mb-6">
            <h3 className="font-semibold text-foreground mb-4">技术选型分析：为什么选择Fabric + Cursor？</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Fabric：AI驱动的数据处理</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>自然语言处理</strong>：用文字描述数据处理需求，AI自动生成处理逻辑</li>
                  <li>• <strong>Patterns系统</strong>：使用预定义的数据处理模式，快速完成常见任务</li>
                  <li>• <strong>多格式支持</strong>：支持CSV、JSON、Excel等多种数据格式</li>
                  <li>• <strong>数据清洗</strong>：自动识别和处理缺失值、异常值</li>
                  <li>• <strong>统计分析</strong>：快速生成描述性统计、相关性分析等</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Cursor：可视化组件开发</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>组件生成</strong>：AI辅助生成图表组件，集成Recharts、Chart.js等库</li>
                  <li>• <strong>交互设计</strong>：添加筛选、排序、钻取等交互功能</li>
                  <li>• <strong>响应式布局</strong>：自动适配不同屏幕尺寸</li>
                  <li>• <strong>性能优化</strong>：AI帮助优化大数据量的渲染性能</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50 mt-4">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">工具协同效应</strong>：Fabric负责数据的清洗、转换和分析，Cursor负责将分析结果可视化。这个组合让非技术背景的用户也能快速创建专业的数据分析仪表板，专注于业务洞察而非技术实现。
                </p>
              </div>
            </div>
          </div>

          {/* 详细步骤 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">详细步骤</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-foreground mb-3">Step 1: 使用Fabric整理和分析数据（2-3小时）</h4>
                <div className="space-y-2 text-sm text-muted-foreground ml-4">
                  <p>1. 准备数据文件（CSV或Excel格式）</p>
                  <p>2. 使用Fabric的Patterns处理数据：</p>
                  <div className="p-3 rounded-lg bg-secondary/50 font-mono text-xs">
                    "使用Fabric的analyze Pattern分析销售数据：<br/>
                    - 计算月度销售额趋势<br/>
                    - 按产品类别统计销量<br/>
                    - 识别销售额最高的客户<br/>
                    - 分析销售渠道效果"
                  </div>
                  <p>3. Fabric会生成分析结果和可视化建议</p>
                  <p>4. 导出处理后的数据（JSON格式）</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-3">Step 2: 使用Cursor创建可视化组件（3-4小时）</h4>
                <div className="space-y-2 text-sm text-muted-foreground ml-4">
                  <p>1. 在Cursor中创建Next.js项目</p>
                  <p>2. 安装图表库：<code className="bg-secondary/50 px-1 rounded">npm install recharts</code></p>
                  <p>3. 使用Cursor Agent生成仪表板组件：</p>
                  <div className="p-3 rounded-lg bg-secondary/50 font-mono text-xs">
                    "创建一个数据分析仪表板，包含：<br/>
                    - 顶部KPI卡片（总销售额、增长率、订单数）<br/>
                    - 销售额趋势折线图（按月）<br/>
                    - 产品类别饼图<br/>
                    - 客户排名柱状图<br/>
                    - 销售渠道对比图<br/>
                    使用深色主题，支持日期范围筛选"
                  </div>
                  <p>4. Cursor会生成完整的组件代码</p>
                  <p>5. 根据预览效果调整样式和布局</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-3">Step 3: 集成图表库并优化（1-2小时）</h4>
                <div className="space-y-2 text-sm text-muted-foreground ml-4">
                  <p>1. 使用Recharts创建各种图表类型</p>
                  <p>2. 添加交互功能：</p>
                  <ul className="ml-4 space-y-1">
                    <li>• 图表悬停显示详细数据</li>
                    <li>• 点击图表元素进行筛选</li>
                    <li>• 日期范围选择器</li>
                    <li>• 数据导出功能</li>
                  </ul>
                  <p>3. 优化大数据量的渲染性能（使用虚拟滚动）</p>
                  <p>4. 添加加载状态和错误处理</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-3">Step 4: 添加交互功能（1小时）</h4>
                <div className="space-y-2 text-sm text-muted-foreground ml-4">
                  <p>1. 添加筛选器组件（日期、类别、渠道）</p>
                  <p>2. 实现数据联动（筛选一个图表，其他图表同步更新）</p>
                  <p>3. 添加数据钻取功能（点击查看详细数据）</p>
                  <p>4. 添加数据导出功能（导出为CSV或PDF）</p>
                </div>
              </div>
            </div>
          </div>

          {/* 常见问题 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              常见问题与解决方案
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">问题1：数据格式不兼容</h4>
                <p className="ml-4">解决方案：使用Fabric的数据转换Pattern，将数据转换为标准格式。或者使用Cursor询问AI如何转换数据格式。</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">问题2：图表显示不正确</h4>
                <p className="ml-4">解决方案：检查数据格式是否符合图表库要求，使用Cursor AI帮助调试图表配置。</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">问题3：性能问题（数据量大）</h4>
                <p className="ml-4">解决方案：使用数据聚合减少数据点，实现虚拟滚动，使用Cursor AI优化渲染性能。</p>
              </div>
            </div>
          </div>

          {/* 项目检查清单 */}
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              项目检查清单
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>数据已使用Fabric处理和分析，结果准确</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>仪表板包含至少4种不同类型的图表</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>KPI卡片显示关键指标，数据实时更新</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>筛选功能正常，可以按日期、类别等筛选</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>图表交互正常，悬停和点击功能正常</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>响应式设计完成，移动端显示正常</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>性能优化完成，大数据量也能流畅显示</span>
              </div>
            </div>
          </div>
        </section>

        {/* 学习成果 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            学习成果
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-foreground font-medium mb-4">完成本章后，你将：</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">1</span>
                掌握v0、Cursor、Vercel的基本使用，能够独立完成简单的Web项目
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                理解UI生成工具的工作流程，知道如何用自然语言描述需求
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                掌握Fabric的数据处理能力，能够使用AI辅助进行数据分析
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                理解工具组合的协同效应，知道如何选择合适的工具组合
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">5</span>
                具备独立解决问题的能力，能够使用AI工具快速定位和修复问题
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/practice" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：实践篇概述
          </Link>
        </Button>
        <Button asChild>
          <Link href="/practice/engineering" className="flex items-center gap-2">
            下一章：理工科学生项目
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}

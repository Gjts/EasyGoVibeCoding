import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, DollarSign, Workflow, GitBranch, Settings, Bug, Zap, CheckCircle2, FileCode, Sparkles, Wrench, Code, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"

const chapters = [
  { title: "序：从工具到架构的 100 小时", href: "/advanced" },
  { title: "环境搭建与代码运行基础", href: "/advanced/environment" },
  { title: "AI 使用说明书", href: "/advanced/ai-guide" },
  { title: "PRD 与文档驱动", href: "/advanced/prd" },
  { title: "AI 原生开发模式", href: "/advanced/ai-native-patterns" },
  { title: "AI 适配架构范式", href: "/advanced/ai-architecture-patterns" },
  { title: "开发常识", href: "/advanced/dev-basics" },
  { title: "界面交互", href: "/advanced/ui" },
  { title: "数据持久化", href: "/advanced/data" },
  { title: "测试与质量", href: "/advanced/testing" },
  { title: "部署与运维", href: "/advanced/deployment" },
]

export default function AIGuidePage() {
  return (
    <CourseLayout
      title="进阶篇"
      description="从工具到架构"
      chapters={chapters}
      currentChapter="AI 使用说明书"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 2 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          AI 使用说明书
        </h1>
        <p className="text-lg text-muted-foreground">
          掌握 AI 编程的经济学原理，建立标准工作流，配置高效开发环境，让 AI 更好地为你工作。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: AI 编程的经济学 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-primary" />
            AI 编程的经济学
          </h2>
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5 mb-6">
            <p className="text-foreground font-medium mb-2">核心原则：Token 就是钱</p>
            <p className="text-muted-foreground">
              每次你让 AI 读取项目文件、搜索代码、生成回答，都在消耗真实的费用。
              <strong className="text-foreground">上下文越大，花费越高</strong>。读取整个项目 vs 只读一个文件，差异是数量级的。
            </p>
          </div>

          <p className="text-muted-foreground mb-6">
            但更重要的是——<strong className="text-foreground">精准的上下文不仅省钱，还能让输出更准确</strong>。
            优化提示词不是"打磨话术"，而是减少 AI 需要读取的上下文范围。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">精准上下文策略</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="text-sm font-medium text-foreground mb-2">❌ 模糊描述</div>
                  <p className="text-sm text-muted-foreground mb-2">"帮我看看项目有什么问题"</p>
                  <p className="text-xs text-muted-foreground">→ AI 需要读取整个项目，消耗大量 Token</p>
                </div>
                <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
                  <div className="text-sm font-medium text-foreground mb-2">✅ 精准指定</div>
                  <p className="text-sm text-muted-foreground mb-2">"检查 `src/utils/auth.ts` 中的登录逻辑"</p>
                  <p className="text-xs text-muted-foreground">→ AI 只读取相关文件，Token 消耗减少 90%</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">优化技巧</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">指定文件路径</strong>：比模糊描述更好</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">指明功能范围</strong>：比笼统说"项目有问题"更聚焦</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">删除客套话</strong>：不设定专家角色，直接说任务</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">使用摘要</strong>：长文档用摘要而非全文</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">监控使用</strong>：定期检查 Token 使用统计，识别浪费</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">成本优化示例</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <span className="text-muted-foreground">读取整个项目（100+ 文件）</span>
                  <span className="font-medium text-foreground">~50,000 Tokens</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-accent/10 border border-accent/30">
                  <span className="text-muted-foreground">只读取相关文件（3-5 个文件）</span>
                  <span className="font-medium text-foreground">~5,000 Tokens</span>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  💡 精准上下文可以节省 <strong className="text-foreground">90% 的成本</strong>，同时提高输出准确性
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: VibeCoding 工作流 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Workflow className="h-6 w-6 text-primary" />
            VibeCoding 工作流
          </h2>
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5 mb-6">
            <p className="text-foreground font-medium mb-2">核心洞察：Vibecoding 的核心是 Workflow 而不是 Prompt</p>
            <p className="text-muted-foreground">
              你之前是想到哪里做到哪里，让 AI 直接开写，但这样往往会导致返工。
              真正的高手不是靠配置，而是靠<strong className="text-foreground">说话的艺术</strong>和<strong className="text-foreground">标准流程</strong>。
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">给 AI 一个"出口"</h3>
              <p className="text-sm text-muted-foreground mb-3">
                AI 有时候不知道答案，但会强行编造一个。告诉它："如果不确定，就明确说出来，等待我的确认，而不是强行编造。"
              </p>
              <div className="p-4 rounded-lg bg-secondary/50 font-mono text-sm">
                <div className="text-foreground mb-2">示例 Prompt：</div>
                <div className="text-muted-foreground">
                  "如果你不确定某个实现细节，请明确标注 [需要确认]，
                  <br />
                  并说明你的假设，等待我的确认后再继续。"
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">五步标准流程</h3>
              <div className="space-y-4">
                {[
                  { step: "1", title: "探索项目结构", desc: "先了解项目结构，避免写到一半才发现文件已经写过了", icon: FileCode },
                  { step: "2", title: "规划实现步骤", desc: "列出实现步骤，让 AI 按计划执行，而不是想到哪里写哪里", icon: Sparkles },
                  { step: "3", title: "编码实现", desc: "按照规划逐步实现功能，每完成一步就验证", icon: Code },
                  { step: "4", title: "测试验证", desc: "验证功能是否正常工作，检查边界情况和错误处理", icon: CheckCircle2 },
                  { step: "5", title: "提交代码", desc: "每完成一个独立功能就提交代码，建立版本记录", icon: GitBranch },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.step} className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="h-4 w-4 text-primary" />
                          <h4 className="font-medium text-foreground">{item.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">避免返工的方法</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span><strong className="text-foreground">先探索再编码</strong>：了解项目结构后再开始写代码</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span><strong className="text-foreground">规划实现步骤</strong>：列出步骤让 AI 按计划执行</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span><strong className="text-foreground">阶段性验证</strong>：每完成一步就验证，不要等到最后</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span><strong className="text-foreground">及时提交</strong>：每完成一个功能就提交，方便回退</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-2">拓展：多代理系统</h3>
              <p className="text-sm text-muted-foreground">
                当你熟练掌握核心工作流后，可以探索多代理系统：让多个 AI 协同工作，
                一个写代码，另一个审查；一个写测试，另一个写文档。它们可以并行处理提高效率，或串行处理保证质量。
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: 版本控制 Git */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <GitBranch className="h-6 w-6 text-primary" />
            版本控制 Git
          </h2>
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5 mb-6">
            <p className="text-foreground font-medium mb-2">AI 编程非常激进，必须建立安全网</p>
            <p className="text-muted-foreground">
              AI 可能为了修一个 Bug 而破坏三个旧功能。所以必须配置好 <strong className="text-foreground">Git</strong>，
              建立高频的<strong className="text-foreground">本地版本记录</strong>。
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">高频提交策略</h3>
              <p className="text-sm text-muted-foreground mb-4">
                每当你完成一个独立功能的开发，或修复完一个 Bug 并验证通过后，请自动运行 git commit 提交代码。
              </p>
              <div className="p-4 rounded-lg bg-secondary/50 font-mono text-sm">
                <div className="text-foreground mb-2">标准流程：</div>
                <div className="text-muted-foreground space-y-1">
                  <div>1. AI 写完功能 → 验证通过</div>
                  <div>2. 运行 `git add .`</div>
                  <div>3. 运行 `git commit -m "feat: 添加用户登录功能"`</div>
                  <div>4. 继续下一个功能</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Commit Message 规范</h3>
              <p className="text-sm text-muted-foreground mb-3">
                使用简洁的中文 commit message，清晰描述本次提交的内容。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-secondary/50">
                  <div className="text-xs text-muted-foreground mb-1">✅ 好的示例</div>
                  <div className="font-mono text-sm text-foreground">
                    feat: 添加用户登录功能
                    <br />
                    fix: 修复登录页面的样式问题
                    <br />
                    refactor: 重构用户认证逻辑
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                  <div className="text-xs text-muted-foreground mb-1">❌ 不好的示例</div>
                  <div className="font-mono text-sm text-foreground">
                    更新代码
                    <br />
                    fix bug
                    <br />
                    changes
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">随时可以回退</h3>
              <p className="text-sm text-muted-foreground mb-3">
                一旦代码搞崩了，随时可以回退到上一个稳定版本。
              </p>
              <div className="p-4 rounded-lg bg-secondary/50 font-mono text-sm">
                <div className="text-foreground mb-2">回退命令：</div>
                <div className="text-muted-foreground space-y-1">
                  <div># 查看提交历史</div>
                  <div className="text-foreground">git log --oneline</div>
                  <div className="text-muted-foreground mt-2"># 回退到上一个提交</div>
                  <div className="text-foreground">git reset --hard HEAD~1</div>
                  <div className="text-muted-foreground mt-2"># 回退到指定提交</div>
                  <div className="text-foreground">git reset --hard &lt;commit-hash&gt;</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: 配置技巧 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Settings className="h-6 w-6 text-primary" />
            配置技巧
          </h2>
          <p className="text-muted-foreground mb-6">
            除了选对工具，还有三招让 AI 更加好用的技巧，解决 AI 记性差、瞎胡写的问题。
            不同工具有不同的配置方法，下面我们按工具分类介绍。
          </p>

          <div className="space-y-8 mb-6">
            {/* 4.1 Cursor 配置 */}
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                4.1 Cursor 配置
              </h3>

              {/* 项目规则 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-foreground mb-3">项目规则 (.cursorrules)</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  在项目根目录创建 <code className="bg-secondary px-1 rounded">.cursorrules</code> 文件，定义项目规范。
                </p>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-sm">
                  <div className="text-foreground mb-2">示例 .cursorrules：</div>
                  <pre className="text-muted-foreground whitespace-pre-wrap text-xs">{`# 代码规范
- 禁止使用 \`any\` 类型
- 强制使用 \`pnpm\` 作为包管理器
- 所有组件必须使用 TypeScript
- 遵循 ESLint 和 Prettier 配置
- 使用函数式组件和 Hooks
- 所有 API 调用必须包含错误处理`}</pre>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-foreground mb-3">创建 Skills</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Skills 存储在 <code className="bg-secondary px-1 rounded">.cursor/skills/</code> 目录下，使用 Markdown 格式。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <div className="text-xs font-medium text-foreground mb-2">创建步骤：</div>
                    <ol className="space-y-1 text-xs text-muted-foreground list-decimal list-inside">
                      <li>创建 <code>.cursor/skills/</code> 目录</li>
                      <li>创建 <code>skill-name.md</code> 文件</li>
                      <li>编写 Skill 描述和指令</li>
                      <li>在 Cursor 中调用 Skill</li>
                    </ol>
                  </div>
                  <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
                    <div className="text-xs font-medium text-foreground mb-2">示例 Skill：</div>
                    <div className="text-xs text-muted-foreground font-mono whitespace-pre-wrap">
                      {`# 代码审查 Skill

## 用途
自动审查代码质量

## 指令
检查代码是否符合团队规范：
- TypeScript 类型安全
- 错误处理完整性
- 代码可读性`}
                    </div>
                  </div>
                </div>
              </div>

              {/* MCP 配置 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-foreground mb-3">MCP 服务器配置</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  在 <code className="bg-secondary px-1 rounded">.cursor/mcp.json</code> 中配置 MCP 服务器。
                </p>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-sm">
                  <div className="text-foreground mb-2">.cursor/mcp.json：</div>
                  <pre className="text-muted-foreground whitespace-pre-wrap text-xs">{`{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem"],
      "env": {
        "ALLOWED_DIRECTORIES": ["/path/to/allowed"]
      }
    }
  }
}`}</pre>
                </div>
              </div>

              {/* Agent 模式 */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Agent 模式使用</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  在 Cursor 中按 <code className="bg-secondary px-1 rounded">Cmd/Ctrl + K</code> 打开 Agent 模式，
                  或使用 <code className="bg-secondary px-1 rounded">Cmd/Ctrl + L</code> 打开 Chat 模式。
                </p>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <strong className="text-foreground">Agent 模式</strong>：AI 可以自动执行多步骤任务，修改多个文件</li>
                    <li>• <strong className="text-foreground">Chat 模式</strong>：与 AI 对话，获取建议和代码片段</li>
                    <li>• <strong className="text-foreground">Composer</strong>：组合多个操作，批量处理任务</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 4.2 Claude Code 配置 */}
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Terminal className="h-5 w-5 text-primary" />
                4.2 Claude Code 配置
              </h3>

              {/* MCP 配置 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-foreground mb-3">MCP 服务器配置</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Claude Code 的 MCP 配置在 <code className="bg-secondary px-1 rounded">~/.claude/mcp.json</code> 或项目目录的 <code className="bg-secondary px-1 rounded">.claude/mcp.json</code>。
                </p>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-sm">
                  <div className="text-foreground mb-2">~/.claude/mcp.json：</div>
                  <pre className="text-muted-foreground whitespace-pre-wrap text-xs">{`{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token"
      }
    },
    "sequential-thinking": {
      "command": "node",
      "args": ["path/to/sequential-thinking-server.js"]
    }
  }
}`}</pre>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">创建 Skills</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Claude Code Skills 存储在 <code className="bg-secondary px-1 rounded">~/.claude/skills/</code> 目录下。
                </p>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="text-xs font-medium text-foreground mb-2">创建步骤：</div>
                  <ol className="space-y-1 text-xs text-muted-foreground list-decimal list-inside">
                    <li>创建 <code>~/.claude/skills/</code> 目录</li>
                    <li>创建 <code>skill-name.md</code> 文件</li>
                    <li>编写 Skill 描述（Markdown 格式）</li>
                    <li>在终端中使用 <code>@skill-name</code> 调用</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* 4.3 Codex CLI 配置 */}
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Terminal className="h-5 w-5 text-primary" />
                4.3 Codex CLI 配置
              </h3>

              {/* 项目规则 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-foreground mb-3">项目规则 (.codexrules)</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  在项目根目录创建 <code className="bg-secondary px-1 rounded">.codexrules</code> 文件，或使用 <code className="bg-secondary px-1 rounded">/init</code> 命令自动生成。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <div className="text-xs font-medium text-foreground mb-2">使用 /init 命令：</div>
                    <div className="text-xs text-muted-foreground font-mono">
                      <div>codex /init</div>
                      <div className="mt-2">→ 自动分析项目结构</div>
                      <div>→ 生成 .codexrules 文件</div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
                    <div className="text-xs font-medium text-foreground mb-2">手动创建：</div>
                    <div className="text-xs text-muted-foreground font-mono whitespace-pre-wrap">
                      {`# .codexrules
项目使用 TypeScript + React
使用 pnpm 作为包管理器
遵循 Airbnb ESLint 配置`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Monorepo 分析 */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Monorepo 分析配置</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Codex CLI 可以分析大型 Monorepo 项目，需要配置工作区信息。
                </p>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <strong className="text-foreground">自动检测</strong>：Codex 会自动检测 Monorepo 结构</li>
                    <li>• <strong className="text-foreground">工作区配置</strong>：在 .codexrules 中指定工作区路径</li>
                    <li>• <strong className="text-foreground">上下文管理</strong>：只加载相关工作区的代码</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 4.4 其他工具配置 */}
            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Wrench className="h-5 w-5 text-primary" />
                4.4 其他工具配置
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Windsurf */}
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="text-sm font-medium text-foreground mb-2">Windsurf</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• <strong>Fast Context</strong>：自动配置，无需手动设置</li>
                    <li>• <strong>Cascade Agent</strong>：在设置中启用</li>
                    <li>• <strong>项目规则</strong>：使用 <code>.windsurfrules</code> 文件</li>
                  </ul>
                </div>

                {/* GitHub Copilot */}
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="text-sm font-medium text-foreground mb-2">GitHub Copilot</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• <strong>项目规则</strong>：使用 <code>.github/copilot-instructions.md</code></li>
                    <li>• <strong>相关文件</strong>：自动识别相关文件上下文</li>
                    <li>• <strong>代码补全</strong>：在设置中配置补全行为</li>
                  </ul>
                </div>

                {/* Continue.dev */}
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="text-sm font-medium text-foreground mb-2">Continue.dev</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• <strong>配置文件</strong>：<code>.continue/config.json</code></li>
                    <li>• <strong>自定义模型</strong>：配置本地模型（Ollama）</li>
                    <li>• <strong>上下文提供者</strong>：配置代码库上下文</li>
                  </ul>
                </div>

                {/* Fabric */}
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="text-sm font-medium text-foreground mb-2">Fabric</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• <strong>Patterns</strong>：存储在 <code>~/.config/fabric/patterns/</code></li>
                    <li>• <strong>自定义 Pattern</strong>：创建 <code>pattern-name.md</code></li>
                    <li>• <strong>API Key</strong>：在环境变量中配置</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: 高效调试心法 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Bug className="h-6 w-6 text-primary" />
            高效调试心法
          </h2>
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5 mb-6">
            <p className="text-foreground font-medium mb-2">有了 AI，遇到错误不要慌</p>
            <p className="text-muted-foreground">
              但要让 AI 帮你，你得学会<strong className="text-foreground">正确的求助方式</strong>。
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">第一：提供完整报错日志</h3>
              <p className="text-sm text-muted-foreground mb-3">
                新手看到满屏红色报错往往害怕，只复制最后一行。但 AI 就像医生，需要看到完整的症状才能准确诊断。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                  <div className="text-sm font-medium text-foreground mb-2">❌ 错误做法</div>
                  <div className="text-xs text-muted-foreground font-mono">
                    Error: Cannot read property 'x' of undefined
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">→ 信息不足，AI 无法诊断</p>
                </div>
                <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
                  <div className="text-sm font-medium text-foreground mb-2">✅ 正确做法</div>
                  <div className="text-xs text-muted-foreground font-mono whitespace-pre-wrap">
                    {`Error: Cannot read property 'x' of undefined
    at UserService.getUser (src/services/user.ts:45:12)
    at UserComponent.handleClick (src/components/User.tsx:23:5)
    ...完整堆栈信息...`}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">→ 完整信息，AI 可以精确定位</p>
                </div>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-secondary/50">
                <p className="text-sm text-muted-foreground">
                  💡 <strong className="text-foreground">操作建议</strong>：把那些看起来最长、最复杂的红色错误信息——
                  原封不动地全选、复制、发送给 AI。
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">第二：循环修复模式</h3>
              <p className="text-sm text-muted-foreground mb-3">
                如果 AI 第一次没修好，不要放弃。描述你尝试后的结果，让 AI 持续尝试。
              </p>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="text-sm font-medium text-foreground mb-2">循环修复流程：</div>
                  <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                    <li>AI 给出修复方案</li>
                    <li>你按照方案修改代码</li>
                    <li>如果出现新错误，描述结果："我按你的方法改了，但现在出现了新的错误..."</li>
                    <li>AI 根据新信息继续修复</li>
                    <li>重复 2-4 步，直到问题解决</li>
                  </ol>
                </div>
                <div className="p-3 rounded-lg bg-accent/10 border border-accent/30">
                  <p className="text-sm text-muted-foreground">
                    💡 <strong className="text-foreground">经验</strong>：大多数 Bug 都需要 2-3 轮迭代才能解决。
                    不要期望 AI 一次就能修好所有问题。
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">常见错误类型和处理</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { type: "类型错误", desc: "TypeScript 类型不匹配", solution: "提供类型定义和错误信息" },
                  { type: "运行时错误", desc: "代码执行时崩溃", solution: "提供完整堆栈信息和相关代码" },
                  { type: "逻辑错误", desc: "功能不符合预期", solution: "描述期望行为和实际行为" },
                  { type: "依赖错误", desc: "包安装或导入失败", solution: "提供 package.json 和错误信息" },
                ].map((item) => (
                  <div key={item.type} className="p-4 rounded-lg bg-secondary/50">
                    <div className="text-sm font-medium text-foreground mb-1">{item.type}</div>
                    <div className="text-xs text-muted-foreground mb-2">{item.desc}</div>
                    <div className="text-xs text-accent">💡 {item.solution}</div>
                  </div>
                ))}
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
                掌握 Token 成本优化策略，精准控制上下文范围，节省 90% 的成本
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                建立标准 VibeCoding 工作流，掌握五步开发流程，避免返工
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                配置项目规则和 Skills，让 AI 记住项目规范，提升代码质量
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                掌握高效调试方法，学会正确的求助方式，快速解决问题
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">5</span>
                建立高频 Git 提交习惯，随时可以回退，建立安全网
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/advanced/environment" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：环境搭建
          </Link>
        </Button>
        <Button asChild>
          <Link href="/advanced/prd" className="flex items-center gap-2">
            下一章：PRD 与文档驱动
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}

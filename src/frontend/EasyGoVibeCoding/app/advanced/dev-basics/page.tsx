import { CourseLayout } from "@/components/course/course-layout"
import { advancedChapters } from "@/components/course/chapters"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Code2, GitBranch, Package, Layers, Zap, Brain, AlertTriangle, FileText, Shield, TrendingUp, CheckCircle2, ArrowRightCircle, Sparkles, Settings, Bug, Lock, Gauge } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function DevBasicsPage() {
  return (
    <CourseLayout
      title="进阶篇"
      description="从工具到架构"
      chapters={advancedChapters}
      currentChapter="开发常识"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 7 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          开发常识
        </h1>
        <p className="text-lg text-muted-foreground">
          掌握不同语言的代码规范、工具配置和最佳实践，建立专业的开发习惯，提升代码质量和团队协作效率。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 0: 序言 - 结构化思考方法 */}
        <section>
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5 mb-6">
            <p className="text-foreground font-medium mb-2">使用 Sequential Thinking 学习开发常识</p>
            <p className="text-muted-foreground mb-4">
              开发常识涉及多个方面，使用<strong className="text-foreground">结构化思考方法</strong>可以帮助你系统掌握：
            </p>
            <div className="space-y-3">
              {[
                { step: "1", title: "代码规范", desc: "不同语言的命名、格式、注释规范" },
                { step: "2", title: "工具配置", desc: "ESLint、Prettier、格式化工具的实际配置" },
                { step: "3", title: "最佳实践", desc: "错误处理、日志、性能、安全等实践" },
                { step: "4", title: "持续改进", desc: "代码审查、质量指标、技术债务管理" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {item.step}
                  </span>
                  <div>
                    <div className="font-medium text-foreground">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 1: 代码规范（按语言分类） */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Code2 className="h-6 w-6 text-primary" />
            代码规范
          </h2>
          <p className="text-muted-foreground mb-6">
            统一的代码规范让代码更易读、易维护，是团队协作的基础。不同语言有不同的规范，下面我们按语言分类介绍。
          </p>

          <Tabs defaultValue="typescript" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-6">
              <TabsTrigger value="typescript">TypeScript/JS</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="java">Java</TabsTrigger>
              <TabsTrigger value="go">Go</TabsTrigger>
            </TabsList>

            {/* TypeScript/JavaScript */}
            <TabsContent value="typescript" className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">命名规范</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 text-sm">
                    <div className="font-medium text-foreground">变量/函数</div>
                    <div className="text-muted-foreground font-mono">camelCase</div>
                    <div className="text-xs text-muted-foreground">getUserName, calculateTotal</div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="font-medium text-foreground">类/组件</div>
                    <div className="text-muted-foreground font-mono">PascalCase</div>
                    <div className="text-xs text-muted-foreground">UserProfile, LoginForm</div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="font-medium text-foreground">常量</div>
                    <div className="text-muted-foreground font-mono">UPPER_SNAKE_CASE</div>
                    <div className="text-xs text-muted-foreground">MAX_RETRY_COUNT, API_BASE_URL</div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="font-medium text-foreground">文件</div>
                    <div className="text-muted-foreground font-mono">kebab-case</div>
                    <div className="text-xs text-muted-foreground">user-service.ts, login-form.tsx</div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">ESLint 配置</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  推荐使用 <strong className="text-foreground">Airbnb</strong> 或 <strong className="text-foreground">TypeScript ESLint</strong> 配置。
                </p>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs">
                  <div className="text-foreground mb-2">.eslintrc.json（Airbnb + TypeScript）：</div>
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`{
  "extends": [
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "import/prefer-default-export": "off",
    "max-len": ["error", { "code": 100 }]
  }
}`}</pre>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">Prettier 配置</h3>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs">
                  <div className="text-foreground mb-2">.prettierrc：</div>
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always"
}`}</pre>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">TypeScript 严格模式</h3>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs">
                  <div className="text-foreground mb-2">tsconfig.json（严格模式）：</div>
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}`}</pre>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
                <h3 className="font-semibold text-foreground mb-3">React 规范</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 使用函数组件和 Hooks，避免类组件</li>
                  <li>• Props 使用 TypeScript 接口定义</li>
                  <li>• 组件命名使用 PascalCase</li>
                  <li>• 使用 React.memo 优化性能（如需要）</li>
                  <li>• 自定义 Hooks 以 `use` 开头</li>
                </ul>
              </div>
            </TabsContent>

            {/* Python */}
            <TabsContent value="python" className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">PEP 8 规范</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2 text-sm">
                    <div className="font-medium text-foreground">命名规范</div>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• 函数/变量：snake_case</li>
                      <li>• 类：PascalCase</li>
                      <li>• 常量：UPPER_SNAKE_CASE</li>
                      <li>• 私有：_leading_underscore</li>
                    </ul>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="font-medium text-foreground">代码格式</div>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• 缩进：4 个空格</li>
                      <li>• 行长度：79 字符（推荐）</li>
                      <li>• 导入顺序：标准库 → 第三方 → 本地</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">Black 配置</h3>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs">
                  <div className="text-foreground mb-2">pyproject.toml：</div>
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`[tool.black]
line-length = 88
target-version = ['py311']
include = '\\.pyi?$'
extend-exclude = '''
/(
  \\.git
  | \\.venv
  | venv
)/
'''`}</pre>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">Flake8 配置</h3>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs">
                  <div className="text-foreground mb-2">.flake8：</div>
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`[flake8]
max-line-length = 88
extend-ignore = E203, E266, E501
exclude =
    .git,
    __pycache__,
    .venv,
    venv
max-complexity = 10`}</pre>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">mypy 类型检查</h3>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs">
                  <div className="text-foreground mb-2">mypy.ini：</div>
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`[mypy]
python_version = 3.11
warn_return_any = True
warn_unused_configs = True
disallow_untyped_defs = True
disallow_incomplete_defs = True
check_untyped_defs = True`}</pre>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
                <h3 className="font-semibold text-foreground mb-3">文档规范</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 使用 docstring 文档化函数和类（Google 或 NumPy 风格）</li>
                  <li>• 使用类型注解（PEP 484）</li>
                  <li>• 复杂函数添加使用示例</li>
                </ul>
              </div>
            </TabsContent>

            {/* Java */}
            <TabsContent value="java" className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">Google Java Style Guide</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2 text-sm">
                    <div className="font-medium text-foreground">命名规范</div>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• 类：PascalCase</li>
                      <li>• 方法/变量：camelCase</li>
                      <li>• 常量：UPPER_SNAKE_CASE</li>
                      <li>• 包：lowercase</li>
                    </ul>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="font-medium text-foreground">代码格式</div>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• 缩进：2 个空格</li>
                      <li>• 行长度：100 字符</li>
                      <li>• 大括号：K&R 风格</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">Checkstyle 配置</h3>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs">
                  <div className="text-foreground mb-2">checkstyle.xml（部分）：</div>
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`<module name="Checker">
  <module name="TreeWalker">
    <module name="ConstantName"/>
    <module name="LocalFinalVariableName"/>
    <module name="LocalVariableName"/>
    <module name="MemberName"/>
    <module name="MethodName"/>
    <module name="PackageName"/>
    <module name="ParameterName"/>
    <module name="TypeName"/>
  </module>
</module>`}</pre>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">Maven 插件配置</h3>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs">
                  <div className="text-foreground mb-2">pom.xml（部分）：</div>
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-checkstyle-plugin</artifactId>
  <version>3.3.0</version>
  <configuration>
    <configLocation>checkstyle.xml</configLocation>
  </configuration>
</plugin>`}</pre>
                </div>
              </div>
            </TabsContent>

            {/* Go */}
            <TabsContent value="go" className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">官方规范</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 参考 <strong className="text-foreground">Effective Go</strong> 和 <strong className="text-foreground">Go Code Review Comments</strong></li>
                  <li>• 使用 <code className="bg-secondary px-1 rounded">gofmt</code> 自动格式化</li>
                  <li>• 使用 <code className="bg-secondary px-1 rounded">goimports</code> 管理导入</li>
                </ul>
              </div>

              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">命名规范</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 text-sm">
                    <div className="font-medium text-foreground">包名</div>
                    <div className="text-xs text-muted-foreground">小写，简短，无下划线</div>
                    <div className="text-xs text-muted-foreground font-mono">user, auth, utils</div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="font-medium text-foreground">导出标识符</div>
                    <div className="text-xs text-muted-foreground">首字母大写</div>
                    <div className="text-xs text-muted-foreground font-mono">GetUser, UserService</div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="font-medium text-foreground">未导出标识符</div>
                    <div className="text-xs text-muted-foreground">首字母小写</div>
                    <div className="text-xs text-muted-foreground font-mono">getUser, userService</div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="font-medium text-foreground">接口名</div>
                    <div className="text-xs text-muted-foreground">通常以 -er 结尾</div>
                    <div className="text-xs text-muted-foreground font-mono">Reader, Writer</div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">golangci-lint 配置</h3>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs">
                  <div className="text-foreground mb-2">.golangci.yml：</div>
                  <pre className="text-muted-foreground whitespace-pre-wrap">{`linters:
  enable:
    - errcheck
    - gosimple
    - govet
    - ineffassign
    - staticcheck
    - unused

linters-settings:
  errcheck:
    check-type-assertions: true
  govet:
    check-shadowing: true`}</pre>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* 其他语言快速参考 */}
          <div className="p-6 rounded-xl border border-border bg-card mt-6">
            <h3 className="font-semibold text-foreground mb-4">其他语言快速参考</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-secondary/50">
                <div className="font-medium text-foreground mb-2">Rust</div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• rustfmt（格式化）</li>
                  <li>• clippy（代码检查）</li>
                  <li>• snake_case 命名</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <div className="font-medium text-foreground mb-2">C#</div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• dotnet format</li>
                  <li>• EditorConfig</li>
                  <li>• PascalCase 命名</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <div className="font-medium text-foreground mb-2">Swift/Kotlin/Dart</div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Swift: SwiftLint</li>
                  <li>• Kotlin: ktlint</li>
                  <li>• Dart: dart format</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: 版本控制（增强） */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <GitBranch className="h-6 w-6 text-primary" />
            版本控制
          </h2>
          <p className="text-muted-foreground mb-6">
            Git 是现代开发的标准工具。掌握 Git 工作流、分支策略和代码审查流程，是团队协作的基础。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">分支策略</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">Git Flow</div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>• main：生产环境</div>
                    <div>• develop：开发分支</div>
                    <div>• feature/*：功能分支</div>
                    <div>• release/*：发布分支</div>
                    <div>• hotfix/*：热修复</div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">GitHub Flow</div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>• main：主分支</div>
                    <div>• feature/*：功能分支</div>
                    <div>• 通过 PR 合并</div>
                    <div>• 适合持续部署</div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">GitLab Flow</div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>• main：主分支</div>
                    <div>• 环境分支（staging、production）</div>
                    <div>• 上游优先原则</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">提交信息规范（Conventional Commits）</h3>
              <div className="p-4 rounded-lg bg-secondary/50 font-mono text-sm">
                <div className="text-foreground mb-2">格式：&lt;type&gt;(&lt;scope&gt;): &lt;subject&gt;</div>
                <div className="text-muted-foreground space-y-1 mt-2">
                  <div>feat(auth): 添加用户登录功能</div>
                  <div>fix(api): 修复数据查询性能问题</div>
                  <div>docs(readme): 更新安装说明</div>
                  <div>refactor(utils): 重构日期格式化函数</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { type: "feat", desc: "新功能" },
                  { type: "fix", desc: "修复 Bug" },
                  { type: "docs", desc: "文档更新" },
                  { type: "style", desc: "代码格式" },
                  { type: "refactor", desc: "重构" },
                  { type: "test", desc: "测试" },
                  { type: "chore", desc: "构建/工具" },
                  { type: "perf", desc: "性能优化" },
                ].map((item) => (
                  <div key={item.type} className="p-2 rounded bg-accent/10 border border-accent/30 text-center">
                    <div className="text-xs font-medium text-foreground">{item.type}</div>
                    <div className="text-xs text-muted-foreground">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">Git Hooks 配置</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">pre-commit Hook</div>
                  <div className="text-xs text-muted-foreground font-mono">
                    # 提交前运行 lint 和格式化检查
                    <br />
                    npm run lint
                    <br />
                    npm run format:check
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">commit-msg Hook</div>
                  <div className="text-xs text-muted-foreground font-mono">
                    # 检查提交信息格式
                    <br />
                    npx commitlint --edit $1
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-accent/10 border border-accent/30">
                  <p className="text-xs text-muted-foreground">
                    💡 使用 <strong className="text-foreground">husky</strong>（Node.js）或 <strong className="text-foreground">pre-commit</strong>（Python）管理 Git Hooks
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">代码审查流程</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">1</span>
                  <span>创建功能分支，完成开发并提交代码</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">2</span>
                  <span>创建 Pull Request，填写 PR 描述和检查清单</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">3</span>
                  <span>代码审查者审查代码（功能、性能、安全、可维护性）</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">4</span>
                  <span>根据反馈修改代码，重新提交</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">5</span>
                  <span>审查通过后合并到主分支</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: 依赖管理（增强） */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            依赖管理
          </h2>
          <p className="text-muted-foreground mb-6">
            合理管理项目依赖，确保项目的可维护性和安全性。不同语言有不同的依赖管理方式。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">语义化版本（SemVer）</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">主版本号（MAJOR）</div>
                  <div className="text-xs text-muted-foreground">不兼容的 API 修改</div>
                  <div className="text-xs text-muted-foreground font-mono mt-1">2.0.0</div>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">次版本号（MINOR）</div>
                  <div className="text-xs text-muted-foreground">向下兼容的功能新增</div>
                  <div className="text-xs text-muted-foreground font-mono mt-1">1.2.0</div>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">修订号（PATCH）</div>
                  <div className="text-xs text-muted-foreground">向下兼容的问题修正</div>
                  <div className="text-xs text-muted-foreground font-mono mt-1">1.2.3</div>
                </div>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-accent/10 border border-accent/30">
                <div className="text-xs text-muted-foreground">
                  <strong className="text-foreground">版本范围</strong>：^1.2.3（允许 1.x.x，不允许 2.0.0）、~1.2.3（允许 1.2.x，不允许 1.3.0）
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">锁定文件管理</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">Node.js</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• package-lock.json（npm）</li>
                    <li>• yarn.lock（yarn）</li>
                    <li>• pnpm-lock.yaml（pnpm）</li>
                    <li>• 提交到版本控制，确保一致性</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">Python</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• requirements.txt（pip）</li>
                    <li>• poetry.lock（Poetry）</li>
                    <li>• Pipfile.lock（Pipenv）</li>
                    <li>• 使用虚拟环境隔离依赖</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">依赖安全审计</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">Node.js</div>
                  <div className="text-xs text-muted-foreground font-mono space-y-1">
                    <div>npm audit</div>
                    <div>npm audit fix</div>
                    <div>yarn audit</div>
                    <div>pnpm audit</div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">Python</div>
                  <div className="text-xs text-muted-foreground font-mono space-y-1">
                    <div>pip-audit</div>
                    <div>safety check</div>
                    <div>bandit（代码安全检查）</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-accent/10 border border-accent/30">
                <p className="text-xs text-muted-foreground">
                  💡 使用 <strong className="text-foreground">Dependabot</strong> 或 <strong className="text-foreground">Renovate</strong> 自动更新依赖和安全补丁
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">依赖更新策略</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>定期更新</strong>：每月检查一次过时依赖</li>
                <li>• <strong>安全优先</strong>：优先更新有安全漏洞的依赖</li>
                <li>• <strong>测试驱动</strong>：更新后运行完整测试套件</li>
                <li>• <strong>渐进式更新</strong>：一次更新一个主要依赖，避免大规模变更</li>
                <li>• <strong>文档记录</strong>：记录重大依赖更新和迁移步骤</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: 错误处理规范 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-primary" />
            错误处理规范
          </h2>
          <p className="text-muted-foreground mb-6">
            良好的错误处理让程序更健壮，用户体验更好。不同语言有不同的错误处理模式。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">错误类型分类</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">业务错误</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• 用户输入错误</li>
                    <li>• 业务规则违反</li>
                    <li>• 返回友好的错误提示</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">系统错误</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• 数据库连接失败</li>
                    <li>• 文件系统错误</li>
                    <li>• 记录详细日志</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">网络错误</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• API 调用失败</li>
                    <li>• 超时错误</li>
                    <li>• 实现重试机制</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">错误处理模式</h3>
              <Tabs defaultValue="try-catch" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="try-catch">Try-Catch</TabsTrigger>
                  <TabsTrigger value="result">Result 类型</TabsTrigger>
                  <TabsTrigger value="option">Option 类型</TabsTrigger>
                </TabsList>
                <TabsContent value="try-catch" className="space-y-4">
                  <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs">
                    <div className="text-foreground mb-2">TypeScript/JavaScript/Python/Java：</div>
                    <pre className="text-muted-foreground whitespace-pre-wrap">{`try {
  const result = await riskyOperation();
  return result;
} catch (error) {
  logger.error('操作失败', { error });
  throw new BusinessError('用户友好的错误信息');
}`}</pre>
                  </div>
                </TabsContent>
                <TabsContent value="result" className="space-y-4">
                  <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs">
                    <div className="text-foreground mb-2">Rust/Go：</div>
                    <pre className="text-muted-foreground whitespace-pre-wrap">{`// Rust
fn risky_operation() -> Result<String, Error> {
    // ...
    Ok(result)
}

// Go
func riskyOperation() (string, error) {
    // ...
    return result, nil
}`}</pre>
                  </div>
                </TabsContent>
                <TabsContent value="option" className="space-y-4">
                  <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs">
                    <div className="text-foreground mb-2">Rust/Swift：</div>
                    <pre className="text-muted-foreground whitespace-pre-wrap">{`// Rust
fn find_user(id: u32) -> Option<User> {
    // ...
    Some(user)
}

// Swift
func findUser(id: Int) -> User? {
    // ...
    return user
}`}</pre>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">错误处理最佳实践</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>明确错误类型</strong>：定义清晰的错误类型和错误码</li>
                <li>• <strong>记录错误日志</strong>：记录完整的错误信息和上下文</li>
                <li>• <strong>用户友好提示</strong>：向用户显示友好的错误信息，隐藏技术细节</li>
                <li>• <strong>错误恢复</strong>：提供重试、降级等恢复机制</li>
                <li>• <strong>错误边界</strong>：使用错误边界（React）或中间件（Express）统一处理错误</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: 日志规范 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            日志规范
          </h2>
          <p className="text-muted-foreground mb-6">
            良好的日志记录是调试和监控的基础。结构化日志让日志更易分析和处理。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">日志级别</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {[
                  { level: "DEBUG", desc: "详细调试信息", use: "开发调试" },
                  { level: "INFO", desc: "一般信息", use: "正常操作" },
                  { level: "WARN", desc: "警告信息", use: "潜在问题" },
                  { level: "ERROR", desc: "错误信息", use: "错误但可恢复" },
                  { level: "FATAL", desc: "致命错误", use: "系统无法继续" },
                ].map((item) => (
                  <div key={item.level} className="p-3 rounded-lg bg-secondary/50 text-center">
                    <div className="font-medium text-foreground text-sm">{item.level}</div>
                    <div className="text-xs text-muted-foreground mt-1">{item.desc}</div>
                    <div className="text-xs text-muted-foreground mt-1">{item.use}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">结构化日志（JSON 格式）</h3>
              <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs">
                <div className="text-foreground mb-2">示例：</div>
                <pre className="text-muted-foreground whitespace-pre-wrap">{`{
  "timestamp": "2025-01-27T10:30:00Z",
  "level": "ERROR",
  "message": "用户登录失败",
  "context": {
    "userId": "12345",
    "ip": "192.168.1.1",
    "userAgent": "Mozilla/5.0..."
  },
  "error": {
    "type": "AuthenticationError",
    "message": "密码错误",
    "stack": "..."
  },
  "requestId": "req-abc123"
}`}</pre>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">日志上下文</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">必需字段</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• timestamp：时间戳</li>
                    <li>• level：日志级别</li>
                    <li>• message：日志消息</li>
                    <li>• requestId：请求 ID（追踪）</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">可选字段</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• userId：用户 ID</li>
                    <li>• operation：操作类型</li>
                    <li>• duration：操作耗时</li>
                    <li>• metadata：额外元数据</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">敏感信息脱敏</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>密码</strong>：永远不要记录密码，使用 <code className="bg-secondary px-1 rounded">***</code> 替代</li>
                <li>• <strong>Token</strong>：只记录 Token 的前几位和后几位</li>
                <li>• <strong>身份证号</strong>：脱敏处理，只显示部分数字</li>
                <li>• <strong>银行卡号</strong>：只显示后 4 位</li>
                <li>• <strong>邮箱</strong>：可以考虑部分脱敏（如：u***@example.com）</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: 性能优化 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Gauge className="h-6 w-6 text-primary" />
            性能优化
          </h2>
          <p className="text-muted-foreground mb-6">
            性能优化是持续的过程。从代码层面到架构层面，都有优化空间。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">代码性能优化</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">算法优化</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• 选择合适的数据结构（HashMap vs List）</li>
                    <li>• 避免嵌套循环，使用索引或 Map</li>
                    <li>• 使用缓存避免重复计算</li>
                    <li>• 时间复杂度分析（O(n) vs O(n²)）</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">前端优化</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• 代码分割和懒加载</li>
                    <li>• 图片优化（WebP、懒加载）</li>
                    <li>• 使用 React.memo 避免不必要的重渲染</li>
                    <li>• 虚拟滚动（长列表）</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">数据库查询优化</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">索引优化</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• 为常用查询字段添加索引</li>
                    <li>• 避免过度索引（影响写入性能）</li>
                    <li>• 使用复合索引优化多字段查询</li>
                    <li>• 定期分析查询计划（EXPLAIN）</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">查询优化</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• 避免 SELECT *，只查询需要的字段</li>
                    <li>• 使用分页避免一次性加载大量数据</li>
                    <li>• 使用 JOIN 替代多次查询</li>
                    <li>• 避免 N+1 查询问题</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">缓存策略</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">内存缓存</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• 本地缓存（Map、LRU Cache）</li>
                    <li>• 适合热点数据</li>
                    <li>• 注意内存限制</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">Redis</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• 分布式缓存</li>
                    <li>• 设置过期时间</li>
                    <li>• 缓存穿透/击穿/雪崩防护</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">CDN</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• 静态资源加速</li>
                    <li>• 图片、CSS、JS 文件</li>
                    <li>• 边缘节点缓存</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">性能监控</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>APM 工具</strong>：New Relic、Datadog、Sentry（性能监控）</li>
                <li>• <strong>性能分析</strong>：Chrome DevTools、Python cProfile、Go pprof</li>
                <li>• <strong>指标监控</strong>：响应时间、吞吐量、错误率、资源使用率</li>
                <li>• <strong>告警机制</strong>：设置性能阈值，超过阈值自动告警</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 7: 安全最佳实践 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            安全最佳实践
          </h2>
          <p className="text-muted-foreground mb-6">
            安全不是可选项，而是必须项。从代码层面到部署层面，都需要考虑安全问题。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">输入验证和清理</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">前端验证</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• 使用 Zod、Yup 等库验证表单输入</li>
                    <li>• 客户端验证提升用户体验</li>
                    <li>• 但永远不要只依赖前端验证</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">后端验证</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• 所有输入都必须验证</li>
                    <li>• 使用白名单而非黑名单</li>
                    <li>• 清理和转义用户输入</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">常见攻击防护</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">SQL 注入</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• 使用参数化查询（Prepared Statements）</li>
                    <li>• 使用 ORM（Prisma、TypeORM）</li>
                    <li>• 永远不要拼接 SQL 字符串</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">XSS（跨站脚本）</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• 输出转义（React 自动转义）</li>
                    <li>• 使用 Content Security Policy（CSP）</li>
                    <li>• 避免使用 dangerouslySetInnerHTML</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">CSRF（跨站请求伪造）</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• 使用 CSRF Token</li>
                    <li>• SameSite Cookie 属性</li>
                    <li>• 验证 Referer Header</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">敏感数据加密</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• 密码使用 bcrypt、Argon2 哈希</li>
                    <li>• 传输使用 HTTPS（TLS）</li>
                    <li>• 存储敏感数据加密</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">密钥管理</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">环境变量</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• 使用 .env 文件（不提交到 Git）</li>
                    <li>• 使用 .env.example 作为模板</li>
                    <li>• 生产环境使用密钥管理服务</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">密钥管理服务</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• AWS Secrets Manager</li>
                    <li>• HashiCorp Vault</li>
                    <li>• Azure Key Vault</li>
                    <li>• 定期轮换密钥</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">OWASP Top 10 防护</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                {[
                  "注入攻击（SQL、NoSQL、命令注入）",
                  "失效的身份认证",
                  "敏感数据泄露",
                  "XML 外部实体（XXE）",
                  "失效的访问控制",
                  "安全配置错误",
                  "XSS 跨站脚本",
                  "不安全的反序列化",
                  "使用含有已知漏洞的组件",
                  "不足的日志记录和监控",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-accent">{index + 1}.</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: 代码审查（增强） */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-primary" />
            代码审查
          </h2>
          <p className="text-muted-foreground mb-6">
            代码审查是保证代码质量的重要环节。建立清晰的审查流程和清单，让审查更高效。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">审查清单</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">功能</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>☐ 功能是否符合需求</li>
                    <li>☐ 边界情况是否处理</li>
                    <li>☐ 错误处理是否完善</li>
                    <li>☐ 测试是否充分</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">性能</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>☐ 是否有性能问题</li>
                    <li>☐ 数据库查询是否优化</li>
                    <li>☐ 是否有内存泄漏</li>
                    <li>☐ 缓存使用是否合理</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">安全</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>☐ 输入验证是否完整</li>
                    <li>☐ 敏感信息是否泄露</li>
                    <li>☐ 权限检查是否正确</li>
                    <li>☐ 依赖是否有安全漏洞</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">可维护性</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>☐ 代码是否清晰易读</li>
                    <li>☐ 命名是否规范</li>
                    <li>☐ 注释是否充分</li>
                    <li>☐ 是否遵循项目规范</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">审查最佳实践</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-foreground">及时审查</strong>：PR 创建后尽快审查，避免阻塞开发
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-foreground">建设性反馈</strong>：指出问题并提供改进建议，而非只批评
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-foreground">小批量审查</strong>：每次审查的代码量控制在 400 行以内
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-foreground">自动化检查</strong>：使用 CI/CD 自动检查格式、测试、安全
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 9: 持续改进 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            持续改进
          </h2>
          <p className="text-muted-foreground mb-6">
            代码质量不是一次性的工作，而是持续改进的过程。建立质量指标和监控机制。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">代码质量指标</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">圈复杂度</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• 衡量代码复杂度</li>
                    <li>• 目标：&lt; 10</li>
                    <li>• 工具：SonarQube、CodeClimate</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">代码覆盖率</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• 测试覆盖的代码比例</li>
                    <li>• 目标：&gt; 80%</li>
                    <li>• 工具：Jest、Coverage.py、JaCoCo</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">技术债务</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• 代码异味、重复代码</li>
                    <li>• 定期重构</li>
                    <li>• 工具：SonarQube</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">自动化检查（CI/CD 集成）</h3>
              <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs">
                <div className="text-foreground mb-2">GitHub Actions 示例：</div>
                <pre className="text-muted-foreground whitespace-pre-wrap">{`name: Code Quality

on: [push, pull_request]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
      - name: Install dependencies
        run: npm ci
      - name: Run linter
        run: npm run lint
      - name: Run tests
        run: npm test
      - name: Check coverage
        run: npm run test:coverage`}</pre>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">技术债务管理</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>识别债务</strong>：使用工具自动识别代码异味和重复代码</li>
                <li>• <strong>优先级排序</strong>：根据影响范围和修复成本排序</li>
                <li>• <strong>定期重构</strong>：每个 Sprint 分配一定时间重构</li>
                <li>• <strong>记录债务</strong>：在 Issue 或技术债务清单中记录</li>
                <li>• <strong>避免新债务</strong>：代码审查时关注技术债务</li>
              </ul>
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
                掌握不同语言的代码规范（TypeScript、Python、Java、Go 等）和工具配置
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                熟练使用 Git 进行版本控制，掌握分支策略和代码审查流程
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                理解依赖管理的重要性，掌握安全审计和更新策略
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                掌握错误处理和日志规范，提升代码健壮性
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">5</span>
                了解性能优化和安全最佳实践，编写高质量代码
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">6</span>
                建立代码审查和持续改进机制，提升团队代码质量
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/advanced/ai-frameworks" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：AI 应用框架全景
          </Link>
        </Button>
        <Button asChild>
          <Link href="/advanced/ui" className="flex items-center gap-2">
            下一章：界面交互
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}

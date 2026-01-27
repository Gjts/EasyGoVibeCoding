import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Code, Server, Globe, CheckCircle2, AlertTriangle, Zap, Settings, Database } from "lucide-react"
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

export default function EngineeringPage() {
  return (
    <CourseLayout
      title="实践篇"
      description="项目实战"
      chapters={chapters}
      currentChapter="理工科学生项目"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 2 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          理工科学生项目
        </h1>
        <p className="text-lg text-muted-foreground">
          适合有编程基础的用户，通过API服务和全栈应用开发，深入理解AI工具在软件开发中的实际应用，掌握企业级开发的最佳实践。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Project 1: API服务开发 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Server className="h-6 w-6 text-primary" />
            项目1：API服务开发
          </h2>
          
          {/* 项目概述 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">项目概述</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">1</span>
                <div>
                  <strong className="text-foreground">项目目标</strong>：开发一个RESTful API服务，支持用户管理、数据CRUD操作，包含认证、错误处理、数据验证等功能
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">2</span>
                <div>
                  <strong className="text-foreground">工具栈</strong>：Cursor（Agent模式）+ GitHub Copilot（代码补全）+ Continue.dev（代码审查）
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">3</span>
                <div>
                  <strong className="text-foreground">时间估算</strong>：8-10小时（包含设计、开发、测试）
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">4</span>
                <div>
                  <strong className="text-foreground">难度等级</strong>：中级（需要基本的编程和API设计知识）
                </div>
              </div>
            </div>
          </div>

          {/* 技术选型分析 */}
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5 mb-6">
            <h3 className="font-semibold text-foreground mb-4">技术选型分析：为什么选择这个工具组合？</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Cursor Agent：架构设计和代码生成</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>项目结构生成</strong>：Agent可以理解需求，自动生成合理的项目结构</li>
                  <li>• <strong>架构设计</strong>：帮助设计API路由、中间件、错误处理等架构</li>
                  <li>• <strong>代码生成</strong>：根据需求描述生成完整的CRUD操作代码</li>
                  <li>• <strong>最佳实践</strong>：自动应用RESTful设计原则、错误处理模式等</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">GitHub Copilot：实时代码补全</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>代码补全</strong>：输入函数名或注释，自动补全代码实现</li>
                  <li>• <strong>上下文理解</strong>：理解当前代码上下文，提供相关建议</li>
                  <li>• <strong>快速迭代</strong>：减少重复代码编写，提高开发速度</li>
                  <li>• <strong>多语言支持</strong>：支持多种编程语言和框架</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Continue.dev：代码审查和优化</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>代码审查</strong>：使用本地模型审查代码质量，发现潜在问题</li>
                  <li>• <strong>性能优化</strong>：识别性能瓶颈，提供优化建议</li>
                  <li>• <strong>安全审计</strong>：检查安全漏洞，提供修复建议</li>
                  <li>• <strong>私有部署</strong>：代码不上传到云端，保护隐私</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50 mt-4">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">工具协同效应</strong>：Cursor Agent负责整体架构和复杂逻辑生成，Copilot负责日常代码补全和快速迭代，Continue.dev负责代码质量保证。这个组合实现了从设计到实现再到优化的完整开发流程，既保证了开发速度，又确保了代码质量。
                </p>
              </div>
            </div>
          </div>

          {/* 详细步骤 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">详细步骤</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-foreground mb-3">Step 1: 需求分析与API设计（1-2小时）</h4>
                <div className="space-y-2 text-sm text-muted-foreground ml-4">
                  <p>1. 明确API需求：用户管理、数据CRUD、认证授权</p>
                  <p>2. 使用Cursor Agent设计API结构：</p>
                  <div className="p-3 rounded-lg bg-secondary/50 font-mono text-xs">
                    "设计一个用户管理API，包含：<br/>
                    - POST /api/users（创建用户）<br/>
                    - GET /api/users（获取用户列表，支持分页和筛选）<br/>
                    - GET /api/users/:id（获取单个用户）<br/>
                    - PUT /api/users/:id（更新用户）<br/>
                    - DELETE /api/users/:id（删除用户）<br/>
                    - POST /api/auth/login（用户登录）<br/>
                    - POST /api/auth/register（用户注册）<br/>
                    使用JWT进行身份认证，实现RBAC权限控制"
                  </div>
                  <p>3. Cursor会生成API设计文档和路由结构</p>
                  <p>4. 定义数据模型（User、Role等）</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-3">Step 2: 使用Cursor Agent生成项目结构（1小时）</h4>
                <div className="space-y-2 text-sm text-muted-foreground ml-4">
                  <p>1. 在Cursor中创建新项目，选择技术栈（如Node.js + Express）</p>
                  <p>2. 使用Agent模式，告诉Cursor你的需求：</p>
                  <div className="p-3 rounded-lg bg-secondary/50 font-mono text-xs">
                    "创建一个Express API项目，包含：<br/>
                    - 项目结构（routes、controllers、models、middleware）<br/>
                    - 数据库配置（使用Prisma ORM）<br/>
                    - 环境变量配置<br/>
                    - 错误处理中间件<br/>
                    - 日志记录中间件<br/>
                    - 认证中间件（JWT）"
                  </div>
                  <p>3. Cursor会生成完整的项目结构和基础代码</p>
                  <p>4. 检查生成的结构，根据需要进行调整</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-3">Step 3: 使用Copilot加速开发（3-4小时）</h4>
                <div className="space-y-2 text-sm text-muted-foreground ml-4">
                  <p>1. 使用Copilot补全CRUD操作代码：</p>
                  <ul className="ml-4 space-y-1">
                    <li>• 输入函数签名，Copilot自动补全实现</li>
                    <li>• 输入注释描述需求，Copilot生成代码</li>
                    <li>• 使用Copilot生成数据验证逻辑</li>
                    <li>• 使用Copilot生成错误处理代码</li>
                  </ul>
                  <p>2. 实现认证和授权功能：</p>
                  <ul className="ml-4 space-y-1">
                    <li>• JWT token生成和验证</li>
                    <li>• 密码加密（bcrypt）</li>
                    <li>• 权限检查中间件</li>
                  </ul>
                  <p>3. 添加数据验证（使用Joi或Zod）</p>
                  <p>4. 实现分页和筛选功能</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-3">Step 4: 使用Continue.dev进行代码审查（1小时）</h4>
                <div className="space-y-2 text-sm text-muted-foreground ml-4">
                  <p>1. 配置Continue.dev，连接本地模型（Ollama）</p>
                  <p>2. 使用Continue.dev审查代码：</p>
                  <ul className="ml-4 space-y-1">
                    <li>• 检查代码质量和最佳实践</li>
                    <li>• 识别潜在的性能问题</li>
                    <li>• 检查安全漏洞</li>
                    <li>• 提供优化建议</li>
                  </ul>
                  <p>3. 根据审查结果优化代码</p>
                  <p>4. 确保代码符合团队规范</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-3">Step 5: 测试与部署（2小时）</h4>
                <div className="space-y-2 text-sm text-muted-foreground ml-4">
                  <p>1. 编写单元测试（使用Jest）</p>
                  <p>2. 编写集成测试（测试API端点）</p>
                  <p>3. 使用Postman或Thunder Client测试API</p>
                  <p>4. 部署到云平台（如Railway、Render、Vercel）</p>
                  <p>5. 配置CI/CD流程（GitHub Actions）</p>
                </div>
              </div>
            </div>
          </div>

          {/* 代码示例 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">关键代码示例</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">用户控制器（Cursor Agent生成）</h4>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                  <pre>{`// controllers/userController.js
const User = require('../models/User')
const { validationResult } = require('express-validator')

exports.createUser = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password, role } = req.body
    
    // 检查邮箱是否已存在
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' })
    }

    // 创建用户
    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role: role || 'user'
    })

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}`}</pre>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">认证中间件（Copilot补全）</h4>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                  <pre>{`// middleware/auth.js
const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' })
    }
    
    next()
  }
}

module.exports = { authenticate, authorize }`}</pre>
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
                <h4 className="font-medium text-foreground mb-2">问题1：API设计不符合RESTful规范</h4>
                <p className="ml-4">解决方案：使用Cursor Agent重新设计API结构，参考RESTful最佳实践。确保使用正确的HTTP方法（GET、POST、PUT、DELETE）和状态码。</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">问题2：错误处理不统一</h4>
                <p className="ml-4">解决方案：创建统一的错误处理中间件，使用Continue.dev审查错误处理代码，确保所有错误都返回标准格式。</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">问题3：性能问题（数据库查询慢）</h4>
                <p className="ml-4">解决方案：使用Continue.dev分析性能瓶颈，添加数据库索引，使用查询优化，实现缓存机制。</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">问题4：安全问题（SQL注入、XSS）</h4>
                <p className="ml-4">解决方案：使用参数化查询，输入验证和清理，使用Continue.dev进行安全审计。</p>
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
                <span>API设计符合RESTful规范，使用正确的HTTP方法和状态码</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>实现了完整的CRUD操作，功能正常</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>认证和授权功能正常，JWT token生成和验证正确</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>数据验证完整，输入验证和错误处理统一</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>代码已通过Continue.dev审查，质量和安全性达标</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>单元测试和集成测试通过，覆盖率达标</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>API文档完整（Swagger/OpenAPI），易于理解和使用</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>已部署到生产环境，可以正常访问</span>
              </div>
            </div>
          </div>
        </section>

        {/* Project 2: 全栈应用开发 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Globe className="h-6 w-6 text-primary" />
            项目2：全栈应用开发
          </h2>
          
          {/* 项目概述 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">项目概述</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">1</span>
                <div>
                  <strong className="text-foreground">项目目标</strong>：开发一个完整的全栈应用（如任务管理工具、博客平台），包含前端UI、后端API、数据库、用户认证等完整功能
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">2</span>
                <div>
                  <strong className="text-foreground">工具栈</strong>：bolt.new（前端快速搭建）+ Cursor（后端开发）+ Fabric（代码优化）
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">3</span>
                <div>
                  <strong className="text-foreground">时间估算</strong>：12-16小时（包含前后端开发和集成）
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">4</span>
                <div>
                  <strong className="text-foreground">难度等级</strong>：中高级（需要全栈开发知识）
                </div>
              </div>
            </div>
          </div>

          {/* 技术选型分析 */}
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5 mb-6">
            <h3 className="font-semibold text-foreground mb-4">技术选型分析：为什么选择bolt.new + Cursor + Fabric？</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">bolt.new：浏览器内全栈开发</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>WebContainers技术</strong>：在浏览器中运行Node.js，无需本地环境</li>
                  <li>• <strong>即时预览</strong>：代码修改立即生效，实时看到效果</li>
                  <li>• <strong>快速原型</strong>：几分钟内搭建完整的前端应用</li>
                  <li>• <strong>协作友好</strong>：分享链接即可协作开发</li>
                  <li>• <strong>一键部署</strong>：直接部署到Vercel等平台</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Cursor：后端API开发</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>API开发</strong>：使用Agent模式快速生成后端API</li>
                  <li>• <strong>数据库集成</strong>：集成Prisma、TypeORM等ORM框架</li>
                  <li>• <strong>认证系统</strong>：实现JWT、OAuth等认证方案</li>
                  <li>• <strong>业务逻辑</strong>：处理复杂的业务逻辑和数据验证</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Fabric：代码质量优化</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>代码审查</strong>：使用Patterns审查代码质量</li>
                  <li>• <strong>性能优化</strong>：识别和优化性能瓶颈</li>
                  <li>• <strong>最佳实践</strong>：应用行业最佳实践和设计模式</li>
                  <li>• <strong>代码重构</strong>：重构代码，提高可维护性</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50 mt-4">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">工具协同效应</strong>：bolt.new负责快速搭建前端UI和基础交互，Cursor负责开发后端API和业务逻辑，Fabric负责优化代码质量和性能。这个组合实现了前后端分离开发，既保证了开发速度，又确保了代码质量，适合中大型全栈项目。
                </p>
              </div>
            </div>
          </div>

          {/* 详细步骤 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">详细步骤</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-foreground mb-3">Step 1: 使用bolt.new快速搭建前端（3-4小时）</h4>
                <div className="space-y-2 text-sm text-muted-foreground ml-4">
                  <p>1. 访问bolt.new，创建新项目</p>
                  <p>2. 使用AI助手描述前端需求：</p>
                  <div className="p-3 rounded-lg bg-secondary/50 font-mono text-xs">
                    "创建一个任务管理应用的前端，包含：<br/>
                    - 登录/注册页面<br/>
                    - 任务列表页面（显示所有任务）<br/>
                    - 任务详情页面<br/>
                    - 创建/编辑任务表单<br/>
                    - 用户设置页面<br/>
                    使用Next.js + TypeScript + Tailwind CSS，支持暗色主题"
                  </div>
                  <p>3. bolt.new会生成完整的前端代码</p>
                  <p>4. 调整UI样式和交互，添加动画效果</p>
                  <p>5. 实现状态管理（使用Zustand或Context API）</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-3">Step 2: 使用Cursor开发后端API（4-5小时）</h4>
                <div className="space-y-2 text-sm text-muted-foreground ml-4">
                  <p>1. 在Cursor中创建后端项目（Node.js + Express）</p>
                  <p>2. 使用Agent模式生成API结构：</p>
                  <div className="p-3 rounded-lg bg-secondary/50 font-mono text-xs">
                    "创建任务管理API，包含：<br/>
                    - 用户认证API（注册、登录、刷新token）<br/>
                    - 任务CRUD API<br/>
                    - 任务筛选和搜索API<br/>
                    - 用户设置API<br/>
                    使用Prisma ORM，PostgreSQL数据库，JWT认证"
                  </div>
                  <p>3. 实现数据库模型和关系</p>
                  <p>4. 实现API端点和业务逻辑</p>
                  <p>5. 添加数据验证和错误处理</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-3">Step 3: 前后端集成（2-3小时）</h4>
                <div className="space-y-2 text-sm text-muted-foreground ml-4">
                  <p>1. 配置API客户端（使用axios或fetch）</p>
                  <p>2. 实现API调用函数：</p>
                  <ul className="ml-4 space-y-1">
                    <li>• 用户认证相关API</li>
                    <li>• 任务CRUD API</li>
                    <li>• 错误处理和重试逻辑</li>
                    <li>• Token刷新机制</li>
                  </ul>
                  <p>3. 连接前后端，测试API调用</p>
                  <p>4. 处理加载状态和错误状态</p>
                  <p>5. 实现乐观更新和错误回滚</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-3">Step 4: 使用Fabric优化代码质量（2-3小时）</h4>
                <div className="space-y-2 text-sm text-muted-foreground ml-4">
                  <p>1. 使用Fabric的Patterns审查代码：</p>
                  <ul className="ml-4 space-y-1">
                    <li>• 代码质量Pattern</li>
                    <li>• 性能优化Pattern</li>
                    <li>• 安全审计Pattern</li>
                    <li>• 最佳实践Pattern</li>
                  </ul>
                  <p>2. 根据Fabric的建议优化代码</p>
                  <p>3. 重构重复代码，提取公共组件</p>
                  <p>4. 优化数据库查询，添加索引</p>
                  <p>5. 实现缓存机制（Redis）</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-3">Step 5: 集成测试与部署（1-2小时）</h4>
                <div className="space-y-2 text-sm text-muted-foreground ml-4">
                  <p>1. 编写端到端测试（使用Playwright或Cypress）</p>
                  <p>2. 测试前后端集成功能</p>
                  <p>3. 部署前端到Vercel</p>
                  <p>4. 部署后端到Railway或Render</p>
                  <p>5. 配置环境变量和数据库连接</p>
                  <p>6. 测试生产环境功能</p>
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
                <h4 className="font-medium text-foreground mb-2">问题1：前后端通信失败（CORS错误）</h4>
                <p className="ml-4">解决方案：在后端配置CORS中间件，允许前端域名访问。检查API URL配置是否正确。</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">问题2：状态同步问题（前端状态与后端不一致）</h4>
                <p className="ml-4">解决方案：实现乐观更新和错误回滚，使用React Query或SWR管理服务器状态。</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">问题3：部署配置复杂</h4>
                <p className="ml-4">解决方案：使用环境变量管理配置，使用Docker容器化部署，使用CI/CD自动化部署流程。</p>
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
                <span>前端UI完整，所有页面和功能正常</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>后端API完整，所有端点功能正常</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>前后端集成正常，数据流转正确</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>用户认证和授权功能正常</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>代码已通过Fabric审查，质量达标</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>性能优化完成，加载速度快</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>前后端都已部署，可以正常访问</span>
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
                掌握API开发的最佳实践，能够设计符合RESTful规范的API
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                理解全栈开发的完整流程，能够独立完成前后端分离项目
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                能够使用多个工具协同工作，发挥工具组合的协同效应
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                掌握代码质量保证方法，能够使用工具进行代码审查和优化
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">5</span>
                具备解决实际问题的能力，能够处理前后端集成、部署等复杂问题
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/practice/humanities" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：文科生 / 商科生项目
          </Link>
        </Button>
        <Button asChild>
          <Link href="/practice/professional" className="flex items-center gap-2">
            下一章：职场人士项目
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}

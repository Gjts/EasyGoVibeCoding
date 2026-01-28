import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Settings, Code, Bug, Zap, FileCode, Terminal, Package, Monitor, Server, Smartphone, Cpu, MemoryStick, Layers, TrendingUp, GitBranch } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

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

interface LanguageConfig {
  id: string
  name: string
  description: string
  recommendedVersion: string
  installation: string[]
  versionManager: {
    name: string
    install: string
    usage: string[]
  }
  packageManager: {
    name: string
    install: string
    config: string[]
  }
  mirror: {
    name: string
    url: string
    config: string[]
  }
  ide: string[]
}

interface DevEnvironmentCategory {
  id: 'frontend' | 'backend' | 'mobile'
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  technologies: LanguageConfig[]
}

// 后端语言配置
const backendConfigs: LanguageConfig[] = [
  {
    id: "java",
    name: "Java",
    description: "企业级开发的霸主，Spring Boot 生态成熟",
    recommendedVersion: "OpenJDK 17+",
    installation: [
      "下载并安装 OpenJDK（推荐 17 或更高版本）",
      "Windows: 从 Adoptium 或 Microsoft Build of OpenJDK 下载",
      "macOS: 使用 Homebrew 安装 `brew install openjdk@17`",
      "Linux: 使用包管理器安装 `sudo apt install openjdk-17-jdk`",
      "验证安装: `java -version`"
    ],
    versionManager: {
      name: "SDKMAN / jenv",
      install: "SDKMAN: `curl -s \"https://get.sdkman.io\" | bash`",
      usage: [
        "安装多个 JDK 版本: `sdk install java 17.0.8-tem`",
        "切换版本: `sdk use java 17.0.8-tem`",
        "设置默认版本: `sdk default java 17.0.8-tem`"
      ]
    },
    packageManager: {
      name: "Maven / Gradle",
      install: "Maven: 下载并解压，配置环境变量 PATH",
      config: [
        "Maven 配置文件: `~/.m2/settings.xml`",
        "Gradle 配置文件: `~/.gradle/gradle.properties`",
        "项目配置文件: `pom.xml` (Maven) 或 `build.gradle` (Gradle)"
      ]
    },
    mirror: {
      name: "Maven 镜像源",
      url: "阿里云、腾讯云、华为云",
      config: [
        "配置阿里云镜像: 在 `settings.xml` 中添加 `<mirror>` 标签",
        "或使用环境变量: `MAVEN_OPTS=-Dmaven.repo.local=~/.m2/repository`"
      ]
    },
    ide: ["IntelliJ IDEA（推荐）", "Eclipse", "VS Code + Java Extension Pack"]
  },
  {
    id: "python",
    name: "Python",
    description: "AI 与数据分析的首选语言",
    recommendedVersion: "Python 3.11+",
    installation: [
      "下载并安装 Python（推荐 3.11 或更高版本）",
      "Windows: 从 python.org 下载安装包",
      "macOS: 使用 Homebrew 安装 `brew install python@3.11`",
      "Linux: 使用包管理器安装 `sudo apt install python3.11`",
      "验证安装: `python3 --version`"
    ],
    versionManager: {
      name: "pyenv",
      install: "`curl https://pyenv.run | bash`",
      usage: [
        "安装多个 Python 版本: `pyenv install 3.11.5`",
        "设置全局版本: `pyenv global 3.11.5`",
        "设置项目版本: `pyenv local 3.11.5`"
      ]
    },
    packageManager: {
      name: "pip / conda / poetry",
      install: "pip 随 Python 一起安装，conda 需要单独安装 Miniconda",
      config: [
        "使用虚拟环境: `python -m venv venv`",
        "激活虚拟环境: `source venv/bin/activate` (Linux/Mac) 或 `venv\\Scripts\\activate` (Windows)",
        "安装包: `pip install package-name`",
        "使用 Poetry: `pip install poetry` 然后 `poetry init`"
      ]
    },
    mirror: {
      name: "pip 镜像源",
      url: "清华大学、阿里云、豆瓣",
      config: [
        "临时使用: `pip install -i https://pypi.tuna.tsinghua.edu.cn/simple package-name`",
        "永久配置: 创建 `~/.pip/pip.conf` 文件",
        "或使用环境变量: `PIP_INDEX_URL=https://pypi.tuna.tsinghua.edu.cn/simple`"
      ]
    },
    ide: ["PyCharm（推荐）", "VS Code + Python Extension", "Jupyter Notebook"]
  },
  {
    id: "go",
    name: "Go",
    description: "Google 出品，云原生时代的宠儿",
    recommendedVersion: "Go 1.21+",
    installation: [
      "下载并安装 Go（推荐 1.21 或更高版本）",
      "Windows: 从 golang.org 下载安装包",
      "macOS: 使用 Homebrew 安装 `brew install go`",
      "Linux: 使用包管理器安装 `sudo apt install golang-go`",
      "验证安装: `go version`"
    ],
    versionManager: {
      name: "g / gvm",
      install: "g: `curl -sSL https://git.io/g-install | sh -s`",
      usage: [
        "安装多个 Go 版本: `g install 1.21.0`",
        "切换版本: `g 1.21.0`",
        "设置默认版本: `g set 1.21.0`"
      ]
    },
    packageManager: {
      name: "Go Modules",
      install: "Go 1.11+ 内置支持，无需额外安装",
      config: [
        "初始化模块: `go mod init example.com/project`",
        "添加依赖: `go get github.com/gin-gonic/gin`",
        "整理依赖: `go mod tidy`",
        "构建项目: `go build`"
      ]
    },
    mirror: {
      name: "Go 代理",
      url: "goproxy.cn、goproxy.io",
      config: [
        "设置环境变量: `go env -w GOPROXY=https://goproxy.cn,direct`",
        "设置私有模块: `go env -w GOPRIVATE=git.example.com`",
        "查看配置: `go env`"
      ]
    },
    ide: ["GoLand（推荐）", "VS Code + Go Extension", "Vim/Neovim + vim-go"]
  },
  {
    id: "nodejs",
    name: "Node.js",
    description: "JavaScript 运行时，前后端统一",
    recommendedVersion: "Node.js LTS",
    installation: [
      "下载并安装 Node.js（推荐 LTS 版本）",
      "Windows: 从 nodejs.org 下载安装包",
      "macOS: 使用 Homebrew 安装 `brew install node`",
      "Linux: 使用包管理器安装 `sudo apt install nodejs npm`",
      "验证安装: `node --version` 和 `npm --version`"
    ],
    versionManager: {
      name: "nvm",
      install: "Windows: 下载 nvm-windows，macOS/Linux: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash`",
      usage: [
        "安装多个 Node.js 版本: `nvm install 20.10.0`",
        "切换版本: `nvm use 20.10.0`",
        "设置默认版本: `nvm alias default 20.10.0`",
        "列出已安装版本: `nvm list`"
      ]
    },
    packageManager: {
      name: "npm / yarn / pnpm",
      install: "npm 随 Node.js 一起安装，yarn: `npm install -g yarn`，pnpm: `npm install -g pnpm`",
      config: [
        "初始化项目: `npm init` 或 `yarn init` 或 `pnpm init`",
        "安装依赖: `npm install` 或 `yarn install` 或 `pnpm install`",
        "启用 corepack (Node.js 16.9+): `corepack enable`",
        "使用 pnpm: `corepack prepare pnpm@latest --activate`"
      ]
    },
    mirror: {
      name: "npm 镜像源",
      url: "淘宝镜像、腾讯云",
      config: [
        "临时使用: `npm install --registry=https://registry.npmmirror.com`",
        "永久配置: `npm config set registry https://registry.npmmirror.com`",
        "使用 nrm 管理: `npm install -g nrm` 然后 `nrm use taobao`"
      ]
    },
    ide: ["VS Code（推荐）", "WebStorm", "Sublime Text"]
  },
  {
    id: "csharp",
    name: "C#",
    description: "微软出品，Windows 生态王者",
    recommendedVersion: ".NET 8.0",
    installation: [
      "下载并安装 .NET SDK（推荐 8.0 或更高版本）",
      "Windows: 从 dotnet.microsoft.com 下载安装包",
      "macOS: 使用 Homebrew 安装 `brew install --cask dotnet-sdk`",
      "Linux: 按照官方文档安装（Ubuntu: `wget https://dot.net/v1/dotnet-install.sh -O dotnet-install.sh`）",
      "验证安装: `dotnet --version`"
    ],
    versionManager: {
      name: "global.json",
      install: "在项目根目录创建 `global.json` 文件",
      usage: [
        "指定 SDK 版本: `{ \"sdk\": { \"version\": \"8.0.100\" } }`",
        "列出已安装版本: `dotnet --list-sdks`",
        "安装特定版本: `dotnet install 8.0.100`"
      ]
    },
    packageManager: {
      name: "NuGet",
      install: "随 .NET SDK 一起安装，无需额外配置",
      config: [
        "初始化项目: `dotnet new console` 或 `dotnet new webapi`",
        "添加包: `dotnet add package PackageName`",
        "还原依赖: `dotnet restore`",
        "构建项目: `dotnet build`"
      ]
    },
    mirror: {
      name: "NuGet 镜像源",
      url: "阿里云、腾讯云",
      config: [
        "配置 NuGet.config: 在项目根目录或用户目录创建 `NuGet.config`",
        "添加镜像源: `<add key=\"Aliyun\" value=\"https://nuget.cdn.azure.cn/v3/index.json\" />`",
        "或使用环境变量: `NUGET_PACKAGES=~/.nuget/packages`"
      ]
    },
    ide: ["Visual Studio（推荐）", "Rider", "VS Code + C# Extension"]
  },
  {
    id: "rust",
    name: "Rust",
    description: "Mozilla 出品，内存安全的系统语言",
    recommendedVersion: "Rust 1.75+",
    installation: [
      "使用 rustup 安装 Rust（推荐方式）",
      "Windows: 下载并运行 rustup-init.exe",
      "macOS/Linux: 运行 `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`",
      "验证安装: `rustc --version` 和 `cargo --version`"
    ],
    versionManager: {
      name: "rustup",
      install: "rustup 是 Rust 的官方安装工具，随安装脚本一起安装",
      usage: [
        "安装工具链: `rustup toolchain install stable`",
        "切换工具链: `rustup default stable`",
        "安装 nightly: `rustup toolchain install nightly`",
        "列出已安装工具链: `rustup toolchain list`"
      ]
    },
    packageManager: {
      name: "Cargo",
      install: "随 Rust 一起安装，无需额外配置",
      config: [
        "创建新项目: `cargo new project-name`",
        "添加依赖: 在 `Cargo.toml` 中添加 `[dependencies]`  section",
        "构建项目: `cargo build`",
        "运行项目: `cargo run`",
        "运行测试: `cargo test`"
      ]
    },
    mirror: {
      name: "Cargo 镜像源",
      url: "清华大学、中科大",
      config: [
        "配置 `~/.cargo/config.toml` 文件",
        "添加镜像源: `[source.crates-io]` 和 `replace-with = 'tuna'`",
        "或使用环境变量: `CARGO_HOME=~/.cargo`"
      ]
    },
    ide: ["RustRover（推荐）", "VS Code + rust-analyzer Extension", "IntelliJ IDEA + Rust Plugin"]
  },
  {
    id: "cpp",
    name: "C++",
    description: "高性能计算的基石",
    recommendedVersion: "C++17 或 C++20",
    installation: [
      "安装 C++ 编译器",
      "Windows: 安装 Visual Studio 或 MinGW-w64",
      "macOS: 安装 Xcode Command Line Tools: `xcode-select --install`",
      "Linux: 使用包管理器安装 `sudo apt install build-essential`",
      "验证安装: `g++ --version` 或 `clang++ --version`"
    ],
    versionManager: {
      name: "无（通过编译器版本管理）",
      install: "使用不同版本的编译器或工具链",
      usage: [
        "GCC: 使用不同版本的 GCC（如 gcc-9, gcc-10）",
        "Clang: 使用不同版本的 Clang",
        "MSVC: 通过 Visual Studio 安装多个版本"
      ]
    },
    packageManager: {
      name: "vcpkg / Conan",
      install: "vcpkg: `git clone https://github.com/Microsoft/vcpkg.git`，Conan: `pip install conan`",
      config: [
        "使用 CMake: 创建 `CMakeLists.txt` 文件",
        "vcpkg 集成: `cmake -DCMAKE_TOOLCHAIN_FILE=[vcpkg root]/scripts/buildsystems/vcpkg.cmake`",
        "Conan 配置: `conan install .` 然后 `conan build .`"
      ]
    },
    mirror: {
      name: "vcpkg 镜像源",
      url: "GitHub、GitLab",
      config: [
        "配置 vcpkg 镜像: 设置环境变量 `VCPKG_DEFAULT_BINARY_CACHE`",
        "或使用代理: 配置 `HTTP_PROXY` 和 `HTTPS_PROXY` 环境变量"
      ]
    },
    ide: ["Visual Studio（Windows）", "CLion（推荐）", "VS Code + C++ Extension", "Qt Creator"]
  },
  {
    id: "ruby",
    name: "Ruby",
    description: "Ruby on Rails，快速开发典范",
    recommendedVersion: "Ruby 3.2+",
    installation: [
      "下载并安装 Ruby（推荐 3.2 或更高版本）",
      "Windows: 使用 RubyInstaller 下载安装包",
      "macOS: 使用 Homebrew 安装 `brew install ruby`",
      "Linux: 使用包管理器安装 `sudo apt install ruby-full`",
      "验证安装: `ruby --version`"
    ],
    versionManager: {
      name: "rbenv / rvm",
      install: "rbenv: `brew install rbenv` (macOS) 或 `git clone https://github.com/rbenv/rbenv.git ~/.rbenv`",
      usage: [
        "rbenv 安装 Ruby: `rbenv install 3.2.0`",
        "设置全局版本: `rbenv global 3.2.0`",
        "设置项目版本: `rbenv local 3.2.0`",
        "rvm 安装: `rvm install 3.2.0` 然后 `rvm use 3.2.0`"
      ]
    },
    packageManager: {
      name: "Bundler",
      install: "`gem install bundler`",
      config: [
        "初始化项目: `bundle init`",
        "安装依赖: `bundle install`",
        "添加 gem: 在 `Gemfile` 中添加 `gem 'gem-name'`",
        "更新依赖: `bundle update`"
      ]
    },
    mirror: {
      name: "RubyGems 镜像源",
      url: "淘宝镜像、Ruby China",
      config: [
        "移除默认源: `gem sources --remove https://rubygems.org/`",
        "添加镜像源: `gem sources --add https://gems.ruby-china.com/`",
        "或使用 Bundler: 在 `Gemfile` 中添加 `source 'https://gems.ruby-china.com'`"
      ]
    },
    ide: ["RubyMine（推荐）", "VS Code + Ruby Extension", "Sublime Text"]
  },
  {
    id: "php",
    name: "PHP",
    description: "Web 开发的老将",
    recommendedVersion: "PHP 8.2+",
    installation: [
      "下载并安装 PHP（推荐 8.2 或更高版本）",
      "Windows: 从 windows.php.net 下载 ZIP 包",
      "macOS: 使用 Homebrew 安装 `brew install php`",
      "Linux: 使用包管理器安装 `sudo apt install php`",
      "验证安装: `php --version`"
    ],
    versionManager: {
      name: "phpenv",
      install: "`git clone https://github.com/phpenv/phpenv.git ~/.phpenv`",
      usage: [
        "安装 PHP 版本: `phpenv install 8.2.0`",
        "设置全局版本: `phpenv global 8.2.0`",
        "设置项目版本: `phpenv local 8.2.0`",
        "列出已安装版本: `phpenv versions`"
      ]
    },
    packageManager: {
      name: "Composer",
      install: "下载并运行 `php -r \"copy('https://getcomposer.org/installer', 'composer-setup.php');\"`",
      config: [
        "初始化项目: `composer init`",
        "安装依赖: `composer install`",
        "添加包: `composer require vendor/package`",
        "更新依赖: `composer update`",
        "自动加载: Composer 自动生成 `vendor/autoload.php`"
      ]
    },
    mirror: {
      name: "Composer 镜像源",
      url: "阿里云、腾讯云、Packagist 中国镜像",
      config: [
        "全局配置: `composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/`",
        "项目配置: `composer config repo.packagist composer https://mirrors.aliyun.com/composer/`",
        "查看配置: `composer config -l`"
      ]
    },
    ide: ["PhpStorm（推荐）", "VS Code + PHP Extension", "Sublime Text"]
  }
]

// 前端技术栈配置
const frontendConfigs: LanguageConfig[] = [
  {
    id: "nodejs-typescript",
    name: "Node.js / TypeScript",
    description: "JavaScript/TypeScript 运行时和类型系统",
    recommendedVersion: "Node.js LTS + TypeScript 5.0+",
    installation: [
      "下载并安装 Node.js（推荐 LTS 版本）",
      "安装 TypeScript: `npm install -g typescript`",
      "验证安装: `node --version` 和 `tsc --version`",
      "初始化 TypeScript 项目: `tsc --init`"
    ],
    versionManager: {
      name: "nvm",
      install: "Windows: 下载 nvm-windows，macOS/Linux: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash`",
      usage: [
        "安装多个 Node.js 版本: `nvm install 20.10.0`",
        "切换版本: `nvm use 20.10.0`",
        "设置默认版本: `nvm alias default 20.10.0`"
      ]
    },
    packageManager: {
      name: "npm / yarn / pnpm",
      install: "npm 随 Node.js 一起安装，yarn: `npm install -g yarn`，pnpm: `npm install -g pnpm`",
      config: [
        "初始化项目: `npm init` 或 `yarn init` 或 `pnpm init`",
        "安装 TypeScript: `npm install -D typescript @types/node`",
        "配置 tsconfig.json: 设置编译选项和目标版本",
        "启用 corepack: `corepack enable`"
      ]
    },
    mirror: {
      name: "npm 镜像源",
      url: "淘宝镜像、腾讯云",
      config: [
        "临时使用: `npm install --registry=https://registry.npmmirror.com`",
        "永久配置: `npm config set registry https://registry.npmmirror.com`",
        "使用 nrm 管理: `npm install -g nrm` 然后 `nrm use taobao`"
      ]
    },
    ide: ["VS Code（推荐）", "WebStorm", "Sublime Text"]
  },
  {
    id: "react",
    name: "React",
    description: "用于构建用户界面的 JavaScript 库",
    recommendedVersion: "React 18+",
    installation: [
      "使用 Create React App: `npx create-react-app my-app`",
      "使用 Vite: `npm create vite@latest my-app -- --template react`",
      "使用 Next.js: `npx create-next-app@latest my-app`",
      "验证安装: 检查 package.json 中的 react 版本"
    ],
    versionManager: {
      name: "npm / yarn / pnpm",
      install: "通过包管理器管理 React 版本",
      usage: [
        "安装 React: `npm install react react-dom`",
        "安装开发依赖: `npm install -D @types/react @types/react-dom`",
        "更新 React: `npm update react react-dom`"
      ]
    },
    packageManager: {
      name: "npm / yarn / pnpm",
      install: "npm 随 Node.js 一起安装",
      config: [
        "创建项目: `npx create-react-app my-app`",
        "安装依赖: `npm install`",
        "启动开发服务器: `npm start`",
        "构建生产版本: `npm run build`"
      ]
    },
    mirror: {
      name: "npm 镜像源",
      url: "淘宝镜像、腾讯云",
      config: [
        "配置 npm 镜像: `npm config set registry https://registry.npmmirror.com`",
        "使用 nrm 管理: `nrm use taobao`"
      ]
    },
    ide: ["VS Code + React Extension（推荐）", "WebStorm", "CodeSandbox"]
  },
  {
    id: "vue",
    name: "Vue",
    description: "渐进式 JavaScript 框架",
    recommendedVersion: "Vue 3+",
    installation: [
      "使用 Vue CLI: `npm install -g @vue/cli` 然后 `vue create my-project`",
      "使用 Vite: `npm create vite@latest my-app -- --template vue`",
      "使用 Nuxt.js: `npx nuxi@latest init my-app`",
      "验证安装: `vue --version`"
    ],
    versionManager: {
      name: "npm / yarn / pnpm",
      install: "通过包管理器管理 Vue 版本",
      usage: [
        "安装 Vue: `npm install vue`",
        "安装 Vue CLI: `npm install -g @vue/cli`",
        "更新 Vue: `npm update vue`"
      ]
    },
    packageManager: {
      name: "npm / yarn / pnpm",
      install: "npm 随 Node.js 一起安装",
      config: [
        "创建项目: `vue create my-project`",
        "安装依赖: `npm install`",
        "启动开发服务器: `npm run serve`",
        "构建生产版本: `npm run build`"
      ]
    },
    mirror: {
      name: "npm 镜像源",
      url: "淘宝镜像、腾讯云",
      config: [
        "配置 npm 镜像: `npm config set registry https://registry.npmmirror.com`"
      ]
    },
    ide: ["VS Code + Volar Extension（推荐）", "WebStorm", "Vue DevTools"]
  },
  {
    id: "angular",
    name: "Angular",
    description: "企业级 Web 应用框架",
    recommendedVersion: "Angular 17+",
    installation: [
      "安装 Angular CLI: `npm install -g @angular/cli`",
      "创建新项目: `ng new my-project`",
      "验证安装: `ng version`"
    ],
    versionManager: {
      name: "npm / yarn",
      install: "通过包管理器管理 Angular 版本",
      usage: [
        "安装 Angular CLI: `npm install -g @angular/cli`",
        "更新 Angular CLI: `npm install -g @angular/cli@latest`",
        "检查版本: `ng version`"
      ]
    },
    packageManager: {
      name: "npm / yarn",
      install: "npm 随 Node.js 一起安装",
      config: [
        "创建项目: `ng new my-project`",
        "安装依赖: `npm install`",
        "启动开发服务器: `ng serve`",
        "构建生产版本: `ng build --prod`"
      ]
    },
    mirror: {
      name: "npm 镜像源",
      url: "淘宝镜像、腾讯云",
      config: [
        "配置 npm 镜像: `npm config set registry https://registry.npmmirror.com`"
      ]
    },
    ide: ["VS Code + Angular Language Service（推荐）", "WebStorm", "Angular DevTools"]
  },
  {
    id: "svelte",
    name: "Svelte",
    description: "编译时框架，构建高性能应用",
    recommendedVersion: "Svelte 4+",
    installation: [
      "使用 SvelteKit: `npm create svelte@latest my-app`",
      "使用 Vite: `npm create vite@latest my-app -- --template svelte`",
      "验证安装: 检查 package.json 中的 svelte 版本"
    ],
    versionManager: {
      name: "npm / yarn / pnpm",
      install: "通过包管理器管理 Svelte 版本",
      usage: [
        "安装 Svelte: `npm install -D svelte`",
        "安装 SvelteKit: `npm create svelte@latest my-app`",
        "更新 Svelte: `npm update svelte`"
      ]
    },
    packageManager: {
      name: "npm / yarn / pnpm",
      install: "npm 随 Node.js 一起安装",
      config: [
        "创建 SvelteKit 项目: `npm create svelte@latest my-app`",
        "安装依赖: `npm install`",
        "启动开发服务器: `npm run dev`",
        "构建生产版本: `npm run build`"
      ]
    },
    mirror: {
      name: "npm 镜像源",
      url: "淘宝镜像、腾讯云",
      config: [
        "配置 npm 镜像: `npm config set registry https://registry.npmmirror.com`"
      ]
    },
    ide: ["VS Code + Svelte Extension（推荐）", "WebStorm"]
  },
  {
    id: "nextjs",
    name: "Next.js",
    description: "React 全栈框架，支持 SSR 和 SSG",
    recommendedVersion: "Next.js 14+",
    installation: [
      "创建 Next.js 项目: `npx create-next-app@latest my-app`",
      "使用 TypeScript: `npx create-next-app@latest my-app --typescript`",
      "验证安装: 检查 package.json 中的 next 版本"
    ],
    versionManager: {
      name: "npm / yarn / pnpm",
      install: "通过包管理器管理 Next.js 版本",
      usage: [
        "创建项目: `npx create-next-app@latest my-app`",
        "更新 Next.js: `npm update next react react-dom`",
        "检查版本: `npm list next`"
      ]
    },
    packageManager: {
      name: "npm / yarn / pnpm",
      install: "npm 随 Node.js 一起安装",
      config: [
        "创建项目: `npx create-next-app@latest my-app`",
        "安装依赖: `npm install`",
        "启动开发服务器: `npm run dev`",
        "构建生产版本: `npm run build`"
      ]
    },
    mirror: {
      name: "npm 镜像源",
      url: "淘宝镜像、腾讯云",
      config: [
        "配置 npm 镜像: `npm config set registry https://registry.npmmirror.com`"
      ]
    },
    ide: ["VS Code + Next.js Extension（推荐）", "WebStorm"]
  },
  {
    id: "vite",
    name: "Vite",
    description: "下一代前端构建工具",
    recommendedVersion: "Vite 5+",
    installation: [
      "创建 Vite 项目: `npm create vite@latest my-app`",
      "选择模板: React、Vue、Svelte、Vanilla 等",
      "验证安装: 检查 package.json 中的 vite 版本"
    ],
    versionManager: {
      name: "npm / yarn / pnpm",
      install: "通过包管理器管理 Vite 版本",
      usage: [
        "创建项目: `npm create vite@latest my-app`",
        "安装 Vite: `npm install -D vite`",
        "更新 Vite: `npm update vite`"
      ]
    },
    packageManager: {
      name: "npm / yarn / pnpm",
      install: "npm 随 Node.js 一起安装",
      config: [
        "创建项目: `npm create vite@latest my-app`",
        "安装依赖: `npm install`",
        "启动开发服务器: `npm run dev`",
        "构建生产版本: `npm run build`",
        "配置 vite.config.js: 自定义构建选项"
      ]
    },
    mirror: {
      name: "npm 镜像源",
      url: "淘宝镜像、腾讯云",
      config: [
        "配置 npm 镜像: `npm config set registry https://registry.npmmirror.com`"
      ]
    },
    ide: ["VS Code（推荐）", "WebStorm"]
  },
  {
    id: "webpack",
    name: "Webpack",
    description: "模块打包器，用于构建前端应用",
    recommendedVersion: "Webpack 5+",
    installation: [
      "安装 Webpack: `npm install -D webpack webpack-cli`",
      "创建 webpack.config.js 配置文件",
      "验证安装: `npx webpack --version`"
    ],
    versionManager: {
      name: "npm / yarn",
      install: "通过包管理器管理 Webpack 版本",
      usage: [
        "安装 Webpack: `npm install -D webpack webpack-cli`",
        "更新 Webpack: `npm update webpack webpack-cli`",
        "检查版本: `npx webpack --version`"
      ]
    },
    packageManager: {
      name: "npm / yarn",
      install: "npm 随 Node.js 一起安装",
      config: [
        "安装 Webpack: `npm install -D webpack webpack-cli`",
        "创建 webpack.config.js: 配置入口、输出、loader、plugin",
        "安装常用 loader: `npm install -D css-loader style-loader`",
        "构建项目: `npx webpack` 或 `npm run build`"
      ]
    },
    mirror: {
      name: "npm 镜像源",
      url: "淘宝镜像、腾讯云",
      config: [
        "配置 npm 镜像: `npm config set registry https://registry.npmmirror.com`"
      ]
    },
    ide: ["VS Code（推荐）", "WebStorm"]
  }
]

// 移动端技术栈配置
const mobileConfigs: LanguageConfig[] = [
  {
    id: "react-native",
    name: "React Native",
    description: "使用 React 构建原生移动应用",
    recommendedVersion: "React Native 0.72+",
    installation: [
      "安装 Node.js 和 npm",
      "安装 React Native CLI: `npm install -g react-native-cli`",
      "安装 Android Studio（Android 开发）",
      "安装 Xcode（iOS 开发，仅 macOS）",
      "创建项目: `npx react-native init MyApp`"
    ],
    versionManager: {
      name: "nvm",
      install: "Windows: 下载 nvm-windows，macOS/Linux: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash`",
      usage: [
        "安装 Node.js: `nvm install 18`",
        "切换版本: `nvm use 18`",
        "设置默认版本: `nvm alias default 18`"
      ]
    },
    packageManager: {
      name: "npm / yarn",
      install: "npm 随 Node.js 一起安装",
      config: [
        "创建项目: `npx react-native init MyApp`",
        "安装依赖: `npm install` 或 `yarn install`",
        "启动 Metro bundler: `npm start`",
        "运行 Android: `npm run android`",
        "运行 iOS: `npm run ios`"
      ]
    },
    mirror: {
      name: "npm 镜像源",
      url: "淘宝镜像、腾讯云",
      config: [
        "配置 npm 镜像: `npm config set registry https://registry.npmmirror.com`",
        "配置 yarn 镜像: `yarn config set registry https://registry.npmmirror.com`"
      ]
    },
    ide: ["VS Code + React Native Extension（推荐）", "Android Studio", "Xcode"]
  },
  {
    id: "flutter",
    name: "Flutter",
    description: "Google 的跨平台 UI 框架",
    recommendedVersion: "Flutter 3.16+",
    installation: [
      "下载 Flutter SDK: 从 flutter.dev 下载",
      "解压并配置环境变量 PATH",
      "运行 `flutter doctor` 检查环境",
      "安装 Android Studio 和 Xcode（如需要）",
      "创建项目: `flutter create my_app`"
    ],
    versionManager: {
      name: "fvm (Flutter Version Management)",
      install: "`dart pub global activate fvm`",
      usage: [
        "安装 Flutter 版本: `fvm install 3.16.0`",
        "使用版本: `fvm use 3.16.0`",
        "设置全局版本: `fvm global 3.16.0`"
      ]
    },
    packageManager: {
      name: "pub (Dart Package Manager)",
      install: "随 Flutter SDK 一起安装",
      config: [
        "创建项目: `flutter create my_app`",
        "添加依赖: 在 `pubspec.yaml` 中添加依赖",
        "安装依赖: `flutter pub get`",
        "更新依赖: `flutter pub upgrade`",
        "运行项目: `flutter run`"
      ]
    },
    mirror: {
      name: "Flutter 镜像源",
      url: "清华大学、上海交大",
      config: [
        "设置环境变量: `export PUB_HOSTED_URL=https://pub.flutter-io.cn`",
        "设置环境变量: `export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn`",
        "Windows: 在系统环境变量中设置"
      ]
    },
    ide: ["VS Code + Flutter Extension（推荐）", "Android Studio + Flutter Plugin", "IntelliJ IDEA + Flutter Plugin"]
  },
  {
    id: "swift-ios",
    name: "Swift / iOS",
    description: "苹果原生 iOS 开发",
    recommendedVersion: "Swift 5.9+ / iOS 17+",
    installation: [
      "安装 Xcode: 从 App Store 下载（仅 macOS）",
      "安装 Xcode Command Line Tools: `xcode-select --install`",
      "验证安装: `swift --version`",
      "创建项目: 使用 Xcode 创建新项目"
    ],
    versionManager: {
      name: "Xcode 版本管理",
      install: "通过 Xcode 管理不同版本",
      usage: [
        "安装多个 Xcode 版本: 从 developer.apple.com 下载",
        "切换版本: `sudo xcode-select --switch /Applications/Xcode.app`",
        "查看当前版本: `xcode-select -p`"
      ]
    },
    packageManager: {
      name: "Swift Package Manager / CocoaPods",
      install: "SPM 随 Xcode 一起安装，CocoaPods: `sudo gem install cocoapods`",
      config: [
        "使用 SPM: 在 Xcode 中 File > Add Packages",
        "使用 CocoaPods: 创建 `Podfile` 然后 `pod install`",
        "更新依赖: `pod update`",
        "构建项目: `xcodebuild` 或使用 Xcode"
      ]
    },
    mirror: {
      name: "CocoaPods 镜像源",
      url: "清华大学、gitee",
      config: [
        "移除默认源: `pod repo remove master`",
        "添加镜像: `pod repo add master https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git`",
        "更新仓库: `pod repo update`"
      ]
    },
    ide: ["Xcode（必需）", "VS Code + Swift Extension", "AppCode"]
  },
  {
    id: "kotlin-android",
    name: "Kotlin / Android",
    description: "Android 原生开发",
    recommendedVersion: "Kotlin 1.9+ / Android API 34+",
    installation: [
      "安装 Android Studio: 从 developer.android.com 下载",
      "安装 Android SDK: 通过 Android Studio SDK Manager",
      "安装 Kotlin 插件: Android Studio > Plugins",
      "创建项目: File > New > New Project > Kotlin"
    ],
    versionManager: {
      name: "SDK Manager",
      install: "通过 Android Studio SDK Manager 管理",
      usage: [
        "打开 SDK Manager: Tools > SDK Manager",
        "安装不同 API 级别: 选择需要的 API 版本",
        "安装构建工具: SDK Tools 标签页",
        "查看已安装版本: SDK Platforms 标签页"
      ]
    },
    packageManager: {
      name: "Gradle",
      install: "随 Android Studio 一起安装",
      config: [
        "创建项目: File > New > New Project",
        "配置 build.gradle: 添加依赖和插件",
        "同步项目: File > Sync Project with Gradle Files",
        "构建项目: Build > Make Project",
        "运行项目: Run > Run 'app'"
      ]
    },
    mirror: {
      name: "Gradle 镜像源",
      url: "阿里云、腾讯云",
      config: [
        "配置 build.gradle: 添加 `maven { url 'https://maven.aliyun.com/repository/public' }`",
        "或配置全局: `~/.gradle/init.gradle`",
        "配置代理: 在 `gradle.properties` 中设置代理"
      ]
    },
    ide: ["Android Studio（必需）", "IntelliJ IDEA + Android Plugin", "VS Code + Kotlin Extension"]
  },
  {
    id: "dart",
    name: "Dart",
    description: "Flutter 开发语言",
    recommendedVersion: "Dart 3.2+",
    installation: [
      "安装 Flutter SDK（包含 Dart）: 从 flutter.dev 下载",
      "或单独安装 Dart SDK: 从 dart.dev 下载",
      "验证安装: `dart --version`",
      "创建项目: `dart create my_app`"
    ],
    versionManager: {
      name: "fvm (通过 Flutter)",
      install: "通过 Flutter Version Management 管理",
      usage: [
        "安装 Flutter 版本: `fvm install 3.16.0`",
        "切换版本: `fvm use 3.16.0`",
        "查看 Dart 版本: `dart --version`"
      ]
    },
    packageManager: {
      name: "pub",
      install: "随 Dart SDK 一起安装",
      config: [
        "创建项目: `dart create my_app`",
        "添加依赖: 在 `pubspec.yaml` 中添加",
        "安装依赖: `dart pub get`",
        "更新依赖: `dart pub upgrade`",
        "运行项目: `dart run`"
      ]
    },
    mirror: {
      name: "pub 镜像源",
      url: "清华大学、上海交大",
      config: [
        "设置环境变量: `export PUB_HOSTED_URL=https://pub.flutter-io.cn`",
        "Windows: 在系统环境变量中设置"
      ]
    },
    ide: ["VS Code + Dart Extension（推荐）", "IntelliJ IDEA + Dart Plugin", "Android Studio + Dart Plugin"]
  },
  {
    id: "android-studio",
    name: "Android Studio",
    description: "Android 官方开发 IDE",
    recommendedVersion: "Android Studio Hedgehog+",
    installation: [
      "下载 Android Studio: 从 developer.android.com 下载",
      "安装 Android Studio: 运行安装程序",
      "首次启动: 配置 SDK 路径和代理",
      "安装 Android SDK: Tools > SDK Manager"
    ],
    versionManager: {
      name: "SDK Manager",
      install: "内置在 Android Studio 中",
      usage: [
        "打开 SDK Manager: Tools > SDK Manager",
        "安装 SDK 平台: SDK Platforms 标签页",
        "安装构建工具: SDK Tools 标签页",
        "更新 SDK: 点击 Apply 按钮"
      ]
    },
    packageManager: {
      name: "Gradle",
      install: "随 Android Studio 一起安装",
      config: [
        "配置 Gradle 版本: File > Project Structure > Project",
        "配置仓库: 在 `build.gradle` 中添加仓库地址",
        "同步项目: File > Sync Project with Gradle Files",
        "查看依赖: File > Project Structure > Dependencies"
      ]
    },
    mirror: {
      name: "Gradle 镜像源",
      url: "阿里云、腾讯云",
      config: [
        "配置 build.gradle: 添加镜像仓库",
        "配置全局: `~/.gradle/init.gradle`",
        "配置代理: Settings > Appearance & Behavior > System Settings > HTTP Proxy"
      ]
    },
    ide: ["Android Studio（本身）", "IntelliJ IDEA（基础版本）"]
  },
  {
    id: "xcode",
    name: "Xcode",
    description: "苹果官方 iOS/macOS 开发 IDE",
    recommendedVersion: "Xcode 15+",
    installation: [
      "下载 Xcode: 从 App Store 下载（仅 macOS，约 12GB）",
      "安装 Xcode: 等待下载和安装完成",
      "同意许可协议: `sudo xcodebuild -license accept`",
      "安装 Command Line Tools: `xcode-select --install`"
    ],
    versionManager: {
      name: "Xcode 版本管理",
      install: "手动下载不同版本的 Xcode",
      usage: [
        "下载旧版本: 从 developer.apple.com 下载",
        "切换版本: `sudo xcode-select --switch /Applications/Xcode-15.0.app`",
        "查看当前版本: `xcodebuild -version`",
        "查看路径: `xcode-select -p`"
      ]
    },
    packageManager: {
      name: "Swift Package Manager / CocoaPods",
      install: "SPM 内置，CocoaPods: `sudo gem install cocoapods`",
      config: [
        "使用 SPM: File > Add Packages",
        "使用 CocoaPods: 创建 `Podfile` 然后 `pod install`",
        "更新依赖: `pod update`",
        "构建项目: Product > Build 或 `⌘B`"
      ]
    },
    mirror: {
      name: "CocoaPods 镜像源",
      url: "清华大学、gitee",
      config: [
        "配置 CocoaPods 镜像: `pod repo remove master`",
        "添加镜像: `pod repo add master https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git`",
        "更新仓库: `pod repo update`"
      ]
    },
    ide: ["Xcode（本身）", "AppCode（已停止更新）"]
  }
]

// 分类数据结构
const devEnvironmentCategories: DevEnvironmentCategory[] = [
  {
    id: 'frontend',
    name: '前端',
    description: 'Web 前端开发技术栈',
    icon: Monitor,
    technologies: frontendConfigs
  },
  {
    id: 'backend',
    name: '后端',
    description: '服务端开发语言和框架',
    icon: Server,
    technologies: backendConfigs
  },
  {
    id: 'mobile',
    name: '移动端',
    description: '移动应用开发技术栈',
    icon: Smartphone,
    technologies: mobileConfigs
  }
]

export default function EnvironmentPage() {
  return (
    <CourseLayout
      title="进阶篇"
      description="从工具到架构"
      chapters={chapters}
      currentChapter="环境搭建与代码运行基础"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 1 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          环境搭建与代码运行基础
        </h1>
        <p className="text-lg text-muted-foreground">
          掌握开发环境的配置方法，理解代码从编写到运行的完整流程，学会高效的调试技巧。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: 开发环境配置 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Settings className="h-6 w-6 text-primary" />
            开发环境配置
          </h2>
          <p className="text-muted-foreground mb-6">
            一个良好的开发环境是高效编程的基础。不同的技术栈需要不同的运行环境。选择开发类型和技术栈查看详细配置指南。
          </p>

          <Tabs defaultValue="backend" className="w-full">
            {/* 外层 Tabs: 开发类型 */}
            <TabsList className="mb-6 w-full grid grid-cols-1 sm:grid-cols-3 gap-2">
              {devEnvironmentCategories.map((category) => {
                const Icon = category.icon
                return (
                  <TabsTrigger key={category.id} value={category.id} className="flex items-center justify-center gap-2">
                    <Icon className="h-4 w-4" />
                    {category.name}
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {devEnvironmentCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="space-y-4">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-foreground mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>

                {/* 内层 Tabs: 具体技术栈 */}
                <Tabs defaultValue={category.technologies[0]?.id} className="w-full">
                  <TabsList className="mb-6 overflow-x-auto w-full justify-start">
                    {category.technologies.map((tech) => (
                      <TabsTrigger key={tech.id} value={tech.id}>
                        {tech.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {category.technologies.map((lang) => (
                    <TabsContent key={lang.id} value={lang.id} className="space-y-4">
                <div className="p-6 rounded-xl border border-border bg-card">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{lang.name}</h3>
                    <p className="text-sm text-muted-foreground">{lang.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">推荐版本: {lang.recommendedVersion}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 安装步骤 */}
                    <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border-2 border-blue-200/50 dark:border-gray-700/50 shadow-sm">
                      <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                        <Terminal className="h-4 w-4" />
                        安装步骤
                      </h4>
                      <ul className="space-y-1.5 text-sm text-muted-foreground">
                        {lang.installation.map((step, idx) => (
                          <li key={idx}>• {step}</li>
                        ))}
                      </ul>
                    </div>

                    {/* 版本管理 */}
                    <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border-2 border-blue-200/50 dark:border-gray-700/50 shadow-sm">
                      <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        版本管理 ({lang.versionManager.name})
                      </h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p className="font-medium text-foreground">安装:</p>
                        <p className="text-xs font-mono bg-gray-100 dark:bg-gray-700 p-3 rounded-lg border border-gray-300 dark:border-gray-600">{lang.versionManager.install}</p>
                        <p className="font-medium text-foreground mt-2">常用命令:</p>
                        <ul className="space-y-1">
                          {lang.versionManager.usage.map((cmd, idx) => (
                            <li key={idx}>• {cmd}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* 包管理器 */}
                    <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border-2 border-blue-200/50 dark:border-gray-700/50 shadow-sm">
                      <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        包管理器 ({lang.packageManager.name})
                      </h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p className="font-medium text-foreground">安装:</p>
                        <p className="text-xs">{lang.packageManager.install}</p>
                        <p className="font-medium text-foreground mt-2">配置:</p>
                        <ul className="space-y-1">
                          {lang.packageManager.config.map((config, idx) => (
                            <li key={idx}>• {config}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* 镜像源配置 */}
                    <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border-2 border-blue-200/50 dark:border-gray-700/50 shadow-sm">
                      <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                        <FileCode className="h-4 w-4" />
                        镜像源配置 ({lang.mirror.name})
                      </h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p className="font-medium text-foreground">推荐镜像:</p>
                        <p className="text-xs">{lang.mirror.url}</p>
                        <p className="font-medium text-foreground mt-2">配置方法:</p>
                        <ul className="space-y-1">
                          {lang.mirror.config.map((config, idx) => (
                            <li key={idx}>• {config}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* IDE 推荐 */}
                  <div className="mt-4 p-4 rounded-lg border border-primary/20 bg-primary/5">
                    <h4 className="font-medium text-foreground mb-2">推荐 IDE</h4>
                    <div className="flex flex-wrap gap-2">
                      {lang.ide.map((ide, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-1 text-xs font-semibold text-white shadow-md hover:shadow-lg transition-all duration-200"
                        >
                          {ide}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </TabsContent>
            ))}
          </Tabs>

          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5 mt-6">
            <h4 className="font-medium text-foreground mb-2">包管理器最佳实践</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>锁定依赖版本</strong>：使用 lockfile（package-lock.json、yarn.lock、pnpm-lock.yaml、Gemfile.lock、composer.lock、Cargo.lock 等）</li>
              <li>• <strong>区分依赖类型</strong>：生产依赖 vs 开发依赖</li>
              <li>• <strong>定期更新</strong>：使用工具检查过时的依赖</li>
              <li>• <strong>安全审计</strong>：定期运行安全扫描（npm audit、pip-audit、cargo audit 等）</li>
              <li>• <strong>使用镜像源</strong>：在国内使用镜像源可以大幅提升下载速度</li>
            </ul>
          </div>
        </section>

        {/* Section 2: 代码运行原理 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            代码运行原理
          </h2>
          <p className="text-muted-foreground mb-6">
            深入理解代码从编写到执行的完整流程，掌握不同语言的执行机制，有助于更好地调试和优化代码。本节将从底层原理到实际应用全面解析代码执行过程。
          </p>

          <Tabs defaultValue="execution-flow" className="w-full">
            <TabsList className="mb-6 overflow-x-auto w-full justify-start">
              <TabsTrigger value="execution-flow" className="flex items-center gap-2">
                <GitBranch className="h-4 w-4" />
                执行流程
              </TabsTrigger>
              <TabsTrigger value="execution-modes" className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                执行模式
              </TabsTrigger>
              <TabsTrigger value="runtime-environments" className="flex items-center gap-2">
                <Cpu className="h-4 w-4" />
                运行时环境
              </TabsTrigger>
              <TabsTrigger value="memory-management" className="flex items-center gap-2">
                <MemoryStick className="h-4 w-4" />
                内存管理
              </TabsTrigger>
              <TabsTrigger value="execution-stack" className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                执行栈
              </TabsTrigger>
              <TabsTrigger value="optimization" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                优化技术
              </TabsTrigger>
            </TabsList>

            {/* Tab 1: 执行流程 */}
            <TabsContent value="execution-flow" className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-xl font-semibold text-foreground mb-4">代码执行的完整生命周期</h3>
                <p className="text-muted-foreground mb-6">
                  从源代码到最终执行，代码经历了多个阶段的处理。理解这个过程有助于理解不同语言的性能特点和调试方法。
                </p>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">1</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-2">词法分析（Lexical Analysis）</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          将源代码分解为一系列 Token（标记），如关键字、标识符、操作符、字面量等。
                        </p>
                        <div className="mt-3 p-4 rounded-lg bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 shadow-sm">
                          <p className="text-xs font-mono text-muted-foreground mb-1">示例：</p>
                          <p className="text-xs font-mono text-foreground">let x = 10;</p>
                          <p className="text-xs text-muted-foreground mt-2">→ Token: [let] [x] [=] [10] [;]</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">2</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-2">语法分析（Syntax Analysis / Parsing）</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          将 Token 序列组织成抽象语法树（AST - Abstract Syntax Tree），表示代码的语法结构。
                        </p>
                        <div className="mt-3 p-4 rounded-lg bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 shadow-sm">
                          <p className="text-xs font-mono text-muted-foreground mb-1">AST 结构：</p>
                          <pre className="text-xs font-mono text-foreground whitespace-pre-wrap">
{`VariableDeclaration
  ├─ Identifier: x
  └─ Literal: 10`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">3</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-2">语义分析（Semantic Analysis）</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          检查代码的语义正确性：类型检查、作用域分析、变量绑定、错误检测。
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                          <li>• 类型检查：确保类型匹配（静态类型语言）</li>
                          <li>• 作用域分析：确定变量的可见范围</li>
                          <li>• 符号表构建：记录变量、函数等信息</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">4</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-2">代码生成（Code Generation）</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          将 AST 转换为目标代码：机器码（编译型）、字节码（JVM、.NET）、中间表示（LLVM IR）等。
                        </p>
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                          <div className="p-3 rounded-lg bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 shadow-sm">
                            <p className="font-medium text-foreground mb-1">编译型</p>
                            <p className="text-muted-foreground">AST → 机器码</p>
                          </div>
                          <div className="p-3 rounded-lg bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 shadow-sm">
                            <p className="font-medium text-foreground mb-1">字节码</p>
                            <p className="text-muted-foreground">AST → 字节码</p>
                          </div>
                          <div className="p-3 rounded-lg bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 shadow-sm">
                            <p className="font-medium text-foreground mb-1">解释型</p>
                            <p className="text-muted-foreground">AST → 直接执行</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">5</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-2">优化（Optimization）</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          对生成的代码进行优化，提升性能和减少资源消耗。
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                          <li>• <strong>编译时优化</strong>：常量折叠、死代码消除、循环优化、内联</li>
                          <li>• <strong>运行时优化（JIT）</strong>：热点代码检测、动态编译、去优化</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">6</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-2">执行（Execution）</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          在运行时环境中执行代码：CPU 执行机器码、虚拟机执行字节码、解释器执行 AST。
                        </p>
                        <div className="mt-3 p-4 rounded-lg bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 shadow-sm">
                          <p className="text-xs text-muted-foreground mb-2">执行环境：</p>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• CPU：直接执行机器码（C、C++、Rust、Go）</li>
                            <li>• 虚拟机：执行字节码（JVM、.NET CLR）</li>
                            <li>• 解释器：逐行执行 AST（Python、早期 JavaScript）</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-5 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 border-2 border-purple-200/50 dark:border-gray-700/50 shadow-md">
                  <h4 className="font-medium text-foreground mb-3">完整流程图</h4>
                  <div className="flex flex-wrap items-center gap-2 text-sm font-mono">
                    <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 shadow-sm font-semibold text-gray-900 dark:text-gray-100">源代码</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 shadow-sm font-semibold text-gray-900 dark:text-gray-100">词法分析</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 shadow-sm font-semibold text-gray-900 dark:text-gray-100">语法分析</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 shadow-sm font-semibold text-gray-900 dark:text-gray-100">AST</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 shadow-sm font-semibold text-gray-900 dark:text-gray-100">语义分析</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 shadow-sm font-semibold text-gray-900 dark:text-gray-100">代码生成</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 shadow-sm font-semibold text-gray-900 dark:text-gray-100">优化</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 shadow-sm font-semibold text-gray-900 dark:text-gray-100">执行</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Tab 2: 执行模式 */}
            <TabsContent value="execution-modes" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 解释型语言 */}
                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Terminal className="h-5 w-5 text-primary" />
                    解释型语言
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    代码在运行时逐行解释执行，无需预先编译。
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-xs font-medium text-foreground mb-1">执行流程：</p>
                      <p className="text-xs text-muted-foreground font-mono">源代码 → AST → 解释器逐行执行</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground mb-1">代表语言：</p>
                      <p className="text-xs text-muted-foreground">Python、JavaScript（早期）、Ruby、PHP</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground mb-1">特点：</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• 动态类型，运行时检查</li>
                        <li>• 灵活，修改即时生效</li>
                        <li>• 内存由 GC 管理</li>
                        <li>• 调试可直接访问源代码</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm pt-4 border-t border-border">
                    <div className="flex items-start gap-2">
                      <span className="text-accent">+</span>
                      <span className="text-muted-foreground">开发快速，修改即时生效</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-accent">+</span>
                      <span className="text-muted-foreground">跨平台，无需编译</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-destructive">-</span>
                      <span className="text-muted-foreground">运行时性能相对较低</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-destructive">-</span>
                      <span className="text-muted-foreground">运行时错误多</span>
                    </div>
                  </div>
                </div>

                {/* 编译型语言 */}
                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-primary" />
                    编译型语言
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    代码先编译成机器码，再由 CPU 直接执行。
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-xs font-medium text-foreground mb-1">执行流程：</p>
                      <p className="text-xs text-muted-foreground font-mono">源代码 → 编译 → 机器码 → CPU 执行</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground mb-1">代表语言：</p>
                      <p className="text-xs text-muted-foreground">C、C++、Rust、Go、Swift</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground mb-1">特点：</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• 静态类型，编译时检查</li>
                        <li>• 快速执行，接近硬件性能</li>
                        <li>• 内存手动管理或所有权系统</li>
                        <li>• 需要符号表调试</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm pt-4 border-t border-border">
                    <div className="flex items-start gap-2">
                      <span className="text-accent">+</span>
                      <span className="text-muted-foreground">运行时性能高</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-accent">+</span>
                      <span className="text-muted-foreground">编译时发现错误</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-destructive">-</span>
                      <span className="text-muted-foreground">编译时间长</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-destructive">-</span>
                      <span className="text-muted-foreground">调试相对复杂</span>
                    </div>
                  </div>
                </div>

                {/* 混合型语言 */}
                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    混合型语言（JIT）
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    结合解释型和编译型的优势，使用 JIT（即时编译）技术。
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-xs font-medium text-foreground mb-1">执行流程：</p>
                      <p className="text-xs text-muted-foreground font-mono">源代码 → 字节码 → JIT 编译 → 机器码</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground mb-1">代表语言：</p>
                      <p className="text-xs text-muted-foreground">Java、C#、JavaScript（V8）、Python（PyPy）</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground mb-1">特点：</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• 先解释执行，热点代码 JIT 编译</li>
                        <li>• 性能接近编译型</li>
                        <li>• 内存由 GC 管理</li>
                        <li>• 支持源代码级调试</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm pt-4 border-t border-border">
                    <div className="flex items-start gap-2">
                      <span className="text-accent">+</span>
                      <span className="text-muted-foreground">性能接近编译型</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-accent">+</span>
                      <span className="text-muted-foreground">开发体验好</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-destructive">-</span>
                      <span className="text-muted-foreground">启动时间较长</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-destructive">-</span>
                      <span className="text-muted-foreground">内存占用较大</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
                <h4 className="font-medium text-foreground mb-3">执行模式对比</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-2 font-medium text-foreground">特性</th>
                        <th className="text-left p-2 font-medium text-foreground">解释型</th>
                        <th className="text-left p-2 font-medium text-foreground">编译型</th>
                        <th className="text-left p-2 font-medium text-foreground">混合型（JIT）</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-border">
                        <td className="p-2 font-medium text-foreground">执行速度</td>
                        <td className="p-2">慢</td>
                        <td className="p-2">快</td>
                        <td className="p-2">快（JIT 后）</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="p-2 font-medium text-foreground">启动时间</td>
                        <td className="p-2">快</td>
                        <td className="p-2">慢（编译）</td>
                        <td className="p-2">中等</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="p-2 font-medium text-foreground">内存占用</td>
                        <td className="p-2">中等</td>
                        <td className="p-2">低</td>
                        <td className="p-2">高</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="p-2 font-medium text-foreground">错误检测</td>
                        <td className="p-2">运行时</td>
                        <td className="p-2">编译时</td>
                        <td className="p-2">运行时 + 编译时</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium text-foreground">跨平台</td>
                        <td className="p-2">是</td>
                        <td className="p-2">需要重新编译</td>
                        <td className="p-2">是（字节码）</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Tab 3: 运行时环境 */}
            <TabsContent value="runtime-environments" className="space-y-6">
              <div className="space-y-6">
                {/* V8 引擎 */}
                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="text-xl font-semibold text-foreground mb-4">JavaScript 运行时：V8 引擎</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">执行流程</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-start gap-2">
                          <span className="text-primary">1.</span>
                          <span>源代码 → <strong className="text-foreground">解析器（Parser）</strong> → AST</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-primary">2.</span>
                          <span>AST → <strong className="text-foreground">解释器（Ignition）</strong> → 字节码</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-primary">3.</span>
                          <span>热点代码 → <strong className="text-foreground">编译器（TurboFan）</strong> → 优化机器码</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-foreground mb-2">内存管理</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• V8 堆：新生代（1-8MB）、老生代</li>
                          <li>• GC 策略：Scavenge（新生代）、Mark-Sweep-Compact（老生代）</li>
                          <li>• 增量标记：减少 STW 时间</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-2">优化策略</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• 内联缓存（IC）：缓存属性查找</li>
                          <li>• 隐藏类：优化对象属性访问</li>
                          <li>• 去优化：当假设失效时回退</li>
                        </ul>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">事件循环</h4>
                      <p className="text-sm text-muted-foreground mb-2">调用栈 → 消息队列 → 微任务队列 → 宏任务队列</p>
                    </div>
                  </div>
                </div>

                {/* CPython */}
                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Python 运行时：CPython</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">执行流程</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-start gap-2">
                          <span className="text-primary">1.</span>
                          <span>源代码 → 词法分析 → Token</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-primary">2.</span>
                          <span>Token → 语法分析 → AST</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-primary">3.</span>
                          <span>AST → 编译 → 字节码（.pyc）</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-primary">4.</span>
                          <span>字节码 → <strong className="text-foreground">Python 虚拟机（PVM）</strong>执行</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-foreground mb-2">内存管理</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• 引用计数：对象引用计数为 0 时释放</li>
                          <li>• 循环垃圾收集：处理循环引用</li>
                          <li>• 分代收集：分代管理对象</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-2">GIL（全局解释器锁）</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• 限制：同一时刻只有一个线程执行 Python 字节码</li>
                          <li>• 影响：多线程 CPU 密集型任务性能差</li>
                          <li>• 解决方案：多进程、C 扩展、PyPy（无 GIL 版本）</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* JVM */}
                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Java 运行时：JVM</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">执行流程</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-start gap-2">
                          <span className="text-primary">1.</span>
                          <span>源代码 → javac → 字节码（.class）</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-primary">2.</span>
                          <span>字节码 → <strong className="text-foreground">JVM 类加载器</strong> → 方法区</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-primary">3.</span>
                          <span>解释执行 → <strong className="text-foreground">JIT 编译（C1/C2）</strong> → 机器码</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-foreground mb-2">内存模型</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• 堆：对象实例、数组</li>
                          <li>• 栈：局部变量、方法调用</li>
                          <li>• 方法区：类信息、常量池</li>
                          <li>• 程序计数器：当前执行指令地址</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-2">GC 算法</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• 标记-清除：标记可达对象</li>
                          <li>• 复制：新生代回收</li>
                          <li>• 标记-整理：老生代回收</li>
                          <li>• 分代收集：G1、ZGC、Shenandoah</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Go 运行时 */}
                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Go 运行时</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">执行流程</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-start gap-2">
                          <span className="text-primary">1.</span>
                          <span>源代码 → go build → 机器码</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-primary">2.</span>
                          <span>单一可执行文件，<strong className="text-foreground">无需运行时</strong></span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-foreground mb-2">内存管理</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Go GC：三色标记算法</li>
                          <li>• 并发 GC：与程序并发执行</li>
                          <li>• 低延迟：STW 时间小于 1ms</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-2">并发模型</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Goroutine：轻量级协程（2KB 栈）</li>
                          <li>• Channel：CSP 通信模型</li>
                          <li>• 调度器：M:N 调度（M 个 Goroutine 映射到 N 个 OS 线程）</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Tab 4: 内存管理 */}
            <TabsContent value="memory-management" className="space-y-6">
              <div className="space-y-6">
                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="text-xl font-semibold text-foreground mb-4">内存布局</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-foreground mb-3">栈（Stack）</h4>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li>• <strong>用途</strong>：函数调用、局部变量、参数传递</li>
                        <li>• <strong>特点</strong>：LIFO（后进先出）、自动管理、速度快</li>
                        <li>• <strong>大小</strong>：通常 1-8MB（可配置）</li>
                        <li>• <strong>生命周期</strong>：函数返回时自动释放</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-3">堆（Heap）</h4>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li>• <strong>用途</strong>：动态分配的对象、数组</li>
                        <li>• <strong>特点</strong>：手动管理或 GC、速度较慢</li>
                        <li>• <strong>大小</strong>：可动态增长</li>
                        <li>• <strong>生命周期</strong>：由 GC 或手动管理</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-3">代码区</h4>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li>• <strong>用途</strong>：存储可执行代码</li>
                        <li>• <strong>特点</strong>：只读、程序启动时加载</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-3">数据区</h4>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li>• <strong>用途</strong>：全局变量、静态变量、常量</li>
                        <li>• <strong>特点</strong>：程序生命周期内存在</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="text-xl font-semibold text-foreground mb-4">垃圾回收机制</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-3">引用计数（Reference Counting）</h4>
                      <p className="text-sm text-muted-foreground mb-2">每个对象维护引用计数，为 0 时立即释放。</p>
                      <p className="text-xs text-muted-foreground"><strong>代表</strong>：Python、Swift（ARC）</p>
                      <p className="text-xs text-muted-foreground"><strong>优点</strong>：实时回收，无停顿</p>
                      <p className="text-xs text-muted-foreground"><strong>缺点</strong>：无法处理循环引用</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-3">标记-清除（Mark-Sweep）</h4>
                      <p className="text-sm text-muted-foreground mb-2">标记所有可达对象，清除未标记对象。</p>
                      <p className="text-xs text-muted-foreground"><strong>代表</strong>：JavaScript、Java（部分）</p>
                      <p className="text-xs text-muted-foreground"><strong>优点</strong>：可处理循环引用</p>
                      <p className="text-xs text-muted-foreground"><strong>缺点</strong>：可能产生内存碎片</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-3">分代收集（Generational Collection）</h4>
                      <p className="text-sm text-muted-foreground mb-2">根据对象年龄分代管理，年轻对象频繁回收。</p>
                      <p className="text-xs text-muted-foreground"><strong>代表</strong>：Java、.NET</p>
                      <p className="text-xs text-muted-foreground"><strong>优点</strong>：效率高，停顿时间短</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-3">三色标记（Tri-color Marking）</h4>
                      <p className="text-sm text-muted-foreground mb-2">白色（未访问）、灰色（访问中）、黑色（已访问）。</p>
                      <p className="text-xs text-muted-foreground"><strong>代表</strong>：Go、Java（G1）</p>
                      <p className="text-xs text-muted-foreground"><strong>优点</strong>：支持并发 GC，停顿时间短</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
                  <h3 className="text-xl font-semibold text-foreground mb-4">内存泄漏与优化</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-foreground mb-3">常见泄漏</h4>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li>• <strong>循环引用</strong>：对象相互引用，GC 无法回收</li>
                        <li>• <strong>未释放资源</strong>：文件句柄、数据库连接</li>
                        <li>• <strong>全局变量</strong>：意外持有大对象引用</li>
                        <li>• <strong>事件监听器</strong>：未移除的事件监听</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-3">优化策略</h4>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li>• <strong>对象池</strong>：复用对象，减少分配</li>
                        <li>• <strong>弱引用</strong>：WeakMap、WeakSet（JavaScript）</li>
                        <li>• <strong>及时释放</strong>：使用 try-finally 确保释放</li>
                        <li>• <strong>内存分析</strong>：使用工具检测泄漏</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Tab 5: 执行栈 */}
            <TabsContent value="execution-stack" className="space-y-6">
              <div className="space-y-6">
                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="text-xl font-semibold text-foreground mb-4">调用栈（Call Stack）</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">工作原理</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        调用栈是一个后进先出（LIFO）的数据结构，用于跟踪函数调用。
                      </p>
                      <div className="p-4 rounded-lg bg-muted/50 border border-border">
                        <p className="text-xs font-mono text-muted-foreground mb-2">示例代码：</p>
                        <pre className="text-xs font-mono text-foreground whitespace-pre-wrap">
{`function a() {
  b();
}

function b() {
  c();
}

function c() {
  console.log("Hello");
}

a();`}
                        </pre>
                        <p className="text-xs text-muted-foreground mt-3 mb-2">调用栈变化：</p>
                        <div className="space-y-1 text-xs font-mono">
                          <div className="p-2 bg-background rounded border border-border">[a] ← 调用 a()</div>
                          <div className="p-2 bg-background rounded border border-border">[a, b] ← 调用 b()</div>
                          <div className="p-2 bg-background rounded border border-border">[a, b, c] ← 调用 c()</div>
                          <div className="p-2 bg-background rounded border border-border">[a, b] ← c() 返回</div>
                          <div className="p-2 bg-background rounded border border-border">[a] ← b() 返回</div>
                          <div className="p-2 bg-background rounded border border-border">[] ← a() 返回</div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-foreground mb-2">栈溢出（Stack Overflow）</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• <strong>原因</strong>：递归过深、无限递归</li>
                          <li>• <strong>表现</strong>：程序崩溃、抛出异常</li>
                          <li>• <strong>解决</strong>：优化递归、使用迭代、增加栈大小</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-2">堆栈跟踪（Stack Trace）</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• <strong>用途</strong>：调试、错误定位</li>
                          <li>• <strong>内容</strong>：函数调用链、文件名、行号</li>
                          <li>• <strong>工具</strong>：调试器、日志系统</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="text-xl font-semibold text-foreground mb-4">执行上下文（Execution Context）</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-3">全局上下文（Global Context）</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• 程序启动时创建</li>
                        <li>• 包含全局变量、函数声明</li>
                        <li>• 生命周期：程序结束</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-3">函数上下文（Function Context）</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• 函数调用时创建</li>
                        <li>• 包含局部变量、参数、this 绑定</li>
                        <li>• 生命周期：函数执行完毕</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-3">作用域链（Scope Chain）</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        变量查找的路径：当前作用域 → 外层作用域 → ... → 全局作用域
                      </p>
                      <div className="p-3 rounded bg-muted/50 border border-border">
                        <pre className="text-xs font-mono text-foreground whitespace-pre-wrap">
{`var global = "global";

function outer() {
  var outerVar = "outer";
  
  function inner() {
    var innerVar = "inner";
    console.log(innerVar);  // 当前作用域
    console.log(outerVar);  // 外层作用域
    console.log(global);    // 全局作用域
  }
  
  inner();
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Tab 6: 优化技术 */}
            <TabsContent value="optimization" className="space-y-6">
              <div className="space-y-6">
                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="text-xl font-semibold text-foreground mb-4">编译器优化</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-foreground mb-3">常量折叠（Constant Folding）</h4>
                      <p className="text-sm text-muted-foreground mb-2">编译时计算常量表达式。</p>
                      <div className="p-3 rounded bg-muted/50 border border-border">
                        <p className="text-xs font-mono text-muted-foreground mb-1">优化前：</p>
                        <p className="text-xs font-mono text-foreground">const x = 2 + 3;</p>
                        <p className="text-xs font-mono text-muted-foreground mt-2 mb-1">优化后：</p>
                        <p className="text-xs font-mono text-foreground">const x = 5;</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-3">死代码消除（Dead Code Elimination）</h4>
                      <p className="text-sm text-muted-foreground mb-2">移除不可达的代码。</p>
                      <div className="p-3 rounded bg-muted/50 border border-border">
                        <p className="text-xs font-mono text-muted-foreground mb-1">优化前：</p>
                        <pre className="text-xs font-mono text-foreground whitespace-pre-wrap">
{`if (false) {
  unreachableCode();
}`}
                        </pre>
                        <p className="text-xs font-mono text-muted-foreground mt-2 mb-1">优化后：</p>
                        <p className="text-xs font-mono text-foreground">（完全移除）</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-3">循环优化（Loop Optimization）</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• <strong>循环展开</strong>：减少循环开销</li>
                        <li>• <strong>向量化</strong>：SIMD 指令并行处理</li>
                        <li>• <strong>循环不变式外提</strong>：将不变计算移出循环</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-3">内联优化（Inlining）</h4>
                      <p className="text-sm text-muted-foreground mb-2">将小函数直接嵌入调用处，减少函数调用开销。</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="text-xl font-semibold text-foreground mb-4">运行时优化（JIT）</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-3">热点检测（Hot Spot Detection）</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        JIT 编译器监控代码执行频率，识别热点代码（频繁执行的代码段）。
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• 执行次数超过阈值时触发编译</li>
                        <li>• V8：函数调用超过一定次数</li>
                        <li>• JVM：方法调用计数器</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-3">动态编译（Dynamic Compilation）</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        运行时将热点代码编译为优化的机器码。
                      </p>
                      <div className="p-3 rounded bg-muted/50 border border-border mt-2">
                        <p className="text-xs text-muted-foreground mb-1">流程：</p>
                        <div className="text-xs font-mono space-y-1">
                          <div>字节码执行 → 计数 → 达到阈值 → JIT 编译 → 优化机器码</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-3">去优化（Deoptimization）</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        当编译时的假设失效时，回退到解释执行。
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• <strong>原因</strong>：类型变化、多态调用、内联失效</li>
                        <li>• <strong>处理</strong>：丢弃优化代码，重新解释执行</li>
                        <li>• <strong>影响</strong>：性能下降，但保证正确性</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-3">内联缓存（Inline Cache）</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        缓存方法查找结果，避免重复查找。
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• <strong>单态</strong>：缓存单个类型的方法</li>
                        <li>• <strong>多态</strong>：缓存多个类型的方法</li>
                        <li>• <strong>超态</strong>：回退到通用查找</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
                  <h3 className="text-xl font-semibold text-foreground mb-4">优化建议</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-foreground mb-3">编写优化友好的代码</h4>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li>• <strong>保持类型稳定</strong>：避免频繁改变变量类型</li>
                        <li>• <strong>避免动态属性</strong>：使用固定属性结构</li>
                        <li>• <strong>减少多态</strong>：使用具体类型而非接口</li>
                        <li>• <strong>内联小函数</strong>：让编译器更容易内联</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-3">性能分析工具</h4>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li>• <strong>Profiler</strong>：识别性能瓶颈</li>
                        <li>• <strong>Flame Graph</strong>：可视化调用栈</li>
                        <li>• <strong>Memory Profiler</strong>：检测内存泄漏</li>
                        <li>• <strong>Benchmark</strong>：性能基准测试</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Section 3: 调试技巧 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Bug className="h-6 w-6 text-primary" />
            调试技巧
          </h2>
          <p className="text-muted-foreground mb-6">
            高效的调试能力是开发者的核心技能。掌握多种调试方法，能快速定位和解决问题。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">断点调试</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>条件断点</strong>：只在满足条件时暂停</li>
                <li>• <strong>日志断点</strong>：记录信息而不暂停执行</li>
                <li>• <strong>调用栈分析</strong>：追踪函数调用链</li>
                <li>• <strong>变量监视</strong>：实时查看变量值变化</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">日志调试</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>日志级别</strong>：DEBUG、INFO、WARN、ERROR</li>
                <li>• <strong>结构化日志</strong>：使用 JSON 格式便于分析</li>
                <li>• <strong>日志聚合</strong>：集中收集和分析日志</li>
                <li>• <strong>性能日志</strong>：记录关键操作的耗时</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">AI 辅助调试</h3>
              <p className="text-sm text-muted-foreground mb-3">
                利用 AI 工具快速定位问题：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 将错误信息粘贴给 AI，获取可能的解决方案</li>
                <li>• 使用 AI 分析代码逻辑，找出潜在问题</li>
                <li>• 让 AI 生成测试用例，验证修复效果</li>
                <li>• 利用 AI 解释复杂的错误堆栈</li>
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
                能够配置完整的开发环境，包括：
                <ul className="mt-2 ml-4 space-y-1.5 text-sm">
                  <li>• <strong>前端</strong>：Node.js/TypeScript、React、Vue、Angular、Svelte、Next.js、Vite、Webpack</li>
                  <li>• <strong>后端</strong>：Java、Python、Go、Node.js、C#、Rust、C++、Ruby、PHP</li>
                  <li>• <strong>移动端</strong>：React Native、Flutter、Swift/iOS、Kotlin/Android、Dart、Android Studio、Xcode</li>
                </ul>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                理解代码从编写到运行的完整流程（解释型 vs 编译型）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                掌握基本调试方法（断点调试、日志调试、AI辅助调试）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                了解包管理器的最佳实践和安全注意事项，能够为不同技术栈配置镜像源
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/advanced" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：序
          </Link>
        </Button>
        <Button asChild>
          <Link href="/advanced/ai-guide" className="flex items-center gap-2">
            下一章：AI 使用说明书
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}

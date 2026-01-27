# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**EasyGoVibeCoding** is an enterprise-level AI programming tools and architecture training platform. The project aims to help developers, teams, and enterprises systematically master AI programming tools and build AI-driven development teams.

**Core Philosophy**: AI programming tools are not magic, but engineering. Understanding mechanisms enables mastery of tools.

## Working Directory Structure

The actual Next.js frontend application is located at:
```
src/frontend/EasyGoVibeCoding/
```

**Important**: Always navigate to this directory before running development commands:
```bash
cd src/frontend/EasyGoVibeCoding
```

## Common Development Commands

All commands must be run from `src/frontend/EasyGoVibeCoding/`:

### Development
```bash
# Install dependencies (prefer pnpm)
pnpm install

# Start development server (runs on http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

### Testing
Currently no test framework is configured. When adding tests, use:
```bash
# Will be: pnpm test
# Will be: pnpm test:watch
```

## Architecture Overview

### Technology Stack
- **Framework**: Next.js 16.0 with App Router
- **UI Library**: React 19.0
- **Language**: TypeScript 5.0+ (strict mode enabled)
- **Styling**: Tailwind CSS 4.0
- **Component Library**: shadcn/ui (based on Radix UI)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **Package Manager**: pnpm (recommended)

### Project Structure Philosophy

This is a **documentation-driven** education platform organized into 8 core content modules:
1. **基础篇 (Basics)** - Zero to beginner entry path
2. **进阶篇 (Advanced)** - From tools to architecture (100-hour journey)
3. **工具篇 (Tools)** - Deep dive into AI programming tools
4. **架构篇 (Architecture)** - AI model architecture analysis (Transformer, Mamba, MoE, RAG)
5. **实践篇 (Practice)** - Real project implementation
6. **团队篇 (Team)** - Building AI teams from scratch
7. **生态导航 (Ecosystem)** - AI programming tools ecosystem navigation
8. **优质资源 (Resources)** - Curated learning resources

### Key Architecture Patterns

**Static Site Generation (SSG) First**
- All content pages use SSG for optimal performance and SEO
- Content is managed as MDX files in `content/` directory
- Build-time content processing with `next-mdx-remote` or `@next/mdx`

**Content Organization**
```
content/
├── basic/          # Basics module
├── advanced/       # Advanced module
├── tools/          # Tools module
├── architecture/   # Architecture module
├── practice/       # Practice module
├── team/           # Team module
├── ecosystem/      # Ecosystem module
└── resources/      # Resources module
```

**Component Architecture**
- `components/ui/` - shadcn/ui primitive components
- `components/home/` - Homepage-specific components
- `components/course/` - Course layout components
- `components/interactive/` - Interactive learning components (ToolComparison, SelectionAssistant, etc.)
- `components/` - Shared layout components (Header, Footer, ThemeProvider)

**Data Files**
- `data/tools.json` - Tool definitions for ToolComparison component
- `data/llm-providers.json` - LLM provider information
- `data/mcp-servers.json` - MCP server listings

**Utility Libraries (`lib/`)**
- `lib/utils.ts` - General utility functions (cn() for className merging)
- `lib/mdx.ts` - MDX content processing utilities
- `lib/content.ts` - Content loading and management

**Custom Hooks (`hooks/`)**
- `use-theme.ts` - Theme toggle functionality
- `use-mobile.tsx` - Mobile device detection (from shadcn/ui)

**Build Scripts (`scripts/`)**
- `generate-sitemap.ts` - Sitemap generation
- `sync-algolia.ts` - Algolia index sync (if implemented)
- Run scripts with: `tsx scripts/[script-name].ts`

**Path Aliases**
- `@/*` maps to project root (`src/frontend/EasyGoVibeCoding/`)
- Use absolute imports: `import { Button } from '@/components/ui/button'`

## Key Design Principles

### 1. Content as Code
- All learning content is stored as MDX files with frontmatter metadata
- Content versioning through Git
- Each chapter file follows naming convention: `01-awakening.mdx`

### 2. Progressive Disclosure
- Content is organized by user role and experience level
- Learning paths are customized based on user personas:
  - Designers/Product Managers → Basics + Tools (Web Editors)
  - Developers → Basics + Advanced + Tools
  - Architects → Full course + Architecture module
  - Team Leaders → Team + Tools (Enterprise practices)

### 3. Interactive Learning Components
The platform features specialized interactive components:
- **ToolComparison** - Dynamic tool comparison matrix with filtering
- **SelectionAssistant** - Question-based tool/architecture selection helper
- **LearningPathRecommender** - Role-based learning path recommendation

### 4. TypeScript Strict Mode
- All new code must have proper TypeScript types
- Avoid `any` types
- Use type inference where appropriate, explicit types for complex structures

## Content Management

### MDX Frontmatter Standard
```yaml
---
title: "Chapter Title"
description: "Brief description"
author: "Author Name"
date: "2025-01-27"
lastUpdated: "2025-01-27"
tags: ["tag1", "tag2"]
difficulty: "入门" | "中级" | "高级"
tools: ["Cursor", "Copilot"]
estimatedTime: "2 小时"
---
```

### Chapter Structure Requirements
Each chapter should include:
1. Title and description
2. Core content (subsections)
3. Practical exercises (optional)
4. Learning outcomes checklist
5. Further reading (optional)

### MDX Content Processing

**Loading MDX Content**:
- Use `next-mdx-remote` or `@next/mdx` for processing
- Content is loaded from `content/` directory
- Frontmatter is parsed for metadata
- Custom components are injected via MDXProvider

**Custom MDX Components**:
Define custom components for MDX rendering:
- Code blocks with syntax highlighting
- Custom callouts/alerts
- Interactive elements
- Custom headings with anchor links

**Example MDX Component Setup**:
```typescript
// components/mdx-components.tsx
const mdxComponents = {
  h1: (props) => <h1 className="text-4xl font-bold" {...props} />,
  code: (props) => <CodeBlock {...props} />,
  // ... other custom components
}
```

## Routing Architecture

**App Router Structure**:
- `/` - Homepage
- `/basics/*` - Basics module chapters
- `/advanced` - Advanced module (placeholder)
- `/tools` - Tools module (placeholder)
- `/architecture` - Architecture module (placeholder)
- `/practice` - Practice module (placeholder)
- `/team` - Team module (placeholder)
- `/ecosystem` - Ecosystem navigation (placeholder)
- `/resources` - Resources module (placeholder)

## Search Functionality

**Status**: To be implemented

**Planned Approach**:
- **MVP**: Local search using flexsearch or fuse.js
- Build-time index generation from MDX content
- Client-side search for fast response times
- **Future**: Potentially upgrade to Algolia for advanced features

**Implementation Notes**:
- Index files should be generated during build
- Search index should include: title, description, content, tags, tools
- Implement debounced search input for performance
- Cache search index in localStorage for faster subsequent searches

## State Management

**Minimal State Management Approach**:
- Use React Context + useReducer for global state (theme, user preferences)
- Local state for component-specific needs
- Zustand may be added for complex state if needed later

## Styling Guidelines

**Tailwind CSS Usage**:
- Utility-first approach
- Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, etc.)
- Dark mode support with `dark:` prefix
- Custom theme configuration in `tailwind.config.ts`

**shadcn/ui Components**:
- Install components via CLI: `npx shadcn@latest add [component-name]`
- Components are copied to `components/ui/` and can be customized
- Follow shadcn/ui composition patterns

**Adding New shadcn/ui Components**:
```bash
# Navigate to frontend directory first
cd src/frontend/EasyGoVibeCoding

# Add a specific component
npx shadcn@latest add button

# Add multiple components
npx shadcn@latest add button card dialog
```

The component will be copied to `components/ui/` where you can modify it as needed. This "copy-paste" approach gives full control over the component code.

## Performance Considerations

1. **Image Optimization**: Use Next.js `<Image>` component with `priority` for above-fold images
2. **Code Splitting**: Use dynamic imports for large components
3. **Static Generation**: Prefer SSG over SSR where possible
4. **Bundle Size**: Monitor bundle size, lazy load non-critical components

## Accessibility

All components and pages must follow accessibility best practices:

- **Keyboard Navigation**: All interactive elements must be keyboard accessible
- **Semantic HTML**: Use semantic HTML elements (`<nav>`, `<main>`, `<article>`, etc.)
- **ARIA Labels**: Provide ARIA labels for icon-only buttons and complex interactions
- **Color Contrast**: Ensure sufficient color contrast (WCAG AA minimum: 4.5:1 for normal text)
- **Focus Indicators**: Visible focus indicators for keyboard navigation
- **Alt Text**: Meaningful alt text for all images
- **Form Labels**: Proper labels for all form inputs

**Note**: shadcn/ui components have good accessibility by default, but always verify when customizing.

## Key Documentation Files

Reference these files for detailed specifications:
- `docs/bussiness/PRD.md` - Product requirements and feature specifications
- `docs/bussiness/Task_Details.md` - Detailed task breakdown
- `docs/develop/Architecture_Design.md` - Technical architecture deep dive
- `AI编程工具综合培训网站大纲.md` - Complete content outline

## Environment Variables

**Current Configuration**:
```env
# Public variables (exposed to browser)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Future environment variables (examples)
# ALGOLIA_APP_ID=your-app-id
# ALGOLIA_API_KEY=your-api-key
# NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=your-search-key
```

**File Structure**:
- `.env.local` - Local environment variables (gitignored, for development)
- `.env.production` - Production environment variables (if needed)
- Environment variables in Vercel dashboard for deployment

**Note**: Only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Keep sensitive keys server-side only.

## Deployment

**Primary Platform**: Vercel (recommended)
- Automatic deployments on push to `main`
- Zero-config setup
- Environment variables configured in Vercel dashboard

**Alternative**: GitHub Pages
- Requires manual GitHub Actions workflow setup
- Static export only

## Git Workflow

**Commit Message Format**: `<type>(<scope>): <subject>`

Types:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation updates
- `style` - Code formatting
- `refactor` - Code refactoring
- `test` - Tests
- `chore` - Build/tools

Example: `feat(content): add awakening chapter to basics module`

## Current Project Status

**Phase**: MVP Development (Month 1-3)
**Completed**:
- Project initialization
- Basic layout and navigation
- Homepage with core sections
- Basic module chapter pages (Basics section partially implemented)

**In Progress**:
- Content creation for all 8 modules
- Interactive components (ToolComparison, SelectionAssistant, LearningPathRecommender)
- Search functionality

**Pending**:
- Learning progress tracking
- Community features (comments, Q&A)
- Complete content for all modules

## Development Notes

### TypeScript Configuration
- `jsx: "react-jsx"` - Use new JSX transform
- `strict: true` - Strict type checking enabled
- Path aliases configured for `@/*`

### Next.js Configuration
- `typescript.ignoreBuildErrors: true` - Temporarily ignoring build errors (should be resolved)
- `images.unoptimized: true` - Image optimization disabled (for static export compatibility)

### Content Strategy
The platform follows a **Spec-Driven Development** approach:
1. Write comprehensive PRD defining WHAT and WHO
2. Create Task Details defining HOW (executable tasks)
3. Design Architecture defining HOW (technical structure)
4. Implement based on detailed specifications

## Code Organization Patterns

### Adding a New Feature

1. **Review Documentation First**
   - Check PRD for feature requirements
   - Review Architecture Design for technical approach
   - Check Task Details for implementation tasks

2. **Create Components**
   - Interactive features → `components/interactive/`
   - Home features → `components/home/`
   - Course features → `components/course/`
   - UI primitives → `components/ui/`

3. **Add Types**
   - Create types in `types/` directory or colocate with component
   - Export from central type files for shared types

4. **Update Routing**
   - Add pages in `app/` directory using App Router conventions
   - Follow existing patterns for layout and loading states

5. **Add Content**
   - Create MDX files in appropriate `content/` subdirectory
   - Follow frontmatter standards

### Component File Structure

Follow this pattern for consistency:
```typescript
// Component: components/example/my-component.tsx

// 1. External imports
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

// 2. Type imports
import type { ComponentProps } from '@/types/component'

// 3. Type definitions
interface MyComponentProps {
  title: string
  onAction?: () => void
}

// 4. Component definition
export function MyComponent({ title, onAction }: MyComponentProps) {
  // 4a. Hooks (in order: Context, State, Refs, Effects)
  const [count, setCount] = useState(0)

  useEffect(() => {
    // effect logic
  }, [])

  // 4b. Event handlers
  const handleClick = () => {
    setCount(count + 1)
    onAction?.()
  }

  // 4c. Render helpers
  const renderContent = () => {
    // complex render logic
  }

  // 4d. Return JSX
  return (
    <div>
      <h2>{title}</h2>
      {renderContent()}
      <Button onClick={handleClick}>Count: {count}</Button>
    </div>
  )
}
```

### File Naming Conventions

- **Components**: `kebab-case.tsx` (e.g., `tool-comparison.tsx`)
- **Utilities**: `kebab-case.ts` (e.g., `format-date.ts`)
- **Types**: `kebab-case.ts` (e.g., `tool-types.ts`)
- **Constants**: `UPPER_SNAKE_CASE.ts` (e.g., `API_ENDPOINTS.ts`)

## Working with This Codebase

### Quick Start Workflow

1. **Before Making Changes**
   - Review relevant documentation files (PRD, Task Details, Architecture Design)
   - Understand the feature requirements and acceptance criteria
   - Check if related components or utilities already exist

2. **Content Updates**
   - Add/modify MDX files in `content/` directory
   - Follow frontmatter standards
   - Ensure proper heading hierarchy for table of contents

3. **Component Development**
   - Follow shadcn/ui patterns for consistency
   - Use TypeScript strict typing (no `any` types)
   - Ensure dark mode support with `dark:` classes
   - Add proper accessibility attributes

4. **Routing**
   - Use Next.js App Router file-based routing in `app/`
   - Create `page.tsx` for pages, `layout.tsx` for layouts
   - Use `loading.tsx` for loading states

5. **State Management**
   - Keep state minimal and close to where it's used
   - Use Context for truly global state (theme, user preferences)
   - Avoid prop drilling with Context when necessary

6. **Styling**
   - Use Tailwind utility classes
   - Support dark mode with `dark:` prefix
   - Follow responsive design patterns (`sm:`, `md:`, `lg:`, `xl:`)
   - Use `cn()` utility from `lib/utils` for conditional classes

## Known Limitations

Current technical limitations that should be addressed:

1. **TypeScript Build Errors Ignored**
   - `ignoreBuildErrors: true` is set in `next.config.mjs`
   - **Action Required**: Fix TypeScript errors and remove this flag before production

2. **No Test Framework**
   - Testing infrastructure not yet implemented
   - **Action Required**: Add Jest + React Testing Library or Vitest

3. **Image Optimization Disabled**
   - `images.unoptimized: true` set for static export compatibility
   - Consider re-enabling if not doing static export

4. **MDX Processing Not Fully Implemented**
   - MDX integration needs to be completed
   - Content loading utilities need to be developed

5. **Search Not Implemented**
   - Search functionality is planned but not yet built
   - Index generation scripts need to be created

## Common Issues & Troubleshooting

### Issue: Build Errors About Missing Dependencies
**Solution**: Ensure you're in `src/frontend/EasyGoVibeCoding/` and run:
```bash
cd src/frontend/EasyGoVibeCoding
pnpm install
```

### Issue: Port 3000 Already in Use
**Solution**: Kill the process or use a different port:
```bash
# Use different port
pnpm dev -- -p 3001

# Or kill the process (Windows)
npx kill-port 3000

# Or kill the process (Mac/Linux)
lsof -ti:3000 | xargs kill
```

### Issue: TypeScript Errors Shown But Build Succeeds
**Explanation**: `typescript.ignoreBuildErrors: true` is set in config. These errors should be fixed before production deployment.

### Issue: Changes Not Reflecting in Browser
**Solutions**:
1. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Clear `.next` directory: `rm -rf .next` then restart dev server
3. Clear browser cache

### Issue: Module Not Found Errors
**Solution**: Check path aliases - use `@/` for imports:
```typescript
// Correct
import { Button } from '@/components/ui/button'

// Incorrect
import { Button } from '../components/ui/button'
```

### Issue: Styling Not Applied
**Solutions**:
1. Ensure Tailwind classes are not being purged (check `tailwind.config.ts`)
2. Check for typos in class names
3. Verify dark mode classes use `dark:` prefix
4. Use `cn()` utility for conditional classes

## Special Considerations

- **Chinese Content**: Primary language is Chinese (Simplified), ensure proper UTF-8 encoding
- **Educational Focus**: Prioritize clarity and learning experience over technical complexity
- **Documentation-Driven**: All features should be documented in PRD before implementation
- **Progressive Enhancement**: Build MVP first, add advanced features iteratively
- **Performance First**: Optimize for fast page loads, this is an educational platform where speed matters
- **Accessibility Required**: Educational content must be accessible to all users

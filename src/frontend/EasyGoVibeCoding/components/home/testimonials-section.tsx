"use client"

import { Star, Quote } from "lucide-react"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    name: "张小明",
    role: "产品经理",
    avatar: "👨‍💼",
    content: "作为一个非技术背景的产品经理，这个课程让我真正理解了 AI 编程工具的工作原理。现在我可以和开发团队更好地沟通，甚至自己动手做一些原型！",
    rating: 5,
    color: "from-blue-400 to-cyan-400",
    bgColor: "bg-blue-50",
  },
  {
    name: "李小红",
    role: "前端开发",
    avatar: "👩‍💻",
    content: "Cursor 和 Claude Code 的高级功能我之前一直没搞懂，通过这个课程的系统学习，我的开发效率提升了至少 3 倍。特别是 MCP 和 Skill 系统的理解，让我能定制自己的开发环境。",
    rating: 5,
    color: "from-purple-400 to-pink-400",
    bgColor: "bg-purple-50",
  },
  {
    name: "王大强",
    role: "架构师",
    avatar: "👨‍🔧",
    content: "架构篇的内容非常深入，Transformer、Mamba、MoE 的对比分析帮助我在项目中做出了正确的技术选型。企业级实践部分也很有价值。",
    rating: 5,
    color: "from-orange-400 to-amber-400",
    bgColor: "bg-orange-50",
  },
  {
    name: "赵小美",
    role: "团队负责人",
    avatar: "👩‍💼",
    content: "团队篇帮助我们建立了完整的 AI 工具使用规范和安全流程。现在整个团队都在使用统一的工具链，协作效率大大提升。",
    rating: 5,
    color: "from-green-400 to-emerald-400",
    bgColor: "bg-green-50",
  },
  {
    name: "陈小刚",
    role: "学生",
    avatar: "👨‍🎓",
    content: "零基础入门真的很友好！从完全不懂编程到能做出自己的小项目，只用了两周时间。课程设计循序渐进，每个概念都讲得很清楚。",
    rating: 5,
    color: "from-pink-400 to-rose-400",
    bgColor: "bg-pink-50",
  },
  {
    name: "刘小芳",
    role: "设计师",
    avatar: "👩‍🎨",
    content: "作为设计师，我之前对代码一窍不通。通过基础篇的学习，我现在可以用 AI 工具快速搭建网页原型，大大提升了我的工作效率。",
    rating: 5,
    color: "from-indigo-400 to-purple-400",
    bgColor: "bg-indigo-50",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border-2 border-pink-200 shadow-lg">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-semibold text-pink-600">学员评价</span>
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-4">
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              学员的真实反馈
            </span>
          </h2>
          <p className="text-xl text-gray-700 font-medium">
            看看其他学员是如何通过这个平台成长的
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={cn(
                "relative rounded-3xl p-6 transition-all duration-300",
                "bg-white/70 backdrop-blur-xl",
                "border-2 border-white/50",
                "shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]",
                "hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.15)]",
                "hover:-translate-y-2 hover:scale-[1.02]",
                testimonial.bgColor
              )}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Quote icon */}
              <div className={cn(
                "absolute top-4 right-4 w-12 h-12 rounded-2xl",
                "bg-gradient-to-br opacity-20",
                testimonial.color
              )}>
                <Quote className="h-6 w-6 text-gray-700 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-sm text-gray-700 mb-6 leading-relaxed line-clamp-5">
                {testimonial.content}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center text-2xl",
                  "bg-gradient-to-br shadow-md",
                  testimonial.color
                )}>
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-xs text-gray-600">{testimonial.role}</div>
                </div>
              </div>

              {/* Decorative gradient */}
              <div className={cn(
                "absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-10 blur-2xl",
                "bg-gradient-to-br",
                testimonial.color
              )} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

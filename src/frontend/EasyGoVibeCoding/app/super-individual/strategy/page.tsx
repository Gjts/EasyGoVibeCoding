import { CourseLayout } from "@/components/course/course-layout"
import { superIndividualChapters } from "@/components/course/chapters"
import { StageWorkbench } from "@/components/super-individual/stage-workbench"

export default function SuperIndividualStrategyPage() {
  return (
    <CourseLayout
      title="超级个体篇"
      description="从市场信号到真实需求证据"
      chapters={superIndividualChapters}
      currentChapter="定位与策略 · 需求验证"
    >
      <StageWorkbench stageIds={["discover", "validate"]} />
    </CourseLayout>
  )
}

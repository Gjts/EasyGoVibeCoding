import { CourseLayout } from "@/components/course/course-layout"
import { superIndividualChapters } from "@/components/course/chapters"
import { StageWorkbench } from "@/components/super-individual/stage-workbench"

export default function SuperIndividualGrowthPage() {
  return (
    <CourseLayout
      title="超级个体篇"
      description="用 Analytics 和自动化建立可持续增长闭环"
      chapters={superIndividualChapters}
      currentChapter="数据分析与自动运营"
    >
      <StageWorkbench stageIds={["analytics", "automation"]} />
    </CourseLayout>
  )
}

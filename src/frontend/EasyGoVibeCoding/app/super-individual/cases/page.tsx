import { CourseLayout } from "@/components/course/course-layout"
import { superIndividualChapters } from "@/components/course/chapters"
import { StageWorkbench } from "@/components/super-individual/stage-workbench"

export default function SuperIndividualCasesPage() {
  return (
    <CourseLayout
      title="超级个体篇"
      description="用数据决定继续、转向或停止"
      chapters={superIndividualChapters}
      currentChapter="复盘与迭代决策"
    >
      <StageWorkbench stageIds={["iterate"]} />
    </CourseLayout>
  )
}

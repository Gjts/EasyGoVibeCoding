import { CourseLayout } from "@/components/course/course-layout"
import { superIndividualChapters } from "@/components/course/chapters"
import { StageWorkbench } from "@/components/super-individual/stage-workbench"

export default function SuperIndividualMonetizationPage() {
  return (
    <CourseLayout
      title="超级个体篇"
      description="把验证过的问题压缩成可收费的最小产品"
      chapters={superIndividualChapters}
      currentChapter="产品化 · MVP 定义"
    >
      <StageWorkbench stageIds={["mvp"]} />
    </CourseLayout>
  )
}

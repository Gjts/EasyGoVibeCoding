import { CourseLayout } from "@/components/course/course-layout"
import { superIndividualChapters } from "@/components/course/chapters"
import { StageWorkbench } from "@/components/super-individual/stage-workbench"

export default function SuperIndividualSystemsPage() {
  return (
    <CourseLayout
      title="超级个体篇"
      description="AI 开发、Supabase、部署与海外支付"
      chapters={superIndividualChapters}
      currentChapter="开发、部署与支付"
    >
      <StageWorkbench stageIds={["build", "backend", "deploy", "payments"]} />
    </CourseLayout>
  )
}

import { CourseLayout } from "@/components/course/course-layout"
import { superIndividualChapters } from "@/components/course/chapters"
import { JourneyDashboard } from "@/components/super-individual/journey-dashboard"

export default function SuperIndividualPage() {
  return (
    <CourseLayout
      title="超级个体篇"
      description="从需求发现到上线、收款与数据迭代"
      chapters={superIndividualChapters}
      currentChapter="超级个体概述"
    >
      <JourneyDashboard />
    </CourseLayout>
  )
}

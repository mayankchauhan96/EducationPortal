import AdminResourcePage from "./AdminResourcePage";
import { getAdminCurriculum, createCurriculum, updateCurriculum, deleteCurriculum } from "../../api/adminApi";

const emptyItem = {
  levelName: "",
  slug: "",
  gradeRange: "",
  learningObjectives: "",
  skills: "",
  imageUrl: "",
  displayOrder: 0,
  published: true,
  programIds: [],
};

const fields = [
  { key: "levelName", label: "Learning level" },
  { key: "slug", label: "Slug" },
  { key: "gradeRange", label: "Grade range" },
  { key: "learningObjectives", label: "Learning objectives", type: "textarea" },
  { key: "skills", label: "Skills", type: "textarea" },
  { key: "imageUrl", label: "Image URL" },
  { key: "displayOrder", label: "Display order", type: "number" },
  { key: "published", label: "Published", type: "boolean" },
];

export default function AdminCurriculumPage() {
  return (
    <AdminResourcePage
      title="Curriculum"
      subtitle="Manage grade pathways and learning outcomes."
      load={getAdminCurriculum}
      create={createCurriculum}
      update={updateCurriculum}
      remove={deleteCurriculum}
      fields={fields}
      emptyItem={emptyItem}
      columns={[
        { key: "levelName", label: "Level" },
        { key: "gradeRange", label: "Grades" },
        { key: "displayOrder", label: "Order" },
        { key: "published", label: "Status" },
      ]}
    />
  );
}

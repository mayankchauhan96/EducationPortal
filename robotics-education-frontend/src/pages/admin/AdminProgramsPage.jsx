import AdminResourcePage from "./AdminResourcePage";
import { getAdminPrograms, createProgram, updateProgram, deleteProgram } from "../../api/adminApi";

const emptyItem = {
  title: "",
  slug: "",
  description: "",
  ageGroup: "",
  tag: "",
  imageUrl: "",
  displayOrder: 0,
  published: true,
};

const fields = [
  { key: "title", label: "Title", required: true },
  { key: "slug", label: "Slug", required: true },
  { key: "description", label: "Description", type: "textarea", required: true },
  { key: "tag", label: "Tag" },
  { key: "imageUrl", label: "Image URL" },
  { key: "displayOrder", label: "Display order", type: "number" },
  { key: "published", label: "Published", type: "boolean" },
];

export default function AdminProgramsPage() {
  return (
    <AdminResourcePage
      title="Programs"
      subtitle="Manage public programs. Assign projects manually from the Projects page."
      load={getAdminPrograms}
      create={createProgram}
      update={updateProgram}
      remove={deleteProgram}
      fields={fields}
      emptyItem={emptyItem}
      columns={[
        { key: "title", label: "Title" },
        { key: "tag", label: "Tag" },
        { key: "published", label: "Status" },
      ]}
    />
  );
}

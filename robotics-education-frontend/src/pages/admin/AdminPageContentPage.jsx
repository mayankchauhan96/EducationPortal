import AdminResourcePage from "./AdminResourcePage";
import { getAdminPageContent, createPageContent, updatePageContent, deletePageContent } from "../../api/adminApi";

const emptyItem = {
  pageKey: "schools",
  sectionTitle: "",
  sectionBody: "",
  bullets: "",
  displayOrder: 0,
  published: true,
};

const fields = [
  { key: "pageKey", label: "Page key" },
  { key: "sectionTitle", label: "Section title" },
  { key: "sectionBody", label: "Section body", type: "textarea" },
  { key: "bullets", label: "Bullets (use | between items)", type: "textarea" },
  { key: "displayOrder", label: "Display order", type: "number" },
  { key: "published", label: "Published", type: "boolean" },
];

export default function AdminPageContentPage() {
  return (
    <AdminResourcePage
      title="Page Content"
      subtitle="Edit school, teacher, parent, student, about, blog, and testimonial sections used by the public pages."
      load={getAdminPageContent}
      create={createPageContent}
      update={updatePageContent}
      remove={deletePageContent}
      fields={fields}
      emptyItem={emptyItem}
      columns={[
        { key: "pageKey", label: "Page" },
        { key: "sectionTitle", label: "Section" },
        { key: "displayOrder", label: "Order" },
      ]}
    />
  );
}

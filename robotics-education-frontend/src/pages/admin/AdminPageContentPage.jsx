import AdminResourcePage from "./AdminResourcePage";
import { getAdminPageContent, createPageContent, updatePageContent, deletePageContent } from "../../api/adminApi";

const emptyItem = {
  pageKey: "about",
  sectionTitle: "",
  sectionBody: "",
  bullets: "",
  displayOrder: 0,
  published: true,
};

const fields = [
  {
    key: "pageKey",
    label: "Page key",
    type: "select",
    options: [
      { value: "home", label: "Home" },
      { value: "about", label: "About" },
      { value: "schools", label: "Schools" },
      { value: "teachers", label: "Teachers" },
      { value: "parents", label: "Parents" },
      { value: "students", label: "Students" },
      { value: "blogs", label: "Blogs" },
    ],
  },
  { key: "sectionTitle", label: "Section title" },
  { key: "sectionBody", label: "Section body", type: "textarea" },
  { key: "bullets", label: "Bullets (use | between items)", type: "textarea" },
  { key: "displayOrder", label: "Display order", type: "number" },
  { key: "published", label: "Published", type: "boolean" },
];

const loadPublicPageContent = async () => {
  const items = await getAdminPageContent();
  return items.filter((item) => !item.pageKey?.toLowerCase().startsWith("testimonials"));
};

export default function AdminPageContentPage() {
  return (
    <AdminResourcePage
      title="Page Content"
      subtitle="Edit content for the public informational pages. Testimonial stories are managed separately in Testimonials."
      load={loadPublicPageContent}
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

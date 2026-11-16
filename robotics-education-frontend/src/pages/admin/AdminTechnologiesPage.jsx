import AdminResourcePage from "./AdminResourcePage";
import {
  createTechnology,
  deleteTechnology,
  getAdminTechnologies,
  updateTechnology,
} from "../../api/adminApi";

const emptyTechnology = {
  slug: "",
  title: "",
  icon: "",
  description: "",
  overview: "",
  topics: "",
  resourceLabel: "",
  resourceUrl: "",
  displayOrder: 0,
  published: true,
};

const technologyFields = [
  { key: "title", label: "Title", required: true },
  { key: "slug", label: "Slug", required: true },
  { key: "icon", label: "Icon or short mark" },
  { key: "description", label: "Card description", type: "textarea", required: true },
  { key: "overview", label: "Technology overview", type: "textarea", required: true },
  {
    key: "topics",
    label: "Learning topics",
    type: "textarea",
    required: true,
    helpText: "Separate topics with | characters.",
  },
  { key: "resourceLabel", label: "External resource button label", required: true },
  {
    key: "resourceUrl",
    label: "External resource URL",
    required: true,
    helpText: "Use a full https:// URL.",
  },
  { key: "displayOrder", label: "Display order", type: "number" },
  { key: "published", label: "Published", type: "boolean" },
];

export default function AdminTechnologiesPage() {
  return (
    <AdminResourcePage
      title="Technologies"
      subtitle="Edit the homepage technology curriculum, external learning resources, and display order. Map projects from the Projects page."
      load={getAdminTechnologies}
      create={createTechnology}
      update={updateTechnology}
      remove={deleteTechnology}
      fields={technologyFields}
      emptyItem={emptyTechnology}
      singularTitle="Technology"
      columns={[
        { key: "title", label: "Technology" },
        { key: "resourceLabel", label: "External resource" },
        { key: "published", label: "Status" },
      ]}
    />
  );
}

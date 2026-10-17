import { useState } from "react";
import AdminResourcePage from "./AdminResourcePage";
import {
  getAdminPageContent,
  createPageContent,
  updatePageContent,
  deletePageContent,
} from "../../api/adminApi";

const testimonialTabs = [
  { value: "featured", label: "Featured" },
  { value: "testimonials-partner-schools", label: "Partner Schools" },
  { value: "testimonials-students", label: "Students" },
  { value: "testimonials-labs", label: "Labs" },
  { value: "testimonials-workshops", label: "Workshops" },
  { value: "testimonials-awards", label: "Awards" },
  { value: "testimonials-community", label: "Community" },
  { value: "testimonials-others", label: "Others" },
];

const fields = [
  { key: "sectionTitle", label: "Section title", required: true },
  { key: "sectionBody", label: "Section body", type: "textarea", required: true },
  { key: "bullets", label: "Bullets (use | between items)", type: "textarea" },
  {
    key: "imageUrl",
    label: "Photo URLs (one per line)",
    type: "textarea",
    rows: 3,
    maxLength: 1000,
    helpText: "Add one or more public image URLs (up to 1,000 characters total). Keep images together in this story to create its gallery.",
  },
  { key: "imageAltText", label: "Photo description" },
  { key: "attribution", label: "Attribution" },
  { key: "displayOrder", label: "Display order", type: "number" },
  { key: "published", label: "Published", type: "boolean" },
];

export default function TestimonialsAdminPage() {
  const [activeTab, setActiveTab] = useState("testimonials-students");

  const activePageKey = activeTab === "featured" ? "testimonials" : activeTab;
  const loadItems = async () => {
    const items = await getAdminPageContent();
    return items.filter((item) => item.pageKey === activePageKey);
  };

  const emptyItem = {
    pageKey: activePageKey,
    sectionTitle: "",
    sectionBody: "",
    bullets: "",
    displayOrder: 0,
    published: true,
  };

  return (
    <div className="p-5 lg:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">COMMUNITY CONTENT</p>
            <h1 className="section-title">Testimonials</h1>
            <p className="mt-3 max-w-2xl text-zinc-500">
              Manage the reusable community stories for home sections, student highlights, lab experiences, and other testimonial collections.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {testimonialTabs.map((tab) => {
            const tabKey = tab.value === "featured" ? "testimonials" : tab.value;
            const isActive = activePageKey === tabKey;

            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-zinc-900 text-white"
                    : "border border-zinc-300 bg-white text-zinc-700 hover:border-zinc-500 hover:text-zinc-900"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          <AdminResourcePage
            key={activePageKey}
            title="Testimonials"
            subtitle="Publish community, student, and lab stories for the public pages and homepage carousel."
            load={loadItems}
            create={async (payload) => createPageContent({ ...payload, pageKey: activePageKey })}
            update={async (id, payload) => updatePageContent(id, { ...payload, pageKey: activePageKey })}
            remove={deletePageContent}
            emptyItem={emptyItem}
            fields={fields}
            columns={[
              { key: "pageKey", label: "Section" },
              { key: "sectionTitle", label: "Title" },
              { key: "imageUrl", label: "Photo URLs" },
              { key: "attribution", label: "Attribution" },
              { key: "displayOrder", label: "Order" },
              { key: "published", label: "Status" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import AdminResourcePage from "./AdminResourcePage";
import { getAdminPrograms, getAdminProjects, createProject, updateProject, deleteProject } from "../../api/adminApi";

const emptyItem = {
  title: "",
  slug: "",
  description: "",
  difficulty: "Beginner",
  gradeRange: "",
  skills: "",
  imageUrl: "",
  videoUrl: "",
  displayOrder: 0,
  published: true,
  programIds: [],
};

const projectFields = [
  { key: "title", label: "Title" },
  { key: "slug", label: "Slug" },
  { key: "description", label: "Description", type: "textarea" },
  { key: "difficulty", label: "Difficulty" },
  { key: "skills", label: "Skills" },
  { key: "imageUrl", label: "Image URL" },
  { key: "videoUrl", label: "Video URL" },
  { key: "displayOrder", label: "Display order", type: "number" },
];

export default function AdminProjectsPage() {
  const [programs, setPrograms] = useState([]);
  const [programsLoading, setProgramsLoading] = useState(true);
  const [programsError, setProgramsError] = useState("");

  useEffect(() => {
    getAdminPrograms()
      .then(setPrograms)
      .catch((error) => setProgramsError(error.response?.data?.message || "Failed to load programs."))
      .finally(() => setProgramsLoading(false));
  }, []);

  const fields = [
    ...projectFields,
    {
      key: "programIds",
      label: "Programs",
      type: "multiselect",
      helpText: "Hold Ctrl (Windows) or Command (Mac) to select multiple programs.",
      options: programs.map((program) => ({
        value: program.id,
        label: program.title,
      })),
      disabled: programsLoading || Boolean(programsError),
    },
    { key: "published", label: "Published", type: "boolean" },
  ];

  return (
    <>
      {programsError && (
        <div role="alert" className="mx-auto mt-5 max-w-7xl rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {programsError} Program assignment is unavailable until the programs load.
        </div>
      )}
      <AdminResourcePage
        title="Projects"
        subtitle="Manage student projects and media. Select the programs for each project here."
        load={getAdminProjects}
        create={createProject}
        update={updateProject}
        remove={deleteProject}
        fields={fields}
        emptyItem={emptyItem}
        columns={[
          { key: "title", label: "Title" },
          { key: "difficulty", label: "Difficulty" },
          { key: "published", label: "Status" },
        ]}
      />
    </>
  );
}

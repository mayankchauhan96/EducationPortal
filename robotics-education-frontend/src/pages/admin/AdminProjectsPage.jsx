import { useEffect, useState } from "react";
import AdminResourcePage from "./AdminResourcePage";
import {
  getAdminPrograms,
  getAdminProjects,
  getAdminTechnologies,
  createProject,
  updateProject,
  deleteProject,
} from "../../api/adminApi";

const emptyItem = {
  title: "",
  slug: "",
  description: "",
  difficulty: "Beginner",
  gradeRange: "",
  skills: "",
  imageUrl: "",
  listImageUrl: "",
  videoUrl: "",
  displayOrder: 0,
  published: true,
  programIds: [],
  technologyIds: [],
  primaryTechnologyId: "",
};

const projectFields = [
  { key: "title", label: "Title", required: true },
  { key: "slug", label: "Slug", required: true },
  {
    key: "description",
    label: "Description",
    type: "textarea",
    required: true,
    helpText: "Use line breaks to separate paragraphs.",
  },
  { key: "difficulty", label: "Difficulty" },
  { key: "skills", label: "Skills" },
  { key: "imageUrl", label: "Project detail image URL" },
  { key: "listImageUrl", label: "Project list image URL", helpText: "Shown on project cards. Leave blank to use the detail image." },
  { key: "videoUrl", label: "Project video URL", helpText: "YouTube, Vimeo, or a direct MP4/WebM video URL." },
  { key: "displayOrder", label: "Display order", type: "number" },
];

export default function AdminProjectsPage() {
  const [programs, setPrograms] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [programsLoading, setProgramsLoading] = useState(true);
  const [programsError, setProgramsError] = useState("");
  const [technologiesLoading, setTechnologiesLoading] = useState(true);
  const [technologiesError, setTechnologiesError] = useState("");

  useEffect(() => {
    getAdminPrograms()
      .then(setPrograms)
      .catch((error) => setProgramsError(error.response?.data?.message || "Failed to load programs."))
      .finally(() => setProgramsLoading(false));

    getAdminTechnologies()
      .then(setTechnologies)
      .catch((error) => setTechnologiesError(error.response?.data?.message || "Failed to load technologies."))
      .finally(() => setTechnologiesLoading(false));
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
    {
      key: "technologyIds",
      label: "Technology sections",
      type: "multiselect",
      helpText: "Choose every technology section where this project should appear.",
      options: technologies.map((technology) => ({
        value: technology.id,
        label: technology.title,
      })),
      disabled: technologiesLoading || Boolean(technologiesError),
    },
    {
      key: "primaryTechnologyId",
      label: "Primary technology",
      type: "select",
      numeric: true,
      helpText: "The primary category must also be selected under Technology sections.",
      options: technologies.map((technology) => ({
        value: technology.id,
        label: technology.title,
      })),
      disabled: technologiesLoading || Boolean(technologiesError),
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
      {technologiesError && (
        <div role="alert" className="mx-auto mt-5 max-w-7xl rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {technologiesError} Technology assignment is unavailable until the technology sections load.
        </div>
      )}
      <AdminResourcePage
        title="Projects"
        subtitle="Manage student projects, media, program links, and technology-section mappings."
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

import apiClient from "./apiClient";

const toSlug = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const getCurriculum = async () => {
  const response = await apiClient.get("/curriculum");
  const data = response.data.data || [];

  return data.map((item) => ({
    ...item,
    slug: item.slug || toSlug(item.levelName),
  }));
};

export const getCurriculumBySlug = async (slug) => {
  const listResponse = await apiClient.get("/curriculum");
  const items = listResponse.data.data || [];

  const match = items.find((item) => {
    const itemSlug = item.slug || toSlug(item.levelName);
    return itemSlug === slug || toSlug(item.levelName) === slug;
  });

  if (match) {
    return { ...match, slug: match.slug || toSlug(match.levelName) };
  }

  const detailResponse = await apiClient.get(`/curriculum/${slug}`);
  return detailResponse.data.data;
};

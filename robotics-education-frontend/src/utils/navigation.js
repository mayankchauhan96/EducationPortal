export const createReturnState = (location, { hash = location.hash, label, restoreSkill, projectFilters } = {}) => ({
  returnTo: {
    pathname: location.pathname,
    search: location.search,
    hash,
    label,
    ...(location.state?.returnTo ? { previousReturnTo: location.state.returnTo } : {}),
    ...(restoreSkill ? { restoreSkill } : {}),
    ...(projectFilters ? { projectFilters } : {}),
  },
});

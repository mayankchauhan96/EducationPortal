import { Link, useLocation } from "react-router-dom";

function toCamelCaseLabel(value) {
  if (!value && value !== 0) return "Home";

  return String(value)
    .trim()
    .replace(/[-_\s]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

export default function BackLink({ fallbackTo, fallbackLabel, className }) {
  const location = useLocation();
  const returnTo = location.state?.returnTo;
  const hasReturnPath = typeof returnTo?.pathname === "string"
    && returnTo.pathname.startsWith("/")
    && !returnTo.pathname.startsWith("//");
  const to = hasReturnPath
    ? {
      pathname: returnTo.pathname,
      search: returnTo.search || "",
      hash: returnTo.hash || "",
    }
    : fallbackTo;
  const state = hasReturnPath
    ? {
      ...(returnTo.previousReturnTo ? { returnTo: returnTo.previousReturnTo } : {}),
      ...(returnTo.restoreSkill ? { restoreSkill: returnTo.restoreSkill } : {}),
      ...(returnTo.projectFilters ? { restoreProjectFilters: returnTo.projectFilters } : {}),
    }
    : undefined;

  const labelText = hasReturnPath ? returnTo.label || fallbackLabel : fallbackLabel;

  return (
    <Link to={to} state={state} className={className}>
      ← {toCamelCaseLabel(labelText)}
    </Link>
  );
}

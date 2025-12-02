export const page = {
  padding: "1.5rem",
  background: "#fafafa",
  border: "1px solid #ddd",
  margin: "1rem",
  borderRadius: "6px",
};

export const layout = {
  fontFamily: "Arial, sans-serif",
  minHeight: "100vh",
  background: "#f0f2f5",
};

export const header = {
  background: "#fff",
  padding: "1rem",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  marginBottom: "1rem",
};

export const nav = { display: "flex", gap: "1.5rem" };

export const link = { textDecoration: "none", color: "#333" };

export const container = { maxWidth: "800px", margin: "0 auto" };

export const btn = {
  padding: "0.6rem 1rem",
  background: "#4F46E5",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  margin: "1rem",
};

export const active = (isActive) =>
  isActive
    ? {
        fontWeight: "bold",
        borderBottom: "2px solid #4F46E5",
        paddingBottom: "6px",
      }
    : undefined;

// ✔ FIXED + styled aside
export const aside = {
  width: "200px",
  background: "#ffffff",
  padding: "1rem",
  borderRadius: "6px",
  border: "1px solid #ddd",
  display: "flex",
  flexDirection: "column",
  gap: "0.6rem",
};

// ✔ Dashboard aside
export const dashboardAside = {
  width: "180px",
  background: "#ffffff",
  padding: "1rem",
  borderRadius: "6px",
  border: "1px solid #ddd",
  display: "flex",
  flexDirection: "column",
  gap: "0.6rem",
};

export const accountTab = {
  textDecoration: "none",
  color: "#333",
  padding: "0.4rem 0.8rem",
  borderRadius: "6px",
  border: "1px solid #ddd",
  background: "#fff",
};

export const accountTabActive = (isActive) =>
  isActive
    ? {
        background: "#4F46E5",
        color: "#fff",
        borderColor: "#4F46E5",
        fontWeight: "bold",
      }
    : undefined;

export const sideLink = {
  textDecoration: "none",
  color: "#333",
  padding: "0.4rem 0.8rem",
  borderRadius: "6px",
  border: "1px solid #ddd",
  background: "#fff",
  display: "inline-block",
};

export const sideLinkActive = (isActive) =>
  isActive
    ? {
        background: "#4F46E5",
        color: "#fff",
        borderColor: "#4F46E5",
        fontWeight: "bold",
      }
    : undefined;

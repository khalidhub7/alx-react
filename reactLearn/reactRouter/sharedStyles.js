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
        borderBottom: "#4F46E5 2px solid",
        paddingBottom: "10px",
      }
    : undefined;

export const page = {
  padding: "1.5rem",
  background: "#fafafa",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "#ddd",
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

export const active = (isActive) =>
  isActive
    ? {
        fontWeight: "bold",
        borderBottom: "2px solid #4F46E5",
        paddingBottom: "6px",
      }
    : undefined;

export const container = {
  maxWidth: "800px",
  margin: "0 auto",
  padding: "1rem",
};

export const btn = {
  padding: "0.6rem 1rem",
  background: "#4F46E5",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  margin: "1rem",
};

export const form = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  maxWidth: "300px",
};

export const input = {
  padding: "0.6rem",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "1rem",
};

export const formError = {
  color: "red",
  marginTop: "0.5rem",
};

export const aside = {
  width: "200px",
  background: "#ffffff",
  padding: "1rem",
  borderRadius: "6px",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "#ddd",
  display: "flex",
  flexDirection: "column",
  gap: "0.6rem",
};

export const dashboardAside = {
  width: "180px",
  background: "#ffffff",
  padding: "1rem",
  borderRadius: "6px",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "#ddd",
  display: "flex",
  flexDirection: "column",
  gap: "0.6rem",
};

export const accountTab = {
  textDecoration: "none",
  color: "#333",
  padding: "0.4rem 0.8rem",
  borderRadius: "6px",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "#ddd",
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
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "#ddd",
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

// lvl 8 additional styles
export const heavyPanel = {
  marginTop: "1rem",
  padding: "1rem",
  background: "#fff",
  borderRadius: "6px",
};

export const heavyContainer = {
  marginTop: "1rem",
};

export const productsLayoutWrapper = {
  padding: "1rem",
};

export const productList = {
  listStyle: "none",
  padding: 0,
};

export const productCard = {
  background: "#fff",
  padding: "1rem",
  borderRadius: "6px",
  marginBottom: "1rem",
  border: "1px solid #ddd",
};

export const productTitleText = {
  margin: 0,
  fontSize: "1.1rem",
};

export const fallback = {
  padding: "1rem",
};

// lvl 9
export const linkButton = {
  background: "none",
  border: "none",
  padding: 0,
  color: "#333",
  cursor: "pointer",
  fontSize: "1rem",
};

// this is lvl 11 additional styles

export const loadingText = {
  fontStyle: "italic",
  opacity: 0.7,
};

export const productDetailsList = {
  marginTop: "1rem",
  paddingLeft: "1.2rem",
};

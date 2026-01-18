export const page = {
  padding: "1.5rem", // p-6
  background: "#fafafa", // bg-[#fafafa]
  borderWidth: "1px", // border
  borderStyle: "solid", // border
  borderColor: "#ddd", // border-[#ddd]
  margin: "1rem", // m-4
  borderRadius: "6px", // rounded-md
};

export const layout = {
  fontFamily: "Arial, sans-serif",
  minHeight: "100vh",
  background: "#f0f2f5", // bg-[#f0f2f5]
};

export const header = {
  background: "#fff", // bg-[#fff]
  padding: "1rem", // p-4
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  marginBottom: "1rem",
};

export const nav = { display: "flex", gap: "1.5rem" };

export const link = {
  textDecoration: "none",
  color: "#333", // text-[#333]
};

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
  padding: "1rem", // p-4
};

export const btn = {
  padding: "0.6rem 1rem",
  background: "#4F46E5", // bg-[4F46E5]
  color: "#fff", // text-[#fff]
  border: "none", // border-none
  borderRadius: "6px", // rounded-md
  cursor: "pointer",
  margin: "1rem", // m-4
};

export const form = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  maxWidth: "300px",
};

export const input = {
  padding: "0.6rem", // p-2.5
  borderRadius: "6px", // rounded-md
  border: "1px solid #ccc", // border border-[#ccc]
  fontSize: "1rem", // text-base
};

export const formError = {
  color: "red", // text-red
  marginTop: "0.5rem",
};

export const aside = {
  width: "200px", // w-[200px]
  background: "#ffffff", // bg-[#ffffff]
  padding: "1rem", // p-4
  borderRadius: "6px", // rounded-md
  borderWidth: "1px", // border
  borderStyle: "solid", // border
  borderColor: "#ddd", // border-[#ddd]
  display: "flex",
  flexDirection: "column",
  gap: "0.6rem",
};

export const dashboardAside = {
  width: "180px", // w-[180px]
  background: "#ffffff", // bg-[#ffffff]
  padding: "1rem", // p-4
  borderRadius: "6px", // rounded-md
  borderWidth: "1px", // border
  borderStyle: "solid", // border
  borderColor: "#ddd", // border-[#ddd]
  display: "flex",
  flexDirection: "column",
  gap: "0.6rem",
};

export const accountTab = {
  textDecoration: "none",
  color: "#333", // text-[#333]
  padding: "0.4rem 0.8rem",
  borderRadius: "6px", // rounded-md
  borderWidth: "1px", // border
  borderStyle: "solid", // border
  borderColor: "#ddd", // border-[#ddd]
  background: "#fff", // bg-[#fff]
};

export const accountTabActive = (isActive) =>
  isActive
    ? {
        background: "#4F46E5",
        color: "#fff", // text-[#fff]
        borderColor: "#4F46E5", // border-[#4F46E5]
        fontWeight: "bold", // font-bold
      }
    : undefined;

export const sideLink = {
  textDecoration: "none",
  color: "#333", // text-[#333]
  padding: "0.4rem 0.8rem",
  borderRadius: "6px", // rounded-md
  borderWidth: "1px", // border
  borderStyle: "solid", // border
  borderColor: "#ddd", // border-[#ddd]
  background: "#fff", // bg-[#fff]
  display: "inline-block",
};

export const sideLinkActive = (isActive) =>
  isActive
    ? {
        background: "#4F46E5", // bg-[#4F46E5]
        color: "#fff", // text-[#fff]
        borderColor: "#4F46E5", // border-[#4F46E5]
        fontWeight: "bold", // font-bold
      }
    : undefined;

// lvl 8 additional styles
export const heavyPanel = {
  marginTop: "1rem",
  padding: "1rem", // p-4
  background: "#fff", // bg-[#fff]
  borderRadius: "6px", // rounded-md
};

export const heavyContainer = {
  marginTop: "1rem",
};

export const productsLayoutWrapper = {
  padding: "1rem", // p-4
};

export const productList = {
  listStyle: "none",
  padding: 0, // p-0
};

export const productCard = {
  background: "#fff", // bg-[#fff]
  padding: "1rem", // p-4
  borderRadius: "6px", // rounded-md
  marginBottom: "1rem",
  border: "1px solid #ddd", // border border-[#ddd]
};

export const productTitleText = {
  margin: 0, // m-0
  fontSize: "1.1rem", // text-[1.1rem]
};

export const fallback = {
  padding: "1rem", // p-4
};

// lvl 9
export const linkButton = {
  background: "none", // bg-none bg-transparent
  border: "none", // border-none
  padding: 0, // p-0
  color: "#333", // text-[#333]
  cursor: "pointer",
  fontSize: "1rem", // text-base
};

// lvl 11 additional styles

export const loadingText = {
  fontStyle: "italic", // italic
  opacity: 0.7,
};

export const productDetailsList = {
  marginTop: "1rem",
  paddingLeft: "1.2rem",
};

const getDefaultUrl = () => {
  const host = process.env.NODE_ENV === "production" ? "jake-history.vercel.app" : "localhost:3000";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  return `${protocol}://${host}`;
};

export default getDefaultUrl;

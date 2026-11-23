// COOKIE_CROSS_SITE=true is needed when the sites and API are on different
// domains. It requires https, so leave it off for local development.
export const cookieOptions = () => {
  const crossSite = process.env.COOKIE_CROSS_SITE === "true";
  return {
    httpOnly: true,
    secure: crossSite,
    sameSite: crossSite ? "none" : "lax",
  };
};

export const isAdminRoute = (pathname: string): boolean => {
  return pathname.startsWith("/admin");
};

export const userRoles = [
  "Reporter",
  "Designer|AD Publisher",
  "Updator",
  "Moderator",
  "Editor",
  "Tech/SEO Analyst",
  "Publisher",
  "Site Admin",
  "Super Admin",
];

export const getRoleNumber = (roleName: string): number => {
  return userRoles.indexOf(roleName);
};

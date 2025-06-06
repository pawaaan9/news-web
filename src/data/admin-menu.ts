import {
  IconBadgeAd,
  IconFile,
  IconKeyboard,
  IconLayout,
  IconUsersGroup,
} from "@tabler/icons-react";

export const menuItems = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: IconLayout,
    roles: [7, 8],
  },
  {
    href: "/admin/content",
    label: "Content",
    icon: IconFile,
    roles: [0, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    href: "/admin/accounts",
    label: "Accounts",
    icon: IconUsersGroup,
    roles: [7, 8],
  },
  {
    href: "/admin/advertisements",
    label: "Advertisements",
    icon: IconBadgeAd,
    roles: [1, 7, 8],
  },
  {
    href: "/admin/keywords",
    label: "Keywords",
    icon: IconKeyboard,
    roles: [7, 8, 5],
  },
];

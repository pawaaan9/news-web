"use client";

import { PageTitle } from "@/modules/shared/page-title";
import AdminLayout from "../admin-layout";
import { Button } from "@/components/ui/button";
import { IconPencilMinus, IconTextWrap, IconTrash } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { LabelText } from "@/modules/shared/label-text";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { userRoles } from "@/data/user-roles";

const users = [
  { id: 1, fullName: "John Doe", username: "johndoe", role: "Admin" },
  { id: 2, fullName: "Jane Smith", username: "janesmith", role: "Editor" },
  { id: 3, fullName: "Alice Johnson", username: "alicej", role: "Viewer" },
];

const AccountPage = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const router = useRouter();

  const handleEdit = (id: number) => {
    console.log("Edit user with ID:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete user with ID:", id);
  };
  return (
    <AdminLayout pageTitle="accounts">
      <div className="flex justify-between ">
        <PageTitle title="Manage accounts" />
        <Button
          className="bg-primary text-white hover:bg-primary/80 "
          onClick={() => {
            router.push("/admin/accounts/create-account");
          }}
        >
          <IconTextWrap size={20} />
          Add user
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4 items-end">
        <div>
          <LabelText text="Full name" />
          <Input
            type="text"
            id="fullname"
            placeholder="Full name"
            className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none  focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
          />
        </div>
        <div>
          <LabelText text="Username" />
          <Input
            type="text"
            id="username"
            placeholder="Username"
            className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none  focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
          />
        </div>

        <div>
          <LabelText text="Role" />
          <Popover>
            <PopoverTrigger asChild>
              <Input
                type="text"
                id="role"
                placeholder="Select a role"
                value={selectedRole || ""}
                readOnly
                className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2 cursor-pointer"
              />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2 rounded-md bg-white shadow-md">
              <ul className="space-y-2">
                {userRoles.map((role, index) => (
                  <li
                    key={index}
                    onClick={() => setSelectedRole(role)}
                    className="p-2 hover:bg-primary hover:text-white cursor-pointer rounded"
                  >
                    {role}
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>
        </div>
        <Button
          className="bg-primary text-white hover:bg-primary/80 "
          size="lg"
        >
          Search
        </Button>
      </div>

      {/* Table Section */}
      <div className="mt-8 font-dmSans">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
                <th className="p-4">Full Name</th>
                <th className="p-4">Username</th>
                <th className="p-4">Role</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-gray-200 text-sm text-gray-700"
                >
                  <td className="p-4">{user.fullName}</td>
                  <td className="p-4">{user.username}</td>
                  <td className="p-4">{user.role}</td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <IconPencilMinus size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <IconTrash size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AccountPage;

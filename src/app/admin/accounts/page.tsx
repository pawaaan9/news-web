"use client";

import { PageTitle } from "@/modules/shared/page-title";
import AdminLayout from "../admin-layout";
import { Button } from "@/components/ui/button";
import { IconPencilMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { LabelText } from "@/modules/shared/label-text";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { userRoles } from "@/data/user-roles";
import { getUsers, deleteUser } from "../../../api/user.api";
import { toast } from "react-hot-toast";
import withAuth from "@/hoc/with-auth";

export interface User {
  _id: string;
  fullname: string;
  username: string;
  email: string;
  password: string;
  userRole: string;
  userRoleNo: number;
  category: string[];
  createdTime: Date;
  modifiedTime: Date;
}

const AccountPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      if (Array.isArray(response)) {
        setUsers(response);
      } else {
        console.error("Invalid response format");
        toast.error("Failed to load users.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load users.");
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/accounts/edit-account/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        toast.success("User deleted successfully.");
        fetchUsers();
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete user.");
      }
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole ? user.userRole === selectedRole : true;
    return matchesSearch && matchesRole;
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <AdminLayout pageTitle="accounts">
      <Button
        className="bg-primary text-white hover:bg-primary/80 mb-6"
        onClick={() => router.push("/admin/accounts/create-account")}
      >
        <IconPlus size={20} />
        Add user
      </Button>

      <PageTitle title="Manage accounts" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4 items-end">
        <div>
          <LabelText text="Search" />
          <Input
            type="text"
            placeholder="Search by name or username"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <LabelText text="Role" />
          <Popover>
            <PopoverTrigger asChild>
              <Input
                type="text"
                id="role"
                placeholder="Filter by role"
                value={selectedRole || ""}
                readOnly
                className="cursor-pointer"
              />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2">
              <ul className="space-y-2">
                <li
                  onClick={() => setSelectedRole(null)}
                  className="p-2 hover:bg-primary hover:text-white cursor-pointer rounded"
                >
                  All Roles
                </li>
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
      </div>

      {/* Table Section */}
      <div className="mt-8 font-dmSans">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
                <th className="p-4">Full Name</th>
                <th className="p-4">Username</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-t border-gray-200 text-sm text-gray-700"
                >
                  <td className="p-4">{user.fullname}</td>
                  <td className="p-4">{user.username}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.userRole}</td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(user._id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <IconPencilMinus size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
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

export default withAuth(AccountPage);

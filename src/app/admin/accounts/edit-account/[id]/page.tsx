"use client";

import { PageTitle } from "@/modules/shared/page-title";
import AdminLayout from "../../../admin-layout";
import { Input } from "@/components/ui/input";
import { InputText } from "@/modules/shared/input-text";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { userRoles, getRoleNumber } from "@/data/user-roles";
import { categories } from "@/data/categories";
import {
  createUser,
  updateUser,
  getUserById,
} from "../../../../../api/user.api";
import { toast } from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";
import { User } from "../../page";
import withAuth from "@/hoc/with-auth";

interface UserFormData {
  fullname: string;
  username: string;
  email: string;
  password: string;
  userRole: string | null;
  category: string[];
}

const EditUser = () => {
  const router = useRouter();
  const { id } = useParams();
  const isEditMode = id !== "create-account";

  const [formData, setFormData] = useState<UserFormData>({
    fullname: "",
    username: "",
    email: "",
    password: "",
    userRole: null,
    category: [],
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const fetchUserData = async () => {
        try {
          setLoading(true);
          const user = (await getUserById(id as string)) as UserFormData;
          setFormData({
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            password: "", // Don't load password for security
            userRole: user.userRole,
            category: user.category || [],
          });
        } catch (error) {
          console.error(error);
          toast.error("Failed to load user data.");
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    }
  }, [id, isEditMode]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (role: string) => {
    setFormData((prev) => ({ ...prev, userRole: role }));
  };

  const handleCategoryChange = (category: string) => {
    setFormData((prev) => {
      if (prev.category.includes(category)) {
        return {
          ...prev,
          category: prev.category.filter((item) => item !== category),
        };
      } else {
        return {
          ...prev,
          category: [...prev.category, category],
        };
      }
    });
  };

  const handleSubmit = async () => {
    if (
      !formData.fullname ||
      !formData.username ||
      !formData.email ||
      !formData.userRole ||
      formData.category.length === 0
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    // Only require password for new users
    if (!isEditMode && !formData.password) {
      toast.error("Please provide a password.");
      return;
    }

    const userData = {
      fullname: formData.fullname,
      username: formData.username,
      email: formData.email,
      ...(formData.password && { password: formData.password }), // Only include password if it exists
      userRole: formData.userRole,
      userRoleNo: getRoleNumber(formData.userRole),
      category: formData.category,
    };

    try {
      setLoading(true);
      if (isEditMode) {
        await updateUser(id as string, userData);
        toast.success("User updated successfully!");
      } else {
        await createUser(userData as User);
        toast.success("User created successfully!");
      }
      router.push("/admin/accounts");
    } catch (error) {
      console.error(error);
      toast.error(`Failed to ${isEditMode ? "update" : "create"} user.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout pageTitle="account">
      <div className="bg-white p-4 rounded-lg">
        <PageTitle title={isEditMode ? "Edit user" : "Add user"} />
        <div className="flex flex-col gap-4 mt-4">
          {/* Fullname */}
          <div>
            <InputText text="Full name" />
            <Input
              type="text"
              name="fullname"
              placeholder="Enter full name"
              value={formData.fullname}
              onChange={handleInputChange}
              className="border border-charcoal/60 focus:border-primary/80 mt-2"
            />
          </div>

          {/* Username */}
          <div>
            <InputText text="Username" />
            <Input
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleInputChange}
              className="border border-charcoal/60 focus:border-primary/80 mt-2"
            />
          </div>

          {/* Email */}
          <div>
            <InputText text="Email" />
            <Input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
              className="border border-charcoal/60 focus:border-primary/80 mt-2"
            />
          </div>

          {/* Password - Only show for new users or when editing and want to change */}
          {!isEditMode && (
            <div className="relative">
              <InputText text="Password" />
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleInputChange}
                className="border border-charcoal/60 focus:border-primary/80 mt-2 pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-[75%] right-3 transform -translate-y-[50%] text-gray-500"
              >
                {showPassword ? (
                  <IconEyeOff size={20} />
                ) : (
                  <IconEye size={20} />
                )}
              </button>
            </div>
          )}

          {/* User Role */}
          <div>
            <InputText text="User role" />
            <div className="mt-2 grid grid-cols-2">
              {userRoles.map((role, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-2 mb-2 cursor-pointer text-[14px]"
                >
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={formData.userRole === role}
                    onChange={() => handleRoleChange(role)}
                    className="form-radio text-primary focus:ring-primary/80"
                  />
                  <span className="text-charcoal">{role}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <InputText text="Assign category (Select at least 1)" />
            <div className="mt-2 grid grid-cols-2">
              {categories.map((category, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-2 mb-2 cursor-pointer text-[14px]"
                >
                  <input
                    type="checkbox"
                    value={category}
                    checked={formData.category.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="form-checkbox text-primary focus:ring-primary/80"
                  />
                  <span className="text-charcoal">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit button */}
          <Button
            className="bg-primary text-white hover:bg-primary/80"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? isEditMode
                ? "Updating..."
                : "Saving..."
              : isEditMode
              ? "Update"
              : "Save"}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default withAuth(EditUser);

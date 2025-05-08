"use client";

import { PageTitle } from "@/modules/shared/page-title";
import AdminLayout from "../../admin-layout";
import { Input } from "@/components/ui/input";
import { InputText } from "@/modules/shared/input-text";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { userRoles, getRoleNumber } from "@/data/user-roles";
import { categories } from "@/data/categories";
import { createUser } from "../../../../api/user.api";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import withAuth from "@/hoc/with-auth";

const AddUser = () => {
  const router = useRouter();

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
  };

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSubmit = async () => {
    if (
      !fullname ||
      !username ||
      !email ||
      !password ||
      !selectedRole ||
      selectedCategories.length === 0
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    const userData = {
      fullname,
      username,
      email,
      password,
      userRole: selectedRole,
      userRoleNo: getRoleNumber(selectedRole),
      category: selectedCategories,
    };

    try {
      setLoading(true);
      await createUser(userData);
      toast.success("User created successfully!");
      router.push("/admin/accounts"); // <<< Redirect after create
    } catch (error) {
      console.error(error);
      toast.error("Failed to create user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout pageTitle="account">
      <div className="bg-white p-4 rounded-lg">
        <PageTitle title="Add user" />
        <div className="flex flex-col gap-4 mt-4">
          {/* Fullname */}
          <div>
            <InputText text="Full name" />
            <Input
              type="text"
              placeholder="Enter full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="border border-charcoal/60 focus:border-primary/80 mt-2"
            />
          </div>

          {/* Username */}
          <div>
            <InputText text="Username" />
            <Input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-charcoal/60 focus:border-primary/80 mt-2"
            />
          </div>

          {/* Email */}
          <div>
            <InputText text="Email" />
            <Input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-charcoal/60 focus:border-primary/80 mt-2"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <InputText text="Temporary password" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-charcoal/60 focus:border-primary/80 mt-2 pr-10"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-[75%] right-3 transform -translate-y-[50%] text-gray-500"
            >
              {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
            </button>
          </div>

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
                    checked={selectedRole === role}
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
                    checked={selectedCategories.includes(category)}
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
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default withAuth(AddUser);

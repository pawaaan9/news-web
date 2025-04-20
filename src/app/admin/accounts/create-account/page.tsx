"use client";

import { PageTitle } from "@/modules/shared/page-title";
import AdminLayout from "../../admin-layout";
import { Input } from "@/components/ui/input";
import { InputText } from "@/modules/shared/input-text";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { userRoles } from "@/data/user-roles";
import { categories } from "@/data/categories";

const AddUser = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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

  return (
    <AdminLayout pageTitle="account">
      <div className="bg-white p-4 rounded-lg ">
        <PageTitle title="Add user" />
        <div className="flex flex-col gap-4 mt-4">
          <div>
            <InputText text="Full name" />
            <Input
              type="text"
              id="fullname"
              placeholder="Enter full name"
              className=" border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none  focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
            />
          </div>
          <div>
            <InputText text="Username" />
            <Input
              type="text"
              id="username"
              placeholder="Enter username"
              className=" border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none  focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
            />
          </div>
          <div>
            <InputText text="Email" />
            <Input
              type="email"
              id="email"
              placeholder="Enter email"
              className=" border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none  focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
            />
          </div>
          <div className="relative">
            <InputText text="Temporary password" />
            <Input
              type={showPassword ? "text" : "password"}
              id="tempPassword"
              placeholder="Enter password"
              className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2 pr-10"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-[75%] right-3 transform -translate-y-[50%] text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
            </button>
          </div>

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
                    name="category"
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

          <Button className="bg-primary text-white hover:bg-primary/80">
            Save
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddUser;

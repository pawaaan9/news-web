"use client";

import { PageTitle } from "@/modules/shared/page-title";
import AdminLayout from "../admin-layout";
import { Input } from "@/components/ui/input";
import { InputText } from "@/modules/shared/input-text";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

const ProfilePage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSavePassword = () => {
    if (newPassword === confirmPassword) {
      console.log("New Password:", newPassword);
      alert("Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <AdminLayout pageTitle="Profile">
      <div className="bg-white p-4 rounded-lg">
        <PageTitle title="Profile Details" />
        <div className="flex flex-col gap-4 mt-4">
          {/* Full Name */}
          <div>
            <InputText text="Full name" />
            <Input
              type="text"
              id="fullname"
              value="John Doe"
              readOnly
              className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2 bg-gray-100"
            />
          </div>

          {/* Username */}
          <div>
            <InputText text="Username" />
            <Input
              type="text"
              id="username"
              value="johndoe"
              readOnly
              className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2 bg-gray-100"
            />
          </div>

          {/* Email */}
          <div>
            <InputText text="Email" />
            <Input
              type="email"
              id="email"
              value="johndoe@example.com"
              readOnly
              className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2 bg-gray-100"
            />
          </div>

          {/* Update Password */}
          <div>
            <InputText text="New Password" />
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2 pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-[60%] right-3 transform -translate-y-[50%] text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <IconEyeOff size={20} />
                ) : (
                  <IconEye size={20} />
                )}
              </button>
            </div>
          </div>

          <div>
            <InputText text="Confirm Password" />
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2 pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-[60%] right-3 transform -translate-y-[50%] text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <IconEyeOff size={20} />
                ) : (
                  <IconEye size={20} />
                )}
              </button>
            </div>
          </div>

          <Button
            onClick={handleSavePassword}
            className="bg-primary text-white hover:bg-primary/80 mt-5"
          >
            Save Password
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProfilePage;

"use client";

import { PageTitle } from "@/modules/shared/page-title";
import AdminLayout from "../admin-layout";
import { Input } from "@/components/ui/input";
import { InputText } from "@/modules/shared/input-text";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { getProfile, resetPassword } from "@/api/auth.api";
import { Bounce, ToastContainer, toast } from 'react-toastify';

interface User {
  id: string;
  fullname: string;
  username: string;
  email: string;
  userRole: string;
  // Add other fields returned by your API (excluding password)
}

interface ResetPasswordData {
  email: string;
  currentPassword: string;
  newPassword: string;
}

const ProfilePage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSavePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      console.log("New Password:", newPassword);
      const email = user?.email;
      if (!email) {
        console.error("Email not found");
      }
      try {
        const data: ResetPasswordData = {
          email: email!,
          currentPassword,
          newPassword,
        };
        const result = await resetPassword(data);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        toast.success('Password Reset Successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
        console.log(result);
      } catch (error) {
        console.error("❌ Reset failed:", error);
        toast.error('Failed to Reset Password', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
      }
    } else {
      alert("Passwords do not match!");
    }
  };

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProfile(); // ✅ now correctly typed
        setUser(result.data.user);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    fetchData();
  }, []);

  if (!user) return <div>Loading...</div>;

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
              value={user.fullname}
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
              value={user.username}
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
              value={user.email}
              readOnly
              className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2 bg-gray-100"
            />
          </div>

          {/* Update Password */}
          <div>
            <InputText text="Current Password" />
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                placeholder="Enter Current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
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
          <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProfilePage;

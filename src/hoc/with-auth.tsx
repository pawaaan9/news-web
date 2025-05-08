"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProfile } from "@/api/auth.api";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const ProtectedComponent = (
    props: React.ComponentProps<typeof WrappedComponent>
  ) => {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
          // Redirect to login if no token is found
          router.push("/admin/login");
          return;
        }

        try {
          // Optionally validate the token by calling the profile API
          await getProfile();
        } catch (error) {
          console.error("Invalid token or user not authenticated:", error);
          // Redirect to login if token validation fails
          router.push("/admin/login");
        }
      };

      checkAuth();
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return ProtectedComponent;
};

export default withAuth;

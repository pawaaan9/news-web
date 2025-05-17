"use client";

import { StatCard } from "@/modules/dashboard/stat-card";
import AdminLayout from "../admin-layout";
import { Button } from "@/components/ui/button";
import { IconCirclePlus, IconNews } from "@tabler/icons-react";
import withAuth from "@/hoc/with-auth";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();
  return (
    <AdminLayout pageTitle="Dashboard">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 ">
        <StatCard title="Total news articles" value={600} />
        <StatCard title="Total publishers" value={12} />
        <StatCard title="Total categories" value={8} />
        <StatCard title="News published today" value={100} />
      </div>
      <hr className="my-4 text-gray-400" />
      <h2 className="text-[24px] font-bold text-charcoal mb-4 text-center">
        Quick links
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 ">
        <Button
          className="bg-accent-teal text-white hover:bg-accent-teal/80 cursor-pointer"
          size="lg"
          onClick={() => {
            router.push("/admin/content/create-content");
          }}
        >
          <IconCirclePlus size={20} />
          Create news
        </Button>
        <Button
          className="bg-acccent-orange text-white hover:bg-acccent-orange/80 cursor-pointer"
          size="lg"
          onClick={() => {
            router.push("/admin/accounts/create-account");
          }}
        >
          <IconCirclePlus size={20} />
          Create account
        </Button>
        <Button
          className="bg-charcoal text-white hover:bg-charcoal/80 cursor-pointer"
          size="lg"
          onClick={() => {
            router.push("/admin/advertisements/create-advertisement");
          }}
        >
          <IconCirclePlus size={20} />
          Add advertisement
        </Button>
        <Button
          className="bg-primary text-white hover:bg-primary/80 cursor-pointer"
          size="lg"
          onClick={() => {
            router.push("/admin/content");
          }}
        >
          <IconNews size={20} />
          View all content
        </Button>
      </div>
    </AdminLayout>
  );
};

export default withAuth(DashboardPage);

"use client";

import { StatCard } from "@/modules/dashboard/stat-card";
import AdminLayout from "./admin-layout";
import { Button } from "@/components/ui/button";
import {
  IconCategoryPlus,
  IconCirclePlus,
  IconNews,
  IconTablePlus,
} from "@tabler/icons-react";

const DashboardPage = () => {
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
          className="bg-accent-teal text-white hover:bg-accent-teal/80"
          size="lg"
        >
          <IconCirclePlus size={20} />
          Create news
        </Button>
        <Button
          className="bg-acccent-orange text-white hover:bg-acccent-orange/80"
          size="lg"
        >
          <IconTablePlus size={20} />
          Add publisher
        </Button>
        <Button
          className="bg-charcoal text-white hover:bg-charcoal/80"
          size="lg"
        >
          <IconCategoryPlus size={20} />
          Add category
        </Button>
        <Button className="bg-primary text-white hover:bg-primary/80" size="lg">
          <IconNews size={20} />
          View all news
        </Button>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;

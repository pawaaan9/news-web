"use client";

import { StatCard } from "@/modules/dashboard/stat-card";
import AdminLayout from "../admin-layout";
import { Button } from "@/components/ui/button";
import { IconCirclePlus, IconNews } from "@tabler/icons-react";
import withAuth from "@/hoc/with-auth";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getContentStatus, getLogo, uploadLogo } from "@/api/logo.api";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";

const DashboardPage = () => {
  const router = useRouter();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [currentLogo, setCurrentLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [totalNews, setTotalNews] = useState(0);
  const [totalPublished, setTotalPublished] = useState(0);
  const [newsToday, setNewsToday] = useState(0);
  const [totalDrafts, setTotalDrafts] = useState(0);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await getLogo();
        if (res && res.data && typeof res.data.url === "string") {
          setCurrentLogo(res.data.url);
        } else {
          setCurrentLogo(null);
        }
      } catch {
        setCurrentLogo(null);
      }
    };
    fetchLogo();

    const fetchStats = async () => {
      try {
        const res = await getContentStatus();
        console.log(res);
        if (res && res.data) {
          setTotalNews(res.data.totalNews);
          setTotalPublished(res.data.totalPublished);
          setNewsToday(res.data.newsToday);
          setTotalDrafts(res.data.totalDrafts);
        }
      } catch {
        // Optionally handle error
      }
    };
    fetchStats();
  }, []);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleLogoUpload = async () => {
    try {
      if (!logoFile) return;
      const res = await uploadLogo(logoFile);
      if (res && res.data && typeof res.data.url === "string") {
        setCurrentLogo(res.data.url);
        setLogoFile(null);
        setLogoPreview(null);
        toast.success("Logo uploaded successfully!");
      } else {
        toast.error("Unexpected response from server.");
      }
    } catch {
      toast.error("Logo upload failed!");
    }
  };

  return (
    <AdminLayout pageTitle="Dashboard">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 ">
        <StatCard title="Total news articles" value={totalNews} />
        <StatCard title="Total published" value={totalPublished} />

        <StatCard title="Total drafts" value={totalDrafts} />
        <StatCard title="News published today" value={newsToday} />
      </div>
      <hr className="my-4 text-gray-400" />
      <div className="mb-8 flex flex-col items-center">
        <h2 className="text-[24px] font-bold text-charcoal mb-4 text-center">
          Change logo
        </h2>
        {currentLogo && (
          <Image
            src={currentLogo}
            alt="Current Logo"
            className="h-20 mb-2 rounded shadow"
            width={200}
            height={80}
          />
        )}
        {logoPreview && (
          <Image
            src={logoPreview}
            alt="Logo Preview"
            className="h-20 mb-2 rounded shadow"
            width={200}
            height={80}
          />
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleLogoChange}
        />
        <div className="flex gap-2">
          <Button
            className="bg-primary text-white"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            Choose Logo
          </Button>
          <Button
            className="bg-accent-teal text-white"
            size="sm"
            onClick={handleLogoUpload}
            disabled={!logoFile}
          >
            Upload Logo
          </Button>
        </div>
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
      <ToastContainer />
    </AdminLayout>
  );
};

export default withAuth(DashboardPage);

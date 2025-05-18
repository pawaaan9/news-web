"use client";

import { PageTitle } from "@/modules/shared/page-title";
import AdminLayout from "../admin-layout";
import { Button } from "@/components/ui/button";
import { IconAd } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { LabelText } from "@/modules/shared/label-text";
import { useState, useEffect, useCallback } from "react";
import { format, isAfter, isBefore } from "date-fns";
import { useRouter } from "next/navigation";
import { AdvertisementCard } from "@/modules/content/manage-ad-card";
import withAuth from "@/hoc/with-auth";
import {
  AdvertisementData,
  getAllAdvertisements,
} from "@/api/advertisement.api";

// Sample data for countries
const countries = [
  "Sri Lanka",
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "India",
  "Brazil",
  "South Africa",
  "All Countries",
];

const AdvertisementPage = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [searchTitle, setSearchTitle] = useState("");
  const [advertisements, setAdvertisements] = useState<AdvertisementData[]>([]);
  const [filteredAds, setFilteredAds] = useState<AdvertisementData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await getAllAdvertisements();
        setAdvertisements(response.data);
        setFilteredAds(response.data);
      } catch (error) {
        console.error("Error fetching advertisements:", error);
      }
    };

    fetchAdvertisements();
  }, []);

  const filterAdvertisements = useCallback(() => {
    let results = advertisements;

    // Filter by title
    if (searchTitle) {
      results = results.filter((ad) =>
        ad.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }

    // Filter by country
    if (selectedCountry) {
      results = results.filter((ad) => ad.country === selectedCountry);
    }

    // Filter by start date
    if (startDate) {
      results = results.filter(
        (ad) =>
          isAfter(new Date(ad.startDatetime), startDate) ||
          format(new Date(ad.startDatetime), "yyyy-MM-dd") ===
            format(startDate, "yyyy-MM-dd")
      );
    }

    // Filter by end date
    if (endDate) {
      results = results.filter(
        (ad) =>
          isBefore(new Date(ad.endDatetime), endDate) ||
          format(new Date(ad.endDatetime), "yyyy-MM-dd") ===
            format(endDate, "yyyy-MM-dd")
      );
    }

    setFilteredAds(results);
  }, [searchTitle, selectedCountry, startDate, endDate, advertisements]);

  useEffect(() => {
    filterAdvertisements();
  }, [filterAdvertisements]);

  const clearFilters = () => {
    setSearchTitle("");
    setSelectedCountry(null);
    setStartDate(null);
    setEndDate(null);
  };

  const handlePreview = (id: string) => {
    console.log("Preview advertisement ID:", id);
  };

  const handleEdit = (id: string) => {
    console.log("Edit advertisement ID:", id);
    router.push(`/admin/advertisements/edit-advertisement/${id}`);
  };

  const handleDelete = (id: string) => {
    console.log("Delete advertisement ID:", id);
    setFilteredAds(filteredAds.filter((ad) => ad._id !== id));
  };

  return (
    <AdminLayout pageTitle="advertisements">
      <Button
        className="bg-primary text-white hover:bg-primary/80 mb-6"
        onClick={() => {
          router.push("/admin/advertisements/create-advertisement");
        }}
      >
        <IconAd size={20} className="mr-2" />
        Add Advertisement
      </Button>

      <PageTitle title="Manage Advertisements" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4 items-end">
        <div>
          <LabelText text="Advertisement Title" />
          <Input
            type="text"
            id="title"
            placeholder="Search by title"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
          />
        </div>
        <div>
          <LabelText text="Country" />
          <select
            id="country"
            value={selectedCountry || ""}
            onChange={(e) => setSelectedCountry(e.target.value || null)}
            className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2 cursor-pointer w-full p-2 rounded-md"
          >
            <option value="">All Countries</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div>
          <LabelText text="Start Date" />
          <Input
            type="date"
            id="startDate"
            placeholder="Select start date"
            value={startDate ? format(startDate, "yyyy-MM-dd") : ""}
            onChange={(e) => {
              const val = e.target.value;
              setStartDate(val ? new Date(val) : null);
            }}
            className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
            min={format(new Date(), "yyyy-MM-dd")}
          />
        </div>
        <div>
          <LabelText text="End Date" />
          <Input
            type="date"
            id="endDate"
            placeholder="Select end date"
            value={endDate ? format(endDate, "yyyy-MM-dd") : ""}
            onChange={(e) => {
              const val = e.target.value;
              setEndDate(val ? new Date(val) : null);
            }}
            className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
          />
        </div>
        <div className="flex gap-2">
          <Button
            className="bg-primary text-white hover:bg-primary/80"
            size="lg"
            onClick={filterAdvertisements}
          >
            Apply Filters
          </Button>
          <Button
            variant="outline"
            className="border-charcoal/60 text-charcoal hover:bg-gray-100"
            size="lg"
            onClick={clearFilters}
          >
            Clear
          </Button>
        </div>
      </div>

      {/* Advertisements Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        {filteredAds.length > 0 ? (
          filteredAds.map((ad) => (
            <AdvertisementCard
              key={ad._id}
              id={ad._id || ""}
              title={ad.title}
              photo={ad.adImage as string}
              startDate={format(new Date(ad.startDatetime), "yyyy-MM-dd HH:mm")}
              endDate={format(new Date(ad.endDatetime), "yyyy-MM-dd HH:mm")}
              duration={`${Math.ceil(
                (new Date(ad.endDatetime).getTime() -
                  new Date(ad.startDatetime).getTime()) /
                  (1000 * 60 * 60 * 24)
              )} days`}
              country={ad.country}
              status={ad.status}
              onPreview={() => handlePreview(ad._id || "")}
              onEdit={() => handleEdit(ad._id || "")}
              onDelete={() => handleDelete(ad._id || "")}
            />
          ))
        ) : (
          <div className="col-span-2 text-center py-10">
            <p className="text-lg text-charcoal">
              No advertisements found matching your criteria
            </p>
            <Button
              variant="link"
              className="text-primary mt-2"
              onClick={clearFilters}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default withAuth(AdvertisementPage);

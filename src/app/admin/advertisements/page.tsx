"use client";

import { PageTitle } from "@/modules/shared/page-title";
import AdminLayout from "../admin-layout";
import { Button } from "@/components/ui/button";
import { IconAd } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { LabelText } from "@/modules/shared/label-text";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useEffect } from "react";
import { format, isAfter, isBefore } from "date-fns";
import { useRouter } from "next/navigation";
import { AdvertisementCard } from "@/modules/content/manage-ad-card";
import withAuth from "@/hoc/with-auth";

// Sample data for countries
const countries = [
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
];

// Sample data for durations
const durations = [
  "7 days",
  "14 days",
  "30 days",
  "60 days",
  "90 days",
  "180 days",
  "365 days",
];

// Sample advertisement data
const advertisementData = [
  {
    id: 1,
    title: "Summer Sale Promotion",
    photo: "/placeholder-ad-1.jpg",
    startDate: "2025-05-01",
    endDate: "2025-05-30",
    duration: "30 days",
    country: "United States",
    status: "Active",
  },
  {
    id: 2,
    title: "New Product Launch",
    photo: "/placeholder-ad-2.jpg",
    startDate: "2025-05-10",
    endDate: "2025-06-09",
    duration: "30 days",
    country: "Canada",
    status: "Active",
  },
  {
    id: 3,
    title: "Holiday Special Discount",
    photo: "/placeholder-ad-3.jpg",
    startDate: "2025-04-15",
    endDate: "2025-04-29",
    duration: "14 days",
    country: "United Kingdom",
    status: "Expired",
  },
  {
    id: 4,
    title: "Flash Sale Weekend",
    photo: "/placeholder-ad-4.jpg",
    startDate: "2025-05-15",
    endDate: "2025-05-21",
    duration: "7 days",
    country: "Australia",
    status: "Scheduled",
  },
  {
    id: 5,
    title: "Premium Membership Offer",
    photo: "/placeholder-ad-5.jpg",
    startDate: "2025-05-05",
    endDate: "2025-08-03",
    duration: "90 days",
    country: "Germany",
    status: "Active",
  },
  {
    id: 6,
    title: "End of Season Clearance",
    photo: "/placeholder-ad-6.jpg",
    startDate: "2025-04-01",
    endDate: "2025-04-30",
    duration: "30 days",
    country: "France",
    status: "Expired",
  },
];

const AdvertisementPage = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [searchTitle, setSearchTitle] = useState("");
  const [filteredAds, setFilteredAds] = useState(advertisementData);
  const router = useRouter();

  useEffect(() => {
    filterAdvertisements();
  }, [searchTitle, selectedCountry, selectedDuration, startDate, endDate]);

  const filterAdvertisements = () => {
    let results = advertisementData;

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

    // Filter by duration
    if (selectedDuration) {
      results = results.filter((ad) => ad.duration === selectedDuration);
    }

    // Filter by start date
    if (startDate) {
      results = results.filter(
        (ad) =>
          isAfter(new Date(ad.startDate), startDate) ||
          format(new Date(ad.startDate), "yyyy-MM-dd") ===
            format(startDate, "yyyy-MM-dd")
      );
    }

    // Filter by end date
    if (endDate) {
      results = results.filter(
        (ad) =>
          isBefore(new Date(ad.endDate), endDate) ||
          format(new Date(ad.endDate), "yyyy-MM-dd") ===
            format(endDate, "yyyy-MM-dd")
      );
    }

    setFilteredAds(results);
  };

  const clearFilters = () => {
    setSearchTitle("");
    setSelectedCountry(null);
    setSelectedDuration(null);
    setStartDate(null);
    setEndDate(null);
  };

  const handlePreview = (id: number) => {
    console.log("Preview advertisement ID:", id);
  };

  const handleEdit = (id: number) => {
    console.log("Edit advertisement ID:", id);
    router.push(`/admin/advertisements/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    console.log("Delete advertisement ID:", id);
    // In a real app, you would call an API here and then update the state
    setFilteredAds(filteredAds.filter((ad) => ad.id !== id));
  };

  return (
    <AdminLayout pageTitle="advertisements">
      <div className="flex justify-between">
        <PageTitle title="Manage Advertisements" />
        <Button
          className="bg-primary text-white hover:bg-primary/80"
          onClick={() => {
            router.push("/admin/advertisements/create-advertisement");
          }}
        >
          <IconAd size={20} className="mr-2" />
          Add Advertisement
        </Button>
      </div>
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
          <Popover>
            <PopoverTrigger asChild>
              <Input
                type="text"
                id="country"
                placeholder="Select a country"
                value={selectedCountry || ""}
                readOnly
                className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2 cursor-pointer"
              />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2 rounded-md bg-white shadow-md">
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                <li
                  onClick={() => setSelectedCountry(null)}
                  className="p-2 hover:bg-primary hover:text-white cursor-pointer rounded"
                >
                  All Countries
                </li>
                {countries.map((country, index) => (
                  <li
                    key={index}
                    onClick={() => setSelectedCountry(country)}
                    className="p-2 hover:bg-primary hover:text-white cursor-pointer rounded"
                  >
                    {country}
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <LabelText text="Duration" />
          <Popover>
            <PopoverTrigger asChild>
              <Input
                type="text"
                id="duration"
                placeholder="Select ad duration"
                value={selectedDuration || ""}
                readOnly
                className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2 cursor-pointer"
              />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2 rounded-md bg-white shadow-md">
              <ul className="space-y-2">
                <li
                  onClick={() => setSelectedDuration(null)}
                  className="p-2 hover:bg-primary hover:text-white cursor-pointer rounded"
                >
                  All Durations
                </li>
                {durations.map((duration, index) => (
                  <li
                    key={index}
                    onClick={() => setSelectedDuration(duration)}
                    className="p-2 hover:bg-primary hover:text-white cursor-pointer rounded"
                  >
                    {duration}
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <LabelText text="Start Date" />
          <Popover>
            <PopoverTrigger asChild>
              <Input
                type="text"
                id="startDate"
                placeholder="Select start date"
                value={startDate ? format(startDate, "yyyy-MM-dd") : ""}
                readOnly
                className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2 cursor-pointer"
              />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate || undefined}
                onSelect={(date) => setStartDate(date || null)}
                className="rounded-md bg-white"
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <LabelText text="End Date" />
          <Popover>
            <PopoverTrigger asChild>
              <Input
                type="text"
                id="endDate"
                placeholder="Select end date"
                value={endDate ? format(endDate, "yyyy-MM-dd") : ""}
                readOnly
                className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2 cursor-pointer"
              />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate || undefined}
                onSelect={(date) => setEndDate(date || null)}
                className="rounded-md bg-white"
              />
            </PopoverContent>
          </Popover>
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
              key={ad.id}
              id={ad.id}
              title={ad.title}
              photo={ad.photo}
              startDate={ad.startDate}
              endDate={ad.endDate}
              duration={ad.duration}
              country={ad.country}
              status={ad.status}
              onPreview={() => handlePreview(ad.id)}
              onEdit={() => handleEdit(ad.id)}
              onDelete={() => handleDelete(ad.id)}
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

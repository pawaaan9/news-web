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
  deleteAdvertisement,
  getAllAdvertisements,
} from "@/api/advertisement.api";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";

// Sample data for countries
const countries = [
  { name: "Sri Lanka", code: "LK" },
  { name: "United States", code: "US" },
  { name: "Canada", code: "CA" },
  { name: "United Kingdom", code: "GB" },
  { name: "Australia", code: "AU" },
  { name: "Germany", code: "DE" },
  { name: "France", code: "FR" },
  { name: "Japan", code: "JP" },
  { name: "India", code: "IN" },
  { name: "Brazil", code: "BR" },
  { name: "South Africa", code: "ZA" },
  { name: "All Countries", code: "ALL" },
];

const AdvertisementPage = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [searchTitle, setSearchTitle] = useState("");
  const [advertisements, setAdvertisements] = useState<AdvertisementData[]>([]);
  const [filteredAds, setFilteredAds] = useState<AdvertisementData[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [adToDelete, setAdToDelete] = useState<string | null>(null);
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
      results = results.filter((ad) => 
        ad.countries.some(country => country.name === selectedCountry)
      );
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

  const handlePreview = (id: string) => {};

  const handleEdit = (id: string) => {
    router.push(`/admin/advertisements/edit-advertisement/${id}`);
  };

  const handleDelete = (id: string) => {
    setAdToDelete(id);
    setDeleteDialogOpen(true);
  };
  const confirmDelete = async () => {
    if (!adToDelete) return;
    try {
      await deleteAdvertisement(adToDelete);
      setFilteredAds(filteredAds.filter((ad) => ad._id !== adToDelete));
      setDeleteDialogOpen(false);
      setAdToDelete(null);
    } catch (error) {
      console.error("Error deleting content:", error);
      setDeleteDialogOpen(false);
      setAdToDelete(null);
    }
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
            onChange={(e) => {
              setSearchTitle(e.target.value);
              filterAdvertisements();
            }}
            className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
          />
        </div>
        <div>
          <LabelText text="Country" />
          <select
            id="country"
            value={selectedCountry || ""}
            onChange={(e) => {
              setSelectedCountry(e.target.value || null);
              filterAdvertisements();
            }}
            className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2 cursor-pointer w-full p-2 rounded-md"
          >
            <option value="">All Countries</option>
            {countries.map((country) => (
              <option key={country.code} value={country.name}>
                {country.name}
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
              filterAdvertisements();
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
              filterAdvertisements();
            }}
            className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
          />
        </div>
        {/* Optional: Clear all link */}

        <Button variant="outline" onClick={clearFilters}>
          Clear all filters
        </Button>
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
              countries={ad.countries}
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

        <ConfirmationDialog
          isOpen={deleteDialogOpen}
          onClose={() => {
            setDeleteDialogOpen(false);
            setAdToDelete(null);
          }}
          onConfirm={confirmDelete}
          title="Delete Advertisement"
          message="Are you sure you want to delete this advertisement? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
        />
      </div>
    </AdminLayout>
  );
};

export default withAuth(AdvertisementPage);

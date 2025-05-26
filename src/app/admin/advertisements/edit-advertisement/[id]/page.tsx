"use client";

import { PageTitle } from "@/modules/shared/page-title";
import AdminLayout from "../../../admin-layout";
import { Button } from "@/components/ui/button";
import {
  IconAd,
  IconPhoto,
  IconBrandWhatsapp,
  IconMail,
  IconPhone,
  IconBrandFacebook,
  IconLink,
} from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { LabelText } from "@/modules/shared/label-text";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { useParams, useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import {
  AdvertisementData,
  getAdvertisementById,
  updateAdvertisement,
} from "@/api/advertisement.api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

const advertisementPositions = [
  { name: "Medium Rectangle", size: "300×250" },
  { name: "Large Rectangle", size: "336×280" },
  { name: "Leaderboard", size: "728×90" },
  { name: "Large Leaderboard", size: "970×90" },
  { name: "Half Page", size: "300×600" },
  { name: "Wide Skyscraper", size: "160×600" },
  { name: "Large Mobile Banner", size: "320×100" },
  { name: "Mobile Banner", size: "320×50" },
  { name: "Billboard", size: "970×250" },
  { name: "Skyscraper", size: "120×600" },
];

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

const EditAdvertisement = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("23:59");
  const [adUrl, setAdUrl] = useState("");

  // Contact information fields
  const [hasWebsite, setHasWebsite] = useState("yes");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [phone, setPhone] = useState("");
  const [facebookProfile, setFacebookProfile] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch ad data
  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    getAdvertisementById(id)
      .then((data) => {
        // Narrow the type of data
        const ad = (data as { data: AdvertisementData }).data;

        setTitle(ad.title);
        setDescription(ad.description || "");
        setSelectedPosition(ad.position);
        setSelectedCountry(ad.country);
        setHasWebsite(ad.isWebsiteHave ? "yes" : "no");
        setAdUrl(ad.adUrl || "");
        setEmail(ad.email || "");
        setWhatsapp(ad.whatsappNo || "");
        setPhone(ad.phoneNo || "");
        setFacebookProfile(ad.fbProfile || "");
        setPreviewImage(typeof ad.adImage === "string" ? ad.adImage : null);

        // Parse dates and times
        if (ad.startDatetime) {
          const start = new Date(ad.startDatetime);
          setStartDate(start);
          setStartTime(format(start, "HH:mm"));
        }
        if (ad.endDatetime) {
          const end = new Date(ad.endDatetime);
          setEndDate(end);
          setEndTime(format(end, "HH:mm"));
        }
      })
      .catch(() => {
        toast.error("Failed to load advertisement.");
        router.push("/admin/advertisements");
      })
      .finally(() => setIsLoading(false));
  }, [id, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreviewImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent,
    status: "draft" | "toPublish"
  ) => {
    e.preventDefault();
    if (
      !title ||
      !selectedPosition ||
      !selectedCountry ||
      !startDate ||
      !endDate
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const advertisementData = {
        title,
        description,
        adImage: photo as File, // Only send if changed
        position: selectedPosition,
        country: selectedCountry,
        isWebsiteHave: hasWebsite === "yes",
        adUrl: hasWebsite === "yes" ? adUrl : undefined,
        email: hasWebsite === "no" ? email : undefined,
        whatsappNo: hasWebsite === "no" ? whatsapp : undefined,
        phoneNo: hasWebsite === "no" ? phone : undefined,
        fbProfile: hasWebsite === "no" ? facebookProfile : undefined,
        startDatetime: startDate
          ? `${format(startDate, "yyyy-MM-dd")}T${startTime}:00`
          : "",
        endDatetime: endDate
          ? `${format(endDate, "yyyy-MM-dd")}T${endTime}:00`
          : "",
        status,
      };

      await updateAdvertisement(id!, advertisementData);
      toast.success(
        status === "draft"
          ? "Advertisement saved as draft!"
          : "Advertisement updated successfully!"
      );
      router.push("/admin/advertisements");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to update advertisement."
      );
    }
  };

  if (isLoading) {
    return (
      <AdminLayout pageTitle="ADVERTISEMENTS">
        <div className="p-8 text-center">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout pageTitle="ADVERTISEMENTS">
      <div className="bg-white p-4 rounded-lg">
        <PageTitle title="Edit Advertisement" />
        <form className="flex flex-col gap-6 mt-4">
          {/* Advertisement Title */}
          <div>
            <LabelText text="Advertisement Title (Required)" />
            <Input
              type="text"
              id="title"
              placeholder="Enter advertisement title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
              required
            />
          </div>

          {/* Advertisement Description */}
          <div>
            <LabelText text="Description (Optional)" />
            <Textarea
              id="description"
              placeholder="Enter advertisement description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
              rows={3}
            />
          </div>

          {/* Advertisement Position */}
          <div>
            <LabelText text="Advertisement Position (Required)" />
            <select
              id="position"
              value={selectedPosition || ""}
              onChange={(e) => setSelectedPosition(e.target.value)}
              className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2 cursor-pointer w-full p-2 rounded-md"
              required
            >
              <option value="" disabled>
                Select advertisement position
              </option>
              {advertisementPositions.map((position, index) => (
                <option key={index} value={position.name}>
                  {position.name} ({position.size})
                </option>
              ))}
            </select>
          </div>

          {/* Advertisement Photo */}
          <div>
            <LabelText text="Advertisement Photo (Required)" />
            <div className="flex flex-col md:flex-row gap-4 mt-2">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0"
                    required
                  />
                  <IconPhoto className="text-charcoal/60" />
                </div>
              </div>
              {previewImage && (
                <div className="w-32 h-32 border border-charcoal/20 rounded-md overflow-hidden">
                  <Image
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    width={128} // Specify width
                    height={128}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Target Country */}
          <div>
            <LabelText text="Target Country (Required)" />
            <select
              id="country"
              value={selectedCountry || ""}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2 cursor-pointer w-full p-2 rounded-md"
              required
            >
              <option value="" disabled>
                Select target country
              </option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* Website Link or Contact Information */}
          <div className="border border-charcoal/20 rounded-lg p-4">
            <LabelText text="Advertisement Link Options" />
            <div className="mt-3">
              <Tabs defaultValue="yes" onValueChange={setHasWebsite}>
                <TabsList className="grid grid-cols-2 w-full max-w-md mb-4">
                  <TabsTrigger value="yes" className="flex items-center gap-2">
                    <IconLink size={18} />I have a website
                  </TabsTrigger>
                  <TabsTrigger value="no" className="flex items-center gap-2">
                    <IconPhone size={18} />
                    No website
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="yes">
                  <div>
                    <LabelText text="Advertisement URL" />
                    <Input
                      type="url"
                      id="url"
                      placeholder="Enter your website URL (e.g., https://example.com)"
                      value={adUrl}
                      onChange={(e) => setAdUrl(e.target.value)}
                      className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
                      required={hasWebsite === "yes"}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="no">
                  <div className="space-y-4">
                    <div>
                      <LabelText text="Email Address (Required)" />
                      <div className="flex items-center gap-2 mt-2">
                        <IconMail size={18} className="text-charcoal/60" />
                        <Input
                          type="email"
                          id="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0"
                          required={hasWebsite === "no"}
                        />
                      </div>
                    </div>

                    <div>
                      <LabelText text="WhatsApp Number (Optional)" />
                      <div className="flex items-center gap-2 mt-2">
                        <IconBrandWhatsapp
                          size={18}
                          className="text-charcoal/60"
                        />
                        <Input
                          type="tel"
                          id="whatsapp"
                          placeholder="Enter your WhatsApp number with country code"
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0"
                        />
                      </div>
                    </div>

                    <div>
                      <LabelText text="Phone Number (Optional)" />
                      <div className="flex items-center gap-2 mt-2">
                        <IconPhone size={18} className="text-charcoal/60" />
                        <Input
                          type="tel"
                          id="phone"
                          placeholder="Enter your phone number with country code"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0"
                        />
                      </div>
                    </div>

                    <div>
                      <LabelText text="Facebook Profile Link (Optional)" />
                      <div className="flex items-center gap-2 mt-2">
                        <IconBrandFacebook
                          size={18}
                          className="text-charcoal/60"
                        />
                        <Input
                          type="url"
                          id="facebook"
                          placeholder="Enter your Facebook profile link"
                          value={facebookProfile}
                          onChange={(e) => setFacebookProfile(e.target.value)}
                          className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Date and Time Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <LabelText text="Start Date (Required)" />
              <div className="flex flex-col gap-2 mt-2">
                <div>
                  <label className="block text-sm text-charcoal/60 mb-1">
                    Date
                  </label>
                  <Input
                    type="date"
                    value={startDate ? format(startDate, "yyyy-MM-dd") : ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setStartDate(val ? new Date(val) : null);
                    }}
                    min={format(new Date(), "yyyy-MM-dd")}
                    className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-charcoal/60 mb-1">
                    Time
                  </label>
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <LabelText text="End Date (Required)" />
              <div className="flex flex-col gap-2 mt-2">
                <div>
                  <label className="block text-sm text-charcoal/60 mb-1">
                    Date
                  </label>
                  <Input
                    type="date"
                    value={endDate ? format(endDate, "yyyy-MM-dd") : ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEndDate(val ? new Date(val) : null);
                    }}
                    min={
                      startDate
                        ? format(startDate, "yyyy-MM-dd")
                        : format(new Date(), "yyyy-MM-dd")
                    }
                    className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-charcoal/60 mb-1">
                    Time
                  </label>
                  <Input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              className="border-charcoal/60 text-charcoal hover:bg-gray-100"
              onClick={() => router.push("/admin/advertisements")}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
              onClick={(e) => handleSubmit(e, "draft")}
            >
              Save Draft
            </Button>
            <Button
              type="submit"
              className="bg-primary text-white hover:bg-primary/80"
              onClick={(e) => handleSubmit(e, "toPublish")}
            >
              <IconAd className="mr-2" size={20} />
              Publish Advertisement
            </Button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </AdminLayout>
  );
};

export default EditAdvertisement;

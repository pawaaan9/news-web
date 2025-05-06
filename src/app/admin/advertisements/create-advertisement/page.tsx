"use client";

import { PageTitle } from "@/modules/shared/page-title";
import AdminLayout from "../../admin-layout";
import { Button } from "@/components/ui/button";
import { IconAd, IconCalendar, IconClock, IconPhoto, IconWorld, IconBrandWhatsapp, IconMail, IconPhone, IconBrandFacebook, IconLink } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { LabelText } from "@/modules/shared/label-text";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@radix-ui/react-tabs";

// Sample data for advertisement positions
const advertisementPositions = [
  "Homepage Banner",
  "Article Top",
  "Article Bottom",
  "Sidebar",
  "Newsletter",
  "Featured Slot"
];

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
  "All Countries"
];

const CreateAdvertisement = () => {
  const router = useRouter();
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
  const [url, setUrl] = useState("");
  
  // Contact information fields
  const [hasWebsite, setHasWebsite] = useState("yes");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [phone, setPhone] = useState("");
  const [facebookProfile, setFacebookProfile] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setPhoto(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreviewImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle form submission here
    console.log({
      title,
      description,
      photo,
      position: selectedPosition,
      country: selectedCountry,
      startDate,
      endDate,
      startTime,
      endTime,
      hasWebsite,
      url: hasWebsite === "yes" ? url : "",
      contactInfo: hasWebsite === "no" ? {
        email,
        whatsapp,
        phone,
        facebookProfile
      } : {}
    });
    // In a real app, you would call an API here
    router.push("/admin/advertisements");
  };

  const generateUrlFromTitle = () => {
    if (title) {
      const baseUrl = "https://example.com/ads/";
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-");
      setUrl(baseUrl + slug);
    }
  };

  return (
    <AdminLayout pageTitle="ADVERTISEMENTS">
      <div className="bg-white p-4 rounded-lg">
        <PageTitle title="Create Advertisement" />
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4">
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
                generateUrlFromTitle();
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
                <p className="text-sm text-charcoal/60 mt-1">
                  Recommended size: 1200x600px (for banners) or 300x300px (for squares)
                </p>
              </div>
              {previewImage && (
                <div className="w-32 h-32 border border-charcoal/20 rounded-md overflow-hidden">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Advertisement Position */}
          <div>
            <LabelText text="Advertisement Position (Required)" />
            <Popover>
              <PopoverTrigger asChild>
                <Input
                  type="text"
                  id="position"
                  placeholder="Select advertisement position"
                  value={selectedPosition || ""}
                  readOnly
                  className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2 cursor-pointer"
                  required
                />
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2 rounded-md bg-white shadow-md">
                <ul className="space-y-2 max-h-60 overflow-y-auto">
                  {advertisementPositions.map((position, index) => (
                    <li
                      key={index}
                      onClick={() => setSelectedPosition(position)}
                      className="p-2 hover:bg-primary hover:text-white cursor-pointer rounded"
                    >
                      {position}
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>
          </div>

          {/* Target Country */}
          <div>
            <LabelText text="Target Country (Required)" />
            <Popover>
              <PopoverTrigger asChild>
                <Input
                  type="text"
                  id="country"
                  placeholder="Select target country"
                  value={selectedCountry || ""}
                  readOnly
                  className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2 cursor-pointer"
                  required
                />
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2 rounded-md bg-white shadow-md">
                <ul className="space-y-2 max-h-60 overflow-y-auto">
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

          {/* Website Link or Contact Information */}
          <div className="border border-charcoal/20 rounded-lg p-4">
            <LabelText text="Advertisement Link Options" />
            <div className="mt-3">
              <Tabs defaultValue="yes" onValueChange={setHasWebsite}>
                <TabsList className="grid grid-cols-2 w-full max-w-md mb-4">
                  <TabsTrigger value="yes" className="flex items-center gap-2">
                    <IconLink size={18} />
                    I have a website
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
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
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
                        <IconBrandWhatsapp size={18} className="text-charcoal/60" />
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
                        <IconBrandFacebook size={18} className="text-charcoal/60" />
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
              <div className="flex gap-2 mt-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex items-center gap-2 border border-charcoal/60 rounded-md px-3 py-2 w-full cursor-pointer hover:border-primary/80">
                      <IconCalendar size={18} className="text-charcoal/60" />
                      <span>
                        {startDate ? format(startDate, "MMM dd, yyyy") : "Select date"}
                      </span>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      required={true}
                      selected={startDate || undefined}
                      onSelect={setStartDate}
                      className="rounded-md bg-white"
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
                <div className="flex items-center gap-2 border border-charcoal/60 rounded-md px-3 py-2 w-full">
                  <IconClock size={18} className="text-charcoal/60" />
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="border-none p-0 focus:ring-0"
                  />
                </div>
              </div>
            </div>

            <div>
              <LabelText text="End Date (Required)" />
              <div className="flex gap-2 mt-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex items-center gap-2 border border-charcoal/60 rounded-md px-3 py-2 w-full cursor-pointer hover:border-primary/80">
                      <IconCalendar size={18} className="text-charcoal/60" />
                      <span>
                        {endDate ? format(endDate, "MMM dd, yyyy") : "Select date"}
                      </span>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      required={true}
                      selected={endDate || undefined}
                      onSelect={setEndDate}
                      className="rounded-md bg-white"
                      disabled={(date) => 
                        startDate ? date < startDate : date < new Date()
                      }
                    />
                  </PopoverContent>
                </Popover>
                <div className="flex items-center gap-2 border border-charcoal/60 rounded-md px-3 py-2 w-full">
                  <IconClock size={18} className="text-charcoal/60" />
                  <Input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="border-none p-0 focus:ring-0"
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
            >
              Save Draft
            </Button>
            <Button
              type="submit"
              className="bg-primary text-white hover:bg-primary/80"
            >
              <IconAd className="mr-2" size={20} />
              Publish Advertisement
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreateAdvertisement;
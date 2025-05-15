"use client";

import { PageTitle } from "@/modules/shared/page-title";
import AdminLayout from "../admin-layout";
import { Button } from "@/components/ui/button";
import {
  IconEye,
  IconPencilMinus,
  IconPlus,
  IconTrash,
  IconClock,
  IconLoader2,
} from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { LabelText } from "@/modules/shared/label-text";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { categories } from "@/data/categories";
import { contentstatus } from "@/data/status";
import { useRouter } from "next/navigation";
import { ContentData, deleteContent, getContent, getScheduledContent, processScheduledContent } from "@/api/content.api";
import withAuth from "@/hoc/with-auth";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";

const ContentPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [headline, setHeadline] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [filteredContent, setFilteredContent] = useState<ContentData[]>([]);
  const [contentData, setContentData] = useState<ContentData[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [contentToDelete, setContentToDelete] = useState<string | null>(null);
  const [scheduledContent, setScheduledContent] = useState<ContentData[]>([]);
  const [isProcessingScheduled, setIsProcessingScheduled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await getContent();
        if (
          typeof response === "object" &&
          response !== null &&
          "status" in response &&
          response.status === "success" &&
          "data" in response &&
          Array.isArray((response as { data: ContentData[] }).data)
        ) {
          setContentData((response as { data: ContentData[] }).data);
          setFilteredContent((response as { data: ContentData[] }).data);
        } else {
          setContentData([]);
          setFilteredContent([]);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchContent();
  }, []);

  useEffect(() => {
    const fetchScheduledContent = async () => {
      try {
        const response = await getScheduledContent();
        setScheduledContent(response.data);
      } catch (error) {
        console.error("Error fetching scheduled content:", error);
      }
    };

    fetchScheduledContent();
  }, []);

  useEffect(() => {
    const filtered = contentData.filter((content) => {
      const matchesHeadline =
        !headline ||
        content.headline1.toLowerCase().includes(headline.toLowerCase());
      const matchesAuthor =
        !author || content.author?.toLowerCase().includes(author.toLowerCase());
      const matchesCategory =
        !selectedCategory || content.category.includes(selectedCategory);
      const matchesStatus =
        !selectedStatus || content.status === selectedStatus;

      return (
        matchesHeadline && matchesAuthor && matchesCategory && matchesStatus
      );
    });

    setFilteredContent(filtered);
  }, [headline, author, selectedCategory, selectedStatus, contentData]);

  const handleDelete = async (id: string) => {
    setContentToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!contentToDelete) return;

    try {
      await deleteContent(contentToDelete);
      setContentData((prev) => prev.filter((content) => content._id !== contentToDelete));
      setFilteredContent((prev) => prev.filter((content) => content._id !== contentToDelete));
    } catch (error) {
      console.error("Error deleting content:", error);
      alert("Failed to delete content.");
    } finally {
      setDeleteDialogOpen(false);
      setContentToDelete(null);
    }
  };

  const handleProcessScheduled = async () => {
    setIsProcessingScheduled(true);
    try {
      const response = await processScheduledContent();
      // Refresh both content lists
      const contentResponse = await getContent();
      setContentData(contentResponse.data);
      setScheduledContent(response.data);
    } catch (error) {
      console.error("Error processing scheduled content:", error);
    } finally {
      setIsProcessingScheduled(false);
    }
  };

  return (
    <AdminLayout pageTitle="CONTENT">
      <div className="bg-white p-4 rounded-lg">
        <Button
          className="bg-primary text-white hover:bg-primary/80 mb-6"
          onClick={() => router.push("/admin/content/create-content")}
        >
          <IconPlus size={20} />
          Create Content
        </Button>

        <PageTitle title="Content" />

        {/* Add Scheduled Content Section */}
        {scheduledContent.length > 0 && (
          <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <IconClock size={20} className="text-yellow-600" />
                <h3 className="text-lg font-semibold text-yellow-800">Scheduled Content</h3>
              </div>
              <Button
                className="bg-yellow-600 text-white hover:bg-yellow-700"
                onClick={handleProcessScheduled}
                disabled={isProcessingScheduled}
              >
                {isProcessingScheduled ? (
                  <>
                    <IconLoader2 size={20} className="animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  "Process Scheduled Content"
                )}
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-yellow-100">
                    <th className="p-4 text-left">Title</th>
                    <th className="p-4 text-left">Author</th>
                    <th className="p-4 text-left">Category</th>
                    <th className="p-4 text-left">Scheduled Date</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduledContent.map((content) => (
                    <tr key={content._id} className="border-b border-yellow-200">
                      <td className="p-4">{content.headline1}</td>
                      <td className="p-4">{content.author}</td>
                      <td className="p-4">{content.category}</td>
                      <td className="p-4">
                        {content.scheduledPublishDate
                          ? format(new Date(content.scheduledPublishDate), "yyyy-MM-dd HH:mm")
                          : "N/A"}
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
                          Scheduled
                        </span>
                      </td>
                      <td className="p-4 text-right flex justify-end gap-2">
                        <IconEye
                          size={22}
                          className="text-accent-teal cursor-pointer"
                          onClick={() => {
                            const params = new URLSearchParams({
                              headline1: content.headline1,
                              headline2: content.headline2,
                              headline3: content.headline3 || '',
                              content: content.content || '',
                              headlineImage: content.headlineImage,
                              author: content.author,
                              category: JSON.stringify([content.category]),
                              keywords: JSON.stringify([]),
                              isFeatured: String(content.isFeatured),
                              isSpecial: String(content.isSpecial)
                            });
                            router.push(`/admin/content/preview?${params.toString()}`);
                          }}
                        />
                        <IconPencilMinus
                          size={22}
                          className="text-primary cursor-pointer"
                          onClick={() =>
                            router.push(`/admin/content/edit-content/${content._id}`)
                          }
                        />
                        <IconTrash
                          size={22}
                          className="text-red-700 cursor-pointer"
                          onClick={() => handleDelete(content._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Existing Content Table */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4 items-end">
            <div>
              <LabelText text="Headline" />
              <Input
                type="text"
                id="headline"
                placeholder="Headline"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
              />
            </div>
            <div>
              <LabelText text="Author" />
              <Input
                type="text"
                id="author"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
              />
            </div>
            <div>
              <LabelText text="Category" />
              <select
                id="category"
                value={selectedCategory || ""}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2 cursor-pointer w-full p-2 rounded-md"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <LabelText text="Status" />
              <select
                id="status"
                value={selectedStatus || ""}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2 cursor-pointer w-full p-2 rounded-md"
              >
                <option value="" disabled>
                  Select a status
                </option>
                {contentstatus.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto mt-10">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
                  <th className="p-4">Headline</th>
                  <th className="p-4">Author</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Created Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(filteredContent) && filteredContent.length > 0 ? (
                  filteredContent.map((content) => (
                    <tr
                      key={content._id}
                      className={`border-t border-gray-200 text-sm text-gray-700 ${
                        content.isSpecial
                          ? "bg-yellow-100" // Highlight for special news
                          : content.isFeatured
                          ? "bg-blue-100" // Highlight for featured news
                          : ""
                      }`}
                    >
                      <td className="p-4 font-semibold">
                        {content.headline1}
                        {content.isSpecial && (
                          <span className="ml-2 text-yellow-600 font-bold">
                            (Special)
                          </span>
                        )}
                        {content.isFeatured && (
                          <span className="ml-2 text-blue-600 font-bold">
                            (Featured)
                          </span>
                        )}
                      </td>
                      <td className="p-4">{content.author}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            content.status === "Published"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {content.status}
                        </span>
                      </td>
                      <td className="p-4">
                        {content.createdTime
                          ? format(
                              new Date(content.createdTime),
                              "yyyy-MM-dd HH:mm"
                            )
                          : "N/A"}
                      </td>
                      <td className="p-4 text-right flex justify-end gap-2">
                        <IconEye
                          size={22}
                          className="text-accent-teal cursor-pointer"
                          onClick={() => {
                            console.log('Content data:', content);
                            const params = new URLSearchParams({
                              headline1: content.headline1,
                              headline2: content.headline2,
                              headline3: content.headline3 || '',
                              content: content.content || '',
                              headlineImage: content.headlineImage,
                              author: content.author,
                              category: JSON.stringify([content.category]),
                              keywords: JSON.stringify([]),
                              isFeatured: String(content.isFeatured),
                              isSpecial: String(content.isSpecial)
                            });
                            router.push(`/admin/content/preview?${params.toString()}`);
                          }}
                        />
                        <IconPencilMinus
                          size={22}
                          className="text-primary cursor-pointer"
                          onClick={() =>
                            router.push(
                              `/admin/content/edit-content/${content._id}`
                            )
                          }
                        />
                        <IconTrash
                          size={22}
                          className="text-red-700 cursor-pointer"
                          onClick={() => handleDelete(content._id)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-4 text-center text-gray-500 font-medium"
                    >
                      No content available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <ConfirmationDialog
          isOpen={deleteDialogOpen}
          onClose={() => {
            setDeleteDialogOpen(false);
            setContentToDelete(null);
          }}
          onConfirm={confirmDelete}
          title="Delete Content"
          message="Are you sure you want to delete this content? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
        />
      </div>
    </AdminLayout>
  );
};

export default withAuth(ContentPage);

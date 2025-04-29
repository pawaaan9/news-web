"use client";

import { useEffect, useState } from "react";
import { PageTitle } from "@/modules/shared/page-title";
import AdminLayout from "../admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconCirclePlus, IconEdit, IconTrash } from "@tabler/icons-react";
import { 
  getKeywords, 
  createKeyword, 
  updateKeyword, 
  deleteKeyword, 
  KeywordData 
} from "../../../api/keywords.api";
import { toast } from "react-hot-toast";

interface Keyword {
  _id: string;  // Changed from 'id' to '_id' to match MongoDB's default
  keyword: string;
}

const KeywordsPage = () => {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKeyword, setNewKeyword] = useState("");
  const [currentKeywordId, setCurrentKeywordId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchKeywords();
  }, []);

  const fetchKeywords = async () => {
    try {
      setIsLoading(true);
      const response = await getKeywords() as { status: string; data: { keywords: Keyword[] } };
      if ((response as { status: string }).status === 'success') {
        setKeywords(response.data.keywords);
      }
    } catch (error) {
      toast.error("Failed to load keywords");
      console.error("Error fetching keywords:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddKeyword = async () => {
    if (!newKeyword.trim()) {
      toast.error("Keyword cannot be empty");
      return;
    }
    
    try {
      setIsSaving(true);
      const keywordData: KeywordData = { keyword: newKeyword.trim() };
      
      if (currentKeywordId) {
        const response = await updateKeyword(currentKeywordId, keywordData);
        if ((response as { status: string }).status === 'success') {
          toast.success("Keyword updated successfully");
          fetchKeywords();
        }
      } else {
        const response = await createKeyword(keywordData);
        if ((response as { status: string }).status === 'success') {
          toast.success("Keyword added successfully");
          fetchKeywords();
        }
      }
      
      setNewKeyword("");
      setCurrentKeywordId(null);
      setIsModalOpen(false);
    } catch (error) {
      toast.error(currentKeywordId ? "Failed to update keyword" : "Failed to add keyword");
      console.error("Error saving keyword:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditKeyword = (keyword: Keyword) => {
    setCurrentKeywordId(keyword._id);
    setNewKeyword(keyword.keyword);
    setIsModalOpen(true);
  };

  const handleDeleteKeyword = async (id: string) => {
    if (!id) {
      toast.error("Invalid keyword ID");
      return;
    }

    if (confirm("Are you sure you want to delete this keyword?")) {
      try {
        const response = await deleteKeyword(id);
        if ((response as { status: string }).status === 'success') {
          toast.success("Keyword deleted successfully");
          fetchKeywords();
        }
      } catch (error) {
        toast.error("Failed to delete keyword");
        console.error("Error deleting keyword:", error);
      }
    }
  };

  const handleCancel = () => {
    setNewKeyword("");
    setCurrentKeywordId(null);
    setIsModalOpen(false);
  };

  return (
    <AdminLayout pageTitle="keywords">
      <div className="flex justify-between items-center">
        <PageTitle title="Manage Keywords" />
        <Button
          className="bg-primary text-white hover:bg-primary/80 flex items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <IconCirclePlus size={20} />
          Add Keyword
        </Button>
      </div>

      {/* Table Section */}
      <div className="mt-8 font-dmSans">
        {isLoading ? (
          <div className="text-center py-8">Loading keywords...</div>
        ) : (
          <div className="overflow-x-auto">
            {keywords.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No keywords found. Add your first keyword!
              </div>
            ) : (
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
                    <th className="p-4">Keyword</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {keywords.map((keyword) => (
                    <tr
                      key={`keyword-${keyword._id}`}
                      className="border-t border-gray-200 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <td className="p-4">{keyword.keyword}</td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEditKeyword(keyword)}
                            className="text-blue-500 hover:text-blue-700 p-1 rounded hover:bg-blue-50"
                            aria-label="Edit keyword"
                          >
                            <IconEdit size={20} />
                          </button>
                          <button
                            onClick={() => handleDeleteKeyword(keyword._id)}
                            className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                            aria-label="Delete keyword"
                          >
                            <IconTrash size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
            <h2 className="text-lg font-semibold text-gray-800">
              {currentKeywordId ? "Edit Keyword" : "Add Keyword"}
            </h2>
            <div className="mt-4">
              <Input
                type="text"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                placeholder="Enter keyword"
                className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 w-full"
                onKeyDown={(e) => e.key === 'Enter' && handleAddKeyword()}
              />
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="bg-white text-primary border border-primary"
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddKeyword}
                className="bg-primary text-white hover:bg-primary/80"
                disabled={isSaving || !newKeyword.trim()}
              >
                {isSaving ? (currentKeywordId ? "Updating..." : "Saving...") : "Save"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default KeywordsPage;
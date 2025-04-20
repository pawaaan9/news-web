"use client";

import { useState } from "react";
import { PageTitle } from "@/modules/shared/page-title";
import AdminLayout from "../admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconCirclePlus, IconEdit, IconTrash } from "@tabler/icons-react";
import { keywordsList } from "@/data/keyword-list";

const KeywordsPage = () => {
  const [keywords, setKeywords] = useState<string[]>(keywordsList); // Initial keywords
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [newKeyword, setNewKeyword] = useState(""); // New keyword input
  const [editIndex, setEditIndex] = useState<number | null>(null); // Index of the keyword being edited

  const handleAddKeyword = () => {
    if (newKeyword.trim()) {
      if (editIndex !== null) {
        // Edit existing keyword
        const updatedKeywords = [...keywords];
        updatedKeywords[editIndex] = newKeyword.trim();
        setKeywords(updatedKeywords);
      } else {
        // Add new keyword
        setKeywords([...keywords, newKeyword.trim()]);
      }
      setNewKeyword("");
      setEditIndex(null);
      setIsModalOpen(false);
    }
  };

  const handleEditKeyword = (index: number) => {
    setEditIndex(index);
    setNewKeyword(keywords[index]);
    setIsModalOpen(true);
  };

  const handleDeleteKeyword = (index: number) => {
    const updatedKeywords = keywords.filter((_, i) => i !== index);
    setKeywords(updatedKeywords);
  };

  const handleCancel = () => {
    setNewKeyword("");
    setEditIndex(null);
    setIsModalOpen(false);
  };

  return (
    <AdminLayout pageTitle="keywords">
      <div className="flex justify-between">
        <PageTitle title="Manage Keywords" />
        <Button
          className="bg-primary text-white hover:bg-primary/80"
          onClick={() => {
            setNewKeyword("");
            setEditIndex(null);
            setIsModalOpen(true);
          }}
        >
          <IconCirclePlus size={20} />
          Add
        </Button>
      </div>

      {/* Table Section */}
      <div className="mt-8 font-dmSans">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
                <th className="p-4">Keyword</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {keywords.map((keyword, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 text-sm text-gray-700"
                >
                  <td className="p-4">{keyword}</td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <button
                      onClick={() => handleEditKeyword(index)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <IconEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteKeyword(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <IconTrash size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Custom Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
            <h2 className="text-lg font-semibold text-gray-800">
              {editIndex !== null ? "Edit Keyword" : "Add Keyword"}
            </h2>
            <div className="mt-4">
              <Input
                type="text"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                placeholder="Enter keyword"
                className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 w-full"
              />
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="bg-white text-primary border border-primary"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddKeyword}
                className="bg-primary text-white hover:bg-primary/80"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default KeywordsPage;

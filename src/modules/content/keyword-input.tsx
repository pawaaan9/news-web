import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconCirclePlus } from "@tabler/icons-react";
import { InputText } from "@/modules/shared/input-text";
import { keywordsList } from "@/data/keyword-list";

interface KeywordsInputProps {
  onKeywordsChange: (keywords: string[]) => void; // Callback to send selected keywords to parent
  initialKeywords?: string[];
}

const KeywordsInput: React.FC<KeywordsInputProps> = ({ onKeywordsChange, initialKeywords = [] }) => {
  const [keywords, setKeywords] = useState<string[]>(initialKeywords);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredKeywords, setFilteredKeywords] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter keywords based on the input
    if (value.trim() === "") {
      setFilteredKeywords([]);
    } else {
      const filtered = keywordsList.filter((keyword) =>
        keyword.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredKeywords(filtered);
    }
  };

  const handleAddKeyword = (keyword: string) => {
    if (!keywords.includes(keyword)) {
      const updatedKeywords = [...keywords, keyword];
      setKeywords(updatedKeywords); // Add the keyword to the selected list
      onKeywordsChange(updatedKeywords); // Send updated keywords to parent
    }
    setSearchTerm(""); // Clear the input
    setFilteredKeywords([]); // Clear suggestions
  };

  const handleRemoveKeyword = (keyword: string) => {
    const updatedKeywords = keywords.filter((k) => k !== keyword);
    setKeywords(updatedKeywords); // Remove the keyword
    onKeywordsChange(updatedKeywords); // Send updated keywords to parent
  };

  return (
    <div>
      <InputText text="Keywords" />
      <div className="mt-2 flex gap-2">
        <Input
          type="text"
          placeholder="Type to search keywords"
          value={searchTerm}
          onChange={handleInputChange}
          className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0"
        />
        <Button
          type="button"
          className="text-white bg-primary"
          onClick={() => handleAddKeyword(searchTerm)}
          disabled={!searchTerm.trim() || keywords.includes(searchTerm)}
        >
          <IconCirclePlus size={20} />
          Add
        </Button>
      </div>

      {/* Suggestions */}
      {filteredKeywords.length > 0 && (
        <div className="mt-2 bg-white border border-gray-300 rounded shadow-md max-h-40 overflow-y-auto">
          {filteredKeywords.map((keyword, index) => (
            <div
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleAddKeyword(keyword)}
            >
              {keyword}
            </div>
          ))}
        </div>
      )}

      {/* Selected Keywords */}
      <div className="mt-4 flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <div
            key={index}
            className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full flex items-center gap-2"
          >
            <span>{keyword}</span>
            <button
              type="button"
              className="text-red-500 hover:text-red-700"
              onClick={() => handleRemoveKeyword(keyword)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeywordsInput;

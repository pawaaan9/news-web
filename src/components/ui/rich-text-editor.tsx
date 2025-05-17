import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import {
  IconBold,
  IconItalic,
  IconLink,
  IconPhoto,
  IconSeparator,
  IconBrandYoutube,
  IconLoader2,
  IconTable,
  IconTypography,
  IconList,
  IconListNumbers,
  IconHeading,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  onImageUpload: (file: File) => Promise<string>;
  isUploading?: boolean;
}

export const RichTextEditor = ({
  content,
  onChange,
  onImageUpload,
  isUploading = false,
}: RichTextEditorProps) => {
  const [linkUrl, setLinkUrl] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [showYoutubeInput, setShowYoutubeInput] = useState(false);
  const [showTableInput, setShowTableInput] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);
  const [embedCode, setEmbedCode] = useState("");
  const [showEmbedInput, setShowEmbedInput] = useState(false);
  const [youtubePreview, setYoutubePreview] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Youtube.configure({
        controls: true,
        HTMLAttributes: {
          class: "w-full aspect-video",
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const addLink = () => {
    if (linkUrl) {
      editor
        ?.chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .run();
      setLinkUrl("");
      setShowLinkInput(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      const imageUrl = await onImageUpload(file);
      if (imageUrl && typeof imageUrl === "string") {
        editor
          ?.chain()
          .focus()
          .setImage({
            src: imageUrl,
            alt: "Uploaded image",
          })
          .run();
      } else {
        console.error("Invalid image URL received:", imageUrl);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const addYoutubeVideo = () => {
    if (youtubeUrl) {
      editor
        ?.chain()
        .focus()
        .setYoutubeVideo({
          src: youtubeUrl,
          width: 640,
          height: 360,
        })
        .run();
      setYoutubeUrl("");
      setShowYoutubeInput(false);
    }
  };

  const insertTable = () => {
    if (tableRows > 0 && tableCols > 0) {
      editor
        ?.chain()
        .focus()
        .insertTable({ rows: tableRows, cols: tableCols, withHeaderRow: true })
        .run();
      setShowTableInput(false);
    }
  };

  const insertEmbed = () => {
    if (embedCode) {
      editor?.chain().focus().insertContent(embedCode).run();
      setEmbedCode("");
      setShowEmbedInput(false);
      setSelectedPlatform("");
    }
  };

  useEffect(() => {
    if (youtubeUrl) {
      const videoId = youtubeUrl.match(
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
      )?.[1];
      if (videoId) {
        setYoutubePreview(`https://www.youtube.com/embed/${videoId}`);
      } else {
        setYoutubePreview("");
      }
    } else {
      setYoutubePreview("");
    }
  }, [youtubeUrl]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-charcoal/60 rounded-lg">
      <div className="flex flex-wrap gap-2 p-2 border-b border-charcoal/60">
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`p-2 rounded hover:bg-gray-100 ${
            editor.isActive("heading", { level: 1 }) ? "bg-gray-100" : ""
          }`}
        >
          <IconHeading size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-100 ${
            editor.isActive("bulletList") ? "bg-gray-100" : ""
          }`}
        >
          <IconList size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-100 ${
            editor.isActive("orderedList") ? "bg-gray-100" : ""
          }`}
        >
          <IconListNumbers size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-100 ${
            editor.isActive("bold") ? "bg-gray-100" : ""
          }`}
        >
          <IconBold size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-100 ${
            editor.isActive("italic") ? "bg-gray-100" : ""
          }`}
        >
          <IconItalic size={20} />
        </button>
        <button
          onClick={() => setShowTableInput(!showTableInput)}
          className={`p-2 rounded hover:bg-gray-100 ${
            editor.isActive("table") ? "bg-gray-100" : ""
          }`}
        >
          <IconTable size={20} />
        </button>
        <button
          onClick={() => setShowLinkInput(!showLinkInput)}
          className={`p-2 rounded hover:bg-gray-100 ${
            editor.isActive("link") ? "bg-gray-100" : ""
          }`}
        >
          <IconLink size={20} />
        </button>
        <button
          onClick={() => document.getElementById("image-upload")?.click()}
          className={`p-2 rounded hover:bg-gray-100 ${
            isUploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isUploading}
        >
          {isUploading ? (
            <IconLoader2 size={20} className="animate-spin" />
          ) : (
            <IconPhoto size={20} />
          )}
        </button>
        <input
          type="file"
          id="image-upload"
          className="hidden"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) {
              await handleImageUpload(file);
              e.target.value = "";
            }
          }}
          disabled={isUploading}
        />
        <button
          onClick={() => setShowYoutubeInput(!showYoutubeInput)}
          className="p-2 rounded hover:bg-gray-100"
        >
          <IconBrandYoutube size={20} />
        </button>
        <button
          onClick={() => setShowEmbedInput(!showEmbedInput)}
          className="p-2 rounded hover:bg-gray-100"
        >
          <IconTypography size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().insertContent("<br><br>").run()}
          className="p-2 rounded hover:bg-gray-100"
        >
          <IconSeparator size={20} />
        </button>
      </div>

      {showLinkInput && (
        <div className="p-2 border-b border-charcoal/60">
          <input
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="Enter URL"
            className="w-full p-2 border border-charcoal/60 rounded"
          />
          <button
            onClick={addLink}
            className="mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
          >
            Add Link
          </button>
        </div>
      )}

      {showTableInput && (
        <div className="p-2 border-b border-charcoal/60">
          <div className="flex gap-4">
            <div>
              <label className="block text-sm text-charcoal/60 mb-1">
                Rows
              </label>
              <input
                type="number"
                min="1"
                value={tableRows}
                onChange={(e) => setTableRows(parseInt(e.target.value) || 1)}
                className="w-20 p-2 border border-charcoal/60 rounded"
              />
            </div>
            <div>
              <label className="block text-sm text-charcoal/60 mb-1">
                Columns
              </label>
              <input
                type="number"
                min="1"
                value={tableCols}
                onChange={(e) => setTableCols(parseInt(e.target.value) || 1)}
                className="w-20 p-2 border border-charcoal/60 rounded"
              />
            </div>
          </div>
          <button
            onClick={insertTable}
            className="mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
          >
            Insert Table
          </button>
        </div>
      )}

      {showYoutubeInput && (
        <div className="p-2 border-b border-charcoal/60">
          <input
            type="text"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="Enter YouTube URL"
            className="w-full p-2 border border-charcoal/60 rounded"
          />
          {youtubePreview && (
            <div className="mt-2">
              <iframe
                src={youtubePreview}
                width="100%"
                height="315"
                frameBorder="0"
                allowFullScreen
                className="rounded-lg"
              />
            </div>
          )}
          <button
            onClick={addYoutubeVideo}
            className="mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
          >
            Add Video
          </button>
        </div>
      )}

      {showEmbedInput && (
        <div className="p-2 border-b border-charcoal/60">
          <div className="mb-2">
            <label className="block text-sm text-charcoal/60 mb-1">
              Select Platform
            </label>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full p-2 border border-charcoal/60 rounded"
            >
              <option value="">Select a platform</option>
              <option value="twitter">X (Twitter)</option>
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="tiktok">TikTok</option>
            </select>
          </div>
          {selectedPlatform && (
            <div className="mb-2">
              <label className="block text-sm text-charcoal/60 mb-1">
                Paste Embed Code
              </label>
              <textarea
                value={embedCode}
                onChange={(e) => setEmbedCode(e.target.value)}
                placeholder={`Paste ${selectedPlatform} embed code`}
                className="w-full p-2 border border-charcoal/60 rounded"
                rows={4}
              />
            </div>
          )}
          <button
            onClick={insertEmbed}
            className="mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
          >
            Insert Embed
          </button>
        </div>
      )}

      <EditorContent
        editor={editor}
        className="p-4 min-h-[300px] max-h-[500px] overflow-y-auto prose max-w-none [&_.ProseMirror]:prose [&_.ProseMirror]:max-w-none [&_.ProseMirror_img]:w-full [&_.ProseMirror_img]:h-auto [&_.ProseMirror_img]:rounded-lg [&_.ProseMirror_iframe]:w-full [&_.ProseMirror_iframe]:aspect-video [&_.ProseMirror_iframe]:rounded-lg [&_.ProseMirror]:outline-none [&_.ProseMirror]:focus:outline-none [&_.ProseMirror]:focus:ring-2 [&_.ProseMirror]:focus:ring-primary/20 [&_.ProseMirror]:rounded-lg [&_.ProseMirror]:transition-all [&_.ProseMirror]:duration-200 [&_.ProseMirror]:relative [&_.ProseMirror]:before:content-[''] [&_.ProseMirror]:before:absolute [&_.ProseMirror]:before:left-0 [&_.ProseMirror]:before:top-0 [&_.ProseMirror]:before:w-1 [&_.ProseMirror]:before:h-full [&_.ProseMirror]:before:bg-primary/20 [&_.ProseMirror]:before:opacity-0 [&_.ProseMirror]:before:transition-opacity [&_.ProseMirror]:before:duration-200 [&_.ProseMirror]:focus:before:opacity-100 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 [&_.ProseMirror_table]:border-collapse [&_.ProseMirror_table]:w-full [&_.ProseMirror_table]:border [&_.ProseMirror_table]:border-charcoal/20 [&_.ProseMirror_th]:border [&_.ProseMirror_th]:border-charcoal/20 [&_.ProseMirror_th]:bg-gray-50 [&_.ProseMirror_th]:p-2 [&_.ProseMirror_td]:border [&_.ProseMirror_td]:border-charcoal/20 [&_.ProseMirror_td]:p-2"
      />
    </div>
  );
};

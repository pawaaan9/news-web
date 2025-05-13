import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'
import { Button } from './button'
import {
  IconBold,
  IconItalic,
  IconLink,
  IconPhoto,
  IconVideo,
  IconSeparator,
  IconBrandYoutube,
} from '@tabler/icons-react'
import { useState } from 'react'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  onImageUpload: (file: File) => Promise<string>
}

export const RichTextEditor = ({ content, onChange, onImageUpload }: RichTextEditorProps) => {
  const [linkUrl, setLinkUrl] = useState('')
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [showYoutubeInput, setShowYoutubeInput] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Youtube.configure({
        controls: true,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  const addLink = () => {
    if (linkUrl) {
      editor
        ?.chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: linkUrl })
        .run()
      setLinkUrl('')
      setShowLinkInput(false)
    }
  }

  const handleImageUpload = async (file: File) => {
    try {
      const imageUrl = await onImageUpload(file)
      editor?.chain().focus().setImage({ src: imageUrl }).run()
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }

  const addYoutubeVideo = () => {
    if (youtubeUrl) {
      editor?.chain().focus().setYoutubeVideo({ src: youtubeUrl }).run()
      setYoutubeUrl('')
      setShowYoutubeInput(false)
    }
  }

  if (!editor) {
    return null
  }

  return (
    <div className="border border-charcoal/60 rounded-lg">
      <div className="flex flex-wrap gap-2 p-2 border-b border-charcoal/60">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-100 ${
            editor.isActive('bold') ? 'bg-gray-100' : ''
          }`}
        >
          <IconBold size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-100 ${
            editor.isActive('italic') ? 'bg-gray-100' : ''
          }`}
        >
          <IconItalic size={20} />
        </button>
        <button
          onClick={() => setShowLinkInput(!showLinkInput)}
          className={`p-2 rounded hover:bg-gray-100 ${
            editor.isActive('link') ? 'bg-gray-100' : ''
          }`}
        >
          <IconLink size={20} />
        </button>
        <button
          onClick={() => document.getElementById('image-upload')?.click()}
          className="p-2 rounded hover:bg-gray-100"
        >
          <IconPhoto size={20} />
        </button>
        <input
          type="file"
          id="image-upload"
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              handleImageUpload(file)
            }
          }}
        />
        <button
          onClick={() => setShowYoutubeInput(!showYoutubeInput)}
          className="p-2 rounded hover:bg-gray-100"
        >
          <IconBrandYoutube size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().insertContent('<br><br>').run()}
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

      {showYoutubeInput && (
        <div className="p-2 border-b border-charcoal/60">
          <input
            type="text"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="Enter YouTube URL"
            className="w-full p-2 border border-charcoal/60 rounded"
          />
          <button
            onClick={addYoutubeVideo}
            className="mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
          >
            Add Video
          </button>
        </div>
      )}

      <EditorContent editor={editor} className="p-4 min-h-[300px]" />
    </div>
  )
} 
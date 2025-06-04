import Image, { StaticImageData } from "next/image";

interface WideSkyscaperAdProps {
  imageUrl: string | StaticImageData;
  linkUrl: string;
  alt?: string;
}

export default function WideSkyscaperAd({
  imageUrl,
  linkUrl,
  alt = "Advertisement",
}: WideSkyscaperAdProps) {
  return (
    <a
      href={linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="lg:block w-[160px] h-[600px] rounded-lg overflow-hidden shadow-md bg-white mx-auto mb-6 hidden"
    >
      <div className="relative w-[160px] h-[600px]">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-contain"
          sizes="160px"
          priority
        />
      </div>
    </a>
  );
}

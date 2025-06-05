import Image, { StaticImageData } from "next/image";

interface HalfPageAdProps {
  imageUrl: string | StaticImageData;
  linkUrl: string;
  alt?: string;
}

export default function HalfPageAd({
  imageUrl,
  linkUrl,
  alt = "Advertisement",
}: HalfPageAdProps) {
  return (
    <a
      href={linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="lg:block w-[160px] h-[600px] rounded-lg overflow-hidden bg-gray-100 mx-auto mb-6 hidden"
    >
      <div className="relative w-[160px] h-[600px]">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-contain"
          sizes="300px"
          priority
        />
      </div>
    </a>
  );
}

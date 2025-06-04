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
      className="lg:block w-[300px] h-[600px] rounded-lg overflow-hidden shadow-md bg-white mx-auto mb-6 hidden"
    >
      <div className="relative w-[300px] h-[600px]">
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

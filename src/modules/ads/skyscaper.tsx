import Image, { StaticImageData } from "next/image";

interface BillboardAdProps {
  imageUrl: string | StaticImageData;
  linkUrl: string;
  alt?: string;
}

export default function BillboardAd({
  imageUrl,
  linkUrl,
  alt = "Advertisement",
}: BillboardAdProps) {
  return (
    <a
      href={linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="lg:block w-full h-[300px] rounded-lg overflow-hidden shadow-md bg-white mx-auto mb-6 hidden"
    >
      <div className="relative w-full h-[300px]">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-contain w-full "
          priority
        />
      </div>
    </a>
  );
}

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
      className="lg:block w-[970px] h-[250px] rounded-lg overflow-hidden shadow-md bg-white mx-auto mb-6 hidden"
    >
      <div className="relative w-[970px] h-[250px]">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-contain"
          sizes="970px"
          priority
        />
      </div>
    </a>
  );
}

// import Image, { StaticImageData } from 'next/image';

// interface SpecialNewsCardProps {
//   image: StaticImageData;
//   category: string;
//   title: string;
//   description: string;
//   author: string;
//   date: string;
// }

// export default function SpecialNewsCard({
//   image,
//   category,
//   title,
//   description,
//   author,
//   date,
// }: SpecialNewsCardProps) {
//   return (
//     <div className="bg-white text-charcoal rounded-xl overflow-hidden shadow-lg border border-gray-300 font-notoSans md:flex">
//       <div className="relative w-full h-56 md:h-auto md:w-1/2">
//         <Image
//           src={image}
//           alt={title}
//           layout="fill"
//           objectFit="cover"
//           className="object-cover"
//         />
//         <div className="absolute top-3 left-3 bg-red-600 text-white text-xs uppercase px-3 py-1 rounded-full shadow-sm">
//           {category}
//         </div>
//       </div>

//       <div className="p-6 md:w-1/2 flex flex-col justify-between">
//         <div>
//           <h2 className="text-xl font-bold leading-tight mb-3">{title}</h2>
//           <p className="text-sm text-gray-700 mb-4 line-clamp-5">{description}</p>
//         </div>
//         <div className="text-xs text-gray-500 mt-2">
//           <span className="font-semibold">{author}</span> විසින් • {date}
//         </div>
//       </div>
//     </div>
//   );
// }

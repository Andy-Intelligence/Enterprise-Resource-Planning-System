// "use client";
// import React from "react";
// import Image from "next/image";
// import { FaCircle } from "react-icons/fa";
// import { LuDot } from "react-icons/lu";
// import { FaStar } from "react-icons/fa";

// const SiteCard = () => {
//   return (
//     <div className="border rounded-lg p-4 flex flex-col justify-between relative">
//       <div className="text-xl font-semibold mb-4">Project Title</div>
//       <div className="mb-4 relative w-full h-48">
//         <img
//           src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/New_building_construction_site._%2811741874173%29.jpg/1280px-New_building_construction_site._%2811741874173%29.jpg"
//           alt="Site Image"
//           // layout="fill"
//           // objectFit="cover"
//           className="rounded-lg object-cover fill-inherit"
//         />
//       </div>
//       <div className="flex flex-col items-start w-full mb-4 mt-4">
//         <div className="flex items-center justify-center">
//           <span>Address </span>
//           <LuDot />
//           <span className="flex items-center justify-center text-black text-sm">
//             No.6 ekanem street
//           </span>
//         </div>
//         <div className="flex items-center justify-center">
//           <span>Deadline </span>
//           <LuDot />
//           <span className="flex items-center justify-center text-black text-sm">
//             12/17/2030
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SiteCard;

"use client";

import React from "react";
import Image from "next/image";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";

const SiteCard = ({ title, imageUrl, address, deadline }:any) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={`${title} Site Image`}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">{title}</h2>
        <div className="space-y-2">
          <InfoItem icon={<FaMapMarkerAlt />} label="Address" value={address} />
          <InfoItem icon={<FaClock />} label="Deadline" value={deadline} />
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }:any) => (
  <div className="flex items-center text-sm">
    <span className="text-gray-500 mr-2">{icon}</span>
    <span className="font-medium text-gray-700 mr-1">{label}:</span>
    <span className="text-gray-600">{value}</span>
  </div>
);

export default SiteCard;

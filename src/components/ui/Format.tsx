import Link from "next/link";
import React from "react";

interface Props {
  formats: string[];
  city: string;
}

const Format = ({ formats, city }: Props) => {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {formats.map((format, index) => {
        const displayText = format === "inperson" ? `In person in ${city}` : format;
        return (
          <Link
            href={`/dashboard/findTeacher?format=${encodeURIComponent(format)}`}
            key={index}
            className="bg-gray-200 text-[#1C1C1C] px-3 py-1 rounded-full text-sm hover:bg-indigo-200 transition"
          >
            {displayText}
          </Link>
        );
      })}
    </div>
  );
};

export default Format;

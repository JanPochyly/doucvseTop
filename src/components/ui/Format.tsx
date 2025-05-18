import Link from "next/link";
import React from "react";

interface Props {
  formats: string[];
  city: string;
  className?: string;
}

const Format = ({ formats, city, className }: Props) => {
  console.log("FOamrt" + formats)
  return (
    <div className="flex flex-row gap-3 flex-wrap items-center">
      {formats.map((format, index) => {
        const displayText = format === "inPerson" ? ` ${city}` : format;
        return (
          <Link
            href={`/dashboard/findTeacher?format=${encodeURIComponent(format)}`}
            key={index}
            className={`${className || "bg-gray-200 text-[#1C1C1C] px-3 py-1 rounded-full text-sm hover:bg-indigo-200 transition"}`}
          >
            {displayText}
          </Link>
        );
      })}
    </div>
  );
};

export default Format;

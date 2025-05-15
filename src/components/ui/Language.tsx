import Link from "next/link";
import React from "react";

interface Props {
  languages: string[];
  className?: string;
}

const Language = ({ languages, className = "" }: Props) => {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {languages.map((language, index) => (
        <Link
          href={`/dashboard/findTeacher/?language=${encodeURIComponent(language)}`}
          key={index}
          className={`bg-red-100 text-[#1C1C1C] px-3 py-1 rounded-full text-sm hover:bg-red-200 transition ${className}`}
        >
          <span className="language-tag">{language}</span>
        </Link>
      ))}
    </div>
  );
};

export default Language;
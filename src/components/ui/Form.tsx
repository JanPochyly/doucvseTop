import Link from "next/link";
import React from "react";

interface Props {
  forms: string[];
  city: string;
}

const FormType = ({ form, city }: Props) => {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {(forms || []).map((form, index) => {
        const displayText = form === "online" ? "online" : city;
        return (
          <Link
            href={`/dashboard/findTeacher?format=${encodeURIComponent(form)}`}
            key={index}
            className="bg-indigo-100 text-[#1C1C1C] px-3 py-1 rounded-full text-sm hover:bg-indigo-200 transition"
          >
            {displayText}
          </Link>
        );
      })}
    </div>
  );
};

export default FormType;

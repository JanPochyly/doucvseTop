import Link from "next/link";
import React from "react";

interface Props {
  subjects: string[];
  className?: string;
}

const Subjects = ({ subjects, className = "" }: Props) => {
  return (
    <div className="flex gap-x-2 flex-wrap">
      {subjects.map((subject, index) => (
        <Link
          href={`/dashboard/findTeacher/?faculty=&subject=${subject}&search=`}
          key={index}
          className={`bg-indigo-100 text-indigo-500 px-3 py-1 rounded-full text-sm hover:bg-indigo-200 transition ${className}`}
        >
          {subject}
        </Link>
      ))}
    </div>
  );
};

export default Subjects;

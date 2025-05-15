import React from "react";
import FirstMessageButton from "./FirstMessageButton";
import Image from "next/image";
import Link from "next/link";
import Button from "./ui/Button";
import Subjects from "./ui/Subjects";
import Language from "./ui/Language";

interface Props {
  key: string;
  senderId: string;
  teacherId: string;
  teacher: teacherR;
}

const TeacherCard = ({ senderId, teacherId, teacher }: Props) => {
  return (
    <div className="w-full max-w-4xl md:max-w-[850px] lg:max-w-4xl rounded-lg shadow-md p-8 sm:p-4 sm:px-4 sm:py-4 xs:px-2 xs:py-3 bg-white text-gray-900 border border-gray-200 grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-8 overflow-hidden box-border z-0">
      {/* Left section: Profile info */}
      <div className="flex flex-col space-y-4">
        <div className="flex gap-6 items-start">
          <div className="flex flex-col items-center space-y-3">
            <Link href={`/dashboard/teacherProfile/${teacherId}`}>
              <div className="relative h-[150px] w-[150px] xl:h-[160px] xl:w-[160px] lg:h-[150px] lg:w-[150px] md:h-[140px] md:w-[140px] sm:h-[126px] sm:w-[126px] xs:h-[110px] xs:w-[110px] rounded-full overflow-hidden border-[2px] border-transparent bg-[conic-gradient(from_180deg_at_50%_50%,#0072FA,#1D0A42,#FF0049,#0072FA)] p-[1.5px]">
                <div className="bg-white rounded-full overflow-hidden h-full w-full">
                  <Image
                    fill
                    src={teacher.image}
                    alt="Your profile image"
                    className="rounded-full object-cover"
                  />
                </div>
              </div>
            </Link>
            <div className="w-full">
              <div className="text-[#071849] text-lg font-bold mb-1">Jazyk:</div>
              <Language languages={teacher.languages} />
            </div>
            <div className="text-[#071849] text-lg font-bold">Forma: prezenčně / online</div>
          </div>
          <div className="flex flex-col justify-start space-y-1">
            <Link href={`/dashboard/teacherProfile/${teacherId}`}>
              <div className="text-2xl font-extrabold text-[#071849] hover:underline cursor-pointer">{teacher.name}</div>
            </Link>
            <div className="text-gray-600 text-base break-all max-w-[90vw] sm:max-w-none">{teacher.email}</div>
            <div className="text-[#1C1C1C] text-base font-bold">Fakulta: {teacher.faculty}</div>
            <div className="text-[#1C1C1C] text-base font-bold">Semestr: {teacher.year}</div>
            <div className="text-[#1C1C1C] text-base font-bold">Obor: {teacher.major}</div>
          </div>
        </div>
      </div>

      <div className="hidden md:block w-px bg-gradient-to-b from-[#0072FA] via-[#1D0A42] to-[#FF0049]" />

      {/* Right section: Subjects and actions */}
      <div className="flex flex-col justify-between space-y-6">
        <div>
          <h3 className="text-2xl font-bold mb-4 text-[#071849]">Co doučuji</h3>
          <Subjects subjects={Array.isArray(teacher.subjects) ? teacher.subjects : teacher.subjects?.split(",") || []} />
        </div>
        <div className="mt-4">
          <hr className="h-px rounded border-0 bg-gradient-to-r from-[#0072FA] via-[#1D0A42] to-[#FF0049] w-full max-w-[100%] overflow-hidden" />
        </div>
        <div className="text-xl font-bold mt-4">
          <span className="text-black">{teacher.price}</span>{" "}
          <span className="text-blue-600 font-semibold">Kč za lekci</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button className="bg-[#FF0049] hover:bg-[#FF0049] hover:text-black text-white font-semibold rounded-xl px-4 py-2 text-center">
            naplánovat lekci
          </Button>
          {senderId === "" ? (
            <Button
            >
              <a href="/login" className="w-full h-full block text-center py-2">
                napsat učiteli
              </a>
            </Button>
          ) : (
            <FirstMessageButton
              senderId={senderId}
              teacherId={teacherId}
              teacherEmail={teacher.email}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;

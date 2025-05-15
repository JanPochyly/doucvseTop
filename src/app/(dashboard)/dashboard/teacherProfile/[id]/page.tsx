import Calendar from "@/components/Calendar";
import FirstMessageButton from "@/components/FirstMessageButton";
import Subjects from "@/components/ui/Subjects";
import Language from "@/components/ui/Language";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import LandingBackground from "@/components/landing/LandingBackground";

const TeacherProfilePage = async ({ params }: any) => {
  const teacherId = params.id;

  const session = await getServerSession(authOptions);

  const teacherRaw = await fetchRedis("get", `user:${teacherId}`);
  const teacher = JSON.parse(teacherRaw);
  const teacherInformationRaw = await fetchRedis(
    "get",
    `user:${teacherId}:information`
  );
  
  const teacherInformation = JSON.parse(teacherInformationRaw);
  const teacherProfile = {
    ...teacher,
    ...teacherInformation,
  };
  const teacherPrice = teacherInformation.price
  if (session) {
    return (
      <div className="relative min-h-screen bg-[#F3F8FF]">
        <div className="absolute inset-0 z-10 opacity-100">
          <LandingBackground />
        </div>
        {/* <div className="absolute inset-0 -z-10 bg-[#F3F8FF]" /> */}
        <div className="relative z-10 px-6 pt-20 pb-12">
          {/* Main Content */}
          <div className="flex flex-col md:flex-row md:gap-6">
            <div className="flex-col items-center md:items-start md:w-3/4">
              {/* Image and Name */}
              <div className="flex items-center gap-10">
                <div className="p-[3px] rounded-full">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={teacher.image}
                      alt="Your profile image"
                      width={220}
                      height={220}
                      className="object-cover w-full h-full rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="w-full pl-8">
                  <h2 className="text-5xl font-extrabold text-[#071849] mb-4">
                    {teacher.name}
                  </h2>
                  <div className="text-gray-700 space-y-2 text-lg mt-4">
                    <div className="space-y-4 mt-6 text-lg">
                      <div>
                        <strong className="block text-2xl">Škola:</strong>
                        <span className="text-lg">Vysoká škola ekonomická</span>
                      </div>
                      <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex flex-col">
                        <strong className="block text-2xl">Fakulta:</strong>
                          <span className="text-lg">{teacher.faculty}</span>
                        </div>
                        <div className="flex flex-col">
                          <strong className="block text-2xl">Obor:</strong>
                          <span className="text-lg">{teacher.major}</span>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row gap-8 mt-4">
                        <div className="flex flex-col">
                          <strong className="block text-2xl">Semestr:</strong>
                          <span className="text-lg">{teacher.year}</span>
                        </div>
                        <div className="flex flex-col">
                          <strong className="block text-2xl">Cena od:</strong>
                          <span className="font-extrabold bg-gradient-to-r from-[#0072FA] via-[#1D0A42] to-[#FF0049] text-transparent bg-clip-text">
                            {teacherProfile.price} Kč
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                <div className="flex flex-col">

                  {/* Subjects */}
                  <h3 className="text-[#071849] font-bold text-2xl mt-6 mb-2">Předměty které doučuji</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Subjects
                      subjects={teacherProfile.subjects}
                      className="text-xl px-8 py-4 rounded-full text-indigo-500 font-semibold hover:text-black"
                    />
                  </div>

                  {/* Languages & Teaching Form */}
                  <div className="flex flex-col md:flex-row md:items-start md:gap-12 mt-6">
                    <div>
                      <h3 className="text-[#071849] font-bold text-2xl mb-2">Jazyky</h3>
                      <div className="mt-2 flex flex-wrap gap-3">
                        <Language
                          languages={teacherProfile.languages}
                          className="text-xl px-8 py-4 rounded-full text-black font-semibold hover:text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[#071849] font-bold text-2xl mb-2">Forma doučování</h3>
                      <div className="mt-2 flex flex-wrap gap-3">
                        <span className="text-xl px-8 py-4 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
                          {teacherProfile.teachingForm || "Online"}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

              <div className="mt-4 flex gap-x-2">
                <FirstMessageButton
                  senderId={session.user.id}
                  teacherEmail={teacher.email}
                  teacherId={teacherId}
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="w-full md:w-[60%] flex flex-col justify-center items-center mt-6 md:mt-0 md:ml-0 md:mr-0 lg:ml-auto lg:mr-auto">
              <Calendar isAuth={true} teacherId={teacherId} sessionId={session.user.id} teacherPrice={teacherPrice} teacherSubjects={teacherProfile.subjects}/>
            </div>
          </div>
          {/* Gradient Divider and Bio Section */}
          <div className="w-full h-[2px] bg-gradient-to-r from-[#0072FA] via-[#1D0A42] to-[#FF0049] my-8" />
          <h3 className="text-[#071849] font-bold text-2xl mb-2">Bio:</h3>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default TeacherProfilePage;

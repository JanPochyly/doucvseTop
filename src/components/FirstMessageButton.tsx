"use client";

import React, { ButtonHTMLAttributes } from "react";
import Button from "./ui/Button";
import { chatHrefConstructor } from "@/lib/utils";
import toast from "react-hot-toast";
import { z } from "zod";
import { addFriendValidator } from "@/lib/validations/add-friend";
import { useRouter } from "next/navigation";

//className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indgo-500 transition-all"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  senderId: string;
  teacherId: string;
  teacherEmail: string;
}

const FirstMessageButton = ({ senderId, teacherId, teacherEmail }: Props) => {
  const router = useRouter();

  const sendFirstMessage = async (email: string) => {
    try {
      const validatedEmail = addFriendValidator.parse({ email });

      await fetch("/api/friends/addTeacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: validatedEmail }),
      });
      router.push(
        `/dashboard/chat/${chatHrefConstructor(senderId, teacherId)}`
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error("email zod error");
        return;
      }

      toast.error("an error occured please try again later");
    }
  };

  return (
    <div>
        <Button
          onClick={() => sendFirstMessage(teacherEmail)}
          className="w-full sm:w-auto bg-[#0072FA] hover:bg-[#0072FA] hover:text-black rounded-xl transition-colors text-white font-semibold py-2 px-4"
        >
          odeslat zprávu
        </Button>
    </div>
  );
};

export default FirstMessageButton;

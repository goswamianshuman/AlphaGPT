"use client";

import { FormEvent, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-hot-toast";
import ModelSelection from "./ModelSelection";
import useSWR from "swr";

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();

  const { data: model } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // alert(prompt);

    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    //toast notification on loading
    const notifcation = toast.loading("Getting best Solutions for you..");

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      //notification to say successful
      toast.success("Found a Solution !", {
        id: notifcation,
      });
    });
  };

  return (
    <div className="my-10">
      <form
        onSubmit={submit}
        className="bg-[#00C897]/30 text-white rounded-lg px-4 space-x-5 flex items-cente max-w-5xl mx-auto"
      >
        <input
          className="bg-transparent flex-1 text-sm focus:outline-none px-4 py-4 disabled:cursor-not-allowed"
          type="text"
          disabled={!session}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Have some chat with alpha..."
        />

        <button
          disabled={!prompt || !session}
          type="submit"
          className="disabled:cursor-not-allowed "
        >
          <PaperAirplaneIcon className="h-6 w-6 -rotate-45 opacity-50 transition-all ease-in delay-100 hover:opacity-100" />
        </button>
      </form>

      <div className="md:hidden">
        <ModelSelection />
      </div>
    </div>
  );
}

export default ChatInput;

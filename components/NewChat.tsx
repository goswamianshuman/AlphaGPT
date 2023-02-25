"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; //use navigation instead of router in next.js 13
import { db } from "../firebase";

function NewChat() {
  const router = useRouter();
  const { data: session } = useSession();

  const createNewchat = async () => {
    const document = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),
      {
        messages: [],
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
      }
    );

    router.push(`/chat/${document.id}`);
  };

  return (
    <div
      onClick={createNewchat}
      className="border-solid border-[2px] border-[#FFE6FF] chatRow flex items-center sm:justify-start justify-center"
    >
      <PlusIcon className="h-4 w-4" />
      <p>Fresh Chat..</p>
    </div>
  );
}

export default NewChat;

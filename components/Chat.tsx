"use client";

import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";
import { query, collection, orderBy } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Messages from "./Messages";

type Props = {
  chatId: string;
};

function Chat({ chatId }: Props) {
  const { data: session } = useSession();

  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session?.user?.email!,
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );

  console.log(messages?.docs);

  return (
    <div className="flex-1 text-white overflow-y-auto overflow-x-hidden">
      {messages?.empty && (
        <>
          <div className="flex items-center justify-center flex-col h-full w-full">
            <p className="mt-10 text-center text-white">
              Type some chat to get started!
            </p>
            <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white/90 animate-bounce" />
          </div>
        </>
      )}

      {messages?.docs.map((msg) => (
        <Messages key={msg.id} message={msg.data()} />
      ))}
    </div>
  );
}

export default Chat;

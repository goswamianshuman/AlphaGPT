"use client";

import { signOut, useSession } from "next-auth/react";
import NewChat from "./NewChat";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";

function Sidebar() {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  // console.log(chats);

  return (
    <div className="p-2 flex flex-col h-full">
      <div className="flex-1">
        <div>
          {/* new chat */}
          <NewChat />
          <div className="hidden sm:inline">
            {/* model selection */}
            <ModelSelection />
          </div>

          {/* map through chat rows */}
          <div>
            {loading && (
              <div className="animate-pulse text-center text-[#a408e2] font-bold text-base">
                <p>Loading...</p>
              </div>
            )}

            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
      </div>

      {session && (
        <div className="py-5 flex flex-col mx-auto max-w-7xl">
          <div className="flex items-center justify-center gap-4 ">
            <img
              className="h-12 w-12 rounded-full object-center border-solid border-[2px] border-[#170113]"
              src={session.user?.image!}
              alt="profile picture"
            />
            <p className="text-[#170113] font-bold ">{session.user?.name!}</p>
          </div>
          <button
            onClick={() => signOut()}
            className="mt-5 px-4 py-1 text-center text-sm hover:bg-[#170113]/60 hover:text-white hover:transition-all ease-linear delay-300 border-solid border-[1px] border-[#170113]"
          >
            logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Sidebar;

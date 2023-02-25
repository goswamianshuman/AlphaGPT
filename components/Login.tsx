"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

function Login() {
  return (
    <div className="bg-[#170113] h-screen flex flex-col items-center justify-center text-center">
      <Image src="/crown.png" width={300} height={300} alt="alphagpt" />
      <button
        onClick={() => signIn("google")}
        className="mt-5 text-black font-semibold bg-[#FFE6FF] px-5 py-3 rounded-md text-[0.7rem] hover:scale-110 hover:bg-[#c5efe2] hover:text-[#170113] transition-all ease-in-out delay-200 animate-pulse hover:animate-none"
      >
        SIGN IN TO USE ALPHA GPT
      </button>
    </div>
  );
}

export default Login;

import { DocumentData } from "firebase/firestore";

type Props = {
  message: DocumentData;
};
function Messages({ message }: Props) {
  const isGPT = message.user.name === "AlphaGPT";
  return (
    <div className={`py-5 ${isGPT && "bg-[#ffffff11] text-[#00C897]"}`}>
      <div className="flex space-x-5 px-10 max-w-3xl mx-auto">
        <img
          src={message.user.avatar}
          alt="message image"
          className=" h-8 w-8 rounded-full"
        />
        <p className="pt-1 text-md font-normal">{message.text}</p>
      </div>
    </div>
  );
}

export default Messages;

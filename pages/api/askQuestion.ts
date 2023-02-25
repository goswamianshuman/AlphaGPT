import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import query from "../../lib/query";
import { admin_database } from "../../AdminFirebase";
import NextCors from "nextjs-cors";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const { prompt, chatId, model, session } = req.body;

  if (!prompt) {
    res.status(400).json({ answer: "please provide some inupt!" });
    return;
  }

  if (!chatId) {
    res.status(400).json({ answer: "Enter Some Valid Chat ID!" });
    return;
  }

  //alpha gpt query
  const response = await query(prompt, chatId, model);

  const message: Message = {
    text: response || "unable to find you a solution !",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "AlphaGPT",
      name: "AlphaGPT",
      avatar: "/crown.png",
    },
  };

  await admin_database
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  res.status(200).json({ answer: message.text });
}

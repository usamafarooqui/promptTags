import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();
    const newPropmpt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    await newPropmpt.save();
    return new Response(JSON.stringify(newPropmpt), {status:201})
  } catch (error) {
    return new Response("fail to create a new Response", {
      status: 500,
    });
  }
};

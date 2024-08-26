import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        console.log("Attempting to connect to the database...");
        await connectToDB();
        console.log("Connected to DB");

        const userExists = await User.findOne({
          email: profile.email,
        });

        if (!userExists) {
          console.log("Creating new user...");
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        } else {
          console.log("User already exists");
        }

        return true;
      } catch (error) {
        console.log("SignIn Error:", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };

import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "@/lib/db";
import NextAuth from "next-auth";
import { User } from "@/models/user";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        await connectToDatabase();

        const user = await User.findOne({
          email: credentials?.email,
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials?.password || "",
          user.password,
        );

        if (!isPasswordValid) {
          return null;
        }
         
        return {
          id: user._id.toString(),
          email: user.email,
        };
      },
    }),
  ],
});

export { handler as GET, handler as POST };

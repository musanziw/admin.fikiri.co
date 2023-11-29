import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: "519239592755-rukdvrkt0csdprvpk8lohh2vknvi9pkl.apps.googleusercontent.com",
      clientSecret: "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",
      redirectUri: process.env.NEXTAUTH_URL + '/api/auth/callback/google',
    }),
  ],

  // callbacks: {
  //   async signIn({ user, account }) {
  //     if (account.provider === "google") {
  //       const { name, email } = user;
  //       try {
  //         await connectMongoDB();
  //         const userExists = await User.findOne({ email });

  //         if (!userExists) {
  //           const res = await fetch("http://localhost:3000/api/user", {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({
  //               name,
  //               email,
  //             }),
  //           });

  //           if (res.ok) {
  //             return user;
  //           }
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }

  //     return user;

  //   },
  // },
  
};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
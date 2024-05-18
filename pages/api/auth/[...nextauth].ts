import NextAuth from "next-auth"
import type { Account, NextAuthOptions, Profile, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import PlayerActivate from '../../../components/Player/PlayerActivate'

export const authOptions: NextAuthOptions = {

  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'kamioza_network',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email" }
      },
      async authorize(credentials, req) {
       
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
       if(credentials){
        try {
          console.log('trying to authorize here...')
          const response = await fetch('http://localhost:3000/api/player?'+ new URLSearchParams({
            email: credentials.email
            }));
            //MUST await the json 
            const user = await response.json();
          
            if (response.ok && user){
             user.name = user.playername;
             user.image = null;
             user.isAuthenticated = true;
            cant poupulate session so - so cant add to redux !!! Right here


            return user

             
            }else{
              return null
            } 
           
      } catch (error) {
          console.log('error happened Logging in player!....',error)
          return null
      }
       }
     
       
      }
    })
    // ...add more providers here
  ],
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  
    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request' // (used for check email message)
   // newUser: null // If set, new users will be directed here on first sign in
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: false,
  jwt: {
      secret: process.env.NEXTAUTH_SECRET
  },
  callbacks: {
    async signIn(user: any) {//, account: Account| null, profile: Profile | undefined
      console.log('user validated - > ',user);
     // PlayerActivate(user);
      return true
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    
    // async session(session: any, user: { name: any; playername: any; image: null }) {
      
    //   user.name = user.playername
    //   user.image = null;
    //   return session
    // }
    // async jwt(token, user, account, profile, isNewUser) {
    //   return token
    // }
  }
  
  
}

export default NextAuth(authOptions)
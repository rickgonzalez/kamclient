import NextAuth from "next-auth"
import type { Account, NextAuthOptions, Profile, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export interface returneduser
{
  credits: number | null,
  stripeid: string | null,
  ts_added: number | null,
  ip: string | null,
  playername: string | null,
  id: string,
  emailValidated: boolean,
  email: string | null,
  name: string | null,
  image: string | null,
  isAuthenticated: boolean
}
export interface Session

{
  playername: string | null,
  id: string,
  stripeid: string | null,
  emailValidated: boolean,
  email: string | null,
  name: string | null,
  image: string | null,
  isAuthenticated: boolean,
  credits: number | null

}

export const authOptions: NextAuthOptions = {

  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'kamioza_network',
      id: 'kamioza_login',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "email", type: "email" }
      },
      async authorize(credentials, req) {
      
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
       
        if(credentials){
        console.log('Passed Credentials: ',credentials)
        try {
          console.log('trying to authorize here...')
          const response = await fetch(process.env.NEXTAUTH_URL +  '/api/player?'+ new URLSearchParams({email: credentials.email}));
            //MUST await the json 
            const user = await response.json();
          
            if (response.ok && user){
             user.name = user.playername;
             user.image = null;
             user.isAuthenticated = true;
             
            //cant poupulate session so - so cant add to redux !!! Right here


            return user

             
            }else{
              console.error('failure to call fetch for player info to authenticate', response)
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
   // verifyRequest: '/auth/verify-request' // (used for check email message)
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
    async jwt({ user,token,trigger,session}) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        let returneduser: any = user;
        console.log('jwt sees this user: ', returneduser.playername)
        token.id = returneduser.id;
        token.stripeid = returneduser.stripeid;
        token.credits = returneduser.credits;
      }
      if (trigger === "update" && session?.credits) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.credits = session.credits
      }
      return token
    },
    async session({session, token }:any) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.id= token.id
      session.stripeid = token.stripeid;
      session.isAuthenticated = true;
      session.credits = token.credits;
     // console.log('session is:', session)
      return session
    }
  }
  
  
}

export default NextAuth(authOptions)
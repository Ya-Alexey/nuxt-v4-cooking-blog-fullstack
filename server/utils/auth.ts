import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins"; 
import { db } from "~~/server/db"; 
import { user, session, account, verification } from '~~/server/schemas/auth'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  emailAndPassword: {
    enabled: true
  },
  plugins: [
    admin(),
  ]
});

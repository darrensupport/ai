import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
        ...schema,
        user: schema.user,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

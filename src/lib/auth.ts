import { betterAuth } from "better-auth";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins"

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("Book-Nook");

export const auth = betterAuth({

  // Origin of this app itself. Used for OAuth redirect URIs, JWT iss/aud and
  // trusted-origin checks. Set to the frontend URL in every environment
  // (https://online-library-qtj5.vercel.app on Vercel, http://localhost:3000
  // locally). Better Auth also reads the BETTER_AUTH_URL env variable.
  baseURL: process.env.BETTER_AUTH_URL,

  // Origins allowed to talk to this auth instance (CSRF/origin checks).
  // Must contain every host the app is served from.
  trustedOrigins: [
    "http://localhost:3000",
    "https://online-library-qtj5.vercel.app",
  ],
  emailAndPassword: {
    enabled: true,
    // The assignment requires a minimum password length of 6 characters.
    minPasswordLength: 6,
  },
  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_ID as string,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET as string,
    },
  },
  plugins: [jwt()],
  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 7 * 24 * 60 * 60,
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),

  // Server side password rules, so the requirements are not only enforced
  // by the registration form.
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email") return;

      const password = (ctx.body as { password?: unknown } | undefined)
        ?.password;

      if (typeof password !== "string" || password.length < 6) {
        throw new APIError("BAD_REQUEST", {
          message: "Password must be at least 6 characters long",
        });
      }

      if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
        throw new APIError("BAD_REQUEST", {
          message:
            "Password must contain at least one uppercase and one lowercase letter",
        });
      }
    }),
  },
});

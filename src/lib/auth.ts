import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("Book-Nook");

export const auth = betterAuth({

emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: { 
    google: { 
      clientId: process.env.BETTER_AUTH_GOOGLE_ID as string, 
      clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET as string, 
    }, 
  }, 

  database: mongodbAdapter(db, {
    client,
  }),
});




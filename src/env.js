import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

/** @param {string | undefined} value */
const isRequiredInProduction = (value) => {
  // Required in production, optional in development/test
  if (process.env.NODE_ENV === "production") {
    return value !== undefined && value.length > 0
  }
  return true
}

export const env = createEnv({
  /**
   * Server-side environment variables schema
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    VERCEL_ENV: z.enum(["development", "test", "production"]).optional(),
    STRIPE_SECRET_KEY: z
      .string()
      .min(1)
      .optional()
      .refine(isRequiredInProduction, "STRIPE_SECRET_KEY is required in production"),
    STRIPE_WEBHOOK_SECRET: z
      .string()
      .min(1)
      .optional()
      .refine(isRequiredInProduction, "STRIPE_WEBHOOK_SECRET is required in production"),
    STRIPE_MEMBERSHIP_PRICE_ID: z.string().min(1),
    RESEND_API_KEY: z.string().min(1).optional(),
    EMAIL_OCTOPUS_API_KEY: z
      .string()
      .min(1)
      .optional()
      .refine(isRequiredInProduction, "EMAIL_OCTOPUS_API_KEY is required in production"),
    EMAIL_OCTOPUS_LIST_ID: z
      .string()
      .min(1)
      .optional()
      .refine(isRequiredInProduction, "EMAIL_OCTOPUS_LIST_ID is required in production"),
    VERCEL_URL: z.string().optional(),
    VERCEL_PROJECT_PRODUCTION_URL: z.string().optional(),
    DATABASE_URL: z.string().url(),
    CRON_SECRET: z.string().min(1),
    ALGOLIA_ADMIN_API_KEY: z.string().optional(),
    ALGOLIA_APP_ID: z.string().optional(),
    ALGOLIA_SEARCH_API_KEY: z.string().optional(),
    ALGOLIA_INDEX_NAME: z.string().optional(),
  },

  /**
   * Client-side environment variables schema
   */
  client: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_SANITY_DATASET: z.string().min(1),
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z
      .string()
      .min(1)
      .optional()
      .refine(isRequiredInProduction, "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is required in production"),
    NEXT_PUBLIC_GA_ID: z.string().min(1).optional(),
    NEXT_PUBLIC_DISABLE_ANIMATIONS: z.string().optional(),
    NEXT_PUBLIC_ALGOLIA_ADMIN_API_KEY: z.string().optional(),
    NEXT_PUBLIC_ALGOLIA_APP_ID: z.string().optional(),
    NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY: z.string().optional(),
    NEXT_PUBLIC_ALGOLIA_INDEX_NAME: z.string().optional(),
  },

  /**
   * Manual destructuring of process.env
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_MEMBERSHIP_PRICE_ID: process.env.STRIPE_MEMBERSHIP_PRICE_ID,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_OCTOPUS_API_KEY: process.env.EMAIL_OCTOPUS_API_KEY,
    EMAIL_OCTOPUS_LIST_ID: process.env.EMAIL_OCTOPUS_LIST_ID,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    NEXT_PUBLIC_DISABLE_ANIMATIONS: process.env.NEXT_PUBLIC_DISABLE_ANIMATIONS,
    VERCEL_URL: process.env.VERCEL_URL,
    VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    CRON_SECRET: process.env.CRON_SECRET,
    ALGOLIA_ADMIN_API_KEY: process.env.ALGOLIA_ADMIN_API_KEY,
    ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
    ALGOLIA_SEARCH_API_KEY: process.env.ALGOLIA_SEARCH_API_KEY,
    ALGOLIA_INDEX_NAME: process.env.ALGOLIA_INDEX_NAME,
    NEXT_PUBLIC_ALGOLIA_ADMIN_API_KEY: process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_API_KEY,
    NEXT_PUBLIC_ALGOLIA_APP_ID: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
    NEXT_PUBLIC_ALGOLIA_INDEX_NAME: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
})

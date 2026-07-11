// Analytics configuration for Google services
// Site verification, & Analytics IDs

import { env } from 'cloudflare:workers'

// Hardcoded site verification code for Google Search Console
export const googleSiteVerification = 'A0_Ksyf1I830zGOCAoWCpe1LMtpiVKZcJxNjMJ1epsE'

// GA tracking ID loaded from Cloudflare env
export const googleAnalyticsMeasurementID = env.PUBLIC_GA_TRACKING_ID

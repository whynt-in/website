// Analytics configuration for Google services
// Site verification, Analytics, & Tag Manager IDs

import { env } from 'cloudflare:workers'

// Empty string - fill with actual verification code
export const googleSiteVerification = 'A0_Ksyf1I830zGOCAoWCpe1LMtpiVKZcJxNjMJ1epsE'

// GA tracking ID loaded from Cloudflare env
export const googleAnalyticsMeasurementID = env.PUBLIC_GA_TRACKING_ID

// GTM container ID loaded from Cloudflare env
export const googleTagManagerID = env.PUBLIC_GTM_ID

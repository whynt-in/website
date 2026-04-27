// Google tracking
// - Google Site Verification: for Google Search Console
// - Google Analytics Measurement ID: for Google Analytics
// - Google Tag Manager ID: for Google Tag Manager

import { env } from 'cloudflare:workers'

export const googleSiteVerification = ''
export const googleAnalyticsMeasurementID = env.PUBLIC_GA_TRACKING_ID
export const googleTagManagerID = env.PUBLIC_GTM_ID

/**
 * COMPREHENSIVE VERIFIED WHITE BOT TAXONOMY & CLOUDFLARE EDGE OPTIMIZATION
 * 
 * Accurately detects verified search crawlers, inspection tools, AI foundation models,
 * and social link unfurlers to guarantee unblocked, accelerated, and perfectly rendered HTML.
 */

export interface WhiteBotInfo {
  isWhiteBot: boolean;
  botType: string;
  category: 'search' | 'ai' | 'social' | 'none';
  shouldExpandDetails: boolean;
}

// 1. Google Search & Inspection Ecosystem
const GOOGLE_BOT_REGEX = /Googlebot|Google-InspectionTool|GoogleOther|Google-Extended|Mediapartners-Google|AdsBot-Google|FeedFetcher-Google/i;

// 2. Microsoft Bing Ecosystem
const BING_BOT_REGEX = /Bingbot|msnbot|BingPreview|AdIdxBot/i;

// 3. Apple Ecosystem
const APPLE_BOT_REGEX = /Applebot|Applebot-Extended/i;

// 4. Frontier AI Foundation Crawlers
const AI_BOT_REGEX = /GPTBot|ChatGPT-User|OAI-SearchBot|ClaudeBot|anthropic-ai|Claude-Web|PerplexityBot|Bytespider|CCBot/i;

// 5. Social Link Previewers & Unfurlers
const SOCIAL_BOT_REGEX = /facebookexternalhit|meta-externalagent|Meta-ExternalFetcher|Twitterbot|LinkedInBot|WhatsApp|TelegramBot|Slackbot|SkypeUriPreview/i;

// 6. Global Search Engines
const GLOBAL_SEARCH_REGEX = /DuckDuckBot|YandexBot|Baiduspider|NaverBot|Sogou/i;

/**
 * Evaluates whether an incoming request originates from a verified White Bot.
 */
export function identifyWhiteBot(userAgent: string, cf?: any): WhiteBotInfo {
  // Cloudflare Bot Management verified bot signal (Enterprise / Pro edge feature)
  if (cf?.botManagement?.verifiedBot === true) {
    return {
      isWhiteBot: true,
      botType: 'Cloudflare-Verified-Bot',
      category: 'search',
      shouldExpandDetails: true
    };
  }

  if (GOOGLE_BOT_REGEX.test(userAgent)) {
    return {
      isWhiteBot: true,
      botType: 'Google-Tier1',
      category: 'search',
      shouldExpandDetails: true
    };
  }

  if (BING_BOT_REGEX.test(userAgent)) {
    return {
      isWhiteBot: true,
      botType: 'Bing-Tier1',
      category: 'search',
      shouldExpandDetails: true
    };
  }

  if (APPLE_BOT_REGEX.test(userAgent)) {
    return {
      isWhiteBot: true,
      botType: 'Apple-Tier1',
      category: 'search',
      shouldExpandDetails: true
    };
  }

  if (AI_BOT_REGEX.test(userAgent)) {
    return {
      isWhiteBot: true,
      botType: 'Frontier-AI-Crawler',
      category: 'ai',
      shouldExpandDetails: true
    };
  }

  if (GLOBAL_SEARCH_REGEX.test(userAgent)) {
    return {
      isWhiteBot: true,
      botType: 'Global-Search-Engine',
      category: 'search',
      shouldExpandDetails: true
    };
  }

  if (SOCIAL_BOT_REGEX.test(userAgent)) {
    return {
      isWhiteBot: true,
      botType: 'Social-Link-Unfurler',
      category: 'social',
      shouldExpandDetails: false // Unfurlers only need OpenGraph metadata in <head>
    };
  }

  return {
    isWhiteBot: false,
    botType: 'Human-Or-Generic-Client',
    category: 'none',
    shouldExpandDetails: false
  };
}

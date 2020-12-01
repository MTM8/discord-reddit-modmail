require('dotenv').config();
const Discord = require('discord.js');
const Snoowrap = require('snoowrap');
const MailFeed = require('./src/feed');
const logger = require('./src/logger');

// Required environment variables
const discordToken = process.env.DISCORD_TOKEN;
const redditClientId = process.env.REDDIT_CLIENT_ID;
const redditClientSecret = process.env.REDDIT_CLIENT_SECRET;
const redditRefreshToken = process.env.REDDIT_REFRESH_TOKEN;
const redditUserAgentDescription = process.env.REDDIT_USER_AGENT_DESC;
const watchedSubreddit = process.env.SUBREDDIT;
const discordFeedChannel = process.env.DISCORD_CHANNEL;

const client = new Discord.Client();
client.login(discordToken);
client.log = logger;

if (redditClientId && redditClientSecret && redditRefreshToken) {
  const r = new Snoowrap({
    userAgent: redditUserAgentDescription || 'Automatic modmail fetch bot',
    clientId: redditClientId,
    clientSecret: redditClientSecret,
    refreshToken: redditRefreshToken,
  });
  const mailFeed = new MailFeed(client, r, watchedSubreddit, discordFeedChannel);
  mailFeed.mainLoop();
} else {
  client.log.error('Reddit access not configured. Please enter the client ID, client secret, and refresh token.');
}
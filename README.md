# Reddit Modmail in Discord

Discord Bot that provides a live feed of subreddit modmail messages.

## Setup

Create `.env` file in root and fill out the following:

```
DISCORD_TOKEN=
REDDIT_CLIENT_ID=
REDDIT_CLIENT_SECRET=
REDDIT_REFRESH_TOKEN=
SUBREDDIT=
DISCORD_CHANNEL=
```

`DISCORD_TOKEN` will be the [Discord API token](https://discord.com/developers/applications) from a created bot.

All Reddit fields can be configured with [reddit-oauth-helper](https://github.com/not-an-aardvark/reddit-oauth-helper).
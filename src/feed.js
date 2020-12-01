const Discord = require('discord.js');

module.exports = function (client, r, subreddit, channelId) {
  const me = this;
  let lastMailTime = 0;

  this.processMessages = (messages) => {
    messages.reverse().forEach((mail) => {
      if (mail.messages[0].date > lastMailTime) {
        const embed = new Discord.MessageEmbed()
          .setAuthor(mail.subject)
          .setFooter(`r/${mail.owner.displayName}`)
          .setTimestamp(mail.messages[0].date);

        let mailMessage = mail.messages[0].bodyMarkdown;
        if (mailMessage.length > 2048) {
          mailMessage = `${mailMessage.substring(0, 2045)}...`;
        }
        embed.setDescription(mailMessage);

        const username = mail.messages[0].author.name.name;
        let sender = `[u/${username}](https://www.reddit.com/user/${username})`;
        if (mail.messages[0].author.name.isHidden) {
          sender += ' (anonymous)';
        }
        embed.addField('Sent By', sender, true)
          .addField('Messages in Thread', mail.numMessages, true)
          .addField('Link', `https://mod.reddit.com/mail/perma/${mail.id}`, false);

        // TODO: Add command to set channel within Discord
        const channel = client.channels.cache.get(channelId);
        channel.send(embed);

        lastMailTime = mail.messages[0].date;
      }
    });
  };

  this.mainLoop = () => {
    if (lastMailTime === 0) {
      r.getSubreddit(subreddit).getNewModmailConversations({ limit: 1 })
        .then((modlog) => {
          try {
            lastMailTime = modlog[0].messages[0].date;
          } catch (e) {
            client.log.error('Error while getting first subreddit modmail.', e);
          }
        })
        .catch((e) => {
          client.log.error('Error while initializing subreddit modmail loop.', e);
        })
        .finally(() => {
          setTimeout(me.mainLoop, 10000);
        });
    } else {
      r.getSubreddit(subreddit).getNewModmailConversations({ limit: 3 })
        .then(me.processMessages)
        .catch((e) => {
          client.log.error('Error getting new subreddit modmail.', e);
        })
        .finally(() => {
          setTimeout(me.mainLoop, 10000);
        });
    }
  };
};

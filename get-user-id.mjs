import { TwitterApi } from 'twitter-api-v2';

const client = new TwitterApi({
    appKey: process.env.TWITTER_CONSUMER_KEY,
    appSecret: process.env.TWITTER_CONSUMER_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const ARGS = process.argv.slice(2);
const TWEET_ID = ARGS[0];

if (TWEET_ID === undefined) {
  console.log('You need to pass tweed id as an argument');
  process.exit();
}

client.v2.singleTweet(TWEET_ID, {
    'tweet.fields': [
        'author_id',
     ],
  }).then((val) => {
    console.log(val)
}).catch((err) => {
    console.log(err)
})

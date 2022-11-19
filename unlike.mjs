import { TwitterApi } from 'twitter-api-v2';

const twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_CONSUMER_KEY,
    appSecret: process.env.TWITTER_CONSUMER_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});
const userId = process.env.TWITTER_USER_ID;

const ARGS = process.argv.slice(2);
const DAYS = ARGS[0];

const getPastDate = (offset) => {
  return new Date(new Date().setDate(new Date().getDate() - offset));
};

if (DAYS === undefined) {
  console.log('You need to pass number of days as an argument');
  process.exit();
}

const safeDays = getPastDate(DAYS);

(async () => {
  try {
    const likedTweets = await twitterClient.v2.userLikedTweets(userId, {
      "max_results": 99,
      "tweet.fields": "created_at"
    });
    likedTweets['data']['data'].forEach((tweet) => {
      const isSafe = new Date(tweet.created_at) > safeDays;
      if(!isSafe) {
        twitterClient.v2.unlike(userId, tweet.id);
      }
    });
  } catch (error) {
    console.log(error);
  }
})();


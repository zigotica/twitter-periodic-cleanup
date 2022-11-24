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
const ENDS = ARGS[1];

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
    const usersTweets = await twitterClient.v2.userTimeline(userId, {
      "tweet.fields": "created_at" 
    });
    for await (const tweet of usersTweets) {
      const isSafe = new Date(tweet.created_at) > safeDays;
      if(!isSafe) {
        if (!ENDS || (ENDS && !tweet.text.endsWith(ENDS))) {
          console.log('deteting tweet id', tweet.id);
          twitterClient.v2.deleteTweet(tweet.id);
        } else {
          console.log('tweet', tweet.id, 'will be kept due to string match');
        }
      } else {
        console.log('tweet', tweet.id, 'not deleted (yet)');
      }
    };
  } catch (error) {
    console.log(error);
  }
})();

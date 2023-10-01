# Twitter periodic cleanup

## Important notice

Twitter started to significantly reduce its API capabilities as of April 2023. This change has major implications, spacially as the main dependency used here ([twitter-api-v2](https://github.com/PLhery/node-twitter-api-v2)) is severely affected. As a result, **this library is no longer maintained and the repository will be archived** (kept just for your reading pleasure). 

## What

A node script that purges tweets and likes older than (customisable) x days old. 

## Why

First step before definitely leaving twitter, if that psycopath doesn't sink it, which is also an option. 

## Disclaimer

Use at your own risk. The worst case scenario is you delete all your tweets, but that's actually what you are here for… I recommend using the script commenting the following line before setting up the github actions:

```
twitterClient.v2.deleteTweet(tweet.id);
```

## Dependencies

```
$ npm install
```

The script needs a [Twitter Developer Account](https://developer.twitter.com). You will have to create a Project with an App using the v2, and give it Read+Write access.

First step in my case was to use the Twitter Backup request, and get a link to download a zip with all my data. Initially, I used [this repo](https://github.com/koenrh/delete-tweets) to batch remove of tweets.

The current `delete-old-tweets.mjs` script allows to paginate results, and keep calling the endpoint to get more tweets, so you can use it without the data downloaded from Twitter. But having a backup with your data is probably still recommended, even if just for sentimental reasons.

## Setup

### Export env data

The following env variables will be used by the two scripts:

```
export TWITTER_CONSUMER_KEY=""
export TWITTER_CONSUMER_SECRET=""
export TWITTER_ACCESS_TOKEN=""
export TWITTER_ACCESS_TOKEN_SECRET=""
```

Replace the empty strings by the generated tokens in the Developer Account website. 


### Get user id

Go to your timeline and click in one of your tweets. The URL will show you the ID of the tweet. We will use the tweet-id to get your twitter user-id:


```
$ node get-user-id.mjs tweet-id
```

With the result, you will also now export the user-id as an env variable, replacing the empty string below:

```
export TWITTER_USER_ID=""
```

## Use the cleanup script manually

We now simply have run the node script, passing the number of days you want your tweets to be alive. For instance, passing 10 will remove all tweets older than 10 days.


```
$ node delete-old-tweets.mjs 10
```

### Keep tweets that end with a string

You can pass an optional last string argument. It will be tested as a string matching the last characters of a tweet. For instance:


```
$ node delete-old-tweets.mjs 10 "#k"
```

Will remove all tweets older than 10 days, except those ending EXACTLY in `#k`, that will be kept.


## Run unlike script manually

I also created an unlike script. Same use, same number of days option.

```
$ node unlike.mjs 10
```

## Automate the execution

I modified Ale's [excellent template](https://github.com/bomberstudios/run-node-with-github-actions) to schedule a node script using github actions. It is set to run every day at 04:30 and remove tweets/likes older than 2 days. To modify these values, please have a look at the `.github/workflows/schedule.yaml` file and the `package.json` script value for the number of days. Please note that the `start` script rins both delete and unlike methods by default. Edit to you liking.

You will have to add the 5 previous secrets to your repository, under Settings/Secrets. These will be read from the `schedule.yaml` file while running the scheduled job.


## To Do

* [x] PoC
* [x] Delete tweets
* [x] Unlike tweets
* [x] Automate using github actions
* [x] Keep tweets that end with a string
* [x] Pagination (until rate limit reached)
* [x] Documentation
  * [x] Basic use
  * [x] Automation



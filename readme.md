# Twitter periodic cleanup

## What

A node script that purges tweets older than (customisable) x days old. 

## Why

First step before definitely leaving twitter, if that psycopath doesn't sink it, which is also an option. 

## Dependencies


```
$ npm install
```

The script needs a [Twitter Developer Account](https://developer.twitter.com). You will have to create a Project with an App using the v2, and give it Read+Write access.

I also used [this repo](https://github.com/koenrh/delete-tweets) to do a first batch remove of tweets. That repo requires you to get twitter to send you a zip with all your data. 

## Setup

### Export env data

The following env variables will be used by the two scripts:

```
export TWITTER_CONSUMER_KEY=""
export TWITTER_CONSUMER_SECRET=""
export TWITTER_ACCESS_TOKEN=""
export TWITTER_ACCESS_TOKEN_SECRET=""
export TWITTER_BEARER_TOKEN=""
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

## Use the cleanup script

We now simply have run the node script, passing the number of days you want your tweets to be alive. For instance, passing 10 will remove all tweets older than 10 days.


```
$ node delete-old-tweets.mjs 10
```

## To Do

* [x] PoC
* [ ] Automate it using github actions
* [ ] Documentation
  * [x] Basic use
  * [ ] Automation


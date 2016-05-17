class TwitterClient

  def initialize(config)
    @client = Twitter::REST::Client.new do |client|
      client.consumer_key = config['consumer_key']
      client.consumer_secret = config['consumer_secret']
    end
    @source_account = config['source_account']
  end

  def fetch(id)
    tweet = @client.status(id.to_i)
    return tweet if tweet_is_dungeon?(tweet)
    next_dungeon(tweet.id)
  end

  def latest
    tweet = dungeon_timeline(count: 1)[0]
    return tweet if tweet_is_dungeon?(tweet)
    next_dungeon(tweet.id)
  end

  def after(id)
    tweet = dungeon_timeline(max_id: id.to_i - 1, count: 1)[0]
    return tweet if tweet_is_dungeon?(tweet)
    next_dungeon(tweet.id)
  end

  def before(id)
    tweet = dungeon_timeline(since_id: id, count: 200)[-1]
    if tweet
      return tweet if tweet_is_dungeon?(tweet)
      prev_dungeon(tweet.id)
    else
      return nil
    end
  end

  private

  # Looks for a tweet that is a dungeon
  # earlier than the id given
  def next_dungeon(id)
    puts 'looking for next dungeon'
    tweets = dungeon_timeline(max_id: id, count: 20)
    tweets.each do |tweet|
      return tweet if tweet_is_dungeon?(tweet)
    end
  end

  def prev_dungeon(id)
    puts 'looking for previous dungeon'
    tweets = dungeon_timeline(since_id: id, count: 200)
    tweets.reverse.each do |tweet|
      return tweet if tweet_is_dungeon?(tweet)
    end
  end

  def tweet_is_dungeon?(tweet)
    !(tweet.text =~ /[a-zA-Z0-9 ]/)
  end

  def dungeon_timeline(options)
    options = {
      trim_user: true,
      exclude_replies: true
    }.merge!(options)
    @client.user_timeline(@source_account, options)
  end

end
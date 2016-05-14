class TwitterClient

  def initialize(config)
    @client = Twitter::REST::Client.new do |client|
      client.consumer_key = config['consumer_key']
      client.consumer_secret = config['consumer_secret']
    end
    @source_account = config['source_account']
  end

  def latest
    dungeon_timeline(count: 1)[0]
  end

  def fetch(index)
    dungeon_timeline(count: index)[-1]
  end

  def after(id)
    dungeon_timeline(max_id: id, count: 2)[-1]
  end

  def before(id)
    dungeon_timeline(since: id, count: 1)[0]
  end

  private

  def dungeon_timeline(options)
    options = {
      trim_user: true,
      exclude_replies: true
    }.merge!(options)
    @client.user_timeline(@source_account, options)
  end

end
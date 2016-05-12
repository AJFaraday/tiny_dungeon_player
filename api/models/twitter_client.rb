class TwitterClient

  def initialize(config)
    @client = Twitter::REST::Client.new do |client|
      client.consumer_key = config['consumer_key']
      client.consumer_secret = config['consumer_secret']
    end
    @source_account = config['source_account']
  end

  def latest
    dungeon_timeline.take(1)[0]
  end

  def fetch(index)
    dungeon_timeline.take(index)[-1]
  end

  private

  def dungeon_timeline
    @client.user_timeline(@source_account)
  end

end
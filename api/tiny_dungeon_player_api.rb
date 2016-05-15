require 'rubygems'
require 'twitter'
require 'sinatra/base'
require 'yaml'
require 'json'

Dir[File.dirname(__FILE__) + '/models/*.rb'].each { |file| require file }

class TinyDungeonPlayerAPI < Sinatra::Base

  set :static, true
  set :public_dir, File.dirname(__FILE__) + '/../public'

  def initialize
    super
    config = YAML.load_file(File.dirname(__FILE__) + '/../config/api.yml')
    @twitter_client = TwitterClient.new(config)
  end

  get '/' do
    send_file File.join(settings.public_dir, 'index.html')
  end

  # Exactly the same as '/'
  # The URL is read in the JS
  get '/:tweet_id' do
    send_file File.join(settings.public_dir, 'index.html')
  end

  get '/tweet/latest' do
    tweet = @twitter_client.latest
    {tweet: tweet.text, id: tweet.id.to_s}.to_json
  end

  get '/tweet/next' do
    tweet = @twitter_client.after(params[:id])
    {tweet: tweet.text, id: tweet.id.to_s}.to_json
  end

  get '/tweet/back' do
    tweet = @twitter_client.before(params[:id])
    if tweet
      {tweet: tweet.text, id: tweet.id.to_s}.to_json
    else
      404
    end
  end

  get '/tweet/:tweet_id' do
    tweet = @twitter_client.fetch(params[:tweet_id])
    {tweet: tweet.text, id: tweet.id.to_s}.to_json
  end


end

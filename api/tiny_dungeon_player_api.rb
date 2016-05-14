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

  get '/tweet/latest' do
    tweet = @twitter_client.latest
    {tweet: tweet.text, id: tweet.id, index: 1}.to_json
  end

  get '/tweet/next' do
    index = (params[:index].to_i + 1)
    tweet = @twitter_client.fetch(index)
    response = {tweet: tweet.text, id: tweet.id, index: index}
    response.to_json
  end

  get '/tweet/back' do
    index = (params[:index].to_i - 1)
    if index >= 1
      tweet = @twitter_client.fetch(index)
      {tweet: tweet.text, id: tweet.id, index: index}.to_json
    else
      404
    end
  end


end

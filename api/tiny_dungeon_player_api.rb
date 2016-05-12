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
    config = YAML.load_file('../config/api.yml')
    @twitter_client = TwitterClient.new(config)
  end

  get '/tweet/latest' do
    tweet = @twitter_client.latest
    {tweet: tweet.text}.to_json
  end

end
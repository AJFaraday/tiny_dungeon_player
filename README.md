# Tiny Dungeon Player
## By Andrew Faraday (@MarmiteJunction)

Caution: VERY EARLY BETA

### Background

Tiny Dungeons (@TinyDungeons) is a bot and Twitter account by
Noah Swartz (@SwartzCr). It generates RPG style dungeon maps
using emoji for the tiles.

Andrew was inspired by this map generator and decided to write
a companion application which makes the emoji dungeons playable.

It's small, it's simple, and it's still basically a proof of concept.

Can you help? Coding (JavaScript)? testing? sound effects?
issue logging? I'd love to hear from you.

### Prerequisites

* Linux
* Ruby 2.0 +
* Git
* Ruby gems

### Installation

Register the application with Twitter:

* Go to apps.twitter.com
* Click 'Create New App'
* Fill in name, description and website
* Agree to the licence agreement (if you agree)
* 'Create your Twitter Application'
* Save
* Click on 'Keys and Access Tokens'
* Copy your consumer_key and consumer_secret for now

Install tiny dungeon player:

* Clone the repo (https://github.com/AJFaraday/tiny_dungeon_player)
* cd tiny_dungeon_player
* cp config/api.yml.template api.yml
* (edit config/api.yml and add your consumer_key and consumer_secret)
* cd api
* bundle install
* cd ..
* rackup config.ru
* Open Firefox, and point it at localhost:9292

### Emoji Support

For now, Tiny Dungeon Player relies on emoji fonts.

My testing in Linux suggests that this will display
best in FireFox.

If you see a wide selection of empty squares, then
you may have to install an emoji font.

There are plans to fix this issue, in the fullness of time.
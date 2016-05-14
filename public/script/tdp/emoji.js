TDP.emoji = {

  get: function(source) {
    if (TDP.emoji[source]){
      return TDP.emoji[source]
    } else {
      var image_tag = twemoji.parse(
        source,
        {
          callback: function (icon, options) {
            return 'https://twemoji.maxcdn.com/2/svg/' + icon + '.svg';
          },
          attributes: function () {
            return {
              style: 'max-width:40px;'
            }
          }
        }
      );
      TDP.emoji.stored[source] = image_tag;
      return image_tag;
    }
  },

  stored: {}

};
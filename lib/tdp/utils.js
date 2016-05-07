TDP.utils = {
  contains: function(collection, value) {
    return collection.indexOf(value) >= 0
  },

  reverse: function(object){
    var ret = {};
    for(var key in object){
      ret[json[key]] = key;
    }
    return ret;
  }
};
TDP.console = {
  
  log: function(major, minor) {
    console.log(major);
    console.log(minor);
    var major = this.render_major(major);
    var minor = this.render_minor(minor);
    var message = this.render_message(major, minor);
    TDP.UI.readout.prepend(message);
    this.truncate_readout();
  },
  
  render_major: function(content) { 
    var major_html = $('<span>');
    major_html.addClass('TDP_readout_major');
    major_html.html(content);
    return major_html;
  },

  render_minor: function(content) {
    var minor_html = $('<span>');
    minor_html.addClass('TDP_readout_minor');
    minor_html.html(content);
    return minor_html;
  },

  render_message: function(major, minor) {
    var holder_html = $('<div>');
    holder_html.addClass('TDP_readout_message');
    holder_html.append(major);
    holder_html.append($('<br clear="both"/>'));
    holder_html.append(minor);
    holder_html.append($('<br clear="both"/>'));
    return holder_html;
  },

  truncate_readout: function() {
    TDP.UI.readout.children().filter(":gt(5)").remove();
  }

};

/*
 * Large Album view
 */

app.AlbumsList = Backbone.View.extend({

  tagName:'div',

  className:'artist-list-view',

  initialize:function () {
    var self = this;
    this.model.on("reset", this.render, this);
    this.model.on("add", function (album) {
      self.$el.append(new app.AlbumItemView({model:album}).render().el);
    });
  },

  render:function () {
    this.$el.empty();
    _.each(this.model.models, function (album) {
      this.$el.append(new app.AlbumItemView({model:album}).render().el);
    }, this);
    return this;
  }
});

app.AlbumItemView = Backbone.View.extend({

  tagName:"div",

  initialize:function () {
    this.model.on("change", this.render, this);
    this.model.on("destroy", this.close, this);
  },

  render:function () {
    this.$el.html(this.template(this.model.attributes));

    // songs
    //this.songs = new app.SongCollection({songs: this.model.attributes.songs});
    //console.log(this.model.attributes.songs);
    this.songList = new app.SongListView({"model":this.model.attributes.songs});
    $(".tracks", this.$el).html(this.songList.render().el);
    return this;
  }

});

/*
 * Small Album view (no songs)
 */
app.SmallAlbumsList = Backbone.View.extend({

  tagName:'ul',

  className:'album-list-small',

  initialize:function () {

/*    this.model.on("add", function (album) {
      this.$el.append(new app.SmallAlbumItemView({model:album}).render().el);
    });*/
  },

  render:function () {

    this.$el.empty();
    _.each(this.model.models, function (album) {
      this.$el.append(new app.SmallAlbumItemView({model:album}).render().el);
    }, this);
    return this;

  }
});

app.SmallAlbumItemView = Backbone.View.extend({

  tagName:"li",
  className:'album-small-item',

  initialize:function () {
    this.model.on("change", this.render, this);
    this.model.on("destroy", this.close, this);
  },

  render:function () {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }

});



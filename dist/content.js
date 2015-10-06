// Generated by CoffeeScript 1.10.0
var config, download_event, get_song_name, get_url, initial_list, observer;

get_url = function(parent_object) {
  return $(parent_object).find("input").val();
};

get_song_name = function(parent_object) {
  var artist, song;
  artist = $(parent_object).find(".title_wrap b a").text().trim();
  song = $(parent_object).find(".title_wrap .title a").text().trim();
  if (song === "") {
    song = $(parent_object).find(".title_wrap .title").text().trim();
  }
  return artist + " – " + song;
};

initial_list = $("#initial_list")[0];

download_event = function(event) {
  var name, parent, url;
  event.preventDefault();
  parent = this.parentElement;
  url = get_url(parent);
  name = get_song_name(parent);
  console.log(url + " " + name);
  return false;
};

observer = new MutationObserver(function(mutations) {
  return mutations.forEach(function(mutation) {
    var adds, button;
    adds = mutation.addedNodes[0];
    if ($(adds).hasClass("audio")) {
      button = $(adds).find(".area.clear_fix")[0];
      return button.addEventListener("contextmenu", download_event, false);
    }
  });
});

config = {
  childList: true
};

observer.observe(initial_list, config);

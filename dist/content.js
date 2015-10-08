// Generated by CoffeeScript 1.10.0
(function() {
  var vkdl;

  Array.prototype.first = function() {
    return this[0];
  };

  NodeList.prototype.first = function() {
    return this[0];
  };

  NodeList.prototype.forEach = Array.prototype.forEach;

  Element.prototype._addEventListener = Element.prototype.addEventListener;

  Element.prototype.addEventListener = function(event, listener, useCapture) {
    this._addEventListener(event, listener, useCapture);
    if (!this.listenerList) {
      this.listenerList = {};
    }
    if (!this.listenerList[event]) {
      this.listenerList[event] = [];
    }
    return this.listenerList[event].push(listener);
  };

  vkdl = {
    get_url: function(parent) {
      return parent.querySelector("input").value.split('?').first(null);
    },
    get_song_name: function(parent) {
      return parent.querySelector(".title_wrap").innerText.trim(null).replace('/', '-').concat('.mp3');
    },
    download_file_event: function() {
      return function(event) {
        var name, options, url;
        event.preventDefault();
        url = vkdl.get_url(this.parentElement);
        name = vkdl.get_song_name(this.parentElement);
        console.log("vkdl: " + name + "\n" + url);
        return options = {
          url: url,
          filename: name,
          conflictAction: 'uniquify'
        };
      };
    },
    add_event: function(node) {
      var button, ref;
      button = node.querySelector('.area.clear_fix');
      if (((ref = button.listenerList) != null ? ref.contextmenu : void 0) != null) {
        return;
      }
      button.addEventListener('contextmenu', vkdl.download_file_event(null));
    },
    add_event_to_existing_nodes: function() {
      var nodes;
      nodes = document.querySelectorAll('.audio');
      nodes.forEach(function(node) {
        return vkdl.add_event(node);
      });
    },
    observer: new MutationObserver(function(mutations) {
      return mutations.forEach(function(mutation) {
        return mutation.addedNodes.forEach(function(node) {
          var ref, search;
          if ((ref = node.classList) != null ? ref.contains('audio') : void 0) {
            return vkdl.add_event(node);
          } else {
            search = typeof node.querySelectorAll === "function" ? node.querySelectorAll('.audio') : void 0;
            return search != null ? search.forEach(function(node) {
              return vkdl.add_event(node);
            }) : void 0;
          }
        });
      });
    }),
    start_observer: function() {
      var box_layer, config, page_body;
      config = {
        childList: true,
        subtree: true
      };
      page_body = document.querySelector('#page_body');
      box_layer = document.querySelector('#box_layer');
      if (page_body != null) {
        vkdl.observer.observe(page_body, config);
      }
      if (box_layer != null) {
        return vkdl.observer.observe(box_layer, config);
      }
    }
  };

  vkdl.add_event_to_existing_nodes(null);

  vkdl.start_observer(null);

}).call(this);

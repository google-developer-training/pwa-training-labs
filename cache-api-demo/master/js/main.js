/*
Copyright 2016 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

(function() {
  if (!window.caches) {
    console.log('Caches API not found');
    return;
  }

  var model = {
    currentCache: null,
    currentCacheElem: null,
    currentRequest: null,
    currentRequestElem: null,
    caches: [
      {
        name: 'example cache A (your cache hasn\'t loaded yet...)',
        requests: ['some url', 'another url']
      }
    ],
    files: [
      'img/kitten-100.jpeg',
      'img/kitten-200.jpeg',
      'img/kitten-300.jpeg',
      'pages/offline.html',
      'json/catz.json'
    ],

    populate: function() {
      // Collect data from Cache, update model
      window.caches.keys()
      .then(function(cacheKeys) {
        Promise.all(
          // cacheKeys.map transforms array of cache keys into an array of cache objects
          cacheKeys.map(
            function(cacheKey) {
              // Wrap the cache objects in a promise for Promise.all
              return new Promise(function(resolve, reject) {
                window.caches.open(cacheKey)
                .then(function(cache) {
                  return cache.keys();
                })
                .then(function(requests) {
                  // Build and return cache objects
                  var cacheObject = {
                    name: cacheKey,
                    requests: requests.map(function(request) {
                      return request.url;
                    })
                  };
                  resolve(cacheObject);
                });
              });
            }
          )
        )
        .then(function(cacheObjects) {
          model.caches = cacheObjects;
          octopus.refresh();
        });
      })
      .catch(function(error) {
        console.log('Could not access caches', error);
      });
    }

  };

  var octopus = {
    init: function() {
      model.populate();
      controlView.init();
      filesView.init();
      cachesView.init();
      consoleView.init();
    },

    refresh: function() {
      model.currentRequest = null;
      model.currentRequestElem = null;
      model.currentCache = null;
      model.currentCacheElem = null;
      cachesView.render();
    },

    getFiles: function() {
      return model.files;
    },

    getCaches: function() {
      return model.caches;
    },

    setCurrentCache: function(newCache, newCacheElem) {
      model.currentRequest = null;
      if (model.currentRequestElem) {
        model.currentRequestElem = null;
      }

      model.currentCache = newCache;
      if (model.currentCacheElem) {
        model.currentCacheElem.classList.remove('active-cache');
      }
      newCacheElem.classList.add('active-cache');
      model.currentCacheElem = newCacheElem;

      document.querySelector('.mdl-textfield')
      .MaterialTextfield.change(model.currentCache.name);
    },

    setCurrentRequest: function(newRequest, newRequestElem) {
      model.currentRequest = newRequest;
      if (model.currentRequestElem) {
      }
      model.currentRequestElem = newRequestElem;
    }
  };

  var cachesView = {
    init: function() {
      this.parentElem = document.getElementById('caches');
      var source = document.getElementById('template-cache').innerHTML;
      this.template = Handlebars.compile(source);
      this.render();
    },

    render: function() {
      var cache;
      var cacheElem;
      var cacheContainer;
      var i;
      var caches = octopus.getCaches();

      this.parentElem.innerHTML = '';

      for (i = 0; i < caches.length; i++) {
        cache = caches[i];

        cacheContainer = document.createElement('div');
        cacheContainer.innerHTML = this.template({cacheName: cache.name});
        cacheElem = cacheContainer.querySelector('.cache');
        // componentHandler.upgradeElement(cacheElem);

        // document this!
        cacheElem.addEventListener('click',
        (function(cacheCopy, cacheElemCopy) {
          return function() {
            octopus.setCurrentCache(cacheCopy, cacheElemCopy);
          };
        })(cache, cacheElem), true);
        deleteView.init(cacheElem.querySelector('.delete-location'), cache);
        requestView.init(cacheElem.querySelector('.requests'), cache);
        this.parentElem.appendChild(cacheElem);
      }
    }
  };

  var requestView = {
    init: function(parentElem, cache) {
      this.parentElem = parentElem;
      this.requests = cache.requests;
      var source = document.getElementById('template-request').innerHTML;
      this.template = Handlebars.compile(source);
      this.render();
    },

    render: function() {
      var request;
      var requestElem;
      var j;
      var requests = this.requests;

      for (j = 0; j < requests.length; j++) {
        request = requests[j];

        requestContainer = document.createElement('div');
        requestContainer.innerHTML = this.template({request: request});
        requestElem = requestContainer.querySelector('.request');
        // componentHandler.upgradeElement(requestElem);

        // document this
        requestElem.addEventListener('click',
        (function(requestCopy, requestElemCopy) {
          return function() {
            octopus.setCurrentRequest(requestCopy, requestElemCopy);
          };
        })(request, requestElem), true);
        this.parentElem.appendChild(requestElem);
        deleteView.init(requestElem.querySelector('.delete-location'), request);
      }

    }
  };

  var deleteView = {
    init: function(parentElem, target) {
      this.target = target;
      this.parentElem = parentElem;
      this.source = document.getElementById('template-delete').innerHTML;
      this.render();
    },

    render: function() {
      deleteContainer = document.createElement('div');
      deleteContainer.innerHTML = this.source;
      deleteElem = deleteContainer.querySelector('.delete');
      // componentHandler.upgradeElement(deleteElem);

      var target = this.target;
      deleteElem.addEventListener('click', function() {
        // If target has a name property (even an empty string), it is a cache
        if (target.name || target.name === '') {
          deleteCache(target.name);
        }
        // Otherwise it is a request
        else {
          deleteRequest(target);
        }
      });
      this.parentElem.appendChild(deleteElem);
    }
  };

  var filesView = {
    init: function() {
      this.filesList = document.getElementById('files-list');
      var source = document.getElementById('template-file').innerHTML;
      this.template = Handlebars.compile(source);
      this.render();
    },

    render: function() {
      var file;
      var fileElem;
      var k;
      var files = octopus.getFiles();

      for (k = 0; k < files.length; k++) {
        file = files[k];

        fileContainer = document.createElement('div');
        fileContainer.innerHTML = this.template({file: file});
        fileElem = fileContainer.querySelector('.file');
        // componentHandler.upgradeElement(fileElem);
        this.filesList.appendChild(fileElem);
        addView.init(fileElem, file);
      }
    }
  };

  var addView = {
    init: function(parentElem, target) {
      this.target = target;
      this.parentElem = parentElem;
      this.source = document.getElementById('template-add').innerHTML;
      this.render();
    },

    render: function() {
      var target = this.target;
      var parentElem = this.parentElem;

      addContainer = document.createElement('div');
      addContainer.innerHTML = this.source;
      addElem = addContainer.querySelector('.add');
      // componentHandler.upgradeElement(fileElem);

      addElem.addEventListener('click', (function(fileCopy) {
          return function() {
            createRequest(fileCopy);
          };
        })(target), true);
      parentElem.appendChild(addElem);
    }
  };

  controlView = {
    init: function() {
      this.addCacheButton = document.getElementById('add-cache');
      this.deleteCacheButton = document.getElementById('delete-cache');
      this.render();
    },

    render: function() {
      var cacheNameInput;

      var addCacheButton = document.getElementById('add-cache');
      addCacheButton.addEventListener('click', function() {
        cacheNameInput = document.getElementById('cache-input').value;
        createCache(cacheNameInput);
      });

      var deleteCacheButton = document.getElementById('delete-cache');
      deleteCacheButton.addEventListener('click', function() {
        cacheNameInput = document.getElementById('cache-input').value;
        deleteCache(cacheNameInput);
      });
    }
  };

  consoleView = {
    init: function() {
      this.codeElem = document.getElementById('code');
      this.consoleElem = document.getElementById('console');
    },

    showCode: function(templateName, context) {
      var source = document.getElementById(templateName).innerHTML;
      var template = Handlebars.compile(source);
      this.codeElem.innerHTML = template(context);
    },

    showError: function(message) {
      this.codeElem.textContent = message;
    }
  };

  function createCache(cacheName) {
    window.caches.open(cacheName)
    .then(function(cache) {
      model.populate();
      octopus.refresh();
      consoleView.showCode('template-add-cache', {
        cacheName: cacheName
      });
    })
    .catch(function(error) {
      console.log('Cache creation failed', error);
    });
  }

  function deleteCache(cacheName) {
    window.caches.delete(cacheName)
    .then(function() {
      model.populate();
      octopus.refresh();
      consoleView.showCode('template-delete-cache', {
        cacheName: cacheName
      });
    })
    .catch(function(error) {
      console.log('Cache deletion failed', error);
    });
  }

  function createRequest(requestUrl) {
    if (!model.currentCache) {
      console.log('Select a cache');
      consoleView.showError('Select a cache');
      return;
    }
    var cacheName = model.currentCache.name;
    window.caches.open(cacheName)
    .then(function(cache) {
      cache.add(requestUrl)
      .then(function() {
        model.populate();
        octopus.refresh();
        consoleView.showCode('template-add-request', {
          cacheName: cacheName,
          requestUrl: requestUrl
        });
      });
    })
    .catch(function(error) {
      console.log('Request creation failed', error);
    });
  }

  function deleteRequest(requestUrl) {
    var cacheName = model.currentCache.name;
    window.caches.open(cacheName)
    .then(function(cache) {
      cache.delete(requestUrl)
      .then(function() {
        model.populate();
        octopus.refresh();
        consoleView.showCode('template-delete-request', {
          cacheName: cacheName,
          requestUrl: requestUrl
        });
      });
    })
    .catch(function(error) {
      console.log('Could not delete request', error);
    });
  }

  octopus.init();
})();

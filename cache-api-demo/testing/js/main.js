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
      'images/kitten-100.jpeg',
      'images/kitten-200.jpeg',
      'images/kitten-300.jpeg',
      'images/kitten-400.jpeg',
      'images/kitten-500.jpeg',
      'examples/example.html',
      'examples/example.json'
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
        model.currentRequestElem.classList.remove('active-request');
        model.currentRequestElem = null;
      }

      model.currentCache = newCache;
      if (model.currentCacheElem) {
        model.currentCacheElem.classList.remove('active-cache');
      }
      newCacheElem.classList.add('active-cache');
      model.currentCacheElem = newCacheElem;

      document.getElementById('cache-input').value = model.currentCache.name;
    },

    setCurrentRequest: function(newRequest, newRequestElem) {
      model.currentRequest = newRequest;
      if (model.currentRequestElem) {
        model.currentRequestElem.classList.remove('active-request');
      }
      newRequestElem.classList.add('active-request');
      model.currentRequestElem = newRequestElem;
    }
  };

  var cachesView = {
    init: function() {
      this.cachesListElem = document.getElementById('caches-list');
      this.render();
    },

    render: function() {
      var cache;
      var cacheElem;
      var i;
      var caches = octopus.getCaches();

      this.cachesListElem.innerHTML = '';

      for (i = 0; i < caches.length; i++) {
        cache = caches[i];

        cacheElem = document.createElement('ul');
        cacheElem.textContent = cache.name;
        cacheElem.classList.add('cache');

        // document this!
        cacheElem.addEventListener('click',
        (function(cacheCopy, cacheElemCopy) {
          return function() {
            octopus.setCurrentCache(cacheCopy, cacheElemCopy);
          };
        })(cache, cacheElem), true);
        this.cachesListElem.appendChild(cacheElem);

        deleteView.init(cacheElem, cache);
        requestView.init(cacheElem, cache);
      }
    }
  };

  var requestView = {
    init: function(cacheElem, cache) {
      this.cacheElem = cacheElem;
      this.cache = cache;
      this.requests = cache.requests;
      this.render();
    },

    render: function() {
      var request;
      var requestElem;
      var j;
      var requests = this.requests;

      for (j = 0; j < requests.length; j++) {
        request = requests[j];

        requestElem = document.createElement('li');
        requestElem.textContent = request;
        requestElem.classList.add('request');
        // document this
        requestElem.addEventListener('click',
        (function(requestCopy, requestElemCopy) {
          return function() {
            octopus.setCurrentRequest(requestCopy, requestElemCopy);
          };
        })(request, requestElem), true);
        this.cacheElem.appendChild(requestElem);

        deleteView.init(requestElem, request);
      }

    }
  };

  var deleteView = {
    init: function(parentElem, target) {
      this.target = target;
      this.parentElem = parentElem;
      this.render();
    },

    render: function() {
      var target = this.target;
      var parentElem = this.parentElem;
      var deleteButton = document.createElement('button');
      deleteButton.textContent = 'X';
      deleteButton.classList.add('delete');
      deleteButton.addEventListener('click', function() {
        // If target has a name property, it is a cache
        if (target.name) {
          deleteCache(target.name);
        }
        // Otherwise it is a request
        else {
          deleteRequest(target);
        }
      });
      parentElem.appendChild(deleteButton);
    }
  };

  var filesView = {
    init: function() {
      this.filesList = document.getElementById('files-list');
      this.render();
    },

    render: function() {
      var file;
      var fileElem;
      var k;
      var files = octopus.getFiles();

      this.filesList.textContent = 'Files:';

      for (k = 0; k < files.length; k++) {
        file = files[k];

        fileElem = document.createElement('li');
        fileElem.textContent = file;
        fileElem.classList.add('file');
        this.filesList.appendChild(fileElem);

        addView.init(fileElem, file);
      }
    }
  };

  var addView = {
    init: function(parentElem, target) {
      this.target = target;
      this.parentElem = parentElem;
      this.render();
    },

    render: function() {
      var target = this.target;
      var parentElem = this.parentElem;
      var addButton = document.createElement('button');
      addButton.textContent = 'Add';
      addButton.classList.add('add');
      addButton.addEventListener('click', (function(fileCopy) {
          return function() {
            createRequest(fileCopy);
          };
        })(target), true);
      parentElem.appendChild(addButton);
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

    showCode: function(templateName) {
      var template = document.getElementById(templateName);
      this.codeElem.innerHTML = template.innerHTML;
    },

    showError: function(message) {
      this.codeElem.textContent = message;
    },

    clear: function() {
      this.codeElem.innerHTML = '';
    }
  };

  function createCache(cacheName) {
    // if (!cacheName) {
    //   console.log('Enter a cache name');
    //   return;
    // }
    window.caches.open(cacheName)
    .then(function(cache) {
      model.populate();
      octopus.refresh();
      consoleView.showCode('template-add-cache');
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
      consoleView.showCode('template-delete-cache');
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
    window.caches.open(model.currentCache.name)
    .then(function(cache) {
      cache.add(requestUrl)
      .then(function() {
        model.populate();
        octopus.refresh();
        consoleView.showCode('template-add-request');
      });
    })
    .catch(function(error) {
      console.log('Request creation failed', error);
    });
  }

  function deleteRequest(requestUrl) {
    window.caches.open(model.currentCache.name)
    .then(function(cache) {
      cache.delete(requestUrl)
      .then(function() {
        model.populate();
        octopus.refresh();
        consoleView.showCode('template-delete-request');
      });
    })
    .catch(function(error) {
      console.log('Could not delete request', error);
    });
  }

  octopus.init();
})();

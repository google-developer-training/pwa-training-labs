/*
 * Copyright 2018 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
class Router {
  replaceLinks(document) {
    if ('serviceWorker' in navigator) {
      return;
    }
    const elements = document.getElementsByTagName('a');
    for (let i = 0; i < elements.length; i++) {
      const anchor = elements[i];
      const href = anchor.href;
      anchor.href = '/shell.html#href=' + encodeURIComponent(href);
    }
  }
}

class AmpPage {
  constructor(rootElement) {
    this.rootElement = rootElement;
  }

  _fetchDocument(url) {
    return new Promise((resolve, reject) => {
      this.xhr_ = new XMLHttpRequest();
      this.xhr_.open('GET', url, true);
      this.xhr_.responseType = 'document';
      this.xhr_.setRequestHeader('Accept', 'text/*');
      this.xhr_.onreadystatechange = () => {
        if (this.xhr_.readyState < /* STATUS_RECEIVED */ 2) {
          return;
        }
        if (this.xhr_.status < 100 || this.xhr_.status > 599) {
          this.xhr_.onreadystatechange = null;
          reject(new Error(`Unknown HTTP status ${this.xhr_.status}`));
          this.xhr_ = null;
          return;
        }
        if (this.xhr_.readyState === /* COMPLETE */ 4) {
          if (this.xhr_.responseXML) {
            resolve(this.xhr_.responseXML);
          } else {
            reject(new Error('No xhr.responseXML'));
          }
          this.xhr_ = null;
        }
      };
      this.xhr_.onerror = () => { reject(new Error('Network failure')); };
      this.xhr_.onabort = () => { reject(new Error('Request aborted')); };
      this.xhr_.send();
    });
  };

  loadDocument(url) {
    return this._fetchDocument(url).then(document => {
      router.replaceLinks(document);
      const header = document.querySelector('.header');
      header.remove();
      window.AMP.attachShadowDoc(this.rootElement, document, url);
    });
  }
}

function getContentUri() {
  const hash = window.location.hash;
  if (hash && hash.indexOf('href=') > -1) {
    return decodeURIComponent(hash.substr(6));
  }
  return window.location;
}


const ampReadyPromise = new Promise(resolve => {
  (window.AMP = window.AMP || []).push(resolve);
});
const router = new Router();
router.replaceLinks(document);

const ampRoot = document.querySelector('#amproot');
// const url = document.location.href;
const url = getContentUri();
const amppage = new AmpPage(ampRoot, router);
ampReadyPromise.then(() => {
  return amppage.loadDocument(url);
}).then(() => {
  if (window.history) {
    window.history.replaceState({}, '', url);
  }
});

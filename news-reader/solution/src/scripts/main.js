/*
* Copyright 2018 Google Inc. All rights reserved.
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

const apiBaseUrl = 'https://hacker-news.firebaseio.com/v0';

const fetchJson = function(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json());
};

const fetchTopQuestions = function() {
  const topQuestionsUrl = `${apiBaseUrl}/askstories.json`;
  return fetchJson(topQuestionsUrl)
    .then(topQuestionIds => {
      const questions = topQuestionIds
        .slice(0, 30)
        .map(questionId => {
          let questionUrl = `${apiBaseUrl}/item/${questionId}.json`
          return fetchJson(questionUrl);
        });
      return Promise.all(questions);
    });
};

const fetchComments = function(commentIds, questionId) {
  const comments = commentIds.map(commentId => {
    const commentUrl = `${apiBaseUrl}/item/${commentId}.json`;
    return fetchJson(commentUrl);
  });
  return Promise.all(comments);
};

const renderComments = function(comments) {
  return comments
    .map(comment => {
      let commentHtml = comment.deleted || comment.dead ?
        `<p class="removed">Removed</p>` : `
        <div class='comment'>
          <span class="by secondary">by ${comment.by}</span>
          <span class="time secondary">${timeSince(comment.time)}</span>
          <div id=${comment.id} class='comment-text'>${comment.text}</div>
        </div> `
      return commentHtml;
    })
    .join('');
};

const toggleQuestionDetails = function(questionId, kidsIds) {
  const expandableElem = document.getElementById(`expandable-${questionId}`);
  expandableElem.style.display = (expandableElem.style.display === 'block') ?
    'none' : 'block';
  if (!kidsIds || kidsIds == 'undefined') {
    return;
  }
  const loadingElem = document.getElementById(`loading-${questionId}`);
  loadingElem.style.display = 'block';
  const commentsElem = document.getElementById(`comments-${questionId}`);
  commentsElem.style.display = 'none';

  const commentIds = kidsIds.split(',');
  return fetchComments(commentIds, questionId)
    .then(comments => renderComments(comments))
    .then(commentsHtml => {
      loadingElem.style.display = 'none';
      commentsElem.innerHTML = commentsHtml;
      commentsElem.style.display = 'block';
    })
    .catch(err => {
      console.log(err);
      const errorHtml = `<p class="center">Uh oh, couldn\'t fetch comments 😥</p>`;
      loadingElem.style.display = 'none';
      commentsElem.innerHTML = errorHtml;
      commentsElem.style.display = 'block';
    });

}

const renderQuestions = function(questions) {
  return questions
    .map(question => {
      let questionHtml =
      `<section class="card" id="${question.id}">
        <h3 class="card-title">${question.title}</h3>
        <p>
          <span class="time secondary">${timeSince(question.time)} </span>
          by
          <span class="by secondary"> ${question.by}</span>
        </p>
        <p><span class="secondary">${question.score}</span> points</p>
        ${question.text || question.kids ?
          `<button onclick="toggleQuestionDetails('${question.id}', '${question.kids}')"
            class="primary">
              toggle
          </button>
          <div class="expandable" id="expandable-${question.id}">
            <div class="question-details">
              ${question.text ?
                `<div class="question-wrapper">
                  <div class="question-text">${question.text}</div>
                </div>` : '' }
              ${question.kids ?
                `<div class="comments-wrapper">
                  <div class="loading-wrapper">
                    <div id="loading-${question.id}" class="loading"></div>
                  </div>
                  <div id="comments-${question.id}" class="comments"></div>
                </div>` : '' }
            </div>
          </div>` : ''}
      </section>`
      return questionHtml;
    })
    .join('');
};

window.addEventListener('load', () => {

  fetchTopQuestions()
    .then(questions => {
      const questionsHtml = renderQuestions(questions);
      document.getElementById('loading').style.display = 'none';
      document.getElementById('container').insertAdjacentHTML('beforeend', questionsHtml);
    })
    .catch(err => {
      console.log(err);
      const errorHtml = `<section><p>Uh oh, something went wrong 😥</p></section>`;
      document.getElementById('loading').style.display = 'none';
      document.getElementById('container').insertAdjacentHTML('beforeend', errorHtml);
    });

});



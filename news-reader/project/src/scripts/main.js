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
          <span class="by primary-alt">by ${comment.by}</span>
          <span class="time primary-alt">${timeSince(comment.time)}</span>
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
          <span class="time primary-alt">${timeSince(question.time)} </span>
          by
          <span class="by primary-alt"> ${question.by}</span>
        </p>
        <p><span class="primary-alt">${question.score}</span> points</p>
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



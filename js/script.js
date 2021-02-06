'use strict';
// const optArticleSelector = '.post',
//   optTitleSelector = '.post-title',
//   optTitleListSelector = '.titles',
//   optArticleTagsSelector = '.post-tags .list',
//   optArticleAuthorSelector = '.post-author';

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts .post.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');
};
// MOJA FUNKCJA

function generateTitleLinks(customSelector = '') {
  // remove contents of titleList

  const titleList = document.querySelector('.titles');
  titleList.innerHTML = '';

  // for each article

  const articles = document.querySelectorAll('.post' + customSelector);

  for (let article of articles) {
    // get the article id

    const articleId = article.getAttribute('id');

    // find the title element

    const articleTitle = article.querySelector('.post-title').innerHTML;

    // get the title from the title element

    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      '</span></a></li>';

    // create HTML of the link

    titleList.insertAdjacentHTML('beforeend', linkHTML);
  }

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll('.post');
  console.log(articles);
  /* START LOOP: for every article: */
  for (const article of articles) {
    console.log(article);
    /* find tags wrapper */
    const postTags = article.querySelector('.post-tags');
    console.log(postTags);
    /* make html variable with empty string */
    let html;
    postTags.innerHTML = '';
    console.log(postTags);
    /* get tags from data-tags attribute */
    const dataTags = article.getAttribute('data-tags');
    console.log(dataTags);
    /* split tags into array */
    const tags = dataTags.split(' ');
    console.log(tags);
    /* START LOOP: for each tag */
    for (let tag of tags) {
      /* generate HTML of the link */
      const tagHTML = `<li><a href="#tag-` + tag + `">` + tag + `</a></li>`;
      /* add generated code to html variable */
      console.log(tagHTML);
      /* insert HTML of all the links into the tags wrapper */
      postTags.insertAdjacentHTML('beforeend', tagHTML);
      /* END LOOP: for each tag */
    }
    /* END LOOP: for every article: */
  }
}
generateTags();

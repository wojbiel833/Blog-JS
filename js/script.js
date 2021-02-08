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
  // console.log(articles);
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
  // console.log(articles);
  /* START LOOP: for every article: */
  for (const article of articles) {
    // console.log(article);
    /* find tags wrapper */
    const postTags = article.querySelector('.post-tags');
    // console.log(postTags);
    /* make html variable with empty string */
    let html;
    postTags.innerHTML = '';
    // console.log(postTags);
    /* get tags from data-tags attribute */
    const dataTags = article.getAttribute('data-tags');
    // console.log(dataTags);
    /* split tags into array */
    const tags = dataTags.split(' ');
    // console.log(tags);
    /* START LOOP: for each tag */
    for (let tag of tags) {
      /* generate HTML of the link */
      const tagHTML = `<li><a href="#tag-` + tag + `">` + tag + `</a></li>`;
      /* add generated code to html variable */
      // console.log(tagHTML);
      /* insert HTML of all the links into the tags wrapper */
      postTags.insertAdjacentHTML('beforeend', tagHTML);
      /* END LOOP: for each tag */
    }
    /* END LOOP: for every article: */
  }
}
generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  // console.log('KLIKNĄŁEŚ');
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = this.getAttribute('href');
  // console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  // console.log(tag);
  // ----------------------ZBĘDNE----------------
  /* find all tag links with class active */
  // const activeTags = document.querySelectorAll(
  //   '[href^="#tag-' + href + '"] .active'
  // );
  // console.log(activeTags);
  // /* START LOOP: for each active tag link */
  // for (let active of activeTags) {
  //   /* remove class active */
  //   active.classList.remove('active');
  //   /* END LOOP: for each active tag link */
  // }
  // /* find all tag links with "href" attribute equal to the "href" constant */
  // const similarTags = document.querySelectorAll(href);
  // console.log(similarTags);
  // /* START LOOP: for each found tag link */
  // for (const groupTags of similarTags) {
  //   /* add class active */
  //   groupTags.classList.add('active');
  //   console.log(groupTags);
  //   /* END LOOP: for each found tag link */
  // }
  // -------------------------------------------
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const tagsSelector = document.querySelectorAll('.post-tags [href^="#tag-"]');
  /* START LOOP: for each link */
  for (const tag of tagsSelector) {
    /* add tagClickHandler as event listener for that link*/
    // console.log(tag);
    tag.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors() {
  /* find all authors */
  const post = document.querySelectorAll('.post');
  // console.log(post);
  /* START LOOP: for every author: */
  for (const author of post) {
    // console.log(author);
    /* find tags wrapper */
    const postAuthor = author.querySelector('.post-author');
    // console.log(postAuthor);
    /* make html variable with empty string */
    postAuthor.innerHTML = '';
    // console.log(postAuthor);
    /* get author from data-author attribute */
    const dataTag = author.getAttribute('data-author');
    // console.log(dataTag);
    //     /* generate HTML of the link */
    const tagAuthor =
      `<a href="#post-author-` + dataTag + `">` + dataTag + `</a>`;
    // console.log(tagAuthor);
    /* insert HTML of all the links into the tags wrapper */
    postAuthor.insertAdjacentHTML('afterbegin', tagAuthor);
    //  END LOOP
  }
}
generateAuthors();

function addClickLisenersToAuthors() {
  /* find all links to tags */
  const authorSelector = document.querySelectorAll(' a[href^="#post-author"]');
  // console.log(authorSelector);
  /* START LOOP: for each link */
  for (const author of authorSelector) {
    /* add tagClickHandler as event listener for that link */
    // console.log(author);
    author.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }
}

addClickLisenersToAuthors();

function authorClickHandler() {
  // console.log('KLIK');
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = this.getAttribute('href');
  // console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#post-author-', '');
  // console.log(tag);
  // ----------------------ZBĘDNE----------------
  /* find all tag links with class active */
  // const activeTags = document.querySelectorAll(
  //   '[href^="#tag-' + href + '"] .active'
  // );
  // console.log(activeTags);
  // /* START LOOP: for each active tag link */
  // for (let active of activeTags) {
  //   /* remove class active */
  //   active.classList.remove('active');
  //   /* END LOOP: for each active tag link */
  // }
  // /* find all tag links with "href" attribute equal to the "href" constant */
  // const similarTags = document.querySelectorAll(href);
  // console.log(similarTags);
  // /* START LOOP: for each found tag link */
  // for (const groupTags of similarTags) {
  //   /* add class active */
  //   groupTags.classList.add('active');
  //   console.log(groupTags);
  //   /* END LOOP: for each found tag link */
  // }
  // -------------------------------------------
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + tag + '"]');
}
function calculateTagsParams(tags) {
  // Jej zadaniem będzie znalezienie najmniejszej i największej liczby wystąpień. Te dwie liczby mają zostać zwrócone w postaci obiektu, który będzie zawierał dwa klucze: max i min.
  const stuffEntries = Object.entries(tags);
  const stuffValues = Object.values(tags);
  let min = 1;
  let max = 1;
  // console.log(stuffEntries);
  // console.log(stuffValues);
  for (let i = 0; i < stuffValues.length; i++) {
    const [key, values] = stuffEntries[i];
    // console.log(values);
    if (values < min) {
      min = values;
    }
    if (values > max) {
      max = values;
    }
  }
  console.log(min);
  console.log(max);
  return { min, max };
}
const optCloudClassCount = 5;
const optCloudClassPrefix = 'tag-size-';

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  // const classNumber = Math.floor(
  //   ((count - params.min) / (params.max - params.min)) * optCloudClassCount + 1
  // );---------------------------------BŁĄD!!!
  return classNumber;
}

function generateTagsCloud() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* find all articles */
  const posts = document.querySelectorAll('.post');
  // console.log(posts);
  /* START LOOP: for every article: */
  for (const post of posts) {
    // console.log(post);
    /* find tags wrapper */
    // const singlePost = post.querySelector('.post');
    // console.log(singlePost); // !!
    /* make html variable with empty string */
    let html = '';
    let linkHTML;
    /* get tags from data-tags attribute */
    const dataTags = post.getAttribute('data-tags');
    // console.log(dataTags);
    /* split tags into array */
    const tags = dataTags.split(' ');
    // console.log(tags);
    /* START LOOP: for each tag */
    for (const tag of tags) {
      // console.log(tag);
      /* generate HTML of the link */
      linkHTML = `<li><a href="#tag-` + tag + `">` + tag + `</a></li>`;
      // console.log(linkHTML);
      /* add generated code to html variable */
      html = linkHTML;
      // console.log(html);
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        // console.log(allTags);
        /* [NEW] add generated code to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
        // console.log(allTags);
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    const tagsWrapper = document.querySelector('.list.tags');
    // console.log(tagsWrapper);
    tagsWrapper.insertAdjacentHTML('beforeend', linkHTML);
    // console.log(tagsWrapper);

    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');
  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML +=
      '<li><a class="' +
      optCloudClassPrefix +
      calculateTagClass(allTags[tag], tagsParams) +
      '"href="#' +
      tag +
      '">' +
      tag +
      '</a></li> ';
    // console.log(allTagsHTML);
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
  console.log(tagList);
}
generateTagsCloud();

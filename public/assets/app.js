// *************************************************
// APP
// *************************************************
const app = (function() {

  let activeSection = 'news';
  fetch('GET', `/${activeSection}`, renderResponse);

  const travelBtnDOM = document.getElementById('js-travel-btn');
  const newsBtnDOM = document.getElementById('js-news-btn');

  const navSectionsLookup = {
    travel: travelBtnDOM,
    news: newsBtnDOM
  };

  return {
    handleNavClick(e) {
      if (e.target.nodeName !== 'LI') { return; }
      const clickedSection = e.target.dataset.section;
      if (clickedSection === activeSection) { return; }
      navSectionsLookup[activeSection].classList.remove('nav__item--selected');
      activeSection = clickedSection;
      navSectionsLookup[activeSection].classList.add('nav__item--selected');
      fetch('GET', `/${activeSection}`, renderResponse);
    }
  };

}());

document.getElementById('js-nav-list').addEventListener('click', app.handleNavClick);




// *************************************************
// RENDER
// *************************************************
const listItemsDOM = document.getElementById('js-card-list');

function renderResponse(err, res) {
  if (res && res.error || err) {
    listItemsDOM.innerHTML = `
      <li class="card__item">
        <h3 class="news__headline">
          We are very sorry but we are experiencing api
          response errors at the moment.
        </h3>
      </li>
    `;
    return;
  }

  console.log(res);
  listItemsDOM.innerHTML = '';

  listItemsDOM.innerHTML = res.articles.map((article) => {
    return `
      <li class="card__item">
        <img class="news__thumbnail" src=${article.thumbnail}></img>
        <h3 class="news__headline">${article.headline}</h3>
      </li>
    `;
  }).join('');
}

// Function that converts minutes to seconds and adds '0' when needed

function secToMin(s){return(s-(s%=60))/60+(9<s?':':':0')+s}
console.log(secToMin(320));



// *************************************************
// FETCH
// *************************************************
function fetch(method, url, handleResponseCallback) {
  console.log(url);
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      handleResponseCallback(null, JSON.parse(xhr.responseText));
    }
  };

  xhr.onerror = function() {
    handleResponseCallback('Api response error');
  };

  xhr.open(method, url, true);
  xhr.send();
}

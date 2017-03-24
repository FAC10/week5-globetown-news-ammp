
// *************************************************
// APP
// *************************************************

const app = (function() {

  let activeSection = 'travel';
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

  if (res.arrivals) {
    renderTravel(res);
  } else {
    renderNews(res);
  }
}


function renderTravel(res) {
  listItemsDOM.innerHTML = '';

  listItemsDOM.innerHTML = res.arrivals
    .map(arrival => Object.assign({}, arrival, {secondsToStation: Number(arrival.secondsToStation)}) )
    .sort((arrival, nextArrival) => arrival.secondsToStation - nextArrival.secondsToStation)
    .map((arrival) => {
      return `
        <li class="card__item card__item--travel">
          <span class="travel__destination">${arrival.destination}</span>
          <span class="travel__time">${secToMin(Number(arrival.secondsToStation))}</span>
          <span class="travel__platform">${arrival.platform}</span>
        </li>
      `;
    }).join('');
}


function renderNews(res) {
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


function secToMin(seconds) {
  return (seconds - (seconds %= 60)) / 60 + (9 < seconds ? ':' : ':0') + seconds + ' mins';
}





// *************************************************
// FETCH
// *************************************************
function fetch(method, url, handleResponseCallback) {
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

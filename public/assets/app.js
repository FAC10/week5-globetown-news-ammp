// *************************************************
// APP
// *************************************************
fetch('GET', 'http://localhost:4000/news', function(err, res) {
  console.log(res);
});


// *************************************************
// FETCH
// *************************************************
function fetch(method, url, handleResponseCallback) {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {

      // var jsonObj = JSON.parse(xhr.responseText);
      // handleResponseCallback(null, jsonObj);
      handleResponseCallback(null, xhr.responseText);
    }
  };

  xhr.onerror = function() {
    handleResponseCallback('Api response error');
  };

  xhr.open(method, url, true);
  xhr.send();
}

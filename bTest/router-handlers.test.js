const test = require('tape');
const shot = require('shot');
const router = require('../src/router.js');
const handlers = require('../src/handlers.js');


test('Initialise tests', (t) => {
  t.ok(true);
  t.end();
});


const fake = [
  {method: 'GET', url:'/news', expectedContentType:'application/json', expectedStatusCode: 200, expectedArray: 'articles'},
  {method: 'GET', url:'/travel', expectedContentType:'application/json', expectedStatusCode: 200, expectedArray: 'arrivals'},
  {method: 'GET', url:'/', expectedContentType:'text/html', expectedStatusCode: 200},
  {method: 'GET', url:'/elephant', expectedContentType:'text/html', expectedStatusCode: 404},
  {method: 'GET', url:'/assets/elephant.css', expectedContentType:'text/html', expectedStatusCode: 404},
  {method: 'GET', url:'/assets/bugsss.css', expectedContentType:'text/html', expectedStatusCode: 404},
  {method: 'GET', url:'/assets/style.css', expectedContentType:'text/css', expectedStatusCode: 200},
  {method: 'GET', url:'/assets/favicon.ico', expectedContentType:'image/x-icon', expectedStatusCode: 200},
  {method: 'GET', url:'/assets/app.js', expectedContentType:'application/javascript', expectedStatusCode: 200}

];


fake.forEach(route => {
  const {method, url, expectedStatusCode, expectedContentType} = route;
  test(`Test '${url}' route`, (t) => {
    shot.inject(router, { method: method, url: url } , (res) => {
      t.equal(res.statusCode, expectedStatusCode, `should return status code of ${expectedStatusCode}`);
      t.equal(res.headers['content-type'], expectedContentType, `should return content type of ${expectedContentType}`);
      t.end();
    });
  });
});


test('Test getContentType function', (t) => {
  const fakeContentTypes = [
    {url: '/assets/app.js', expectedContentType: 'application/javascript'},
    {url: '/assets/style.css', expectedContentType: 'text/css'},
    {url: '/assets/favicon.ico', expectedContentType: 'image/x-icon'}
  ];

  const randomIndex = Math.floor(Math.random() * fakeContentTypes.length);
  const actualContentType = handlers.getContentType(fakeContentTypes[randomIndex].url);
  const expectedContentType = fakeContentTypes[randomIndex].expectedContentType;

  t.equal(actualContentType, expectedContentType, `should return content type of ${expectedContentType} for url of ${fakeContentTypes[randomIndex].url}`);
  t.end();
});



const expectedArray = [fake[0], fake[1]];
expectedArray.forEach((route)=> {
  const{expectedArray, url} = route;
  test('Test serve travel handler', (t) => {
    shot.inject(router,{method:'GET',url:url},(res) => {
      const resObj = JSON.parse(res.payload);

      t.equal(typeof resObj,'object','Expect the typeof the payload to be an object');
      t.ok(Array.isArray(resObj[expectedArray]),'Expect the type of the payload articles property to be an array');
      t.end();
    });

  });
});

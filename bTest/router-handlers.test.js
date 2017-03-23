const test = require('tape');
const shot = require('shot');
const router = require('../src/router.js');
// const  = require('../src/.js');


test('Initialise tests', (t) => {
  t.ok(true);
  t.end();
});

const fake = [
  {method: 'GET',url:'/',expectedContentType:'text/html',expectedStatusCode: 200},
  {method: 'GET',url:'/news',expectedContentType:'application/json',expectedStatusCode: 200},
  {method: 'GET',url:'/elephant',expectedContentType:'text/html',expectedStatusCode: 404}
];


fake.forEach(route => {
  const {method,url,expectedStatusCode,expectedContentType} = route;
  test('Test and handlers', (t) => {
    shot.inject(router, { method: method , url: url } , (res) => {
      t.equal(res.statusCode, expectedStatusCode,'Should return correct Status Code');
      t.equal(res.headers['content-type'],expectedContentType,'Should return correct content type');
      t.end();
    });
  });
});




// test('Test serve news handler', (t) => {
//   shot.inject(router,{method:'GET',url:'/news'},(res) => {
//     t.equal(res.statusCode, 200,'Should return correct Status Code');
//     t.equal(res.headers['content-type'],'application/json','Should return correct content type');
//     const resObj = JSON.parse(res.payload);
//     t.equal(typeof resObj,'object','Expect the typeof the payload to be an object');
//     t.ok(Array.isArray(resObj.articles),'Expect the type of the payload articles property to be an array');
//     t.end();
//   });
// });

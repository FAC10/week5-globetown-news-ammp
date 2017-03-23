const test = require('tape');
const shot = require('shot');
const router = require('../src/router.js');
// const router = require('../src/router.js');


test('Initialise tests', (t) => {
  t.ok(true);
  t.end();
});


test('Test router and handlers', (t) => {
  shot.inject(router,{method:'GET',url:'/'},(res) => {
    t.equal(res.statusCode, 200,'Should return correct Status Code');
    t.equal(res.headers['content-type'],'text/html','Should return correct content type');
    t.end();
  });
});


test('Test serve news handler', (t) => {
  shot.inject(router,{method:'GET',url:'/news'},(res) => {
    t.equal(res.statusCode, 200,'Should return correct Status Code');
    t.equal(res.headers['content-type'],'application/json','Should return correct content type');
    const resObj = JSON.parse(res.payload);
    t.equal(typeof resObj,'object','Expect the typeof the payload to be an object');
    t.ok(Array.isArray(resObj.articles),'Expect the type of the payload articles property to be an array');
    t.end();
  })
});

# Globetown News App

[![Build Status](https://travis-ci.org/FAC10/week5-globetown-news-ammp.svg?branch=master)](https://travis-ci.org/FAC10/week5-globetown-news-ammp)
[![Code Coverage](https://codecov.io/gh/FAC10/week5-globetown-news-ammp/branch/master/graph/badge.svg)](https://codecov.io/gh/FAC10/week5-globetown-news-ammp)

# User Story:
Most students at F&C seem to experience **the impostor syndrome**. Occasionally they're so overwhelmed by everything that they just feel like running away. In such cases, they want to know all the train departure times from Bethnal Green tube station, so that they can run... wherever... whenever. 

However, sometimes they might feel like running away instantly. In these cases, we want to make sure they're not bored while waiting for the train on the platform. So our users will have access to the latest local news. 

# Strech Goals:
- When the weather isn't great (:umbrella: most of the year:snowflake:), our user will want to run straight to the airport and jet off to a :sunny: sunny :sunny: destination and start **livin la vida loca** :palm_tree: :dromedary_camel: :wine_glass: :ice_cream: :tropical_drink: :sun_with_face: :cocktail: :chocolate_bar: :smiley: The app will have an 'Airport' section, which will help our user get to Heathrow, Luton, Gatwick and Stansted Airport.
 - Add a refresh iconn and button at the top of the page. 

Live version: https://globetown-news-app.herokuapp.com/

## Getting started

```sh
# Clone the repo
$ git clone 'REPO URL'
$ cd 'REPO NAME'
$ npm install

# Start the app
$ npm start
```

## Tech stack:

- Code coverage: Istanbul and CodeCov.io
- Continuous integration: Travis CI
- Automatic deployment: Heroku
- Server: http
- Test runner: tape
- Server testing: shot

## Learn from your own mistakes:
- The order of script tags is very important as we learned you cannot run the code in app.test.js before the code for app.js is run.

```
  <script src="https://code.jquery.com/qunit/qunit-2.1.1.js"></script>
  <script src="../public/assets/app.js"></script>
  <script src="app.test.js"></script>
```



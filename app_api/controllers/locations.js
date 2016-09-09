var oauthSignature = require('oauth-signature');
var n = require('nonce')();
var request = require('request');
var qs = require('querystring');
var _ = require('lodash');

/* Function for yelp call
 * ------------------------
 * set_parameters: object with params to search
 * callback: callback(error, response, body)
 */
var request_yelp = function(set_parameters, callback) {

  /* The type of request */
  var httpMethod = 'GET';

  /* The url we are using for the request */
  var url = 'http://api.yelp.com/v2/search';

  /* We can setup default parameters here */
  var default_parameters = {
    location: 'San+Jose',
    category_filter: '',
    sort: '0'
  };

  var parms = {};
  if (set_parameters.location === 'undefined') {
    parms.location = default_parameters.location;
  } else {
    parms.location = set_parameters.location;
  }
  if (set_parameters.category_filter === 'undefined') {
    parms.category_filter = default_parameters.category_filter;
  } else {
    parms.category_filter = set_parameters.category_filter;
  }
  if (set_parameters.sort === 'undefined') {
    parms.sort = default_parameters.sort;
  } else {
    parms.sort = set_parameters.sort;
  }

  /* We set the require parameters here */
  var required_parameters = {
    oauth_consumer_key: 'Qwgp7pKNc4ncfLh00vka2w',
    oauth_token: 'fRZGaM5ITW6QAmemO_knZ1sRak1GOshp',
    oauth_nonce: n(),
    oauth_timestamp: n().toString().substr(0,10),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_version: '1.0'
  };

  /* We combine all the parameters in order of importance */
  var parameters = _.assign(default_parameters, parms, required_parameters);
  //var parameters = $.extend({}, parms, required_parameters);
  /* We set our secrets here */
  var consumerSecret = 'rxKMxm_KfcMlthg12Jo-ZpYjbdk';
  var tokenSecret = 'TPrGlj9zfoLl1jRJlKLyqRJjUBo';

  /* Then we call Yelp's Oauth 1.0a server, and it returns a signature */
  /* Note: This signature is only good for 300 seconds after the oauth_timestamp */
  var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false});

  /* We add the signature to the list of paramters */
  parameters.oauth_signature = signature;

  /* Then we turn the paramters object, to a query string */
  var paramURL = qs.stringify(parameters);

  /* Add the query string to the url */
  var apiURL = url+'?'+paramURL;

  /* Then we use request to send make the API Request */
  request(apiURL, function(error, response, body){
    return callback(error, response, body);
  });

};

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

var theEarth = (function() {
  var earthRadius = 6371; // km, miles is 3959

  // This function takes in latitude and longitude of two location and
  // returns the distance between them as the crow flies (in miles)
  function getDistance(lat1, lng1, lat2, lng2) {
    var R = earthRadius;
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lng2 - lng1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    //return d;
    return d * 0.62137; // convert to miles
  }

  // Converts numeric degrees to radians
  function toRad(Value)
  {
    return Value * Math.PI / 180;
  }

  return {
    getDistance: getDistance
  };

})();

/* GET list of locations */
module.exports.locationsList = function(req, res) {
  var settings = {};
  settings.location = req.query.loc;
  settings.category_filter = req.query.term;
  settings.sort = req.query.sort;

  var curLat = req.query.curlat;
  var curLng = req.query.curlng;

  request_yelp(settings, function(error, response, body) {
    var all = JSON.parse(body);
    var locations = buildLocationList(all.businesses, curLat, curLng);

    sendJSONresponse(res, 200, locations);
  });
};

var buildLocationList = function(results, lat1, lng1) {
  var locations = [];

  results.forEach(function(loc) {
    var categories = [];
    loc.categories.forEach(function(category) {
      categories.push(category[0]);
    });

    var lat2 = loc.location.coordinate.latitude;
    var lng2 = loc.location.coordinate.longitude;

    locations.push({
      name: loc.name,
      address: loc.location.display_address.join(', '),
      rating: loc.rating,
      categories: categories,
      distance: theEarth.getDistance(lat1, lng1, lat2, lng2)
    });
  });

  return locations;
};


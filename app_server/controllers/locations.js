/* GET 'home' page */
module.exports.homelist = function(req, res){
  renderHomepage(req, res);
};

var renderHomepage = function(req, res, responseBody){
  res.render('locations-list', {
    title: 'GotFood - Find good places to eat!',
    pageHeader: {
      title: 'GotFood',
      strapline: 'Find good places to eat near you!'
    },
    sidebar: "Just select the type of food your looking for and GotFood will find it in your area."
  });
};




/* GET 'home' page */
//module.exports.homelist = function(req, res){
//  res.render('locations-list', {
//    title: 'GotFood - Find good places to eat!',
//    pageHeader: {
//      title: 'GotFood',
//      strapline: 'Find good places to eat near you!'
//    },
//    sidebar: 'Just select the type of food your looking for and GotFood will find it in your area.',
//    locations: [
//      {
//        name: 'Starcups',
//        address: '125 High Street, Reading, RG6 1PS',
//        rating: 4.5,
//        categories: ['Hot drinks', 'Food', 'Premium wifi'],
//        distance: '100m'
//      },
//      {
//        name: 'Cafe Hero',
//        address: '125 High Street, Reading, RG6 1PS',
//        rating: 4,
//        categories: ['Hot drinks', 'Food', 'Premium wifi'],
//        distance: '200m'
//      },
//      {
//        name: 'Burger Queen',
//        address: '125 High Street, Reading, RG6 1PS',
//        rating: 2,
//        categories: ['Food', 'Premium wifi'],
//        distance: '250m'
//      }
//    ]
//  });
//};
//
///* GET 'Location info' page */
//module.exports.locationInfo = function(req, res){
//  res.render('location-info', {
//    title: 'Starcups',
//    pageHeader: {
//      title: 'Starcups'
//    },
//    sidebar: {
//      context: 'GotFood is great.',
//      callToAction: ''
//    },
//    location: {
//      name: 'Starcups',
//      address: '125 High Street, Reading, RG6 1PS',
//      rating: 3,
//      categories: ['Hot drinks', 'Food', 'Premium wifi'],
//      coords: {
//        lat: 51.455041,
//        lng: -0.9690884
//      },
//      latestReview: 'This ia great place.'
//    }
//  });
//
//};

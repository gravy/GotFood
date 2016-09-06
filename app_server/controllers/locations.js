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

<h2>GotFood</h2>
<br/>
GotFood is a demo application using the MEAN stack. It lists 20 restaurants based on location
and cuisine using the Yelp API that are closest to you and gives you the distance from them.
I wanted to do this to learn how geo-location worked.
<br/>
Installation: (You must have nodejs and bower installed)
npm install
bower install
<br/>
Start application:
npm start */* _this will start the app on port 3333_ */*
<br/>
Go to: http://localhost:3333
<br/>
Use a browser that supports geolocation such as Chrome.
The application will ask your permission to use your location. Click yes.

Currently defaults to San Jose on submit without parameters
<br/>
Possible enhancements:
-   Add pagination to get more than 20 restaurants.
-   Add a details page for each location that includes a map and a review process.
-   Allow a selection that finds a location based on current location within in a certain radius.

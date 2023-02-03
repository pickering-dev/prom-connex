<!-- Single page app using React, Express, Express Generator & Node -->

An app to register server time (in epoch seconds) at time of page load, client machine time and work out the difference between the two.

<!-- Pre-startup -->

in order to run this project locally you will need to have NODE installed locally.

<!-- Frontend Startup -->

Download repo > cd 'commex-one' > npm start > http://localhost:3000 should proceed to open
If 'MOST RECENT SERVER TIME' shows no results please follow 'API Startup' and refresh.

<!-- API Startup -->

Download repo > cd 'server' > npm start > http://localhost:9090/metricAPI
This will then return server time in epoch seconds at the time of page load.
Express is located at http://localhost:9090
To view Prometheus metrics http://localhost:9090/metrics
Response time can be seen in the terminal as requests are made.
Due to the speed of these requests the 'loading' screen may only show for less than 1 millisecond (0.4 to 0.8ms) whilst the API process is running .

<!-- Dark Mode -->

In order to switch to dark mode click the moon icon found at the top right of the page.
The default theme is 'light'.

<!-- Reset -->

To reset the count, refresh the page or terminate the node process using 'ctrl + c > (y)' followed by npm start.

<!-- Built With -->

- [React](https://reactjs.org/) - Frontend library
- [Node](https://nodejs.org/en/) - Backend
- [Express](https://expressjs.com/) - API
- [Express Generator](https://expressjs.com/en/starter/generator.html) - API
- [Express Prometheus Middleware](https://www.npmjs.com/package/express-prometheus-middleware) - API Middleware
- [Prometheus Client](https://www.npmjs.com/package/express-prometheus-middleware) - API Client
- [React Count Up](https://www.npmjs.com/package/react-countup) - Frontend counter
- [React Switch](https://www.npmjs.com/package/react-switch) - Frontend switch
- [Moment](https://www.npmjs.com/package/moment) - Frontend date

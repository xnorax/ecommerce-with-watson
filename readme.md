# E-commerce Web app with Watson

In this lab we are using IBM Waston [Personality Insights][documentation] service to get the consumption preferences for a specific twitter user. The idea of the web app here is to get the right gift for your buddy. Enjoy!

## Getting started

1. You need a Bluemix account. If you don't have one, [sign up][sign_up].

2. Download and install the [Nodejs][Node-js].

3. Create your twitter application and save your Keys, and update the .env file.
![twitt](url)

4. Create Personality insight service and copy your credentials and place them the .env file.
![bluemix](url)


## How to run

1. Now you are set, download the project or fork it if you'd like!
2. Open the Node js command propmt, make sure you are on the right project directory `cd 'your-project-path'`.
3. Install the packages used: `npm install`
4. Build the app: `npm start`
5. Run the app: `node app.js`
6. Once you run the app, copy the URL of your local host (e.g `http://localhost:####/`  ) to your browser.


[Node-js]:https://nodejs.org/en/download/
[getting_started]: https://console.bluemix.net/docs/services/watson/index.html#about
[documentation]: https://console.bluemix.net/docs/services/personality-insights/getting-started.html
[create_twitter_app]: https://apps.twitter.com/app/new
[sign_up]: https://console.ng.bluemix.net/registration/

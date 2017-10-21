# E-commerce Web app with Watson
![Gifty](https://github.com/xnorax/eCommerce-with-Watson/blob/master/git_images/webshot_1.PNG)

In this lab, we are using IBM Waston [Personality Insights][documentation] service to get the consumption preferences for a specific twitter user. The idea of the web app here is to get the right gift for your buddy. Enjoy!

## Getting started

#### In IBM Cloud
1. [Sign up][sign_up].
2. From `Catalog`, select `Personality Insights` service.
3. After you create the service, click on `Service credentials` and copy your credentials including `username` and `password`.
![bluemix](https://github.com/xnorax/eCommerce-with-Watson/blob/master/git_images/bluemix.gif)

#### In Twitter Apps
1. [Create New App.][create_twitter_app]
2. After the app is created, copy your `API key` and `secret` from `keys and access tokens section`.
![twitt](https://github.com/xnorax/eCommerce-with-Watson/blob/master/git_images/twitter.gif)

#### In Code Editor
1. Install [Nodejs][Node-js].
2. Download the project and open it in your code editor.
3. Paste your username and password for personality insights.
`var personality_insights = watson.personality_insights({
  username: 'Your username',
  password: 'Your password',
  version_date:'2016-10-19',
  version: 'v3'
});`
4. Paste your twitter key and secret.
`var Twithelper = new Twit({
  consumer_key: 'Your key',
  consumer_secret: 'Your secret',
  app_only_auth: true
})`

Now you are set!
In command prompt, go to your project directory.

`cd 'your-project-path'`

Then, install the required packages by writing:
`npm install`

Now run the app

`node app.js`

copy the link shown (e.g `http://localhost:####/`) to your browser and decide your gift :)


[Node-js]:https://nodejs.org/en/download/
[documentation]: https://console.bluemix.net/docs/services/personality-insights/getting-started.html
[create_twitter_app]: https://apps.twitter.com/app/new
[sign_up]: https://console.ng.bluemix.net/registration/

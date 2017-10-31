# E-commerce Web app with Watson

![Gifty](https://github.com/xnorax/eCommerce-with-Watson/blob/master/git_images/webshot_1.PNG)

In this journey, our server application will get 200 tweets for a specified Twitter handle. These tweets will be analyzed by [Waston Personality Insights][documentation] to understand users’ habits and preferences on an individual level. Based on the resulting analysis, suggested gifts will be presented in a Web UI.

When the reader has completed this journey, they will understand how to:
* Run an application that monitors a Twitter feed.
* Send the tweets to Watson Personality Insights for processing and analysis.
* Present the information in a Node.js web UI.

## Flow

1. User enters a Twitter handle name and click `Find!` button.
2. Tweets are pushed out by Twitter.
3. The app (app.js) processes the tweets.
4. The Watson personality Insights Service performs analysis of consumption needs.
5. The Web UI displays products that matches user consumption needs and preferences.

## Included components

* [Waston Personality Insights][documentation]: Predict personality characteristics, needs and values through written text. Understand your customers’ habits and preferences on an individual level, and at scale.
* [Cloud Foundry](http://cloudfoundry.org/): Build, deploy, and run applications on an open source cloud platform.

## Featured technologies

* [Artificial Intelligence](https://medium.com/ibm-data-science-experience): Artificial intelligence can be applied to disparate solution spaces to deliver disruptive technologies.
* [Node.js](https://nodejs.org/): An open-source JavaScript run-time environment for executing server-side JavaScript code.

# Steps

The setup is done in 3 primary steps.  You will download the code, setup the application and then deploy the code to Bluemix.

1. [Clone the repo](#1-clone-the-repo)
2. [Twitter Requirements](#2-twitter-requirements)
3. [Create Watson Personality Insights service with Bluemix](#3-create-watson-personality-insights-service-with-Bluemix)
4. [Run the application](#4-run-the-application)

### 1. Clone the repo

Click `Clone or download` button. Then, `Download ZIP`

![Clone](https://github.com/xnorax/eCommerce-with-Watson/blob/master/git_images/clone.png)

### 2. Twitter requirements

To get Tweets from a specific handle in this application, it is required to create a Twitter account and a Twitter application.
The Twitter account will be used as the account that gets the tweets from other Twitter users.
* You can create an account on [Twitter](https://twitter.com/signup) or use an existing account.
* Once you have the Twitter account created and verified, log in to [Twitter Dev](https://apps.twitter.com/) and create an application.  
* Select the Keys and Access Tokens tab and copy your `API Key` and `API Secret`.
* In `app.js` file, paste your keys to `consumer_key` and `consumer_secret`:

`var Twithelper = new Twit({
  consumer_key: 'Your key',
  consumer_secret: 'Your secret',
  app_only_auth: true
})`

![Twitter app](https://github.com/xnorax/eCommerce-with-Watson/blob/master/git_images/twitter.gif)

### 3. Create Watson Personality Insights service with Bluemix

1. If you do not already have a Bluemix account, [sign up for Bluemix](https://ibm.biz/clouddaypsu).
2. Download and install the [Cloud Foundry CLI](https://console.bluemix.net/docs/cli/index.html#cli) tool.
3. Log into Bluemix with your account.
4. Create `Personality Insights` service.
  - From the top bar menu, click `Catalog`.
  - On the left menu, select `Watson`.
  - Select `Personality Insights`.
  - Click `Create`.
5. Once the application is created, go into the application and select `Service credentials`.
6. Click `View credentials` to copy your username and password into the code in `app.js`:

`var personality_insights = watson.personality_insights({
  username: 'Your username',
  password: 'Your password',
  version_date:'2016-10-19',
  version: 'v3'
});`

![Watson service](https://github.com/xnorax/eCommerce-with-Watson/blob/master/git_images/bluemix.gif)

### 4. Run the application

1. Open the `manifest.yml` file and change the `name` AND `host` value to a unique application name.

2. Connect to Bluemix in the command line tool and follow the prompts to log in

  ```
  cf login -a https://api.ng.bluemix.net
  ```
3. Push the app to Bluemix.

  ```
  cf push
  ```
4. The application should now be running on Bluemix.  You can access the application URL using the application name you defined in the manifest.yml file with a `.mybluemix.net` appended to it.


[documentation]: https://console.bluemix.net/docs/services/personality-insights/getting-started.html

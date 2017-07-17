This proejct is deprecated and will not be maintained. Feel free to fork and upgrade. - bdougie
 
 [![GitHub issues](https://img.shields.io/github/issues/Bloc/Messenger.svg)](https://github.com/Bloc/Messenger/issues)
 
# Bloc Messenger
 
 This is a project with the sole purpose of being a side hustle.
 - This is not on the Outcomes Roadmap
 - This should be thought of as an Open Source Project in a Private Repo
 - This project is not open to Student contributions at this time
 
 ## Issues/Feature Requests
 
 - GitHub will be the platform to [report issues](https://github.com/bdougie/BlocMessenger/issues/new) and bugs (*PRs are welcomed).
 - Feature can be requested through the [Github Issue creation](https://github.com/bdougie/BlocMessenger/issues/new) as well.
 - Please do not report bugs through the Bloc Platform reporting tools or Phabricator, use GitHub instead. 
 - Feel free to reach to the repo @bdougie for questions
 
 
 ## Setup
 required dependencies:
 - npm 3 or greater
 - node 4.1 or greater
 - [Xcode 8](https://itunes.apple.com/us/app/xcode/id497799835?mt=12) or greater 
 - [Android Studio](https://developer.android.com/studio/index.html) *[Setup](https://medium.com/@deepak.gulati/running-react-native-app-on-the-android-emulator-11bf309443eb#.v0ym11uhg)*
 
 ```
 $ npm install react-native-cli -g
 $ yarn install 
 ```
 
 ## Start the Simulator
 
 ```
 $ react-native run-ios
 $ react-native run-android
 ```
 
 ![sample image](http://i.imgur.com/xVetwhwm.png)
 
 ## Tests
 Tests are using [Jest](https://facebook.github.io/jest/).
 
 Run tests with:
 ```
 $ npm test
 ```
 
 ## Linting
 
 The linter is strict but open to debate. Please open up PR's to the [eslintrc](https://github.com/Bloc/BlocMessenger/blob/master/.eslintrc) to request changes.
 
 ```
 $ npm install eslint -g
 $ eslint
 ```

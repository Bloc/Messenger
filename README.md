[![CircleCI branch](https://circleci.com/gh/Bloc/Messenger.png?circle-token=1cc185a5a8afcf78acc633aeea783507d09e754b/master.svg?maxAge=2592000)](https://circleci.com/dashboard)
[![GitHub issues](https://img.shields.io/github/issues/Bloc/Messenger.svg)](https://github.com/Bloc/Messenger/issues)

[![Twitter](https://img.shields.io/twitter/url/https/github.com/Bloc/Messenger.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=%5Bobject%20Object%5D)
# Bloc Messenger
![master-p](http://www.soulcentraltv.net/wp-content/uploads/2013/02/I-Got-The-Hook-UpbannerH.jpg)

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
- Xcode 7.2.1

```
$ npm install react-native-cli -g
$ npm install 
```

## Start the Simulator

```
$ react-native start ios
$ open ios/BlocMessenger.xcodeproj/
```
Then 
`⌘ + R` or in the Menu `/Product/Run`

![sample image](http://i.imgur.com/xVetwhwm.png)

## Tests

Testing is only limited to Unit tests for now. Consider reading the
  [enzyme](http://airbnb.io/enzyme/docs/api/shallow.html) documentation
  for reference.

```
$ npm test
$ npm run tdd // for test watcher
```

## Building Bloc Messenger for an iOS device

NOTE: This requires a membership to the Apple Developer Program.

If you'd like to run the application on your device, follow these steps:

1. Ensure you're running: `$ react-native start ios`
2. Build a new jsbundle: `$ curl http://localhost:8081/index.ios.bundle -o main.jsbundle`
3. Tweak the `AppDelegate.m` file to use the "OPTION 2" by uncommenting the following line:
  
  ```
  //   jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  ```

4. Plug in your device
5. Select your device from the build targets:
  ![](https://www.dropbox.com/s/crrsy6flwjxz737/Screenshot%202016-04-16%2012.40.12.png?dl=1)
[more info](http://developingjourney.netlify.com/2015/12/20/how-to-test-react-native-on-your-device)

## Linting

The linter is strict but open to debate. Please open up PR's to the [eslintrc](https://github.com/Bloc/BlocMessenger/blob/master/.eslintrc) to request changes.

```
$ npm install eslint -g
$ eslint
```

## API Endpoints

If you plan to add new features to the Messenger, note that there is documentation for API endpoints open to [Students](http://docs.blocapi.apiary.io/#reference/0/credentials) and [Mentors](https://www.bloc.io/apidoc).


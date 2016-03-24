# Bloc Messenger
![master-p](http://www.soulcentraltv.net/wp-content/uploads/2013/02/I-Got-The-Hook-UpbannerH.jpg)

This is a project with the sole purpose of being a side hustle.
- This is not on the Outcomes Roadmap
- This should be thought of as an Open Source Project in a Private Repo
- This project is not open to Student contributions at this time

## Issues/Feature Requests

- Github will be the platform to [report issues](https://github.com/bdougie/BlocMessenger/issues/new) and bugs (*PRs are welcomed).
- Feature can be requested through the [Github Issue creation](https://github.com/bdougie/BlocMessenger/issues/new) as well.
- Please do not report bugs through the Bloc Platform reporting tools or Phabricator, as this is not a sanctioned Bloc app and will not be maintained during regualr develop time. 
- Feel free to reach to the repo owner for questions


## Setup
required dependencies:
- npm 3 or greater
- node 4.1 or greater
- Xcode 7.2.1

```
$ npm install reactive-native-cli -g
$ npm install 
```

## Start the Simulator

```
$ open ios/BlocMessenger.xcodeproj/
```
Then 
`⌘ + R` or in the Menu `/Product/Run`

## Tests

Testing is only limited to Unit tests for now

`$ npm test`

## Linting

The linter is strict but open to debate. Please open up PR's to the [eslintrc](https://github.com/Bloc/BlocMessenger/blob/master/.eslintrc) to request changes.

```
$ npm install eslint -g
$ eslint
```


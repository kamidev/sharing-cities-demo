This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). React scripts have been manually updated to stay current.

## Installing updated versions

Checkout the updated version from github, then run 'npm install'.

NOTE! If there are installation errors related to library "p4-css", go to "node_modules/p4-css" and manually delete the .git folder there. This is a known issue, hopefully the author of p4-css will fix this soon.

## General demo-functionality using thirdparty libraries

### three: https://threejs.org/

3D-animation

### react-embed: https://github.com/streamich/react-embed

Embed interative services with full user interface in React, using supplied templates:

    DailyMotion
    Facebook Video
    Figma
    Gfycat
    Gist
    Google Maps
    imgur
    Instagram
    JSFiddle
    MixCloud
    Replit
    SoundCloud
    Twitch Channel
    Twitch Video
    Twitter Tweet
    Vimeo
    YouTube

Other services can be added by creating your own template.

### react-helmet: https://github.com/nfl/react-helmet

Manipulates HTML header. Can be used to display external widgets.

## Available NPM scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### ´npm run e2e-test"

Runs all functional [Nightwatch tests](https://nightwatchjs.org/) in folder "tests".

Functional tests are useful for different things, including:

- very simple sanity checks of user interface and basic functionality
- checking that calls to external sites work as expected

Currently, only two rudimentary sample tests are implemented.

Nightwatch performs functional tests using actual browsers. By default, uses Chrome.
Additional browsers can be configured and tests can also run headless.

NOTE! To test React apps on localhost, you must first start the application in a separate terminal.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm test`

Launches the default React test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
Note! For this application, default tests currently doesn't work.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

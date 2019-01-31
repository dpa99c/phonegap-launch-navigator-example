Cordova/Phonegap Launch Navigator Example
=========================================

This repo contains example projects illustrating how to use the [Launch Navigator plugin](https://github.com/dpa99c/phonegap-launch-navigator) to launch native navigation apps on iOS, Android, and Windows to get driving directions to a desired location.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Cordova/Phonegap Launch Navigator Example](#cordovaphonegap-launch-navigator-example)
- [Projects](#projects)
- [Building and running](#building-and-running)
  - [SimpleExample and AdvancedExample](#simpleexample-and-advancedexample)
  - [IonicExample, Ionic2Example, Ionic3Example](#ionicexample-ionic2example-ionic3example)
- [Supported platforms](#supported-platforms)
- [Credits](#credits)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
 
# Downloading

To download the example, clone the repo using git:

    $ git clone https://github.com/dpa99c/phonegap-launch-navigator-example.git

# Projects

The repo contains the following example projects in sub-directories:

- SimpleExample - a basic (pure HTML5) example showing how the plugin can be invoked to navigate to a specified destination, with an optionally specified start location.
- AdvancedExample - a more complex (pure HTML5) example which shows how the plugin can be used to launch specific navigation apps and how their input parameters can be tailored.
- IonicExample - a basic example using Ionic 1 framework / Angular 1
- Ionic2Example - a basic example using Ionic 2 framework / Angular 2
- Ionic3Example - a basic example using Ionic 3 framework / Angular 4
- Ionic4Example - a basic example using Ionic 4 framework / Angular 7

# Building and running

The plugin is intended to launch **native** navigation apps and therefore will only work on native mobile platforms (i.e. Android/iOS/Windows).
Note that the plugin will **NOT** work in a browser-emulated Cordova environment, for example by running `ionic serve` or using the [Ripple emulator](https://github.com/ripple-emulator/ripple).

To build and run any of the projects, first open a terminal window and change to the project directory, for example:

    $ cd SimpleExample

## SimpleExample and AdvancedExample
    
Add a platform, for example Android:
    
    $ cordova platform add android

Then build and run the project. The plugins dependencies will be satisfied automatically. For example:

    $ cordova run android
    
## IonicExample, Ionic2Example, Ionic3Example

Since these are ionic-based projects, first install node module dependencies

    $ npm install
    
Add a platform, for example Android:
    
    $ ionic cordova platform add android
        
Then build and run the project, for example

    $ ionic cordova run android      

# Supported platforms

The example projects will run on Android, iOS, Windows Universal (8.1/10) and Windows Phone 8 (8.0/8.1)


# Credits

Thanks to [opadro](https://github.com/opadro) for Windows platform example

License
================

The MIT License

Copyright (c) 2016 Dave Alden /  Working Edge Ltd.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
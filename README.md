Cordova/Phonegap Launch Navigator Example
=================================

This repo contains an example PhoneGap 3 project which illustrates how to use the [Launch Navigator plugin](https://github.com/dpa99c/phonegap-launch-navigator) to launch the native navigation app on iOS (Apple Maps), Android (Google Navigator), and Windows (Bing Maps) to get driving directions to a desired location.


## Contents
* [Downloading](#downloading)
* [Building](#building)
    * [Android](#android)
    * [iOS](#ios)
    * [Windows](#windows)
    * [WP8](#wp8)
    * [Ionic](#ionic)
* [Pre-compiled app](#pre-compiled-app)
* [Credits](#credits)
* [License](#license)
 
# Downloading

To download the example project, clone it using git:

    $ git clone https://github.com/dpa99c/phonegap-launch-navigator-example.git

# Building

The classic Cordova example project is in the `LaunchNavigatorExample` folder.

There's also an `IonicExample` folder which contains an Ionic example project which illustrates how to wrap the plugin API as an AngularJS service.

## Android

To run the Android project either build and run the project using the Phonegap CLI:

    $ cordova run android


## iOS

To run the iOS project either build and run the project using the Phonegap CLI:

    $ cordova run ios

Note: For this to work, you need to build and install the Phonegap ios-deploy project first: `npm install -g ios-deploy`

Or import the project in Xcode and run it from there. The Xcode project is located here:

    LaunchNavigatorExample/platforms/ios

## Windows

To run the Windows project either build and run the project using the Cordova CLI (PhoneGap should work too):

    $ cordova run windows

Note: This will run the app in your Windows 8.1 PC. For this to work, you need at least Visual Studio 2013 Community: http://www.visualstudio.com

Or import the project in Visual Studio 2013 and run it from there. Within Visual Studio, you will be able to choose between Windows Phone 8.1 and Windows 8.1 (PC). The Visual Studio 2013 project is located here:

    LaunchNavigatorExample/platforms/windows/CordovaApp.sln

## WP8

To run the Windows Phone 8.0 project either build and run the project using the Cordova CLI (PhoneGap should work too):

    $ cordova run wp8

Note: This will run the app in your Windows 8.0 or 8.1 phone. For this to work, you need at least Visual Studio 2013 Community: http://www.visualstudio.com

Or import the project in Visual Studio 2013 and run it from there.

	LaunchNavigatorExample/platforms/wp8/LaunchNavigatorExample.sln

## Ionic

The `IonicExample` folder contains an Ionic example project which illustrates how to wrap the plugin API as an AngularJS service. To run it, simply invoke with ionic, for example:

    $ ionic run android

**IMPORTANT:** Note that the plugin will **NOT** work in a browser-emulated Cordova environment, for example by running `ionic serve` or using the [Ripple emulator](https://github.com/ripple-emulator/ripple).
This plugin is intended to launch **native** navigation apps and therefore will only work on native mobile platforms (i.e. Android/iOS/Windows).

# Pre-compiled app
If you're unable to build the project or just want to try it out, here is the project as a pre-built app:

- [Android APK (debug unsigned)](build/LaunchNavigatorExample.apk)
- [iOS IPA (signed for adhoc distribution)](build/LaunchNavigatorExample.ipa)
- [Ionic APK (debug unsigned)](build/IonicExample.apk)

# Credits

Thanks to [opadro](https://github.com/opadro) for Windows platform example

License
================

The MIT License

Copyright (c) 2014 Working Edge Ltd.

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
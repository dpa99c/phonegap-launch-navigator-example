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
* [Running](#running)
* [Credits](#credits)
* [License](#license)
 
# Downloading

To download the example project, clone it using git:

    $ git clone https://github.com/dpa99c/phonegap-launch-navigator-example.git

# Building

The project can be built for running on your local machine as follows:

## Android

To run the Android project either build and run the project using the Phonegap CLI:

    $ phonegap run android


Or import the project in Eclipse and run it from there. The Eclipse project is located here:

    LaunchNavigatorExample/platforms/android


## iOS

To run the iOS project either build and run the project using the Phonegap CLI:

    $ phonegap run ios

Note: For this to work, you need to build and install the Phonegap ios-deploy project first: `npm install -g ios-deploy`

Or import the project in Xcode and run it from there. The Xcode project is located here:

    LaunchNavigatorExample/platforms/ios

## Windows

To run the Windows project either build and run the project using the Cordova CLI (PhoneGap should work too):

    $ cordova run windows

Note: This will run the app in your Windows 8.1 PC or Windows 10 (PC). For this to work, you need at least Visual Studio 2015 Community: http://www.visualstudio.com

Or import the project in Visual Studio 2015 and run it from there. Within Visual Studio, you will be able to choose between Windows Phone 8.1, Windows 8.1 (PC) and Windows 10 (PC) Universal. The Visual Studio 2015 project is located here:

    LaunchNavigatorExample/platforms/windows/CordovaApp.sln

## WP8

To run the Windows Phone 8.0 project either build and run the project using the Cordova CLI (PhoneGap should work too):

    $ cordova run wp8

Note: This will run the app in your Windows 8.0 or 8.1 phone. For this to work, you need at least Visual Studio 2015 Community: http://www.visualstudio.com

Or import the project in Visual Studio 2015 and run it from there.

	LaunchNavigatorExample/platforms/wp8/LaunchNavigatorExample.sln

# Running
If you're unable to build the project or just want to try it out, here is the project as a pre-built app:

- [Android APK (debug unsigned)](build/LaunchNavigatorExample.apk)
- [iOS IPA (signed for adhoc distribution)](build/LaunchNavigatorExample.ipa)

# Credits

Thanks to [opadro](https://github.com/opadro) for Windows platform example

License
================

The MIT License

Copyright (c) 2016 Working Edge Ltd.

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
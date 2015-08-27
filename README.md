# soundcast v1.2
Mac OSX Menubar app to cast system audio to Chromecast.

![](https://dl.dropboxusercontent.com/u/6618408/soundcast.png)

## Installation and usage:
1. Download and install [Soundflower](http://rogueamoeba.com/freebies/soundflower/).
2. Download [soundcast v1.2](https://dl.dropboxusercontent.com/u/6618408/soundcast1.2.zip), unzip it and drop it into your Applications folder.
3. If you want it to start automatically with your computer do [this](http://www.howtogeek.com/206178/mac-os-x-change-which-apps-start-automatically-at-login/).

## Development
- This app has dependencies that only work on NodeJS v0.10 (.38 and over), and uses [Electron](http://electron.atom.io/).
- To package the app, use [electron-packager](https://github.com/maxogden/electron-packager):

```
electron-packager . soundcast --platform=darwin --arch=x64 --version=0.30.6 --icon=icon.icns
```
## Changelog
- 1.2 Added OSX dark mode compatibility.
- 1.1 Added ability to be downloaded and run as an app.

## The MIT License (MIT)
Copyright (c) 2015 Andrés Gottlieb

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

# Soundcast
Mac OS X Menubar app to cast system audio to Chromecast.

![](https://dl.dropboxusercontent.com/u/6618408/soundcast.png)

## Installation and usage:
1. Download and install [Soundflower v2.0b2](https://github.com/mattingalls/Soundflower/releases/download/2.0b2/Soundflower-2.0b2.dmg) (if you have a previous version, follow [this instructions](https://support.shinywhitebox.com/hc/en-us/articles/202751790-Uninstalling-Soundflower) to uninstall it and then install v2.0b2).
2. Download [Soundcast](http://bit.ly/Soundcast), unzip it and drop it into your Applications folder.
3. If you want it to start automatically with your computer do [this](http://www.howtogeek.com/206178/mac-os-x-change-which-apps-start-automatically-at-login/).

## Mac OS X El Capitan

If you upgraded to Mac OS X El Capitan and Soundcast stopped working correctly, you need to upgrade Soundflower to v2.0b2. Just do the following:

1. Uninstall Soundflower following [this instructions](https://support.shinywhitebox.com/hc/en-us/articles/202751790-Uninstalling-Soundflower).
2. Download and install [Soundflower v2.0b2](https://github.com/mattingalls/Soundflower/releases/download/2.0b2/Soundflower-2.0b2.dmg).

Don't forget rebooting your computer between both steps.

## Development
- This app has dependencies that only work on NodeJS v0.10 (.38 and over), and uses [Electron](http://electron.atom.io/).
- To package the app, use [electron-packager](https://github.com/maxogden/electron-packager):

```
electron-packager . soundcast --platform=darwin --arch=x64 --version=0.34.0 --icon=icon.icns
```
## Changelog
- **v1.4 [2015/10/25]:** Fixed bug that didn't allow casting to Chromecasts named using spaces.
- **v1.3 [2015/10/19]:** Added ability to select specific Chromecast if you have more than one. Updated module dependencies.
- **v1.2 [2015/08/26]:** Added OS X dark mode compatibility.
- **v1.1 [2015/07/13]** Added ability to be downloaded and run as an app.

## Known issues
- Unexpected behavior when trying to cast to a Chromecast while it's booting (or just booted). This is an issue in the `chromecast-osx-audio` module dependency.
- Sometimes the default `menubar` cat icon is shown for a few seconds instead of the Chromecast icon when launching Soundcast.

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

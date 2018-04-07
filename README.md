# noisic

Simple YouTube client of electron for trend music.

## Demo

![demo](movie/ezgif-2-10600aa621.gif)

## Download

Please download from releases page.

[releases page](https://github.com/mitubaEX/noisic/releases)

## Usage

### run

```
electron .
```

### packaging

```
electron-packager . noisic --platform=darwin --arch=x64 --icon=icon/icons8-handball-filled-100.icns --version=1.0.0
```

#### for Linux

- Ref
[electron-installer-debian](https://github.com/unindented/electron-installer-debian)

```
brew install fakeroot dpkg
npm install -g electron-installer-debian
electron-packager . noisic --platform=linux --arch=x64 --icon=icon/icons8-handball-filled-100.icns --version=1.0.0
```

## Dependencies

[electron-quick-start](https://github.com/electron/electron-quick-start)

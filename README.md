<div align="center">
    <img src="https://github.com/user-attachments/assets/40e0d134-35cc-40a5-a55a-242d96d037df" style="width: 128px; height:128px"/>
    <h1 align="center"><b>Mintifier Installer</b></h1>
    <p align="center">
        An app bundling tool made with Tauri for Linux Mint.
    </p>
    <p>
        <b>Download for </b>
        Linux
        ( <a href="https://github.com/speeqz1/mintifier-installer/releases">Releases</a> )
    </p>
    <img src="https://github.com/user-attachments/assets/9b05701a-b0f5-4b0a-9f74-2510c6a6ce94"/>
</div>
<br/>

Mintifier Installer is a tool made for preconfiguring bundles of apps and installing them all at once at just the click of a button through a visual interface.

Apps can be easily downloaded by providing the necessary URL links to their repositories or websites and you can easily choose per app what format to download, all managed using a GUI editor for the configuration files or presets.

# Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

# Building the app

To ensure that the app can be built properly and support other Linux distros a Docker container will be used based on Ubuntu (Dockerfile provided in repository).

### Setup

<hr/>
Pull image from Docker Hub:

```sh
docker pull speeqz1/tauri-build-env-ubuntu
```

**OR**

Build your own image (slow):

```sh
docker build -t speeqz1/tauri-build-env-ubuntu:latest .
```
<hr/>

Create a container using the image and create an app folder using the current directory (giving user id's to ensure proper folder ownership):

```sh
docker run -it --name tauri-build-env-ubuntu-container \
    -v "$(pwd):/app" \
    --user "$(id -u):$(id -g)" \
    speeqz1/tauri-build-env-ubuntu
```

**OR**

Attach the current terminal to the stopped container:

```sh
docker start -ai tauri-build-env-ubuntu-container
```

<hr/>

Installing packages and building the app:

```sh
npm install

npm run tauri build
```

### Removal

Remove existing container:

```sh
docker rm -f tauri-build-env-ubuntu-container
```

Remove existing image:

```sh
docker rmi speeqz1/tauri-build-env-ubuntu
```

# Dependencies

### Ubuntu Dependencies

System dependencies:

```
sudo
npm
```

Tauri dependencies:

```
build-essential
curl
wget
file
libssl-dev
libgtk-3-dev
libappindicator3-dev
librsvg2-dev
libwebkit2gtk-4.1-0=2.44.0-2
libwebkit2gtk-4.1-dev=2.44.0-2
libjavascriptcoregtk-4.1-0=2.44.0-2
libjavascriptcoregtk-4.1-dev=2.44.0-2
gir1.2-javascriptcoregtk-4.1=2.44.0-2
gir1.2-webkit2-4.1=2.44.0-2
```

Audio and video codecs dependencies:

```
patchelf

libgstreamer1.0-dev
libgstreamer-plugins-base1.0-dev
libgstreamer-plugins-bad1.0-dev
gstreamer1.0-plugins-base
gstreamer1.0-plugins-good
gstreamer1.0-plugins-bad
gstreamer1.0-plugins-ugly
gstreamer1.0-libav
gstreamer1.0-tools
gstreamer1.0-x
gstreamer1.0-alsa
gstreamer1.0-gl
gstreamer1.0-gtk3
gstreamer1.0-qt5
gstreamer1.0-pulseaudio
```

### NPM Dependencies

dependencies:

```
@tauri-apps/api@^2
@tauri-apps/plugin-opener@^2
@types/node@^22.10.2
react@^18.3.1
react-dom@^18.3.1
react-router-dom@^7.1.1
sass-embedded@^1.83.0
vite-plugin-svgr@^4.3.0
```

devDependencies:

```
@tauri-apps/cli@^2
@types/react@^18.3.1
@types/react-dom@^18.3.1
@vitejs/plugin-react@^4.3.4
typescript@~5.6.2
vite@^6.0.3
```
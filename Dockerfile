FROM debian:bookworm

# Prevent interactive prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive

# Update system and install sudo
RUN apt update

RUN apt install -y \
    sudo

# Create debian user and add to sudo group
RUN useradd -m debian && \
    usermod -aG sudo debian && \
    echo "debian ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Install Node and npm
RUN apt-get update && apt-get install -y \
  ca-certificates \
  curl

ARG NODE_VERSION=22.12.0
ARG NODE_PACKAGE=node-v$NODE_VERSION-linux-x64
ARG NODE_HOME=/opt/$NODE_PACKAGE

ENV NODE_PATH=$NODE_HOME/lib/node_modules
ENV PATH=$NODE_HOME/bin:$PATH

RUN curl https://nodejs.org/dist/v$NODE_VERSION/$NODE_PACKAGE.tar.gz | tar -xzC /opt/

RUN sudo apt install -y \
    npm

# Install tauri dependencies
RUN sudo apt install -y \
    build-essential \
    curl \
    wget \
    file \
    libssl-dev \
    libgtk-3-dev \
    libappindicator3-dev \
    librsvg2-dev

# Create temporary directory for package downloads
RUN mkdir -p /tmp/ubuntu-packages

# Set working directory for package downloads
WORKDIR /tmp/ubuntu-packages

# Download Ubuntu packages for Tauri
RUN wget http://launchpadlibrarian.net/723972773/libwebkit2gtk-4.1-0_2.44.0-0ubuntu0.22.04.1_amd64.deb && \
    wget http://launchpadlibrarian.net/723972761/libwebkit2gtk-4.1-dev_2.44.0-0ubuntu0.22.04.1_amd64.deb && \
    wget http://launchpadlibrarian.net/723972770/libjavascriptcoregtk-4.1-0_2.44.0-0ubuntu0.22.04.1_amd64.deb && \
    wget http://launchpadlibrarian.net/723972746/libjavascriptcoregtk-4.1-dev_2.44.0-0ubuntu0.22.04.1_amd64.deb && \
    wget http://launchpadlibrarian.net/723972735/gir1.2-javascriptcoregtk-4.1_2.44.0-0ubuntu0.22.04.1_amd64.deb && \
    wget http://launchpadlibrarian.net/723972739/gir1.2-webkit2-4.1_2.44.0-0ubuntu0.22.04.1_amd64.deb

RUN wget http://launchpadlibrarian.net/606433947/libicu70_70.1-2ubuntu1_amd64.deb && \
    wget http://launchpadlibrarian.net/595623693/libjpeg8_8c-2ubuntu10_amd64.deb && \
    wget http://launchpadlibrarian.net/587202140/libjpeg-turbo8_2.1.2-0ubuntu1_amd64.deb && \
    wget http://launchpadlibrarian.net/592959859/xdg-desktop-portal-gtk_1.14.0-1build1_amd64.deb

# Install dependencies for the downloaded packages
RUN sudo apt install -y \
    build-essential \
    curl \
    wget \
    file \
    libssl-dev \
    libgtk-3-dev \
    libappindicator3-dev \
    librsvg2-dev

# Install downloaded packages
RUN apt-get install -y ./*.deb

# Reset working directory
WORKDIR /

# Clean up downloaded packages
RUN rm -rf /tmp/ubuntu-packages

# Install additional gstreamer dependencies for audio and video playback
RUN sudo apt install -y \
    patchelf

RUN sudo apt install -y \
    libgstreamer1.0-dev \
    libgstreamer-plugins-base1.0-dev \
    libgstreamer-plugins-bad1.0-dev \
    gstreamer1.0-plugins-base \
    gstreamer1.0-plugins-good \
    gstreamer1.0-plugins-bad \
    gstreamer1.0-plugins-ugly \
    gstreamer1.0-libav \
    gstreamer1.0-tools \
    gstreamer1.0-x \
    gstreamer1.0-alsa \
    gstreamer1.0-gl \
    gstreamer1.0-gtk3 \
    gstreamer1.0-qt5 \
    gstreamer1.0-pulseaudio

# Set up cargo home
ENV CARGO_HOME=/opt/cargo
ENV RUSTUP_HOME=/opt/rustup
ENV PATH="${CARGO_HOME}/bin:${PATH}"

# Install Rust for all users
RUN mkdir -p ${CARGO_HOME} ${RUSTUP_HOME} && \
    chmod 777 ${CARGO_HOME} ${RUSTUP_HOME} && \
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y && \
    chmod -R 777 ${CARGO_HOME} ${RUSTUP_HOME}

# Create app directory with wide permissions
RUN mkdir -p /app && \
    chmod 777 /app

WORKDIR /app

# Default command to start an interactive shell
CMD ["/bin/bash"]
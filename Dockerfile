FROM ubuntu:noble

# Prevent interactive prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive

# Update system and install sudo
RUN apt update

RUN apt install -y \
    sudo

RUN sudo apt update

# Remove ubuntu user password
RUN echo "ubuntu ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

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

RUN sudo apt install -y \
    libwebkit2gtk-4.1-0=2.44.0-2 \
    libwebkit2gtk-4.1-dev=2.44.0-2 \
    libjavascriptcoregtk-4.1-0=2.44.0-2 \
    libjavascriptcoregtk-4.1-dev=2.44.0-2 \
    gir1.2-javascriptcoregtk-4.1=2.44.0-2 \
    gir1.2-webkit2-4.1=2.44.0-2

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
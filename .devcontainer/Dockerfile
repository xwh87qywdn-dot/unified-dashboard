FROM mcr.microsoft.com/devcontainers/base:ubuntu

SHELL ["/bin/bash", "-lc"]

RUN apt-get update \
  && apt-get install -y --no-install-recommends postgresql-client ca-certificates curl git lsof \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

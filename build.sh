#!/usr/bin/env bash

git pull
pebble clean
pebble build
pebble install --cloudpebble
pebble logs --cloudpebble

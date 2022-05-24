#!/bin/sh
npm run build
rm -rf ../notebackend/build
cp -r build ../notebackend/
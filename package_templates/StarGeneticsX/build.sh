#!/bin/bash

## this is configurable
export PKG_NAME=7QBW_TUTORIAL
export PKG_SAMPLE=tutorial

export PKG_DIR=packages/$PKG_NAME
export OUT_DIR=dist/StarCompiled/$PKG_NAME/
mkdir -p $OUT_DIR/SGGWT
cp -R ../stargenetics_gwt_java/* $OUT_DIR/SGGWT
cp -R $PKG_DIR/* $OUT_DIR


rm -fr prebuild
mkdir prebuild
cp -r src/* prebuild
cat $PKG_DIR/main.js | sed "s/{PKG_NAME}/$PKG_NAME/g" | sed "s/{PKG_SAMPLE}/$PKG_SAMPLE/g" > prebuild/main.js
cp $PKG_DIR/build.js prebuild/build.js

r.js -o prebuild/build.js
cat prebuild/demo_loader.prefix build/main.js prebuild/demo_loader.suffix | grep -v "^//\# sourceMappingURL" > prebuild/main.min.js
cat $PKG_DIR/index.html | sed "s/{PKG_NAME}/$PKG_NAME/g" > $OUT_DIR/index.html

cp prebuild/main.min.js $OUT_DIR

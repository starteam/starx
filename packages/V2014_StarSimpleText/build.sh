#!/bin/bash

export PKG_DIR=packages/V2014_StarSimpleText
export OUT_DIR=dist/StarCompiled/V2014_StarSimpleText/

mkdir -p $OUT_DIR
rm -fr prebuild
mkdir prebuild
cp -r src/* prebuild
cp $PKG_DIR/main.js prebuild/main.js
cp $PKG_DIR/build.js prebuild/build.js

r.js -o prebuild/build.js
cat prebuild/demo_loader.prefix build/main.js prebuild/demo_loader.suffix | grep -v "^//\# sourceMappingURL" > prebuild/main.min.js
cp $PKG_DIR/index.html $OUT_DIR
cp prebuild/main.min.js $OUT_DIR

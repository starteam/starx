#!/bin/bash

export PKG_DIR=packages/tutorial
export OUT_DIR=dist/StarCompiled/V20140407_TUTORIAL/
mkdir -p $OUT_DIR/SGGWT
cp -R ../stargenetics_gwt_java/* $OUT_DIR/SGGWT
cp -R packages/tutorial/* $OUT_DIR

rm -fr prebuild
mkdir prebuild
cp -r src/* prebuild
cp $PKG_DIR/SGC.js prebuild/SGC.js
cp $PKG_DIR/build.js prebuild/build.js

r.js -o prebuild/build.js
cat prebuild/demo_loader.prefix build/SGC.js prebuild/demo_loader.suffix > prebuild/SGC.min.js
cp prebuild/SGC.min.js $OUT_DIR

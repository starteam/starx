#!/bin/bash

export PKG_NAME=OngoingCompiled_TUTORIAL

export UGLIFYJS=/usr/local/lib/node_modules/alloy/node_modules/uglify-js/bin/uglifyjs
export RJS=r.js
export PKG_DIR=packages/$PKG_NAME
export OUT_DIR=dist/StarCompiled/$PKG_NAME/
export DIST_DIR=../StarX-compiled/$OUT_DIR

mkdir -p $OUT_DIR/SGGWT
cp -R ../stargenetics_gwt_java/* $OUT_DIR/SGGWT
cp -R packages/$PKG_NAME/* $OUT_DIR

rm -fr prebuild
mkdir prebuild
cp -r src/* prebuild
cp $PKG_DIR/SGC.js prebuild/SGC.js
cp $PKG_DIR/build.js prebuild/build.js

$RJS -o prebuild/build.js
cat prebuild/demo_loader.prefix build/SGC.js prebuild/demo_loader.suffix > prebuild/SGC.min.js
cp prebuild/SGC.min.js $OUT_DIR

cp -r $OUT_DIR $DIST_DIR
$UGLIFYJS $OUT_DIR/SGC.min.js --source-map $DIST_DIR/SGC.min.map -m --stats -o $DIST_DIR/SGC.min.js
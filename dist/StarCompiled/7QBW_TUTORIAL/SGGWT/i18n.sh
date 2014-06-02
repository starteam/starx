#!/bin/bash

java -cp ../star_xls2i18_java/bin/:../star_xls2i18_java/lib/poi-3.2-FINAL-20081019.jar xls.MessagesBuilder -json ../stargenetics_java/src/StarGenetics_Properties_en.xls src/star/genetics/client/messages.properties
mkdir -p war/stargenetics_gwt_java/messages
cp src/star/genetics/client/messages*.json war/stargenetics_gwt_java/messages



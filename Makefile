#!/bin/make

copy:
	mkdir -p dist
	cp -R ../starorf_html/src/* dist
	# order is important copy StarX code last
	cp -R src/* dist

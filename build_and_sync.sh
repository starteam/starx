#!/bin/bash

./build_tutorial.sh ; rsync -avr dist/ root@starx.mit.edu:/home/starx/www

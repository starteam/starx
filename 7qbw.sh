#!/bin/bash

kinit ceraj/root
./packages/7QBW_DistanceMap/build.sh	
./packages/7QBW_TUTORIAL/build.sh
./packages/7QBW_EX1/build.sh		
./packages/7QBW_Text/build.sh
./packages/7QBW_EX5/build.sh
rsync -avr dist/ root@starx.mit.edu:/home/starx/www


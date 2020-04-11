#!/bin/sh

root_dir="/var/www/git/projects/Corona_Virus/"

cd ${root_dir}

rm -rf build/
mkdir -p build/js build/css/

coffee -cM -o build/js/ src/covid_data.coffee
cp src/index.html build/
cp src/css/*.css build/css/
cp src/js/* build/js/

cp node_modules/tablesort/dist/tablesort.min.js build/js/
cp node_modules/tablesort/dist/sorts/*.js build/js/


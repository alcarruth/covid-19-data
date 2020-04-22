#!/bin/sh

root_dir="/var/www/git/projects/Corona_Virus/"

cd ${root_dir}

rm -rf build/
mkdir -p build/js build/css/

coffee -cM -o build/js/ src/covid_data.coffee
coffee -cM -o build/js/ src/csse_covid_19_data_source.coffee
coffee -cM -o build/js/ src/population_data_source.coffee

coffee bin/build.coffee > build/index.html
#cp src/index.html build/
cp src/css/*.css build/css/
cp src/js/* build/js/

cp node_modules/csvtojson/browser/csvtojson.min.js build/js/
cp node_modules/csvtojson/browser/browser.js build/js/

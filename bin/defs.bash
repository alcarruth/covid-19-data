#!/bin/bash

. bin/buildrc

cd ${package_root}

command="${1}";

function run {
    "${1}";
}

function clean {
    rm -rf build/ browser/
    mkdir -p build/js build/css/ browser/js browser/css
}

function build_js {
    coffee -c -o build/js/ src/coffee/covid_19_data.coffee
    coffee -c -o build/js/ src/coffee/csse_covid_19_data.coffee
    coffee -c -o build/js/ src/coffee/population_data.coffee
}

function build_js_map {
    coffee -cM -o build/js/ src/coffee/covid_19_data.coffee
    coffee -cM -o build/js/ src/coffee/csse_covid_19_data.coffee
    coffee -cM -o build/js/ src/coffee/population_data.coffee
}

function build_css {
    cat \
        src/css/reset.css \
        src/css/table_style_simple.css \
        src/css/table_widths.css \
        src/css/style.css \
        > build/css/style.css
    cp src/css/dark_colors.css build/css
    cp src/css/light_colors.css build/css
}

function browserify {
  node node_modules/browserify/bin/cmd.js $@
}

function build_browser {
    cp build/css/* browser/css/
    browserify build/js/covid_19_data.js > browser/js/covid_19_data.js
    browserify build/js/population_data.js > browser/js/population_data.js
    browserify --exclude node-fetch build/js/csse_covid_19_data.js > browser/js/csse_covid_19_data.js
}

function build_index {
    coffee bin/build_index
    ln -s index_links.html browser/index.html
}

function build {
    clean;
    build_js;
    #build_js_map;
    build_css;
    build_browser;
    build_index;
}




#!/usr/bin/env coffee
#
# package Corona_Virus
# bin/build.coffee
#

fs = require('fs')
coffee = require('coffeescript')
nunjucks = require('nunjucks')

light_style = fs.readFileSync('./src/css/light_colors.css', 'utf8')
dark_style = fs.readFileSync('./src/css/dark_colors.css', 'utf8')

index_html_template = fs.readFileSync('./src/index.html', 'utf8')
index_html = nunjucks.renderString(index_html_template, { light_style, dark_style })

#fs.writeFileSync('./build/index.html', index_html)
console.log index_html


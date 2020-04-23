#/bin/sh

url="https://datausa.io/api/data?drilldowns=State&measures=Population&year=latest"

curl $url

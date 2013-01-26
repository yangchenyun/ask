#!/bin/bash
#:Tital: install.sh
#:Synopsis: install.sh
#:Date: 2013-01-26
#:Version: 1.0
#:Author: lovvvve
#:Mail: lovvvve@gmail.com
#:Options:

node_js_url=http://nodejs.org/dist/v0.8.18/node-v0.8.18.tar.gz
node_js_file=`echo $node_js_url | awk -F '/' '{print $NF}'`
node_js_dir=`echo $node_js_file | awk -F '.tar' '{print $1}'`

if [ $(id -u) != "0" ]; then
    echo -e "Error: You must be root to run this script."
    exit 1
fi

which npm &>/dev/null
if [ $? -gt 0 ]; then
    echo -e "Error:npm node not found,download now......"
    cd /opt/
    wget $node_js_url
    tar xf $node_js_file
    cd $node_js_dir
    ./configure && make && make install

fi

which ask &>/dev/null
if [ $? -eq 0 ] ;then
    echo "ask is exist,you need rename our ask name:"
    read -p "input newname:" newname
    echo $newname
    mv bin/ask bin/$newname
fi
cd /opt/ask/
npm install

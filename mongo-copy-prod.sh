#!/usr/bin/env bash
URI=$(head -n 1 .prod.env | sed -n 's/^CONNECTION_STRING=*//p')

mongo triliporra --eval "db.dropDatabase()"
mongodump --uri $URI
mv dump/admin dump/triliporra
mongorestore
rm -rf dump/

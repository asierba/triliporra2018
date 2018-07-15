#!/usr/bin/env bash
URI=$(head -n 1 .prod.env | sed -n 's/^CONNECTION_STRING=*//p')
timestamp=$(date +%s)

mongo triliporra --eval "db.dropDatabase()"
mongodump --uri ${URI}
mkdir -p backups/${timestamp}
cp -r dump/ backups/${timestamp}
mv dump/heroku_mzdd9pzd dump/triliporra
mongorestore
rm -rf dump/

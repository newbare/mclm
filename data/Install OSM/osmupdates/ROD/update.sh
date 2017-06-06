#!/bin/bash

export JAVACMD_OPTIONS="-Dhttp.proxyHost=172.22.200.10 -Dhttp.proxyPort=3128 -Djava.io.tmpdir=/home/apolo/osm/updates/tmp -Xmx1G -server"
export JAVA_OPTS="-Dhttp.proxyHost=172.22.200.10 -Dhttp.proxyPort=3128"

../../osmosis/bin/osmosis -v 3 --rri workingDirectory=. --wxc ./update.osm.gz

nice gzip -d -c ./update.osm.gz | nice ../../osmosis/bin/osmosis --read-xml-change file=/dev/stdin --simplify-change --write-xml-change file=- | nice gzip -9 -c > ./update.unique.osm.gz


osm2pgsql --append --latlong  --extra-attributes --keep-coastlines --number-processes 4  --verbose  --hstore --slim --cache 10000 --database osm --username postgres --host 127.0.0.1 --style ../default.style ./update.unique.osm.gz


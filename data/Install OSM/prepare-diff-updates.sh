#!/bin/bash

export JAVACMD_OPTIONS="-Djava.io.tmpdir=/opt/osm/osmupdates/tmp" 

rm update.osm.gz
rm update.unique.osm.gz

/opt/osm/sources/osmosis/bin/osmosis  --rrii workingDirectory=. 

wget http://ftp5.gwdg.de/pub/misc/openstreetmap/planet.openstreetmap.org/replication/day/state.txt





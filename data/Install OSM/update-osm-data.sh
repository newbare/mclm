#!/bin/bash


/usr/local/bin/osm2pgsql --number-processes 8 --flat-nodes /opt/osm/data/osm_flat_nodes.db  --latlong --verbose --append --hstore --slim --cache 20000 --database osm --username postgres --host 127.0.0.1 --style /opt/osm/data/default.style /opt/osm/data/africa-latest.osm.pbf




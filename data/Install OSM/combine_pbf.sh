#!/bin/bash


../osmosis/bin/osmosis --rb file="pbffiles/south-america-latest.osm.pbf" --rb  file="pbffiles/central-america-latest.osm.pbf" --m --wb file="pbffiles/01.pbf"

../osmosis/bin/osmosis --rb file="pbffiles/north-america-latest.osm.pbf" --rb file="pbffiles/01.pbf" --m --wb file="pbffiles/02.pbf"

rm -f pbffiles/01.pbf

../osmosis/bin/osmosis --rb file="pbffiles/antarctica-latest.osm.pbf" --rb file="pbffiles/02.pbf" --m --wb file="pbffiles/03.pbf"

rm -f pbffiles/02.pbf

../osmosis/bin/osmosis --rb file="pbffiles/africa-latest.osm.pbf" --rb file="pbffiles/03.pbf" --m --wb file="pbffiles/04.pbf"

rm -f pbffiles/03.pbf

../osmosis/bin/osmosis --rb file="pbffiles/australia-oceania-latest.osm.pbf" --rb file="pbffiles/04.pbf" --m --wb file="pbffiles/world.pbf"

rm -f pbffiles/04.pbf




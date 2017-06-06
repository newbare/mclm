#!/bin/bash


/usr/local/pgsql/bin/shp2pgsql -g geom -s 4326 -I -D ./water-polygons-split-4326/water_polygons.shp layers.ocean | /usr/local/pgsql/bin/psql -U postgres -h localhost -d osm


/usr/local/pgsql/bin/shp2pgsql -g geom -s 4326 -I -D ./land-polygons-split-4326/land_polygons.shp layers.land  | /usr/local/pgsql/bin/psql -U postgres -h localhost -d osm


/usr/local/pgsql/bin/shp2pgsql -g geom -s 4326 -I -D ./ne_10m_admin_1_states_provinces layers.admin1_states | /usr/local/pgsql/bin/psql -U postgres -h localhost -d osm


/usr/local/pgsql/bin/shp2pgsql -g geom -s 4326 -I -D ./ne_10m_admin_0_countries.shp layers.admin0_countries | /usr/local/pgsql/bin/psql -U postgres -h localhost -d osm

/usr/local/pgsql/bin/shp2pgsql -g geom -s 4326 -I -D ./ne_10m_time_zones.shp layers.timezones | /usr/local/pgsql/bin/psql -U postgres -h localhost -d osm

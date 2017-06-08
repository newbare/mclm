#!/bin/bash

#mkdir ./boundaries


echo "Downloading land-polygons-split-4326.zip..."
wget -c http://data.openstreetmapdata.com/land-polygons-complete-4326.zip -O ./boundaries/land-polygons-split-4326.zip

echo "Downloading water-polygons-split-4326.zip..."
wget -c http://data.openstreetmapdata.com/water-polygons-split-4326.zip -O ./boundaries/water-polygons-split-4326.zip

echo "Downloading ne_10m_admin_1_states_provinces.zip..."
wget -c http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_admin_1_states_provinces.zip -O ./boundaries/ne_10m_admin_1_states_provinces.zip

echo "Downloading ne_10m_admin_0_countries.zip..."
wget -c http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_admin_0_countries.zip -O ./boundaries/ne_10m_admin_0_countries.zip

cd ./boundaries/

unzip ne_10m_admin_1_states_provinces.zip
unzip ne_10m_admin_0_countries.zip

unzip water-polygons-split-4326.zip
unzip land-polygons-split-4326.zip

export PGPASSWORD=admin


echo "Importing land-polygons-split-4326.zip..."
shp2pgsql -g geom -s 4326 -I -D land-polygons-split-4326/land_polygons.shp layers.land | psql -U postgres -h localhost -d osm

echo "Importing water-polygons-split-4326.zip..."
shp2pgsql -g geom -s 4326 -I -D water-polygons-split-4326/water_polygons.shp layers.ocean | psql -U postgres -h localhost -d osm

echo "Importing ne_10m_admin_0_countries.shp..."
shp2pgsql -g geom -s 4326 -I -D ne_10m_admin_0_countries layers.admin0_countries | psql -U postgres -h localhost -d osm

echo "Importing ne_10m_admin_1_states_provinces.shp..."
shp2pgsql -g geom -s 4326 -I -D ne_10m_admin_1_states_provinces layers.admin1_states | psql -U postgres -h localhost -d osm


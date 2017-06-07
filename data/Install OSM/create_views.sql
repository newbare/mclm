/*
----------------- LINHAS -----------------------
*/


drop materialized view  if exists layers."highway-label";
create materialized view layers."highway-label" AS (
  SELECT osm_id, way,name,highway, 
    CASE WHEN oneway IN ('yes','true','1') THEN 'yes'::text END AS oneway
  FROM planet_osm_line
  WHERE "highway" IS NOT NULL
  AND ("name" IS NOT NULL OR "oneway" IS NOT NULL)
  ORDER BY osm_id ASC 
);
CREATE INDEX "highway-label_way_idx" ON layers."highway-label" USING gist (way);
CREATE INDEX "highway-label_id_idx" ON layers."highway-label" USING btree (osm_id);

drop materialized view  if exists layers."route-tunnels";
create materialized view layers."route-tunnels" AS ( 
  SELECT osm_id, way,highway FROM planet_osm_line 
  WHERE highway IN
  ( 'motorway', 'motorway_link', 'trunk', 'trunk_link', 
    'primary', 'primary_link', 'secondary', 'secondary_link',
    'tertiary', 'tertiary_link', 'residential', 'unclassified' )
  AND tunnel IN ( 'yes', 'true', '1' )
  ORDER BY osm_id);
CREATE INDEX "route-tunnels_way_idx" ON layers."route-tunnels" USING gist (way);
CREATE INDEX "route-tunnels_id_idx" ON layers."route-tunnels" USING btree (osm_id);


drop materialized view  if exists layers."route-line";
create materialized view layers."route-line" AS ( 
  SELECT osm_id, way,highway,aeroway,
    case when tunnel IN ( 'yes', 'true', '1' ) then 'yes'::text
      else 'no'::text end as tunnel,
    case when service IN ( 'parking_aisle',
      'drive-through','driveway' ) then 'INT-minor'::text
      else service end as service
  FROM planet_osm_line
  WHERE highway in ( 'motorway', 'motorway_link',
    'trunk', 'trunk_link', 'primary', 'primary_link',
    'secondary', 'secondary_link', 'tertiary', 'tertiary_link', 
    'residential', 'unclassified', 'road', 'service',
    'pedestrian', 'raceway', 'living_street' )
  OR "aeroway" IN ('apron','runway','taxiway')
  ORDER BY osm_id);
CREATE INDEX "route-line_way_idx" ON layers."route-line" USING gist (way);
CREATE INDEX "route-line_id_idx" ON layers."route-line" USING btree (osm_id);



drop materialized view  if exists layers."route-fill";
create materialized view layers."route-fill" AS ( 
  SELECT osm_id, way, highway, horse, bicycle, foot, 
    aeroway,
    case when tunnel in ('yes', 'true', '1')
      then 'yes'::text
      else tunnel end as tunnel,
    case when bridge in ('yes','true','1','viaduct')
      then 'yes'::text else bridge end as bridge,
    case when railway in ('spur','siding')
      or (railway='rail' and service in ('spur','siding','yard'))
      then 'spur-siding-yard'::text else railway
      end as railway,
    case when service in 
      ('parking_aisle', 'drive-through', 'driveway')
      then 'INT-minor'::text else service 
      end as service
  FROM planet_osm_line
  WHERE highway IS NOT NULL
    OR aeroway IN ( 'runway','taxiway' )
    OR railway IN ( 'light_rail', 'narrow_gauge', 'funicular',
      'rail', 'subway', 'tram', 'spur', 'siding', 'platform',
      'disused', 'abandoned', 'construction', 'miniature' )
  ORDER BY osm_id);
CREATE INDEX "route-fill_way_idx" ON layers."route-fill" USING gist (way);
CREATE INDEX "route-fill_id_idx" ON layers."route-fill" USING btree (osm_id);


drop materialized view  if exists layers."route-bridge-5";
create materialized view layers."route-bridge-5" AS ( 
  SELECT osm_id, way,highway,railway,aeroway,tunnel
  FROM planet_osm_line
  WHERE ( "highway" IS NOT NULL
  OR "railway" IS NOT NULL
  OR "aeroway" IN ('apron','runway','taxiway') )
  AND bridge IN ('yes','true','1','viaduct')
  AND layer = '5'
  ORDER BY osm_id asc
 );
CREATE INDEX "route-bridge-5_way_idx" ON layers."route-bridge-5" USING gist (way);
CREATE INDEX "route-bridge-5_id_idx" ON layers."route-bridge-5" USING btree (osm_id);

drop materialized view  if exists layers."route-bridge-4";
create materialized view layers."route-bridge-4" AS ( 
  SELECT osm_id, way,highway,railway,aeroway,tunnel
  FROM planet_osm_line
  WHERE ( "highway" IS NOT NULL
  OR "railway" IS NOT NULL
  OR "aeroway" IN ('apron','runway','taxiway') )
  AND bridge IN ('yes','true','1','viaduct')
  AND layer = '4'
  ORDER BY osm_id asc
 );
CREATE INDEX "route-bridge-4_way_idx" ON layers."route-bridge-4" USING gist (way);
CREATE INDEX "route-bridge-4_id_idx" ON layers."route-bridge-4" USING btree (osm_id);


drop materialized view  if exists layers."route-bridge-3";
create materialized view layers."route-bridge-3" AS ( 
  SELECT osm_id, way,highway,railway,aeroway,tunnel
  FROM planet_osm_line
  WHERE ( "highway" IS NOT NULL
  OR "railway" IS NOT NULL
  OR "aeroway" IN ('apron','runway','taxiway') )
  AND bridge IN ('yes','true','1','viaduct')
  AND layer = '3'
  ORDER BY osm_id asc
 );
CREATE INDEX "route-bridge-3_way_idx" ON layers."route-bridge-3" USING gist (way);
CREATE INDEX "route-bridge-3_id_idx" ON layers."route-bridge-3" USING btree (osm_id);


drop materialized view  if exists layers."route-bridge-2";
create materialized view layers."route-bridge-2" AS ( 
  SELECT osm_id, way,highway,railway,aeroway,tunnel
  FROM planet_osm_line
  WHERE ( "highway" IS NOT NULL
  OR "railway" IS NOT NULL
  OR "aeroway" IN ('apron','runway','taxiway') )
  AND bridge IN ('yes','true','1','viaduct')
  AND layer = '2'
  ORDER BY osm_id asc
 );
CREATE INDEX "route-bridge-2_way_idx" ON layers."route-bridge-2" USING gist (way);
CREATE INDEX "route-bridge-2_id_idx" ON layers."route-bridge-2" USING btree (osm_id);

drop materialized view  if exists layers."route-bridge-1";
create materialized view layers."route-bridge-1" AS ( 
  SELECT osm_id, way,highway,railway,aeroway,tunnel
  FROM planet_osm_line
  WHERE ( "highway" IS NOT NULL
  OR "railway" IS NOT NULL
  OR "aeroway" IN ('apron','runway','taxiway') )
  AND bridge IN ('yes','true','1','viaduct')
  AND layer = '1'
  ORDER BY osm_id asc
 );
CREATE INDEX "route-bridge-1_way_idx" ON layers."route-bridge-1" USING gist (way);
CREATE INDEX "route-bridge-1_id_idx" ON layers."route-bridge-1" USING btree (osm_id);


drop materialized view  if exists layers."route-bridge-0";
create materialized view layers."route-bridge-0" AS ( 
  SELECT osm_id, way,highway,railway,aeroway,tunnel
  FROM planet_osm_line
  WHERE ( "highway" IS NOT NULL
  OR "railway" IS NOT NULL
  OR "aeroway" IN ('apron','runway','taxiway') )
  AND bridge IN ('yes','true','1','viaduct')
  AND (layer IS NULL OR layer = '0')
  ORDER BY osm_id asc
 );
 CREATE INDEX "route-bridge-0_way_idx" ON layers."route-bridge-0" USING gist (way);
 CREATE INDEX "route-bridge-0_id_idx" ON layers."route-bridge-0" USING btree (osm_id);
 
/*
----------------- PONTOS -----------------------
*/

 
drop materialized view  if exists layers."placenames-medium";
create materialized view layers."placenames-medium" AS ( 
  SELECT osm_id, way,place,name
  FROM planet_osm_point
  WHERE place IN ('city','metropolis','town','large_town','small_town')
);
CREATE INDEX "placenames-medium_way_idx" ON layers."placenames-medium" USING gist (way);
CREATE INDEX "placenames-medium_id_idx" ON layers."placenames-medium" USING btree (osm_id);

/*
----------------- POLIGONOS -----------------------
*/

/*
drop materialized view  if exists layers."estados";
create materialized view layers."estados" AS ( SELECT osm_id, "name", ref, way_area,tags->'flag' as flag, way FROM planet_osm_polygon
          WHERE place = 'state' order by osm_id);
CREATE INDEX "estados_way_idx" ON layers."estados" USING gist (way);
CREATE INDEX "estados_id_idx" ON layers."estados" USING btree (osm_id);

drop materialized view  if exists layers."parking-area";
create materialized view layers."parking-area" AS (
  SELECT osm_id, way,amenity 
  FROM planet_osm_polygon
  WHERE amenity = 'parking'
);
CREATE INDEX "parking-area_way_idx" ON layers."parking-area" USING gist (way);
CREATE INDEX "parking-area_id_idx" ON layers."parking-area" USING btree (osm_id);
*/

drop materialized view  if exists layers."forest";
create materialized view layers."forest" AS ( SELECT osm_id,"natural",way_area, way, landuse, (CASE 
            WHEN way_area >= 10000000 THEN 'huge'
            WHEN way_area >= 1000000 THEN 'large'
            WHEN way_area >= 100000 THEN 'medium'
            ELSE 'small' END) AS size FROM planet_osm_polygon
          WHERE "natural" IN ('wood') OR "landuse" IN ('forest','wood')
          ORDER BY osm_id ASC );
CREATE INDEX "forest_way_idx" ON layers."forest" USING gist (way);
CREATE INDEX "forest_id_idx" ON layers."forest" USING btree (osm_id);

drop materialized view  if exists layers."route-turning-circles";
create materialized view layers."route-turning-circles" AS ( SELECT osm_id, highway,way FROM planet_osm_point
  WHERE "highway" = 'turning_circle' );
CREATE INDEX "route-turning-circles_way_idx" ON layers."route-turning-circles" USING gist (way);
CREATE INDEX "route-turning-circles_id_idx" ON layers."route-turning-circles" USING btree (osm_id);

drop materialized view  if exists layers."park";
create materialized view layers."park" AS ( SELECT landuse,osm_id,way,leisure,name,way_area, tags->'sport' as sport, (CASE 
            WHEN way_area >= 10000000 THEN 'huge'
            WHEN way_area >= 1000000 THEN 'large'
            WHEN way_area >= 100000 THEN 'medium'
            ELSE 'small' END) AS size  FROM planet_osm_polygon
          WHERE "leisure" IN ('dog_park', 'golf_course', 'pitch', 'park',
            'playground', 'garden', 'common')
            OR "landuse" IN ('allotments', 'cemetery','recreation_ground', 'village_green')
          ORDER BY z_order asc );
CREATE INDEX "park_way_idx" ON layers."park" USING gist (way);
CREATE INDEX "park_id_idx" ON layers."park" USING btree (osm_id);


drop materialized view  if exists layers."grass";
create materialized view layers."grass" AS ( SELECT osm_id, way,landuse, (CASE 
            WHEN way_area >= 10000000 THEN 'huge'
            WHEN way_area >= 1000000 THEN 'large'
            WHEN way_area >= 100000 THEN 'medium'
            ELSE 'small' END) AS size FROM planet_osm_polygon
          WHERE "landuse" IN ('grass', 'greenfield', 'meadow')
            OR "natural" IN ('fell', 'heath', 'scrub')
          ORDER BY osm_id ASC 
        );
CREATE INDEX "grass_way_idx" ON layers."grass" USING gist (way);
CREATE INDEX "grass_id_idx" ON layers."grass" USING btree (osm_id);

drop materialized view  if exists layers."building";
create materialized view layers."building" AS ( 
  SELECT osm_id, way,building,aeroway
  FROM planet_osm_polygon
  WHERE ("building" IS NOT NULL
  AND "building" != 'no')
  OR "aeroway" IN ('terminal')
  ORDER BY osm_id ASC 
);
CREATE INDEX "building_way_idx" ON layers."building" USING gist (way);
CREATE INDEX "building_id_idx" ON layers."building" USING btree (osm_id);


drop materialized view if exists layers."beach";
create materialized view layers."beach" AS ( 
  SELECT osm_id, way,"natural"
  FROM planet_osm_polygon
  WHERE "natural" = 'beach'
  ORDER BY osm_id ASC
);
CREATE INDEX "beach_way_idx" ON layers."beach" USING gist (way);
CREATE INDEX "beach_id_idx" ON layers."beach" USING btree (osm_id);


drop materialized view  if exists layers."amenity-areas";
create materialized view layers."amenity-areas" AS (
  SELECT osm_id, way,amenity FROM planet_osm_polygon
  WHERE amenity IN ('hospital','college','school','university') 
  AND (building IS NULL OR building NOT IN ('no'))
  order by osm_id
);
CREATE INDEX "amenity-areas_way_idx" ON layers."amenity-areas" USING gist (way);
CREATE INDEX "amenity-areas_id_idx" ON layers."amenity-areas" USING btree (osm_id);


drop materialized view  if exists layers."agriculture";
create materialized view layers."agriculture" AS ( 
  SELECT osm_id, way,landuse FROM planet_osm_polygon
  WHERE "landuse" IN ('allotments','farm','farmland','farmyard','orchard','vineyard')
  ORDER BY osm_id ASC );
CREATE INDEX "agriculture_way_idx" ON layers."agriculture" USING gist (way);
CREATE INDEX "agriculture_id_idx" ON layers."agriculture" USING btree (osm_id);


drop materialized view  if exists layers."aero-poly";
create materialized view layers."aero-poly" AS ( 
  SELECT osm_id, way,aeroway 
  FROM planet_osm_polygon
  WHERE "aeroway" IN ('apron','runway','taxiway','helipad')
  ORDER BY osm_id ASC );
CREATE INDEX "aero-poly_way_idx" ON layers."aero-poly" USING gist (way);
CREATE INDEX "aero-poly_id_idx" ON layers."aero-poly" USING btree (osm_id);


drop materialized view  if exists layers."water-outline";
create materialized view layers."water-outline" AS ( 
  SELECT osm_id, "natural", "landuse", "waterway", "way"
  FROM planet_osm_polygon
  WHERE "natural" IN ('lake','water')
  OR "waterway" IN ('canal','mill_pond','riverbank')
  OR "landuse" IN ('basin','reservoir','water')
  ORDER BY osm_id ASC
);
CREATE INDEX "water-outline_way_idx" ON layers."water-outline" USING gist (way);
CREATE INDEX "water-outline_id_idx" ON layers."water-outline" USING btree (osm_id);

drop materialized view  if exists layers."water";
create materialized view layers."water" AS ( 
  SELECT osm_id, "natural", "landuse", "waterway", "way"
  FROM planet_osm_polygon
  WHERE "natural" IN ('lake','water')
  OR "waterway" IN ('canal','mill_pond','riverbank')
  OR "landuse" IN ('basin','reservoir','water')
  ORDER BY osm_id asc
);
CREATE INDEX "water_way_idx" ON layers."water" USING gist (way);
CREATE INDEX "water_id_idx" ON layers."water" USING btree (osm_id);

drop materialized view  if exists layers."wetland";
create materialized view layers."wetland" AS (
  SELECT osm_id, way,"natural" FROM planet_osm_polygon
  WHERE "natural" IN ('marsh','wetland') order by osm_id asc
);
CREATE INDEX "wetland_way_idx" ON layers."wetland" USING gist (way);
CREATE INDEX "wetland_id_idx" ON layers."wetland" USING btree (osm_id);
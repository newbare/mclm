--drop function pointscanner(int,int,int,boolean,int,text)
CREATE or replace FUNCTION pointscanner(
    IN source integer,
    IN target integer,
    IN k integer,
    IN directed boolean,
    IN quant integer
) 
RETURNS table(way geometry, name text, distance double precision, tags hstore, "operator" text, 
		admin_level text, z_order integer) AS $$
DECLARE 
	geomRoute geometry;
	routeBB box2d;
BEGIN
	SELECT INTO geomRoute ST_Union(geom) from route_agg($1, $2, $3, $4);
	routeBB := ST_Extent(geomRoute);
	
	RETURN QUERY
	SELECT pt.way, pt.name, ST_Distance( rt.geom, ST_Transform(pt.way,4326) ) as distance, 
		pt.tags, pt.operator, pt.admin_level, pt.z_order 
	FROM planet_osm_point pt, route_agg($1, $2, $3, $4) rt
	where routeBB && ST_Transform(pt.way,4326)
	order by distance asc limit $5;

END; $$  
LANGUAGE 'plpgsql' VOLATILE;	
--select * from pointscanner(1358812, 18854, 1, true, 200)
--select * from planet_osm_point limit 10
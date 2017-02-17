﻿--select * from pointscanner('MULTILINESTRING( 
		(-43.1761935 -22.90642,-43.1755606 -22.9064116,-43.1754828 -22.9064106,-43.1753675 -22.9064091),
		(-43.176696 -22.9064062,-43.1761935 -22.90642),(-43.176805 -22.9064027,-43.176696 -22.9064062),
		(-43.1776911 -22.9049927,-43.1776625 -22.9050849,-43.1775227 -22.9055527,-43.1775045 -22.9056041,-43.1774504 -22.9057582),
		(-43.1782012 -22.9036858,-43.1778613 -22.9045254,-43.1777841 -22.9047287,-43.1777446 -22.9048326,-43.1777179 -22.9049164,-43.1776911 -22.9049927),
		(-43.1772218 -22.9063929,-43.1771252 -22.9063944,-43.1771118 -22.9063946,-43.1769202 -22.9064008,-43.176805 -22.9064027),
		(-43.1774504 -22.9057582,-43.1773182 -22.9061373,-43.1772868 -22.9062205,-43.1772218 -22.9063929),
		(-43.1834587 -22.9028997,-43.1833984 -22.9028862,-43.1830022 -22.9027778,-43.1825446 -22.9026278,-43.1821151 -22.9024891,-43.1816491 -22.9023374,-43.1815912 -22.9023186,-43.1813461 -22.9022388),
		(-43.1793173 -22.901581,-43.1791549 -22.9015418,-43.179105 -22.9015365,-43.1790457 -22.9015482,-43.1790174 -22.9015689,-43.178994 -22.9016082),
		(-43.1788184 -22.9020931,-43.1786726 -22.9025241,-43.1786518 -22.9025769,-43.1786063 -22.9026931),
		(-43.1813461 -22.9022388,-43.1806028 -22.9019969,-43.1805417 -22.901977,-43.1799074 -22.9017705),
		(-43.1799074 -22.9017705,-43.1797658 -22.9017244,-43.1793732 -22.9015989,-43.1793173 -22.901581),
		(-43.178994 -22.9016082,-43.1788184 -22.9020931),(-43.1784337 -22.9031366,-43.1782012 -22.9036858),
		(-43.1786063 -22.9026931,-43.17848 -22.9030174,-43.178461 -22.9030662,-43.1784337 -22.9031366))') where round(distance::numeric, 5) < 500


CREATE OR REPLACE FUNCTION public.pointscanner( IN routeGeometry text)
  RETURNS TABLE(way geometry, name text, distance double precision, tags hstore, operator text, admin_level text, z_order integer) AS
$BODY$
DECLARE 
	geomRoute geometry;
	routeBB box2d;
BEGIN
	geomRoute = ST_GeomFromText( $1 ,4326);

	routeBB := ST_Extent(geomRoute);
	
	RETURN QUERY
	SELECT pt.way, pt.name, ST_Distance( geomRoute, ST_Transform(pt.way,4326) ) * 111195 as distance, 
		pt.tags, pt.operator, pt.admin_level, pt.z_order 
	FROM planet_osm_point pt
	where routeBB && ST_Transform(pt.way,4326);

END; $BODY$
  LANGUAGE plpgsql VOLATILE

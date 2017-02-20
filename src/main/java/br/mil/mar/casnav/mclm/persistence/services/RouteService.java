package br.mil.mar.casnav.mclm.persistence.services;

import java.util.List;

import br.mil.mar.casnav.mclm.misc.Configurator;
import br.mil.mar.casnav.mclm.misc.UserTableEntity;
import br.mil.mar.casnav.mclm.persistence.entity.Config;

public class RouteService {

	public String getNearestRoads( String coordinate ) throws Exception {

		Config cfg = Configurator.getInstance().getConfig();
		coordinate = coordinate.replace(",", " ");
		
		String sql = "SELECT array_to_json( array_agg( t ) ) as result FROM ( select osm_name,source,target from nearest_way('" + coordinate + "', 1, 4326) ) as t";
		String result = "";
		
		String connectionString = "jdbc:postgresql://" + cfg.getRoutingServer() +
				":" + cfg.getRoutingPort() + "/" + cfg.getRoutingDatabase();
		GenericService gs = new GenericService( connectionString, cfg.getRoutingUser(), cfg.getRoutingPassword()  );
		
		List<UserTableEntity> utes = gs.genericFetchList( sql );
		
		if ( utes.size() > 0 ) {
			UserTableEntity ute = utes.get(0);
			result = ute.getData("result");
		}
		
		return result;
	}
	
	/*
	
		CREATE OR REPLACE FUNCTION public.nearest_way(
		    IN coords character varying,
		    IN quant integer,
		    IN srid integer)
		  RETURNS TABLE(id integer, osm_id bigint, source integer, target integer, osm_name character varying, x1 double precision, y1 double precision, x2 double precision, y2 double precision, geom_way geometry) AS
		$BODY$
			SELECT id, osm_id, source, target, osm_name, x1, y1, x2, y2, geom_way FROM osm_2po_4pgr ORDER BY geom_way <-> ST_GeometryFromText('POINT(' || $1 ||  ')',$3) LIMIT $2
		$BODY$
		  LANGUAGE sql STABLE
		  COST 100
		  ROWS 1000;
		ALTER FUNCTION public.nearest_way(character varying, integer, integer)
		  OWNER TO postgres;	
	
	*/
	
	
	public String calcRoute( String source, String target, Integer kpaths, String directed ) throws Exception {
		Config cfg = Configurator.getInstance().getConfig();
		
		String sql = "SELECT array_to_json( array_agg( t ) ) as result "
				+ "FROM ( select r.km,r.way_name,r.seq, ST_AsGeoJSON(r.geom)::json as geometry from route_agg(" + source + ", " + target + ", " 
				+ kpaths + ", " + directed + ") as r ) as t";
		String result = "";
		
		System.out.println( sql );
		
		String connectionString = "jdbc:postgresql://" + cfg.getRoutingServer() +
				":" + cfg.getRoutingPort() + "/" + cfg.getRoutingDatabase();
		GenericService gs = new GenericService( connectionString, cfg.getRoutingUser(), cfg.getRoutingPassword()  );
		
		List<UserTableEntity> utes = gs.genericFetchList( sql );
		
		if ( utes.size() > 0 ) {
			UserTableEntity ute = utes.get(0);
			result = ute.getData("result");
		}
		
		
		// TESTE !!!!
		/*
			getPointsNearRoute("MULTILINESTRING( " + 
					"(-43.1761935 -22.90642,-43.1755606 -22.9064116,-43.1754828 -22.9064106,-43.1753675 -22.9064091), " +
					"(-43.176696 -22.9064062,-43.1761935 -22.90642),(-43.176805 -22.9064027,-43.176696 -22.9064062)," +
					"(-43.1776911 -22.9049927,-43.1776625 -22.9050849,-43.1775227 -22.9055527,-43.1775045 -22.9056041,-43.1774504 -22.9057582)," +
					"(-43.1782012 -22.9036858,-43.1778613 -22.9045254,-43.1777841 -22.9047287,-43.1777446 -22.9048326,-43.1777179 -22.9049164,-43.1776911 -22.9049927)," +
					"(-43.1772218 -22.9063929,-43.1771252 -22.9063944,-43.1771118 -22.9063946,-43.1769202 -22.9064008,-43.176805 -22.9064027)," +
					"(-43.1774504 -22.9057582,-43.1773182 -22.9061373,-43.1772868 -22.9062205,-43.1772218 -22.9063929)," +
					"(-43.1834587 -22.9028997,-43.1833984 -22.9028862,-43.1830022 -22.9027778,-43.1825446 -22.9026278,-43.1821151 -22.9024891,-43.1816491 -22.9023374,-43.1815912 -22.9023186,-43.1813461 -22.9022388)," +
					"(-43.1793173 -22.901581,-43.1791549 -22.9015418,-43.179105 -22.9015365,-43.1790457 -22.9015482,-43.1790174 -22.9015689,-43.178994 -22.9016082)," +
					"(-43.1788184 -22.9020931,-43.1786726 -22.9025241,-43.1786518 -22.9025769,-43.1786063 -22.9026931)," +
					"(-43.1813461 -22.9022388,-43.1806028 -22.9019969,-43.1805417 -22.901977,-43.1799074 -22.9017705)," +
					"(-43.1799074 -22.9017705,-43.1797658 -22.9017244,-43.1793732 -22.9015989,-43.1793173 -22.901581)," +
					"(-43.178994 -22.9016082,-43.1788184 -22.9020931),(-43.1784337 -22.9031366,-43.1782012 -22.9036858)," +
					"(-43.1786063 -22.9026931,-43.17848 -22.9030174,-43.178461 -22.9030662,-43.1784337 -22.9031366))");
		// ---------------------
		*/
		
		
		return result;
		
	}
	
	/*

		CREATE or replace FUNCTION route_agg(
		    IN source integer,
		    IN target integer,
		    IN k integer,
		    IN directed boolean) 
			RETURNS TABLE(geom geometry, way_name text, km double precision, seq integer, direction double precision) AS $$
		DECLARE 
			var_r record;
			tmp_name text;
			tmp_geom geometry;
			last_geom geometry;
			is_first boolean;
			counter integer;
		BEGIN
			tmp_name := '*************';
			is_first := true; 
			counter := 0;
			FOR var_r IN ( select * from calc_rotas_v3($1, $2, $3, $4) as r INNER JOIN osm_2po_4pgr as g ON r.edge = g.id order by seq) LOOP
		
				if ( var_r.osm_name is null ) then 
					var_r.osm_name := '(Sem Nome)';
				end if;
		
				if ( not is_first ) then
					if ( tmp_name <> var_r.osm_name  ) then
						geom := tmp_geom;
						way_name := tmp_name;
						km := ST_Length(tmp_geom::geography)/1000 ;
						km := round( km::numeric,2 );
			
						tmp_name := var_r.osm_name;
						tmp_geom := var_r.geom_way;	
						
						seq := counter;
						counter := counter + 1;		
						RETURN NEXT;
					else
						tmp_geom := ST_Union(tmp_geom, var_r.geom_way);
					end if;
				else
					tmp_name := var_r.osm_name;
					tmp_geom := var_r.geom_way;
					is_first := false;
				end if;
		
				last_geom := var_r.geom_way;
		
			END LOOP;
			
			geom := tmp_geom;
			way_name = tmp_name;
			km = ST_Length(tmp_geom::geography)/1000;
			km := round( km::numeric,2 );
			seq = counter;
			RETURN NEXT;
				
			
		END; $$  
		LANGUAGE 'plpgsql' VOLATILE;	


		select * from route_agg(2799136, 1592338, 1, true)	
		
		
		
		
		select * from calc_rotas_v3(2799136, 1592338, 5, true) as r INNER JOIN osm_2po_4pgr as g ON r.edge = g.id

	
		CREATE OR REPLACE FUNCTION public.calc_rotas_v3(
			source integer,
			target integer,
			k integer,
			directed boolean)
		    RETURNS SETOF "TABLE(seq integer, path_id integer, path_seq integer, node bigint, edge bigint, cost double precision, agg_cost double precision)"
		    LANGUAGE 'sql'
		    COST 100.0
		    STABLE NOT LEAKPROOF 
		    ROWS 1500.0
		AS $function$
		
		SELECT 
		    *
		FROM 
		    pgr_ksp(
		     'SELECT id, source, target, cost, reverse_cost FROM osm_2po_4pgr as r, 
		             (SELECT st_buffer(st_envelope(st_collect(geom_way)), 0.5) as box FROM osm_2po_4pgr as l1 
		            WHERE l1.source = ' || $1 || ' OR l1.target = ' || $2 || ') as box
		            WHERE r.geom_way && box.box',$1, $2, $3, directed:=$4
		    )  
		 
		$function$;
		
		ALTER FUNCTION public.calc_rotas_v3(integer, integer, integer, boolean)
		    OWNER TO postgres;
	
	
	
  
		=================== OTIMIZAÇÃO =======================================                
		 1. create indexes on ID, source and target columns.
		 2. create index using GIST on geom column.
		 3. vacuum
		 4. cluster on geom column
		 5. analyze
		 
		 
		CREATE INDEX idx_hh_2po_4pgr_id
		  ON public.hh_2po_4pgr
		  USING btree
		  (id);     
		CREATE INDEX idx_hh_2po_4pgr_geom
		  ON public.hh_2po_4pgr
		  USING gist
		  (geom);                 
		ALTER TABLE hh_2po_4pgr CLUSTER ON idx_hh_2po_4pgr_geom;	
	
	*/
	
	public String getPointsNearRoute( String routeGeometryText, String criteria, String source ) throws Exception {
		Config cfg = Configurator.getInstance().getConfig();
		
		int distanceLimitMeters = cfg.getDistanceFromRoute();
		
		
		String sql = "SELECT row_to_json( fc )::text As featurecollection " +  
				"FROM ( SELECT 'FeatureCollection' As type, array_to_json( array_agg( f ) ) As features " + 
				     "FROM (SELECT 'Feature' As type, " + 
				     "ST_AsGeoJSON( ST_Transform(way,4326) )::json As geometry, " +  
				     "row_to_json((SELECT l FROM (SELECT name,distance,operator) As l)) As properties " +  
					 "FROM pointscanner('" + routeGeometryText + "','" + criteria.replace("'", "''") +"','"+source+"') As l where round(distance::numeric, 5) < " + distanceLimitMeters + ") As f) as fc; ";
		
		String result = "";
		
		String connectionString = "jdbc:postgresql://" + cfg.getRoutingServer() +
				":" + cfg.getRoutingPort() + "/" + cfg.getRoutingDatabase();
		GenericService gs = new GenericService( connectionString, cfg.getRoutingUser(), cfg.getRoutingPassword()  );
		
		List<UserTableEntity> utes = gs.genericFetchList( sql );
		
		if ( utes.size() > 0 ) {
			UserTableEntity ute = utes.get(0);
			result = ute.getData("featurecollection");
		}
		
		return result;		
	}
	
	/*
	
		CREATE OR REPLACE FUNCTION public.pointscanner(IN routegeometry text, IN criteria text, IN source text)
		  RETURNS TABLE(way geometry, name text, distance double precision, tags hstore, operator text, admin_level text, z_order integer) AS
		$BODY$
		DECLARE 
			geomRoute geometry;
			routeBB box2d;
			sql text;
		BEGIN
			geomRoute = ST_GeomFromText( $1 ,4326);
			routeBB := ST_Extent(geomRoute);
		
			sql := 'SELECT pt.way, pt.name, ST_Distance( $1, ST_Transform(pt.way,4326) ) * 111195 as distance, pt.tags, pt.operator, pt.admin_level, pt.z_order '
			 || ' FROM ' || source || ' pt where $2 && ST_Transform(pt.way,4326) and ' || criteria;
		
			RETURN QUERY EXECUTE sql USING geomRoute, routeBB;
		END; $BODY$
		  LANGUAGE plpgsql VOLATILE
		
			
		
		
		select * from pointscanner('MULTILINESTRING( 
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
			
	*/
}

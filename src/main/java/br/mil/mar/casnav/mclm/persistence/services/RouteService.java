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
}

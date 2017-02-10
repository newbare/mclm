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

	public String calcRoute(String source, String target, Integer kpaths, String directed) throws Exception {
		Config cfg = Configurator.getInstance().getConfig();
		
		String sql = "SELECT array_to_json( array_agg( t ) ) as result "
				+ "FROM ( select g.osm_name,r.*,g.osm_id, ST_AsGeoJSON(g.geom_way)::json as geometry from calc_rotas_v3(" + source + ", " + target + ", " 
				+ kpaths + ", " + directed + ") as r INNER JOIN osm_2po_4pgr as g ON r.edge = g.id ) as t";
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
	
	
	*/
}

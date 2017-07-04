package br.mil.mar.casnav.mclm.persistence.services.apolo;

import java.util.List;

import br.mil.mar.casnav.mclm.misc.UserTableEntity;

public class OrganizacoesMilitaresService extends BasicApoloService {

	public OrganizacoesMilitaresService() throws Exception {
		super();
	}


	public String getOrgMil( String orgid ) throws Exception {
		connect();
		String result = "";
		
		/*
		select row_to_json(omr)::text  as result FROM (select om.*,f.*, row_to_json( (select t2 from (select * from siglmd.org_mil oo where oo.orgid = om.orgid) as t2) )::text as comimsup from siglmd.org_mil om join siglmd.forca f on om.forcaid = f.forcaid where om.orgid=58040130101020005361)  as omr
		*/
		String comsup = "select " + rowToJson("select * from siglmd.org_mil om where om.orgid=" + orgid, "result", "omr");
		String sql = "select " + rowToJson("select om.*, f.*, " + comsup + " from siglmd.org_mil om join siglmd.forca f on om.forcaid = f.forcaid where om.orgid=" + orgid, "result", "omr");
		
		List<UserTableEntity> utes = gs.genericFetchList( sql );
		
		if ( utes.size() > 0 ) {
			UserTableEntity ute = utes.get(0);
			result = ute.getData("result");
		}		
		
		return result;
		
	}
	
}

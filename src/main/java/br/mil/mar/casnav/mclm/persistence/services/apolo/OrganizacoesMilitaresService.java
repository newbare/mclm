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
		
		String comsup = "row_to_json( (select t2 from (select * from siglmd.org_mil oo where oo.orgid = om.orgid) as t2) )::text as comimsup";
		String mainQuery = "select  row_to_json(omr)::text as result FROM (select om.*, f.*, " + comsup + " from siglmd.org_mil om join siglmd.forca f on om.forcaid = f.forcaid where om.orgid=" + orgid + ") as omr";
		
		List<UserTableEntity> utes = gs.genericFetchList( mainQuery );
		
		if ( utes.size() > 0 ) {
			UserTableEntity ute = utes.get(0);
			result = ute.getData("result");
		}		
		
		return result;
		
	}
	
}

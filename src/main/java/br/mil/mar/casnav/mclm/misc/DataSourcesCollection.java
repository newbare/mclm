package br.mil.mar.casnav.mclm.misc;

import java.util.List;

import br.mil.mar.casnav.mclm.persistence.entity.DataSource;

public class DataSourcesCollection {
	private List<DataSource> dataSources;
	private int totalCount;

	public DataSourcesCollection( List<DataSource> dataSources ) {
		this.dataSources = dataSources;
		totalCount = dataSources.size();
	}
	
	public int getTotalCount() {
		return totalCount;
	}

	public List<DataSource> getServers() {
		return dataSources;
	}
}

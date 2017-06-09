#!/bin/bash

cd /opt/osm/data/osmupdates/

NOW=$(date +"%m-%d-%Y")
TIME=$(date +"%T")

export JAVA_HOME="/opt/osm/java/"
export JAVACMD_OPTIONS="-Djava.io.tmpdir=/opt/osm/data/osmupdates/tmp -Xmx1G -server" 
export PATH="/sbin:/bin:/usr/sbin:/usr/bin:/opt/osm/java/bin/:/usr/local/pgsql/bin/"

rm -f /opt/osm/data/osmupdates/update.osm.gz
rm -f /opt/osm/data/osmupdates/update.unique.osm.gz

echo "$NOW $TIME - Baixando atualizacoes..."

/opt/osm/sources/osmosis/bin/osmosis -v 3 --rri workingDirectory=/opt/osm/data/osmupdates/ --wxc /opt/osm/data/osmupdates/update.osm.gz

{
if [ ! -f /opt/osm/data/osmupdates/update.osm.gz ]; then
    echo "Arquivo de update nao encontrado. Saindo."
    exit 0
fi
}

#TIME=$(date +"%T")
#echo "$TIME - Parando Tomcat..."
#/opt/osm/apache-tomcat-9.0.0.M17/bin/shutdown.sh

TIME=$(date +"%T")
echo "$TIME - Criando delta..."

nice gzip -d -c /opt/osm/data/osmupdates/update.osm.gz | nice /opt/osm/sources/osmosis/bin/osmosis --read-xml-change file=/dev/stdin --simplify-change --write-xml-change file=- | nice gzip -9 -c > /opt/osm/data/osmupdates/update.unique.osm.gz

TIME=$(date +"%T")
echo "$TIME - Importando para o banco..."

/usr/local/bin/osm2pgsql --append --latlong --number-processes 8 --flat-nodes /opt/osm/data/osm_flat_nodes.db --verbose  --hstore --slim --cache 20000 --database osm --username postgres --host 127.0.0.1 --style /opt/osm/data/default.style /opt/osm/data/osmupdates/update.unique.osm.gz 

TIME=$(date +"%T")
echo "$TIME - Atualizando as visoes..."

export PGPASSWORD=admin

/usr/local/pgsql/bin/psql -U postgres -h localhost -d osm -H -c "refresh materialized view layers.\"water\"; "
/usr/local/pgsql/bin/psql -U postgres -h localhost -d osm -H -c "refresh materialized view layers.\"water-outline\"; "
/usr/local/pgsql/bin/psql -U postgres -h localhost -d osm -H -c "refresh materialized view layers.\"route-turning-circles\"; "
/usr/local/pgsql/bin/psql -U postgres -h localhost -d osm -H -c "refresh materialized view layers.\"route-tunnels\"; "
/usr/local/pgsql/bin/psql -U postgres -h localhost -d osm -H -c "refresh materialized view layers.\"wetland\"; "
/usr/local/pgsql/bin/psql -U postgres -h localhost -d osm -H -c "refresh materialized view layers.\"route-line\"; "
/usr/local/pgsql/bin/psql -U postgres -h localhost -d osm -H -c "refresh materialized view layers.\"route-fill\"; "
/usr/local/pgsql/bin/psql -U postgres -h localhost -d osm -H -c "refresh materialized view layers.\"route-bridge-5\"; "
/usr/local/pgsql/bin/psql -U postgres -h localhost -d osm -H -c "refresh materialized view layers.\"route-bridge-4\"; "
/usr/local/pgsql/bin/psql -U postgres -h localhost -d osm -H -c "refresh materialized view layers.\"route-bridge-3\"; "
/usr/local/pgsql/bin/psql -U postgres -h localhost -d osm -H -c "refresh materialized view layers.\"route-bridge-2\"; "
/usr/local/pgsql/bin/psql -U postgres -h localhost -d osm -H -c "refresh materialized view layers.\"route-bridge-1\"; "
/usr/local/pgsql/bin/psql -U postgres -h localhost -d osm -H -c "refresh materialized view layers.\"route-bridge-0\"; "
/usr/local/pgsql/bin/psql -U postgres -h localhost -d osm -H -c "refresh materialized view layers.\"placenames-medium\"; "
/usr/local/pgsql/bin/psql -U postgres -h localhost -d osm -H -c "refresh materialized view layers.\"parking-area\"; "
/usr/local/pgsql/bin/psql -U postgres -h localhost -d osm -H -c "refresh materialized view layers.\"forest\"; "
/usr/local/pgsql/bin/psql -U postgres -h localhost -d osm -H -c "refresh materialized view layers.\"park\"; "
/usr/local/pgsql/bin/psql -U postgres -h localhost -d osm -H -c "refresh materialized view layers.\"highway-label\"; "
/usr/local/pgsql/bin/psql -U postgres -h localhost -d osm -H -c "refresh materialized view layers.\"grass\"; "
/usr/local/pgsql/bin/psql -U postgres -h localhost -d osm -H -c "refresh materialized view layers.\"building\"; "
/usr/local/pgsql/bin/psql -U postgres -h localhost -d osm -H -c "refresh materialized view layers.\"beach\"; "
/usr/local/pgsql/bin/psql -U postgres -h localhost -d osm -H -c "refresh materialized view layers.\"amenity-areas\"; "
/usr/local/pgsql/bin/psql -U postgres -h localhost -d osm -H -c "refresh materialized view layers.\"agriculture\"; "
/usr/local/pgsql/bin/psql -U postgres -h localhost -d osm -H -c "refresh materialized view layers.\"aero-poly\"; "

TIME=$(date +"%T")
echo "$TIME - Termino da atualizacao de visoes. Iniciando VACUUM..."

psql -U postgres -h localhost -d osm -H -c 'VACUUM FULL VERBOSE ANALYZE osm'

#TIME=$(date +"%T")
#echo "$TIME - Iniciando Tomcat..."
#/opt/osm/apache-tomcat-9.0.0.M17/bin/startup.sh







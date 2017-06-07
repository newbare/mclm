#!/bin/bash

cd /home/apolo/install_osm/osmupdate/

NOW=$(date +"%m-%d-%Y")
TIME=$(date +"%T")


#export JAVA_HOME="/opt/osm/java/"
export JAVACMD_OPTIONS="-Djava.io.tmpdir=/home/apolo/install_osm/osmupdate/tmp -Xmx2G -server" 
#export PATH="/sbin:/bin:/usr/sbin:/usr/bin:/opt/osm/java/bin/:/usr/local/pgsql/bin/"

rm -f /home/apolo/install_osm/osmupdate/update.osm.gz
rm -f /home/apolo/install_osm/osmupdate/update.unique.osm.gz

echo "$NOW $TIME - Baixando atualizacoes..."

/home/apolo/osmosis/bin/osmosis -v 3 --rri workingDirectory=/home/apolo/install_osm/osmupdate/ --wxc /home/apolo/install_osm/osmupdate/update.osm.gz

{
if [ ! -f /home/apolo/install_osm/osmupdate/update.osm.gz ]; then
    echo "Arquivo de update nao encontrado. Saindo."
    exit 0
fi
}

#TIME=$(date +"%T")
#echo "$TIME - Parando Tomcat..."
#/opt/osm/apache-tomcat-9.0.0.M17/bin/shutdown.sh

TIME=$(date +"%T")
echo "$TIME - Criando delta..."

nice gzip -d -c /home/apolo/install_osm/osmupdate/update.osm.gz | nice /home/apolo/osmosis/bin/osmosis --read-xml-change file=/dev/stdin --simplify-change --write-xml-change file=- | nice gzip -9 -c > /home/apolo/install_osm/osmupdate/update.unique.osm.gz

TIME=$(date +"%T")
echo "$TIME - Importando para o banco..."

/usr/local/bin/osm2pgsql --append --number-processes 8 --flat-nodes /home/apolo/install_osm/osmupdate/flatnodes/osm_flat_nodes.db  --latlong --verbose --hstore --slim --cache 20000 --database osm --username postgres --host 127.0.0.1 --style /home/apolo/install_osm/osmupdate/default.style /home/apolo/install_osm/osmupdate/update.unique.osm.gz 

TIME=$(date +"%T")
echo "$TIME - Atualizando as visoes..."

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
echo "$TIME - Termino da atualizacao de visoes. FIM."

#TIME=$(date +"%T")
#echo "$TIME - Iniciando Tomcat..."
#/opt/osm/apache-tomcat-9.0.0.M17/bin/startup.sh







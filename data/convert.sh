#! /bin/sh

rm teste.tif
#gdalwarp  teste.vrt teste.tif
#gdaldem hillshade -co compress=lzw  -compute_edges teste.tif teste2.tif

#gdalbuildvrt ./teste.vrt hgt/SRTM1v3.0/S23W043.hgt  hgt/SRTM1v3.0/S23W044.hgt  hgt/SRTM1v3.0/S24W043.hgt  hgt/SRTM1v3.0/S24W044.hgt


gdal_translate -tr 0.000050 0.000050 -r cubicspline -of GTiff teste.vrt teste.tif
#gdal_translate -tr 0.000833333333333 -0.000833333333333 -r bilinear -of GTiff teste.tif new_teste.tif

#gdaldem hillshade -of PNG teste.tif final.png


gdaldem hillshade -co TILED=YES -co compress=lzw -s 111120 -z 2 -combined -compute_edges teste.tif final.tif


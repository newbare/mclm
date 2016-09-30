--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.1
-- Dumped by pg_dump version 9.4.1
-- Started on 2016-09-30 14:16:41

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

--
-- TOC entry 2009 (class 0 OID 608437)
-- Dependencies: 172
-- Data for Name: config; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO config (id_config, baselayer, externallayerstolocalserver, external_workspace_name, geoserver_password, geoserverurl, geoserver_user, non_proxy_hosts, proxy_host, proxy_password, proxy_port, proxy_user, useproxy) VALUES (1, 'osm:AA_OpenStreetMap', false, 'external', 'defesa123', 'http://10.5.115.122/geoserver', 'admin', 'localhost|127.0.0.1|10.5.115.22|172.21.81.43|10.5.115.122', 'proxy-i2a.mb', 'netrix36', 6060, '02221224710', true);


--
-- TOC entry 2015 (class 0 OID 0)
-- Dependencies: 173
-- Name: config_id_config_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('config_id_config_seq', 1, false);


-- Completed on 2016-09-30 14:16:41

--
-- PostgreSQL database dump complete
--


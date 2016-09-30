--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.1
-- Dumped by pg_dump version 9.4.1
-- Started on 2016-09-30 14:20:17

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

--
-- TOC entry 2027 (class 0 OID 94787)
-- Dependencies: 185
-- Data for Name: servers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO servers (id_server, name, url) VALUES (1, 'Servidor do IBGE', 'http://www.geoservicos.ibge.gov.br/geoserver/');
INSERT INTO servers (id_server, name, url) VALUES (5, 'APOLO DEFESA', 'http://172.21.81.43/geoserver/');
INSERT INTO servers (id_server, name, url) VALUES (6, 'APOLO CASNAV', 'http://10.5.115.22/geoserver/');
INSERT INTO servers (id_server, name, url) VALUES (7, 'OpenGeo Suite Demo', 'http://demo.opengeo.org/geoserver/');
INSERT INTO servers (id_server, name, url) VALUES (8, 'Harvard Geospatial Library', 'http://hgl.harvard.edu:8080/geoserver/');
INSERT INTO servers (id_server, name, url) VALUES (9, 'ITHACA', 'http://www.ithacaweb.org/geoserver/');
INSERT INTO servers (id_server, name, url) VALUES (10, 'Servidor Local', 'http://localhost:8080/geoserver/');
INSERT INTO servers (id_server, name, url) VALUES (11, 'OSM APOLO', 'http://10.5.115.122:8080/geoserver/');


--
-- TOC entry 2032 (class 0 OID 0)
-- Dependencies: 184
-- Name: servers_id_server_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('servers_id_server_seq', 11, true);


-- Completed on 2016-09-30 14:20:17

--
-- PostgreSQL database dump complete
--


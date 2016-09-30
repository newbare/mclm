--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.1
-- Dumped by pg_dump version 9.4.1
-- Started on 2016-09-30 14:16:20

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

--
-- TOC entry 2011 (class 0 OID 608458)
-- Dependencies: 174
-- Data for Name: sceneries; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO sceneries (id_scenery, active, creation_date, graticule, map_center, scenery_name, zoom_level, id_user) VALUES (2, true, '2016-06-28 11:59:41.542', 'true', '-24.9609375,-20.303417518489297', 'Novo Cenário', 3, 1);
INSERT INTO sceneries (id_scenery, active, creation_date, graticule, map_center, scenery_name, zoom_level, id_user) VALUES (1, false, '2016-06-28 09:52:17.537', 'true', '-36.6064453125,-7.307984780163878', 'Default Scenery', 7, 1);


--
-- TOC entry 2017 (class 0 OID 0)
-- Dependencies: 175
-- Name: sceneries_id_scenery_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('sceneries_id_scenery_seq', 1, false);


-- Completed on 2016-09-30 14:16:20

--
-- PostgreSQL database dump complete
--


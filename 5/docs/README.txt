
:chapter-label: Chapter -
:doctype: book
:toc: macro
:toc-title: Contents
:toclevels: 1
:source-highlighter: pygments
:stylesheet: style.css
:pygments-style: trac
:icons:
:data-uri:


NodeJS and MySQL
================


== Project Setup

----
mkdir nodemysql && cd nodemysql
npm init # answer the npm questions

npm install mysql --save
npm install router --save
npm install body-parser --save
----

== Database Preparation

If you did not install mysql yourself, and an administrator was responsible for the installation, request the administrator to create a database named 'nodetest' for you and give CRUD access username 'test' using the password 'test'. On the other hand, if you are the admin of your machine and you know the root password of hmysql, you can proceed with the following setup

*Login to mysql* as root

----
mysql -h localhost -u root -p
----

*Create the database* nodetest

----
CREATE DATABASE nodetest;
----

*Create the user* nodetest

----
GRANT ALL PRIVILEGES ON nodetest.* TO test@'localhost' IDENTIFIED BY 'test';
FLUSH PRIVILEGES;
----

*Create the employees table* and populate the db

There is a SQL script named `nodetest.sql` that is included in the `src` directory, together with the node program files. You can use that to create the table and populate it with sample data.

----
cd src
mysql -u root -p < nodetest.sql
----

The contents of `nodetest.sql` script is as follows

[source, sql]
----
DROP DATABASE nodetest;
CREATE DATABASE nodetest;
use nodetest;

CREATE TABLE employees (
  id int(11) NOT NULL AUTO_INCREMENT,
  lastname 	varchar(50),
  firstname varchar(50),
  email varchar(100),
  PRIMARY KEY (id)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

INSERT INTO employees (lastname, firstname, email) VALUES
('Hagos', 'Ted', 'ted@thelogbox.com'),
('Doe', 'John', 'johndoe@gmail.com'),
('Dela Cruz', 'Juan', 'juan@gmail.com'),
('Dela Cruz', 'Juana', 'juana@gmail.com');
----

<<<


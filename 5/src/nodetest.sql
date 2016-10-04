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
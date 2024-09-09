CREATE DATABASE IF NOT EXISTS database1;
CREATE DATABASE IF NOT EXISTS database2;

-- Vous pouvez également ajouter des utilisateurs et des permissions spécifiques
CREATE USER 'user1'@'%' IDENTIFIED BY 'userpassword1';
GRANT ALL PRIVILEGES ON database1.* TO 'user1'@'%';

CREATE USER 'user2'@'%' IDENTIFIED BY 'userpassword2';
GRANT ALL PRIVILEGES ON database2.* TO 'user2'@'%';


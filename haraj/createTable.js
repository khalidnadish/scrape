let tableName=process.argv[2];


sqlStatment=`DROP TABLE IF EXISTS ${tableName}`;
sqlStatment = `CREATE TABLE  ${tableName} 
        ( id int NOT NULL AUTO_INCREMENT,
        reporttype text,
        authorUsername varchar(255) DEFAULT NULL,
        phone varchar(255) DEFAULT NULL,
        city varchar(255) DEFAULT NULL,
        postid varchar(255) DEFAULT NULL,
        pageno int DEFAULT '0',
        posttitle varchar(255) DEFAULT NULL,
        postdate varchar(255) DEFAULT '0',
        updatedate varchar(255) DEFAULT '0',
        authorid varchar(255) DEFAULT NULL,
        createAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        updateat timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),KEY index2 (phone,city))
        ENGINE=InnoDB AUTO_INCREMENT=330 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`;

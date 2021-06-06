# SQL학습
## 0. 용어설명
- DB : Database : 데이터 저장소
- DBMS : DataBase Managment System : 데이터 베이스 관리 시스템
- RDBMS : Relational DataBase: 관계형 데이터베이스 - MySQL, Oracle, MSSQL ...
- DBMS Client tool : mysql(cli), Heide, Workbench
- NoSQL : Not Only SQL - 데이터를 테이블에 저장하지 않고 json형태로 저장한다. - firebse, mongoDB
- SQL : Structured Query Language : RDBMS에서 사용하는 언어
- ORM : Object Relational Mapping : 객체 관계 매핑 - SQL(sequelize), NoSQL(Mongoose)
- CLI Program: Command Line Inteface Program - 까만창에서 쓰는 프로그램
  -> (firebase, git, npm, mysql, node, nodemon, supervisor ...)

## 1. Database
### database 명령어
```sql
-- database 만들기
CREATE DATEBASE shop DEFAULT CHARACTER SET utf8;

-- database 보기
show databases;

-- database 사용하기
USE shop;
```

### table 명령어
```sql
-- table 만들기
CREATE TABLE `test`(
	`id` int(11) NOT NULL,
	`name` varchar(255) NOT NULL,
	PRIMARY KEY(`id`)
) DEFAULT CHARSET=utf8;

CREATE TABLE `users2` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(255) NOT NULL,
	`userid` VARCHAR(255) NOT NULL,
	`userpw` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id`)
) COLLATE='utf8mb4_0900_ai_ci';

-- table 보기
SHOW TABLES;

-- table 삭제
DROP TABLE tablename;
```

### record 명령어
```sql
-- CRUD
-- Create : INSERT
-- INSERT INTO 데이블명 SET 필드명1 = 값1, 필드명1 = 값2 ... 
-- INSERT INTO 데이블명 (필드명1, 필드명2, 필드명3 ...) VALUES (값1, 값2, rkqt3 ...) 
INSERT INTO users SET username='홍길동', userid='hong', userpw='1234'; 
INSERT INTO users (username, userid, userpw) VALUES ('홍길순', 'hong2','1234');


--Update : UPDATE
-- 조건절이 꼭 들어가야한다.(안그러면 박스구하러 가야한다)
-- UPDATE 데이블명 SET 필드명1 = 값1, 필드명2 = 값2 WHERE id =1 
UPDATE users SET userpw = '4321' WHERE id = 1;

--Delete : DELETE
-- 조건절이 꼭 들어가야한다.(안그러면 박스구하러 가야한다)
-- DELETE FROM 데이블명 WHERE id=2;
DELETE FROM users WHERE id=2;

-- Read : SELECT
-- 제일 복잡하다.
SELECT * FROM employee; -- 모든 필드를 가져와
SELECT id, eno... FROM employee; -- 작성한 필드만 가져와
SELECT COUNT(id) FROM employee; -- 행의 갯수를 가져와
SELECT * FROM employee ORDER BY id DECS; -- id 내림차순으로 가져와
SELECT * FROM employee ORDER BY id ACS; -- id 오름차순으로 가져와
SELECT * FROM employee WHERE id=2; -- id=2
SELECT * FROM employee WHERE id > 2 ORDER BY id DESC; -- id > 2인 놈을 내림차순으로 가져와
SELECT * FROM pay WHERE pay > 3000000 AND pay < 5000000 ORDER BY pay ASC;
SELECT * FROM info WHERE tel = '010' -- tel이 010인 놈을 가져와라
SELECT * FROM info WHERE tel LIKE '010' -- tel이 010인 놈을 가져와라(위와 같다)=> 데이터가 없다/
SELECT * FROM info WHERE tel LIKE '010%' -- tel이 010으로 시작하는 놈을 가져와
SELECT * FROM info WHERE tel LIKE '%0001' -- tel이 0001로 끝나는 놈을 가져와
SELECT * FROM info WHERE tel LIKE '%0000%' -- tel이 0000을 포함하는 놈을 가져와
SELECT * FROM pay WHERE pay > 2000000 ORDER BY pay DESC, id ASC; -- pay가 20000000이상을 pay 내림차순으로 정렬하고 pay가 같은 놈이 있으면 거기서 id 오름차순으로 정렬
SELECT * FROM pay WHERE pay > 2000000 ORDER BY pay DESC,id DESC LIMIT 0, 3; -- 위의 결과에서 0번 레코드로부터 3개를 가져와 (LIMIT 시작레코드 idx, 가져올 레코드 수)



-- UPDATE, DELETE 공통 => WHERE절을 써야한다.
-- SELECT => WHERE, ORDER, LIMIT절 순으로 쓸 수 있다. => 원하는 조건을 추려서 정렬시킨 후 원하는 데이터만 가져오기

```
---
### record 명령어(중급)
---

![SQL JOIN](./img/sql-join.png)

```sql
-- 두개의 테이블을 합쳐서 가져오기
-- employee를 가져오는데 info를 붙여서(employee LEFT JOIN info) 가져와. 
-- 그런데 employee의 id 와 info의 eid가 같은 놈(ON employee.id = info.eid)을 가져와
SELECT employee.*, info.id As infoid, info.getder, info.age, info.tel FROM employee JOIN info ON employee.id = info.eid;

SELECT 
employee.*, info.id As infoid, info.getder, info.age, info.tel 
FROM employee 
JOIN info ON employee.id = info.eid 
WHERE info.tel LIKE '%0000%' 
ORDER BY employee.id ASC 
LIMIT 0,3;

SELECT 
A.*, B.id As infoid, B.gender, B.age, B.tel 
FROM A 
JOIN B ON A.id = B.eid
WHERE B.tel LIKE '%0000%'
 ORDER BY A.id ASC 
 LIMIT 0, 3;

 SELECT 
A.*, B.id AS payid, pay, payAt  
FROM employee A 
JOIN pay B 
ON A.id = B.eid 
WHERE B.pay >= 3000000 
ORDER BY A.id ASC 
LIMIT 0, 10;
```

### 외부접속 권한문제
```sql
USE mysql;
ALTER user 'shop'@'%' IDENTIFIED WITH mysql_native_password BY '000000';
FLUSH PRIVILEGES;
```
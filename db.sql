DROP DATABASE IF EXISTS it4409;
CREATE DATABASE it4409;

use it4409;

create table owner (
    id INT  AUTO_INCREMENT PRIMARY KEY,
    phone varchar(11) NOT NULL unique,
    password varchar(70) NOT NULL,
    name varchar(50) NOT NULL,
    birthday DATE,
    gender varchar(20),
    address varchar(70),
    email varchar(70),
    role varchar(70) DEFAULT "ROLE_OWNER",
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP 
);

create table renter (
    id INT  AUTO_INCREMENT PRIMARY KEY,
    phone varchar(11) NOT NULL unique,
    password varchar(70) NOT NULL,
    name varchar(50) NOT NULL,
    birthday DATE,
    gender varchar(20),
    address varchar(100),
    email varchar(70),
    role varchar(70) DEFAULT "ROLE_RENTER",
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP 
);

create table house (
    id INT  AUTO_INCREMENT PRIMARY KEY,
    owner_id INT NOT NULL ,
    name varchar(100) NOT NULL,
    location varchar(100) NOT NULL,
    description varchar(200),
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
    Foreign key (owner_id) REFERENCES owner(id) ON DELETE CASCADE
);

create table room (
    id INT  AUTO_INCREMENT PRIMARY KEY,
    house_id INT NOT NULL,
    name varchar(100) NOT NULL,
    status enum("EMPTY_ROOM", "USING_ROOM", "DEPOSIT_ROOM", "STOP_ROOM") DEFAULT "EMPTY_ROOM",
    cost INT NOT NULL,
    maxUser INT,
    description varchar(200),
    Foreign key (house_id) REFERENCES house(id) ON DELETE CASCADE
);

create table deposit (
    id INT  AUTO_INCREMENT PRIMARY KEY,
    renter_id INT NOT NULL ,
    room_id INT NOT NULL ,
    tien_coc INT NOT NULL,
    status boolean,
    start_time timestamp DEFAULT CURRENT_TIMESTAMP,
    end_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Foreign key (renter_id) REFERENCES renter(id)  ON DELETE CASCADE,
    Foreign key (room_id) REFERENCES room(id)  ON DELETE CASCADE
);

create table covenant (
    id INT  AUTO_INCREMENT PRIMARY KEY,
    room_id INT NOT NULL unique,
    renter_id INT NOT NULL unique,
    duration INT NOT NULL,
    pay_time INT NOT NULL,
    pre_pay INT,
    note varchar(200),
    started_date timestamp DEFAULT CURRENT_TIMESTAMP,
    end_date timestamp DEFAULT CURRENT_TIMESTAMP,
    Foreign key (room_id) REFERENCES room(id)  ON DELETE CASCADE,
    Foreign key (renter_id) REFERENCES renter(id) ON DELETE CASCADE
);

create table bill (
    id INT  AUTO_INCREMENT PRIMARY KEY,
    covenant_id INT NOT NULL REFERENCES covenant(id),
    total_price INT NOT NULL,
    debt INT,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
     Foreign key (covenant_id) REFERENCES covenant(id)  ON DELETE CASCADE
);

create table service(
    id INT  AUTO_INCREMENT PRIMARY KEY,
    name varchar(100) NOT NULL,
    cost INT NOT NULL,
    unit varchar(30) NOT NULL,
    house_id INT NOT NULL ,
    description varchar(200),
    Foreign key (house_id) REFERENCES house(id)  ON DELETE CASCADE
);

create table service_room (
    id INT  AUTO_INCREMENT PRIMARY KEY,
    room_id INT NOT NULL ,
    service_id INT NOT NULL,
    foreign key (room_id) REFERENCES room(id)  ON DELETE CASCADE,
    foreign key (service_id) REFERENCES service(id)  ON DELETE CASCADE
);

create table bill_service (
    id INT  AUTO_INCREMENT PRIMARY KEY,
    service_id INT NOT NULL REFERENCES service(id),
    bill_id INT NOT NULL REFERENCES  bill(id),
    num INT NOT NULL,
    Foreign key (bill_id) REFERENCES bill(id)  ON DELETE CASCADE,
    Foreign key (service_id) REFERENCES service(id)  ON DELETE CASCADE
);

-- DELIMITER $$
-- create trigger is_owner before insert
-- on house for each row
-- begin
--     if ((SELECT role from user where user.id = new.owner_id) != "owner" )then
--         SIGNAL SQLSTATE  "45000"  
--         SET MESSAGE_TEXT  = "Invalid";
--    end if;
-- end$$ 
-- DELIMITER ; 
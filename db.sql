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
    Foreign key (owner_id) REFERENCES owner(id)
);

create table room (
    id INT  AUTO_INCREMENT PRIMARY KEY,
    house_id INT NOT NULL,
    name varchar(100) NOT NULL,
    cost INT NOT NULL,
    maxUser INT,
    description varchar(200),
    status enum("AVAILABLE", "UNAVAILABLE"),
    Foreign key (house_id) REFERENCES house(id)
);

create table deposit (
    id INT  AUTO_INCREMENT PRIMARY KEY,
    renter_id INT NOT NULL ,
    room_id INT NOT NULL ,
    tien_coc INT NOT NULL,
    status boolean,
    start_time timestamp DEFAULT CURRENT_TIMESTAMP,
    end_time timestamp NOT NULL,
    Foreign key (renter_id) REFERENCES renter(id),
    Foreign key (room_id) REFERENCES room(id)
);

create table renter_room {
    id INT  AUTO_INCREMENT PRIMARY KEY,
    room_id INT NOT NULL ,
    renter_id INT NOT NULL,
    Foreign key (room_id) REFERENCES room(id),
    Foreign key (renter_id) REFERENCES renter(id)
};

create table covenant (
    id INT  AUTO_INCREMENT PRIMARY KEY,
    renter_room_id INT NOT NULL,
    duration INT NOT NULL,
    pay_time INT NOT NULL,
    pre_pay INT,
    note varchar(200),
    started_date timestamp DEFAULT CURRENT_TIMESTAMP,
    end_date timestamp DEFAULT CURRENT_TIMESTAMP,
    Foreign key (renter_room_id) REFERENCES renter_room(id)
);

create table bill (
    id INT  AUTO_INCREMENT PRIMARY KEY,
    covenant_id INT NOT NULL REFERENCES covenant(id),
    total_price INT NOT NULL,
    debt INT,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
     Foreign key (covenant_id) REFERENCES covenant(id)
);

create table service(
    id INT  AUTO_INCREMENT PRIMARY KEY,
    room_id INT NOT NULL REFERENCES room(id),
    name varchar(100) NOT NULL,
    cost INT NOT NULL,
    unit varchar(30) NOT NULL,
    description varchar(200),
    Foreign key (room_id) REFERENCES room(id)
);

create table bill_service (
    id INT  AUTO_INCREMENT PRIMARY KEY,
    service_id INT NOT NULL REFERENCES service(id),
    bill_id INT NOT NULL REFERENCES  bill(id),
    num INT NOT NULL,
    Foreign key (bill_id) REFERENCES bill(id),
    Foreign key (service_id) REFERENCES service(id)
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
DROP DATABASE IF EXISTS it4409;
CREATE DATABASE it4409;

use it4409;

create table users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username varchar(50) NOT NULL unique,
    password varchar(70) NOT NULL,
    phone varchar(11) NOT NULL,
    status boolean,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP 
);

create table houseowners (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username varchar(50) NOT NULL unique,
    password varchar(50) NOT NULL,
    phone varchar(11) NOT NULL,
    status boolean,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP 
);

create table houses (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    size INT NOT NULL,
    houseowners_id INT NOT NULL REFERENCES houseowners(id),
    status boolean,
    price INT NOT NULL,
    location varchar(100) NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP 
);

create table posts (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50),
    img VARCHAR(50),
    body  varchar(250),
    houses_id INT REFERENCES houses(id),
    status boolean,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP
);

create table savedposts (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    post_id INT REFERENCES posts(id),
    user_id Int REFERENCES users(id),
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);

create table datcoc (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT REFERENCES users(id),
    house_id INT REFERENCES houses(id),
    tien_coc INT,
    status boolean,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP
);

create table hopdong (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    datcoc_id INT REFERENCES datcoc(id),
    started_date timestamp DEFAULT CURRENT_TIMESTAMP,
    end_date timestamp DEFAULT CURRENT_TIMESTAMP
);

create table hoadon (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    hopdong_id INT REFERENCES hopdong(id),
    electrical_price INT,
    manual_price INT,
    water_price INT,
    other_price INT,
    total_price INT,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);


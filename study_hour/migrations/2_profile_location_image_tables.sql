create table location_images
(
  id          serial not null
    constraint images_pkey
    primary key,
  location_id integer
    constraint images_locations__fk
    references locations,
  user_id     integer
    constraint images_users__fk
    references users,
  s3code      varchar(255)
);

alter table location_images
  owner to postgres;

-- auto-generated definition
create table profile_images
(
  id      serial not null
    constraint profile_images_pkey
    primary key,
  user_id integer
    constraint profile_images_users__fk
    references users,
  s3code      varchar(255)
);

alter table profile_images
  owner to postgres;




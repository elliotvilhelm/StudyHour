create table images
(
  id     serial not null
    constraint images_pkey
    primary key,
  s3code varchar(255)
);

alter table comments
  add image_id integer;

alter table locations
  add image_id integer;

alter table users 
  add image_id integer;

alter table images
  owner to postgres;

alter table comments
  add constraint comments_images__fk
foreign key (image_id) references images;

alter table comments
  add outlet boolean;

alter table comments
  add internet boolean;

alter table comments
  add noise_level smallint;

alter table locations
  add constraint locations_images__fk
foreign key (image_id) references images;

alter table users
  add constraint users_images__fk
foreign key (image_id) references images;




create table favorites
(
  id          serial not null
    constraint favorites_pkey
    primary key,
  user_id     integer,
  location_id integer
);

alter table favorites
  owner to postgres;

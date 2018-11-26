create table favorites
(
  id          integer not null
    constraint favorites_pkey
    primary key,
  user_id     integer
    constraint favorites_users__fk
    references users,
  location_id integer
    constraint favorites_locations__fk
    references locations
);

alter table favorites
  owner to postgres;

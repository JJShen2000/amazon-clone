#!/bin/bash
set -e

cat <<EOF > /docker-entrypoint-initdb.d/init-db.sql
CREATE DATABASE IF NOT EXISIS ${POSTGRES_DB};
CREATE DATABASE IF NOT EXISIS ${POSTGRES_DB}_test;
EOF

exec docker-entrypoint.sh postgres
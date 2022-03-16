#!/bin/bash
psql --username ${DB_USERNAME} ${POSTGRES_DB} -c "CREATE DATABASE ${POSTGRES_DB}_test;"
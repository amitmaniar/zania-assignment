#!/bin/bash
sqlite3 ./zania.db  "create table records (id INTEGER PRIMARY KEY, type TEXT, title TEXT, position INT);"
sqlite3 ./zania.db  "insert into records (type, title, position) values ('bank-draft','Bank Draft', 0);"
sqlite3 ./zania.db  "insert into records (type, title, position) values ('bill-of-lading','Bill of Lading', 1);"
sqlite3 ./zania.db  "insert into records (type, title, position) values ('invoice','Invoice', 2);"
sqlite3 ./zania.db  "insert into records (type, title, position) values ('bank-draft-2','Bank Draft 2', 3);"
sqlite3 ./zania.db  "insert into records (type, title, position) values ('bill-of-lading-2','Bill of Lading 2', 4);"

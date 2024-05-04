import {useEffect} from 'react';
import SQLite from 'react-native-sqlite-storage';

export const db = SQLite.openDatabase(
  {name: 'mydb.db', location: 'default'},
  succ => {
    console.log('db started');
  },
  error => {
    console.log('Error happend:', error);
  },
);
export const config = () => {
  db.executeSql(
    'CREATE TABLE IF NOT EXISTS address (id INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR, fullname VARCHAR, phone VARCHAR, state VARCHAR, city VARCHAR,colony VARCHAR,house VARCHAR,pin VARCHAR)',
    [],
    result => {
      console.log('Table created successfully');
    },
    error => {
      console.log('Create table error', error);
    },
  );
};

import { MySchema } from "./MySchema";
import Note from "./Moodel";
import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';


//creating the adapter

const adapter = new SQLiteAdapter({
    schema:MySchema
})

//creating database

export const database = new Database({
    adapter,
    modelClasses: [Note],
    actionEnabled: true
})
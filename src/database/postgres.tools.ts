import { Client } from 'pg';


export type TPostgresDataTypeNumeric = 'integer' 
export type TPostgresDataTypeDate = 'timestamp without time zone'
export type TPostgresDataTypeString = 'character varying'

export type TPostgresDataType = TPostgresDataTypeNumeric | TPostgresDataTypeDate | TPostgresDataTypeString

export const DATABASE_STRUCT = {
  users: {
    id: 'integer' ,
    created_at: 'timestamp without time zone',
    username: 'character varying',
    role: 'character varying'
  },
  calories: {

  }
};

export type TTableName =  keyof typeof DATABASE_STRUCT;
export type TTableColumn<T extends TTableName>  = keyof typeof DATABASE_STRUCT[T];

export const check_database_field = async (client: Client, table_name: TTableName) => 
{
  const query = `select * from information_schema.columns where table_name='${table_name}';`;
  const result = await client.query(query);  

	
  return result;
  
};

type DatabaseMetadata<T extends TTableName> = {
    db_name: T,
    column_names: TTableColumn<T>[],
    where_condition: string | undefined
}


export const pg_select_builder_query = <T extends TTableName>(metadata: DatabaseMetadata<T>) => 
{
  const { column_names, db_name, where_condition } = metadata;

  const columns_str = column_names.join(', ');
  const where_str = where_condition ? `WHERE ${where_condition}` : '';

  return `SELECT ${columns_str} FROM ${db_name} ${where_str};`;
};



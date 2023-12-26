import { toLower, toString } from 'ramda';
import { TTableColumn, TTableName } from '../database/postgres.tools';
import { table } from 'console';


export const QueryBuilder = {
  select,
  insert,
  delete: _delete
};

function select<T extends TTableName>(
  table_name: T,
  columns: TTableColumn<T>[] ,
  where_condition?: string
)
{
  const columns_str = [ ...new Set(columns) ].join(', ');

  const WHERE = where_condition ? `WHERE ${where_condition}` : '';
  
  return `SELECT ${columns_str} FROM ${table_name} ${WHERE};`;
}

function insert<T extends TTableName>(
  input: {
    table_name: T,
    columns: TTableColumn<T>[],
    values: (string | number) [],
    where_condition?: string
  }
)
{
  const { columns, table_name, values, where_condition } = input;
  
  const columns_str = `(${[ ...new Set(columns) ].join(', ')})`;
  const VALUES = 'VALUES (' + values.map(str => `'${str}'`).join(', ') + ')';

  const WHERE = where_condition ? `WHERE ${where_condition}` : '';
  
  return `INSERT INTO ${table_name} ${columns_str} ${VALUES} ${WHERE} ;`;
}

function _delete<T extends TTableName>
(
  input: {
    table: T,
    where_condition: string
  }
)
{
  const { table, where_condition } = input;
  const WHERE = where_condition ? `WHERE ${where_condition}` : '';

  return `DELETE FROM ${table} ${WHERE};`;
} 
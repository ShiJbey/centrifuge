declare module 'datascript' {
  type Database = any;

  type Connection = any;

  interface Datom {
    a: string | number;
    e: number;
    F: number;
    hb: number;
    m: number;
    tx: number;
  }

  type AttributeTag = ':db/ident' | ':db/valueType' | ':db/cardinality';

  type ValueType = BasicType | NumberType | SpecialType;

  type BasicType =
    | ':db.type/keyword'
    | ':db.type/string'
    | ':db.type/boolean'
    | ':db.type/ref'
    | ':db.type/instant';

  type NumberType =
    | ':db.type/long'
    | ':db.type/bigint'
    | ':db.type/float'
    | ':db.type/double'
    | ':db.type/bigdec';

  type SpecialType = ':db.type/uuid' | ':db.type/uri' | ':db.type/bytes';

  type Cardinality = ':db.cardinality/one' | ':db.cardinality/many';

  type Entity = { [key: string]: any };

  type EntityID = any;

  interface AttributeSpec {
    ':db/valueType'?: ValueType;
    ':db/cardinality'?: Cardinality;
    ':db/doc'?: string;
    ':db/unique'?: ':db.unique/value' | ':db.unique/identity';
    ':db/index'?: boolean;
    ':db/fulltext'?: boolean;
    ':db/isComponent'?: boolean;
    ':db/noHistory'?: boolean;
  }

  type Schema = {
    [ident: string]: AttributeSpec;
  };

  type Entry = any[];

  /** Retrieves a value of the database for reading */
  function db(conn: any): any;
  /** Creates a new DB with initial data (datoms) and a schema */
  function init_db(datoms: Datom[], schema: Schema): Database;
  /** Creates a completely empty DB */
  function empty_db(schema: Schema | string): Database;
  /** Returns the database value that is the basis for this entity */
  function entity_db(eid: EntityID): Database;
  /** Returns the value of the database containing only datoms satisfying the predicate */
  function filter(db: Database, pred: string[]);
  /** Check if database is filtered, ie. is an instance of FilteredDB */
  function is_filtered(db: Database);
  /** Create a connection (and DB) for a schema */
  function create_conn(schema: Schema): Connection;
  /** Create a connection from a DB */
  function conn_from_db(db: Database): Connection;
  /** Get a connection for a new DB created from a list of datoms (initial data) */
  function conn_from_datoms(datoms: Datom[], schema: Schema): Connection;
  /** Reset a DB connection */
  function reset_conn(conn: Connection, db: Database, txMeta?: any);
  /**  Creates a transaction on a DB connection, passing a list of entities to be added or retracted */
  function transact(conn: Connection, entities: any[], txMeta?: any);
  /** Applies transaction data to the database, but the source of the database is unaffected */
  function db_with(
    db: Database,
    entities: any[] | any[][] | { [key: string]: any }[]
  ): Database;
  /** query sources of data */
  function q<T = any>(query: string, db?: Database, rules?: any): T[];
  /** Pull attributes matching a pattern for an entity by ID */
  function pull<T = any>(db: Database, pattern: string[] | string, eid: EntityID): T;
  /** Pull attributes matching a pattern for entities matching a list of IDs */
  function pull_many(db: Database, pattern: string[], eids: EntityID[]);
  /** Returns a dynamic map of the entity's attributes for the given id, ident or lookup ref */
  function entity(db: Database, eid: EntityID): Entity;
  /** Get all attributes of an entity */
  function touch<T>(eid: EntityID): T;
  /** Attach a listener to a DB connection */
  function listen(conn: any, callback: () => any): void;
  /** Detach a listener from connection */
  function unlisten(conn: any, key: string): void;
  /** Set the range for an index over an attribute (See Datascript architecture) */
  function index_range(
    db: Database,
    attr: string[],
    start: number,
    end: number
  );
  /** Raw access to the index data, by index */
  function datoms(db: Database, index: string, components?: any[]): Datom[];
  /** Raw access to the index data, by index (For advanced use only) */
  function seek_datoms(
    db: Database,
    index: string,
    components?: any[]
  ): Datom[];
  /** Resolve a tempid to the actual id assigned in a database. */
  function resolve_tempid(tempIDs: number[], tempID: number): number;
  /** Generate a globally unique identifier (based in part on time in millis) */
  function squuid(): string;
  /** get the time part of a squuid */
  function squuid_time_millis(uuid: string): number;
}

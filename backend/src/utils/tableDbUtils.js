function addDefaultColumns(table) {
  table.timestamps(false, true);
}

function references(table, tableName) {
  table
    .integer(`${tableName}_id`)
    .unsigned()
    .references(`${tableName}_id`)
    .inTable(tableName)
    .notNullable()
    .onDelete('cascade');
}

function createTableHelper(
  knex,
  tables,
  colId,
  colString,
  tableName,
  tableReference = false
) {
  if (tableReference) {
    return knex.schema.createTable(tables, (table) => {
      table.increments(colId).notNullable();
      table.string(colString).notNullable();
      references(table, tableName);
      addDefaultColumns(table);
    });
  }
  return knex.schema.createTable(tables, (table) => {
    table.increments(colId).notNullable();
    table.string(colString).notNullable();
    addDefaultColumns(table);
  });
}

module.exports = {
  addDefaultColumns,
  references,
  createTableHelper,
};

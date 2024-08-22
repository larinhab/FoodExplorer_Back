exports.up = (knex) =>
    knex.schema.createTable("favorites", (table) => {
      table.increments("id");
      table.boolean("state").defaultTo(false);
      table
        .integer("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
  
      table
        .integer("plate_id")
        .references("id")
        .inTable("plates")
        .onDelete("CASCADE");
  
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  
  exports.down = (knex) => knex.schema.dropTable("favorites");
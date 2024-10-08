
exports.up = knex => knex.schema.createTable("plates", table => {
    table.increments("id")
    table.text("name")
    table.text("category")
    table.text("price")
    table.text("description")
    table.text("image")

    table.timestamp("created_at").defaultTo(knex.fn.now())
    table.timestamp("updated_at").defaultTo(knex.fn.now())    
});

exports.down = knex => knex.schema.createTable("plates", table => {

});
/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2mdqme116ws4p4t")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tlls2dp3",
    "name": "visible",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2mdqme116ws4p4t")

  // remove
  collection.schema.removeField("tlls2dp3")

  return dao.saveCollection(collection)
})

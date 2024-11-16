/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lcx4qxxqgyqo40d")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6nbskfzr",
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
  const collection = dao.findCollectionByNameOrId("lcx4qxxqgyqo40d")

  // remove
  collection.schema.removeField("6nbskfzr")

  return dao.saveCollection(collection)
})

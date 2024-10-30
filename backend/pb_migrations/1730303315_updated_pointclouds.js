/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w1ph0j058pfxidd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5hxjr5i1",
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
  const collection = dao.findCollectionByNameOrId("w1ph0j058pfxidd")

  // remove
  collection.schema.removeField("5hxjr5i1")

  return dao.saveCollection(collection)
})

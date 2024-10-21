/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b1nlnry84k1xvk6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1dek2zbx",
    "name": "favorite",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b1nlnry84k1xvk6")

  // remove
  collection.schema.removeField("1dek2zbx")

  return dao.saveCollection(collection)
})

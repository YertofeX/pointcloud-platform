/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2mdqme116ws4p4t")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1wrjrp3f",
    "name": "name",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2mdqme116ws4p4t")

  // remove
  collection.schema.removeField("1wrjrp3f")

  return dao.saveCollection(collection)
})

/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w1ph0j058pfxidd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dpcef3n9",
    "name": "name",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": 255,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w1ph0j058pfxidd")

  // remove
  collection.schema.removeField("dpcef3n9")

  return dao.saveCollection(collection)
})

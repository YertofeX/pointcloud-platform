/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2mdqme116ws4p4t")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ev3rfj1v",
    "name": "line",
    "type": "json",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2mdqme116ws4p4t")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ev3rfj1v",
    "name": "measurement",
    "type": "json",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
})
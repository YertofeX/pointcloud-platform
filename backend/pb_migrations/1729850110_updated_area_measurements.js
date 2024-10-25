/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lcx4qxxqgyqo40d")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0oilm7km",
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
  const collection = dao.findCollectionByNameOrId("lcx4qxxqgyqo40d")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0oilm7km",
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

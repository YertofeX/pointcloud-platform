/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b1nlnry84k1xvk6")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = ""
  collection.updateRule = ""
  collection.deleteRule = ""

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vqjlf46l",
    "name": "thumbnail",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/gif",
        "image/webp"
      ],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b1nlnry84k1xvk6")

  collection.listRule = "  @request.auth.id = owner.id"
  collection.viewRule = "@request.auth.id = owner.id"
  collection.createRule = "@request.auth.id = owner.id"
  collection.updateRule = "@request.auth.id = owner.id"
  collection.deleteRule = "@request.auth.id = owner.id"

  // remove
  collection.schema.removeField("vqjlf46l")

  return dao.saveCollection(collection)
})

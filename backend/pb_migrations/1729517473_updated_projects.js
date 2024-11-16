/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b1nlnry84k1xvk6")

  collection.listRule = "  @request.auth.id = owner.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b1nlnry84k1xvk6")

  collection.listRule = ""

  return dao.saveCollection(collection)
})

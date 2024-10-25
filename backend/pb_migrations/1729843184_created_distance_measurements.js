/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "2mdqme116ws4p4t",
    "created": "2024-10-25 07:59:44.582Z",
    "updated": "2024-10-25 07:59:44.582Z",
    "name": "distance_measurements",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "5vynqg4i",
        "name": "owner",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "chtwslec",
        "name": "project",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "b1nlnry84k1xvk6",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "7cr2ixtg",
        "name": "color",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 4,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ev3rfj1v",
        "name": "measurement",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 2000000
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("2mdqme116ws4p4t");

  return dao.deleteCollection(collection);
})

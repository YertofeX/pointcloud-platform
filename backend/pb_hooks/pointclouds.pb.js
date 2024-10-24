/// <reference path="../pb_data/types.d.ts" />

onRecordAfterCreateRequest((e) => {
  console.log(JSON.stringify(e.httpContext, null, 4));
  console.log(JSON.stringify(e.record, null, 4));
  console.log(JSON.stringify(e.uploadedFiles, null, 4));
}, "pointclouds");

/// <reference path="../pb_data/types.d.ts" />

onRecordAfterCreateRequest((e) => {
  console.log(e.httpContext);
  console.log(e.record);
  console.log(e.uploadedFiles);
}, "pointclouds");

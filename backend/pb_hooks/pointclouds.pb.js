/// <reference path="../pb_data/types.d.ts" />

onRecordAfterCreateRequest((e) => {
  console.log("httpContext:", JSON.stringify(e.httpContext, null, 4));
  console.log("record:", JSON.stringify(e.record, null, 4));
  console.log("uploadedFiles:", JSON.stringify(e.uploadedFiles, null, 4));

  const recordFilesDir = [
    "",
    "pb",
    "pb_data",
    "storage",
    e.record.baseFilesPath(),
  ].join("/");

  const raw = `${recordFilesDir}/${e.record.get("raw")}`;  
  

  const cmd = $os.cmd(
    "/potreeconverter/build/PotreeConverter",
    raw,
    "-o",
    recordFilesDir
  );

  console.log(JSON.stringify(cmd));
  const output = toString(cmd.output());
  console.log(output);

  const metadata = `metadata.json`;
  const hierarchy = `hierarchy.bin`;
  const octree = `octree.bin`;
  const log = `log.txt`;

  e.record.set("metadata", metadata);
  e.record.set("hierarchy", hierarchy);
  e.record.set("octree", octree);
  e.record.set("log", log);
  
  e.record.set("name", "hello there");
  
  $app.dao().saveRecord(e.record);
}, "pointclouds");

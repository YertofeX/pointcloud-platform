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

  // TODO: try https://pocketbase.io/jsvm/functions/_filesystem.fileFromPath.html

  const raw = `${recordFilesDir}/${e.record.get("raw")}`;  
  const metadata = `${recordFilesDir}/metadata.json`;
  const hierarchy = `${recordFilesDir}/hierarchy.bin`;
  const octree = `${recordFilesDir}/octree.bin`;
  const log = `${recordFilesDir}/log.txt`;

  const cmd = $os.cmd(
    "/potreeconverter/build/PotreeConverter",
    raw,
    "-o",
    recordFilesDir
  );
  
  console.log(JSON.stringify(cmd));
  const output = toString(cmd.output());
  console.log(output);
  
  e.record.set("metadata", metadata);
  e.record.set("hierarchy", hierarchy);
  e.record.set("octree", octree);
  e.record.set("log", log);
}, "pointclouds");

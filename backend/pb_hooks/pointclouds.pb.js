/// <reference path="../pb_data/types.d.ts" />

onRecordAfterCreateRequest((e) => {
  console.log(JSON.stringify(e));
  const recordFilesDir = [
    "",
    "pb",
    "pb_data",
    "storage",
    e.record.baseFilesPath(),
  ].join("/");

  const raw = `${recordFilesDir}/${e.record.get("raw")}`;

  console.log(raw);
  console.log(recordFilesDir);

  try {
    const cmd = $os.cmd(
      "/potreeconverter/build/PotreeConverter",
      raw,
      "-o",
      recordFilesDir
    );
    console.log("1")
    const res = cmd.combinedOutput();
    console.log("2")
    console.log(res);
    console.log("3")
    const output = toString(res);
    console.log("4")
    const metadata = `metadata.json`;
    const hierarchy = `hierarchy.bin`;
    const octree = `octree.bin`;
    const log = `log.txt`;
    console.log("5")
    e.record.set("metadata", metadata);
    e.record.set("hierarchy", hierarchy);
    e.record.set("octree", octree);
    e.record.set("log", log);
  
    $app.dao().saveRecord(e.record);
  } catch (error) {
    console.log("asd")
    console.log(toString(error))
  }


}, "pointclouds");

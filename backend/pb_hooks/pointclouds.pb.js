/// <reference path="../pb_data/types.d.ts" />

onRecordAfterCreateRequest((e) => {
  console.log("httpContext:", JSON.stringify(e.httpContext, null, 4));
  console.log("record:", JSON.stringify(e.record, null, 4));
  console.log("uploadedFiles:", JSON.stringify(e.uploadedFiles, null, 4));

  const recordFilesPath = [
    "",
    "pb",
    "pb_data",
    "storage",
    e.record.baseFilesPath(),
  ].join("/");
  console.log("recordFilesPath:", recordFilesPath);

  const cmd = $os.cmd(
    "/potreeconverter/PotreeConverter",
    "-i",
    `${recordFilesPath}/${e.record.get("raw")}`,
    "-o"`${recordFilesPath}/${e.record.get("raw").replace(".las", ".a")}`
  );
  const output = toString(cmd.output());
  console.log(output);
}, "pointclouds");

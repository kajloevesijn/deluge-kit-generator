import KitTemplate from "./KitTemplate";
import { createExport } from "./FileZipper";

export default function export_kit(sampleList: SampleData[]) {
  const random_name = Math.round(Math.random() * 20000000);

  const template = new KitTemplate();

  const xml_versioning_text = '<?xml version="1.0" encoding="UTF-8"?>';
  const final_xml = xml_versioning_text + template.finalKit(sampleList);

  createExport(random_name.toString(), final_xml, sampleList);
}

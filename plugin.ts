import { ExegesisPlugin } from "exegesis-express";

export function modifyServer(suffix: string): ExegesisPlugin {
  return {
    info: { name: "exegesis-plugin-modifyserver" },
    makeExegesisPlugin(data) {
      data.apiDoc = {
        ...data.apiDoc,
        server: [...(data.apiDoc.servers || []), { url: `/${suffix}` }],
      };
      return {};
    },
  };
}

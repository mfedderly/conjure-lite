import type { IObjectDefinition } from "conjure-api";
import dedent from "dedent";
import { generatorFactory } from "./generatorFactory.js";
import { getDocs } from "./getDocs.js";

export const objectCodeGenerator = generatorFactory<IObjectDefinition>(
  async function() {
    const { typeName: { name }, docs } = this.def;
    const fields = this.def.fields.map(f => `  ${f.fieldName}: ${this.getTypeForCode(f.type)};`)
      .join(
        "\n",
      );
    const source = getDocs(docs) + dedent`
export interface ${name} {
${fields}
}
    `;
    await this.writeFile(source);
  },
);

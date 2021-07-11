import { BodyTransFactory } from "../interface";
interface Scheme {
  type: string;
  properties?: Record<string, Scheme>;
  required?: string[];
  description?: string;
  items?: Scheme;
}
function createFormattedTypeFromScheme(content: string = "", level = 0) {
  return "    ".repeat(level) + content;
}
function partial(name: string | null, requiredList?: string[]) {
  return requiredList?.includes(name ?? "") ? "" : "?";
}
class Factory implements BodyTransFactory<Scheme, Scheme> {
  private trans(
    data: Scheme,
    level = 0,
    result: string[] = [],
    name: string | null = null,
    requiredList?: string[]
  ) {
    // 对象
    if (data.description) {
        result.push(createFormattedTypeFromScheme(`/**`, level));
        result.push(
          createFormattedTypeFromScheme(`/*${data.description}`, level)
        );
        result.push(createFormattedTypeFromScheme(` */`, level));
      }

    switch (data.type) {
      case "object": {
        result.push(
          createFormattedTypeFromScheme(
            name ? `${name}${partial(name, requiredList)}: {` : "{",
            level
          )
        );
        level++;
        for (let p in data.properties) {
          const v = data.properties[p];
          this.trans(v, level, result, p, data.required);
        }
        result.push(createFormattedTypeFromScheme(`}${level - 1 === 0 ? '' : ';'}`, level - 1));
        break;
      }
      case "array": {
        if (data.items && data.items.type !== "object") {
          result.push(
            createFormattedTypeFromScheme(
              name
                ? `${name}${partial(name, requiredList)}: ${data.items.type}[];`
                : `${data.items.type}[];`,
              level
            )
          );
        } else {
          result.push(
            createFormattedTypeFromScheme(
              name ? `${name}${partial(name, requiredList)}: {` : "{",
              level
            )
          );
          level++;
          if (!data.items) return;
          for (let p in data.items.properties) {
            const v = data.items.properties[p];
            this.trans(v, level, result, p, data.items.required);
          }
          result.push(createFormattedTypeFromScheme("}[];", level - 1));
        }
        break;
      }
      default: {
        result.push(
          createFormattedTypeFromScheme(
            `${name}${partial(name, requiredList)}: ${data.type};`,
            level
          )
        );
      }
    }
    return result;
  }

  buildBody(name: string, des: string, data: Scheme) {
    const header = [];
    const ENTER = `
    `;
    header.push(createFormattedTypeFromScheme(`/**`, 0));
    header.push(createFormattedTypeFromScheme(`/*${des}`, 0));
    header.push(createFormattedTypeFromScheme(`*/`, 0));
    const resutlArr = this.trans(data, 0, [], null, data?.required ?? []) || [];
    // 修改第一行
    const fline = `export interface ${name} {`;
    resutlArr[0] = fline;
    // 插入说明
    const result = [...header, ...resutlArr];
    return result.join(ENTER);
  }
}

export default {
  scheme: new Factory(),
};

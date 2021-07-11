export interface BodyTransFactory<T, V> {
    // buildBodyItem(data: T): string;
    buildBody(name: string, des: string, data: V): string;
}

export interface Scheme {
    // string|number|object|array等
    type: string;  
    // type 为 object的时候，该属性存在
    properties?: Record<string, Scheme>;  
    // type为object 或者array的时候，该属性存在，标记哪些属性是必须的
    required?: string[];
    // 描述
    description?: string;
    // 当type为array的时候，该属性存在
    items?: Scheme;
}

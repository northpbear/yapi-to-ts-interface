# Yapi to TS interface

A chrome Extension that can convert yapi to TypeScript's Interface type.

## Prerequisites

- [node + npm](https://nodejs.org/) (Current Version)

## Basic Example

we can get scheme from Yapi like:

```json
{
  "errcode": 0,
  "data": {
    "query_path": { "path": "/test/demo2", "params": [] },
    "type": "static",
    "req_body_is_json_schema": true,
    "res_body_is_json_schema": true,
    "method": "POST",
    "title": "test",
    "path": "/test/demo2",
    "req_params": [],
    "res_body_type": "json",
    "desc": "",
    "req_query": [],
    "req_headers": [
      {
        "required": "1",
        "_id": "60eab59dba5e0900158d05a0",
        "name": "Content-Type",
        "value": "application/json"
      }
    ],
    "req_body_form": [
      {
        "required": "1",
        "_id": "60eab59dba5e0900158d05a3",
        "name": "a",
        "type": "text",
        "example": "111",
        "desc": "111"
      },
      {
        "required": "0",
        "_id": "60eab59dba5e0900158d05a2",
        "name": "b",
        "type": "text",
        "example": "222",
        "desc": "222"
      },
      {
        "required": "1",
        "_id": "60eab59dba5e0900158d05a1",
        "name": "c",
        "type": "text",
        "example": "444",
        "desc": "444"
      }
    ],
    "res_body": "{\"$schema\":\"http://json-schema.org/draft-04/schema#\",\"type\":\"object\",\"properties\":{\"data\":{\"type\":\"object\",\"properties\":{\"list\":{\"type\":\"array\",\"items\":{\"type\":\"object\",\"properties\":{\"id\":{\"type\":\"number\"},\"label\":{\"type\":\"string\"},\"Pid\":{\"type\":\"number\"},\"obj\":{\"type\":\"object\",\"properties\":{\"name\":{\"type\":\"string\"}}}},\"required\":[\"id\",\"label\",\"Pid\",\"obj\"]}},\"stringArrany\":{\"type\":\"array\",\"items\":{\"type\":\"string\"}}}}}}",
    "req_body_type": "json",
    "req_body_other": "{\"type\":\"object\",\"title\":\"empty object\",\"properties\":{\"a\":{\"type\":\"string\"},\"obj\":{\"type\":\"object\",\"properties\":{\"name\":{\"type\":\"string\",\"description\":\"name\"},\"age\":{\"type\":\"string\",\"description\":\"age\"},\"itemList\":{\"type\":\"array\",\"items\":{\"type\":\"string\",\"description\":\"id\"}},\"obj2\":{\"type\":\"object\",\"properties\":{\"zzz\":{\"type\":\"string\"},\"xxxx\":{\"type\":\"string\"}},\"required\":[\"zzz\",\"xxxx\"]}},\"description\":\"asda\",\"required\":[\"name\",\"age\",\"itemList\",\"obj2\"]}},\"required\":[\"a\",\"obj\"]}"
  }
}
```

In my opinion, the attributes we need to focus on such as **path**, **res_body**, **req_body_other** ..., with this extension, you can generated **TypeScript Interface** from those attributes.
the extension will output like:

```ts
/**
/*test参数
*/
export interface testParam {
    a: string;
    /**
    /*asda
     */
    obj: {
        /**
        /*name
        */
        name: string;
        /**
        /*age
        */
        age: string;
        itemList: string[];
        obj2: {
            zzz: string;
            xxxx: string;
        };
    };
}

/**
/*test/demo2
*/
export interface testData {
    data?: {
        list?: {
        id: number;
        label: string;
        Pid: number;
        obj: {
            name?: string;
        };
        }[];
        stringArrany?: string[];
    };
}
```
Welcome to use and raise issue.

## Setup

```
npm install
```

## Import as Visual Studio Code project

...

## Build

```
npm run build
```

## Build in watch mode

### terminal

```
npm run watch
```

### Visual Studio Code

Run watch mode.

type `Ctrl + Shift + B`

## Load extension to chrome

Load `dist` directory

import $ from "jquery";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import factory from "./factory";
const isYapi = () => {
  return document.location.host === "yapi.smart-xwork.cn";
};
const bodyDom = $(document.body);
bodyDom.append('<div id="testAAAAAAAA"></div>');

const warpStyles: React.CSSProperties = {
  position: "fixed",
  right: 16,
  top: "50%",
  transform: "translateY(-50%)",
  display: "flex",
  flexDirection: "column",
};
const btnsStyles = { margin: 8 };
// 拼接请求地址
function getUrl() {
  const API_ID = location.href.split("/").pop();
  if ((API_ID && isNaN(parseInt(API_ID, 10))) || !API_ID) {
    return "null";
  }
  return "/api/interface/get?id=" + API_ID;
}
function copyText(text: string, callback: Function) {
    var tag = document.createElement('textarea');
    tag.setAttribute('id', 'cp_input_');
    tag.value = text;
    document.body.appendChild(tag);
    (document.getElementById('cp_input_') as HTMLInputElement).select();
    document.execCommand('copy');
    document.getElementById('cp_input_')?.remove();
    if (callback) { callback(text) }
}
const ToolsBar: React.FC<any> = () => {
  const [url, setUrl] = useState("null");
  const copyInterface = () => {
    const url = getUrl();
    // setUrl
    setUrl(url);
  };
  useEffect(() => {
    if (url === "null") return;

    new Promise((resolve, reject) => {
      $.ajax({
        type: "get",
        url,
        success: resolve,
        error: reject,
      });
    })
      .then((resp: any) => {
        let { data } = resp;
        let reqInterfaceString: any;
        let resInterfaceString: any;
        if(data.res_body_type !== 'json'){
            alert('暂不支持返回值格式不是json格式的接口');
            return;
        }
        let schema = JSON.parse(data.res_body);
        let reqSchema = JSON.parse(data.req_body_other);
        reqInterfaceString = factory.scheme.buildBody(data.title + "Param", data.title + "参数", reqSchema);
        resInterfaceString = factory.scheme.buildBody(data.title + "Data", data.path.slice(1), schema);
        copyText(`
        ${reqInterfaceString}

        ${resInterfaceString}`, ()=>{
            alert("复制成功");
        })
      })
      .catch((error) => {
        console.error(error);
      }).finally(() => {
        setUrl('null');
      });
  }, [url]);
  return (
    <React.Fragment>
      {isYapi() ? (
        <div style={warpStyles}>
          <button onClick={copyInterface} style={btnsStyles}>
            Copy Interface
          </button>
        </div>
      ) : null}
    </React.Fragment>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ToolsBar />
  </React.StrictMode>,
  document.getElementById("testAAAAAAAA")
);

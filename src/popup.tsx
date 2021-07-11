import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Popup = () => {
  return (
    <div style={{whiteSpace: 'nowrap'}}>
      仅在Yapi页面生效，点击右侧Copy Interface按钮拷贝接口
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);

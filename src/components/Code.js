import React, { useState, useEffect } from "react";

import Color from "color";

const Code = (props) => {
  const { charColors } = props;

  const result = charColors.reduce((acc, cur) => {
    const hex = Color(cur.color).hex().toUpperCase();
    return `${acc}&${hex}${cur.character}`;
  }, "");

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code">
      <input
        readOnly
        value={result}
        onFocus={(event) => event.target.select()}
      />
      <div className="copy-button" onClick={handleCopy}>
        {copied ? "COPIED!" : "COPY"}
      </div>
    </div>
  );
};

export default Code;

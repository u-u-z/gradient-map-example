import React from "react";

import colors from "../colors.json";

const Swatch = (props) => {
  const { onChange } = props;
  const swatches = Object.values(colors).map((c) => Object.values(c));

  const onSelect = (color) => {
    onChange(color);
  };

  const els = swatches.map((s) => {
    const colorEls = s.map((c) => {
      return (
        <div
          className="color"
          style={{ backgroundColor: c }}
          onClick={() => onSelect(c)}
        />
      );
    });
    return <div className="column">{colorEls}</div>;
  });

  return <div className="swatch">{els}</div>;
};

export default Swatch;

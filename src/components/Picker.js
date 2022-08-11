import React, { useState, useEffect } from "react";

import { GradientPicker } from "react-linear-gradient-picker";

import CustomColorPicker from "./CustomColorPicker";

console.log(GradientPicker);

const Picker = (props) => {
  const { palette, setPalette } = props;

  return (
    <div className="picker">
      <GradientPicker
        {...{
          width: 800,
          paletteHeight: 40,
          palette,
          onPaletteChange: setPalette,
          maxStops: 18,
          stopRemovalDrop: 75
        }}
      >
        <WrappedCustomPicker />
      </GradientPicker>
    </div>
  );
};

const rgbToRgba = (rgb, a = 1) =>
  rgb.replace("rgb(", "rgba(").replace(")", `, ${a})`);

const WrappedCustomPicker = ({ onSelect, ...rest }) => (
  <CustomColorPicker
    {...rest}
    color={rgbToRgba(rest.color, rest.opacity)}
    onChange={(c) => {
      const { r, g, b, a } = c.rgb;
      onSelect(`rgb(${r}, ${g}, ${b})`, a);
    }}
  />
);

export default Picker;

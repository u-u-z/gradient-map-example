import React, { useState, useEffect } from "react";

import { CustomPicker } from "react-color";

import Swatch from "./Swatch";

var {
  Hue,
  Saturation,
  EditableInput
} = require("react-color/lib/components/common");

const CustomColorPicker = CustomPicker((props) => {
  const { onChange, hex, rgb } = props;

  const [rgbInputs, setRGBInputs] = useState({
    ...rgb
  });

  const { r, g, b } = rgb;
  const changeRed = (value) => {
    onChange({ r: value, g, b });
  };
  const changeGreen = (value) => {
    onChange({ r, g: value, b });
  };
  const changeBlue = (value) => {
    onChange({ r, g, b: value });
  };
  return (
    <div className="custom-picker">
      <div className="instructions">
        Click the slider above to add stops. Drag the stops off to remove.
      </div>
      <div className="wrapper">
        <div className="saturation">
          <Saturation pointer={SaturationPointer} {...props} />
        </div>
        <div className="hue-wrapper">
          <div className="hue">
            <Hue pointer={HuePointer} {...props} />
          </div>
          <div className="inputs">
            <div className="input">
              <div className="label">Hex</div>
              <EditableInput value={hex} onChange={onChange} />
            </div>
            <div className="input">
              <div className="label">R</div>
              <EditableInput value={rgb.r} onChange={changeRed} />
            </div>
            <div className="input">
              <div className="label">G</div>
              <EditableInput value={rgb.g} onChange={changeGreen} />
            </div>
            <div className="input">
              <div className="label">B</div>
              <EditableInput value={rgb.b} onChange={changeBlue} />
            </div>
          </div>
        </div>
      </div>
      <Swatch onChange={onChange} />
    </div>
  );
});

const HuePointer = (props) => {
  const hue = props.hsl.h;
  const hueString = `hsl(${hue}, 100%, 50%)`;
  return <div className="hue-pointer" style={{ backgroundColor: hueString }} />;
};

const SaturationPointer = (props) => (
  <div className="saturation-pointer" style={{ backgroundColor: props.hex }} />
);

export default CustomColorPicker;

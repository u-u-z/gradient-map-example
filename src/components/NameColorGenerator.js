import React, { useState, useEffect } from "react";
import Color from "color";
import { pic } from "./pic";

import Preview from "./Preview";
import Picker from "./Picker";
import Code from "./Code";

import gradients from "../gradients.json";

const NameColorGenerator = () => {
  const [palette, setPalette] = useState([
    { offset: "0.00", color: "rgb(49, 207, 180)" },
    { offset: "1.00", color: "rgb(126, 32, 207)" }
  ]);

  const [inputString, setInputString] = useState("##");

  const [charColors, setCharColors] = useState([]);
  const [colorList, setColorList] = useState([]);

  const canvas = React.useRef();

  // Consider using the relative widths of characters to improve
  // accuracy of the gradient.
  useEffect(() => {
    const colorAtPercentRGB = (percent) => {
      if (percent <= palette[0].offset) {
        return palette[0].color;
      }
      if (percent >= palette[palette.length - 1].offset) {
        return palette[palette.length - 1].color;
      }
      const endColorIndex = palette.findIndex((e) => e.offset >= percent);
      const endColor = palette[endColorIndex];
      const startColor = palette[endColorIndex - 1];
      const percentBetween =
        (percent - startColor.offset) / (endColor.offset - startColor.offset);
      const result = Color(startColor.color).mix(
        Color(endColor.color),
        percentBetween
      );

      return result.rgb().toString();
    };

    let resultList = [];

    for (let i = 0; i < 255; i++) {
      const p = (i + 1) / 255;
      const colorResult = colorAtPercentRGB(p);
      resultList.push(colorResult);
    }

    setColorList(resultList);
  }, [inputString, palette]);

  const resetImage = () => {
    const context = canvas.current.getContext("2d");
    const defaultImage = new Image();
    defaultImage.src = pic;
    defaultImage.onload = () => {
      context.drawImage(defaultImage, 0, 0, 300, 150);
    };
  };

  useEffect(() => {
    resetImage();
  }, []);

  // const hexToRGB = (hex) => {
  //   console.log(hex);
  //   const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  //   const { r, g, b } = {
  //     r: parseInt(result[1], 16),
  //     g: parseInt(result[2], 16),
  //     b: parseInt(result[3], 16)
  //   };
  //   return `rgb(${r},${g},${b})`;
  // };

  // const randomize = () => {
  //   const gradient = gradients[Math.floor(Math.random() * gradients.length)];
  //   const colorObject = gradient.colors.map((color, i) => {
  //     const offset = i / (gradient.colors.length - 1);
  //     const rgbString = hexToRGB(color);
  //     return { offset, color: rgbString };
  //   });

  //   setPalette(colorObject);
  // };

  const reverse = () => {
    const newPalette = palette.map((stop, i) => {
      const offset = stop.offset;
      const color = palette[palette.length - (i + 1)].color;
      return { offset, color };
    });

    setPalette(newPalette);
  };

  const convertImage = () => {
    const colors = colorList.map((item) => {
      let str = item.replace("rgb(", "");
      str = str.replace(")", "");
      return str.split(", ").map((i) => Number(i));
    });

    console.log(colors[25][0], colors.length, colors);

    const context = canvas.current.getContext("2d");
    const imageData = context.getImageData(0, 0, 150, 150);
    const pixels = imageData.data;
    const num = pixels.length;

    context.clearRect(0, 0, 150, 150);
    console.log("size", num);

    const averageColorList = [];

    console.log(`start covert`, num);

    for (let i = 0; i < num; i++) {
      const average = parseInt(
        (pixels[i * 4] + pixels[i * 4 + 1] + pixels[i * 4 + 2]) / 3
      );

      if (average > 0 && average < 254) {
        pixels[i * 4] = colors[(average % 254) - 1][0];
        pixels[i * 4 + 1] = colors[(average % 254) - 1][1];
        pixels[i * 4 + 2] = colors[(average % 254) - 1][2];
      }
    }
    context.putImageData(imageData, 0, 0);
    console.log(averageColorList);
  };

  return (
    <div className="name-colors">
      <div className="instructions">CODE</div>
      <canvas
        id="canvas"
        style={{ height: "500px", width: "500px" }}
        ref={canvas}
      />
      <textarea
        style={{
          marginTop: "50px",
          height: "200px",
          width: "100%",
          color: "#5CFF77",
          background: "#000"
        }}
        value={JSON.stringify(colorList)}
      />
      {/* <div className="button randomize" onClick={randomize}>
        Randomize
      </div>*/}
      <div className="button reverse" onClick={reverse}>
        Reverse
      </div>

      <div className="button reverse" onClick={resetImage}>
        resetImage
      </div>

      <div className="button reverse" onClick={convertImage}>
        Covert
      </div>

      <Picker palette={palette} setPalette={setPalette} />
      {/* <div className="instructions">Send this code to your favorite admin!</div>
      <Code charColors={charColors} /> */}
    </div>
  );
};

export default NameColorGenerator;

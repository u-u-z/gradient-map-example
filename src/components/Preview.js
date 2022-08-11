import React, { useState, useEffect } from "react";

import Color from "color";

const Preview = (props) => {
  const { setInputString, charColors } = props;

  const handleChange = (e) => {
    setInputString(e.target.value);
  };

  const charEls = charColors.map((char) => (
    <span style={{ color: char.color }}>{char.character}</span>
  ));

  const shadow = (color) => {
    return Color.rgb(
      Color(color)
        .array()
        .map((x) => Math.floor(x / 4))
    ).toString();
  };

  const shadowEls = charColors.map((char, i) => {
    return (
      <span key={i} style={{ color: shadow(char.color) }}>
        {char.character}
      </span>
    );
  });

  return (
    <div className="preview">
      <div className="name">
        <input
          className="editable"
          defaultValue="Username"
          onChange={handleChange}
        />
        <div className="visible">{charEls}</div>
        <div className="shadow">{shadowEls}</div>
      </div>
    </div>
  );
};

export default Preview;

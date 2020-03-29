import React from "react";

const Hukamnama = ({ hukamnama, language }) => {
  return (
    <h1 className="h2">
      {hukamnama.hukamnama.map(item => {
        let filter;
        let parent;
        switch (language) {
          case "PB":
            filter = item.line.gurmukhi.unicode;
            parent = "punjabi";
            break;
          case "HI":
            filter = item.line.transliteration.devanagari.text;
            parent = "hindi";
            break;
          case "SP":
            filter = item.line.translation.spanish;
            parent = "spanish";
            break;
          case "EN":
            filter = item.line.translation.english.default;
            parent = "english";
            break;
          default:
            break;
        }
        return (
          <span
            key={item.line.id}
            className={`mr-2 font-weight-normal ${parent}`}
          >
            {filter}
          </span>
        );
      })}
    </h1>
  );
};

export default Hukamnama;

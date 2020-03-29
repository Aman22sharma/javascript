const app = () => {
  const unicodeInput = document.querySelector("#input-unicode");
  const unicodeButton = document.querySelector("#btn-unicode");
  const unicode = document.querySelector("#unicode");
  unicode.classList.add("d-none");
  const getUnicode = str => {
    let total = str.length;
    let result = "";
    let index = 0;
    while (total > 0) {
      const newValue =
        total === 1
          ? String(`${str.charCodeAt(index)}`)
          : String(`${str.charCodeAt(index)}/`);
      result += newValue;
      index++;
      total--;
    }
    return result;
  };
  unicodeButton.addEventListener("click", e => {
    e.preventDefault();
    if (!unicodeInput.value) return;
    unicode.classList.remove("d-none");
    unicode.textContent = getUnicode(unicodeInput.value);
  });
};

app();

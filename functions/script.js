const app = () => {
  // MINIMUM NUMBER
  const minimumInput = document.querySelector("#input-minimum");
  const minimumButton = document.querySelector("#btn-minimum");
  const minimum = document.querySelector("#minimum");
  minimum.classList.add("d-none");
  const getMinimum = str => {
    let arr = str.split(",");
    let prev;
    for (let i = 0; i < arr.length - 1; i++) {
      !prev
        ? (prev =
          Number(arr[i]) > Number(arr[i + 1])
            ? Number(arr[i + 1])
            : Number(arr[i]))
        : (prev = prev > Number(arr[i + 1]) ? Number(arr[i + 1]) : prev);
    }
    minimum.innerHTML = ``;
    minimum.innerHTML += `${prev}<br>`;
  };
  minimumButton.addEventListener("click", e => {
    e.preventDefault();
    if (
      !minimumInput.value.replace(/\s/g, "") ||
      minimumInput.value.indexOf(",") === -1
    ) {
      minimum.classList.add("d-none");
      minimum.innerHTML += ``;
      return;
    }
    minimum.classList.remove("d-none");
    getMinimum(minimumInput.value);
  });
  // ODD/EVEN
  const checkTypeInput = document.querySelector("#input-checkType");
  const checkTypeButton = document.querySelector("#btn-checkType");
  const checkType = document.querySelector("#checkType");
  checkType.classList.add("d-none");
  const getCheckType = str => {
    const number = Math.abs(Number(str));
    const isEven = target => {
      const find = target => {
        if (target === 0) return true;
        else if (target === 1) return false;
        else {
          return find(target - 2);
        }
      };
      return find(target);
    };
    checkType.innerHTML = ``;
    checkType.innerHTML += `${
      isEven(number) ? "It is Even." : "It is Odd."
      }<br>`;
  };
  checkTypeButton.addEventListener("click", e => {
    e.preventDefault();
    if (
      !checkTypeInput.value.replace(/\s/g, "") ||
      isNaN(checkTypeInput.value)
    ) {
      checkType.classList.add("d-none");
      checkType.innerHTML += ``;
      return;
    }
    checkType.classList.remove("d-none");
    getCheckType(checkTypeInput.value);
  });
  // BEAN COUNTING
  const beanCountInput = document.querySelector("#input-beanCount");
  const beanCountButton = document.querySelector("#btn-beanCount");
  const beanCount = document.querySelector("#beanCount");
  beanCount.classList.add("d-none");
  const getBeanCount = str => {
    const checkBeans = str => {
      let arr = str.split(",");
      let sentence = arr[0];
      let keyword = arr[1];
      let counter = 0;
      for (let i = 0; i < sentence.length; i++) {
        if (sentence[i] === keyword) {
          counter++;
          continue;
        }
      }
      return counter;
    };
    beanCount.innerHTML = ``;
    beanCount.innerHTML += `${checkBeans(str)}<br>`;
  };
  beanCountButton.addEventListener("click", e => {
    e.preventDefault();
    if (
      !beanCountInput.value.replace(/\s/g, "") ||
      beanCountInput.value.indexOf(",") === -1
    ) {
      beanCount.classList.add("d-none");
      beanCount.innerHTML += ``;
      return;
    }
    beanCount.classList.remove("d-none");
    getBeanCount(beanCountInput.value);
  });
};

app();

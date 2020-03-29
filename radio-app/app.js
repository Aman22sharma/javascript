const app = () => {
  const playButton = document.querySelectorAll(".play");
  const pauseButton = document.querySelectorAll(".pause");
  const enableButton = btn => {
    btn.removeAttribute("disabled", "disabled");
    btn.classList.remove("disabled");
  };
  const disableButton = btn => {
    btn.setAttribute("disabled", "disabled");
    btn.classList.add("disabled");
  };
  const defaults = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  let audio;
  playButton.forEach(btn => {
    btn.addEventListener("click", e => {
      defaults(e);
      let current = e.currentTarget;
      let track = current.dataset.sound;
      let sibling = current.closest(".btns").querySelector(".pause");
      sibling.classList.add("active");
      enableButton(sibling);
      disableButton(current);
      playButton.forEach(btn => disableButton(btn));
      audio = new Audio(track);
      audio.play();
    });
  });
  pauseButton.forEach(btn => {
    disableButton(btn);
    btn.addEventListener("click", e => {
      defaults(e);
      let current = e.currentTarget;
      let sibling = current.closest(".btns").querySelector(".play");
      current.classList.remove("active");
      enableButton(sibling);
      disableButton(current);
      playButton.forEach(btn => enableButton(btn));
      audio.pause();
    });
  });
};

app();

'use strict';

let button = document.querySelector('.card__button');
let message = `Spicy jalapeno bacon ipsum dolor amet sed t-bone eiusmod tempor, pork chop jowl leberkas pastrami turducken meatball do drumstick. Cupim pork belly do, deserunt enim sed flank tenderloin ground round sirloin. Bresaola landjaeger kielbasa frankfurter et in anim cupidatat cow. Sint cupim jowl in tongue drumstick. Nulla laboris turkey cow anim. Cupidatat enim ground round shoulder. Capicola nisi ad alcatra labore proident in pastrami laborum ut velit pork belly.`;

button.addEventListener('click', copy);

function copy() {
  navigator
  .clipboard
  .writeText(message)
  .then(
    () => console.log(`Content copied to clipboard successfully.`),
    () => console.log(`Content copied to clipboard failed to copy.`)
  );
}
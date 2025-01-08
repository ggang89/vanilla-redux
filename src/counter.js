import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerText = 0;

// 오류방지를 위해 string을 넣은 변수 사용
const ADD = "ADD";
const MINUS = "MINUS";

const reducer = (count = 0, action) => {
  // if (action.type === "ADD") {
  //   return count + 1;
  // } else if (action.type === "MINUS") {
  //   return count - 1;
  // } else {
  //   return count;
  // }

  // switch 문으로 변경
  switch (action.type) {
    case ADD:
      return count + 1;
      break;
    case MINUS:
      return count - 1;
      break;
    default:
      return count;
      break;
  }
};

const countStore = createStore(reducer);

const onChange = () => {
  number.innerText = countStore.getState();
};

countStore.subscribe(onChange); // store에서 변화를 감지

const handleAdd = () => {
  countStore.dispatch({ type: "ADD" }); // 액션은 무조건 객체형태
};
add.addEventListener("click", handleAdd);
minus.addEventListener("click", () => countStore.dispatch({ type: "MINUS" }));


import counterReducer from '../stores/cart.js';

const Other = () => {

  const algo = counterReducer;

  function increment() {
    algo.dispatch({type: "increment"});
  }

  function decrement() {
    algo.dispatch({type: "decrement"});
  }

  return(
    <div>
      Aqui también se debe de actualizar, Carrito con Redux, <button onClick = {decrement}>-</button> {algo.getState().value} <button onClick = {increment}>+</button>
    </div>
  );
}

const Test = () => {

  const algo = counterReducer;

  function increment() {
    algo.dispatch({type: "increment"});
    console.log(algo.getState().value);
  }

  function decrement() {
    algo.dispatch({type: "decrement"});
    console.log(algo.getState().value);
  }

  return(
    <div style = {{padding: "10px"}}>
      <Other/>
      Carrito con Redux, <button onClick = {decrement}>-</button> {algo.getState().value} <button onClick = {increment}>+</button>
    </div>
  );
};

export default Test;
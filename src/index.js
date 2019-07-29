import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider, connect } from "react-redux";

import "./styles.css";

const addItem = (name, price) => {
  return {
    type: "ADD_ITEM",
    item: {
      name: name,
      price: price
    }
  };
};

const deleteItem = index => {
  return {
    type: "DELETE_ITEM",
    index: index
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.item];
    case "DELETE_ITEM":
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];
    default:
      return state;
  }
};

let store = createStore(reducer);

const Item = props => {
  return (
    <div>
      <div>
        Item: {props.name} | Price: {props.price}
      </div>
      <button onClick={() => props.onDlete(props.index)}>DELETE</button>
    </div>
  );
};

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", price: "" };
  }

  handleChangeName(e) {
    this.setState({ name: e.target.value });
  }

  handleChangePrice(e) {
    this.setState({ price: e.target.value });
  }

  addItem() {
    this.props.onAdd(this.state.name, this.state.price);
    this.setState({ name: "", price: "" });
  }

  render() {
    return (
      <div>
        <input
          onChange={this.handleChangeName.bind(this)}
          value={this.state.name}
        />
        <input
          onChange={this.handleChangePrice.bind(this)}
          value={this.state.price}
        />
        <button onClick={() => this.addItem()}>ADD</button>
      </div>
    );
  }
}

const ItemsList = props => {
  return (
    <div>
      <Input onAdd={props.onAdd} />
      {props.items.map((item, index) => {
        return (
          <Item
            onDlete={props.onDlete}
            index={index}
            name={item.name}
            price={item.price}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    items: state
  };
};

const maptchDispatchToProps = dispatch => {
  return {
    onAdd: (name, price) => {
      console.log(dispatch(addItem(name, price)));
    },
    onDlete: id => {
      console.log(dispatch(deleteItem(id)));
    }
  };
};

const ItemsListContainer = connect(
  mapStateToProps,
  maptchDispatchToProps
)(ItemsList);

function App() {
  return (
    <div className="App">
      <ItemsListContainer />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

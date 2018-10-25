import React from "react";
import { StyleSheet, Text, View, Button, TextInput, FlatList, AsyncStorage } from "react-native";

export default class Todos extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "",
      todos: []
    };
  }

  handleChangeText = text => {
    this.setState({ text });
  };

  handleAdd = () => {
    let todos = this.state.todos.slice();
    todos.push({
      text: this.state.text,
      key: this.state.text + this.state.todos.length,
      completed: false
    });
    this.setState({ text: "", todos });
  };

  handleCompletedToggle = itemKey => {
    let todos = this.state.todos.slice();
    todos.map(todo => {
      if (todo.key === itemKey) {
        todo.completed = !todo.completed;
      }
    });
    this.setState({ todos });
  };

  handleRemove = () => {
    let todos = this.state.todos.slice();
    filteredTodos = todos.filter(todo => {
      if (!todo.completed) {
        return todo;
      }
    });
    this.setState({ todos: filteredTodos });
  };

  componentDidMount() {
    const todos = AsyncStorage.getItem("todos");
    if (todos !== null) {
      todos
        .then(res => {
          const parsedTodos = JSON.parse(res);
          this.setState({ todos: parsedTodos });
        })
        .catch(err => {
          console.log(err, "error on retrieval of todos");
        });
    }
  }

  componentWillUnmount() {
    console.log("exiting");
    const todos = this.state.todos.slice();
    AsyncStorage.setItem("todos", JSON.stringify(todos), err => {
      if (err) {
        console.log(err, "Something went wrong with setting items.");
      } else {
        console.log("Todos have been set");
      }
    });
  }

  render() {
    console.log("this.state.text is: ", this.state.text);
    console.log("this.state.todos is: ", this.state.todos);
    return (
      <View style={container}>
        {this.state.todos.length === 0 ? (
          <Text style={textFont}>No todos, you're free!</Text>
        ) : (
          <Text style={textFont}>You've got work to do!</Text>
        )}
        <TextInput
          onChangeText={this.handleChangeText}
          value={this.state.text}
          placeholder="Add Todo here"
        />
        <Button title="Add Todo" onPress={this.handleAdd} />
        <FlatList
          data={this.state.todos}
          renderItem={({ item, key }) => {
            return (
              <View key={item.key}>
                <Text
                  onPress={() => this.handleCompletedToggle(item.key)}
                  style={item.completed ? styles.lineThrough : null}
                >
                  {item.text}
                </Text>
              </View>
            );
          }}
        />
        <Button title="Remove Completed" onPress={this.handleRemove} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  lineThrough: {
    textDecorationLine: "line-through"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 33
  },
  textFont: {
    fontSize: 28
  }
});

const { container, textFont } = styles;

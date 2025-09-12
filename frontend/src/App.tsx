import TodoFilter from "./components/TodoFilter";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <TodoInput />
        <TodoFilter />
        <TodoList />
      </div>
    </>
  );
}

export default App;

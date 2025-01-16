import ReplySectionComponent from "./components/ReplySectionComponent";

function App() {
  return (
    <div className="App">
      <h1>Nested comments</h1>
      <ReplySectionComponent parentId={Date.now()} prevComments={[]} />
    </div>
  );
}

export default App;

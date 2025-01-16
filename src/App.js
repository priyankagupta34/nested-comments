import ReplySectionComponent from "./components/ReplySectionComponent";
import { TESTCOMMENTS } from "./media/test";

function App() {
  return (
    <div className="App">
      <h1>Nested comments</h1>
      <ReplySectionComponent
        parentId={Date.now()}
        prevComments={TESTCOMMENTS}
      />
    </div>
  );
}

export default App;

import { useState } from 'react';
import './App.css';
import Editor from './Components/Editor';

function App() {

  const [code, setCode] = useState("")


  return (
    <div className="App">
      <h1>QuantumEditor</h1>
      <Editor code={code} setCode={setCode} />
    </div>
  );
}

export default App;

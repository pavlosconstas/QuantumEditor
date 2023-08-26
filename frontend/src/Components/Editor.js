import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css'; // Import CodeMirror styles
import '../qasm/custom-lang.js'
import './custom-css.css';

const Editor = ({code, setCode}) => {

    const options = {
        mode: 'qasm', // Set the mode to your custom language
        lineNumbers: true,
        theme: 'material',
      };

    return ( 
        <CodeMirror options={options} value={code} onBeforeChange={(editor, data, value) => {
            setCode(value)
        }}/>
     );
}
 
export default Editor;
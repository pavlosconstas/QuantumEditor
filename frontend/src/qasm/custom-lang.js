import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css'

CodeMirror.defineMode('qasm', function(config, parserConfig) {
  // List of QASM keywords
  const keywords = [
    'gate', 'qreg', 'creg', 'measure', 'reset', // Add more keywords as needed
  ];

  // Regular expression for matching QASM keywords
  const keywordRegex = new RegExp('\\b(' + keywords.join('|') + ')\\b', 'i');

  // Regular expression for matching numbers (including floating-point numbers)
  const numberRegex = /[+-]?\d+(\.\d+)?/;

  function tokenize(stream, state) {
    // Match whitespace
    if (stream.eatSpace()) {
      return null;
    }

    // Match QASM keywords
    if (stream.match(keywordRegex)) {
      return 'keyword';
    }

    // Match numbers
    if (stream.match(numberRegex)) {
      return 'number';
    }

    // Match comments
    if (stream.match('//')) {
      stream.skipToEnd();
      return 'comment';
    }

    // Match strings
    if (stream.match(/"/)) {
      state.tokenize = tokenString;
      return tokenString(stream, state);
    }

    // Move to the next character
    stream.next();
    return null;
  }

  function tokenString(stream, state) {
    let prevChar = null;
    let insideString = false;
  
    while (!stream.eol()) {
      const currentChar = stream.peek();
  
      if (insideString) {
        if (currentChar === '"' && prevChar !== '\\') {
          state.tokenize = tokenize;
          stream.next(); // Consume the closing double quote
          return 'string';
        }
        prevChar = currentChar;
        stream.next();
      } else {
        if (currentChar === '\\' && prevChar === '\\') {
          prevChar = null; // Consume the escaping backslash
        } else if (currentChar === '"') {
          insideString = true;
        }
        prevChar = currentChar;
        stream.next();
      }
    }
  
    if (insideString) {
      return 'string';
    }
  
    state.tokenize = tokenize;
    return null;
  }

  return {
    startState: function() {
      return {
        tokenize: tokenize,
      };
    },
    token: function(stream, state) {
      return state.tokenize(stream, state);
    }
  };
});

CodeMirror.defineMIME('text/x-qasm', 'qasm');
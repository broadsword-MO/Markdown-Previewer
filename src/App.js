import { useState, useEffect } from 'react';
import { marked } from 'marked';

// Use this instead of hooks import above, inside Codepen.io
// const { useState } = React;

function App() {
    const initialText = `# Main heading
## Sub heading
### h3 heading

- list item
  - another
    - and another

1. One more thing
1. And another thing
1. One last thing

Maybe some \`<p>inline code</p>\`

_And_

\`\`\`js
function codeBlock() {
  return 'something';
}
\`\`\`

A | Table | With
- | - | -
some | Items | in
it | and | other things

**But wait, I forgot!**
> **_Block quotes:_** quotes that just go on and on and on and on and...

And a link,

[Google](https://google.com)

How about an embedded image:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

    const [input, setInput] = useState(initialText);
    const [editorVisibility, setEditorVisibility] = useState(true);
    const [previewerVisibility, setPreviewerVisibility] = useState(false);
    console.log('editorVisibility :', editorVisibility);
    console.log('previewerVisibility :', previewerVisibility);

    const changeHandler = (event) => setInput(event.target.value);

    marked.setOptions({
        breaks: true, // Display returns as line breaks
        // highlight: function (code) { // Syntax highlighter, not right yet...
        // return Prism.highlight(code, Prism.languages.javascript, 'javascript');
        //   }
    });

    // ^SECTION  === For toggling mobile/desktop view ===
    const widerScreenWidth = window.matchMedia('(min-width: 801px)');

    function checkScreenWidth() {
        if (widerScreenWidth.matches) {
            setEditorVisibility(true);
            setPreviewerVisibility(true);
        } else {
            setEditorVisibility(true);
            setPreviewerVisibility(false);
        }
    }

    useEffect(() => {
        window.addEventListener('load', checkScreenWidth, false);
        return function cleanup() {
            window.removeEventListener('load', checkScreenWidth);
        }
    });

    useEffect(() => {
        window.addEventListener('resize', checkScreenWidth, false);
        return function cleanup() {
            window.removeEventListener('resize', checkScreenWidth);
        };
    });

    function toggleVisibility() {
        setEditorVisibility(!editorVisibility);
        setPreviewerVisibility(!previewerVisibility);
    }
    // ================== !SECTION ===================

    return (
        <div className="App">
            <div className="flex-centering-wrapper">
                <div className="header-cont">
                    <h1 className="headers main-header">Markdown Previewer</h1>
                    <button
                        className="toggle"
                        type="button"
                        onClick={toggleVisibility}>
                        Show {editorVisibility ? 'Previewer' : 'Editor'}
                    </button>
                </div>
                <div className="text-container">
                    <div
                        className="editor"
                        style={{
                            display: editorVisibility ? 'block' : 'none',
                        }}>
                        <h2 className="headers sec-header">Editor</h2>
                        <textarea
                            className="editor-textarea"
                            id="editor"
                            value={input}
                            onChange={changeHandler}
                        />
                    </div>
                    <div
                        className="previewer"
                        style={{
                            display: previewerVisibility ? 'block' : 'none',
                        }}>
                        <h2 className="headers sec-header">Previewer</h2>
                        <p
                            className="preview-text"
                            id="preview"
                            dangerouslySetInnerHTML={{
                                __html: marked.parse(input),
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Comment out for codepen.io
export default App;

// For Codepen.io, using React 17
// ReactDOM.render(<App />, document.getElementById('app'));

// For Codepen.io, using React 18 (fCC test suite wouldn't work completely)
// const root = ReactDOM.createRoot(document.getElementById("app"));
// root.render(<App />);

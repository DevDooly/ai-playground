import { useState } from 'react';

const VimCheatsheet = () => {
  const [inputText, setInputText] = useState(`apple
banana
orange
grape
apple
kiwi
banana
strawberry
pineapple
apple`);
  const [outputText, setOutputText] = useState(inputText);
  const [searchText, setSearchText] = useState('');
  const [replaceText, setReplaceText] = useState('');

  const handleSort = () => {
    const lines = inputText.split('\n');
    setOutputText(lines.sort().join('\n'));
  };

  const handleUnique = () => {
    const lines = inputText.split('\n');
    setOutputText([...new Set(lines)].join('\n'));
  };

  const handleGlobal = () => {
    const lines = inputText.split('\n');
    const filteredLines = lines.filter(line => line.includes(searchText));
    setOutputText(filteredLines.join('\n'));
  };

  const handleVGlobal = () => {
    const lines = inputText.split('\n');
    const filteredLines = lines.filter(line => !line.includes(searchText));
    setOutputText(filteredLines.join('\n'));
  };

  const handleSubstitute = () => {
    const lines = inputText.split('\n');
    const newLines = lines.map(line => line.replace(new RegExp(searchText, 'g'), replaceText));
    setOutputText(newLines.join('\n'));
  };

  return (
    <div className="container-fluid">
      <h2 className="mt-4">Vim 유용한 명령어</h2>
      <div className="row">
        <div className="col-md-6">
          <h3>Input</h3>
          <textarea
            className="form-control"
            rows={10}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <h3>Output</h3>
          <textarea
            className="form-control"
            rows={10}
            readOnly
            value={outputText}
          />
        </div>
      </div>
      <div className="mt-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">명령어</h5>
            <div className="d-flex flex-wrap gap-2">
              <button className="btn btn-primary" onClick={handleSort}>
                Sort (:sort)
              </button>
              <button className="btn btn-primary" onClick={handleUnique}>
                Unique (:sort u)
              </button>
              <div className="d-flex gap-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <button className="btn btn-primary" onClick={handleGlobal}>
                    Grep (:g/{searchText}/p)
                  </button>
                  <button className="btn btn-primary" onClick={handleVGlobal}>
                    V-Grep (:v/{searchText}/p)
                  </button>
              </div>
              <div className="d-flex gap-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Replace Text"
                    value={replaceText}
                    onChange={(e) => setReplaceText(e.target.value)}
                  />
                  <button className="btn btn-primary" onClick={handleSubstitute}>
                    Substitute (:%s/{searchText}/{replaceText}/g)
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VimCheatsheet;

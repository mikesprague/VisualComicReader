import React, { Component } from 'react';
import { connect } from 'react-redux';
import './app.scss';

import { Layout, Reader } from './components';
import { ipcRenderer } from 'electron';
import { setDirectory, setFiles } from './reducers/reader';

class App extends Component {
  constructor() {
    super();
    this.state = {
      workingDirectory: '',
      files: []
    }
  }

  componentDidMount() {
    ipcRenderer.on('file-extracted', (event, data) => {
      this.props.setDirectory(data.tmpFolder + '/');
      this.props.setFiles(data.files);
      // event.sender.send('read-directory', data.tmpFolder);
    });

    // ipcRenderer.on('list-files', (event, data) => {
    //   this.props.setFiles(data.files);
    // })
  }

  filterFiles(files) {
    const error = -1;
    files = files.filter(file => {
      return file.indexOf('.jpg') > error || file.indexOf('.png') > error;
    })

    return files;
  }

  render() {
    return (
      <Layout>
        <Reader
          dir={this.state.workingDirectory}
          files={this.state.files}
        />
      </Layout>
    );
  }
}

const mapDispatchToProps = {
  setDirectory,
  setFiles
}

export default connect(null, mapDispatchToProps)(App);

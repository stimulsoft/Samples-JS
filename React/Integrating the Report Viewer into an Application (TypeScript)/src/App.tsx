import React from 'react';
import { Stimulsoft } from 'stimulsoft-reports-js/Scripts/stimulsoft.viewer';
import './App.css';

class App extends React.Component {
    private viewer = new Stimulsoft.Viewer.StiViewer(undefined, 'StiViewer', false);
    private report = new Stimulsoft.Report.StiReport();

    render() {
        return (
            <div id="viewer" className="App">
            </div>
        );
    }

    async componentDidMount() {
        console.log('Loading Viewer view');

        const response = await fetch('/reports/Report.mdc');
        const data = await response.json();
        console.log('Load report from url');
        this.report.loadDocument(data);
        this.viewer.report = this.report;

        console.log('Rendering the viewer to selected element');
        this.viewer.renderHtml('viewer');
    }

}

export default App;

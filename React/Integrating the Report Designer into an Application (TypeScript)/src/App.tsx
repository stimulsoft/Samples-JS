import React from 'react';
import {Stimulsoft} from 'stimulsoft-reports-js/Scripts/stimulsoft.blockly.editor';
import 'stimulsoft-reports-js/Css/stimulsoft.designer.office2013.whiteblue.css';
import 'stimulsoft-reports-js/Css/stimulsoft.viewer.office2013.whiteblue.css';
import './App.css';

class App extends React.Component {
    private options: any;
    private designer: any;

    render() {
        return (
            <div id="designer" className="App">
            </div>
        );
    }

    componentDidMount() {
        console.log('Loading Designer view');

        console.log('Set full screen mode for the designer');
        this.options = new Stimulsoft.Designer.StiDesignerOptions();
        this.options.appearance.fullScreenMode = false;

        console.log('Create the report designer with specified options');
        this.designer = new Stimulsoft.Designer.StiDesigner(this.options, 'StiDesigner', false);

        console.log('Edit report template in the designer');
        this.designer.report = new Stimulsoft.Report.StiReport();

        console.log('Load report from url');
        this.designer.report.loadFile('/reports/SimpleList.mrt');

        console.log('Rendering the designer to selected element');
        this.designer.renderHtml('designer');

        console.log('Loading completed successfully!');
    }

}

export default App;

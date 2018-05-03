import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

declare var Stimulsoft: any;

@Component({
  selector: 'app-root',
  template: `<div>
                  <h2>Stimulsoft Reports.JS Designer</h2>
                  <div id="designer"></div>
              </div>`
})
export class AppComponent {
  options: any;
  designer: any;

  ngOnInit() {
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

  constructor() {    
  }
}

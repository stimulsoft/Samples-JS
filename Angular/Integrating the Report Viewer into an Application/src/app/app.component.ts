import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stimulsoft } from 'stimulsoft-reports-js/Scripts/stimulsoft.viewer'

@Component({
  selector: 'app-root',
  template: `<div>
                  <h2>Stimulsoft Reports.JS Viewer</h2>
                  <div id="viewer"></div>
              </div>`,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  viewer = new Stimulsoft.Viewer.StiViewer(undefined, 'StiViewer', false);
  report = new Stimulsoft.Report.StiReport();

  ngOnInit() {
    console.log('Loading Viewer view');

    this.http.get<string>('reports/Report.mdc').subscribe(data => {

      console.log('Load report from url');
      this.report.loadDocument(data);
      this.viewer.report = this.report;

      console.log('Rendering the viewer to selected element');
      this.viewer.renderHtml('viewer');
    });
  }

  constructor(private http: HttpClient) {

  }
}

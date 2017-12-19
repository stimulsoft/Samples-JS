import { StimulsoftAngular2Page } from './app.po';

describe('stimulsoft-angular2 App', () => {
  let page: StimulsoftAngular2Page;

  beforeEach(() => {
    page = new StimulsoftAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

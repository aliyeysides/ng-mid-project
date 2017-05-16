import { ChaikinAnalyticsMTPPage } from './app.po';

describe('chaikin-analytics-mtp App', () => {
  let page: ChaikinAnalyticsMTPPage;

  beforeEach(() => {
    page = new ChaikinAnalyticsMTPPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

import { AppPage } from './app.po';

describe('athenaeum App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display icon', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('book');
  });
});

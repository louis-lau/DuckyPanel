import { browser, by, element } from "protractor"

export class AppPage {
  public navigateTo(): Promise<any> /* eslint-disable-line @typescript-eslint/no-explicit-any */ {
    return browser.get(browser.baseUrl) as Promise<any> // eslint-disable-line @typescript-eslint/no-explicit-any
  }

  public getTitleText(): Promise<string> {
    return element(by.css("app-root h1")).getText() as Promise<string>
  }
}

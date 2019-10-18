__NOTE:__ This project is still a work in progress. You can already check it out if you're curious, but I can't guarantee it will work out for you. For example, the backend API endpoint for creating new API users currently isn't protected.

# DuckyPanel

Duckypanel is a domain admin level control panel for the modern [WildDuck email server](https://wildduck.email/). DuckyPanel is _just_ an Angular frontend project. It uses the [DuckyAPI REST API](https://github.com/louis-lau/DuckyAPI) as the backend. Later on there will be a way to set the DuckyAPI url in a config file, right now you can just edit it in `src/app/app.module.ts`.

## Current features
_Things currently working in DuckyPanel and DuckyAPI._
* Authentication
* Domain management
* Deletes accounts, forwarders and DKIM when deleting a domain
* Manage DKIM for the domains
* Domains can not be added to multiple accounts
* Email account management
* Forwarder management
* Only allows seeing/editing of accounts/forwarders on a domain if that domain is added to the account
* Get expected DNS records for a domain, and check the currently published records
* Sorting and filtering

More to come!

## Screenshots
![Accounts overview screenshot](docs/images/screenshot-accounts.png)
<details>

<summary>Click here for more screenshots</summary>

![Edit account screenshot](docs/images/screenshot-edit-account.png)
![Forwarders overview screenshot](docs/images/screenshot-forwarders.png)
![Edit forwarder screenshot](docs/images/screenshot-edit-forwarder.png)
![Domains overview screenshot](docs/images/screenshot-domains.png)
![Edit DKIM screenshot](docs/images/screenshot-dkim.png)
![Check domain DNS screenshot](docs/images/screenshot-dnscheck.png)
![Login screenshot](docs/images/screenshot-login.png)
![Mobile screenshot](docs/images/screenshot-mobile.png)

</details>

## Dependencies
* Node.js
* [DuckyAPI](https://github.com/louis-lau/DuckyAPI)

## Installation
```bash
$ git clone https://github.com/louis-lau/DuckyPanel
$ npm install
```

## Development server

Run `npm run ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

+++
author = "Keith Craigo"
title = "Angular - Surface SharePoint List Data With MSGraph - Part 5 - Authentication cont."
date = "2021-03-18"
draft = false
featured = true
toc = true
codeLineNumbers = true
codeMaxLines = 10
description = "Create an Angular app that surfaces coffee information from a SharePoint list using the Microsoft Graph JavaScript SDK. This app does not require registration with the SharePoint App Catalog. This app is not a SharePoint or Provider Hosted App, nor is it an SPFx solution"
tags = [
    "markdown",
    "SharePoint",
    "MSGraph",
    "Angular-Material",
    "Azure AD"
]
categories = [
    "sharepoint","angular","msgraph","angular-material","Azure AD"
]
series = ["SharePoint Tools"]
thumbnail = "images/tut/accessPass-MSLogin.png"
+++

> ## Please Note!
> One of the dangers in writing a tutorial like this is that by the time you are 
finished writing it, there is a new revision to the libraries you are using. 
So please be aware that you may run into issues, **that you will need to resolve yourself**, 
if you use a different version of the libraries than what I am using.
># Disclaimer
>This is my first time using MSAL 2, I'm learning as I write this tutorial.

[In my last post](/post/sharepoint/angular/p4-authentication/), I setup the app to login into Azure AD and return the token, heres where I messed up, I assumed MSAL 2, Authorization Code Flow with PKCE, would behave just like MSAL 1. I had to Google to find out what PKCE stands for, (Proof Key for Code Exchange)

NOPE! Should have read the documentation some more! 

Repeat a thousand times. "Read The Docs,Read The Docs,Read The Docs,Read The Docs,Read The Docs,Read The Docs,Read The Docs,Read The Docs,Read The Docs,Read The Docs,Read The Docs,Read The Docs,Read The Docs,Read The Docs"

I'm tired now, need more coffee!

Instead of returning the token silently, Azure AD returned the token in the URL. Now the navigation is incorrect, if you Inspect the Gift Cards page, you will see the error "The selector "app-redirect" did not match any elements blah blah blah". Yes that is the actual error blah, blah, blah. 

No not really but sometimes it seems like it might as well be.Yes sometimes you have no choice, you must just read through it! But somedays the last thing I want to do is read through a bunch of jargon.

Anyways, the error is telling us the app has no idea where to send the viewer because there is no route for code=ksakfhkshjf98sdaf8usdfkw89y2rdfsnakldnf

Let's change this now.

Open **app-routing.module.ts** and another route to the routes array.

```
{ path: 'code',  loadChildren: () => import('./giftcards/giftcards.module').then(m => m.GiftcardsModule)},
```

Now if you navigate to the giftcards page, if you are not logged in, you are redirected to login, otherwise you will now see that the token is not present in the url and the page shows the message, **giftcards works!**

But what happens when we setup another page with a guard, code is set to match our giftcards page?

Let's find out! Let's create the Brands page.

Stop the app if it is running!

Type
```
 ng g m brands  --routing -d 
 ```
You should see the following
```
CREATE src/app/brands/brands-routing.module.ts (249 bytes)
CREATE src/app/brands/brands.module.ts (280 bytes)

NOTE: The "dryRun" flag means no changes were made.
```

If everything looks good, remove the **-d** flag and execute the command once more.

Now let's create the component.
```
ng g c brands --style scss -d
```
```
CREATE src/app/brands/brands.component.scss (0 bytes)
CREATE src/app/brands/brands.component.html (21 bytes)
CREATE src/app/brands/brands.component.spec.ts (626 bytes)
CREATE src/app/brands/brands.component.ts (276 bytes)
UPDATE src/app/brands/brands.module.ts (349 bytes)

NOTE: The "dryRun" flag means no changes were made.
```

If everything looks good, remove the **-d** flag and execute the command once more and you should see.
```
CREATE src/app/brands/brands.component.scss (0 bytes)
CREATE src/app/brands/brands.component.html (21 bytes)
CREATE src/app/brands/brands.component.spec.ts (626 bytes)
CREATE src/app/brands/brands.component.ts (276 bytes)
UPDATE src/app/brands/brands.module.ts (349 bytes)
```

Time to set up the guard.
Open **brands-routing.module.ts** and change the routes array to:
```
import { MsalGuard } from '@azure/msal-angular';
import { BrandsComponent } from './brands.component';

const routes: Routes = [
  {path:'', component: BrandsComponent, canActivate : [MsalGuard] }
];

```

then change the export to:
```
export class BrandsRoutingModule { 
  static components = [ BrandsComponent ]
}
```

## Setup the route!

Open **app-routing.module.ts** and add
```
{ path: 'brands', loadChildren: () => import('./brands/brands.module').then(m => m.BrandsModule)},
```
to the **routes** array.


Let's also build out our home page.

Open **home-routing.module.ts** and replace it's contents with:
```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

const routes: Routes = [
  {path:'', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
  static components = [ HomeComponent]
 }

```

Open **home.module.ts** and replace it's contents with:
```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }

```
## Home Component!
Open **home.component.html** and replace it's contents with:
```
<p>Welcome! To Coffee Manager!</p> 

```

Save all the files.
For this next part we need to ensure our previous session is not still active. We could shutdown our browser, or in an open browser delete the cache, or open another tab in incognito mode.

I prefer incognito/private mode because I usually have several tabs open at once and I don't want to have to log into my other sites again.

Open a Private or Incognito browser window and navigate to your apps url. Click the Brands menu button and you will be taken to the Microsoft login.
 
You may see that the return url also includes the token instead of just **localhost:4200/brands**

Time to read the docs again or let's take a look at one of Microsoft's sample code
[https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/samples/msal-angular-v2-samples/angular11-sample-app/src/app](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/samples/msal-angular-v2-samples/angular11-sample-app/src/app)

Found an answer at [https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/3042](https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/3042)

Just open **index.html** and add an **app-redirect**
below **app-root**

```
<app-root></app-root>
<app-redirect></app-redirect>
```

Now when the user logins, they will be taken back to the home page, then the window will redirect to the page that triggered the guard event.

Let's move on!

Time to create a **Login / Logout** service and also show the user a **Login / Logout button** in the toolbar.

Stop the app if it is running.

On the command line type:
```
ng g s core/services/auth -d 
```
You should see
```
CREATE src/app/core/services/auth.service.spec.ts (347 bytes)
CREATE src/app/core/services/auth.service.ts (133 bytes)
```
If everything looks good, remove the **-d** flag and click enter one more time.

## Auth Service!
Open **auth.service.ts** 
>Please Note! I copied the code from the MSAL 2.0 sample.
[https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/samples/msal-angular-v2-samples/angular11-sample-app/src/app](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/samples/msal-angular-v2-samples/angular11-sample-app/src/app) **app.component.ts**

Copy the sample code in **app.component.ts** and paste it in our **auth.service.ts**.

We need to make some modifications to the copied code.
Replace the contents with

```
import { Component, OnInit, Inject, OnDestroy, Injectable } from '@angular/core';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit, OnDestroy {
  isIframe = false;
  loginDisplay = false;
  userName = "";
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {}

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.checkLogin();
      });
  }

/**
 * Check if the user is logged in. If true set the userName.
 * @returns boolean
 */
  checkLogin() {
    const curAccount = this.authService.instance.getAllAccounts();

    if (curAccount === null ) {
      console.log("No Accounts found!");
      return false;
    } else if ( curAccount .length > 1) {
      console.log("More than one Account was found!");
      return false;
    } else if (curAccount.length === 1) {
      this.userName = curAccount[0].name!;
      return true;
    }
    return;
  }

  login() {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      if (this.msalGuardConfig.authRequest){
        this.authService.loginPopup({...this.msalGuardConfig.authRequest} as PopupRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
        } else {
          this.authService.loginPopup()
            .subscribe((response: AuthenticationResult) => {
              this.authService.instance.setActiveAccount(response.account);
            });
      }
    } else {
      if (this.msalGuardConfig.authRequest){
        this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
      } else {
        this.authService.loginRedirect();
      }
    }
  }

  logout() {
    this.authService.logout();
  }

  /**
   * Return the current user name.
   * @returns string
   */
  getCurrentLogin() {
    return this.userName;
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

}


```

Now before moving on to our model, we need to create **notification.html** and it's style sheet, **notification.scss** in the **services** directory.

**notification.html** 
```
<div>
  {{data.type | titlecase}}
</div>
<div class="content-style">
  {{data.message}}
</div>
```

Save and close **notification.html**

**notification.scss**
```
.content-style {
  border: 1px solid white;
  border-radius: 4px;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
}
```

Save and close **notification.scss**

Time to create our user model. Create a new folder in the **core** dir called **models**. 

Create a new file in **core/models** named **user.ts** and add:
```

export class User {
    displayName: string;
    email: string;
    photo: any;
    jobTitle: string;
}

```

Save and close **user.ts**

Let's add a button to our toolbar to allow the user to Login / Logout of the app. We'll also use the Microsoft Graph to show the current login. 

Open **toolbar.component.html** and add the following after the app title, and before the Light/Dark mode toggle button.
```
<span class="toolbar-spacer"></span>

  <nav class="currentUser">
     <label>Welcome! {{ curLogin }}</label>
    
  </nav>
  &nbsp;
  <span>
    <button mat-flat-button *ngIf="!authenticated" (click)="signIn()" color="white">Login</button>
    <button mat-flat-button *ngIf="authenticated" (click)="signOut()" color="white">Logout</button>
  </span>
  ```

  Save and close **toolbar.component.html**

  Open **toolbar.component.ts** replace it's contents with:
  ```
  import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { MsalBroadcastService} from '@azure/msal-angular';
import { EventMessage, EventType } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

isAuthenticated = false;
curLogin = "";

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleTheme = new EventEmitter<void>();
  @Output() toggleDir = new EventEmitter<void>();


  constructor(private authService: AuthService, private msalBroadcastService: MsalBroadcastService) {}

  ngOnInit() {
    this.msalBroadcastService.msalSubject$
    .pipe(
      filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
    )
    .subscribe((result: EventMessage) => {
      console.log(result);
      if (result?.payload?.account) {
        this.authService;
      }
    });

    this.checkAuth();
  }

async signIn(): Promise<void> {
    await this.authService.login();
  }

  signOut(): void {
    this.authService.logout();
  }

/**
 * Get the current logged in user name.
 */
  checkAuth() {
    let isAuthorized = this.authService.checkLogin();
    if( isAuthorized ) {
      this.curLogin = this.authService.getCurrentLogin();
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }

}

```
Save and close all files.

## Results!
Launch the app once more in an incognito window.

Click the **Login** button.

You should now see a popup window or the page containing the Microsoft Sign in. Sign in and you may see the Permission request dialog.

I'll leave it up to you whether or not you check the "Consent on behalf of your organization" and click Accept.

Since this is my tenant, I choose to check the box and click the Accept button.

Azure AD will return the viewer back to the Coffee Manager app and display the LogOut button and the name of the current user.

We are now in a good position to retrieve list data from SharePoint. 

## Next - Part: 6 - Use The Microsoft Graph To Surface SharePoint List Data (Coming Soon!)


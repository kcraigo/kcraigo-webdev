+++
author = "Keith Craigo"
title = "Angular - Surface SharePoint List Data With MSGraph - Part 5 - Microsoft Graph"
date = "2021-03-18"
draft = true
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

Instead of returning the token silently, Azure AD returned the token in the URL. Now the navigation is incorrect, if you Inspect the Gift Cards page, you will see the error "The selector "app-redirect" did not match any elements blah blah blah". Yes that is the actual error blah, blah, blah. No not really but sometimes it seems like it might as well be.Yes sometimes you have no choice, you must just read through it! But somedays the last thing I want to do is read through a bunch of jargon.

Anyways, the error is telling us the app has no idea where to send the viewer because there is no route for code=ksakfhkshjf98sdaf8usdfkw89y2rdfsnakldnf

Let's change this now.

Open **app-routing.module.ts** and another route to the routes array.

```
{ path: 'code',  loadChildren: () => import('./giftcards/giftcards.module').then(m => m.GiftcardsModule)},
```

Now if you navigate to the giftcards page, if you are not logged in, you are redirected to login, otherwise you will now see that the token is not present in the url and the page shows the message, **giftcards works!**

But what happens when we setup another page with a gaurd, code is set to match our giftcards page?

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

Time to set up the gaurd.
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

Open **home.component.html** and replace it's contents with:
```
<p>Welcome! To Coffee Manager!</p> 

```

Save all the files.
For this next part we need to ensure our previous session is not still active. We could shutdown our browser, or in an open browser delete the cache, or open another tab in incognito mode.

I prefer incognito/private mode because I usually have several tabs open at once and I don't want to have to log into my social media again.

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

Now when the user logins, they will be taken back to the home page, then the window will redirect to the page that triggered the gaurd event.

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

Open **auth.service.ts** 
>Please Note! I just use the code from the MSAL 2.0 sample.
[https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/samples/msal-angular-v2-samples/angular11-sample-app/src/app](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/samples/msal-angular-v2-samples/angular11-sample-app/src/app) **app.component.ts**

Copy the sample code in **app.component.ts** and paste as our **auth.service.ts** code.

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
    <label>Welcome! {{ user?.displayName }}</label>
    
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
  import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {


  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleTheme = new EventEmitter<void>();
  @Output() toggleDir = new EventEmitter<void>();


// Is a user logged in?
  get authenticated(): boolean {
    return this.authService.authenticated;
  }
  // The user
  get user(): User {
    return this.authService.user;
  }

  constructor(private authService: AuthService) {}


async signIn(): Promise<void> {
    await this.authService.signIn();
  }

  signOut(): void {
    this.authService.signOut();
  }

}

```
Save and close all files.

Launch the app once more in an incognito window.

Click the **Login** button.

You should now see a popup window appear containing the Microsoft Sign in. Sign in and you may see the Permission request dialog.

I'll leave it up to you whether or not you check the "Consent on behalf of your organization" and click Accept.

Since this is my tenant, I choose to check the box and click the Accept button.



+++
author = "Keith Craigo"
title = "Angular - Surface SharePoint List Data With MSGraph - Part 4 - Authentication"
date = "2021-03-14"
draft = false
featured = false
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

## No Duplicates, We Only Want Singletons!

We need to ensure that our modules are only loaded once in our app. I learned 
of this special structure from one of Dan Wahlin's PluralSight courses - [Angular Architecture and Best Practices](https://www.pluralsight.com/courses/angular-architecture-best-practices)

Create two new files in **src/app/core** 

**core.module.ts**

```
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnsureModuleLoadedOnceGuard } from './ensureModuleLoadedOnceGuard';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: []
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
 }
```

and

**ensureModuleLoadedOnceGaurd.ts**

```
// Thanks to Dan Wahlin for this structure
export class EnsureModuleLoadedOnceGuard {
  constructor(targetModule: any ) {
    if (targetModule) {
      throw new Error(`${targetModule.constructor.name} has already been loaded.
      Import this module in the AppModule only.`);
    }
  }
}

```

We now need to add the CoreModule to our **app.module.ts**

```
// .... Other imports omitted for brevity

import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent, SidenavComponent, ToolbarComponent, AlertsComponent, NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    CoreModule,

  // .... Other code omitted for brevity  

```

For more information, please take a look at Dan's PluralSight course.

## Setup Authentication to Azure AD

Create a new file in the **src** directory called **oauth.ts**

Add the following to **oauth.ts**

```
export const OAuthSettings = {
  appId: '[YOUR APP ID FROM AZURE AD APP REGISTRATION]',
  redirectUri: 'http://localhost:4200',
  postLogoutRedirectUri: '/',
  spURL: '[YOUR SHAREPOINT URL]',
  scopes: [
    "user.read",
    "calendars.readwrite",
    "Sites.ReadWrite.All"
  ]
};
```

Now we need to ensure that this file is not accidentally added to our Github repository.

Open **.gitignore**

Add **oauth.ts**
```
# creds
oauth.ts

// ... other code omitted for brevity

```
Save and close.

Now we need to add the Microsoft Graph and (MSAL) Microsoft Authentication Library.

Stop the app if it is running and then on the command line:

```
npm i @azure/msal-angular @azure/msal-browser @microsoft/microsoft-graph-client @microsoft/microsoft-graph-types @pnp/graph @pnp/sp
```

Open **app.module.ts**

Add replace the contents with the following:

```
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModule } from './shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidenavComponent } from './core/sidenav/sidenav.component';
import { ToolbarComponent } from './core/toolbar/toolbar.component';
import { CoreModule } from './core/core.module';
import { OAuthSettings } from 'src/oauth';


// From Microsoft Sample - https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/samples/msal-angular-v2-samples/angular10-sample-app/src/app/app.module.ts
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IPublicClientApplication, PublicClientApplication, InteractionType, BrowserCacheLocation, LogLevel } from '@azure/msal-browser';
import { MsalGuard, MsalInterceptor, MsalBroadcastService, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration, MsalRedirectComponent } from '@azure/msal-angular';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: OAuthSettings.appId,
      redirectUri: OAuthSettings.redirectUri,
      postLogoutRedirectUri: OAuthSettings.postLogoutRedirectUri
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE, // set to true for IE 11
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false
      }
    }
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read']
    }
  };
}



@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    CoreModule,
    MsalModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }


```


Before we setup authentication, you'll notice that our app's home page is blank. Let's create a dedicated home page, for now we will just show a welcome message.

Stop the app if it is running.

We complete the next part in two stages!

On the command line type
```
ng g m home --routing -d
```

and you should see

```
CREATE src/app/home/home-routing.module.ts (247 bytes)
CREATE src/app/home/home.module.ts (272 bytes)
```

If everything looks good, remove the dryrun -d flag and execute the command once more.

Next type:

```
ng g c home --style scss -d
```

and you should see

```
CREATE src/app/home/home.component.scss (0 bytes)
CREATE src/app/home/home.component.html (19 bytes)
CREATE src/app/home/home.component.spec.ts (612 bytes)
CREATE src/app/home/home.component.ts (268 bytes)
UPDATE src/app/home/home.module.ts (335 bytes)
```
**Notice** that we will be updating the **home.module.ts** instead of **app.module.ts**

If everything looks good, remove the dryrun -d flag and execute the command once more.

Open **home.component.html** and change it's contents to:

```
<p>Welcome! To Coffee Manager!</p>
```
Save and close **home.component.html**

## Setup Authentication

Now we need to decide what areas of the app should require a login and which should remain open to all viewers.

For now let's just require that the **Gift Cards** page requires the user to login.

Stop the app if it is running.

We complete the next part in two stages!

First we create the module.

On the command line, type 

```
ng g m giftcards --routing -d 
```

You should see something similar to:

```
CREATE src/app/giftcards/giftcards-routing.module.ts (252 bytes)
CREATE src/app/giftcards/giftcards.module.ts (292 bytes)

NOTE: The "dryRun" flag means no changes were made.
```

If everything looks good, remove the -d flag and execute the command once more.


Next we create the component.

```
ng g c giftcards --style scss -d
```

and should see 
```
CREATE src/app/giftcards/giftcards.component.scss (0 bytes)
CREATE src/app/giftcards/giftcards.component.html (24 bytes)
CREATE src/app/giftcards/giftcards.component.spec.ts (647 bytes)
CREATE src/app/giftcards/giftcards.component.ts (288 bytes)
UPDATE src/app/giftcards/giftcards.module.ts (370 bytes)

NOTE: The "dryRun" flag means no changes were made.
```

**Notice** that we will be updating the **giftcards.module.ts** instead of the **app.module.ts**

If everything looks good, remove the dryrun -d flag and execute the command once more.

Let's now add our route gaurd to **giftcards-routing.module.ts**

Open **giftcards-routing.module.ts**

Change the contents to

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';

import { GiftcardsComponent } from './giftcards.component';

const routes: Routes = [
  {path:'', component: GiftcardsComponent, canActivate : [MsalGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GiftcardsRoutingModule { 
  static components = [GiftcardsComponent]
}

```

Open **giftcards.module.ts** and change the contents to 
```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GiftcardsRoutingModule } from './giftcards-routing.module';


@NgModule({
  declarations: [GiftcardsRoutingModule.components],
  imports: [
    CommonModule,
    GiftcardsRoutingModule
  ]
})
export class GiftcardsModule { }
```

Let's add one more module, our About module

Stop the app if it is running and execute the following on 
the command line:

```
ng g m about --routing -d 
```

You should see something similar to:

```
CREATE src/app/about/about-routing.module.ts (252 bytes)
CREATE src/app/about/about.module.ts (292 bytes)

NOTE: The "dryRun" flag means no changes were made.
```

If everything looks good, remove the -d flag and execute the command once more.

Next we create the component.

```
ng g c about --style scss -d
```

and you should see 
```
CREATE src/app/about/about.component.scss (0 bytes)
CREATE src/app/about/about.component.html (24 bytes)
CREATE src/app/about/about.component.spec.ts (647 bytes)
CREATE src/app/about/about.component.ts (288 bytes)
UPDATE src/app/about/about.module.ts (370 bytes)

NOTE: The "dryRun" flag means no changes were made.
```

If everything looks good, remove the dryrun -d flag and execute the command once more.

We won't need to add a route gaurd to **about-routing.module.ts**, we want all users to be able to view this page without having to authenticate first.

But we do need to make some other changes such as making this a static component.

First! Open **about.module.ts** and make the following changes:
- Remove the AboutComponent import statement
- Import **about-routing.module.ts**
- Change the @NgModule declarations array to

```
import { AboutRoutingModule } from './about-routing.module';

@NgModule({
  declarations: [AboutRoutingModule.components],
```

Next open **about-routing.module.ts** and make the following changes:
- Change the export class statement

```
// ... other code omitted for brevity

export class AboutRoutingModule {
  static components = [ AboutComponent ]
}

```

Next we need to add both our **about.module.ts**, **home.module.ts** and **giftcards.module.ts** to our **app-routing.module.ts** 

Save and close all the files.

Open **app-routing.module.ts** 

Change the contents to match the following:

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path:'',pathMatch: 'full', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule)},
  { path: 'giftcards', loadChildren: () => import('./giftcards/giftcards.module').then(m => m.GiftcardsModule)},
  { path: '**', pathMatch: 'full', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```
Notice the **{ useHash: false }** parameter

If this app were a SharePoint folder based app then we would want the # **/demo/#/coffeemanager** but for our app, I prefer the url without the **#**

Let's launch the app to see where we stand, on the command line type **ng serve**

If you click the About menu option you will see the message "About works!"
but if you click Giftcards, it does nothing.

I installed MSAL 2 which does not support Implicit Flow as MSAL 1 did. I need to make some additional changes in my Azure portal app registration. 

Go to your Azure Portal, Azure AD app registrations, select your app then select Authentication.

 !["Coffee Manager - Azure Portal Authentication settings"](/images/tut/AzureImplicitFlow.png "Coffee Manager - Azure Portal Authentication settings")

 Make sure both "Access tokens (used for implicit flows)" and "ID tokens (used for implicit and hybrid flows)" are not checked.

Click "This app has implicit grant settings enabled. If you are using any of these URIs in a SPA with MSAL.js 2.0, you should migrate URIs."

 Check the box for your ReturnURI

 Save 

 !["Coffee Manager - MSAL Authentication Code Flow"](/images/tut/MSALAuthenticationCode.png "Coffee Manager - MSAL Authentication Code Flow")

 In the Implicit Grant and hybrid flows section

 Uncheck both Access tokens and ID tokens.

 Save 

Launch the app once more

If you click the Giftcards button you should be presented with a 
Login prompt. If you recieve the error message "The reply url does not match" go back to your apps RedirectURI. 

For instance I had made my RedirectURI **http://localhost:4200/home** when instead it should have been **http://localhost:4200/** , remember the trailing whack or if you prefer the term slash.

You should now see the following

 !["Coffee Manager - Microsoft Login Screen using Code Flow"](/images/tut/MicrosoftLogin-CodeFlow.png "Coffee Manager - Microsoft Login Screen using Code Flow")

If you click Sign-in-options

 !["Coffee Manager - Microsoft Login Screen using Code Flow - Sign In Options"](/images/tut/MicrosoftLogin-CodeFlow-SignIn-Options.png "Coffee Manager - Microsoft Login Screen using Code Flow - Sign In Options")

 After signing in, now everytime a user opens the Giftcards screen, the app will check the Access Token, taken care of by MSAL for us, to ensure that the user is authenticated with Azure Active Directory.

 This is great but it's not quite there yet, let's use the Microsoft Graph to display the current users DisplayName in the toolbar.
 
Start using Angular Material to display a Login/Logout button. We will also setup other Angular Material components such as a table, checkboxes, filters and more in the next post.

## Next - Part: 5 - [Authentication cont](/post/sharepoint/angular/tutorials/coffeemanager/p5-authentication-cont/)

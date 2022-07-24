+++
author = "Keith Craigo"
title = "Angular - Surface SharePoint List Data With MSGraph - Part 3 - Add Some Style"
date = "2021-03-13"
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
thumbnail = "images/tut/ChangedLogo.png"
+++
> # This Project was discontinued mid 2021!
> Leaving here for reference!

> ## Please Note!
> One of the dangers in writing a tutorial like this is that by the time you are finished writing it, there is a new revision to the libraries you are using. So please be aware that you may run into issues, **that you will need to resolve yourself**, if you use a different version of the libraries than what I am using.

We need to provide a way for the user to switch between light or dark mode. 

We will alsosetup authentication to Azure AD and surface data contained in a SharePoint list. 


This app will not use one of the Microsoft App Models. Our app is not a Provider nor SharePoint Hosted App Model. It is not a SharePoint folder nor an SPFx solution.

We will need to register our app with Azure Active Directory but we do not need to register with the SharePoint App Catalog.

Our app is a standalone app hosted on our own server and uses SharePoint as a data source, we can connect with any other data source we choose. 

Check with your companies policies, this app could still be considered as what is known as a side loaded app.


Let's begin with **package.json**

**Install** 
- @angular/cdk
- @angular/flex-layout
- @angular/material

Or Copy and paste

Change:

```
{
  "name": "coffee-manager",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "~11.0.0",
    "@angular/common": "~11.0.0",
    "@angular/compiler": "~11.0.0",
    "@angular/core": "~11.0.0",
    "@angular/forms": "~11.0.0",
    "@angular/platform-browser": "~11.0.0",
    "@angular/platform-browser-dynamic": "~11.0.0",
    "@angular/router": "~11.0.0",
    "rxjs": "~6.6.0",
    "tslib": "^2.0.0",
    "zone.js": "~0.10.2"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "~0.1100.1",
    "@angular/cli": "~11.0.1",
    "@angular/compiler-cli": "~11.0.0",
    "@types/jasmine": "~3.6.0",
    "@types/node": "^12.11.1",
    "codelyzer": "^6.0.0",
    "jasmine-core": "~3.6.0",
    "jasmine-spec-reporter": "~5.0.0",
    "karma": "~5.1.0",
    "karma-chrome-launcher": "~3.1.0",
    "karma-coverage": "~2.0.3",
    "karma-jasmine": "~4.0.0",
    "karma-jasmine-html-reporter": "^1.5.0",
    "protractor": "~7.0.0",
    "ts-node": "~8.3.0",
    "tslint": "~6.1.0",
    "typescript": "~4.0.2"
  }
}

```
To:
```
{
  "name": "coffee-manager",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve -o",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "^11.0.4",
    "@angular/cdk": "^11.0.2",
    "@angular/common": "^11.0.4",
    "@angular/compiler": "^11.0.4",
    "@angular/core": "^11.0.4",
    "@angular/flex-layout": "^11.0.0-beta.33",
    "@angular/forms": "^11.0.4",
    "@angular/material": "^11.0.2",
    "@angular/platform-browser": "^11.0.4",
    "@angular/platform-browser-dynamic": "^11.0.4",
    "@angular/router": "^11.0.4",
    "rxjs": "~6.6.0",
    "tslib": "^2.0.0",
    "zone.js": "~0.10.2"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^0.1100.4",
    "@angular/cli": "^11.0.4",
    "@angular/compiler-cli": "^11.0.4",
    "@types/jasmine": "~3.6.0",
    "@types/node": "^12.19.9",
    "codelyzer": "^6.0.0",
    "jasmine-core": "~3.6.0",
    "jasmine-spec-reporter": "~5.0.0",
    "karma": "~5.1.0",
    "karma-chrome-launcher": "~3.1.0",
    "karma-coverage": "~2.0.3",
    "karma-jasmine": "~4.0.0",
    "karma-jasmine-html-reporter": "^1.5.0",
    "protractor": "~7.0.0",
    "ts-node": "~8.3.0",
    "tslint": "~6.1.0",
    "typescript": "~4.0.2"
  }
}

```
Then type **npm i** or **npm install** in the same dir as **package.json**

Close package.json

We need to add some resources to our index.html file.

Change:

```
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Coffee Manager</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>

```

To:

```
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Coffee Manager</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link type="css" rel="stylesheet" href="styles.css" />

  <link
    href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,600&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet"
  />
</head>
<body class="mat-typography">
  <app-root></app-root>
</body>
</html>

```

Notice the new style class, *mat-typography*, on the body. We are now making use of Google Material Design styles.

We will use the default style sheet for our informational components i.e. messages, html, body and the logo. 

### Add A Theme
We will create a second stylesheet for our theme styles.

Let's change the default **styles.scss** file now.

Add the following to **styles.scss**
```
/* You can add global styles to this file, and also import other style files */



html, body { height: 100%; }
body { margin: 0; font-family: Raleway, "Helvetica Neue", sans-serif; }

.success.mat-snack-bar-container {
  background-color: rgba(132,189,0, .93); // #84BD00;
  color:white;
}

.error.mat-snack-bar-container {
  background-color: rgba(210,38,48, .93); //#D22630
  color:white;
}

.warn.mat-snack-bar-container {
  background-color: rgba(232,119,34, .93); //#E87722
  color:white;
}

.info.mat-snack-bar-container {
  background-color: rgba(0,181,226, .93); //#00B5E2
  color:white;
}

.logo {
  position: relative;
  left: 0px;
  background-color: white;
  border: solid;
  border-color: gainsboro;
  border-width: 0 0 .1px 0;
}

```
Next create a file in the src directory called **app-theme.scss** 

Add the following to **app-theme.scss**

```
/* You can add global styles to this file, and also import other style files */
@import '~@angular/material/theming';

@import url('https://fonts.googleapis.com/css?family=Raleway:300,400,500,600');

// Plus imports for other components in your app.

// Include the common styles for Angular Material. We include this here so that you only
// have to load a single css file for Angular Material in your app.
// **Be sure that you only ever include this mixin once!**
@include mat-core();



$mdc-typography-font-family: unquote("Raleway, sans-serif");

// $mdc-theme-primary: #6200ee;
// $mdc-theme-secondary: #018786;

// Define the default theme (same as the example above).
$candy-app-primary: mat-palette($mat-indigo);
$candy-app-accent:  mat-palette($mat-orange, A200, A100, A400);
$candy-app-warn: mat-palette($mat-red);

$candy-app-theme:   mat-light-theme(
    $candy-app-primary, $candy-app-accent, $candy-app-warn);



// Include the default theme styles (color and default density)
@include angular-material-theme($candy-app-theme);


// Include the dark color styles inside of a block with a CSS class. You can make this
// CSS class whatever you want. In this example, any component inside of an element with
// `.unicorn-dark-theme` will be affected by this alternate dark theme instead of the default theme.
.dark-theme {
    // Define an alternate dark theme.
$primary-dark: mat-palette($mat-blue-grey);
$accent-dark:  mat-palette($mat-orange, A200, A100, A400);
$warn-dark:    mat-palette($mat-deep-orange);

$theme-dark:   mat-dark-theme( $primary-dark, $accent-dark, $warn-dark);


@include angular-material-color($theme-dark);
}

```

### Next

We need to tell our app about our new theme!

Open **angular.json**

Find
```
"architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/coffeeManager",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "tsconfig.app.json",
            "aot": true,
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.scss"
            ],
            "scripts": []
          },
```
Add **"src/app-theme.scss"** after **"src/styles.scss"**
```
"architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/coffeeManager",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "tsconfig.app.json",
            "aot": true,
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.scss",
              "src/app-theme.scss"
            ],
            "scripts": []
          },
```

Be sure to add **"src/app-theme.scss"** after **"src/styles.scss"** in the second location under the **"test"** node.

We still have some work to do before our app will look like the screenshots above.

### Create a Shared Module

In the **src/app** dir create a new folder named **shared**

In the **shared** folder create a new file named **material.module.ts**

Add the following to **material.module.ts**

```
import { NgModule } from '@angular/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [],
  exports: [
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
  ]
})
export class MaterialModule { }

```

Save and close **material.module.ts**

Now we need to tell our **app.module.ts** where to find our new shared module.

In **app.module.ts** add the following in the imports section, 

```
import { MaterialModule } from './shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
```

Then under the **@NgModule** add **MaterialModule** and the **FlexLayoutModule** to the imports array.

Save and close **app.module.ts**

Open app.component.scss and add the following

```
.main {
  flex: 1;
  width: 100%;
  min-width: 100%;

  height: 100%;
  min-height: 100%;

}
```
Save and close **app.component.scss**

Open **app.component.html** and replace it's contents with

```
<main role="main" class="main">
  <app-sidenav></app-sidenav>
</main>
```
Save and close **app.component.html**

### Let's Create a Side Nav Component

Create a new folder called **core** in **src/app**

Create another folder in **src/app/core** called **sidenav**

Switch to the command line, if the app is running, stop it with 

**ctrl + c**

We will create the sidenav component from the command line, this will also add it to our **app.module.ts** for us automatically.

On the command type 

**ng g c -d sidenav --style scss**

Notice the **-d** flag, this allows us to run the command with out actually creating anything, this let's us make sure everything will be created correctly.

We are also adding a style sheet for the sidenav.

Now if you run the command, you should see the following on the command line.

```
keith@Keiths-MacBook-Pro coffeeManager % ng g c -d sidenav --style scss 
CREATE src/app/sidenav/sidenav.component.scss (0 bytes)
CREATE src/app/sidenav/sidenav.component.html (22 bytes)
CREATE src/app/sidenav/sidenav.component.spec.ts (633 bytes)
CREATE src/app/sidenav/sidenav.component.ts (280 bytes)
UPDATE src/app/app.module.ts (639 bytes)

NOTE: The "dryRun" flag means no changes were made.
```

Uh! Oh! I just noticed that the sidenav would have been created in the wrong folder. Good thing this is a dry run.

Let's change the command to 

**ng g c -d core/sidenav --style scss**

Run it once more

```
keith@Keiths-MacBook-Pro coffeeManager % ng g c -d core/sidenav --style scss
CREATE src/app/core/sidenav/sidenav.component.scss (0 bytes)
CREATE src/app/core/sidenav/sidenav.component.html (22 bytes)
CREATE src/app/core/sidenav/sidenav.component.spec.ts (633 bytes)
CREATE src/app/core/sidenav/sidenav.component.ts (280 bytes)
UPDATE src/app/app.module.ts (644 bytes)

NOTE: The "dryRun" flag means no changes were made.
```


If everything looks good, remove the **-d** flag and run the command again. This time the files *will be created* and the **sidenav.component.ts** will be registered in our **app.module.ts** file for us.

Run the app once more and you will see the following.

!["Coffee Manager - Sidenav- First Run"](/images/tut/sidenav-first-run.png "Coffee Manager - Sidenav- First Run")

What The! All this work, Just for This! 

Hold On! Hold On! It get's better!

Trust me I'm a professional! 

Stop the app from running by typing 

**ctrl + c**

Open **sidenav.component.html** and replace it's contents with 

```
<mat-sidenav-container
  class="app-sidenav-container"
  [class.dark-theme]="isDarkTheme">
  <mat-sidenav
    #sidenav
    class="app-sidenav mat-elevation-z10"
    [opened]="!isScreenSmall"
    [mode]="isScreenSmall ? 'over' : 'side'"
  >
    <mat-toolbar class="logo"><span><img src="../../../assets/logo.png" width="150px" height="150px"/></span></mat-toolbar>
    <mat-list role="list">
      <mat-list-item class="app-sidenav-navitem" role="listitem"><button mat-icon-button [routerLink]="['/home']" aria-label="Incident Reports">
        <mat-icon>house</mat-icon> Home
      </button></mat-list-item>
      <mat-list-item role="listitem"><button mat-icon-button [routerLink]="['/brands']" aria-label="Brands">
        <mat-icon>local_cafe</mat-icon> Brands
      </button></mat-list-item>
      <mat-list-item role="listitem"><button mat-icon-button [routerLink]="['/countries']" aria-label="Countries">
        <mat-icon>flag</mat-icon> Countries
      </button></mat-list-item>
      <mat-list-item role="listitem"><button mat-icon-button [routerLink]="['/apparel']" aria-label="Apparel">
        <mat-icon>shopping_bag</mat-icon> Apparel
      </button></mat-list-item>
      <mat-list-item role="listitem"><button mat-icon-button [routerLink]="['/gifts']" aria-label="Gifts">
        <mat-icon>card_giftcard</mat-icon> Gift Cards
      </button></mat-list-item>
      <mat-list-item role="listitem"><button mat-icon-button [routerLink]="['/about']" aria-label="About Coffee Manager">
        <mat-icon>topic</mat-icon> About
      </button></mat-list-item>
    </mat-list>
  </mat-sidenav>

  <div class="app-sidenav-content">
    <app-toolbar
      (toggleTheme)="toggleTheme()"
      (toggleSidenav)="sidenav.toggle()"
    ></app-toolbar>
    <div class="wrapper">
      <router-outlet></router-outlet>
    </div>
  </div>
</mat-sidenav-container>

```

Open **sidenav.component.scss** and replace it's contents with 

```
.app-sidenav-container {
  flex: 1;
  width: 100%;
  min-width: 100%;
  height: 100%;
  min-height: 100%;
}

.app-sidenav-content {
  display: flex;
  height: 100%;
  flex-direction: column;

}

.mat-icon-button {
  text-align: left;
  width: 120px;
}

.app-sidenav {
  width: 200px;
}

.wrapper {
  margin: 5px;
}
```

### Create the Toobar component

Just as we did with our sidenav component, we first do a dry run on our toolbar component.

**ng g c -d core/toolbar --style scss**

```
keith@Keiths-MacBook-Pro coffeeManager % ng g c -d core/toolbar --style scss
CREATE src/app/core/toolbar/toolbar.component.scss (0 bytes)
CREATE src/app/core/toolbar/toolbar.component.html (22 bytes)
CREATE src/app/core/toolbar/toolbar.component.spec.ts (633 bytes)
CREATE src/app/core/toolbar/toolbar.component.ts (280 bytes)
UPDATE src/app/app.module.ts (735 bytes)

NOTE: The "dryRun" flag means no changes were made.
```
If everything looks good, we remove the **-d** flag to create our toolbar.

Replace the contents of **toolbar.component.scss** with 

```

$iconWidth: 56px;

.toolbar-spacer {
  flex: 1 1 auto;
}

.sidenav-toggle {
  display: none;

  padding: 0;
  margin: 8px;
  min-width: $iconWidth;

  @media (max-width: 720px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}


mat-icon {
  font-size: 30px;
  height: $iconWidth;
  width: $iconWidth;
  line-height: $iconWidth;
  color: white;
}

```

Replace the contents of **toolbar.component.html** with 

```
<mat-toolbar color="primary">
  <button mat-button class="sidenav-toggle" (click)="toggleSidenav.emit()">
    <mat-icon>menu</mat-icon>
  </button>

  <span>Coffee Manager</span>
  <span class="toolbar-spacer"></span>

  &nbsp;
  <span>

</span>

  <button mat-button [matMenuTriggerFor]="menu">
    <mat-icon>more_vert</mat-icon>
  </button>


  <mat-menu #menu="matMenu">
    <button mat-menu-item (click)="toggleTheme.emit()">Toggle theme</button>
  </mat-menu>
</mat-toolbar>


```

Open **toolbar.component.ts** and add change the following.

```
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  
  constructor() { }

  ngOnInit(): void {
  }

}


```

To

```
import { Component, EventEmitter, Output } from '@angular/core';



@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent{

  @Output() toggleDir = new EventEmitter<void>();


}

```

Save and close **toolbar.component.ts** and **toolbar.component.html** and **toolbar.component.scss**

Open **sidenav.component.ts** and replace it's contents with

```
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  public isScreenSmall: boolean;

  constructor(
    private breakpointObserver: BreakpointObserver
  ) { }

  // users: Observable<User[]>;
  isDarkTheme: boolean = false;
  dir: string = 'ltr';

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  toggleDir() {
    this.dir = this.dir == 'ltr' ? 'rtl' : 'ltr';
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });
  }

}
```

We are telling the app that if the window size is 720 px wide then we need change the toolbar to be hidden and show the hamburger menu to toggle the toolbar. We also setup the ability for the user to switch between light mode and dark mode.

Restart the app with **ng serve**

You will see the error, **Property 'sidenav' has no initializer and is not definitely assigned in the constructor.**, this is due to TypeScripts strict Class initialization. We chose to enable this when we created the app.

Thanks goes to **Mikkel Christensen** for resolving this issue with his [stackoverflow answer](https://stackoverflow.com/questions/64874221/property-has-no-initializer-and-is-not-definitely-assigned-in-the-constructor)

Change **sidenav.component.ts** to 

```
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  public isScreenSmall!: boolean;

  constructor(
    private breakpointObserver: BreakpointObserver
  ) { }

  isDarkTheme: boolean = false;
  dir: string = 'ltr';

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  toggleDir() {
    this.dir = this.dir == 'ltr' ? 'rtl' : 'ltr';
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });
  }

}

```

If you stop and start the app once more, you see the error **Property 'isDarkTheme' does not exist on type 'ToolbarComponent'.**

Let's resolve this now.

Open **toolbar.component.ts** and change the contents to 

```
import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent{

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleTheme = new EventEmitter<void>();
  @Output() toggleDir = new EventEmitter<void>();

}

```

Save and close.

Open **app.module.ts** and add the following

```
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Other code omitted for brevity


],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,

```

Restart the app and you should see something similar to the following:

!["Coffee Manager - Styled - First Run"](/images/tut/coffee-manager-style-first-run.png "Coffee Manager - Styled - First Run")

None of our side menu buttons will work at this point because we have not setup routing yet, but if you click the vertical elipsis button in the toolbar, you can switch between light and dark modes.

You'll also notice in the Upper left, there is an outline of where your logo should go. Let's finish this post out by adding a logo.

Open **sidenav.component.html** and change the src attribute to point to the location of your logo.

```
 <mat-toolbar class="logo"><span><img src="../../../assets/logo.png" width="150px" height="150px"/></span></mat-toolbar>
 ```

 !["Coffee Manager - with Logo"](/images/tut/ChangedLogo.png "Coffee Manager - with Logo")

## Next - Part: 4 - [Authentication](/post/sharepoint/angular/tutorials/coffeemanager/p4-authentication/)
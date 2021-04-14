+++
author = "Keith Craigo"
title = "Angular - Surface SharePoint List Data With MSGraph - Part 6 - Microsoft Graph"
date = "2021-04-04"
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

[In my last post](/post/sharepoint/angular/tutorials/coffeemanager/p5-authentication-cont/), I setup the app to login into Azure AD and return the token and the user name. I also setup the toolbar to display the Login/LogOut button and user name.

There is still a little glitch, when the user is returned to our app, the toolbar may not reflect the change in the Login button or show the current users name without refreshing the browser screen. 

I will try and address this later but for now let's shift gears and open **oauth.ts**

We need to store our SiteID and our list ID's in a file that will not be uploaded to our git repository. If you have not already be sure to add **oauth.ts** to the .gitignore file.

Add a SPLISTSCONFIG const to oauth.ts, this is where we will store our Site and LIST ID's.

> Please Note!
> To get the SiteID go to https://graph.microsoft.com/v1.0/sites/[YOUR SITES PRIMARY DOMAIN OR URL]:/[YOUR SITE or SUBSITE NAME]
> i.e. https://graph.microsoft.com/v1.0/sites/mySpSite.sharepoint.com:/demo/coffeemanager
> copy the "id"
>

```
export const SPLISTSCONFIG = {
  siteID: [SITEID]
}
```

> As you create each of the lists make a note of the list ID, in the list settings screen, the List Id is located in the url as something like List=%7B9f930a02-3a08-4250-acde-94b64e114878%7D

Add the list ID of each of the following to the oauth.ts SPLISTSCONFIG const.

1. **CoffeeInventory**
  -  Title - Single line of text - Required
  -  Brand - Single line of text
  -  Description - Multiple lines of text
  -  Organic - Yes/No
  -  Grower - Single line of text
  -  Region - Single line of text
  -  ReOrderLevel - Number

2. **CupsMugs**
  -  Title - Single line of text - Required
  -  Description - Single line of text
  -  Color - Single line of text
  -  CupType - Choice (Regular Cup, Expresso Cup, Seasonal Cup, Limited Edition Cup, Mug, Travel Mug, Seasonal Mug, Limited Edition Mug, Thermos)
  - Price - Currency

3.  **ImpulseItems**
  -  Title - Single line of text - Required
  -  Description - Multiple lines of text
  -  Category - Choice (Hats, Shirts, Stickers, Buttons, Pens, Games)
  -  Classification - Single line of text

Your SPLISTSCONFIG const should now look something like the following:

```
export const SPLISTSCONFIG = {
  siteID: [SITEID],
  coffeeInventoryID: [COFFEEINVENTORY_LISTID],
  cupsMugsID: [CUPSMUGS_LISTID],
  ImpulseItems: [IMPULSEITEMS_LISTID]
}
```
## Setup Our Models
We need to create Models of each of our SharePoint lists.

Stop the app if it is running.

In the src/app/core/models folder create the following files:

1. **coffeeInventory.ts**
2. **cupsMugs.ts**
3. **impulseItems.ts**

Open **coffeeInventory.ts** and replace it's contents with:
```
export class CoffeeInventory {
  Id = 0;
  title = "";
  brand = "";
  description = "";
  organic = true;
  grower = "";
  region = "";
  reOrderLevel = 100;
}
```

Open **cupsMugs.ts** and replace it's contents with:
```
export class CupsMugs {
  Id = 0;
  title = "";
  cupType = "";
  description = "";
  color = "";
  price = 5.99;
}
```

Open **impulseItems.ts** and replace it's contents with:
```
export class ImpulseItems {
  Id = 0;
  title = "";
  category = "";
  description = "";
  classification = "";
  price = 5.99;
}
```

## SharePoint Service

Stop the app if it is running.

Before we create the SharePoint service, we need to add a **getAccessToken** function to our
**auth.service.ts** For more information see the [Microsoft docs](https://docs.microsoft.com/en-us/graph/tutorials/angular?tutorial-step=3)

```
// Silently request an access token
  async getAccessToken(): Promise<string> {
    let result = await this.msalService.acquireTokenSilent(OAuthSettings)
      .catch((reason: any) => {
        this.alertsService.addError('Get token failed', JSON.stringify(reason, null, 2));
      });

    if (result) {
      // Temporary to display token in an error box
      this.alertsService.addSuccess('Token acquired', result.accessToken);
      return result.accessToken;
    }

    // Couldn't get a token
    this.authenticated = false;
    return '';
  }
  ```

  Save and close **auth.service.ts**

On the command line while in the root dir, type and execute

```
ng g s core/services/sharepoint -d
```
If everything looks good
```
CREATE src/app/core/services/sharepoint.service.spec.ts (377 bytes)
CREATE src/app/core/services/sharepoint.service.ts (139 bytes)

NOTE: The "dryRun" flag means no changes were made.
```
Remove the -d "dryRun" flag and execute once more. Then open **sharepoint.service.ts** and let's walk through the code we need to add.

First let's add our base imports
```
import { Injectable } from '@angular/core';
import { Client } from '@microsoft/microsoft-graph-client';
import { AuthService } from './auth.service';
import { SPLISTSCONFIG } from '../../../oauth';
import { AlertService } from './alert.service';

```

Add our constants
```
const SHAREPOINT_SITE = SPLISTSCONFIG.siteID;
const COFFEEINVENTORY_LISTID = SPLISTSCONFIG.coffeeInventoryID;
const IMPULSEITEMS_LISTID = SPLISTSCONFIG.ImpulseItems;
const CUPPSMUGS_LISTID = SPLISTSCONFIG.cupsMugsID;
```

Now let's make some changes to our SharePointService class.

First we need to specify an alias to the Microsoft Graph client, I call this variable graphClient. 

```
 export class SharepointService {
  graphClient;
  constructor(
    private _notifierService: AlertsService,
    private _auth: AuthService
  ) {
    if (!this._auth.authenticated) return null;

     this.graphClient = Client.init({
      // Initialize the Graph client with an auth
      // provider that requests the token from the
      // auth service
      authProvider: async (done) => {
        let token = await this._auth.getAccessToken().catch((reason) => {
          done(reason, null);
        });

        if (token) {
          done(null, token);
        } else {
          done('Could not get an access token', null);
        }
      },
    });}

```

  Next we setup the functions that we will use to call our SharePoint lists in another part of the app.

  First let's setup the function that will async return our CoffeeInventory data.
  Notice we use our **CoffeeInventory** model as our Promise return type.

  ```
  /**
   * CoffeeInventory
   */
   async getCoffeeInventory(): Promise<CoffeeInventory[]> {
    try {
      let result = await this.graphClient!
        .api(
          'sites/' +
            SHAREPOINT_SITE +
            '/lists/' +
            COFFEEINVENTORY_LISTID +
            '/items?expand=fields(select=Id,Title,Brand,Description,Organic,Grower,Region,ReOrderLevel)'
        )
        .get();

        return result;
    } catch (error) {
      this._notifierService.addNotification('Get Sites failed', error);
    }
    return [];
  }
  ```
We make use of the SharePoint REST API to return the data we need from our list and if there is an error we show the user a message, sort of like a GROWL style message.

Now let's setup our **brands.component.html**

We will add a table, provide a filtering mechanism styled with Material Design.

Replace
```
<p>brands works!</p>
```
with
```
<div class="mat-elevation-z8">
  <div class="requestActions">
    <p>
      <mat-toolbar>
        <span>Coffee Inventory</span>
      </mat-toolbar>
    </p>
    <div class="main-button-container">
      <button mat-icon-button color="tertiary" aria-label="Add a new Coffee Brand" (click)="clearTable()">
        <mat-icon>add_circle_outline</mat-icon>
      </button>
      <mat-form-field appearance="fill" class="flex-item">
        <mat-label>Filter</mat-label>
        <input matInput (keyup)="applyFilter($event)" placeholder="Ex. Name" #input>
        <mat-hint align="end">Filter on all columns^</mat-hint>
      </mat-form-field>
    </div>

  </div>
  <table mat-table [dataSource]="dataSource" matSort>

    <!-- Checkbox Column -->
    <ng-container matColumnDef="select">
      <th mat-header-cell *matHeaderCellDef>
        <mat-checkbox (change)="$event ? masterToggle() : null"
                      [checked]="selection.hasValue() && isAllSelected()"
                      [indeterminate]="selection.hasValue() && !isAllSelected()"
                      [aria-label]="checkboxLabel()">
        </mat-checkbox>
      </th>
      <td mat-cell *matCellDef="let row">
        <mat-checkbox (click)="$event.stopPropagation()"
                      (change)="$event ? selection.toggle(row) : null"
                      [checked]="selection.isSelected(row)"
                      [aria-label]="checkboxLabel(row)">
        </mat-checkbox>
      </td>
    </ng-container>

    <!-- Id Column -->
    <ng-container matColumnDef="Id">
      <th mat-header-cell *matHeaderCellDef mat-sort-header> ID </th>
      <td mat-cell *matCellDef="let element"> {{element.Id}} </td>
    </ng-container>

    <!-- Title Column -->
    <ng-container matColumnDef="Title">
      <th mat-header-cell *matHeaderCellDef mat-sort-header> Title </th>
      <td mat-cell *matCellDef="let element"> {{element.title}} </td>
    </ng-container>

    <!-- Brand Column -->
    <ng-container matColumnDef="Brand">
      <th mat-header-cell *matHeaderCellDef mat-sort-header> Brand </th>
      <td mat-cell *matCellDef="let element"> {{element.Brand}} </td>
    </ng-container>

    <!-- Description Column -->
    <ng-container matColumnDef="Description">
      <th mat-header-cell *matHeaderCellDef mat-sort-header> Description </th>
      <td mat-cell *matCellDef="let element"> {{element.Description | date}} </td>
    </ng-container>

    <!-- Organic Column -->
     <ng-container matColumnDef="Organic">
      <th mat-header-cell *matHeaderCellDef mat-sort-header> Organic </th>
      <td mat-cell *matCellDef="let element"> {{element.Organic}} </td>
    </ng-container>

    <!-- Grower Column -->
    <ng-container matColumnDef="Grower">
      <th mat-header-cell *matHeaderCellDef mat-sort-header> Grower </th>
      <td mat-cell *matCellDef="let element"> {{element.Grower}} </td>
    </ng-container>

    <!-- Region Column -->
    <ng-container matColumnDef="Region">
      <th mat-header-cell *matHeaderCellDef mat-sort-header> Region </th>
      <td mat-cell *matCellDef="let element"> {{element.Region}} </td>
    </ng-container>


    <!-- ReOrderLevel Column -->
    <ng-container matColumnDef="ReOrderLevel">
      <th mat-header-cell *matHeaderCellDef> ReOrderLevel </th>
      <td mat-cell *matCellDef="let element"> {{element.ReOrderLevel}} </td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"
        (click)="selection.toggle(row)">
    </tr>
    <!-- Row shown when there is no matching data. -->
    <tr class="mat-row" *matNoDataRow>
      <td class="mat-cell" colspan="4">No data matching the filter "{{input.value}}"</td>
    </tr>
  </table>

  <mat-paginator [pageSizeOptions]="[5, 10, 20, 100]" showFirstLastButtons></mat-paginator>
  </div>
```
Currently there are a lot of red squigglies, but we will fix this now. Open **brands.module.ts** and import the **Materials Module** Don't forget to add it to the imports array.

```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandsRoutingModule } from './brands-routing.module';
import { BrandsComponent } from './brands.component';
import { MaterialModule } from '../shared/material.module';
import { SharepointService } from '../core/services/sharepoint.service';

@NgModule({
  declarations: [BrandsComponent],
  imports: [
    CommonModule,
    BrandsRoutingModule,
    MaterialModule
  ],
  providers: [SharepointService]
})
export class BrandsModule { }
```
Save and close **brands.module.ts**

Now open **brands.component.ts** and replace the contents with
```
import { Component, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { AlertService } from '../core/services/alert.service';
import { SharepointService } from '../core/services/sharepoint.service';

import { CoffeeInventory } from '../core/models/coffeeInventory';


@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent {
  coffeeInventory: CoffeeInventory[] = [];

  displayColumns: string[] = [
    'select',
    'Id',
    'Title',
    'Brand',
    'Description',
    'Organic',
    'Grower',
    'Region',
    'ReOrderLevel'
  ];

  dataSource = new MatTableDataSource<CoffeeInventory>();
  selection = new SelectionModel<CoffeeInventory>(true, []);

  constructor(
    private _notifierService: AlertService,
    private _sharepointService: SharepointService
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(){
    this.getCoffeeInventory();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /** Does the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAlertSnackBar(): void {
    this._notifierService.addNotification(
      'From the CoffeeInventory Component',
      'success'
    );
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
    this.selection.clear() :
    this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: CoffeeInventory): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.Id + 1
    }`;
  }

  clearTable() {
    this.dataSource.data = [];
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private async getCoffeeInventory(): Promise<void> {
    try {
      this.coffeeInventory = await this._sharepointService.getCoffeeInventory();
      let results = this.coffeeInventory.value.map(r => ({
        Id: r.fields.id,
        title: r.fields.Title,
        brand: r.fields.Brand,
        description: r.fields.Description,
        organic: r.fields.Organic,
        grower: r.fields.Grower,
        region: r.fields.Region,
        reOrderLevel: r.fields.ReOrderLevel
      }));

    console.log(`CoffeeInventory: ${results}`);
      // SharePoint DATA
    this.dataSource = new MatTableDataSource<CoffeeInventory>(results);


    } catch (error) {
      console.log(error);
    }
  }


}

```

Let's run the app to see where we are.

There is another glitch, the first time you compile the app, an error is thrown **Cannot get** but if you make a small change to your source code, like add a space and then resave, the compiler will run again and be successful.

Not a very sound way to do Software Engineering, but it works for now. I'll have to fix this later.

If you navigate to the brands page, you should be taken to the Microsoft login page. I just realized one gotcha, the app registration in Azure AD is setup to return the user to the registered RedirectURI, but if you have another app open which happens to be on the port specified in Azure AD, this can be confusing.

In production the RedirectURI should be changed to a static URL.



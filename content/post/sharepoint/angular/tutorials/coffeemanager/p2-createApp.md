+++
author = "Keith Craigo"
title = "Angular - Surface SharePoint List Data With MSGraph - Part 2 - Create the App"
date = "2021-03-12"
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
thumbnail = "images/tut/NewAngularApp.png"
+++

> ## Please Note!
> One of the dangers in writing a tutorial like this is that by the time you are finished writing it, there is a new revision to the libraries you are using. So please be aware that you may run into issues, **that you will need to resolve yourself**, if you use a different version of the libraries than what I am using.

## Benefits
- Does not require registration with the SharePoint App Catalog.
- Hosted outside of SharePoint.
- Allows switching between Light and Dark Modes.
- Authenticate and Authorize Users to Azure Active Directory.
- Easy integration with Microsoft O365 family of products such as Word and Excel.

## Requirements

- My editor of choice is [Visual Studio Code](https://code.visualstudio.com) , (you can use whatever editor you like)
- [Angular Cli](https://cli.angular.io)
- [Node (Latest LTS Version)](https://nodejs.org/en/)
- [Node Package Manager (npm)](https://www.npmjs.com)
- [Azure](https://azure.microsoft.com/en-us/)
- Microsoft Graph Client - [JavaScript SDK](https://docs.microsoft.com/en-us/graph/sdks/sdk-installation#install-the-microsoft-graph-javascript-sdk) 
- [Google Material Icons](https://material.io/resources/icons/?style=baseline)
- [Google Material Design Homepage](https://material.io/)
- [Github](https://github.com/kcraigo)


## What are we developing!

**Create an Angular app that surfaces SharePoint list data.**

On the cmd line type: **ng new coffeeManager**  

We definitely want routing, answer the other two questions however you see fit:
!["ng new app - questions"](/images/tut/AngularCreateQuestions.png "ng new app - questions")

Once the installation is complete type: **ng serve**

Your screen should look like the following!

!["CoffeeManager - Start"](/images/tut/NewAngularApp.png "CoffeeManager - Start")

Our goal is to make our app look like the following screen shots!

**Dark Mode**
!["Coffee Manager - Dark Mode"](/images/tut/coffeeManager-DarkMode.png "Coffee Manager - Dark Mode")

**Light Mode**
!["Coffee Manager - SharePoint Data"](/images/tut/coffeeManager-LightMode.png "Coffee Manager - SharePoint Data")

## Next - Part 3: - [Add Some Style](/post/sharepoint/angular/p3-addstyle/)


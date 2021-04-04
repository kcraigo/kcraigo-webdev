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

[In my last post](/post/sharepoint/angular/p5-authentication-cont/), I setup the app to login into Azure AD and return the token and the user name. I also setup the toolbar to display the Login/LogOut button and user name.

It's now time to surface SharePoint data with the Microsoft Graph.


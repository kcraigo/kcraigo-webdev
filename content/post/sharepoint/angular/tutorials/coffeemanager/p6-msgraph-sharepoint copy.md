+++
author = "Keith Craigo"
title = "Angular - Surface SharePoint List Data With MSGraph - UPDATE!"
date = "2021-06-05"
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

> ## This Project Is Now On Hold!
> This Project is now on hold! 
> Discovered that this project has some significant issues with various pieces i.e. login, data retrieval

You may remember in earlier posts that there were some glitches in this code, one being that when you initially compile the app it fails on the first try but if you make a small change then it would compile, this still needs to be resolved.

In my Azure Portal I switched the redirect URI's from Implicit Flow to PKCE.
Lately I've noticed that when I use a Gaurd, I end up in an endless loop of being redirected to the Microsoft Login and my page. Weird!

My apologies but to be fair to you, at this point I don't know if I will have the time to complete this project in a timely manner.
I have put the code on [CoffeeManager - Github](https://github.com/kcraigo/coffeeManager) , maybe you can figure out where the issues are in my code.

I recently took on a new position at my company and I'm currently studying for two certifications.




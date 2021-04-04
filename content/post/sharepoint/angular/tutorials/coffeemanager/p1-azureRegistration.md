+++
author = "Keith Craigo"
title = "Angular - Surface SharePoint List Data With MSGraph - Part 1 - App Registration"
date = "2021-03-03"
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
series = ["SharePoint App Development"]
thumbnail = "images/tut/Azure-Services.png"
+++

> ## Please Note!
> One of the dangers in writing a tutorial like this is that by the time you are finished writing it, there is a new revision to the libraries you are using. So please be aware that you may run into issues, **that you will need to resolve yourself**, if you use a different version of the libraries than what I am using.


{{<youtube kvm9am9GKqk>}}


**Part 1 - Register Your App in Azure Active Directory**

Navigate to your [Azure Portal](https://azure.microsoft.com/en-us/)
!["Azure Services"](/images/tut/Azure-Services.png "Azure Services")
!["App Registrations"](/images/tut/App-Registrations.png "App Registrations")
!["Click New Registration"](/images/tut/New-Registration.png "Click New Registration")
!["Register Your App"](/images/tut/Register-App.png "Register Your App")
!["Add API Permissions"](/images/tut/API-Permissions.png "Add API Permissions")

## Next - Part: 2 - [Create An Angular App](/post/sharepoint/angular/tutorials/coffeemanager/p2-createapp/)
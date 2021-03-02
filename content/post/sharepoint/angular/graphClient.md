+++
author = "Keith Craigo"
title = "Create an Angular app with (MSAL) Microsoft Authentication Library, SharePoint, Graph Client, & OpenSprinkler Pi (OSPi)"
date = "2021-02-28"
draft = true
featured = true
description = "Create an Angular app that surfaces water usage, daily temps, motion detections from a SharePoint list data. Then use that SharePoint data to run daily, monthly, yearly reports. This app does not require registration with the SharePoint App Catalog"
tags = [
    "markdown",
    "SharePoint",
    "featured"
]
categories = [
    "sharepoint",
]
series = ["SharePoint Tools"]
thumbnail = "images/tut/accessPass-MSLogin.png"
+++


## Benefits
- Does not require registration with the SharePoint App Catalog.
- Hosted outside of SharePoint.
- Allows switching between Light and Dark Modes.
- Authenticate and Authorize Users to Azure Active Directory.
- Easy integration with Microsoft O365 family of products such as Word and Excel.

## Tools

- My editor of choice is [Visual Studio Code](https://code.visualstudio.com) , (you can use whatever editor you like)
- [Angular Cli](https://cli.angular.io)
- [Node (Latest LTS Version)](https://nodejs.org/en/)
- [Node Package Manager (npm)](https://www.npmjs.com)
- [Azure](https://azure.microsoft.com/en-us/)
- Microsoft Graph Client - [JavaScript SDK](https://docs.microsoft.com/en-us/graph/sdks/sdk-installation#install-the-microsoft-graph-javascript-sdk) 
- [Google Material Icons](https://material.io/resources/icons/?style=baseline)
- [Google Material Design Homepage](https://material.io/)
- [Github](https://github.com/kcraigo)
- [OpenSprinkler Pi (OSPi)](https://opensprinkler.com/product/opensprinkler-pi/)


## What are we developing!

**Create an Angular app that surfaces SharePoint list data.**

I have installed the OpenSprinkler Pi (OSPi) to not only control my sprinkler system but I have also setup motion detection to deter any animals (cats, skunks, dogs, humans) from entering my yard and leaving presents or from living under my house.

I've enabled the OpenSprinkler Pi (OSPi), using [Microsoft PnP Python SDK](https://github.com/pnp/PnP/tree/master/Samples/Python.Office365.AppAuthentication) to push data, such as, when the time and date the motion detector triggerd, temp at the time the motion detector triggerd and the zone that was triggerd, to a SharePoint list.

Eventually I may add Object detection, video capture etc...


Ok how dose this relate to the Angular app?
We will use the Angular app to surface this data from SharePoint and run reports. 

Light Mode
!["AccessPass - Light Mode"](/images/tut/accessPass-lightmode.png "AccessPass - Light Mode")

Dark Mode
!["AccessPass - Dark Mode"](/images/tut/accessPass-darkmode.png "AccessPass - Dark Mode")

Azure AD Authentication
!["AccessPass - Azure AD Authentication"](/images/tut/accessPass-MSLogin.png "AccessPass - Azure AD Authentication")

SharePoint Data
!["AccessPass - SharePoint Data"](/images/tut/accessPass-SPData.png "AccessPass - SharePoint Data")
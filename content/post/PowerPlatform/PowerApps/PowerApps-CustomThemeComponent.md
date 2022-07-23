+++
author = "Keith Craigo"
title = "Power Apps - Custom Themeing Options"
date = "2022-07-22"
draft = false
featured = true
toc = false
codeLineNumbers = true
codeMaxLines = 10
description = "Power Apps - Custom Themes!"
tags = [
    "SharePoint",
    "Dataverse",
    "Dataverse for Teams",
    "Themes",
    "CoE Starter Kit",
    "Power Platform",
    "Power Apps"
]
categories = [
    "themes","power platform","power apps","dataverse", "dataverse for teams",
]
series = ["Power Platform"]
thumbnail = "images/ColorThemeTool0.png"
+++

Technologies:

1. Power Apps
2. SharePoint
3. Dataverse
4. Dataverse for Teams

# Power Apps Theme Options!

Power Apps by default has several built in themes to choose from.
These are limited but are a great start!

Sometimes you need a custom theme to match your branding and the defualt do not work for all cases!

No need to lose hope!

In 2018 on the Power Apps Community Blog, I posted about my custom theme generator.
I created the component with the Google Material Design Colors!

[Custom Theme Generator](https://powerusers.microsoft.com/t5/Webinars-and-Video-Gallery/PowerApps-Custom-Theme-Generator/m-p/105037)

> ### PRO ##  
> - Fully customize your theme

> ### CON ## 
> - Locked into Google Material Colors
> - Has not been updated since 2018
> - Adds extra weight to your apps


### Other Options

- [Microsoft CoE Starter Kit - Themeing Tool](https://docs.microsoft.com/en-us/power-platform/guidance/coe/starter-kit)
> ### PRO ##  
> - Fully customize your theme

> ### CON ## 
> - Requires an Environment with Dataverse
> - Premium License is required!
> - Managed Solution, you cannot edit the components!
> - Must build your apps based on the included templates!

I have not experimented with the CoE Kit beyond installing the Theming tools, opening the Theme Tool and attempting to create a simple theme. 

I think this tool has a lot of potential, but it does not save my theme options, it changed the component themes based on my selections but once I clicked save, some of the controls returned to the tool defaults while others kept my settings?

When I choose to Publish the Theme the next screen only shows static text "Getting your data ...", a spinner or progress bar or fading text would have been more appropriate to indicate the app is actually doing something.

To be fair, I installed the Theme tool in my developer environment. I'll give it another try in Teams.
But given that this tool can only be used with Dataverse which requires a premium license if not developing in Teams, I will more than likely not use it and just develop my own solution.



### There are several other ways to approach custom themes, I only name a few I have tried.

 
1. Build a custom tool like I did. 
2. Add a screen that will never be navigated to, call it "template" or whatever you want, in your app and place at least one of each control in your app on the template screen, set all the properties of the components and then link all other components appropriately to the templated properties. 

> - PRO: Easy and convienient
> - CON: Depending on number of controls, adds extra weight to your app.

3. Add color swatches, instead of controls add shape icons on the template screen, set the fill color value of each shape to your brand colors and then refrence the appropriate fill value of the shape on each of your components.

> - PRO: Easy and convienient

4. Build a component in a shared component library

> - PRO: Easy and convienient
> - CON: Depending on number of controls, adds extra weight to your app.

5. Surface all your color values from an external source such as Excel, XML, YAML, JSON, SharePoint, a Database (Be Aware that connecting to a database is a Premium Connector) etc.

> - PRO: Easy and convienient
> - CON: Depending on number of controls, adds extra weight to your app.
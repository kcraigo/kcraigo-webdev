+++
author = "Keith Craigo"
title = "Dataverse Import Options"
date = "2021-07-11"
draft = false
featured = false
description = "Dataverse - Import Options"
tags = [
    "markdown",
    "Dataverse",
    "featured"
]
categories = [
    "PowerPlatform",
]
series = ["Power Platform"]
thumbnail = "images/tut/PowerPlatform/Power_Query_Dashboard.png"
+++

**Dataverse Import Options**


!["Dataverse Import Options"](/images/tut/PowerPlatform/Power_Query_Dashboard.png "Dataverse Import Options")

I originally posted this article on Linked-In in June,2021
[Linked-In Post](https://www.linkedin.com/pulse/dataverse-data-import-options-keith-craigo/?trackingId=PInGrG7woqa1p1vUHLalLw%3D%3D)

Recently I was exploring some data store options for an application I'm developing for my org.

This project is a port of an app I developed around 6 years ago in SharePoint 2010 using Microsoft InfoPath and Nintex Workflows.

I had considered just porting to SharePoint Online but neither InfoPath, now deprecated, nor Nintex is supported in SharePoint Online. All the forms would need to be redesigned with standard SharePoint forms or the preferred way would be to use Power Apps. The workflows would need to be ported to Power Automate.

The current workflows are not incredibly complicated but they are also not all that trivial either. The port would not really be that difficult, the challenge is that SharePoint lists have what is called a View Threshold, the default is around 5000 rows, I have increased ours to 6000. Once the number of rows exceeds this limit the sorting and filtering features of the web interface will start failing and on occasion, even the backing workflows have been affected in my experience.

The current site generates enough traffic and workflow triggers to justify moving to another platform designed to handle the workload. Such as a database like SQL Server or Dataverse.

I explored Dataverse in Teams since it is now included in the O365 license but you can only have up to a 1000 team members and there is a data limit of 1 Million rows or 2G of storage space before you need to upgrade your license. The storage space is generous but this app has to be available to all employees in the organization which is significantly more than 1000. This option would not work for our scenario.

I had considered using our SQL Server instance. I could develop the database services in .Net, the authentication pieces through the Microsoft Graph and the UI in Angular but this approach requires a lot more time in planning, drawing up disaster recovery plans, network diagrams, going through several review meetings. You have to ensure data protection at rest as well as in transit, IP protection policies have to be considered, you have to make sure your design adheres to Personally Identifiable Information (PII) protection i.e. GDPR. It is too tedious of a process for this particular scenario to take on myself at this time. There are other factors that make this a no go for this project as well.

You say wait, what about SPFx solutions, this is a great option except these are considered Add Ins and must be approved to be added to the SharePoint App Catalog. Again this would trigger a lengthy approval process as I described in the paragraph above and it would just be a port over to SharePoint. Also not appropriate for this type of app.

This project needs to utilize existing proven infrastructure, tested and trusted technologies that are generally available within the enterprise and must be well supported with a minimal code base. If I am no longer with the company, I have no plans of going anywhere, but to be prepared you need to think of these things, someone still has to maintain what you develop.

Power Apps with a Dataverse data store is exactly the right platform for my project. Both are integrated with the organizations Azure Active Directory to ensure that only our employees can access the app and its data. Both provide secure features to help with IP Protection such as Data Loss Protection Policies (DLP), business flows, role based security, data encryption at rest and in transit and more. All included without you having to write any code. Win Win scenario in my opinion.

Dataverse is considered premium. It is a separate license from the O365 license that Power Apps is included, therefore the powers that be, upper management will still need to decide if the cost is worth it. I believe, but I'm not the one that makes those final decisions, with the minimal amount of effort, the built in security, the extensibility options, built in monitoring capabilities through the O365 Admin centers, ease of integrating with the entire O365 suite of products, reporting capabilities of Power Bi, Azure Insights and much more. I think it is definitely an option worth considering.

Ok enough let's get on with the real purpose of this article, Importing data into a Dataverse table. The header on this article shows all the options you could use to import data from.

There are some challenges!

Now to be fair, the challenges I am about to describe could be due to how the corporation has setup the Data Loss Protection Policies (DLP). I need to look into this further.

I can only briefly talk about my experience with the Power Apps Office Add In, the Text/CSV option and importing from a SharePoint Online list.

First, the Excel Add In is available from the Microsoft Store for both Mac and Windows. Let's be honest, the Add In has never worked on the Mac Desktop version of Excel, I think this Add In is over 4 years old. It works great in O365 Online version of Excel.

On my work laptop the Add In is not authorized at the moment, so I can not use the Add In to import my data.

What would be great is if the Dataverse version in the Power Apps studio allowed you to enter data like the Dataverse for Teams does with a web app interface. Hey! Microsoft is this perhaps coming soon?

!["Data Entry in Teams"](/images/tut/PowerPlatform/Teams_Data_Entry.png "Data Entry in Teams")

If you develop a Model Driven app you can easily enter the data with the Modern experience (More like Power Apps Studio) or in the Classic experience, but for Canvas Apps the web editing experience is different.

A built in web data table editing experience for Canvas apps would be great for development purposes. In the full Dataverse version you have to import either with the Power Apps Office Add In through Excel or use PowerQuery. I even tried the Export Data option within the Dataverse table designer but this only exported the table schema, no data was exported.

There are a lot of options Importing with PowerQuery


!["Dataverse Import Options"](/images/tut/PowerPlatform/Power_Query_Dashboard-600x222.png "Dataverse Import Options")

For me the Excel Add In is not authorized at this point on my Windows work laptop nor the online version of Excel.

But as I mentioned the add in works great on my personal online version of Excel.

On my employers laptop, I tried exporting the data from Dataverse but this option only exports the table schema. I added the table data into the downloaded Excel file manually and then tried to Import it into Dataverse, setup the column mappings only to have it fail to import every single time. Not good!

Next I downloaded a fresh Excel file from my Dataverse table, created a SharePoint list with the downloaded Excel file, then tried to import with the SharePoint Online List option. No Luck, fails every-time.

Finally I downloaded a fresh Excel file from my Dataverse table once more, added my data and saved this as a .csv file. I successfully imported the .csv file into my Dataverse table only to discover it completely ignored all the person type fields. I'll give the other options a try as time permits and blog it here.

At this point I'm just going to develop a Power App, probably a Model Driven App to edit the data.






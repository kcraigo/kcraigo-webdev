+++
author = "Keith Craigo"
title = "Internal Business Processes -  Some Things Citizen Developers May Not Be Aware Of!"
date = "2021-08-21"
draft = false
featured = true
toc = true
codeLineNumbers = true
codeMaxLines = 10
description = "Business Processes you may not be aware of."
tags = [
    "processes",
    "workflows",
    "productivity",
    "project management"
]
categories = [
    "business","processes","roi","employee productivity","project management",
]
series = ["Business Processes"]
thumbnail = "images/tut/BusinessProcesses/logo80x80.png"
+++

> ## DISCLAIMER!
> I mention the Power Platform and SharePoint in this article due to they seem to be the most popular options in the industry. But there are other platforms out there. 

> Low Code / No Code solutions are not always the right choice.

 I have been involved in several internal projects over the years and these are my experiences, frustrations, areas I feel could and should be improved in the process of adopting a project into an organization. 
Especially now that there is a big push to bring Citizen Developers into the mix.

### Scenario
ex. You are responsible for issuing and tracking long term parking permits for your company's business travelers. 

**Current Process:**

- Co-Workers send an email requesting a parking permit because they are going on business travel. But since this is through email, one co-worker may provide all
the required information. 
Another may only include a subset of the required data which requires you to send a follow up email, sometimes several follow up emails. 

- Sometimes the co-worker is leaving on business travel that same day as the email lands in your inbox.

- It is your responsibility to reach out to the requestors manager for approval.
- It is your responsibility to notify Security Officers to keep an eye on this business travelers vehicle during their rounds.

- You use Excel to manage the requests. This spreadsheet only exists on your desktop and only you have access to it. You realize this is known as a Data Silo and is 
considered a bad practice, especially if you are the only one with access. What happens if 
you are not available, your out sick, you leave the company.

**A Better Process:**

You decide there has to be a better approach.

- Co-Workers should submit a request through a standard web form, add-in, a mobile app or all. 

There should be clear procedures and lead times as to when a request should be submitted..

The request should be saved to a database. 
You need Business rules to prevent your co-workers from submitting the request unless all the required fields have been properly filled in. 

Workflows need to be created to send out and track approval requests, reports, reminder notifications, alerts, logs, analytics etc. 

Other co-workers may need to be granted access to help manage the data or run reports, all changes should be automatically available to any stakeholder with the proper permissions. There shouldn't be any more Data Silos.

Now we need to decide, should we purchase a 3rd party solution or do we require custom development.

You and your manager agree on custom development since this is a "simple app".
You are assigned the task of developing the app since you are the most familiar with the process, you are the domain expert.

Let's assume you are comfortable with one of the Low Code / No Code platforms,you are not a Software Engineer but you have developed small to large apps in the past.

> My advice, don't just settle on one approach, be bold and look into not only the various other low code / no code solutions i.e. Power Platform, ServiceNow, and more.
But also look into the other architectures, learn about your IT departments guidelines, talk to your co-workers, talk to your IT personnel, without annoying them of course.

**Now what?**

### Option 1 - Power Platform + SharePoint
Your first choice for the database is SharePoint since it is included in your company's 0365 plan, the frontend should be developed in Power Apps and the workflows will be created with Power Automate. Let's make this as easy as possible and if you are not available anyone can pick up where you left off.

Then you find out that SharePoint lists have a view threshold of around 5k rows and once this threshold is exceeded, the sorting, filtering, and search features on the list start to degrade.

You decide the best way to handle this is to archive the data, reduce the number of rows in your list to get the search, filtering and list sorting features working again. You decide this should be done either by status or by date and you move these records into a separate list. You can do this manually but I suggest you create a scheduled workflow to handle this, you will need to determine the schedule.

You can mitigate the view threshold issue by either increasing the limit to a reasonable amount such as 6k, consult with your SharePoint admin about this. Another approach is to create indexes on your lists for the columns that are most searched on. You can create up to 20 indexes. Also create different views based on your most searched criteria, such as the requestor, by date, by status. This helps a lot but at some point you may still run into view threshold limits. SharePoint can handle a lot of data but there are some things as a site owner you should be aware of. 

Now you have multiple lists to maintain, you can't just delete data because this data is subject to SOX audits, you now need to think about list permissions on your archived data, you don't want to allow anyone to change the archived records.

You soon realize that the view threshold is exceeded every few weeks. In my case this is exactly what is happening with several of my lists, I manage several different services offered by my department each with their own list and archives.

It's clear that this approach is no longer working and will soon become a maintenance nightmare.

### Option 2 - Power Platform + SQL Server

Now you decide that Power Apps is still the choice for the frontend and Power Automate should still be used for the Workflows but the data source should be SQL Server which lives in one of your company's data centers.

You must purchase a Power Apps premium license at this point. You think ok there are only two premium license plans. A Per App plan at $10 per user / per app / per month or the other plan at $40 per user / per month and users can have access to an unlimited amount of apps.

**Hold On A Second!**

Your app has to be available to all of the employees in your company.

Let's say your company has 5k or more employees.

Let's take a look at the current Power Platform license fees.

**Per App Plan:** 

1 App x 5k Employees x $10 = $50,000 per month.

To me, this plan only makes sense if there are a limited number of employees.

**Per User Plan:**

5k Employees x $40 = $200,000 per month

To me, this plan only makes sense if there are a lot of apps that need to be 
developed and the Return on Investment (ROI) justifies the cost.

You say ok, I'll just go with Microsoft Dataverse, this still requires a premium license for the full version.

Microsoft Dataverse for Teams won't work in this case, even though this is now included in the Teams license and does not require a separate license. Dataverse for Teams has a limit of 1 million rows or 2GB of data, whichever comes first. At this point your organization will need to switch over to a **premium license**. You determine that the number of requests will exceed these limits in a short amount of time. 

A premium license will require several approvals. At a minimum your manager will need to approve, you may need approvals from your Legal department and maybe even several groups within your IT department. You may spend months or even years in meetings about this approach just as you would with any other scenario that goes beyond the basic licenses.

In my case this option is a tough sell.

### Option 3 - Cloud Technologies

You know how to develop applications and you have a personal developer account on Azure. You've been developing several personal apps on this account and now feel confident you can build the apps your department needs in the same way. 

You decide to use Azure SQL for the database since this is what you are familiar with.
Authentication and authorization can be taken care of by using the Microsoft Graph SDK to get Access and Refresh tokens from Azure. 

For the frontend you know how to develop a web app in either Angular, React, or Blazor. You can use Azure functions for your API and Azure Logic Apps for your workflows.

Great! Problem solved! 

**Hold Your Horses!**

In my experience, when introducing any size app project into the Enterprise, there is no such thing as a "simple app", we should no longer use this term. There is much more to an app than the code and the ui.

This approach is fine for your personal apps but your app is being developed for an enterprise. In most cases you will need to file a ticket requesting assistance from your IT department. This will start the consulting process with a number of IT Domain experts. 

The process can be a process in and of itself. Finding out who to contact, what forms need to be submitted, the steps you must take may be vague in some cases, it may depend on which approach you take, this will come with experience.

You will need to request and be granted an account on your company's tenant i.e. Azure, AWS or whatever your org prefers.

You then discover that your organization does not use the Microsoft pipeline for authenticating and authorizing users. Your org uses another OAUTH2 provider.

Now you need to align with your IT department again to have environements spun up for Development, Q&A, and Production. You need to have an account assigned to you on the 3rd party OAUTH2 provider tenant because that is a requirement of that platform.

Your department will need to consider the cost of this. Your department may need to acquire a license or pay a service fee for the resources on this 3rd Party platform. 

Your IT department requires you put all your code into source control. You have to request a source control account, this may not be Github, you need to setup CI/CD. Your required to take a DevOp course to become familiar with the processes your IT department follows.

You must do a cost analysis. What is the true cost of ownership.
You can get some ideas by using the [Azure Total Cost of Ownership (TOC) Calculator](https://azure.microsoft.com/en-us/pricing/tco/calculator/) 

or the [Azure Pricing Calculator](https://azure.microsoft.com/en-us/pricing/calculator/)

Or if your company uses another platform like the Amazon Web Services platform. You need to find out the costs of this platform. Your department will need to bear these costs.

This is only the first step of the project though.

You will now need to meet with one or more people in your organization, more than likely several times.

 Sometimes you need to meet with groups of people at the same time. You will need to draft presentations of the cost analysis, Network requirements, Security measures needed, maybe even Legal documents i.e. Contracts and NDA's, determine what are the long term support plans, Disaster Recovery plans, Data backup plans, will this be a hybrid solution, will your app only reside in the cloud, will the app be a monolithic, serverless or microservices architecture, should your solution be containerized i.e. Docker, who will be the long term support contacts and even more.

You may be required to search out 3rd party solutions and present a comparison of your findings, even if you have already done this. Maybe a certain amount of time has passed since your last steering committee meeting, remember this process can take years in some cases.

More than likely you will need to draft and revise several entity diagrams, Security diagrams, Network diagrams. You may even need to draft Vertices and Edge diagrams to compare a graph database approach versus a relational database approach.

You need to determine along with your team, where the data will reside, should it remain in a single location, should it be distributed across several availability zones or should it be a hybrid solution where the data remains in one of On-Premise locations but the code lives in the cloud. 

If your app is to be used by employees in other countries, what are the local laws and regulations concerning where the data must reside, PII protection i.e. CCPA and GDPR laws. 

How will you support native languages if required?

You will need to setup guidelines, write policies, have those policies approved by your legal team and then stored in a repository.

You need to determine how you are going to manage feature creep, trust me everyone involved will want to introduce new features, it's not a matter of when and if it will happen, it's going to happen. You need to be willing to say no if it interferes with developement and go live schedules, but say no in a professional way.

Again does your IT department have the resources to support all this infrastructure. 
If this is all new to your corporation you may need to consider other approaches.

Bottom line, you will not be the only one responsible for the success of your project. 

You need to be patient and diligent. Sometimes a project may fall in place with the corporations goals and future plans, all the stakeholders will agree, and all the other support services will be ready and eager to get started.

As I have already said, other times it may take several months or even years before your project gets a green light to just start talking about moving beyond the design phase. 

The reason this may take a long time may not be due to the quality of your designs nor the tech requirements and resources available. Sometimes it takes this long due to internal politics, power plays about who will control the direction of the project, who gets the credit for the project. It's sad when this happens, hopefully this does not happen often but be aware it does happen.

You also need to realize you may need to perform the above steps several times and even after all this the powers that be may decide to cancel the project altogether and go in a different direction. 

This alignment process is already hard enough for seasoned professionals to figure out. Now that there is a big push in almost every industry to bring Citizen Developers into the mix with Low Code / No Code platforms because projections state that there will not be enough Software Engineers / Developers to handle the demands of the future.

Let me be bold again and state that I believe most of the Citizen Developers do not know what it actually takes to have an application adopted into the enterprise, the true cost, the amount of support it takes.

 This is where not only the IT departments but also Citzen Developers must step outside of their comfort zones, look for opportunities to collaborate with one another more often. 

I only know of, at a high level, Robotic Process Automation (RPA). It seems to me that a lot of the manual searching, discovery, and time it takes to determine an approach, the approval workflows, the alignment it takes to get a project adopted into an Enterprise could be greatly reduced by automation. 

I also know that this is not be an easy thing to accomplish but I think it is worth looking into.

But maybe I'm just too hopeful or maybe I'm just too naive. 

Oh! Wait! Does this require another meeting?
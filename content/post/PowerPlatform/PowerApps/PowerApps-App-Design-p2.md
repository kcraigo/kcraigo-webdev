+++
author = "Keith Craigo"
title = "P1 - Create A Parking Request Management System with the Power Platform - Design"
date = "2024-1-2"
draft = true
featured = true
toc = false
codeLineNumbers = true
codeMaxLines = 10
description = "Power Apps!"
tags = [
    "Dataverse",
    "Design",
    "Power Platform",
    "Power Apps"
]
categories = [
    "power platform","power apps","sharepoint","mindmaps","power automate"
]
series = ["Power Apps - System Development"]
thumbnail = "images/tut/PowerPlatform/MindMapIt.png"
+++

Technologies:

1. Power Apps
2. SharePoint

[P1 - Power App Design Series - MIND MAP IT!](./powerapps/powerapps-app-design/)

## Draft Use Cases
Parking Request Manager – Use Cases

#### Use Case 1: 
**Web submission – formfactor**
1.	User should be able submit a request using their laptop, deskstop, or tablet device.
2.	User should receive a notification on the status of the submission. (Success / Issue)
3.	The data entry should trigger an Approval Workflow.
4.	The worklflow should update the request list with the Approvers names.
5.	The workflow should update the request list based on the outcome from the approvers.


#### Use Case 2: 
**Mobile submission – formfactor**
1.	User should be able to submit a request from their mobile device.
2.	User should receive a notification on the status of the submission. (Success / Issue)
3.	The data entry should trigger an Approval Workflow.
4.	The worklflow should update the request list with the Approvers names.
5.	The workflow should update the request list based on the outcome from the approvers.

#### Use Case 3: 
**Approvers** 
1.	Approval notification should sent via an email with action cards.
2.	Approval notification should contain a list of alternative ways to take action on the request. 
a.	Email notification
b.	Teams Approvals App – Click the elipisis button and search for Approvals.
c.	Power Automate Studio – Approvals Tab

## Create Entity Diagrams
<figure>
    <img src="/images/tut/PowerPlatform/ParkingReqManager/ParkingManager-Entities.drawio.png"
         alt="Parking Request Entity Diagram">
</figure>

## Clarification of the Question Table and the QuestionClassification tables!

I'll refer to tables as lists due to SharePoint will be used in the demo.

Why the QuestionClassification list?

The Questions list will be a **Master List** of questions.

- Is Vehicle in good running condition? **Classifications:** On-Prem, Parking, Security
- SOC 2 Type 2? **Classifications:** SaaS, Cloud, AWS

Each question will be classified by one or more of the Classifications listed in the QuestionClassification list.

- On-Prem
- SaaS
- Security
- Parking
- Lost and Found
- Incident
- Vehicle
- Delvery
- Phone Log
- Cloud
- Hardware
- Virtual Machine
- AWS
- Azure
- GCP
- Aurora Database
- Azure SQL
- Cosmos DB
- SQL Server
- Amazon Neptune
- Amazon DocumentDB
- ISO27001
- NIST 800
- GDPR
- Bridge Letter
- Pentest

And more, both Questions and QuestionClassification lists will grow over time.

Questions and QuestionClassification lists will be used in other projects. 


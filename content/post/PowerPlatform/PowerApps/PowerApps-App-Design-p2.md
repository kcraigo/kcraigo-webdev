+++
author = "Keith Craigo"
title = "P2 - Power App Design Series - Diagrams and more!"
date = "2023-11-25"
draft = false
featured = true
toc = false
codeLineNumbers = true
codeMaxLines = 10
description = "Power Apps - Custom Themes!"
tags = [
    "SharePoint",
    "Design",
    "Power Platform",
    "Power Apps"
]
categories = [
    "themes","power platform","power apps","sharepoint","mindmaps","power automate"
]
series = ["Power Apps - App Design"]
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
    <img src="images/tut/PowerPlatform/ParkingReqManager/ParkingManager-Entities.drawio.png"
         alt="Parking Request Entity Diagram">
</figure>


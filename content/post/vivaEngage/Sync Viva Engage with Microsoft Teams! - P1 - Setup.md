+++
author = "Keith Craigo"
title = "Sync Viva Engage with Microsoft Teams!- P1 - Setup"
date = "2024-03-27"
draft = false
featured = true
toc = true
codeLineNumbers = true
codeMaxLines = 10
description = "Power Automate, MSTeams and Viva Engage!"
tags = [
    "Microsoft Teams",
    "Viva Engage",
    "Power Automate"
]
categories = [
    "msteams","power platform","power automate","viva engage",
]
series = ["Viva Engage & MSTeams"]
thumbnail = "images/ColorThemeTool0.png"
+++

Technologies:

1. Viva Engage
2. Microsoft Teams
3. Power Automate

# Viva Engage

Viva Engage used to be called Yammer!
Viva Engage is a social media type system for use within a corporate environment. 
Each community in Viva Engage is backed by a SharePoint site.

Microsoft Power Automate can be used with Viva Engage posts.

In this post is one of -- in a blog series. 

**SETUP**
I will show you how you can setup a Power Automate to publish to a Microsoft Teams Channel when you post to a Viva Engage Community channel. 

- Side NOTE: Power Automate in Microsoft Teams is now referred to as **Workflows**, not sure if this will be name for other environments, but I say why not, it makes it easier than keeping track of all the different names. 

For the rest of this post, I will use the term **Workflows**!

Any who! Let's move on!

First things First!
**Workflows** does not have a way to work with your own Viva Engage Storyline, at least not directly. More about this in part 3 of this series.

We can however in **Workflows** interact with the Viva Engage Home Feed and Community Channels.

Let's setup an Instant Cloud Flow in Power Automate Studio to post to a Viva Engage Community when someone posts to a Microsoft Teams Channel. 

In Power Automate Studio, create an Instant Cloud Flow.
<figure>
    <img src="/images/tut/vivaEngage/InstantFlow.png"
         alt="Power Automate - Create an Instant Flow">
</figure>Í
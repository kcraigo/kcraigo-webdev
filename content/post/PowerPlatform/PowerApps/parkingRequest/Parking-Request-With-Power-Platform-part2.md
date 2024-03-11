+++
author = "Keith Craigo"
title = "Real World Power Platform Projects - Parking Request Manager - part 2: Create The Form"
date = "2024-02-27"
draft = false
featured = true
toc = false
codeLineNumbers = true
codeMaxLines = 10
description = "Power Apps - Enterprise Development!"
tags = [
    "Dataverse",
    "Design",
    "Power Platform",
    "Power Apps"
]
categories = [
    "enterprise app development","power platform","power apps","sharepoint","mindmaps","power automate"
]
series = ["Power Apps - Real World Power Platform Projects"]
thumbnail = "/images/tut/PowerPlatform/ParkingReqManager/Parking-Truck-2.jpeg"
+++

<figure>
    <img src="/images/tut/PowerPlatform/ParkingReqManager/Parking-Truck-2.jpeg"
         alt="Business Traveler - Parking in Company Parking Lot">
    
</figure>

# Disclaimer: 

**All opinions and statements made in this blog post are my own!** 

**I am not affiliated with any entity mentioned in this post unless explicitly stated!**

# Prerequisites
Setup the Dataverse database as described in <a href="/post/powerplatform/powerapps/parkingrequest/parking-request-with-power-platform/">Real World Power Platform Projects - Parking Request Manager - part 1: Setup</a>


# Let's review the project outline!

### Title: Parking Request Manager
### Description: 
Corporate Security departments should be notified when an employee wishes to park their vehicle on company property for an extended period of time.

Any vehicle parked on company property for an extended period of time can be subject to tow. In some cases vehicle license checks, involvement of law enforcement may be deemed necessary. Any financial and legal matters may become the responsibility of the vehicle owner.

The Security department can take reasonable action to protect vehicles parked on company property through Security Officer Patrols, Surveillance Cameras, Electronic and Manned Gates and more if the Security department is made aware of the business travelers’ intentions within a reasonable amount of time, usually within 24hrs of the business trip.


<figure>
    <img src="/images/tut/PowerPlatform/ParkingReqManager/parking-suv-2.png" style="float:right" margin='0px 2px 0px 2px'
         alt="Business Traveler - Parking in Company Parking Lot" width=200 height=200>
    
</figure>

# Scope:
Parking Management System provides a way for the business traveler to notify their local Security Department that they wish to park their vehicle on company property while they are away on a business trip. The app should be available via Mobile, Tablet or Web. The traveler should be able to update their travel return date, e.g., Their business trip is extended!

# Noteworthy
Microsoft Dataverse does not require a premium subscription until you go over 1 million rows or 2 GB of data, whichever comes first!

# App Assets

<figure>
    <img src="/images/tut/PowerPlatform/ParkingReqManager/PrkReq.jpeg" margin='0px 2px 0px 2px'
         alt="Parking Request - App Icon" width=100 height=100>
    
</figure>


# App Requirements
- **License** - All users of the app will need a Premium Power Platform License.
- **Form Factors** - Canvas App
- **Database** - Microsoft Dataverse For Teams
- **SharePoint Document Library** - Vehicle Photos and the Parking Policy
- **Approvals** - First level manager and Security Representative. All must Agree on the Outcome.
- **Intake Form** -
    - Employee Information:
        - Employee Full Name
        - Employee ID - both Employee Name and Employee ID can be surfaced from the current users AAD account via Office365Users connector.
        - Employee Contact Information
        - Emergency Contact Information 

# Create The App!
Open Power Apps in Teams, select the build tab, then select the Team. 
For the example in this post, the team is Enterprise Security.

Select See All. 

You should see something similar to the following screenshot.

<figure>
    <img src="/images/tut/PowerPlatform/ParkingReqManager/Teams-Tables.png" margin='0px 2px 0px 2px'
         alt="Microsoft Teams - Power Apps">
</figure>

From the top nav bar, select the **+New dropdown > Canvas app > Tablet form factor**

But wait a minute I want to make the app available for all form factors!

<figure>
    <img src="/images/tut/PowerPlatform/ParkingReqManager/HelpingPaw.jpeg" margin='0px 2px 0px 2px'
         alt="It's Going To Be Alright! I've Got You!" width=200 height=200>
</figure>

We are going to design the app to work on a variety of devices not just tablets.

Give your app a name, for this example, **Parking Request Manager**

For Start this screen... choose **With Layout**

<figure>
    <img src="/images/tut/PowerPlatform/ParkingReqManager/StartWithLayout.png" margin='0px 2px 0px 2px'
         alt="With Layout-Sidebar">
</figure>

## Change the Settings!

Let's start with enabling **Modern Controls**. 

Modern Controls are now Generally available but we need to enable them. 

In Settings and on the General tab click the toggle button for Modern controls and themes. 

Click the Display tab

Make sure that **Scale to fit** and **Lock aspect ratio** toggle buttons are deselected.

Click Close

In the Modern controls drop down add a Header component to the Header Container. 

**HomeScren** properties.

#### OnVisible - 

``` 
// Reference: Reza Dorrani -https://powerusers.microsoft.com/t5/Building-Power-Apps/How-to-Generate-Dynamic-Year-List/td-p/374443
Clear(colYears);
ForAll(
    ColNum,
    If(
        Val <= (Year(Now()) - 1980),
        Collect(
            colYears,
            {Years: Year(Now()) - Val}
        )
    )
);

// Reset the Attestation Answers
Clear(colAttestationAnswers);
```

### Header component properties:

- **Logo** - Provide an icon. I created one with the Microsoft Image Creator.

- **LogoTooltip** - "Parking Request Manager"

In the App OnStart set the Theme to the following:

```
/*=========================================
GLOBALS
===========================================*/
// THEME - Reference: JSON from https://github.com/pnp/powerapps-designtoolkit

Set(
    apptheme,
    {
        primaryColor: ColorValue("#4599C6"),
        secondaryColor: ColorValue("#6244BB"),
        tertiaryColor: ColorValue("#53565A"),
        disabledColor: ColorValue("#888B8D"),
        backgroundColor: Color.White,
        elementBackgroundColor: RGBA(
            217,
            217,
            214,
            1
        ),
        textColor: RGBA(
            0,
            0,
            0,
            1
        ),
        lightTextColor: RGBA(
            255,
            255,
            255,
            1
        ),
        errorColor: ColorValue("#D22630"),
        font: "Roboto,'Segoe UI'",
        fontSize: 14,
        borderRadius: 5,
        borderColor: Color.Transparent,
        inputFill: RGBA(
            240,
            240,
            240,
            1
        ),
        inputBorderThickness: 0
    }
);
Set(
    apptheme,
    Patch(
        apptheme,
        {
            primaryColorHex: Match(
                JSON(
                    apptheme.primaryColor,
                    JSONFormat.IgnoreUnsupportedTypes
                ),
                "#[a-fA-F0-9]{6}"
            ).FullMatch,
            primaryColorTransparentHex: Match(
                JSON(
                    apptheme.primaryColor,
                    JSONFormat.IgnoreUnsupportedTypes
                ),
                "#[a-fA-F0-9]{6}"
            ).FullMatch & "4d",
            secondaryColorHex: Match(
                JSON(
                    apptheme.secondaryColor,
                    JSONFormat.IgnoreUnsupportedTypes
                ),
                "#[a-fA-F0-9]{6}"
            ).FullMatch & "4d",
            tertiaryColorHex: Match(
                JSON(
                    apptheme.tertiaryColor,
                    JSONFormat.IgnoreUnsupportedTypes
                ),
                "#[a-fA-F0-9]{6}"
            ).FullMatch & "4d"
        }
    )
);
```

- **BasePalleteColor** - apptheme.primarycolor

### SideBar Container

Contains one component a Tab List component.

Tablist Items property:

```
["Home", "History", "Maps", "Travel Advisories","Contacts"]
```

### Main Container!

- **Horizontal container** - The contains the STEP Title and an icon. Name: parkingRequestMenuContainer.

- **Container** - Name: cntrAttestationData - Gallery Control named, glryVehicleAttestation. Each row of the glryVehicleAttestation contains a horizontal container that contains a Title and a Yes/No Radio group.

- **Container** - Name: cntrVehicleLocation contains a single form called frmVehicleLocation

In the Main Container is a Form called frmParkingRequest. DataSource is the ParkingRequest Dataverse table.

Horizontal container contains the Step buttons.

<figure>
    <img src="/images/tut/PowerPlatform/ParkingReqManager/ParkingReqApp.png" margin='0px 2px 0px 2px'
         alt="Parking Request Application - Dev Stage">
</figure>

Now would be a good time to document your app.

For documenting my projects I've now switched to using **Microsoft Loop**! 

<figure>
    <img src="/images/tut/PowerPlatform/ParkingReqManager/LoopSnapshot.png" margin='0px 2px 0px 2px'
         alt="Snapshot - Documenting in Microsoft Loop">
</figure>


Before moving on, in **App-OnStart** let's setup the Default Globals.

```
/********************************************
* Defaults
*********************************************/
Set(
    reqID,
    Blank()
);
Set(
    showRequestForm,
    true
);
Set(
    showAttestations,
    false
);
Set(
    showVehicleLocation,
    false
);
Set(
    reqStage,
    "STEP 1 - Vehicle Information"
);
NewForm(frmParkingRequest);

// Reference: Reza Dorrani -https://powerusers.microsoft.com/t5/Building-Power-Apps/How-to-Generate-Dynamic-Year-List/td-p/374443
ClearCollect(
    ColNum,
    {Val: 0},
    {Val: 1},
    {Val: 2},
    {Val: 3},
    {Val: 4},
    {Val: 5},
    {Val: 6},
    {Val: 7},
    {Val: 8},
    {Val: 9},
    {Val: 10},
    {Val: 11},
    {Val: 12},
    {Val: 13},
    {Val: 14}
);
```

and in **App-Formulas**, setup the default Formulas, in this case one formula

```
/*=========================================
FORMULAS
===========================================*/

CUSER = Office365Users.MyProfileV2();
```

I will probably port some of the defaults in AppStart to Formulas but more on that later.

### STEP Processes!
Basically, I am just hiding and showing a container and its associated elements based on where in the request the user is at.

#### STEP 1 - Vehicle Information

<figure>
    <img src="/images/tut/PowerPlatform/ParkingReqManager/ParkingReqApp.png" margin='0px 2px 0px 2px'
         alt="STEP 1 - Parking Request">
</figure>

Requestor submits all of the required information. Once the requestor submits, the form data is stored in the Parking Request table in Dataverse and the app returns the ID associated with the request and stores this ID in a variable called reqID. btnValidateParkingForm

```
SubmitForm(frmParkingRequest);
Set(reqID, frmParkingRequest.LastSubmit.Name);
```

#### DisplayMode property:

```
If(frmParkingRequest.Valid,DisplayMode.Edit, DisplayMode.Disabled)
```

#### frmParkingRequest properties:

**OnSuccess** - 
```
Set(showRequestForm, false);

Set(reqStage,"STEP 2 - Parking Location");
Set(showVehicleLocation, true);
NewForm(frmVehicleLocation);
```

**Visible** -

```
showRequestForm
```

### STEP 2 - Parking Location

<figure>
    <img src="/images/tut/PowerPlatform/ParkingReqManager/STEP 2.png" margin='0px 2px 0px 2px'
         alt="STEP 2 - Parking Location">
</figure>

#### cntrVehicleLocation properties:

**Visible** - 

```
showVehicleLocation
```

#### frmVehicleLocation properties:

**DataSource** - 

```
ParkingLocations
```

**OnSuccess** - 

```
Set(showAttestations, true);

Set(reqStage,"STEP 3 - Attestations");
Set(showVehicleLocation, false);
```

#### btnValidateParkingLocation properties:

**OnSelect** - 

```
SubmitForm(frmVehicleLocation);
Patch(
    ParkingRequests,
    First(
        Filter(
            ParkingRequests,
            Name = reqID
        )
    ),
    {ParkingLocation: frmVehicleLocation.LastSubmit}
);
```

**Visible** - 

```
showVehicleLocation
```
**DisplayMode** - 
```
If(IsBlank(dcParkingBuilding.Selected.Building),
 DisplayMode.Disabled,
 DisplayMode.Edit
)
```

#### frmVehicleLocation properties:

**OnSuccess** -

```
Set(showAttestations, true);

Set(reqStage,"STEP 3 - Attestations");
Set(showVehicleLocation, false);
```

**DataSource** - 

```
ParkingLocations
```

### STEP 3 - Attestations

<figure>
    <img src="/images/tut/PowerPlatform/ParkingReqManager/STEP 3.png" margin='0px 2px 0px 2px'
         alt="STEP 3 - Attestations">
</figure>

#### glryVehicleAttestation properties:

**Items** -

```
// We only want to show the questions related to Parking Requests - Classification ID = 2
Filter(SecurityQuestions,ClassificationID = "2")
```

#### cntrAttestationData properties:

**Visible** -

```
showAttestations
```

**rdoYesNo** - 

DefaultSelectedItems:
```
If(IsEmpty(colAttestationAnswers),{Value: "No"})
```

Items: 
``` 
["Yes", "No"] 
```

**OnChange:**

```
If(
    Self.Selected.Value = "Yes",
    Collect(
        colAttestationAnswers,
        {cr1f1_questionid: ThisItem.Name, cr1f1_answer: Self.Selected.Value , cr1f1_reqid: reqID}
    ),
    Remove(
        colAttestationAnswers,
        {cr1f1_questionid: ThisItem.Name, cr1f1_answer: Self.Selected.Value , cr1f1_reqid: reqID}
    )
);

```

#### btnFinishParkingReqSubmit properties:

**OnSelect** - 

```
Collect(Attestations,colAttestationAnswers);


Set(showAttestations, false);
Set(showVehicleLocation, false);
Set(showRequestForm,true);
NewForm(frmParkingRequest);

Set(
    reqStage,
    "STEP 1 - Vehicle Information"
);
```

**Visible** - 

```
showAttestations
```

Now the requestor is returned to **STEP 1** when they click the Attestation button labeled Finish.

## Summary!
In this tutorial we setup the basic structure by walking the requestor through the process STEP by STEP.

In this article I covered creating the User Interface in Microsoft Power Apps for Teams.

In the next article we will create a Virtual Assistant to answer traveler questions. 

Stay tuned for **Real World Power Platform Projects - Parking Request Manager - part 3: Create an Approval Workflow!**

Please be sure to check out the following companion video to this post.

### Create a Parking Request App Using Dataverse for Teams & Power Apps! - Ep. 2 - Create The Form
{{<youtube vWxnbmUJqpw>}}

## Credits!

**Images:** 
<a href="https://designer.microsoft.com" target="_blank">Microsoft Designer</a> Stunning designs in a flash!

**App Icons**: <a href="https://www.matthewdevaney.com/2000-free-power-apps-icons/" target="_blank">https://www.matthewdevaney.com/2000-free-power-apps-icons/</a>

**Select Year Dropdown Code**: Reza Dorrani's code: <a href="https://powerusers.microsoft.com/t5/Building-Power-Apps/How-to-Generate-Dynamic-Year-List/td-p/374443" target="_blank">https://powerusers.microsoft.com/t5/Building-Power-Apps/How-to-Generate-Dynamic-Year-List/td-p/374443</a>
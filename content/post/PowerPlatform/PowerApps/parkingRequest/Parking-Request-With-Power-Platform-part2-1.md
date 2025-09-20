+++
author = "Keith Craigo"
title = "Real World Power Platform Projects - Parking Request Manager - part 2: Design The App"
date = "2024-01-20"
draft = true
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
thumbnail = "/images/tut/PowerPlatform/ParkingReqManager/parking-car-4.jpeg"
+++

<figure>
    <img src="/images/tut/PowerPlatform/ParkingReqManager/parking-car-4.jpeg"
         alt="Business Traveler - Parking in Company Parking Lot">
    
</figure>

# Disclaimer: 

**All opinions and statements made in this blog post are my own!** 

**I am not affiliated with any entity mentioned in this post unless explicitly stated!**

# Prerequisites
Setup the Dataverse database as describe in <a href="/post/powerplatform/powerapps/parkingrequest/parking-request-with-power-platform/">Real World Power Platform Projects - Parking Request Manager - part 1: Setup</a>


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

Rename **Screen1** to **Home Screen**

Rename **ScreenContainer1** to **HomeContainer**

Rename **HeaderContainer1** to **HeaderContainer**

Rename **BottomContainer1** to **BottomContainer**

Select **HeaderContainer**

Click Insert, Modern tab, and select the **Header** component.

Your screen should look like the following:

<figure>
    <img src="/images/tut/PowerPlatform/ParkingReqManager/HeaderComponent.png" margin='0px 2px 0px 2px'
         alt="Header Component">
</figure>

Go ahead and click the Play button

Change the form factor using the layout buttons!

<figure>
    <img src="/images/tut/PowerPlatform/ParkingReqManager/PowerAppsFormFactorButtons.png" margin='0px 2px 0px 2px'
         alt="Layout Buttons!" width=200 height=200>
</figure>

By using the Layout template we get Responsive Design right out of the box!

## Themes!

Let's add the beginnings of a custom Theme!

In App OnStart property place the following code.

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
Click the Header component. In the property pane find and click the **Base palette color** property.

Set the property value to `apptheme.primaryColor`

Now all the components we place in our app will use the same theme.

## Add the Data Tables

Click the Data icon in the side panel and select **+ Add data** 
<figure>
    <img src="/images/tut/PowerPlatform/ParkingReqManager/data icon.png" margin='0px 2px 0px 2px'
         alt="Data Icon!" width=20 height=20>
</figure>

Add the following tables:
- Attestations
- Buildings
- Campuses
- Parking Locations
- Parking Requests
- Questions
- Regions
- SecurityQuestionClassifications
- Travelers

<figure>
    <img src="/images/tut/PowerPlatform/ParkingReqManager/DataTables.png" margin='0px 2px 0px 2px'
         alt="Data Tables!">
</figure>

Choose the Header component again and select the Logo property. 
Upload an app Icon.

Select the Sidebar container.

Insert a **tab list** control

Rename the tab list to **tblstMainMenu**

Set **tblstMainNav**'s **Accessibility Label** to **Main Menu**

Set **tblstMainNav**'s **Alignment** to **Vertical**

Set **tblstMainNav**'s **Flexible height** to **On**

Set **tblstMainNav**'s **items** to ["Home", "History", "Maps", "Travel Advisories", "Contacts"]

Set **tblstMainNav**'s **Align in container** to expand the width of the sidebar.

### Save!

**tblstMainNav**'s Settings should now look something similar to 

<figure>
    <img src="/images/tut/PowerPlatform/ParkingReqManager/mainNavSettings.png" margin='0px 2px 0px 2px'
         alt="Main Menu tab list settings!">
</figure>

Select the **MainContainer**

Insert a **Form**

Rename **Form1** to **frmParkingRequest**

Set **frmParkingRequest** property **Data source** to the **ParkingRequests** Dataverse table.

>In the **App OnStart** property, after **Theme** settings, ADD the function **NewForm(frmParkingRequest);** 

Right Click **App** in the side panel and select **Run OnStart** 

Now we need to reformat the **frmParkingRequest**!

Select the frmParkingRequest Name **Name_DataCard1**

In the Property panel, select the **Advanced** tab and select the Lock icon to unlock **Name_DataCard1** 

Unlock all the form fields.

Select the **DataCardValue1** control and change the **Value** property from **Parent.Default** to `CUSER.displayName`

Let's reposition the **frmParkingRequest** fields.

Select **frmParkingRequest** fields property.

Remove the following fields!
- **AttestationID**, this will be auto populated through Power Automate when form is submitted.
- **TravelerID**, this will be auto populated through Power Automate when the form is submitted.
- **ApprovalHistory**, this will be available in the History Panel.
- **Status**, this will be available in the History Panel.
- **Notes**, this field is not shown to the traveler. This is an administration field.
- **VehiclePhotoURL**, this field is not shown to the traveler. This is an administration field.


Change the **Justification** **DataCardValue4** Mode to **Multiline**

Change the **Justification** **Height** to **150**

Change the **Justification** **DataCardValue4** **Height** to **100**

Set the **Justification** **DataCardValue4** **Placeholder** to **Justification**

For all other fields, deselect the **Width fit** toggle button.

Change DataCardKey5 Text property from `Parent.DisplayName` to **"License Plate Number"**

Change DataCardKey9 Text property from `Parent.DisplayName` to **"Vehicle Color"**

Change DataCardKey10 Text property from `Parent.DisplayName` to **"Vehicle Make"**

Change DataCardKey11 Text property from `Parent.DisplayName` to **"Vehicle Model"**


Select the Year field and change the width to **150**

I think we can provide a better experience, select Year_DataCard1 and insert a **Modern Dropdown Control** and rename it **ddYear**

Set **Year_DataCard1** Width to `VehicleModel_DataCard1.Width`


Delete **DataCardValue13** and correct the errors, just remove the formulas that reference **DataCardValue13**

Set **ddYear** X property to 24

Set **ddYear** Y property to `Parent.Height - Self.Height`

Set **ddYear** Width to **100**

## Creating the Year drop down items!
In my first attempt I chose to import an **Excel Data Source**.

I usually use Excel for configuration settings. But I don't use Excel as a database.

Download a fresh copy of https://github.com/kcraigo/RealWorldPowerPlatformProjects/blob/4b2a162ec8745aa20c94f51ce6ac731615c5d2b4/Parking-Request-Manager-DB-Schema-v2.xlsx

I've added a years sheet in this Excel file to use in this example.

Select the database icon, type in the search, Excel and select **Import from Excel** option and select your data.

>Please NOTE: The Excel data must be formatted as a table before you can import.

Click **Connect**

Set **ddYear** Items(Items) property to the **Years** table.

Click the Fields link and add the **Year** field

**Ultimately** I chose to use a technique provided by Reza Dorrani at https://powerusers.microsoft.com/t5/Building-Power-Apps/How-to-Generate-Dynamic-Year-List/td-p/374443

App.OnStart
```

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

Home.OnVisible

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
```
Set **Year_DataCard1** Update to `ddYear.Selected.Years`

Set d**dYear.Items** to `colYears` and set the **FieldName** to `Years`

Which outputs:

<figure>
    <img src="/images/tut/PowerPlatform/ParkingReqManager/YearsDDItems.png" margin='0px 2px 0px 2px'
         alt="Generated Years - Drop Down Control!">
</figure>



### SAVE and Play!

The screen should now look similar to the folowing.

<figure>
    <img src="/images/tut/PowerPlatform/ParkingReqManager/RequestForm.png" margin='0px 2px 0px 2px'
         alt="Parking Request Form!">
</figure>


When your done running the app, go back to edit mode.

Set all the DataCards **Required** property to **true** under the Advanced tab, you will now see a * next to the field name.

## Let's add the form's STEPS!

Select the MainContainer from the side panel.

Insert a **Horizontal container**, **Insert->Classic->Layout**

Reorder this new container to be at the very top of the Main Container.

Deselect the **Flexible height** property of this new container.

Rename this new container to **parkingRequestMenuContainer**

Change **parkingRequestMenuContainer** Height property to 50

Insert a Text control in the **parkingRequestMenuContainer** and set it's Text property to `"STEP 2 - Vehicle Attestation"`

Rename the Text control to **txtNextSteps**

Set the Align (vertical) property of the **parkingRequestMenuContainer** to **Center**

We want to change the **txtNextSteps** text based on the stage the request is in.

In App OnStart, create a variable called **showRequestForm** in between reqID and NewForm function

Let's be proactive and also create the variables for **showAttestations** and **showParkingLocations**

```
/********************************************
* STAGES
*********************************************/
Set(reqID,Blank());
Set(showRequestForm, true);
Set(showAttestations, false);
Set(showVehicleLocation, false);
Set(reqStage, "STAGE 1 - Vehicle Information");

NewForm(frmParkingRequest);
```

Next, set the default text property of **txtNextSteps** to **reqStage**

```
If(reqID, true, false)

```

As an extra bonus, try adding an icon before the **txtNextSteps** control.
- Add an Image control, set the Width and Height to 20
- Set Image to one of the out of the box icons or use one of my favorite resources, <a href="https://www.matthewdevaney.com/2000-free-power-apps-icons/" target="_blank">https://www.matthewdevaney.com/2000-free-power-apps-icons/</a> by Matthew Devaney.

Icon Example!

<figure>
    <img src="/images/tut/PowerPlatform/ParkingReqManager/iconExample.png" margin='0px 2px 0px 2px'
         alt="Image control - add icon example!">
</figure>

### SAVE and Play!

Fill out the form, provide all of the required data and **txtNextSteps** should be Visible

Wait, Why didn't that work? Remember Power Apps is Event driven!

We need to add a button to trigger the form validation.

Go back to edit mode and select the **MainContainer** and Insert a Horizontal container at the bottom of the **MainContainer** 

Rename this new container **cntrFormButtons**
 - Deselect **Flexible height**
 - Set it's **Height** to 50
 - Set Width =  `Parent.Width`
 - Align (vertial) Center
 - Justify (horizontal) Center
 - Drop shadow - **Semilight**

Insert a Button into  **cntrFormButtons**

Rename the Button to **btnValidateParkingForm**

Set **btnValidateParkingForm** Text property to **NEXT**

Set **btnValidateParkingForm** OnSelect property to 

```
Set(reqID, SubmitForm(frmParkingRequest))
```

### SAVE and Play!
If we submit now we will be given an error message

<figure>
    <img src="/images/tut/PowerPlatform/ParkingReqManager/FormValidation.png" margin='0px 2px 0px 2px'
         alt="Form is not valid!">
</figure>

>Let's set the Form field Year to record the value selected in the **ddYear** control!

Go back to Edit mode.

Select the **Year_DataCard1** and set it's **Update** property to **ddYear.Selected.Year**

### SAVE and Play!

Fill out the form and click **NEXT**

Now **txtNextSteps** will be Visible

## Next we need to progress the request to the next stage, the Attestation Stage!

If the reqID is returned, we need to hide the **Request Form** and show the **Attestation Form**. 

Set the **frmParkingRequest** visible property to **showRequestForm**

Modify the **btnValidateParkingForm** OnSelect property.

```
Set(ReqID, SubmitForm(frmParkingRequest));
Set(showRequestForm, false);
Set(showAttestations, false);
Set(showVehicleLocation, true);
Set(reqStage,"STAGE 2 - Vehicle Location");

```

Set the Visible property of the **btnValidateParkingForm** to **showRequestForm**

Select the **cntrFormButtons** and add a Modern **Button**

Rename this Button to **btnSubmit**

Set the Text property of **btnSubmit** to **SUBMIT**

Set the Visible property of **btnSubmit** to `!showRequestForm`

Select the **MainContainer** and Insert a **Container**

Rename the **Container** to **cntrAttestationData**

Set the Visible property of **cntrAttestationData** to `!showRequestForm`

Reorder the **cntrAttestationData** to be just below the **parkingRequestMenuContainer**

Select **cntrAttestationData** and Insert a **Vertical Gallery** control.

Select the **securityQuestions** table as the Gallery controls Data source.

Rename the Gallery control to `glryVehicleAttestation`

Set the `glryVehicleAttestation` Width property to `Parent.Width` and both it's **X** & **Y** to 0

We only want to show the **Question field** in the `glryVehicleAttestation` control.

We need to filter out the questions that are not related to Parking Requests.

Change the `glryVehicleAttestation` **Items** property to `Filter(SecurityQuestions,ClassificationID = "2")` 

Let's provide a way for the traveler to answer the questions.

Select the `glryVehicleAttestation` control, click the pencil in a circle icon.

Insert a **Horizontal Container** control and rename it **cntrQuestion**

Set the X & Y of **cntrQuestion** to 0, its Width to `Parent.Width` and its Height to `Parent.Height`

Set `glryVehicleAttestation` **TemplateSize** property to 50

Set `glryVehicleAttestation` **TemplatePadding** property to 5

Make sure the **cntrQuestion** is selected.

Insert a Modern **Toggle** control and name it **tglYesNo**

Replace the default  **tglYesNo** Label text "Label" with

```
If(Self.Checked, "YES","NO")

```

You should now have something similar to this,

{{<youtube uidLi6_c0LQ>}}

Time to connect the **Parking Request** and the **Attestation**, we will use **Patch**

### SAVE and Play!

When satisfied, go back to Edit mode.


## Summary
In this article I covered creating the User Interface in Microsoft Power Apps for Teams.

In the next article we will create a Virtual Assistant to answer traveler questions. 

Stay tuned for **Real World Power Platform Projects - Parking Request Manager - part 3: Create A Virtual Assistant!**

Please be sure to check out the following companion video to this post.

### Create a Parking Request App Using Dataverse for Teams & Power Apps! - Ep. 1 - Setup 
[![Power App Design Series - p4 - Create a Parking Request App - Setup](https://youtu.be/vWxnbmUJqpw?si=vUWR-Kvhaah_VGd_)

## Credits!

**Images:** Microsoft Image Creator

**App Icons**: <a href="https://www.matthewdevaney.com/2000-free-power-apps-icons/" target="_blank">https://www.matthewdevaney.com/2000-free-power-apps-icons/</a>

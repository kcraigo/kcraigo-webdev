+++
author = "Keith Craigo"
title = "Power Apps - Think Outside the Checkbox"
date = "2022-07-29"
draft = false
featured = true
toc = false
codeLineNumbers = true
codeMaxLines = 10
description = "Power Apps - Checkboxes and Alternatives!"
tags = [
    "Controls",
    "Check Boxes",
    "Power Platform",
    "Power Apps"
]
categories = [
    "checkboxes","power platform","power apps",
]
series = ["Power Platform"]
thumbnail = "images/tut/PowerPlatform/ShoppingCartSelectedItems.png"
+++

Technologies:

1. Power Apps
2. Check Boxes
3. Alternatives to Check Boxes

## Power Apps Checkboxes!

{{<youtube HdMBcX7IlIc>}}

We use checkboxes almost everywhere from To-Do lists, on websites where we have to agree to the use of cookies, agree that we have read an understood a privacy policy, agree to terms and conditions, add items to a shopping cart and more.

<figure>
    <img src="/images/tut/PowerPlatform/IAgreeCheckbox.png"
         alt="I Agree">
    
</figure>

**See!** Checkboxes are everywhere. 

## 1st Use Case!

Add items to a Shopping Cart!

In this case all we would need to do would be to add or remove from a Collection.

<figure>
    <img src="/images/tut/PowerPlatform/ShoppingCartSelectedItems.png"
         alt="Checkbox Example - Add Items to a Collection">
</figure>

I set the following,
- In the Screen **OnVisible** Property create a Collection, I named mine, 
``` 
colSelectedImpulseItems
``` 

Other Properties!

- **OnCheck:** 
``` 
Collect(colSelectedImpulseItems, {Title: ThisItem.Title})
``` 

- **OnUncheck:** 
``` 
Remove(colSelectedImpulseItems,First( Filter(colSelectedImpulseItems, Title=ThisItem.Title)))
``` 

> Since a collection is a set of records, we need to use the **First(Filter))** function to find the record we need to take action on.

## 2nd Use Case!
Use check boxes as Radio Buttons

<figure>
    <img src="/images/tut/PowerPlatform/CheckboxRadioBtns.png"
         alt="Checkbox Example - Radio Buttons">
</figure>

### Top Scenario!

Screen OnVisible Property I created a variable named **StateStatus**
``` 
Set(StateStatus, "Pending");
``` 

**Approved Checkbox Properties:**

**Default:** 
``` 
If(lblStatusResult.Text = "Approved", true, false)
``` 

**OnCheck:** 
``` 
Set(StateStatus,"Approved")
``` 

**OnUncheck:** Set(StateStatus,"Pending")

**Rejected Checkbox Properties:**

**Default:** 
``` 
If(lblStatusResult.Text = "Rejected", true, false)
``` 

**OnCheck:** 
``` 
Set(StateStatus,"Rejected")
``` 

**OnUncheck:** 
```
Set(StateStatus,"Pending")
``` 

### Bottom Scenario!

**Approved Checkbox Default Property:** 
``` 
If(ThisItem.Title = "Approved", true, false)
``` 

**Rejected Checkbox Default Property:** 
``` 
If(ThisItem.Title = "Rejected", true, false)
``` 

In this scenario, if one checkbox is checked, the other will be unchecked!

# Alternatives to Checkboxes!

## Buttons!

<figure>
    <img src="/images/tut/PowerPlatform/Buttons.png"
         alt="Checkbox Alternative Example - Buttons">
</figure>

Screen OnVisible Property create a collection, 
``` 
ClearCollect(colSelectedItems);
``` 

**Add Button OnSelect Property:** 
``` 
Collect(colSelectedItems, {Title: ThisItem.Title}
``` 

**Delete Button OnSelect Property:** 
``` 
Remove(colSelectedItems, {Title: ThisItem.Title})
``` 

## Icons or Images!

<figure>
    <img src="/images/tut/PowerPlatform/ImagesIcons.png"
         alt="Checkbox Alternative Example - Image / Icons">
</figure>

Screen OnVisible Property create a clear and create a collection: 
``` 
ClearCollect(colSelectedItems);
``` 

**Add icon's OnSelect Property:** 
``` 
Collect(colSelectedItems, {Title: ThisItem.Title}
``` 

**Delete icon's OnSelect Property:** 
``` 
Remove(colSelectedItems, {Title: ThisItem.Title})
``` 

## Radio Buttons!

<figure>
    <img src="/images/tut/PowerPlatform/RadioButtons.png"
         alt="Checkbox Alternative Example - Radio Buttons">
</figure>

**Screen OnVisible Property clear a collection:** 
``` 
ClearCollect(colSelectedItems);
``` 

**Default:** ""

**OnSelect:**

``` 
If
    rdoToggleShoppingCart.Selected.Value = "ADD",
    Collect(
        colSelectedItems,
        {Title: ThisItem.Title}
    ),
    Remove(
        colSelectedItems,
        {Title: ThisItem.Title}
    )
)
``` 

## Toggle Buttons!

<figure>
    <img src="/images/tut/PowerPlatform/ToggleButtons.png"
         alt="Checkbox Alternative Example - Toggle Buttons">
</figure>

**Screen OnVisible Property create a collection:** 
``` 
ClearCollect(colSelectedItems);
``` 

**Default:** 
``` 
false
``` 

**TrueText:** 
``` 
"Remove"
``` 

**FalseText:** 
``` 
"Add"
``` 

**OnCheck:** 
``` 
Collect(colSelectedItems, {Title: ThisItem.Title})
``` 

**OnUncheck:** 
``` 
Remove(colSelectedItems, {Title: ThisItem.Title})
``` 


## Change the DisplayMode!

<figure>
    <img src="/images/tut/PowerPlatform/IconsDisableEnable.png"
         alt="Checkbox Alternative Example - Icons - Disable / Enable">
</figure>

**Screen OnVisible Property create a collection:** 
```
ClearCollect(colSelectedItems);
```

**ThumbsUp Icon DisplayMode:**
```

If
    ThisItem.Title = "Approved",
    DisplayMode.Disabled,
    Edit
)(
```

**ThumbsDown Icon DisplayMode:** 
```
If
    ThisItem.Title = "Rejected",
    DisplayMode.Disabled,
    Edit
)(
Status Text Color:
If(ThisItem.Title = "Approved",ColorValue("#00E676"),ThisItem.Title = "Rejected",ColorValue("#FF3D00"),ColorValue("#E3F2FD"))

```

## Change Icon Visibility!

<figure>
    <img src="/images/tut/PowerPlatform/IconsChangeVisibility.png"
         alt="Checkbox Alternative Example - Icons - Change Visibility">
</figure>

**Screen OnVisible** Property create a collection 
```
ClearCollect(colSelectedItems);
```

**ThumbsUp Icon Visibility:**

```
If(
    ThisItem.Title = "Rejected",
    true,ThisItem.Title = "Pending",true
)
```

**ThumbsDown Icon Visibility:** 
```
If(
    ThisItem.Title = "Approved",
    true,ThisItem.Title = "Pending",true
)
```

If the line item has been Approved, we hide the Rejected Icon and slightly fade the Approved icon.

If the line item has been Rejected, we hide the Approved Icon and slightly fade the Rejected icon.

If no action has been taken on the line item, we show both the Approved and Rejected icons.

**Status Text Color:** 
```
If(ThisItem.Title = "Approved",ColorValue("#00E676"),ThisItem.Title = "Rejected",ColorValue("#FF3D00"),ColorValue("#E3F2FD"))
```

Just some of my thoughts on this!
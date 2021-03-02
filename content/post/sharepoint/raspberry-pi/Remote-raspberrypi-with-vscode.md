+++
author = "Keith Craigo"
title = "Use SSH to Remote into a Raspberry Pi from VSCode"
date = "2021-03-02"
draft = false
featured = true
description = "Setup VSCode to remote into your Raspberry Pi with ssh"
tags = [
    "Raspberry Pi",
    "featured"
]
categories = [
    "raspberry Pi",
]
series = ["Raspberry Pi"]
thumbnail = "images/tut/raspberry-elvis.JPG"
+++

# Copy Raspberry Pi Settings
If you don't have ssh setup you may need to provide the password you provided when you initially set up your Pi.

Login to your Pi and select Raspberry Pi Configuration under Preferences
* Take note of your Raspberry Pi Hostname 

Locate your IP Address - In the terminal window of your Pi, type **ifconfig** then look for something like wlan0 then inet and the IP Address following inet is your network IP Address. ex: wlan0: flags=4163,,,,,,inet 192.168.2.1

Copy 192.168.2.1 and paste it into notepad, textpad, save it somewhere you can find it easily along with the Pi Hostname. We will need these shortly!

# Setup our main computer and the ssh keys file on our Pi

1. On your main computers cmd line, generate a public ssh key

    A. MAC - **ssh-keygen**

    B. Windows - **ssh-keygen.exe**

2.  Except the defaults - make note of where your keys are saved.

3. Copy the ssh public key

4. On the cmd line ssh into our Raspberry Pi - ssh pi@[YOUR PI IP ADDRESS]- ex. ssh pi@192.168.2.1

5. cd into the .ssh dir and create a file called **authorized_keys**
If the .ssh dir does not exist create one with mkdir .ssh

6. Paste the public key into authorized_keys

7. Logout of the ssh session 

8. ssh into your Pi once more, this time you should not have to enter your password due to the public key is now in place.

# Setup VSCode

1. Open VSCode

2. Open the Extensions Blade

3. Search for Remote SSH

4. Install Remote - SSH from Microsoft ms-vscode-remote.remote-ssh. At the time of this post the version number is v0.64.0 with close to 3 million downloads.

5. Also install Remote - SSH: Editing Configuration Files ms-vscode-remote.remote-ssh-edit At the time of this post the version number is v0.64.0 with close to 3 million downloads.

6. After the extensions finish installing, restart VSCode

7. You should now see a new **Remote Explorer** icon in the left nav panel.

!["New Remote Blade"](/images/tut/remote-blade.png "New Remote Blade")

8. Open the VSCode Command Palette - MAC: shift+command+p , Windows: shift+ctrl+p

9. Start typing Remote-SSH, then select Open Configuration File... 

10. Select the configuration you created in the .ssh directory and make sure the settings match your Raspberry Pi configuration

# Read more about SSH config files: https://linux.die.net/man/5/ssh_config

    Host pi-0

    HostName 192.168.2.1

    User pi

11. Click the new Remote Explorer icon in the left nav.

12. If you select the Window icon to the right of your Pi, this will open a new VSCode window and ssh into your Pi, and setup the VSCode server. More options are available if you right click the name of your Pi.

We are now remotely connected through ssh to our Raspberry Pi.

We can now create and save files from VSCode on our main computer to our Pi. 

We can even develop apps to run on our Pi from VSCode but that is for another post.
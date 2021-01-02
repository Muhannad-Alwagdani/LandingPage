# Landing Page Project
## Table of Contents

* [About](#About)
* [Project Description](#Project-Description)
* [User Expereince](#User-Expereince)

<br/>
<br/>
<br/>

## About
### Author : Muhannad Alwagdani 
### Tools used : Visual Studio Code
### Technologies used : HTML5, CSS3 and JavaScript

<br/>
<br/>

## Project Description

the purpose of this project is to practice DOM manuplation, as well as practicing Events to make interactive webpage such as this page [landing page](./index.html).

In this project, 7 sections were created in the html page. based on the sections in the html, nav list items will be created dynamically in the [app](./js/app.js) file. each points towards its corresponding section. Upon clicking on a list item in the nav, the window will scroll to that section.Whenever the user scroll down or up, the active section will be changed based on which section is in the viewport.

I used the querySelectorAll to select all sections and stored them into a variable to access them individually if needed.

I managed to come up with a mathmatical solution to predict which is the active section based on the sectoin height and the window scroll on virtical access. this helped me to improve the performance.

<br/>
<br/>

## User Expereince
i've listed all posible UX for this project page, which are the following:
* The user will click on the navlinks to go to the desired section
* The nav bar will be hidden if the user did not scroll for over 5 seconds
* The nav bar will be expanded when the user click on the nav it self (not the buttons inside it)
* Upon scrolling or clicking a navbar link, the targeted section as well as the link will be triggered as active
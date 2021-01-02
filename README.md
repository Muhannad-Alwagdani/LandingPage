# Landing Page Project

## Table of Contents

* [Informations](#informations)

## Informations

the purpose of this project is to practice DOM manuplation, as well as practicing Events to make interactive webpage such as this page [landing page](./index.html).

In this project, 7 sections were created in the html page. based on the sections in the html, nav list items will be created dynamically in the [app](./js/app.js) file. each points towards its corresponding section. Upon clicking on a list item in the nav, the window will scroll to that section.Whenever the user scroll down or up, the active section will be changed based on which section is in the viewport.

I used the querySelectorAll to select all sections and stored them into a variable to access them individually if needed.

I managed to come up with a mathmatical solution to predict which is the active section based on the sectoin height and the window scroll on virtical access. this helped me to improve the performance.

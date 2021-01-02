/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const NAVBAR_MENU = document.querySelector('.navbar__menu');// get the navbar menu reference
const SECTIONS = document.querySelectorAll('section'); //get all SECTIONS in the HTML
const NAVBAR_LIST = document.querySelector('#navbar__list'); //get the target navbar list
const DISTANCE_FROM_TOP = 10; //<= this variable is the distance between a section and the top of the window, this variable is here to have more control on when to have an active state
let generatedListItem = [];
let activeSectionIndex = 0; // <= the fisrt SECTIONS is set to active by default
let sectionHeight = SECTIONS[0].getBoundingClientRect().height; //<= Assuming all SECTIONS have the same height, then i am going to use this for mathmatical calculations
let navTimeout;
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function findActiveSection(oldIndex) {

    //Here im predicting the index of the active section by dividing the common section height from the value scrollY of the window, then floor the result to get an index
    let newActiveIndex = Math.floor(window.scrollY / sectionHeight);
    if (newActiveIndex >= SECTIONS.length)// <=here im trying to avoid index out of bound error
        return SECTIONS.length - 1;
    if (SECTIONS[newActiveIndex].getBoundingClientRect().y <= DISTANCE_FROM_TOP)// <= after avoid the error, we check if the section is near top of the screen by a distance of 100px
        return newActiveIndex;
    return oldIndex;// <= if both of the above conditions did not pass, then we return the old index (no update)

}
function updateNavBarScroll() {

    const NAVBAR_LIST_ITEM_SAMPLE = document.querySelector('li');
    const SAMPLE_BOUNDING_BOX = NAVBAR_LIST_ITEM_SAMPLE.getBoundingClientRect();
    const SAMPLE_HEIGHT = SAMPLE_BOUNDING_BOX.height;
    const SAMPLE_WIDTH = SAMPLE_BOUNDING_BOX.width;
    //check how many li elements visible in the navbar
    const VISIBLE_ITEMS = Math.floor(NAVBAR_MENU.getBoundingClientRect().width / SAMPLE_WIDTH);
    const ACTIVE_SECTION_INDEX = activeSectionIndex;
    console.log(SAMPLE_WIDTH)
    console.log(ACTIVE_SECTION_INDEX, VISIBLE_ITEMS)
    console.log(Math.floor(ACTIVE_SECTION_INDEX / VISIBLE_ITEMS))
    const SCROLL_AMOUNT = (Math.floor(ACTIVE_SECTION_INDEX / (VISIBLE_ITEMS - 1)) * (SAMPLE_HEIGHT + 3.2)); // this 3.2 is refereing to the border width for both top and bottom 1.6 each
    NAVBAR_MENU.scroll(0, SCROLL_AMOUNT);


}

function displayNav() {

    clearTimeout(navTimeout)
    NAVBAR_MENU.classList.remove('hidden')
    navTimeout = setTimeout(() => {
        NAVBAR_MENU.classList.add('hidden')
        NAVBAR_MENU.classList.remove('navbar__menu_clicked')
    }, 5000)

}
function mouseOverNav() {
    displayNav()
}
function updateValuesOnScroll() {

    setActiveSection()
    displayNav()

}
function updateValuesOnResize() {

    sectionHeight = SECTIONS[0].getBoundingClientRect().height
    updateNavBarScroll();
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildTheNav() {// <= in here im just building the navList by iterating over each section and create its corresponding li element under the ul element

    const navFragmet = document.createDocumentFragment();// <= creating fragment for a bit of performance measures 

    SECTIONS.forEach((section, index) => {

        const newNavListItem = document.createElement('li');

        newNavListItem.classList.add('menu__link')
        newNavListItem.innerText = section.dataset.nav;
        if (index == 0) {
            newNavListItem.classList.add('active__link')
        }

        navFragmet.appendChild(newNavListItem); // <= appending the new li element to the fragment
        generatedListItem.push(newNavListItem);

    });

    NAVBAR_LIST.appendChild(navFragmet);// <= after the foreach loop i appended the fragment to the NAVBAR_LIST
}



// Add class 'active' to section when near top of viewport

function setActiveSection() {// <= in here im just removing the active class from the old active section and adding it to the new active section using toggle
    updateNavBarScroll()
    SECTIONS[activeSectionIndex].classList.toggle('your-active-class');
    generatedListItem[activeSectionIndex].classList.toggle('active__link')
    activeSectionIndex = findActiveSection(activeSectionIndex);
    SECTIONS[activeSectionIndex].classList.toggle('your-active-class');
    generatedListItem[activeSectionIndex].classList.toggle('active__link')

}

// Scroll to anchor ID using scrollTO event
function scrollToSection(e) {//in here i want to do a bit of explaining
    /**
     * after reading the given comment that tells me to use scrollTo event, i was confused by the fact that i used <a> tag in the html with href='#sectionid'
     * and it was working fine, however after consulting myself i thought that the purpose of this project is to use events and DOM manuplation. thus i removed the anchor 
     * element and replaced it with scrollTo window.scrollTo()
     */
    let target = e.target;
    if (target.nodeName == 'LI') {

        let targetSection = SECTIONS[target.innerText.split(' ')[1] - 1];// <= here im just using the section number as an ID, this will not work if the section name changed
        let y = targetSection.getBoundingClientRect().y;
        window.scrollTo({
            left: 0,
            top: window.scrollY + y,
            behavior: 'smooth'
        });
    } else {
        //Expand Navbar on click event
        NAVBAR_MENU.classList.toggle('navbar__menu_clicked')
    }
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildTheNav();

// Scroll to section on link click
NAVBAR_LIST.addEventListener('click', (e) => scrollToSection(e));
NAVBAR_MENU.addEventListener('mousemove', mouseOverNav)


// Set SECTIONS as active
window.addEventListener('scroll', updateValuesOnScroll);//Listen for scrolls and update active section

//this event listener is for updating the height of the section, to prevent array out of bound error
window.addEventListener('resize', () => updateValuesOnResize());






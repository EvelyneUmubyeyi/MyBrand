let popup = document.getElementById("popup_container")
let skillCategories = document.getElementsByClassName("skill_category")
let closePopup = document.getElementById("close_popup") 
 
function openSkillsPopup(){
    popup.style.visibility = "visible";
}

function closePopupFn(){
    popup.style.visibility = "hidden";
}

closePopup.addEventListener('click',closePopupFn)

for (let i = 0; i < skillCategories.length; i++) {
    skillCategories[i].addEventListener('click', openSkillsPopup);
}

// cards slider
document.getElementById('next').onclick = function(){
    console.log("Clicked")
    const widthItem = document.getElementById('skill_category_card').offsetWidth+32;
    console.log(widthItem);
    document.getElementById('skills_cards_container').scrollLeft += widthItem;
}
document.getElementById('prev').onclick = function(){
    console.log("Clicked")
    const widthItem = document.getElementById('skill_category_card').offsetWidth+32;
    document.getElementById('skills_cards_container').scrollLeft -= widthItem;
}

document.getElementById('next_work').onclick = function(){
    console.log("Clicked")
    const widthItem = document.getElementById('work_category_card').offsetWidth+32;
    document.getElementById('work_cards_container').scrollLeft += widthItem;
}
document.getElementById('prev_work').onclick = function(){
    console.log("Clicked")
    const widthItem = document.getElementById('work_category_card').offsetWidth+32;
    document.getElementById('work_cards_container').scrollLeft -= widthItem;
}
  
let res_nav = document.getElementById("responsive_nav");
let hum = document.getElementById("fa-bars");

function toggleNavBar(){
    if(window.getComputedStyle(res_nav).visibility==="hidden"){
        res_nav.style.visibility = 'visible'
        document.body.classList.add('stop-scrolling')
    }else if(window.getComputedStyle(res_nav).visibility==="visible"){
        res_nav.style.visibility = 'hidden'
        document.body.classList.remove('stop-scrolling')
    }
}

hum.addEventListener('click', toggleNavBar)

let about_li = document.getElementById('about_me_li')
let about = document.getElementById('about_me')

// about_li.addEventListener('click',()=>{
//     about.scrollIntoView({
//         inline: 'nearest',
//       });
// })

let resNavMenuItem = document.getElementsByClassName("res_menu_item")
for (let i = 0; i < resNavMenuItem.length; i++) {
    resNavMenuItem[i].addEventListener('click', toggleNavBar);
}

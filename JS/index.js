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

hum.addEventListener('click',()=>{

    console.log('clicked')

    if(window.getComputedStyle(res_nav).visibility==="hidden"){
        res_nav.style.visibility = 'visible'
        document.body.classList.add('stop-scrolling')
    }else if(window.getComputedStyle(res_nav).visibility==="visible"){
        res_nav.style.visibility = 'hidden'
        document.body.classList.remove('stop-scrolling')
    }
})


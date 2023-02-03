let popup = document.getElementById("popup_container")
let skillCategories = document.getElementsByClassName("skill_category")
let closePopup = document.getElementById("close_popup") 
 
function openSkillsPopup(){
    // popup.classList.add("show_popup");
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
  

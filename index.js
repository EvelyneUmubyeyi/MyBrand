let popup = document.getElementById("skills_popup")
let skillCategories = document.getElementsByClassName("skill_category")
let closePopup = document.getElementById("close_popup") 
 
function openSkillsPopup(){
    console.log("Clicked")
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


let popup = document.getElementById("skills_popup")
let skillCategories = document.getElementsByClassName("skill_category")

function openSkillsPopup(){
    console.log("Clicked")
    // popup.classList.add("show_popup");
    popup.style.visibility = "visible";
}

for (let i = 0; i < skillCategories.length; i++) {
    skillCategories[i].addEventListener('click', openSkillsPopup);
}
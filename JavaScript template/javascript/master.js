// Setting Box
// Check if there's Local Storage Color Option
let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
    // Add Color To Local Storage
    document.documentElement.style.setProperty("--main-color", localStorage.getItem("color_option"));
    // Remove Active Class From All Color List Items
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");

        // Add Active Class To Element With data-color === Local Storage Item
        if (element.dataset.color === mainColors) {
            element.classList.add("active");
        }
    });
    
}

// Random Background Option
let BGOption = true;

// Control The Background Interval
let BGInterval;

// Check If There's Random background Item In Local Storage
let BGLocalItem = localStorage.getItem("background_option");

if (BGLocalItem !== null) {
    if (BGLocalItem === "true") {
        BGOption = true;
    }
    else {
        BGOption = false;
    }

}

// Remove Active Class From All Spans
document.querySelectorAll(".random-backgrounds span").forEach(element => {
    element.classList.remove("active");
});

// Add Active Class To Selected Span
if (BGLocalItem === "true") {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
}
else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
}

// Toggle Spin Class On Icon
document.querySelector(".toggle-settings .fa-gear").onclick = function() {
    // Rotation
    this.classList.toggle("fa-spin");
    // Show The Settings Box
    document.querySelector(".setting-box").classList.toggle("open");
    
};

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

// Loop On List Items
colorsLi.forEach(li => {
    // Click On List Items
    li.addEventListener("click", (e) => {
        // Set Color On Root
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        
        // Set Color On Local Storage
        localStorage.setItem("color_option", e.target.dataset.color);

        handleActive(e);
    });
});

// Switch Random Background Option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

// Loop On All Spans
randomBackEl.forEach(span => {
    // Click On Each Span
    span.addEventListener("click", (e) => {
        
        handleActive(e);

        if (e.target.dataset.background === "yes") {
            BGOption = true;
            randomizeImgs();
            localStorage.setItem("background_option", true);
        }
        else {
            BGOption = false;
            clearInterval(BGInterval);
            localStorage.setItem("background_option", false);
        }
    });
});

// Bullets Option Box
let bulletSpan = document.querySelectorAll(".bullets-option span");
let bulletContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
    bulletSpan.forEach(span => {
        span.classList.remove("active");
    });
    if (bulletLocalItem === "block") {
        bulletContainer.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active");
    }
    else {
        bulletContainer.style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display === "show") {
            bulletContainer.style.display = "block";
            localStorage.setItem("bullets_option", "block");
        }
        else {
            bulletContainer.style.display = "none";
            localStorage.setItem("bullets_option", "none");
        }
        handleActive(e);
    });
});

// Reset Button
document.querySelector(".reset-options").onclick = function() {
    // Reset Options
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets_option");
    // Reload Window
    window.location.reload();
}

// Landing Page
// Select Landing Page Elements
let landingPage = document.querySelector(".landing-page");

// Get Array Of Images
let imgArray =["background1.jpg", "background2.jpg", "background3.jpg", "background4.jpg",
"background5.jpg"
];

// Randomize Images
function randomizeImgs() {
    if (BGOption === true) {
        // Change Background
        BGInterval = setInterval(() => {
            // Get Random Index
            let randomIndex = Math.floor(Math.random() * imgArray.length);

            // Change Imag URL
            landingPage.style.backgroundImage = 'url("../images/' + imgArray[randomIndex] +' ")';
        }, 5000);
    }
}

randomizeImgs();

// Our Skills
// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function() {
    // Skills Offset Top
    let skillsOffsetTop = ourSkills.offsetTop;
    // Skills Outer Height 
    let skillsOuterHeight = ourSkills.offsetHeight;
    // Window Height
    let windowHeight = this.innerHeight;
    // Window Scroll Top
    let windowScrollTop = this.pageYOffset;
    if (windowScrollTop > (skillsOffsetTop - skillsOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
}

// Create Popup With Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {
    img.addEventListener("click", (e) => {
        // Create Overlay Element
        let overlay = document.createElement("div");
        // Add Class To Overlay
        overlay.className = "popup-overlay";
        // Add Overlay To Body
        document.body.appendChild(overlay);

        // Create Popup
        let popupBox = document.createElement("div");
        // Add Class To Popup
        popupBox.className = "popup-box";

        if (img.alt !== null) {
            // Create Heading
            let imgHeading = document.createElement("h3");
            // Create Text
            let imgText = document.createTextNode(img.alt);
            // Add Text To Heading
            imgHeading.appendChild(imgText);
            // Add Heading To Popup Box
            popupBox.appendChild(imgHeading);
        }

        // Create Image
        let popupImg = document.createElement("img");
        popupImg.src = img.src;
        // Add Image To Popup Box
        popupBox.appendChild(popupImg);
        // Add Popup Box To Body
        document.body.appendChild(popupBox);
        
        // Create Close Button
        let closeBtn = document.createElement("span");
        closeBtn.className = "close-button";
        let buttonText = document.createTextNode("X");
        closeBtn.appendChild(buttonText);
        popupBox.appendChild(closeBtn);
    });
});

// Close Popup
document.addEventListener("click", function (e) {
    if (e.target.className === "close-button") {
        // Close Current Popup
        e.target.parentNode.remove();
        // Remove Overlay
        document.querySelector(".popup-overlay").remove();
    }
});

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All Links
const allLinks = document.querySelectorAll(".links a");

// Scroll To Sections
function scrollToSections(element) {
    element.forEach(ele => {
        ele.addEventListener("click", (e) => {
            
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
}

scrollToSections(allBullets);
scrollToSections(allLinks);

// Handle Active State
function handleActive(event) {
    // Remove Active Class From All Children
    event.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    // Add Active Class To Selected Element
    event.target.classList.add("active");
}

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu")
let toggleLinks = document.querySelector(".links");

toggleBtn.onclick = function () {
    // Display Arrow Of Toggle Menu
    this.classList.toggle("menu-active");
    //Display Toggle Menu
    toggleLinks.classList.toggle("open");
}

// Close Toggle Menu When Clicking Anywhere Outside Menu And Toggle Button

document.addEventListener("click", (e) => {
    if (e.target !== toggleBtn && e.target !== toggleLinks) {
        // Check If Menu Is Open
        if (toggleLinks.classList.contains("open")) {
            // Remove Class "menu-active"
            toggleBtn.classList.toggle("menu-active");
            // Remove Class "oopen"
            toggleLinks.classList.toggle("open");
        }
    }
});

toggleLinks.onclick = function(e) {
    e.stopPropagation();
}
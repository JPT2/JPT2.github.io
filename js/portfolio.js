// TODO Should make menu bar tabs part of scroll bar

function loadProject(project) {
    loadHeroImage(project.getImg());
    loadTitle(project.getTitle());
    loadNewsfeed(project.getNewsfeed());
    loadDescription(project.getDescription(), project.getNotes());
}

function loadHeroImage(imgPath) {
    let div = document.getElementById("hero-image");
    // Unload previous img
    cleanDiv(div);

    let heroImage = document.createElement("div");
    heroImage.classList.add("hero-image");
    heroImage.style.backgroundImage  = "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)), url(" + imgPath + ")";

    div.appendChild(heroImage);
}

function loadTitle(title) {
    let div = document.getElementById("title");
    div.textContent = title;
}

function loadNewsfeed(news) {
    // Unload previous news
    let div = document.getElementById("newsfeed");
    cleanDiv(div);

    // TODO - Add way to add a new newsfeed entry? Or should that be handled elsewhere?
        // Maybe have it set as outside so not constantly erasing and reloading it
    if (news.length) {
        for (let i = 0; i < news.length; i++) {
            let p = document.createElement("p");
            p.classList.add("news");
            p.textContent = news[i].getTitle();

            // Actually by default it should all be clickable
            // Maybe move function body out?
            p.addEventListener("click", function() {
                console.log("Opening notice: " + news[i]);
                // Repopulate the display
                // TODO Decide if should reload image, newsfeed
                if (news[i].getImg) {
                    loadHeroImage(news[i].getImg());
                }
                loadTitle(news[i].getTitle());
                loadDescription(news[i].getDescription(), news[i].getNotes());
            });
            div.appendChild(p);
        }
    } else {
        // Render some notice that there are none
        let p = document.createElement("p");
        p.classList.add("news");
        p.classList.add("notice");
        p.textContent = "No New Notices";
        div.appendChild(p);
    }
    
    
}

function cleanDiv(div) {
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

function loadDescription(description, notes) {
    let div = document.getElementById("description");
    cleanDiv(div);

    let notebook = document.createElement("div");
    let contentP = document.createElement("p");
    contentP.classList.add("content");
    contentP.textContent = description;
    notebook.appendChild(contentP);
    div.appendChild(notebook);
}

function loadScrollBar(projects) {
    let div = document.getElementById("scroll");
    cleanDiv(div);
    for (let i = 0; i < projects.length; i++) {
        // TODO Do I need to track the rendered projects? <- I would think not
        let newProject = new RenderProject(projects[i]);

        let clickable = document.createElement("div");
        clickable.addEventListener("click", function() {
            loadProject(projects[i]);
        });
        
        // Publishh
        newProject.render(clickable);
        div.appendChild(clickable);
    }
}
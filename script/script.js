// Changement de couleur de la nav bar au scroll//

function handleNavbarScroll() {
    const header = document.querySelector(".navbar");
    window.onscroll = function () {
        const top = window.scrollY;
        if (top >= 100) {
            header.classList.add("navbarDark");
        } else {
            header.classList.remove("navbarDark");
        }
    };
}

// Colapse navbar format responsive //
function handleNavbarCollapse() {
    const navLinks = document.querySelectorAll(".nav-item");
    const menuToggle = document.getElementById("navbarSupportedContent");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            new bootstrap.Collapse(menuToggle).toggle();
        });
    });
}


// SKILLS SECTION //

// hard skills//

function createHardSkillsFromJSON() {
    const row = document.querySelector("#skillsRow");

    const card = document.createElement("div");
    card.classList.add("col-lg-6", "mt-4");

    card.innerHTML = `
        <div class="card skillsCard">
            <div class="card-body">
                <h3 class="skillsTitle">Hard Skills</h3>
                <div class="skillsGrid"></div>
            </div>
        </div>
    `;

    const grid = card.querySelector(".skillsGrid");

    fetch("data/hardSkills.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const iconDiv = document.createElement("div");
                iconDiv.classList.add("skillsItem");
                iconDiv.innerHTML = `
                    <img src="./images/${item.image}" alt="${item.alt}">
                    <p><strong>${item.title}</strong></p>
                `;
                grid.appendChild(iconDiv);
            });
        });

    row.appendChild(card);
}

// SOFT SKILLS//

function createSoftSkillsFromJSON() {
    const row = document.querySelector("#skillsRow");

    const card = document.createElement("div");
    card.classList.add("col-lg-6", "mt-4");

    card.innerHTML = `
        <div class="card skillsCard">
            <div class="card-body">
                <h3 class="skillsTitle">Soft Skills</h3>
                <div class="skillsGrid"></div>
            </div>
        </div>
    `;

    const grid = card.querySelector(".skillsGrid");

    fetch("data/softSkills.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const iconDiv = document.createElement("div");
                iconDiv.classList.add("skillsItem");
                iconDiv.innerHTML = `
                    <img src="./images/${item.image}" alt="${item.alt}">
                    <p><strong>${item.title}</strong></p>
                `;
                grid.appendChild(iconDiv);
            });
        });

    row.appendChild(card);
}


// SECTION PORTFOLIO // 

function createPortfolioFromJSON() {
  const container = document.querySelector("#portfolio .container");

  // Conteneur pour les boutons
  const filtresContainer = document.createElement("div");
  filtresContainer.id = "button-container";
  filtresContainer.classList.add("text-center", "my-3");
  container.appendChild(filtresContainer);

  fetch("data/portfolio.json")
    .then(response => response.json())
    .then(data => {

      // Créer UNE seule ligne pour toutes les cartes
      const row = document.createElement("div");
      row.classList.add("row");
      container.appendChild(row);

      // Créer toutes les cartes
      data.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("col-lg-4", "mt-4", "portfolio-card");
        card.dataset.category = item.category;
        card.innerHTML = `
          <div class="card portfolioContent">
            <img class="card-img-top" src="images/${item.image}" style="width:100%">
            <div class="card-body">
              <h4 class="card-title">${item.title}</h4>
              <p class="card-text">${item.text}</p>
              <div class="text-center">
                <a href="${item.link}" class="btn btn-success">Lien Github</a>
              </div>
            </div>
          </div>
        `;
        row.appendChild(card);
      });

      // Bouton "Tous"
      const boutonTous = document.createElement("button");
      boutonTous.innerText = "Tous";
      boutonTous.classList.add("filtres-button", "active");
      boutonTous.addEventListener("click", () => {
        activerBoutonActif(boutonTous);
        document.querySelectorAll(".portfolio-card").forEach(c => c.style.display = "");
      });
      filtresContainer.appendChild(boutonTous);

      // Boutons par catégorie
      const categories = ["Tests", "Développement", "Plannification projet"];
      categories.forEach(cat => {
        const bouton = document.createElement("button");
        bouton.innerText = cat;
        bouton.classList.add("filtres-button");
        bouton.addEventListener("click", () => {
          activerBoutonActif(bouton);
          document.querySelectorAll(".portfolio-card").forEach(c => {
            c.style.display = c.dataset.category === cat ? "" : "none";
          });
        });
        filtresContainer.appendChild(bouton);
      });
    });
}


// effets au niveau de l'accueil du site // 
function slideAccueil() {
  const elementsAccueil = document.querySelectorAll(".hero-text > *");

  const observer = new IntersectionObserver(mouvement => {
    mouvement.forEach(mouv => {
      if (mouv.isIntersecting) {
        mouv.target.classList.add("slide-up-visible");
      }
    });
  });

  // On observe chaque élément //
  elementsAccueil.forEach(element => observer.observe(element));
}

function activerBoutonActif(boutonActif) {
    document.querySelectorAll(".filtres-button").forEach(btn => {
        btn.classList.remove("active");
    });
    boutonActif.classList.add("active");
}

// Call the functions to execute the code
handleNavbarScroll();
handleNavbarCollapse();
createHardSkillsFromJSON();
createSoftSkillsFromJSON();
createPortfolioFromJSON();
slideAccueil();


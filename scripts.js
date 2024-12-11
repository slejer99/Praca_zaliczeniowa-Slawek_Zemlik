console.log("Script loaded");

//struktura danych dla kazdej z podstron
const siteData = {
  home: {
    title: "JAN KOWALSKI",
    subtitle: "WEB-DESIGNER",
    contentTitle: "About me",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
    title2: "My Skills",
    skills: [
      { name: "Figma", experience: 0, icon: "./Images/Figma.png" },
      { name: "JavaScript", experience: 5, icon: "./Images/Javascript.png" },
      { name: "CSS", experience: 6, icon: "./Images/CSS3.png" },
      { name: "HTML", experience: 2, icon: "./Images/HTML5.png" },
      { name: "VSC", experience: 2, icon: "./Images/Visual Studio Code.png" },
      { name: "GitHub", experience: 2, icon: "./Images/Vector.png" },
    ],
    cards: [],
  },
  projects: {
    title: "MY PROJECTS",
    subtitle: "MADE WITH LOVE",
    projectlist: [
      { title: "html", description: ["skill", "skill2"] },
      { title: "JS", description: ["skill", "skill2"] },
      { title: "CSS", description: ["skill", "skill2"] },
      { title: "React", description: ["skill", "skill2"] },
    ],
  },

  about: {
    title: "ABOUT ME",
    subtitle: "IT'S ME, JAN",
    backgroundTitle: "My background",
    backgroundDescription:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
    hobbiesTitle: "My hobbies and interests",
    hobbiesDescription:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
  },
  contact: { title: "CONTACT ME", subtitle: "SAY HELLO TO ME" },
  messages: {
    title: "MESSAGES",
    subtitle: "MESSAGE FROM THE INTERESTING PERSON",
    messagesFromUsers: [
      {
        Name: "Stefan",
        Email: "stefan@siarzewski.pl",
        Message: "Urwałeś kurze złote jaja",
      },
      {
        Name: "Karol",
        Email: "jan@pawelII.pl",
        Message: "Pozdrawiam wszystkich Polaków",
      },
      {
        Name: "Adam",
        Email: "adam@malysz.pl",
        Message: "Leć po złoto",
      },
    ],
  },
};

let currentIndex = 0;
let cardsPerPage = 3;

const mainContent = document.getElementById("main-wrapper");
const cardsContainer = document.getElementById("cards-container");
const projects = siteData.projects.projectlist;
const messages = siteData.messages.messagesFromUsers;
const about = siteData.about;

//do tworzenia elementow i nadawania atrybutow
function createElement(nameOfElement, attrs) {
  const newElement = document.createElement(nameOfElement);
  if (attrs) {
    for (const key in attrs) {
      const value = attrs[key];
      if (Array.isArray(value)) {
        value.forEach((item) => newElement.classList.add(item));
      } else newElement.setAttribute(key, attrs[key]);
    }
    return newElement;
  } else return newElement;
}

//odswiezenie widoku kart projektow
function refreshProjects() {
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";

  if (projects.length === 0) {
    const noProjectsMessage = document.createElement("h3");
    noProjectsMessage.textContent = "There are no projects to display";
    cardsContainer.appendChild(noProjectsMessage);
  } else {
    projects.forEach((project) => {
      const card = createCard(project.title, project.description);
      card.querySelector(".removeCard").addEventListener("click", () => {
        removeProject(project.title);
      });
      cardsContainer.appendChild(card);
    });
  }
}

//wyswietlanie headera
function headerCreator(sectionKey) {
  //zmienna zawierajaca dane strony
  const section = siteData[sectionKey];

  //tworzy odpowiednia tresc headera
  const headerContent = document.getElementById("header-content");

  headerContent.querySelector("h1").textContent = section.title;
  headerContent.querySelector("span").textContent = section.subtitle;
}

// tworzy addProject button
function addProjectButton() {
  const projectButtonContainer = createElement("div");
  projectButtonContainer.style.alignSelf = "center";

  const projectButton = createElement("button", {
    id: "add-project",
    class: ["btn", "projectButton"],
  });

  // projectButton.classList.add("btn", "projectButton");
  const projectButtonImg = createElement("img", {
    src: "./Images/buttonPls.png",
  });
  const projectButtonText = (document.createTextNode = "Add project");
  projectButton.append(projectButtonImg, projectButtonText);

  projectButtonContainer.appendChild(projectButton);
  return projectButtonContainer;
}

//tworzy contact me button
function contactMeButton() {
  const contactMeButtonContainer = createElement("div", {
    id: "contact-me-button-container",
  });
  contactMeButtonContainer.style.alignSelf = "center";

  const contactMeButton = createElement("button", { id: "add-project" });

  contactMeButton.classList.add("btn", "projectButton");
  const contactMeButtonImg = createElement("img", {
    src: "./Images/Arrow right.png",
  });
  const contactMeButtonText = (document.createTextNode = "Contact me");
  contactMeButton.append(contactMeButtonImg, contactMeButtonText);

  contactMeButtonContainer.appendChild(contactMeButton);
  return contactMeButtonContainer;
}

// Funkcja pomocnicza do usunięcia projektu z tablicy
function removeProject(title) {
  const projectIndex = projects.findIndex((project) => project.title === title);
  if (projectIndex !== -1) {
    projects.splice(projectIndex, 1);
    refreshProjects();
  }
}

//tworzenie karty projektu
function createCard(title, description) {
  const card = createElement("div");
  card.className = "card";

  const cardTitle = createElement("h4");
  cardTitle.textContent = title;

  //button usuniecia karty
  const cardRemove = createElement("button");
  cardRemove.className = "removeCard";
  const cardRemoveImg = createElement("img");
  cardRemoveImg.src = "./Images/cardremove.png";
  cardRemove.appendChild(cardRemoveImg);

  const cardContent = createElement("ul");
  description.forEach((item) => {
    const contentElement = createElement("li");
    contentElement.textContent = item;
    cardContent.appendChild(contentElement);
  });

  card.append(cardTitle, cardContent, cardRemove);

  return card;
}

// funkcja dodania skilla
function createSkill(skillName, yearsOfExperience, iconPath) {
  // const skillsContainer = document.getElementById("skills-container");

  //tworzy kontener dla pojedynczej umiejetnosc
  const skill = createElement("div");
  skill.classList.add("skill");

  //tworzy img dla umiejetnosci
  const icon = createElement("img");
  icon.src = iconPath;
  icon.alt = `${skillName} icon`;

  //kontener dla nazwy umiejetnosc i lat doswiadczenia
  const skillInfo = createElement("div");

  //dodaje nazwe umiejetnosci
  const skillSpan = createElement("span");
  skillSpan.textContent = skillName;
  skillSpan.classList.add("skillName");

  //tworzy kontener na kropki umiejetnosci
  const dotsContainer = createElement("div");
  dotsContainer.classList.add("dots-container");

  //dodaje kropki w zaleznosci od lat doswiadczenia
  for (let i = 0; i <= 4; i++) {
    const dotSpan = createElement("span");
    dotSpan.className = "dot";
    if (i < yearsOfExperience) {
      dotSpan.style.backgroundColor = "var(--darkBlue)";
    } else {
      dotSpan.style.backgroundColor = "transparent";
    }
    dotsContainer.appendChild(dotSpan);
  }
  //tworzy span z latami doswiadczenia
  const yearsSpan = createElement("span");
  yearsSpan.classList.add("skillExperience");
  yearsSpan.textContent =
    yearsOfExperience === 1
      ? `${yearsOfExperience} year`
      : `${yearsOfExperience} years`;

  //dodaje dzieci do rodzicow
  skillInfo.append(skillSpan, dotsContainer, yearsSpan);

  skill.append(icon, skillInfo);

  return skill;
}

//tworzy modal sluzacy dodaniu projektu
function projectModal() {
  const modal = createElement("dialog", { id: "modal" });

  //closebutton
  const closeButton = createElement("button", { class: "closeButton" });
  const closeButtonImg = createElement("img", { src: "./Images/closebtn.png" });
  closeButton.appendChild(closeButtonImg);

  //potwierdzenie dodania projektu button
  const confirmProjectButton = addProjectButton();
  confirmProjectButton.setAttribute("id", "confirm-project-button");

  const projectForm = createElement("form");

  //sekcja tytulowa projektu
  const projectTitle = createElement("div", { id: "modal-title" });
  const titleLabel = createElement("label", { for: "title-input" });
  titleLabel.textContent = "Project title";
  const titleInput = createElement("input", {
    id: "title-input",
    name: "title-name",
    type: "text",
    placeholder: "Project title",
  });

  const titleAlert = createElement("span");
  projectTitle.append(titleLabel, titleInput, titleAlert);

  //sekcja technologii projektu
  const projectTech = createElement("div", { id: "modal-technologies" });
  const techLabel = createElement("label", { for: "tech-input" });
  techLabel.textContent = "Technologies";
  const techInput = createElement("input", {
    id: "tech-input",
    name: "tech-name",
    type: "text",
    placeholder: "html,css,javascript",
  });

  const techAlert = createElement("span");
  projectTech.append(techLabel, techInput, techAlert);

  projectForm.append(projectTitle, projectTech, confirmProjectButton);
  modal.append(closeButton, projectForm);

  // addModalDynamicValidation();

  //funkcja pomocniczna do dodania nowego projektu
  function newProject(title, description) {
    return {
      title: title,
      description: description.split(",").map((item) => item.trim()),
    };
  }

  //obsluga closebutton i addProject button
  closeButton.addEventListener("click", () => {
    titleInput.value = "";
    techInput.value = "";
    document.body.style.overflow = "auto";
    document.body.style.overflowX = "hidden";
    modal.close();
  });

  confirmProjectButton.addEventListener("click", (e) => {
    e.preventDefault();

    const ifValidProject = validateInputs();

    if (typeof ifValidProject === "object") {
      const cards = document.getElementById("cards-container");
      cards.innerHTML = "";

      projects.push(ifValidProject);

      projects.forEach((project) => {
        const card = createCard(project.title, project.description);
        card.querySelector(".removeCard").addEventListener("click", () => {
          card.remove();
          removeProject(project.title);
        });
        cards.appendChild(card);
      });

      //resetowanie wartosci formularza
      titleInput.value = "";
      techInput.value = "";

      document.body.style.overflow = "auto";
      document.body.style.overflowX = "hidden";
      modal.close();
    }
  });

  //walidacja inputu na kliknieciu buttona
  const validateInputs = () => {
    const titleValue = titleInput.value.trim();
    const techValue = techInput.value.trim();

    if (30 >= titleValue.length && titleValue.length >= 3 && techValue) {
      titleAlert.textContent = "";
      titleInput.style.borderBottom = "solid 2px var(--darkBlue)";
      techAlert.textContent = "";
      techInput.style.borderBottom = "solid 2px var(--darkBlue)";
      return newProject(titleValue, techValue);
    }

    if (titleValue.length < 3) {
      titleAlert.textContent = "Title must be at least 3 characters long.";
      titleInput.style.borderBottom = "solid 2px red";
      titleAlert.style.color = "red";
    } else if (titleValue.length > 30) {
      titleAlert.textContent = "Title must not exceed 30 characters";
      titleInput.style.borderBottom = "solid 2px red";
      titleAlert.style.color = "red";
    } else {
      titleAlert.textContent = "";
      titleInput.style.borderBottom = "solid 2px var(--darkBlue)";
    }

    if (!techValue) {
      techAlert.textContent = "Please add some technologies";
      techInput.style.borderBottom = "solid 2px red";
      techAlert.style.color = "red";
    } else {
      techAlert.textContent = "";
      techInput.style.borderBottom = "solid 2px var(--darkBlue)";
    }
  };

  //dynamiczna walidacja inputow w modalu
  function addModalDynamicValidation() {
    titleInput.addEventListener("input", () => {
      if (titleInput.value.trim().length < 3) {
        titleAlert.textContent = "Title must be at least 3 characters long.";
        titleInput.style.borderBottom = "solid 2px red";
        titleAlert.style.color = "red";
      } else if (titleInput.value.trim().length > 30) {
        titleAlert.textContent = "Title must not exceed 30 characters";
        titleInput.style.borderBottom = "solid 2px red";
        titleAlert.style.color = "red";
      } else {
        titleAlert.textContent = "";
        titleInput.style.borderBottom = "solid 2px var(--darkBlue)";
      }
    });

    techInput.addEventListener("input", () => {
      if (techInput.value.trim().length === 0) {
        techAlert.textContent = "Please add some technologies";
        techInput.style.borderBottom = "solid 2px red";
        techAlert.style.color = "red";
      } else {
        techAlert.textContent = "";
        techInput.style.borderBottom = "solid 2px var(--darkBlue)";
      }
    });
  }
  addModalDynamicValidation();
  return modal;
}

// formularz kontaktowy
function contactForm() {
  const contactContainer = createElement("div", { id: "contact-container" });

  const contactTitle = createElement("h3", { id: "contact-title" });
  contactTitle.textContent = "Contact me";

  const contactForm = createElement("form", { id: "contact-form" });
  const nameAlert = createElement("span", { id: "name-alert" });
  const emailAlert = createElement("span", { id: "email-alert" });
  const messageAlert = createElement("span", { id: "message-alert" });

  const nameDiv = createElement("div", { id: "name-div", class: "inputDivs" });
  const emailDiv = createElement("div", {
    id: "email-div",
    class: "inputDivs",
  });
  const messageDiv = createElement("div", {
    id: "message-div",
    class: "inputDivs",
  });

  const nameLabel = createElement("label", { for: "name-input" });
  nameLabel.textContent = "Name";
  const nameInput = createElement("input", {
    id: "name-input",
    name: "Name",
    class: "message",
    type: "text",
    placeholder: "Your name",
  });
  nameDiv.append(nameLabel, nameInput, nameAlert);

  const emailLabel = createElement("label", { for: "email-input" });
  emailLabel.textContent = "Email";
  const emailInput = createElement("input", {
    id: "email-input",
    name: "Email",
    class: "message",
    type: "email",
    placeholder: "email@example.com",
  });
  emailDiv.append(emailLabel, emailInput, emailAlert);

  const messageLabel = createElement("label", { for: "message-input" });
  messageLabel.textContent = "Message";
  const messageInput = createElement("input", {
    id: "message-input",
    name: "Message",
    class: "message",
    type: "text",
    placeholder: "Your message",
  });
  messageDiv.append(messageLabel, messageInput, messageAlert);

  const nameAndMail = createElement("div", { id: "name-and-mail" });
  nameAndMail.append(nameDiv, emailDiv);

  contactForm.append(nameAndMail, messageDiv);

  contactContainer.append(contactTitle, contactForm);
  return contactContainer;
}

//walidacja na kliknieciu w button Send message
function validateMessage() {
  const nameInput = document.getElementById("name-input");
  const emailInput = document.getElementById("email-input");
  const messageInput = document.getElementById("message-input");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const nameAlert = document.getElementById("name-alert");
  const emailAlert = document.getElementById("email-alert");
  const messageAlert = document.getElementById("message-alert");

  let isValid = true;

  // dynamiczne walidacje
  if (nameInput.value.trim().length < 3) {
    nameAlert.textContent = "The name must be at least 3 characters long.";
    nameAlert.style.color = "red";
    nameInput.style.borderBottom = "solid 2px red";
    isValid = false;
  } else if (nameInput.value.trim().length > 20) {
    nameAlert.textContent = "The name must not exceed 20 characters.";
    nameAlert.style.color = "red";
    nameInput.style.borderBottom = "solid 2px red";
    isValid = false;
  } else {
    nameAlert.textContent = "";
    nameInput.style.borderBottom = "solid 2px var(--darkBlue)";
  }

  if (!emailRegex.test(emailInput.value.trim())) {
    emailAlert.textContent = "Please enter a valid email address";
    emailAlert.style.color = "red";
    emailInput.style.borderBottom = "solid 2px red";
    isValid = false;
  } else {
    emailAlert.textContent = "";
    emailInput.style.borderBottom = "solid 2px var(--darkBlue)";
  }

  if (messageInput.value.trim().length === 0) {
    messageAlert.textContent = "The message cannot be empty.";
    messageAlert.style.color = "red";
    messageInput.style.borderBottom = "solid 2px red";
    isValid = false;
  } else {
    messageAlert.textContent = "";
    messageInput.style.borderBottom = "solid 2px var(--darkBlue)";
  }

  return isValid;
}

//dynamiczna walidacja formularza wiadomosc
function addMessageDynamicValidation() {
  const nameInput = document.getElementById("name-input");
  const emailInput = document.getElementById("email-input");
  const messageInput = document.getElementById("message-input");
  const nameAlert = document.getElementById("name-alert");
  const emailAlert = document.getElementById("email-alert");
  const messageAlert = document.getElementById("message-alert");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  nameInput.addEventListener("input", () => {
    if (nameInput.value.trim().length < 3) {
      nameAlert.textContent = "The name must be at least 3 characters long.";
      nameAlert.style.color = "red";
      nameInput.style.borderBottom = "solid 2px red";
    } else if (nameInput.value.trim().length > 20) {
      nameAlert.textContent = "The name must not exceed 20 characters.";
      nameAlert.style.color = "red";
      nameInput.style.borderBottom = "solid 2px red";
    } else {
      nameAlert.textContent = "";
      nameInput.style.borderBottom = "solid 2px var(--darkBlue)";
    }
  });

  emailInput.addEventListener("input", () => {
    if (!emailRegex.test(emailInput.value.trim())) {
      emailAlert.textContent = "Please enter a valid email address";
      emailAlert.style.color = "red";
      emailInput.style.borderBottom = "solid 2px red";
    } else {
      emailAlert.textContent = "";
      emailInput.style.borderBottom = "solid 2px var(--darkBlue)";
    }
  });

  messageInput.addEventListener("input", () => {
    if (messageInput.value.trim().length === 0) {
      messageAlert.textContent = "The message cannot be empty.";
      messageAlert.style.color = "red";
      messageInput.style.borderBottom = "solid 2px red";
    } else if (messageInput.value.trim().length > 100) {
      messageAlert.textContent = "The message must not exceed 100 characters.";
      messageAlert.style.color = "red";
      messageInput.style.borderBottom = "solid 2px red";
    } else {
      messageAlert.textContent = "";
      messageInput.style.borderBottom = "solid 2px var(--darkBlue)";
    }
  });
}

function hamburgerMenu() {
  const navigation = document.getElementById("top-nav");
  const hamburgerButton = document.getElementById("ham-img");
  const hamburgerButtonActive = document.getElementById("ham-img-active");

  if (
    navigation.classList.contains("close") &&
    hamburgerButtonActive.classList.contains("close")
  ) {
    navigation.classList.add("mobileNavi");
    hamburgerButton.classList.add("close");
    navigation.classList.remove("close", "mobNavTranslate");
    hamburgerButtonActive.classList.remove("close");
  } else {
    navigation.classList.add("close", "mobNavTranslate");
    hamburgerButtonActive.classList.add("close");
    hamburgerButton.classList.remove("close");
  }
}

//aktywna nawigacja
function naviActive(link) {
  const allLinks = document.querySelectorAll("a");

  allLinks.forEach((item) => {
    item.classList.remove("active");
    item.classList.add("focus");
  });

  link.forEach((item) => {
    item.classList.add("active");
  });
  link.forEach((item) => {
    item.classList.remove("focus");
  });
}

//---FUNKCJE GLOWNE-----//

function displayHome() {
  const home = siteData["home"];
  const hamburgerButton = document.getElementById("hamburger-menu");

  headerCreator("home");
  hamburgerButton.addEventListener("click", hamburgerMenu);
  const heroWrapper = createElement("section", { id: "hero-wrapper" });
  const hero = createElement("div", { id: "hero" });
  const imgMobile = createElement("img", {
    class: "hero-mob-img",
    src: "./Images/Mobilemale-7275449_1280 1.png",
  });
  const imgDesk = createElement("img", {
    class: "hero-desk-img",
    src: "./Images/male-7275449_1280 1.png",
  });
  const heroContent = createElement("div", { id: "hero-content" });
  const h3 = createElement("h3");
  h3.textContent = home.contentTitle;
  const p = createElement("p");
  p.textContent = home.description;

  heroContent.append(h3, p);

  const skillsWrapper = createElement("div", { id: "skills-wrapper" });
  const skillsContainer = createElement("div", { id: "skills-container" });
  const h3Skills = createElement("h3");
  h3Skills.textContent = home.title2;
  home.skills.forEach((skill) => {
    const newskill = createSkill(skill.name, skill.experience, skill.icon);
    skillsContainer.appendChild(newskill);
  });
  skillsWrapper.append(h3Skills, skillsContainer);

  hero.append(imgMobile, imgDesk, heroContent, skillsWrapper);
  heroWrapper.appendChild(hero);

  if (projects.length > 0) {
    const cardsWrapperHero = createElement("div", {
      id: "cards-wrapper-hero",
    });

    const cardsContainerHero = createElement("div", {
      id: "cards-container-hero",
    });

    //wyswietla tylko 3 karty w home
    function displayCards() {
      cardsContainerHero.innerHTML = "";
      cardsPerPage = 3;
      if (projects.length < cardsPerPage) {
        cardsPerPage = projects.length;
      }

      for (let i = 0; i < cardsPerPage; i++) {
        const projectIndex = (currentIndex + i) % projects.length;
        const project = projects[projectIndex];
        const card = createCard(project.title, project.description);
        card.querySelector(".removeCard").remove();
        cardsContainerHero.appendChild(card);
      }
    }

    displayCards(); //wyswietla poczatkowe karty

    cardsWrapperHero.appendChild(cardsContainerHero);
    heroWrapper.appendChild(cardsWrapperHero);

    if (projects.length > cardsPerPage) {
      // tworzy przyciski do karuzeli w home
      function homeBtns() {
        const homeBtns = createElement("div", { id: "home-btns" });

        //right arrow button
        const buttonRight = createElement("button", {
          id: "right-button",
          class: "btn",
        });

        const buttonRightImg = createElement("img");
        buttonRightImg.src = "./Images/Arrow right.png";
        buttonRight.appendChild(buttonRightImg);

        //left arrow button
        const buttonLeft = createElement("button", {
          id: "left-button",
          class: "btn",
        });

        const buttonLeftImg = createElement("img");
        buttonLeftImg.src = "./Images/Arrow left.png";
        buttonLeft.appendChild(buttonLeftImg);

        homeBtns.append(buttonLeft, buttonRight);
        return homeBtns;
      }

      heroWrapper.appendChild(homeBtns());
    }
  }

  mainContent.innerHTML = "";

  mainContent.append(heroWrapper);

  const leftButton = document.getElementById("left-button");
  const rightButton = document.getElementById("right-button");

  if (leftButton && rightButton) {
    leftButton.addEventListener("click", () => {
      console.log("dziala");
      prevCard();
    });
    rightButton.addEventListener("click", () => {
      nextCard();
      console.log("dziala");
    });
  }

  //obsluga przyciskow
  function nextCard() {
    if (currentIndex >= projects.length - 1) currentIndex = -1;
    currentIndex++;
    return displayCards();
  }
  function prevCard() {
    if (currentIndex <= 0) currentIndex = projects.length;
    currentIndex--;
    return displayCards();
  }
}

//wyswietla sekcje projects
function displayProjects() {
  headerCreator("projects");

  const modal = projectModal();
  const projectCreationButton = addProjectButton();
  projectCreationButton.setAttribute("id", "project-button-container");
  const cardsWrapper = createElement("div", { id: "cards-wrapper" });
  const cardsContainer = createElement("div", { id: "cards-container" });

  function noProjectsAlert() {
    if (projects.length === 0) {
      const projectAlert = createElement("h3", { id: "project-alert" });
      projectAlert.textContent = "There are no projects to display";
      cardsContainer.appendChild(projectAlert);
    }
  }

  noProjectsAlert();

  projects.forEach((project) => {
    const card = createCard(project.title, project.description);
    card.querySelector(".removeCard").addEventListener("click", () => {
      removeProject(project.title);

      card.remove();

      noProjectsAlert();
      console.log(projects);
    });
    cardsContainer.appendChild(card);
    return cardsContainer;
  });

  cardsWrapper.appendChild(cardsContainer);

  projectCreationButton.addEventListener("click", () => {
    modal.showModal();
    document.body.style.overflow = "hidden";
  });

  mainContent.innerHTML = "";
  mainContent.append(modal, projectCreationButton, cardsWrapper);
}

//wyswietla sekcje about
function displayAbout() {
  headerCreator("about");

  mainContent.innerHTML = "";

  const aboutWrapper = createElement("section", { id: "about-wrapper" });
  const imgMobile = createElement("img", {
    class: "hero-mob-img",
    src: "./Images/Mobilemale-7275449_1280 1.png",
  });
  const imgDesk = createElement("img", {
    class: "hero-desk-img",
    src: "./Images/male-7275449_1280 1.png",
  });

  const backgroundWrapper = createElement("div", { id: "background-wrapper" });
  const backgroundTitle = createElement("h3");
  backgroundTitle.textContent = about.backgroundTitle;
  const backgroundText = createElement("p");
  backgroundText.textContent = about.backgroundDescription;
  backgroundWrapper.append(backgroundTitle, backgroundText);

  const hobbiesWrapper = createElement("div", { id: "hobbies-wrapper" });
  const hobbiesTitle = createElement("h3");
  hobbiesTitle.textContent = about.hobbiesTitle;
  const hobbiesText = createElement("p");
  hobbiesText.textContent = about.hobbiesDescription;
  hobbiesWrapper.append(hobbiesTitle, hobbiesText);

  const contactButton = contactMeButton();
  contactButton.addEventListener("click", () => {
    const contact = document.querySelectorAll(".contact");

    displayContact();
    naviActive(contact);
  });

  aboutWrapper.append(
    imgMobile,
    imgDesk,
    backgroundWrapper,
    hobbiesWrapper,
    contactButton
  );
  mainContent.appendChild(aboutWrapper);
}

//wyswietla sekcje contact
function displayContact() {
  headerCreator("contact");

  mainContent.innerHTML = "";

  const contact = contactForm();

  const sendButton = createElement("button", {
    id: "send-button",
    class: ["btn", "projectButton"],
  });
  sendButton.textContent = "Send message";

  function getFormData() {
    const formData = {};
    const inputs = document.querySelectorAll(".message");

    for (const input of inputs) {
      formData[input.name] = input.value.trim();
    }
    return formData;
  }

  sendButton.addEventListener("click", (e) => {
    e.preventDefault();

    console.log("click");

    if (validateMessage()) {
      const message = getFormData();
      messages.push(message);

      const messageInputs = document.querySelectorAll(".message");
      messageInputs.forEach((message) => (message.value = ""));
    }
  });
  contact.appendChild(sendButton);
  mainContent.appendChild(contact);
  addMessageDynamicValidation();
}

//wyswietla sekcje messages
function displayMessages() {
  headerCreator("messages");

  mainContent.innerHTML = "";

  const messagesContainer = createElement("div", { id: "messages-container" });

  messages.forEach((message) => {
    const singleMessage = createElement("div", { class: "singleMessage" });
    for (const key in message) {
      const p = createElement("p");
      p.textContent = `${key}: ${message[key]}`;

      singleMessage.appendChild(p);
    }
    messagesContainer.appendChild(singleMessage);
  });
  mainContent.appendChild(messagesContainer);
}

//do wyswietlenia
function toDisplay() {
  const home = document.querySelectorAll(".home");
  const projects = document.querySelectorAll(".projects");
  const about = document.querySelectorAll(".about");
  const contact = document.querySelectorAll(".contact");
  const messages = document.querySelectorAll(".messages");

  console.log(displayHome());

  displayHome();
  home.forEach((link) => {
    link.addEventListener("click", () => {
      displayHome();
      naviActive(home);
    });
  });
  projects.forEach((link) => {
    link.addEventListener("click", () => {
      displayProjects();
      naviActive(projects);
    });
  });
  about.forEach((link) => {
    link.addEventListener("click", () => {
      displayAbout();
      naviActive(about);
    });
  });
  contact.forEach((link) => {
    link.addEventListener("click", () => {
      displayContact();
      naviActive(contact);
    });
  });
  messages.forEach((link) => {
    link.addEventListener("click", () => {
      displayMessages();
      naviActive(messages);
    });
  });
}
toDisplay();

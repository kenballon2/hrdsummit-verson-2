
document.addEventListener("readystatechange", (e) => {
  if (e.target.readyState === "complete") {
    // call function here below  
    callOpenMobileMenu();
    showAndHideNavBar('.header', '__header-nav-hidden');
    showAndHideMobileEventPartner('.event-partner-logo-container.show-on-mobile', '__show-n-hide');
  }
});

const callOpenMobileMenu = () => {
  /* Event Listener for the button to hide and show menu */
  const mobileMenuBtn = document.getElementById("openCloseMobileNav");
  const revealMobileMenuNavLinks = document.querySelector(
    ".navigation-links-parent"
  );
  const bodyFixedScroll = document.querySelector("body");
  const addClassToFadeOut = document.querySelector(".navigation-links-parent");
  const navLinkItemMobile = document.querySelectorAll(".nav-item-mobile");

  mobileMenuBtn.addEventListener("click", () => {
    if (mobileMenuBtn.getAttribute("aria-label") == "Open Navigation") {
      mobileMenuBtn.setAttribute("aria-label", "Close Navigation");
      mobileMenuBtn.classList.add("nav-toggle--close");
      revealMobileMenuNavLinks.classList.add("show-mobile-menu");
      bodyFixedScroll.classList.add("fixed-modal-reveal");
    } else if (mobileMenuBtn.getAttribute("aria-label") == "Close Navigation") {
      mobileMenuBtn.setAttribute("aria-label", "Open Navigation");
      mobileMenuBtn.classList.remove("nav-toggle--close");

      // add class before closing for fadeout animation of mobile nav
      addClassToFadeOut.classList.add("fade-out-animate");

      addClassToFadeOut.addEventListener(
        "animationend",
        () => {
          bodyFixedScroll.classList.remove("fixed-modal-reveal");
          addClassToFadeOut.classList.remove("fade-out-animate");
          revealMobileMenuNavLinks.classList.remove("show-mobile-menu");
        },
        { once: true }
      );
    }
  });

  navLinkItemMobile.forEach((navlinkitem) => {
    navlinkitem.addEventListener("click", () => {
      if (mobileMenuBtn.getAttribute("aria-label") == "Close Navigation") {
        mobileMenuBtn.setAttribute("aria-label", "Open Navigation");
        mobileMenuBtn.classList.remove("nav-toggle--close");

        // add class before closing for fadeout animation of mobile nav
        addClassToFadeOut.classList.add("fade-out-animate");

        addClassToFadeOut.addEventListener(
          "animationend",
          () => {
            bodyFixedScroll.classList.remove("fixed-modal-reveal");
            addClassToFadeOut.classList.remove("fade-out-animate");
            revealMobileMenuNavLinks.classList.remove("show-mobile-menu");
          },
          { once: true }
        );
      }
    });
  });
};



/**
 * Adds or removes a specified class to a given HTML element based on the user's scrolling and mouse movement.
 * @param {string} divToAddClass - The CSS selector of the HTML element to which the class will be added or removed.
 * @param {string} nameOfClass - The name of the class to be added or removed.
 */
const showAndHideNavBar = (divToAddClass, nameOfClass) => {
  const headNav = document.querySelector(divToAddClass);
  let headNavScrollPosition = window.scrollY;

  const handleScroll = () => {
    const currentScrollPosition = window.scrollY;
    const isScrollingDown = currentScrollPosition > headNavScrollPosition;

    headNav.classList.toggle(nameOfClass, isScrollingDown);
    headNavScrollPosition = currentScrollPosition;
  };

  const handleMouseMove = (e) => {
    const mouseMoveY = e.clientY;
    const isAboveThreshold = mouseMoveY < 90;
    const isClassPresent = headNav.classList.contains(nameOfClass);

    headNav.classList.toggle(nameOfClass, !(isAboveThreshold || !isClassPresent));
  };

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('mousemove', handleMouseMove);
};
/**
 * Adds or removes a specified class to an element based on the scroll position of the window.
 * @param {string} eventContainerClass - The class name of the event container element.
 * @param {string} showHideClass - The class name to be added or removed based on the scroll position.
 */
const showAndHideMobileEventPartner = (eventContainerClass, showHideClass) => {
  const eventContainer = document.querySelector(eventContainerClass);
  let scrollPosition = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition < scrollPosition) {
      eventContainer.classList.remove(showHideClass);
    } else {
      eventContainer.classList.add(showHideClass);
    }

    scrollPosition = currentScrollPosition;

    setTimeout(() => {
      eventContainer.classList.remove(showHideClass);
    }, 6000)

  });
};
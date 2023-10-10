document.addEventListener("readystatechange", (e) => {
  if (e.target.readyState === "complete") {
    // call function here below
    callOpenMobileMenu();
    showAndHideNavBar(".header", "__header-nav-hidden");
    showAndHideMobileEventPartner(
      ".event-partner-logo-container.show-on-mobile",
      "__show-n-hide"
    );

    pageScrollZoom();
    backToTopButton();
    showPopup(
      "popupModalRegInterest",
      "show",
      "#popupModalRegInterest .popup-btn-close"
    );
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

    headNav.classList.toggle(
      nameOfClass,
      !(isAboveThreshold || !isClassPresent)
    );
  };

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("mousemove", handleMouseMove);
};

/**
 * Toggles a CSS class on an element based on user activity.
 * The class is added when the user scrolls or interacts with the page, and removed after a period of inactivity.
 *
 * @param {string} eventContainerClass - The CSS selector for the element to be targeted.
 * @param {string} nameOfClass - The name of the class to be toggled.
 */
const showAndHideMobileEventPartner = (eventContainerClass, nameOfClass) => {
  let userIsActive = false;
  let inactivityTimer = null;
  let isMobile = window.innerWidth <= 600;

  /**
   * Toggles the specified class on the targeted element.
   *
   * @param {boolean} isActive - Whether to add or remove the class.
   */
  const toggleClass = (isActive) => {
    const element = document.querySelector(eventContainerClass);
    element.classList.toggle(nameOfClass, isActive);
  };

  const handleScroll = () => {
    userIsActive = true;
    toggleClass(userIsActive);

    clearTimeout(inactivityTimer);

    inactivityTimer = setTimeout(() => {
      userIsActive = false;
      toggleClass(userIsActive);
    }, 2000);
  };

  /**
   * Handles the window resize event.
   */
  const handleWindowResize = () => {
    const newIsMobile = window.innerWidth <= 600;

    if (isMobile !== newIsMobile) {
      isMobile = newIsMobile;
      isMobile
        ? window.addEventListener("scroll", handleScroll)
        : window.removeEventListener("scroll", handleScroll);
    }
  };

  // Add event listeners based on the initial value of isMobile
  if (isMobile) {
    window.addEventListener("scroll", handleScroll);
  }

  window.addEventListener("resize", handleWindowResize);
};

const pageScrollZoom = () => {
  const bgImage = document.getElementById("hero-section");

  const isMobile = window.innerWidth <= 600;
  const isTablet = window.innerWidth <= 992;

  const bgImgSize = isMobile ? 360 : isTablet ? 320 : 120;
  const zoomingMaxSize = isMobile ? 450 : isTablet ? 400 : 200;

  const handleScrollingZoom = () => {
    const newSize = bgImgSize + window.scrollY / 24;
    const limitedSize = Math.min(newSize, zoomingMaxSize);
    bgImage.style.backgroundSize = limitedSize + "%";
  };

  window.addEventListener("scroll", handleScrollingZoom);
};

const backToTopButton = () => {
  const bckToTopDiv = document.querySelector(".btn-back-to-top");
  window.addEventListener("scroll", (e) => {
    if (window.scrollY >= 1300) {
      bckToTopDiv.classList.add("show");
    } else {
      bckToTopDiv.classList.remove("show");
    }
  });

  bckToTopDiv.addEventListener("click", () => {
    scrollToTop();
  });

  function scrollToTop() {
    window.scrollTo(0, 0);
  }
};

/**
 * Displays a popup modal on a webpage.
 * The modal is shown after a delay of 3.5 seconds and automatically closes after 10 seconds.
 * Provides a close button to manually close the modal.
 *
 * @param {string} popupModalId - The class name of the popup modal element.
 * @param {string} classToAdd - The class name to add to the popup modal element to make it visible.
 * @param {string} closeBtn - The class name of the close button element for the popup modal.
 */
const showPopup = (popupModalId, classToAdd, closeBtn) => {
  const modal = document.getElementById(popupModalId);
  const closeModal = document.querySelector(closeBtn);

  /**
   * Adds the specified class to the modal element, sets the `aria-modal` and `role` attributes,
   * and removes the class and attributes after a delay of 10 seconds.
   */
  function addClassToModal() {
    modal.classList.add(classToAdd);
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("role", "dialog");

    // setTimeout(() => {
    //   modal.classList.remove(classToAdd);
    //   modal.removeAttribute("aria-modal");
    //   modal.removeAttribute("role");
    // }, 10000);
  }

  /**
   * Removes the specified class from the modal element.
   */
  function closePopup() {
    modal.classList.remove(classToAdd);
    modal.removeAttribute("aria-modal");
    modal.removeAttribute("role");
  }

  setTimeout(addClassToModal, 3500);
  closeModal.addEventListener("click", closePopup);
};

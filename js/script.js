function pageTransition() {
  let tl = gsap.timeline();

  // Add a class to the transition element for styling purposes
  tl.set(".transition", { scaleY: 0 });
  tl.to(".transition", {
    duration: 1,
    scaleY: 1,
    transformOrigin: "bottom",
    ease: "power4.inOut",
    onComplete: function() {
      // Scroll to the top of the page after the transition is complete
      window.scrollTo(0, 0);
    },
  });

  tl.to(".transition", {
    duration: 1,
    scaleY: 0,
    transformOrigin: "top",
    ease: "power4.inOut",
    delay: 0.2,
    onComplete: function() {
      // Scroll to the top of the page after the transition is complete
      window.scrollTo(0, 0);
    },
  });
}

function contentAnimation() {
  let tl = gsap.timeline();
  tl.to("h1", {
    top: 0,
    duration: 1,
    ease: "power3.inOut",
    delay: 0.75,
    opacity: 1,
  });
  tl.to(".about-page h3", {
    top: 0,
    duration: 0.4,
    ease: "power4.inOut",
    opacity: 1,
  });
  tl.to(".wrap", {
    top: 0,
    duration: 0.4,
    ease: "power3.inOut",
    opacity: 1,
  });
  tl.to(".project-page", {
    top: 0,
    duration: 0.4,
    ease: "power3.inOut",
    opacity: 1,
  });
}

function delay(n) {
  n = n || 0;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}

barba.init({
  sync: true,
  transitions: [
    {
      async leave(data) {
        const done = this.async();

        pageTransition();
        await delay(1000);
        done();
      },

      async enter(data) {
        contentAnimation();
      },

      async once(data) {
        contentAnimation();
      },
    },
  ],
});

// TOGGLE TEME
const themeToggleButton = document.querySelector(".theme-toggle-button");
const bodyElement = document.body;
const currentTheme = localStorage.getItem("darkTheme");

if (currentTheme) {
  bodyElement.classList.add("dark-theme");
}

const toggleTheme = () => {
  bodyElement.classList.toggle("dark-theme");

  if (bodyElement.classList.contains("dark-theme")) {
    localStorage.setItem("darkTheme", "active");
  } else {
    localStorage.removeItem("darkTheme");
  }
};
themeToggleButton.addEventListener("click", toggleTheme);

// preloader animation
gsap.to(".shadow-title", 1.5, {
  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
  ease: "power4.inOut",
  stagger: {
    amount: 0.5,
  },
});

document.addEventListener("DOMContentLoaded", function () {
  if (document.body.classList.contains('home-page')) {
    document.body.classList.add('no-scroll');
      // Start the animation after 2 seconds
  setTimeout(function() {
    gsap.to(".shadow-title div", 1.5, {
      yPercent: -100,
      ease: "power4.inOut",
      stagger: {
        amount: 0.5,
      },
    });

    gsap.to(
      ".shadow-title",
      1.5,
      {
        clipPath: "polygon(0 85%, 100% 85%, 100% 100%, 0 100%)",
        ease: "power4.inOut",
        stagger: {
          amount: 0.5,
        },
      },
      0
    );

    gsap.to(".overlay", 2, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      ease: "power4.inOut",
    });

    gsap.to(".loader-img", 2, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0% 0%)",
      ease: "power4.inOut",
      stagger: {
        amount: 1.5,
      },
    });

    gsap.to(".loader", 2, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0 0%)",
      ease: "power4.inOut",
      delay: 2,
      onComplete: function() {
        // Remove no-scroll class to enable scrolling
        document.body.classList.remove('no-scroll');
      }
    });
  }, 2000); // 2000 milliseconds = 2 seconds
  }

});


// scroll to top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Add smooth scrolling behavior
  });
}

// text shuffle
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".item");

  items.forEach((item) => {
    item.addEventListener("mouseenter", shuffleAnimation);
  });
});

function getRandomCharacter() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return chars[Math.floor(Math.random() * chars.length)];
}
function shuffleAnimation(event) {
  const target = event.currentTarget;

  if (target.dataset.animation) {
    return;
  }

  target.dataset.animating = true;

  const words = target.querySelectorAll(".word");
  const originalWords = Array.from(words).map((word) => word.textContent);

  let shuffles = 0;
  const maxShuffles = 10;
  const intervalDuration = 500 / maxShuffles;

  let animationInterval = setInterval(() => {
    if (shuffles >= maxShuffles) {
      clearInterval(animationInterval);
      words.forEach((word, index) => {
        word.textContent = originalWords[index];
      });

      delete target.dataset.animating;
    } else {
      words.forEach((word) => {
        const length = word.textContent.length;
        let shuffledText = "";
        for (let i = 0; i < length; i++) {
          shuffledText += getRandomCharacter();
        }
        word.textContent = shuffledText;
      });
      shuffles++;
    }
  }, intervalDuration);
}

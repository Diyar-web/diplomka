let lastScrollTop = window.scrollY;
let idleTimer;
const spidey = document.getElementById("spidey-helper");
const message = document.getElementById("spidey-message");
const footer = document.querySelector("footer");
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const footerTop = footer.getBoundingClientRect().top + scrollTop;
  const windowBottom = scrollTop + window.innerHeight;

  if (scrollTop > 300) {
    spidey.style.bottom = "30px";
  } else {
    spidey.style.bottom = "-200px";
  }

  if (windowBottom >= footerTop) {
    message.innerText = "Это уже конец? Или только начало твоего приключения?";
  }

  if (scrollTop < lastScrollTop && scrollTop > 300) {
    message.innerText = "Вверх — отличное направление для супергероя!";
    header.classList.add("show-header");
  } else if (scrollTop > lastScrollTop) {
    header.classList.remove("show-header");
  }

  lastScrollTop = scrollTop;

  clearTimeout(idleTimer);
  spidey.style.opacity = "1";
  idleTimer = setTimeout(() => {
    spidey.style.opacity = "0";
  }, 3000);
});

const buttons = document.querySelectorAll("[data-carousel-button]");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]");

    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
  });
});

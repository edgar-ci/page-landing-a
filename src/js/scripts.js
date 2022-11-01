$(function () {
  // Menu responsive
  main.MenuResponsive();
  // animacion en secciones
  main.AnimateScroll();
  // Menu principal fixed al llegar a top
  $(window).scroll(function (e) {
    main.StyckyMenu(window.scrollY > 80);
  });
});

const main = {
  ToggleProfileItems: function () {
    $(".profile__front").click(function (e) {
      const $item = $(this).parent();
      $item.toggleClass("open");
      console.log($item.parent().siblings().children().removeClass("open"));
    });
  },
  SwipeComents: function () {
    console.log("SwipeComents");
    const dots = $(".swipe-dots")[0];
    const dotsBtns = $(dots).children();
    function printIndex() {
      for (let i = 0; i < dots.children.length; i++) {
        dots.children[i].className = "";
      }
      dots.children[this.currentSlide].className = "active";
    }
    const swipe = new Siema({
      selector: ".swipe-wrap",
      duration: 600,
      easing: "ease-out",
      perPage: 1,
      startIndex: 0,
      draggable: true,
      multipleDrag: true,
      threshold: 20,
      loop: true,
      rtl: false,
      onChange: printIndex,
      onInit: () => {},
    });

    const autoSwipe = setInterval(() => swipe.next(), 2000);
    $(".swipe-wrap").mouseenter(() => {
      clearInterval(autoSwipe);
    });
    $(dotsBtns[0]).click(() => swipe.goTo(0));
    $(dotsBtns[1]).click(() => swipe.goTo(1));
    $(dotsBtns[2]).click(() => swipe.goTo(2));
  },
  AnimateScroll: function () {
    AOS.init({ once: true });
  },
  StyckyMenu: function (scrollY) {
    const mainMenu = $(".menu-main");
    mainMenu.toggleClass("sticky", scrollY);
    $("body").toggleClass("sticky", scrollY);
  },
  MenuResponsive: function () {
    const $body = $("body");
    const menuList = $("#menu-main__list");
    const btnMenu = $("#menu-main__btn-burguer");

    btnMenu.click(function () {
      $body.toggleClass("menu-open");
      btnMenu.toggleClass("open-icon");
      menuList.toggleClass("open");
    });
    $(window).resize(function () {
      const isMenuOpen = $body.hasClass("menu-open");
      if ($(document).width() > 992 && isMenuOpen) {
        $body.removeClass("menu-open");
        menuList.removeClass("open");
        btnMenu.removeClass("open-icon");
      }
      if ($(document).width() < 992) {
        $("#menu-main__list").css(
          "transition",
          "transform 300ms ease-in-out, opacity 450ms ease-in-out"
        );
      } else {
        $("#menu-main__list").css("transition", "none");
      }
    });
  },
};

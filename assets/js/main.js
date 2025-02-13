const openModal = (id, data = {}) => {
  const modal = document.getElementById(id)
  modal.classList.add("active")

  if (modal.id === "changeService") {
    const inputs = document.querySelectorAll("input[type='radio']")
    const selectHomepage = document.getElementById("selectHomepage")
    const agreement = document.querySelector("label[for='agreeChangeToHomepage']")

    if (data.service_seq) {
      $("#changeServiceForm input[name='service_seq']").val(data.service_seq);
    }

    if (data.goods_code) {
      $("#changeServiceForm input[name='goods_code']").val(data.goods_code);
    }

    const showAgreement = () => {
      if (selectHomepage.checked) {
        agreement.style.display = "block"
      } else {
        agreement.style.display = "none"
      }
    }
    showAgreement()
    inputs.forEach((input) => {
      input.addEventListener("change", showAgreement)
    })
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Modal
  const modals = document.querySelectorAll(".modal")

  if (modals[0]) {
    const closeButton = document.querySelectorAll(".modal .close")
    const cookies = document.querySelectorAll(".modal .cookie")

    const closeModal = () => {
      modals.forEach(modal => {
        const cookie = modal.querySelector(".cookie")

        if (cookie) {
          if (modal.querySelector('.cookie input').checked == true) {
            const cookieTarget = modal.querySelector('.cookie input').getAttribute('id');
            const cookiePeriod = modal.querySelector('.cookie input').getAttribute('data-period');

            $.cookie(cookieTarget, true, { expires: parseInt(cookiePeriod) });
          }
        }
        modal.classList.remove("active")
      })
    }

    closeButton.forEach(button => {
      button.addEventListener("click", closeModal)
    })

    cookies.forEach((cookie) => {
      const input = cookie.querySelector('input');
      const cookieId = input.getAttribute('id');
      if (!$.cookie(cookieId)) {
        cookie.closest('.modal').classList.add("active");
      }
    });
  }


  /* =====================================================
   Tab Menu
  ===================================================== */
  const tabs = document.querySelectorAll(".tabs [data-tab]");
  const tabContents = document.querySelectorAll(".tab-content");
  const tabActive = document.querySelector(".tab-active")

  const showTabContent = (event) => {
    event.stopPropagation();
    const tabName = event.currentTarget.dataset.tab;
    const tabs = document.querySelectorAll(`[data-tab='${tabName}']`);
    const tabContents = document.querySelectorAll(
      `.tab-content[data-tab='${tabName}']`
    );
    let menuIndex = [...tabs].indexOf(event.currentTarget);

    tabs.forEach((tab) => {
      [...tabs].indexOf(tab) === menuIndex
        ? tab.classList.add("is-active")
        : tab.classList.remove("is-active");
    });

    tabContents.forEach((content) => {
      [...tabContents].indexOf(content) === 0 &&
        content.classList.add("is-active");
      [...tabContents].indexOf(content) === menuIndex
        ? content.classList.add("is-active")
        : content.classList.remove("is-active");
    });

    if (tabActive) {
      tabActive.style.left = `${event.currentTarget.offsetLeft}px`
    }

    if (tabName === 'pricing') {

      let hoempage = document.querySelector(".section-details .title .homepage")
      let shoppingmall = document.querySelector(".section-details .title .shoppingmall")

      switch (menuIndex) {
        case 0:
          hoempage.textContent = '14,000원/월';
          shoppingmall.textContent = '18,000원/월';
          break;
        case 1:
          hoempage.textContent = '12,600원/월';
          shoppingmall.textContent = '16,200원/월';
          break;
        case 2:
          hoempage.textContent = '9,800원/월';
          shoppingmall.textContent = '12,600원/월';
          break;
        case 3:
          hoempage.textContent = '7,000원/월';
          shoppingmall.textContent = '9,000원/월';
          break;
      }
    }
  };

  tabs.forEach((tab) => {

    if (tabs[0].dataset.tab === 'pricing') {
      tabActive.style.left = `${[...tabs][3].offsetLeft}px`;
      [...tabs][3].classList.add("is-active");
      [...tabContents][3] && [...tabContents][3].classList.add("is-active");
    } else {
      [...tabs][0].classList.add("is-active");
      [...tabContents][0] && [...tabContents][0].classList.add("is-active");
    }
    tab.addEventListener("click", showTabContent);
  });

  /* =====================================================
   Accordion
  ===================================================== */
  const accordion = document.querySelector(".accordion");
  if (accordion) {
    const questions = document.querySelectorAll(".question")

    const showLists = (event) => {
      let questionIndex = [...questions].indexOf(event.currentTarget);
      questions.forEach(question => {
        const list = question.closest("li");
        [...questions].indexOf(question) === questionIndex
          && list.classList.toggle("active")
      });
    };
    
    questions.forEach(question => {
      question.addEventListener("click", showLists);
    })
  };

  setTimeout(() => {
    const tooltips = document.querySelectorAll(".tooltip");
    tooltips.forEach(tooltip => {
      tooltip.addEventListener("click", (event) => {
        const { target } = event;

        event.preventDefault();
        event.stopPropagation()

        target.classList.toggle("active")
      })
    })
  }, 800);

  // interactive
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      (entry.intersectionRatio > 0)
        ? entry.target.classList.add("is-active")
        : entry.target.classList.remove("is-active");
    });
  });

  const contentReview = document.querySelector(".cate_case");
  if (contentReview) {
    const sections = document.querySelectorAll(".cate_case .sec_case .part_area");
    sections.forEach(section => {
      io.observe(section)
    })
  } else {
    const sections = document.querySelectorAll("main.interactive section");
    sections.forEach((section) => {
      io.observe(section);
    });
  }

  const showModal = (event) => {
    const modalData = event.currentTarget.dataset.modal
    const modals = document.querySelectorAll(".modal")
    modals.forEach(modal => {

      if (modal.classList.contains(modalData)) {
        modal.classList.add("active")
      }

      if (modalData === 'walla') {

        if (matchMedia("screen and (max-width: 640px)").matches) {
          modal.classList.remove("active");
          window.open('https://walla.my/v/fwnyDGRtyZNhnJXASAvD', '_blank');
        }
      }

      const close = modal.querySelector(".close");
      close.addEventListener("click", (event) => {
        event.preventDefault()
        const modal = event.target.closest(".modal");
        modal.classList.remove("active");
      })
    })
  }

  const modalButtons = document.querySelectorAll("[data-modal]");
  modalButtons.forEach(button => {
    button.addEventListener("click", showModal)
  })

  // 쇼핑 페이지
  const shoppingContent = document.querySelector(".cate_intro.shopping")
  if (shoppingContent) {

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          entry.target.classList.add("is_active");
          if (entry.target.classList.contains("section_not_expensive")) {
            document.addEventListener("scroll", () => {
              const coins = document.querySelector(".coins");
              coins.style.opacity = "1";
              coins.style.animation = "none";
              coins.style.transform = `translateY(${(window.pageYOffset - entry.target.offsetHeight) * -.5}px)`;
            })
          }
        } else {
          entry.target.classList.remove("is_active")
        }
      })
    })

    const sections = document.querySelectorAll(".cate_intro.shopping section");
    sections.forEach(section => {
      io.observe(section)
    })
  }

  /* =====================================================
       Checkbox: Check All
  ===================================================== */
  const checkAll = document.querySelectorAll(".check_all");

  if (checkAll[0]) {
    checkAll.forEach((all) => {
      const handleCheckAll = (event) => {
        const checkName = event.target.dataset.check;
        const checkboxes = document.querySelectorAll(`[data-check='${checkName}']`);

        checkboxes.forEach((checkbox) => {
          checkbox.checked = all.checked;

          const controller = checkbox.classList.contains("check_all");
          if (!controller.checked) {
            controller.checked = all.checked;
          }
        });
      };
      all.addEventListener("click", handleCheckAll);
    });
  }

  /* =====================================================
       Sticky Button
  ===================================================== */
  const button = document.querySelector(".section-sticky button");
  if (button) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });

    (window.scrollY > 50) && button.classList.add("active");
  }

  // 작은 화면에서 서브 페이지 슬라이더 활성화
  const breakpoint = window.matchMedia("(max-width: 640px)");
  let smallSwiper;

  const breakpointChecker = () => {
    if (breakpoint.matches === true) {
      return enableSwiper();
    } else if (breakpoint.matches === false) {
      smallSwiper !== undefined && smallSwiper.destroy(true, true);
      return;
    }
  };

  const enableSwiper = () => {
    smallSwiper = new Swiper(".swiper.small", {
      autoplay: {
        delay: 1,
        disableOnInteraction: false
      },
      freemode: true,
      speed: 5000,
      loop: true,
      slidesPerView: "auto",
      spaceBetween: 15,
      centeredSlides: true,
      grabCursor: true,
      pagination: {
        el: ".swiper.small .swiper-pagination",
        clickable: true,
      },
    });
  };

  breakpoint.addListener(breakpointChecker);
  breakpointChecker();

  /* =====================================================
       Color Picker
  ===================================================== */

  // 모바일 앱 소개 페이지
  const contentApp = document.querySelector('.content-app')
  if (contentApp) {
    const statusbarColorPicker = document.querySelector(".status-bar input[type='color']")
    const tabMenuColorpicker = document.querySelector(".tab-menu  input[type='color']")
    const device = document.querySelector(".device")
    statusbarColorPicker.addEventListener("input", (event) => {
      device.style.setProperty("--statusBarBackground", `${event.target.value}`);
    })
    tabMenuColorpicker.addEventListener("input", (event) => {
      device.style.setProperty("--tabMenuBackground", `${event.target.value}`);
    })
  }

  // 모바일 앱 신청 페이지
  const contentAppForm = document.querySelector('.content_form.mobile_app')
  const device = document.querySelector(".device")
  if (contentAppForm && device) {
    const tabTypeIcons = document.getElementById("tab_icon")
    const tabTypeMixed = document.getElementById("tab_menu")

    const selectTabStyle = document.querySelectorAll(".tab-style .list .vertical input[type='radio']")

    // 아이콘 선택 했을 때
    const selectedTabTypeIcons = () => {
      tabTypeMixed.closest("ul").classList.remove("mixed")
      device.style.setProperty("--tabMenuBackground", `url(/images/subs/mobile_app/style_a.png)`);
      selectTabStyle[0].checked = true;
      selectTabStyle.forEach(selector => {
        const tabMenuBackground = `url(${selector.nextElementSibling.querySelector('img').src})`
        selector.addEventListener("change", () => {
          device.style.setProperty("--tabMenuBackground", tabMenuBackground);
        })
      })
    }
    tabTypeIcons.checked &&
      selectedTabTypeIcons()
    tabTypeIcons.addEventListener("change", () => {
      tabTypeIcons.checked && selectedTabTypeIcons()
    })


    // 아이콘+메뉴명 선택 했을 때
    const selectedTabTypeMixed = () => {
      device.style.setProperty("--tabMenuBackground", `url(/images/subs/mobile_app/style_a_2.png)`);
      tabTypeMixed.closest("ul").classList.add("mixed")
      selectTabStyle[0].checked = true;
      selectTabStyle.forEach(selector => {
        const tabMenuBackground = `url(${selector.nextElementSibling.querySelector('img:last-of-type').src})`
        selector.addEventListener("change", () => {
          device.style.setProperty("--tabMenuBackground", tabMenuBackground);
        })
      })
    }
    tabTypeMixed.checked &&
      selectedTabTypeMixed()
    tabTypeMixed.addEventListener("change", () => {
      tabTypeMixed.checked && selectedTabTypeMixed()
    })
  }
})

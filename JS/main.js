// Загрузка header
fetch("header.html")
  .then((response) => response.text())
  .then((data) => (document.getElementById("header").innerHTML = data));

// Загрузка footer
fetch("footer.html")
  .then((response) => response.text())
  .then((data) => (document.getElementById("footer").innerHTML = data));

class ShowHide {
  constructor(
    selectedContainer,
    toggleClass,
    parentClass,
    buttonSelector,
    closeButtonSelector
  ) {
    this.selectedContainer = selectedContainer;
    this.toggleClass = toggleClass; // класс для показа/скрытия
    this.parentClass = parentClass; // родительский элемент
    this.buttonSelector = buttonSelector; // селектор кнопки открытия
    this.closeButtonSelector = closeButtonSelector; // селектор кнопки закрытия

    if (this.selectedContainer) {
      this.setEvListener();
    }
  }

  setEvListener() {
    this.selectedContainer.addEventListener("click", (ev) =>
      this.processClick(ev)
    );
  }

  processClick(ev) {
    const item = ev.target;

    // Поиск кнопки для открытия
    const button = item.classList.contains(this.buttonSelector)
      ? item
      : item.closest(`.${this.buttonSelector}`);

    const parentBlock = item.closest(`.${this.parentClass}`);

    if (!parentBlock) {
      return;
    }

    // Проверяем, есть ли уже класс для показа текста
    const isVisible = parentBlock.classList.contains(this.toggleClass);

    if (button && !isVisible) {
      // Показываем текст
      parentBlock.classList.add(this.toggleClass);
      button.classList.add("hidden");
    }

    // Если нажата кнопка закрытия
    if (item.classList.contains(this.closeButtonSelector)) {
      parentBlock.classList.remove(this.toggleClass);

      // Показать снова кнопку "Читать дальше"
      const hiddenButton = parentBlock.querySelector(
        `.${this.buttonSelector}.hidden`
      );
      if (hiddenButton) {
        hiddenButton.classList.remove("hidden");
      }
    }
  }
}

$(document).ready(function () {
  // Инициализация первого слайдера (slider-vit)
  if ($(".slider-vit").length > 0) {
    $(".slider-vit").slick({
      dots: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 3000,
      slidesToShow: 3,
      responsive: [
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
  }
});

//скрипт для второго слайдера
$(document).ready(function () {
  // Проверяем, существует ли элемент с классом "slider" на странице
  if ($(".slider-memories").length > 0) {
    // Инициализируем плагин slick на элементе с классом "slider"
    $(".slider-memories").slick({
      dots: true, // Показывать точки навигации
      infinite: true, // Бесконечный цикл прокрутки
      autoplay: true, // Автоматически переключать слайды
      autoplaySpeed: 3000, // Интервал в 3 секунды между переключениями
      slidesToShow: 5, // Показывать 5 слайдов одновременно
      responsive: [
        {
          breakpoint: 1400, // При ширине экрана до 1400px
          settings: {
            slidesToShow: 4, // Показывать 4 слайда одновременно
          },
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 381, // При ширине экрана до 381px
          settings: {
            slidesToShow: 1, // Показывать 1 слайд одновременно
          },
        },
      ],
    });
  }
});

function menuToggle() {
  const menu = document.querySelector(".menu_list_480"); // Меню
  const menuButton = document.querySelector(".menu_toggler"); // Кнопка переключения

  if (menu && menuButton) {
    menu.classList.toggle("opened"); // Переключение класса для меню
    menuButton.classList.toggle("opened"); // Переключение класса для кнопки
  } else {
    console.error("Элементы меню или кнопки не найдены");
  }
}
// кнопка развернуть на весь экран

function toggleFullscreen() {
  const scene = document.getElementById("scene");
  if (!document.fullscreenElement) {
    scene.requestFullscreen().catch((err) => {
      console.warn(
        `Ошибка при переключении в полноэкранный режим: ${err.message}`
      );
    });
  } else {
    document.exitFullscreen();
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const mainContainer = document.querySelector(".main");

  mainContainer.addEventListener("click", (event) => {
    const playBtn = event.target.closest(".play-audio-button");

    if (!playBtn) return;

    const parentBlock = playBtn.closest(".main_text");

    const audio = parentBlock.querySelector("audio");

    if (audio.paused) {
      audio.play();
      playBtn.textContent = "⏸ Остановить";
    } else {
      audio.pause();
      playBtn.textContent = "🎧 Прослушать";
    }
  });
});

// Находим контейнер для года
const yearContainer = document.querySelector("#year");
// Устанавливаем текущий год в контейнер

yearContainer.innerHTML = new Date().getFullYear();

const lightbox = GLightbox({
  touchNavigation: true,
  loop: true,
});

// Этот блок кода отвечает за обработку кликов внутри контейнера с классом 'container_events'.
// выше реализовано то же самое, но через класс.
// const containerEvents = document.querySelector(".container_events");

// containerEvents.addEventListener("click", (event) => {
//   const item = event.target;

//   // Найти ближайший родительский элемент с классом 'button'
//   const button = item.classList.contains("button")
//     ? item
//     : item.closest(".button");
//   const parentBlock = item.closest(".event");

//   // Если нашли кнопку, добавить класс для отображения текста
//   if (button) {
//     parentBlock.classList.add("event_text_visible");
//   }

//   // Если кликнули по кнопке закрытия текста
//   if (item.classList.contains("close-button")) {
//     parentBlock.classList.remove("event_text_visible");
//   }
// });

// конструктор для одной страницы events
// class ShowHide {
//   constructor(container) {
//     this.container = container;
//     this.setEvListener();
//   }

//   setEvListener() {
//     this.container.addEventListener("click", (event) =>
//       this.processClick(event)
//     );
//   }
//   processClick(event) {
//     const item = event.target;

//     const button = item.classList.contains("button")
//       ? item
//       : item.closest(".button");

//     const parentBlock = item.closest(".event");

//     // Проверяем, открыт ли уже какой-то блок
//     const openBlock = this.container.querySelector(".event_text_visible");

//     // Если есть открытый блок и это не текущий блок, не открываем другой блок
//     if (button && !openBlock) {
//       parentBlock.classList.add("event_text_visible");
//     }

//     // Закрываем текущий блок при нажатии на крестик
//     if (item.classList.contains("close-button")) {
//       parentBlock.classList.remove("event_text_visible");
//     }
//   }
// }

// const containerElement = document.querySelector(".container_events");
// new ShowHide(containerElement);

// console.log(document.querySelectorAll(".text_container")); // Должно вывести все контейнеры
// console.log(document.querySelectorAll(".button")); // Должно вывести все кнопки

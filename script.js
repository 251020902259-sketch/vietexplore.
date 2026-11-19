
// 1. DARK MODE
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    const icon = themeToggle.querySelector("i");

    if (document.body.classList.contains("dark-mode")) {
        icon.className = "bi bi-sun-fill";
    } else {
        icon.className = "bi bi-moon-stars-fill";
    }
});

// 2. SEARCH AND FILTER
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const destinationItems = document.querySelectorAll(".destination-item");
const noResults = document.getElementById("noResults");

let currentFilter = "all";

function filterDestinations() {
    const keyword = searchInput.value
        .toLowerCase()
        .trim();

    let count = 0;

    destinationItems.forEach(function (item) {
        const region = item.dataset.region;
        const content = item.textContent.toLowerCase();

        const matchesRegion =
            currentFilter === "all" || region === currentFilter;

        const matchesSearch = content.includes(keyword);

        if (matchesRegion && matchesSearch) {
            item.style.display = "";
            count++;
        } else {
            item.style.display = "none";
        }
    });

    noResults.hidden = count !== 0;
}

searchInput.addEventListener("input", filterDestinations);

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");
        currentFilter = button.dataset.filter;

        filterDestinations();
    });
});

// 3. CONTACT FORM VALIDATION
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
        showMessage("Vui lòng nhập đầy đủ thông tin!", "red");
        return;
    }

    if (!emailPattern.test(email)) {
        showMessage("Email không đúng định dạng!", "red");
        return;
    }

    showMessage("Gửi thông tin thành công! Cảm ơn bạn.", "green");

    contactForm.reset();
});

function showMessage(message, color) {
    formMessage.textContent = message;
    formMessage.style.color = color;
}

// 4. BACK TO TOP
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// 5. DESTINATION DETAIL
document.querySelectorAll(".btn-detail").forEach(function (button) {
    button.addEventListener("click", function () {
        const place = button.dataset.place;

        alert(
            "Bạn đang khám phá " + place +
            ". Hãy tiếp tục hành trình cùng VietExplore!"
        );
    });
});

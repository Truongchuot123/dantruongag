    function toggleBox(header) {
      const content = header.nextElementSibling;
      content.style.display = content.style.display === "block" ? "none" : "block";
    }
//Lấy h1 làm menu
document.addEventListener("DOMContentLoaded", function () {
  const headers = document.querySelectorAll("section h1");
  const container = document.getElementById("toc-container");
  const seenSections = JSON.parse(localStorage.getItem("seenSections") || "{}");

  // Tạo nút tiêu đề xổ xuống
  const accordionHeader = document.createElement("button");
  accordionHeader.textContent = "📚 MỤC LỤC";
  Object.assign(accordionHeader.style, {
    backgroundColor: "#4a148c",
    color: "white",
    padding: "12px 20px",
    width: "100%",
    fontSize: "18px",
    border: "none",
    textAlign: "left",
    cursor: "pointer",
    outline: "none",
    borderRadius: "6px 6px 0 0"
  });

  // Tạo danh sách nội dung
  const list = document.createElement("ul");
  list.style.listStyle = "none";
  list.style.padding = "0";
  list.style.margin = "0";
  list.style.maxHeight = "0";
  list.style.overflow = "hidden";
  list.style.transition = "max-height 0.3s ease-out";
  list.style.border = "1px solid #ccc";
  list.style.borderTop = "none";
  list.style.borderRadius = "0 0 6px 6px";
  list.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
  list.style.background = "#fff";

  // Toggle xổ xuống
  accordionHeader.addEventListener("click", function () {
    if (list.style.maxHeight && list.style.maxHeight !== "0px") {
      list.style.maxHeight = "0";
    } else {
      list.style.maxHeight = list.scrollHeight + "px";
    }
  });

  // Tạo các mục
  const items = [];
  headers.forEach((h1, index) => {
    const section = h1.closest("section");
    const id = `section-${index}`;
    section.setAttribute("id", id);

    const item = document.createElement("li");
    item.dataset.id = id;
    item.style.padding = "12px 16px";
    item.style.borderBottom = "1px solid #eee";
    item.style.display = "flex";
    item.style.justifyContent = "space-between";
    item.style.alignItems = "center";
    item.style.cursor = "pointer";

    const title = document.createElement("span");
    title.textContent = h1.textContent;
    title.style.color = "#4a148c";

    const check = document.createElement("span");
    check.textContent = "✓";
    check.style.color = "green";
    check.style.fontWeight = "bold";
    check.style.display = seenSections[id] ? "inline" : "none";

    item.appendChild(title);
    item.appendChild(check);

    item.onclick = () => {
      document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    };

    items.push({ element: item, id, check });
    list.appendChild(item);
  });

  container.appendChild(accordionHeader);
  container.appendChild(list);

  // Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const itemObj = items.find(item => item.id === id);
      if (entry.isIntersecting && itemObj && !seenSections[id]) {
        seenSections[id] = true;
        itemObj.check.style.display = "inline";
        localStorage.setItem("seenSections", JSON.stringify(seenSections));
      }
    });
  }, { threshold: 0.5 });

  headers.forEach((h1, i) => {
    const section = h1.closest("section");
    observer.observe(section);
  });
});

function Navbar({
  $page,
  initialState,
  onCreate,
  onToggle,
  onDelete,
  onSelect,
}) {
  const $navbar = document.createElement("div");
  $page.appendChild($navbar);

  this.state = initialState;
  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { selected, documentList, toggleData } =
      this.state;
    const paintList = (documents, depth = 0) =>
      `<ul>${documents
        .map(item => {
          const isParent = item.documents.length > 0;
          const isToggled = toggleData.find(
            data => data.id == item.id
          ).toggle;
          return `<li data-id="${item.id}">
          <div class="item ${
            item.id == selected ? "selected" : ""
          }" style="--depth: ${depth}">
            <div class="btn-container ${
              isToggled ? "toggled" : ""
            }" data-action="toggle">
              <i class="fa-solid fa-chevron-right"></i>
            </div>
            <div class="item-title" style="--depth: ${depth}">${
            item.title.length ? item.title : "제목 없음"
          }</div>
            <div class="item-btn-group">
              <div class="btn-container" data-action="add">
                <i class="fa-solid fa-plus"></i>
              </div>
              <div class="btn-container" data-action="delete">
                <i class="fa-solid fa-minus"></i>
              </div>
            </div>
          </div>
        ${
          isParent && isToggled
            ? paintList(item.documents, depth + 1)
            : ""
        }</li>`;
        })
        .join("")}</ul>`;
    $navbar.innerHTML = paintList(documentList);
    $navbar.classList.add("list-section");
  };

  this.render();

  $navbar.addEventListener("click", e => {
    const $li = e.target.closest("li");
    const { id } = $li.dataset;
    const action =
      e.target.dataset.action ||
      e.target.parentNode.dataset.action;
    switch (action) {
      case "toggle":
        onToggle(id);
        break;
      case "add":
        onCreate(id);
        break;
      case "delete":
        onDelete(id);
        break;
      default:
        onSelect(id);
    }
  });

  $navbar.addEventListener("scroll", () => {
    if ($navbar.scrollTop > 0) {
      $navbar.classList.add("scroll-shadow");
    } else {
      $navbar.classList.remove("scroll-shadow");
    }
  });
}

export default Navbar;

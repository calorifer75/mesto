class Section {
  constructor({ defaultItems, renderItemCallback }, containerSelector) {
    this._defaultItems = defaultItems;
    this._renderItemCallback = renderItemCallback;
    this._container = document.querySelector(containerSelector);
  }

  // добавляет готовый элемент разметки в контейнер
  addItem(element) {
    this._container.append(element);
  }

  // генерирует исходные элементы по умолчанию
  renderDefaultItems() {
    this._container.innerHTML = '';

    this._defaultItems.forEach(item => {
      const element = this._renderItemCallback(item);
      this.addItem(element);
    });
  }
}

export default Section;

class Section {
  constructor(renderItemCallback, containerSelector) {
    this._renderItemCallback = renderItemCallback;
    this._container = document.querySelector(containerSelector);
  }

  // добавляет готовый элемент разметки в контейнер
  addItem(element) {
    this._container.append(element);
  }

  // генерирует элементы
  renderItems(items) {
    this._container.innerHTML = '';

    items.forEach(item => {
      const element = this._renderItemCallback(item);
      this.addItem(element);
    });
  }
}

export default Section;

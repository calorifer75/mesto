class Section {
  constructor(renderItemCallback, containerSelector) {
    this._renderItemCallback = renderItemCallback;
    this._container = document.querySelector(containerSelector);
  }

  // добавляет готовый элемент разметки в начало контейнера
  addItemPrepend(element) {
    this._container.prepend(element);
  }

  // добавляет готовый элемент разметки в конец контейнера
  addItemAppend(element) {
    this._container.append(element);
  }

  // генерирует элементы
  renderItems(items) {
    this._container.innerHTML = '';

    items.forEach(item => {
      const element = this._renderItemCallback(item);
      this.addItemAppend(element);
    });
  }
}

export default Section;

# Виджет для вывода документом inform.uscapital

### Подкулючение

`<script src="https://inform.uscapital.ru/widget.js"></script>`
```
documentWidget.load({
  companyDirectory: '{Название дериктории компании}',
});
```

Список доступных компаний и типов документом можно попсмотреть на [inform.uscapital.ru](https://inform.uscapital.ru)

### Пример основной структуры параметров JSON документа

```
[
  {
    TYPE: "Тип документа",
    PATH: "Ссылка на документ",
    ORIGIN: "Наименование документа"
  },
]
```

### Пример основной структуры виджета

```
<div class="document-widget_block">
  <div class="document-widget_wrapper" data-document_type="buh_otczetnost">
    <div class="document-widget_item">
      <a href="">
        <span data-param="ORIGIN"></span>
        Скачать
      </a>
    </div>
  </div>
  <div class="document-widget_wrapper" data-document_type="otczetnost">
    <div class="document-widget_item">
    </div>
  </div>
</div>
```

Класс `document-widget_block` является основным для вывода инфромации. В нем скрипт ишет блок с классом `document-widget_wrapper`. В нем задаем data атрибут `data-document_type` и вписываем желаемый тип (тип можно взять из json файла или на [inform.uscapital.ru](http://inform.uscapital.ru)).
Далее скрип ищет блок с классом `document-widget_item`. На его основе формируются блоки для вывода информации из json.

#### Если в блоке `document-widget_item` нет контента.

В этом случае скрипт создаcт стандартный элемент `<a href="{PATH}">{ORIGIN}</a>`

#### Если в блоке `document-widget_item` есть контент.

Скрипт ищет элементы с атрибутом `data-param`. Если значение в атрибуте совпадает с параметром хранящемся в json, скрипт заменяет контент элемента на значение из json файла. Также скрипт ищет элемент с тегом `a`. В него записывается значение в атрибут `href` из параметра `PATH`.

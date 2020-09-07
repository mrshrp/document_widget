# Виджет для вывода документом inform.uscapital

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
  <div class="document-widget_wrapper" data-documetn_type="buh_otczetnost">
    <div class="document-widget_item">
      <a href="">
        <span data-param="ORIGIN"></span>
        Скачать
      </a>
    </div>
  </div>
</div>
```

Класс `document-widget_block` является основным для вывода инфромации. В нем скрипт ишет блок с классом `document-widget_wrapper`. В нем задает data атрибут `data-documetn_type` и вписываем желаемый тип (тип можно взять из json файла или на [info.uscapital.ru](http://info.uscapital.ru)).
Далее скрип ищет блок с классом `document-widget_item`. На основе него формируются блоки для вывода информации из json.

#### Если в блоке `document-widget_item` нет контента.

В этом случае скрипт создат стандартную структуру `<a href="{PATH}">{ORIGIN}</a>`

#### Если в блоке `document-widget_item` есть контента.

Скрипт ищет элементы с атрибутом `data-param`. Если значение в атрибуте совпадает со значение хранящемся в json, скрипт заменяет контент элемента на значение из json файла. Также скрипт ищет элемент с тегом `a`. В него записывается значение в атрибут `href` из параметра `PATH`.

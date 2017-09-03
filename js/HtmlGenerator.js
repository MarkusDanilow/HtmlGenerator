/**
 *  Created by Markus Danilow on 02.09.2017.
 *
 *  This library allows you to easily generate all kinds of HTML elements using JavaScript and jQuery.
 *  Notice: ECMAScript6 is required!
 *
 */
function HtmlGenerator() {
}


HtmlGenerator.elementTypes = {
    a: 'a',
    abbr: 'abbr',
    address: 'address',
    article: 'article',
    aside: 'aside',
    audio: 'audio',
    b: 'b',
    base: 'base',
    bdi: 'bdi',
    bdo: 'bdo',
    blockQuote: 'blockquote',
    body: 'body',
    br: 'br',
    button: 'button',
    canvas: 'canvas',
    code: 'code',
    cite: 'cite',
    column: {},
    dataList: 'datalist',
    description: {
        dd: 'dd',
        dl: 'dl',
        dt: 'dt'
    },
    del: 'del',
    details: 'details',
    dfn: 'dfn',
    dialog: 'dialog',
    div: 'div',
    em: 'em',
    embed: 'embed',
    fieldSet: 'fieldset',
    figure: {
        figCaption: 'figcaption',
        figure: 'figure'
    },
    footer: 'footer',
    form: 'form',
    headings: {
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        h4: 'h4',
        h5: 'h5',
        h6: 'h6'
    },
    head: 'head',
    header: 'header',
    hr: 'hr',
    html: 'html',
    i: 'i',
    iFrame: 'iframe',
    img: 'img',
    input: {
        input: 'input',
        button: 'button',
        checkBox: 'checkbox',
        color: 'color',
        date: 'date',
        dateTimeLocal: 'datetime-local',
        eMail: 'email',
        file: 'file',
        hidden: 'hidden',
        image: 'image',
        month: 'month',
        number: 'number',
        password: 'password',
        radio: 'radio',
        range: 'range',
        reset: 'reset',
        search: 'search',
        submit: 'submit',
        tel: 'tel',
        text: 'text',
        time: 'time',
        url: 'url',
        week: 'week'
    },
    ins: 'ins',
    kbd: 'kbd',
    keyGen: 'keygen',
    label: 'label',
    legend: 'legend',
    list: {
        li: 'li',
        ul: 'ul',
        ol: 'ol'
    },
    link: 'link',
    main: 'main',
    map: {
        area: 'area',
        map: 'map'
    },
    mark: 'mark',
    menu: {
        menu: 'menu',
        menuItem: 'menuitem'
    },
    meta: 'meta',
    meter: 'meter',
    nav: 'nav',
    noScript: 'noscript',
    object: 'object',
    select: {
        select: 'select',
        option: 'option',
        optGroup: 'optgroup'
    },
    p: 'p',
    param: 'param',
    picture: 'picture',
    pre: 'pre',
    progress: 'progress',
    quote: 'q',
    rp: 'rp',
    rt: 'rt',
    ruby: 'ruby',
    s: 's',
    samp: 'samp',
    script: 'script',
    section: 'section',
    small: 'small',
    source: 'source',
    span: 'span',
    strong: 'strong',
    style: 'style',
    sub: 'sub',
    summary: 'summary',
    sup: 'sup',
    table: {
        caption: 'caption',
        table: 'table',
        tBody: 'tbody',
        td: 'td',
        th: 'th',
        tr: 'tr',
        tFoot: 'tfoot',
        tHead: 'thead',
        col: 'col',
        colGroup: 'colgroup'
    },
    textArea: 'textarea',
    time: 'time',
    title: 'title',
    u: 'u',
    var: 'var',
    video: 'video',
    wbr: 'wbr'
};

/**
 *
 * @param obj
 * @returns {number}
 */
HtmlGenerator.getObjectSize = (obj) => {
    let size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

/**
 *
 * @param arr
 * @returns {{}}
 */
HtmlGenerator.convertArrayToObject = (arr) => {
    let obj = {};
    if (arr && arr.length && arr.length > 0) {
        $.each(arr, (k, v) => {
            obj[k] = {value: v};
        });
    } else if (arr && !arr.length)
        obj = arr;
    return obj;
};

/**
 *
 * @param parent
 * @param child
 * @param appendFlag
 * @returns {*}
 */
HtmlGenerator.addToParent = (parent, child, appendFlag) => {
    if (parent) {
        if (appendFlag) parent.append(child);
        else parent.prepend(child);
    }
    return child;
}

/**
 * @param parent
 * @param commentMessage
 * @param appendFlag
 * @returns {jQuery|HTMLElement}
 */
HtmlGenerator.generateComment = (parent, commentMessage, appendFlag) => {
    let comment = $(document.createComment(commentMessage));
    return HtmlGenerator.addToParent(parent, comment, appendFlag);
};

/**
 *
 * @param parent
 * @param elementType
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateBasicHtmlElement = (parent, elementType, id, clazz, appendFlag, attributes = {}) => {
    if (!elementType) return null;
    if (!id) id = '';
    if (!clazz) clazz = '';
    let element = $(document.createElement(elementType));
    if (id.length > 0)
        element.attr('id', id);
    if (clazz.length > 0)
        element.addClass(clazz);
    if (attributes) {
        $.each(attributes, (attrName, attrValue) => {
            if (attrName.indexOf('text') > -1)
                element.text(attrValue);
            else if (attrName.indexOf('html') > -1)
                element.html(attrValue);
            else if (attrName.indexOf('clazz') > -1)
                element.addClass(attrValue);
            else
                element.attr(attrName, attrValue);
        });
    }
    return HtmlGenerator.addToParent(parent, element, appendFlag);
};

/**
 *
 * @param parent
 * @param elementType
 * @param appendFlag
 * @param attributeList
 * @param generateFn
 */
HtmlGenerator.generateInnerElements = (parent, elementType, appendFlag, attributeList = {}, generateFn = (parent, id, clazz, appendFlag, elementAttributes = {}) => {
}) => {
    if (attributeList) {
        $.each(attributeList, (k, attributes) => {
            let elementId = null;
            let clazz = null;
            if (attributes.id) elementId = attributes.id;
            if (attributes.clazz) clazz = attributes.clazz;
            if (generateFn && typeof generateFn === 'function')
                generateFn(parent, elementId, clazz, appendFlag, attributes);
            else
                HtmlGenerator.generateBasicHtmlElement(parent, elementType, elementId, clazz, appendFlag, attributes);
        });
    }
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateHyperlink = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.a, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateAbbreviation = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.abbr, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateAddress = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.address, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateArea = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.map.area, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateArticle = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.article, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateAside = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.aside, id, clazz, appendFlag, attributes);
};

HtmlGenerator.generateAddress = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.address, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @param sources
 * @returns {*}
 */
HtmlGenerator.generateAudio = (parent, id, clazz, appendFlag, attributes = {}, sources = {}) => {
    let audio = HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.audio, id, clazz, appendFlag, attributes);
    HtmlGenerator.generateInnerElements(audio, null, true, sources, HtmlGenerator.generateSource);
    return audio;
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateSource = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.source, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateBoldText = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.b, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateBaseLink = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.base, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateBiDirectionalIsolation = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.bdi, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateBiDirectionalOverride = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.bdo, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateBlockQuote = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.blockQuote, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateBody = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.body, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateLineBreak = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.br, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateButton = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.button, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateCanvas = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.canvas, id, clazz, appendFlag, attributes);
};


/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateCite = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.cite, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateCode = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.code, id, clazz, appendFlag, attributes);
};

//region TABLE DEFINITIONS AND EVERYTHING THAT HAS TO DO WITH TABLES

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateCaption = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.table.caption, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateCol = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.table.col, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @param cols
 * @returns {*}
 */
HtmlGenerator.generateColGroup = (parent, id, clazz, appendFlag, attributes = {}, cols = {}) => {
    let group = HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.table.colGroup, id, clazz, appendFlag, attributes);
    HtmlGenerator.generateInnerElements(group, null, true, cols, HtmlGenerator.generateCol);
    return group;
};
//endregion

//region DROP DOWN MENU DEFINITIONS [Selects, Options, Data lists,...]
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @param options
 * @param inputAttributes
 * @returns {*}
 */
HtmlGenerator.generateDataList = (parent, id, clazz, appendFlag, attributes = {}, options = {}, inputAttributes = {}) => {
    let list = HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.dataList, id, clazz, appendFlag, attributes);
    HtmlGenerator.generateInnerElements(list, null, true, HtmlGenerator.convertArrayToObject(options), HtmlGenerator.generateOption);
    HtmlGenerator.generateInput(parent, null, null, true, inputAttributes);
    return list;
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateOption = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.select.option, id, clazz, appendFlag, attributes);
};
//endregion

//region INPUT FIELD DEFINITIONS
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateInput = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.input.input, id, clazz, appendFlag, attributes);
};
//endregion

//region DESCRIPTION LIST DEFINITION
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateDescriptionValue = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.description.dd, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateDescriptionTerm = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.description.dt, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateDescriptionList = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.description.dl, id, clazz, appendFlag, attributes);
};
//endregion

//region DETAILS DEFINITION
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateDetails = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.details, id, clazz, appendFlag, attributes);
};
//endregion

//region DEFINING INSTANCE DEFINITION
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateDefiningInstance = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.dfn, id, clazz, appendFlag, attributes);
};
//endregion

//region DIALOG DEFINITION
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateDialog = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.dialog, id, clazz, appendFlag, attributes);
};
//endregion

//region DIV CONTAINER DEFINITION
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateDiv = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.div, id, clazz, appendFlag, attributes);
};
//endregion

//region TEXT MODIFICATION DEFINITIONS [Deleted, Inserted, Emphasized]
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateDeletedText = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.del, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateInsertedText = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.ins, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateEmphasizedText = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.em, id, clazz, appendFlag, attributes);
};
//endregion

//region EMBEDDED ELEMENTS DEFINITIONS
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateEmbeddedElement = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.embed, id, clazz, appendFlag, attributes);
};
//endregion

//region FIELD SET DEFINITIONS
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateFieldSet = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.fieldSet, id, clazz, appendFlag, attributes);
};
//endregion

//region FIGURE DEFINITIONS
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @param imgAttributes
 * @param figCaptionAttributes
 * @returns {*}
 */
HtmlGenerator.generateFigure = (parent, id, clazz, appendFlag, attributes = {}, imgAttributes = {}, figCaptionAttributes = {}) => {
    let figure = HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.figure.figure, id, clazz, appendFlag, attributes);
    HtmlGenerator.generateImage(figure, null, null, true, imgAttributes);
    HtmlGenerator.generateFigureCaption(figure, null, null, true, figCaptionAttributes);
    return figure;
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateFigureCaption = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.figure.figCaption, id, clazz, appendFlag, attributes);
};
//endregion

//region IMAGE DEFINITIONS
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateImage = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.img, id, clazz, appendFlag, attributes);
};
//endregion

//region FOOTER DEFINITIONS
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateFooter = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.footer, id, clazz, appendFlag, attributes);
};
//endregion

//region FORM DEFINITIONS
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateForm = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.form, id, clazz, appendFlag, attributes);
};
//endregion

//region HEADING DEFINITIONS
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateHeading = (parent, id, clazz, appendFlag, attributes = {}) => {
    if (!attributes.type || attributes.type.length !== 2) return null;
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.headings[attributes.type], id, clazz, appendFlag, attributes);
};
//endregion

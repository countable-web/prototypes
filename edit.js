APP = {
    target: null
}

const WRAP = document.querySelector("body>.wrap")
WRAP.innerHTML = localStorage.h || '';
const EDIT = document.getElementById('edit');
const CONTENT_TAGS = ['P','UL','OL','FORM','H1','H2','H3']
const EL_KIND_MAP = {
    BODY: ['ROW','CONTAINER','WRAP'],
    ROW: ['COL'],
    CONTAINER: ['ROW'].concat(CONTENT_TAGS),
    WRAP: ['ROW', 'CONTAINER'].concat(CONTENT_TAGS),
    FORM: ['INPUT', 'SELECT', 'TEXTAREA'],
    COL: ['ROW'].concat(CONTENT_TAGS)
}
APP.set_target = (el) => {

    APP.target = el;
    document.querySelectorAll('[data-target]').forEach((el) => {
        el.removeAttribute('data-target')
    })
    APP.target.setAttribute('data-target', true);

    let kind= (APP.target.className || APP.target.tagName).toUpperCase()
    let h='<h3>' + kind + '</h3>';

    (EL_KIND_MAP[kind] || []).forEach((t)=>{
        h += "<button onclick='add_el(t)'>" + t + "</button>";
    })
    h += "<hr>"
    if (CONTENT_TAGS.indexOf(kind) > -1) {
        h += "<textarea onchange='update_text(event)'>" + APP.target.innerHTML + "</textarea>"
    }
    EDIT.innerHTML = h;
}
APP.set_target(WRAP);

const update_text = (e) => {
    APP.target.innerHTML = e.target.value
}

APP.toggle = (attr, values) => {
    let idx = values.indexOf(APP.target.style[attr]) + 1
    idx = idx % values.length
    APP.target.style[attr] = values[idx]
}

const add_el = (kind)=>{
    console.log('adding', kind);
    if (CONTENT_TAGS.indexOf(kind) > -1) {
        tag_name = kind;
        class_name = null;
    } else {
        tag_name = 'div';
        class_name = kind;
    }
        let latest = document.createElement(tag_name)
        if (class_name) latest.className = class_name;
        APP.target.appendChild(latest)
        console.log(latest);
        localStorage.h = WRAP.innerHTML
}

document.addEventListener('keyup', function(e) {
    let which = e.keyCode || e.which;
    console.log(e.which)
    if (which == 65) {

    }
    if (which == 70) {
        APP.toggle('position', ['absolute', 'fixed', 'static'])
    }

}, true);
WRAP.addEventListener('click', function(e) {
    console.log('selecting', e.target);
    APP.set_target(e.target);

}, true);


// D&D
document.addEventListener('mousedown', dragMouseDown, true);


var X = 0,
    Y = 0,
    XX = 0,
    YY = 0;

function dragMouseDown(e) {

    // get the mouse cursor position at startup:
    X = e.clientX;
    Y = e.clientY;
    XX = APP.target.offsetLeft
    YY = APP.target.offsetTop
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
}

function elementDrag(e) {

    // set the element's new position:
    APP.target.style.left = e.clientX + XX - X + "px";
    APP.target.style.top = e.clientY + YY - Y + "px";

}

function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
}

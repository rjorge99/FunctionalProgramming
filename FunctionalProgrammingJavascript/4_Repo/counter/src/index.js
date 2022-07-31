// import h from 'hyperscript';
import hh from 'hyperscript-helpers';
import { h, diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';

const { div, button } = hh(h);
const initModel = 0;

// Pure -> initModel, update(), view()
// Impure -> State, Side Effect (DOM)

// Returns the html and css that should be rendered based on the state
function view(model, dispatch) {
    return div([
        div({ className: 'mv2' }, `Count: ${model}`),
        button({ className: 'pv1 ph2 mr2', onclick: () => dispatch(1) }, '+'),
        button({ className: 'pv1 ph2', onclick: () => dispatch(-1) }, '-')
    ]);
}

// Returns a new model
function update(model, value) {
    return model + value;
}

// ------------- Impure code below -------------
function app(initModel, update, view, node) {
    let model = initModel;
    let currentView = view(model, dispatch);
    let rootNode = createElement(currentView);
    node.appendChild(rootNode);

    function dispatch(value) {
        model = update(model, value);
        const updatedView = view(model, dispatch);
        const patches = diff(currentView, updatedView);
        rootNode = patch(rootNode, patches);
        currentView = updatedView;
    }
}

const rootNode = document.getElementById('app');
app(initModel, update, view, rootNode);

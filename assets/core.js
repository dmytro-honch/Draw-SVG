const rootEl = document.querySelector('#root');

const wrapperEl = document.createElement('div');
wrapperEl.classList.add('wrapper');
rootEl.appendChild(wrapperEl);

const askSection = document.createElement('div');
askSection.classList.add('viewbox-wrapper');
wrapperEl.appendChild(askSection);

const viewBoxText = document.createElement('p');
viewBoxText.textContent = 'Enter viewBox value "X0 Y0 X1 Y1" and click Apply.';
askSection.appendChild(viewBoxText);

const viewBoxInput = document.createElement('input');
viewBoxInput.type = 'text';
viewBoxInput.classList.add('viewbox-input');
viewBoxInput.setAttribute('id', 'viewbox-input');
viewBoxInput.value = '0 0 512 512';
askSection.appendChild(viewBoxInput);

let ns = 'http://www.w3.org/2000/svg';
let svg = document.createElementNS(ns, 'svg');
let pathOne = document.createElementNS(ns,'path');

let svgCreator = {
  svg: function(el, id, w, h, v) {
    el.setAttribute('id', id);
    el.setAttribute('class', id);
    el.setAttribute('width', w);
    el.setAttribute('height', h);
    el.setAttribute('viewBox', v);
  },
  path: function(el, parrent, id, d) {
    el.setAttribute('id', id);
    el.setAttribute('class', id);
    el.setAttribute('d', d);
    parrent.appendChild(el);
  },
  points: [],
  addPoints: function(x, y) {
    svg.addEventListener('click', (event) => {
      let x = event.offsetX;
      let y = event.offsetY;
      console.log(`${x} + ${y}`);

      this.points.push(`L ${x} ${y}`);
      console.log(svgCreator.points);

      this.draw();
    });
  },
  draw: function(args) {
    this.path(pathOne, svg, 'path-one', `M 0 0 ${this.points.join(' ')}`);
  }
};

const viewBoxBtn = document.createElement('button');
viewBoxBtn.classList.add('viewbox-btn');
viewBoxBtn.textContent = 'Apply';
askSection.appendChild(viewBoxBtn);
viewBoxBtn.addEventListener('click', function(event) {
  let inputValue = viewBoxInput.value;
  let arr = inputValue.split(' ');

  svgCreator.viewBox = inputValue;
  svgCreator.width = arr[2];
  svgCreator.height = arr[3];

  svgCreator.svg(svg, 'svg-root', svgCreator.width, svgCreator.height, svgCreator.viewBox);
  wrapperEl.appendChild(svg);
  svgCreator.addPoints();

  viewBoxInput.remove();
  viewBoxText.remove();
  viewBoxBtn.remove();
});
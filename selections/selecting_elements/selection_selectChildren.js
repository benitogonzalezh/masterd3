let firstSvg = d3.select('svg').selectChildren();
console.log(firstSvg);

let secondSvg = d3.select('svg:nth-of-type(2)').selectChildren();
console.log(secondSvg);

let allSvg = d3.selectAll('svg').selectChildren();
console.log(allSvg);

d3.select('svg').selectChildren(function (c,i,cn) {
  console.log(c);
  console.log(i);
  console.log(cn);
})

d3.selectAll('svg').seelctChildren(function (c,i,cn) {
  console.log(c);
  console.log(i);
  console.log(cn);
})
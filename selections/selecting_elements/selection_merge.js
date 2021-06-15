let allCSvg1 = d3.selectAll('#svg1 circle');
console.log(allCSvg1);

let allCSvg2 = d3.selectAll('#svg2 circle');
console.log(allCSvg2);

let allCSvg1Odd = allCSvg1.select(function (d, i, n) {
  if (i % 2 == 0){
    this.style.fill = 'indianred';
    return this;
  } else {
    return null;
  }
})
console.log(allCSvg1Odd);

let allCSvg1Even = allCSvg1.select(function (d, i, n) {
  if (i % 2 == 0){
    return null;
  } else {
    this.style.fill = 'pink';
    return this;
  }
})
console.log(allCSvg1Even);

let allCSvg1OddEven = allCSvg1Odd.merge(allCSvg1Even);
console.log(allCSvg1OddEven);

let allCSvg = allCSvg1.merge(allCSvg2);
console.log(allCSvg);

let allCSvg2Odd = allCSvg2.select(function (d, i, n) {
  if (i % 2 == 0){
    this.style.fill = 'blue';
    return this;
  } else {
    return null;
  }
})
console.log(allCSvg2Odd);

let allCSvg2Even = allCSvg2.select(function (d, i, n) {
  if (i % 2 == 0){
    return null;
  } else {
    this.style.fill = 'green';
    return this;
  }
})
console.log(allCSvg2Even);

let svg1Msvg2 = allCSvg1Even.merge(allCSvg1Odd);
console.log(svg1Msvg2);

let svg2Msvg1 = allCSvg2Even.merge(allCSvg1Odd);
console.log(svg2Msvg1);


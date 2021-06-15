let fordData = [
  {
    quarter: 'Q1',
    year: 2018,
    truck: 109276,
    suv: 82395,
    car: 52635,
  },
  {
    quarter: 'Q2',
    year: 2018,
    truck: 100683,
    suv: 84617,
    car: 45335,
  },
  {
    quarter: 'Q3',
    year: 2018,
    truck: 93408,
    suv: 66884,
    car: 37112,
  },
  {
    quarter: 'Q4',
    year: 2018,
    truck: 106599,
    suv: 79225,
    car: 34950,
  },
  {
    quarter: 'Q1',
    year: 2019,
    truck: 278898,
    suv: 213086,
    car: 98265,
  },
  {
    quarter: 'Q2',
    year: 2019,
    truck: 324243,
    suv: 215898,
    car: 110195,
  },
  {
    quarter: 'Q3',
    year: 2019,
    truck: 309920,
    suv: 193100,
    car: 77231,
  },
  {
    quarter: 'Q4',
    year: 2019,
    truck: 330075,
    suv: 208387,
    car: 63400,
  },
];

let years = new Set();
fordData.forEach((d) => {
  years.add(d.year);
});

years = Array.from(years);
let yearlyData = [];
years.forEach((year) => {
  let yearSum = 0;
  fordData.forEach((d) => {
    if (d.year == year) {
      yearSum += d.truck + d.suv + d.car;
    }
  });
  yearlyData.push(yearSum);
});

d3.select('#gen-info').on('click', function (e, d) {

  document.getElementById('gen-info').disabled = true;

  d3.select('#years p').text('Number of Vehicles');
  const yearSvg = d3.select('#years svg').selectAll('rect');

  yearSvg
    .data(yearlyData)
    .join('rect')
    .attr('x', '0')
    .attr('y', (d, i) => {
      return (document.querySelector('#years svg').clientHeight / 4) * (i + 1);
    })
    .attr('height', (d, i) => {
      return document.querySelector('#years svg').clientHeight / 4 - 5;
    })
    .attr('width', (d) => d / 10000)
    .attr('id', (d, i) => `${years[i]}`)
    .style('fill', (d, i) => {
      if (i == 0) {
        return 'steelblue';
      } else {
        return 'dodgerblue';
      }
    })
    .style('cursor', 'pointer');

  yearSvg
    .data(yearlyData)
    .join('text')
    .attr('x', (d) => d / 10000 + 10)
    .attr('y', (d, i) => {
      return (
        (document.querySelector('#years svg').clientHeight / 4) * (i + 1) +
        document.querySelector('#years svg').clientHeight / 4 / 2
      );
    })
    .text((d, i) => `${years[i]}-${d}`)
    .style('font-size', '12')
    .style('font-weight', '500')
    .style('fill', 'gray');

  d3.select('#quarters p').text('Click on a year bar for more details');

  d3.select('#years')
    .selectAll('rect')
    .on('click', function (e, d) {
      console.log(e);
      d3.select('#quarters p').text(`${this.id}: Quarterly Break-Up`);

      let quarterlyData = [];
      fordData.forEach((d) => {
        if (e.target.id == d.year) {
          quarterlyData.push(d);
        }
      });

      const quartersSvg = d3.select('#quarters svg').selectAll('rect');

      quartersSvg
        .data(quarterlyData)
        .join('rect')
        .attr('x', '0')
        .attr('y', (d, i) => {
          return (
            (document.querySelector('#quarters svg').clientHeight / 6) * (i + 1)
          );
        })
        .attr('height', () => {
          return document.querySelector('#quarters svg').clientHeight / 6 - 5;
        })
        .attr('width', (d) => {
          return (d.truck + d.suv + d.car) / 1500;
        })
        .attr('id', (d) => `${d.quarter}`)
        .style('fill', 'skyblue')
        .style('cursor', 'pointer');

      d3.select('#quarters svg')
        .selectAll('text')
        .data(quarterlyData)
        .join('text')
        .attr('x', (d) => (d.truck + d.suv + d.car) / 1500 + 10)
        .attr('y', (d, i) => {
          return (
            (document.querySelector('#quarters svg').clientHeight / 6) * (i + 1) +
            document.querySelector('#quarters svg').clientHeight / 6 / 2
          );
        })
        .text((d, i) => `${d.quarter}-${d.truck + d.suv + d.car}`)
        .style('font-size', '12')
        .style('font-weight', '500')
        .style('fill', 'gray');

      d3.select('·vehicles p').text('Hover on a quarter bar for vehicle types');

      d3.select('#quarters svg')
        .selectAll('rect')
        .on('mouseenter', function (e, d) {
          d3.select('#vehicles p').text(
            `${d.year} | ${d.quarter}: Vehicle Type Break-Up`
          );

          d3.select('#vehicles svg')
            .selectAll('rect')
            .data([d.truck, d.suv, d.car])
            .join('rect')
            .attr('width', (d) => d / 1000)
            .attr('height', () => {
              return (
                document.querySelector('#vehicles svg').clientHeight / 5 - 5
              );
            })
            .attr('x', '0')
            .attr('y', (d, i) => {
              return (
                (document.querySelector('#vehicles svg').clientHeight / 5) *
                (i + 1)
              );
            })
            .style('fill', (d, i) => {
              if (i == 0) {
                return '#38ACEC';
              }
              if (i == 1) {
                return '#79BAEC';
              } else {
                return '#A0CFEC';
              }
            });

          d3.select('#vehicles svg')
            .selectAll('text')
            .data([d.truck, d.suv, d.car])
            .join('text')
            .attr('x', (d) => d / 1000 + 10)
            .attr('y', (d, i) => {
              return (
                (document.querySelector('#vehicles svg').clientHeight / 5) *
                  (i + 1) +
                document.querySelector('#vehicles svg').clientHeight / 5 / 2
              );
            })
            .text((d,i) => {
              if (i == 0) {
                return 'Truck | ' + d;
              }
              if (i == 1) {
                return 'SUV | ' + d;
              } else {
                return 'CARS | ' + d;
              }
            })
            .style('font-size', '12')
            .style('font-weight', '500')
            .style('fill', 'gray');
        });
    });
});

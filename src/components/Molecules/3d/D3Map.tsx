import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
//@ts-ignore
import * as topojson from 'topojson-client';

type D3MapProps = {
  setAttackCountries: (data: object) => void;
};

const D3Map: React.FC<D3MapProps> = ({ setAttackCountries }) => {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (ref.current) {
      init(ref.current);
    }

  }, [ref.current]);

  const init = (container: SVGSVGElement) => {
    const width = container.width.baseVal.value;
    const height = container.height.baseVal.value;

    // Create SVG container
    const svg = d3
      .select('svg[id="map"]')
      .attr('width', '100%')
      .attr('height', '100%')
      .style('background-color', 'transparent');

    // Set up map projection
    const projection = d3
      .geoMercator()
      .scale(200)
      .translate([2.1 * width, 4 * height]);

    const path = d3.geoPath().projection(projection);

    d3.json('https://unpkg.com/world-atlas@2.0.2/countries-110m.json').then((worldData: any) => {
      // @ts-ignore
      const countries: any = topojson.feature(worldData, worldData.objects.countries).features;

      svg
        .selectAll('path')
        .data(countries)
        .enter()
        .append('path')
        //@ts-ignore
        .attr('class', (d) => (d.id === '860' ? 'country country-target' : 'country'))
        //@ts-ignore
        .attr('d', path)
        //@ts-ignore
        .attr('id', (d) => d.id)
        .on('mouseover', function () {
          d3.select(this).attr('class', 'country country-hover');
        })
        .on('mouseout', function (d) {
          //@ts-ignore
          d3.select(this).attr('class', (d: any) =>
            d.id === '860' ? 'country country-target' : 'country'
          );
        });

      // const uzbekistanCoords = [69.2401, 41.2995]  //Tashkent;
      const uzbekistanCoords = [64.5853, 41.3775];

      const countriesPool = [
        { name: 'India', coords: [78.9629, 20.5937] },
        { name: 'Russia', coords: [105.3188, 61.524] }, // Main Russia
        { name: 'Siberia', coords: [102.0, 60.0] }, // Siberian region
        { name: 'Far East', coords: [140.0, 50.0] }, // Russian Far East region
        { name: 'China', coords: [104.1954, 35.8617] },
        { name: 'Italy', coords: [12.5674, 41.8719] },
        { name: 'Iran', coords: [53.688, 32.4279] },
        { name: 'Sudan', coords: [30.2176, 12.8628] },
        { name: 'Algeria', coords: [1.6596, 28.0339] },
        { name: 'Iraq', coords: [43.6793, 33.2232] },
        { name: 'Brazil', coords: [-51.9253, -14.235] },
        { name: 'Argentina', coords: [-63.6167, -38.4161] },
        { name: 'Canada', coords: [-106.3468, 56.1304] },
        { name: 'Australia', coords: [151.2093, -33.8688] },
        { name: 'Germany', coords: [10.4515, 51.1657] },
        { name: 'France', coords: [2.2137, 46.6034] },
        { name: 'United Kingdom', coords: [-3.435, 55.3781] },
        { name: 'Japan', coords: [138.2529, 36.2048] },
        { name: 'South Korea', coords: [127.7669, 35.9078] },
        { name: 'Egypt', coords: [30.8025, 26.8206] },
        { name: 'Turkey', coords: [35.2433, 38.9637] },
        { name: 'Nigeria', coords: [8.6753, 9.082] },
        { name: 'Kenya', coords: [37.9062, -1.2864] },
        { name: 'South Africa', coords: [22.9375, -30.5595] },
        { name: 'Vietnam', coords: [108.2772, 14.0583] },
        { name: 'Malaysia', coords: [101.9758, 4.2105] },
        { name: 'Philippines', coords: [120.9842, 12.8797] },
        { name: 'Thailand', coords: [100.9925, 15.87] },
        { name: 'Saudi Arabia', coords: [45.0792, 23.8859] },
        { name: 'Pakistan', coords: [69.3451, 30.3753] },
        { name: 'Bangladesh', coords: [90.3563, 23.685] },
        { name: 'Colombia', coords: [-74.2973, 4.5709] },
        { name: 'Peru', coords: [-75.0152, -9.19] },
        { name: 'Chile', coords: [-71.5385, -35.6751] },
        { name: 'Venezuela', coords: [-66.5897, 6.4238] },
        { name: 'Cuba', coords: [-77.7812, 21.5218] },
        { name: 'Dominican Republic', coords: [-70.1627, 18.7357] },
        { name: 'Haiti', coords: [-72.2852, 18.9712] },
        { name: 'Guatemala', coords: [-90.5126, 15.7835] },
        { name: 'Ecuador', coords: [-79.0193, -1.8312] },
        { name: 'Bolivia', coords: [-64.9623, -16.5] },
        { name: 'Paraguay', coords: [-58.4438, -23.4422] },
        { name: 'Uruguay', coords: [-55.7658, -32.5228] },
        { name: 'Iceland', coords: [-18.8339, 64.9631] },
        { name: 'Finland', coords: [24.9354, 61.9241] },
        { name: 'Sweden', coords: [18.6435, 60.1282] },
        { name: 'Norway', coords: [8.4689, 60.472] },
        { name: 'Denmark', coords: [9.5018, 56.2639] },
        { name: 'Austria', coords: [14.5501, 47.5162] },
        { name: 'Switzerland', coords: [8.5417, 46.8182] },
        { name: 'Belgium', coords: [4.4699, 50.5039] },
        { name: 'Netherlands', coords: [5.2913, 52.1326] },
        { name: 'Luxembourg', coords: [6.1296, 49.6118] },
        { name: 'Ireland', coords: [-8.2439, 53.4129] },
        { name: 'Portugal', coords: [-8.2245, 39.3999] },
        { name: 'Greece', coords: [21.8243, 39.0742] },
        { name: 'Czech Republic', coords: [15.5812, 49.8175] },
        { name: 'Hungary', coords: [19.5033, 47.1625] },
        { name: 'Slovakia', coords: [19.699, 48.669] },
        { name: 'Romania', coords: [24.9668, 45.9432] },
        { name: 'Bulgaria', coords: [25.4858, 42.7339] },
        { name: 'Serbia', coords: [20.5733, 44.0165] },
        { name: 'Croatia', coords: [15.982, 45.1] },
        { name: 'Slovenia', coords: [14.9955, 46.1512] },
        { name: 'Bosnia and Herzegovina', coords: [17.6794, 43.9159] },
        { name: 'Montenegro', coords: [19.2626, 42.7087] },
        { name: 'Macedonia', coords: [21.7645, 41.6086] },
        { name: 'Albania', coords: [19.8189, 41.1533] },
        { name: 'Estonia', coords: [24.7536, 58.5953] },
        { name: 'Latvia', coords: [24.6032, 56.8796] },
        { name: 'Lithuania', coords: [23.8813, 55.1694] },
        { name: 'Moldova', coords: [28.3982, 47.4116] },
        { name: 'Belarus', coords: [27.9534, 53.9045] },
        { name: 'Ukraine', coords: [31.1656, 48.3794] },
        { name: 'Georgia', coords: [42.3154, 42.3154] },
        { name: 'Armenia', coords: [40.0691, 40.0691] },
        { name: 'Azerbaijan', coords: [47.5769, 40.1431] },
        { name: 'Kazakhstan', coords: [66.9237, 48.0196] },
        { name: 'Uzbekistan', coords: [64.5853, 41.3775] },
        { name: 'Tajikistan', coords: [71.2761, 38.861] },
        { name: 'Kyrgyzstan', coords: [74.7661, 41.2044] },
        { name: 'Turkmenistan', coords: [59.5563, 38.9691] },
        { name: 'Afghanistan', coords: [66.0204, 33.9391] },
        { name: 'Pakistan', coords: [69.3451, 30.3753] },
        { name: 'Iraq', coords: [43.6793, 33.2232] },
        { name: 'Syria', coords: [38.9968, 34.8021] },
        { name: 'Lebanon', coords: [35.8623, 33.8547] },
        { name: 'Jordan', coords: [36.2384, 30.5852] },
        { name: 'Saudi Arabia', coords: [45.0792, 23.8859] },
        { name: 'Yemen', coords: [48.5164, 15.5526] },
        { name: 'Oman', coords: [55.9233, 21.5129] },
        { name: 'United Arab Emirates', coords: [53.8478, 23.4241] },
        { name: 'Qatar', coords: [51.1839, 25.3548] },
        { name: 'Bahrain', coords: [50.5577, 26.0275] },
        { name: 'Kuwait', coords: [47.4817, 29.3759] },
        { name: 'Somalia', coords: [46.1996, 5.1521] },
        { name: 'Eritrea', coords: [39.7823, 15.1792] },
        { name: 'Djibouti', coords: [42.6043, 11.8251] },
        { name: 'South Sudan', coords: [29.2588, 4.8594] },
        { name: 'Sudan', coords: [30.2176, 12.8628] },
        { name: 'Central African Republic', coords: [20.9394, 4.3967] },
        { name: 'Republic of the Congo', coords: [15.8277, -0.228] },
        { name: 'Democratic Republic of the Congo', coords: [21.7587, -4.0383] },
        { name: 'Angola', coords: [17.8739, -11.2027] },
        { name: 'Zambia', coords: [27.8493, -13.1339] },
        { name: 'Zimbabwe', coords: [29.1549, -19.0154] },
        { name: 'Namibia', coords: [18.4904, -22.9576] },
        { name: 'Botswana', coords: [24.6844, -22.3285] },
        { name: 'Eswatini', coords: [31.4659, -26.5225] },
        { name: 'Lesotho', coords: [28.8742, -29.609] },
        { name: 'Sierra Leone', coords: [-11.7799, 8.4606] },
        { name: 'Liberia', coords: [-9.4295, 6.4281] },
        { name: 'Ghana', coords: [-0.186, 7.1733] },
        { name: 'Ivory Coast', coords: [-5.345, 7.5399] },
        { name: 'Togo', coords: [0.825, 8.6195] },
        { name: 'Benin', coords: [2.3158, 9.307] },
        { name: 'Nigeria', coords: [8.6753, 9.082] },
        { name: 'Cameroon', coords: [9.7085, 5.8579] },
        { name: 'Chad', coords: [18.7322, 15.4542] },
        { name: 'Niger', coords: [8.0817, 17.6078] },
        { name: 'Mali', coords: [-3.9962, 17.5707] },
        { name: 'Burkina Faso', coords: [-1.6104, 12.2383] },
        { name: 'Senegal', coords: [-14.7645, 14.4974] },
        { name: 'Gambia', coords: [-15.3102, 13.4663] },
        { name: 'Mauritania', coords: [-10.2049, 20.254] },
        { name: 'Sao Tome and Principe', coords: [6.6131, 0.1864] },
        { name: 'Equatorial Guinea', coords: [9.7038, 1.6174] },
        { name: 'Gabon', coords: [11.6094, -0.8031] },
        { name: 'Republic of the Congo', coords: [15.8277, -0.228] },
        { name: 'Lesotho', coords: [28.8742, -29.609] },
        { name: 'Palau', coords: [134.5825, 7.5149] },
        { name: 'Micronesia', coords: [150.215, 6.9116] },
        { name: 'Marshall Islands', coords: [168.0421, 7.1095] },
        { name: 'Tuvalu', coords: [179.1941, -7.1095] },
        { name: 'Kiribati', coords: [173.0487, -3.3704] },
        { name: 'Vanuatu', coords: [167.9791, -15.3763] },
        { name: 'Fiji', coords: [178.065, -17.7134] },
        { name: 'Papua New Guinea', coords: [144.262, -6.3159] },
        { name: 'Solomon Islands', coords: [160.0, -9.0] },
        { name: 'New Zealand', coords: [174.8859, -40.9006] }
      ];

      function getRandomCountries(pool: any, count: any) {
        const shuffled = pool.sort(() => 0.5 - Math.random());

        return shuffled.slice(0, count);
      }

      const attackCountries = getRandomCountries(countriesPool, 80);

      const createArc = (source: number[], target: number[]) => {
        //@ts-ignore
        const interpolator = d3.geoInterpolate(source, target);
        const midPoint = interpolator(0.5); // Midpoint for the curve
        //@ts-ignore
        return [projection(source), projection(midPoint), projection(target)];
      };

      // Function to animate arcs with fade-out effect
      function animateArc(country: any, i: number) {
        const arcData = createArc(country.coords, uzbekistanCoords);

        const label = svg
          .append('text')
          .attr('class', 'attack-label')
          //@ts-ignore
          .attr('x', projection(country.coords)[0]) // Set x position
          //@ts-ignore
          .attr('y', projection(country.coords)[1] + 12) // Move down by 12px
          .text(country.name)
          .style('opacity', 0); // Start with 0 opacity

        const path = svg
          .append('path')
          .datum(arcData)
          .attr('class', 'arc')
          //@ts-ignore
          .attr('d', d3.line().curve(d3.curveBasis)) // Curved lines with curveBasis
          .attr('stroke-dasharray', function () {
            const length = this.getTotalLength();
            return length + ' ' + length;
          })
          .attr('stroke-dashoffset', function () {
            return this.getTotalLength();
          });

        const circle = svg
          .append('circle')
          .attr('class', 'attack-circle')
          //@ts-ignore
          .attr('cx', projection(country.coords)[0])
          //@ts-ignore
          .attr('cy', projection(country.coords)[1])
          .attr('r', 5) // Circle radius set to 2px
          .style('opacity', 0); // Start with 0 opacity

        path
          .transition()
          .delay(i * 1000)
          .duration(3000)
          .ease(d3.easeSinInOut)
          .attr('stroke-dashoffset', 0)
          .on('start', function () {
            setAttackCountries({ name: country.name, date: new Date() });
            label.transition().duration(0).style('opacity', 1);

            circle.transition().duration(0).style('opacity', 1);
          })
          .on('end', function () {
            label.transition().duration(1000).ease(d3.easeSinInOut).style('opacity', 0).remove();

            circle.transition().duration(1000).ease(d3.easeSinInOut).style('opacity', 0).remove();

            path.transition().duration(1000).ease(d3.easeSinInOut).style('opacity', 0).remove();
          });
      }

      attackCountries.forEach((country: any, i: number) => {
        animateArc(country, i);
      });

      setInterval(
        () => {
          attackCountries.forEach((country: any, i: number) => {
            animateArc(country, i);
          });
        },
        attackCountries.length * 1000 + 1000
      );
    });
  };

  return <svg ref={ref} id={'map'}></svg>;
};

export default D3Map;

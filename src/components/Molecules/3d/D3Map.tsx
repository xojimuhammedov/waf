import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import type { Selection } from 'd3';
//@ts-ignore
import * as topojson from 'topojson-client';
import storage from 'services/storage';
import { io } from 'socket.io-client';
import config from 'configs';
import dayjs from 'dayjs';

var socket : any;

type D3MapProps = {
  setAttackCountries: (data: object) => void;
};

const D3Map: React.FC<D3MapProps> = ({ setAttackCountries }) => {
  const ref = useRef<SVGSVGElement>(null);
  const zoomRef = useRef<any>(null);
  const mapGroupRef = useRef<d3.Selection<SVGGElement, unknown, HTMLElement, any>>();
  const animationGroupRef = useRef<d3.Selection<SVGGElement, unknown, HTMLElement, any>>();
  const projectionRef = useRef<d3.GeoProjection>();
  const [isGlobeView, setIsGlobeView] = useState(false);
  const timerRef = useRef(null);
  const activeArcsRef = useRef<any[]>([]);

  useEffect(() => {
    if (ref.current) {

      socketCreate();

      if (isGlobeView) {
        initGlobus(ref.current);
      } else {
        initMap(ref.current);
      }
    }
  
    return () => {
      if (mapGroupRef.current) {
        mapGroupRef.current.selectAll('*').remove();
        d3.select(ref.current).selectAll("*").remove();
        animationGroupRef.current?.selectAll('*').remove();   
        
        if (timerRef.current) {
          // @ts-ignore  
          timerRef.current.stop();
          timerRef.current = null;
        }
      }
    };
  }, [isGlobeView]);

  const toggleView = () => {
    setIsGlobeView(prev => !prev);
  };

  const initMap = (container: SVGSVGElement) => {
 
    const svg = d3
      .select(container)
      .attr('width', '100%')
      .attr('height', '100%')
      .style('background-color', 'transparent');

      const width = container.width.animVal.value;
      const height = container.height.animVal.value;
      const mapWidth = width/2;
      const mapHeight = height/1.7;
      const mapScale = height/4.5;

    // Create main container group for all content
    const mainGroup = svg.append('g').attr('class', 'main-container');
    // @ts-ignore
    mapGroupRef.current = mainGroup;

    // Create separate groups for map and animations
    const mapGroup = mainGroup.append('g').attr('class', 'map-group');
    const animationGroup = mainGroup.append('g').attr('class', 'animation-container');
    // @ts-ignore
    animationGroupRef.current = animationGroup;

    // Store projection in ref for reuse in animations
    projectionRef.current = d3
      .geoMercator()
      .scale(mapScale)
      .translate([mapWidth, mapHeight]);

    const path = d3.geoPath().projection(projectionRef.current);

    // Add zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8])
      .filter((event) => {
        return !event.ctrlKey && !event.button && event.type !== 'wheel';
      })
      .on('zoom', (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
        mainGroup.attr('transform', event.transform.toString());
      });

    zoomRef.current = zoom;
    svg.call(zoom);

    // Load and render map - only once
    d3.json('https://unpkg.com/world-atlas@2.0.2/countries-110m.json').then((worldData: any) => {
    // @ts-ignore  
    const countries = topojson.feature(worldData, worldData.objects.countries).features;

    // Background grid effect
    const gridSize = 30;
    const gridOpacity = 0.1;

    mainGroup.append('defs')
        .append('pattern')
        .attr('id', 'grid')
        .attr('width', gridSize)
        .attr('height', gridSize)
        .attr('patternUnits', 'userSpaceOnUse')
        .append('path')
        .attr('d', `M ${gridSize} 0 L 0 0 0 ${gridSize}`)
        .style('fill', 'none')
        .style('stroke', '#0ff')
        .style('stroke-width', '0.5')
        .style('opacity', gridOpacity);

    svg.append('rect')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('z-index', '-10')
        .style('fill', 'url(#grid)')
        .style('pointer-events', 'none'); // Hodisalarni blokirovka qiladi


      mapGroup
        .selectAll('path')
        .data(countries)
        .enter()
        .append('path')
        .attr('class', (d: any) => (d.id === '860' ? 'country country-target' : 'country'))
        .attr('d', path as any)
        .attr('id', (d: any) => d.id)
        .on('mouseover', function() {
          d3.select(this).attr('class', 'country country-hover');
        })
        .on('mouseout', function(this: any, event: any, d: any) {
          d3.select(this).attr('class', d.id === '860' ? 'country country-target' : 'country');
        });
    });
  
   
    return () => {
      svg.on('.zoom', null);
    };
  }

  const initGlobus = (container: SVGSVGElement) => {
    const svg = d3
      .select(container)
      .attr('width', '100%')
      .attr('height', '100%')
      .style('background-color', 'transparent');

    const width = container.width.animVal.value;
    const height = container.height.animVal.value;
    const mapWidth = width/2;
    const mapHeight = height/2.5;
    const mapScale = height/2.5;

    const mainGroup = svg.append('g').attr('class', 'main-container');
    // @ts-ignore  
    mapGroupRef.current = mainGroup;

    const mapGroup = mainGroup.append('g').attr('class', 'map-group');
    const animationGroup = mainGroup.append('g').attr('class', 'animation-container');
    // @ts-ignore  
    animationGroupRef.current = animationGroup;

    projectionRef.current = d3.geoOrthographic()
      .scale(mapScale)
      .translate([mapWidth, mapHeight])
      .rotate([0, 30])
      .clipAngle(90);

    const path = d3.geoPath().projection(projectionRef.current);
    
    mapGroup.append('circle')
      .attr('cx', mapWidth)
      .attr('cy', mapHeight)
      .attr('r', mapScale)
      .attr('class', 'ocean');

    let rotate = [0, -30];
    const sensitivity = 10;

    // Modified rotation timer to update arcs
    // @ts-ignore  
    timerRef.current = d3.timer((elapsed) => {
      rotate[0] = elapsed / 100;
      projectionRef.current?.rotate(rotate as any);
      
      // Update country paths
      mapGroup.selectAll('path').attr('d', path as any);
      
      // Update active arcs
      activeArcsRef.current.forEach(arcData => {
        updateArcAndMarker(arcData);
      });
    });

    // Modified drag behavior to update arcs
    // @ts-ignore  
    mapGroup.call(d3.drag()
      .on('drag', (event) => {
        rotate[0] = rotate[0] + event.dx / sensitivity;
        rotate[1] = rotate[1] - event.dy / sensitivity;
        rotate[1] = rotate[1] > 50 ? 50 : rotate[1] < -50 ? -50 : rotate[1];
        
        projectionRef.current?.rotate(rotate as any);
        mapGroup.selectAll('path').attr('d', path as any);
        
        // Update active arcs during drag
        activeArcsRef.current.forEach(arcData => {
          updateArcAndMarker(arcData);
        });
      }));

    // Add zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8])
      .filter((event) => {
        return !event.ctrlKey && !event.button && event.type !== 'wheel';
      })
      .on('zoom', (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
        mainGroup.attr('transform', event.transform.toString());
      });

    zoomRef.current = zoom;
    svg.call(zoom);

    // Load and render map - only once
    d3.json('https://unpkg.com/world-atlas@2.0.2/countries-110m.json').then((worldData: any) => {
    // @ts-ignore  
    const countries = topojson.feature(worldData, worldData.objects.countries).features;

    // Background grid effect
    const gridSize = 30;
    const gridOpacity = 0.1;

    svg.append('defs')
        .append('pattern')
        .attr('id', 'grid')
        .attr('width', gridSize)
        .attr('height', gridSize)
        .attr('patternUnits', 'userSpaceOnUse')
        .append('path')
        .attr('d', `M ${gridSize} 0 L 0 0 0 ${gridSize}`)
        .style('fill', 'none')
        .style('stroke', '#0ff')
        .style('stroke-width', '0.5')
        .style('opacity', gridOpacity);

    svg.append('rect')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('z-index', '-10')
        .style('fill', 'url(#grid)')
        .style('pointer-events', 'none'); // Hodisalarni blokirovka qiladi


      mapGroup
        .selectAll('path')
        .data(countries)
        .enter()
        .append('path')
        .attr('class', (d: any) => (d.id === '860' ? 'country country-target' : 'country'))
        .attr('d', path as any)
        .attr('id', (d: any) => d.id)
        .on('mouseover', function() {
          d3.select(this).attr('class', 'country country-hover');
        })
        .on('mouseout', function(this: any, event: any, d: any) {
          d3.select(this).attr('class', d.id === '860' ? 'country country-target' : 'country');
        });
    });
  
  
    return () => {
      svg.on('.zoom', null);
    };
  };

  const updateArcAndMarker = (arcData: any) => {
    if (!projectionRef.current || !animationGroupRef.current) return;

    const { sourceCoords, targetCoords, arcGroup, markerGroup } = arcData;
    
    // Check if points are visible (not behind the globe)
    const sourceVisible = isPointVisible(sourceCoords);
    const targetVisible = isPointVisible(targetCoords);

    // Update visibility based on point visibility
    arcGroup.style('opacity', sourceVisible || targetVisible ? 1 : 0);

    if (sourceVisible || targetVisible) {
      // Update arc path
      const pathData = createArc(sourceCoords, targetCoords);
      arcGroup.select('path')
        .datum(pathData)
        .attr('d', d3.line().curve(d3.curveBasis));

      // Update marker position
      const projectedSource = projectionRef.current(sourceCoords);
      if (projectedSource) {
        markerGroup.attr('transform', `translate(${projectedSource[0]}, ${projectedSource[1]})`);
      }
    }
  };

  const isPointVisible = (coords: [number, number]): boolean => {
    if (!projectionRef.current) return false;
    const rotation = projectionRef.current.rotate();
    const rotatedCoords = [
      coords[0] + rotation[0],
      coords[1] + rotation[1]
    ];
    // @ts-ignore  
    return d3.geoDistance(rotatedCoords, [0, 0]) < Math.PI / 1.5;
  };

  const createArc = (source: [number, number], target: [number, number]) => {
    if (!projectionRef.current) return [];
    
    const interpolator = d3.geoInterpolate(source, target);
    const midPoint = interpolator(0.5);
    
    return [
      projectionRef.current(source),
      projectionRef.current(midPoint),
      projectionRef.current(target)
    ];
  };


  function socketCreate() {

    if(socket)
     {
      console.log("Socket already connected!");
      return;
    }

  const token = storage.get('accessToken');
  const socketEnv: any = config.API_ROOT;

   socket = io(socketEnv, {
    transports: ['websocket'],
    auth: { 
      token: `${token}`
          }
    
  });

  socket.on('connect', () => {
    console.log('Connected.');
  });

  var ind = 1;

  socket.on('message', (data: any) => {
    console.log(data);
  });
  socket.on('log', (data: any) => {

    try {
      // data ichidagi JSON obyektni parse qilish
      const parsedData = data;

      const newCountry = {
        name: parsedData?.country_name_en,
        city: parsedData?.city_name_en,
        coords: parsedData?.coords,
        time_stamp: dayjs(new Date()), // parsedData?.time_stamp,
        ip_address: parsedData?.ip_address
      };

      animateArc(newCountry, ind++);
    } catch (error) {
      console.error('Error parsing data:', error);
    }
  });
  socket.on('error', (data: any) => {
    console.log(data);
  });

  socket.on('disconnect', () => {
    console.log('Disconnect.');
  });

  //return () => {
  // socket.disconnect();
  //};
  }

  //var isSimulating : boolean = false;
  //var intervalId : any;
  function startSimulations(){ 
    /*let isSimulating = localStorage.getItem('isSimulating') === 'true';

    console.log(isSimulating);
    if(isSimulating)
    {
      clearInterval(intervalId);
      localStorage.setItem('isSimulating', 'false'); // Update state
      console.log('simulation stoped');
      return;
    }
    
    localStorage.setItem('isSimulating', 'true'); // Update state
*/
const countriesPool = [
  { name: 'India', coords: [78.9629, 20.5937], ip_address: '100.52.85.25', city: 'New Delhi' },
  { name: 'Russia', coords: [105.3188, 61.524], ip_address: '185.71.144.12', city: 'Moscow' },
  { name: 'Siberia', coords: [102.0, 60.0], ip_address: '185.71.154.86', city: 'Novosibirsk' },
  { name: 'Far East', coords: [140.0, 50.0], ip_address: '185.71.162.44', city: 'Vladivostok' },
  { name: 'China', coords: [104.1954, 35.8617], ip_address: '223.112.9.2', city: 'Beijing' },
  { name: 'Italy', coords: [12.5674, 41.8719], ip_address: '151.38.39.114', city: 'Rome' },
  { name: 'Iran', coords: [53.688, 32.4279], ip_address: '2.144.162.77', city: 'Tehran' },
  { name: 'Sudan', coords: [30.2176, 12.8628], ip_address: '196.29.166.98', city: 'Khartoum' },
  { name: 'Algeria', coords: [1.6596, 28.0339], ip_address: '41.96.31.40', city: 'Algiers' },
  { name: 'Iraq', coords: [43.6793, 33.2232], ip_address: '185.95.184.10', city: 'Baghdad' },
  { name: 'Brazil', coords: [-51.9253, -14.235], ip_address: '177.54.144.126', city: 'Brasília' },
  { name: 'Argentina', coords: [-63.6167, -38.4161], ip_address: '181.16.255.35', city: 'Buenos Aires' },
  { name: 'Canada', coords: [-106.3468, 56.1304], ip_address: '99.236.40.185', city: 'Ottawa' },
  { name: 'Australia', coords: [151.2093, -33.8688], ip_address: '1.144.104.71', city: 'Canberra' },
  { name: 'Germany', coords: [10.4515, 51.1657], ip_address: '178.203.236.21', city: 'Berlin' },
  { name: 'France', coords: [2.2137, 46.6034], ip_address: '90.93.17.142', city: 'Paris' },
  { name: 'United Kingdom', coords: [-3.435, 55.3781], ip_address: '82.132.215.44', city: 'London' },
  { name: 'Japan', coords: [138.2529, 36.2048], ip_address: '126.99.235.81', city: 'Tokyo' },
  { name: 'South Korea', coords: [127.7669, 35.9078], ip_address: '211.234.78.165', city: 'Seoul' },
  { name: 'Egypt', coords: [30.8025, 26.8206], ip_address: '156.208.118.10', city: 'Cairo' },
  { name: 'Turkey', coords: [35.2433, 38.9637], ip_address: '88.255.96.23', city: 'Ankara' },
  { name: 'Nigeria', coords: [8.6753, 9.082], ip_address: '105.112.176.66', city: 'Abuja' },
  { name: 'Kenya', coords: [37.9062, -1.2864], ip_address: '197.232.45.98', city: 'Nairobi' },
  { name: 'South Africa', coords: [22.9375, -30.5595], ip_address: '165.255.144.19', city: 'Pretoria' },
  { name: 'Vietnam', coords: [108.2772, 14.0583], ip_address: '27.68.82.33', city: 'Hanoi' },
  { name: 'Malaysia', coords: [101.9758, 4.2105], ip_address: '175.144.112.39', city: 'Kuala Lumpur' },
  { name: 'Philippines', coords: [120.9842, 12.8797], ip_address: '180.190.78.22', city: 'Manila' },
  { name: 'Thailand', coords: [100.9925, 15.87], ip_address: '171.96.70.144', city: 'Bangkok' },
  { name: 'Saudi Arabia', coords: [45.0792, 23.8859], ip_address: '78.93.32.11', city: 'Riyadh' },
  { name: 'Pakistan', coords: [69.3451, 30.3753], ip_address: '39.40.205.77', city: 'Islamabad' },
  { name: 'Bangladesh', coords: [90.3563, 23.685], ip_address: '103.60.175.45', city: 'Dhaka' },
  { name: 'Colombia', coords: [-74.2973, 4.5709], ip_address: '181.49.23.154', city: 'Bogotá' },
  { name: 'Peru', coords: [-75.0152, -9.19], ip_address: '190.40.77.82', city: 'Lima' },
  { name: 'Chile', coords: [-71.5385, -35.6751], ip_address: '200.68.128.44', city: 'Santiago' },
  { name: 'Venezuela', coords: [-66.5897, 6.4238], ip_address: '186.93.144.21', city: 'Caracas' },
  { name: 'Cuba', coords: [-77.7812, 21.5218], ip_address: '152.206.85.73', city: 'Havana' },
  { name: 'Dominican Republic', coords: [-70.1627, 18.7357], ip_address: '186.6.75.134', city: 'Santo Domingo' },
  { name: 'Haiti', coords: [-72.2852, 18.9712], ip_address: '186.190.152.86', city: 'Port-au-Prince' },
  { name: 'Guatemala', coords: [-90.5126, 15.7835], ip_address: '181.174.104.71', city: 'Guatemala City' },
  { name: 'Ecuador', coords: [-79.0193, -1.8312], ip_address: '186.46.138.90', city: 'Quito' },
  { name: 'Bolivia', coords: [-64.9623, -16.5], ip_address: '181.188.166.74', city: 'La Paz' },
  { name: 'Paraguay', coords: [-58.4438, -23.4422], ip_address: '181.94.44.133', city: 'Asunción' },
  { name: 'Uruguay', coords: [-55.7658, -32.5228], ip_address: '167.56.188.22', city: 'Montevideo' },
  { name: 'Iceland', coords: [-18.8339, 64.9631], ip_address: '82.221.96.12', city: 'Reykjavík' },
  { name: 'Finland', coords: [24.9354, 61.9241], ip_address: '88.192.45.78', city: 'Helsinki' },
  { name: 'Sweden', coords: [18.6435, 60.1282], ip_address: '78.67.192.34', city: 'Stockholm' },
  { name: 'Norway', coords: [8.4689, 60.472], ip_address: '84.211.144.77', city: 'Oslo' },
  { name: 'Denmark', coords: [9.5018, 56.2639], ip_address: '80.167.238.66', city: 'Copenhagen' },
  { name: 'Austria', coords: [14.5501, 47.5162], ip_address: '77.119.128.33', city: 'Vienna' },
  { name: 'Switzerland', coords: [8.5417, 46.8182], ip_address: '85.195.224.45', city: 'Bern' },
  { name: 'Belgium', coords: [4.4699, 50.5039], ip_address: '81.246.64.22', city: 'Brussels' },
  { name: 'Netherlands', coords: [5.2913, 52.1326], ip_address: '83.84.123.45', city: 'Amsterdam' },
  { name: 'Luxembourg', coords: [6.1296, 49.6118], ip_address: '94.242.128.77', city: 'Luxembourg City' },
  { name: 'Ireland', coords: [-8.2439, 53.4129], ip_address: '84.203.45.89', city: 'Dublin' },
  { name: 'Portugal', coords: [-8.2245, 39.3999], ip_address: '85.138.192.67', city: 'Lisbon' },
  { name: 'Greece', coords: [21.8243, 39.0742], ip_address: '94.68.176.33', city: 'Athens' },
  { name: 'Czech Republic', coords: [15.5812, 49.8175], ip_address: '88.102.89.123', city: 'Prague' },
  { name: 'Hungary', coords: [19.5033, 47.1625], ip_address: '84.3.128.55', city: 'Budapest' },
  { name: 'Slovakia', coords: [19.699, 48.669], ip_address: '78.99.144.66', city: 'Bratislava' },
  { name: 'Romania', coords: [24.9668, 45.9432], ip_address: '79.113.224.77', city: 'Bucharest' },
  { name: 'Bulgaria', coords: [25.4858, 42.7339], ip_address: '95.43.128.44', city: 'Sofia' },
  { name: 'Serbia', coords: [20.5733, 44.0165], ip_address: '93.87.77.123', city: 'Belgrade' },
  { name: 'Croatia', coords: [15.982, 45.1], ip_address: '85.114.96.55', city: 'Zagreb' },
  { name: 'Slovenia', coords: [14.9955, 46.1512], ip_address: '88.200.63.88', city: 'Ljubljana' },
  { name: 'Bosnia and Herzegovina', coords: [17.6794, 43.9159], ip_address: '77.77.192.44', city: 'Sarajevo' },
  { name: 'Montenegro', coords: [19.2626, 42.7087], ip_address: '79.143.99.66', city: 'Podgorica' },
  { name: 'Macedonia', coords: [21.7645, 41.6086], ip_address: '95.86.144.55', city: 'Skopje' },
  { name: 'Albania', coords: [19.8189, 41.1533], ip_address: '79.106.77.88', city: 'Tirana' },
  { name: 'Estonia', coords: [24.7536, 58.5953], ip_address: '82.131.192.33', city: 'Tallinn' },
  { name: 'Latvia', coords: [24.6032, 56.8796], ip_address: '88.196.124.77', city: 'Riga' },
  { name: 'Lithuania', coords: [23.8813, 55.1694], ip_address: '78.56.144.22', city: 'Vilnius' },
  { name: 'Moldova', coords: [28.3982, 47.4116], ip_address: '77.89.192.55', city: 'Chișinău' },
  { name: 'Belarus', coords: [27.9534, 53.9045], ip_address: '86.57.128.66', city: 'Minsk' },
  { name: 'Ukraine', coords: [31.1656, 48.3794], ip_address: '93.77.192.44', city: 'Kyiv' },
  { name: 'Georgia', coords: [42.3154, 42.3154], ip_address: '85.114.224.77', city: 'Tbilisi' },
  { name: 'Armenia', coords: [40.0691, 40.0691], ip_address: '89.249.64.33', city: 'Yerevan' },
  { name: 'Azerbaijan', coords: [47.5769, 40.1431], ip_address: '82.194.86.55', city: 'Baku' },
  { name: 'Kazakhstan', coords: [66.9237, 48.0196], ip_address: '92.47.128.44', city: 'Astana' },
  { name: 'Uzbekistan', coords: [64.5853, 41.3775], ip_address: '84.54.64.77', city: 'Tashkent' },
  { name: 'Tajikistan', coords: [71.2761, 38.861], ip_address: '85.9.128.55', city: 'Dushanbe' },
  { name: 'Kyrgyzstan', coords: [74.7661, 41.2044], ip_address: '91.213.192.66', city: 'Bishkek' },
  { name: 'Turkmenistan', coords: [59.5563, 38.9691], ip_address: '95.85.96.44', city: 'Ashgabat' },
  { name: 'Afghanistan', coords: [66.0204, 33.9391], ip_address: '103.215.224.77', city: 'Kabul' },
  { name: 'Syria', coords: [38.9968, 34.8021], ip_address: '82.137.200.42', city: 'Damascus' },
  { name: 'Lebanon', coords: [35.8623, 33.8547], ip_address: '178.135.128.77', city: 'Beirut' },
  { name: 'Jordan', coords: [36.2384, 30.5852], ip_address: '176.29.192.55', city: 'Amman' },
  { name: 'Yemen', coords: [48.5164, 15.5526], ip_address: '134.35.208.44', city: 'Sanaa' },
  { name: 'Oman', coords: [55.9233, 21.5129], ip_address: '185.134.96.77', city: 'Muscat' },
  { name: 'United Arab Emirates', coords: [53.8478, 23.4241], ip_address: '94.200.128.55', city: 'Abu Dhabi' },
  { name: 'Qatar', coords: [51.1839, 25.3548], ip_address: '178.152.64.33', city: 'Doha' },
  { name: 'Bahrain', coords: [50.5577, 26.0275], ip_address: '185.33.192.44', city: 'Manama' },
  { name: 'Kuwait', coords: [47.4817, 29.3759], ip_address: '178.161.128.77', city: 'Kuwait City' },
  { name: 'Somalia', coords: [46.1996, 5.1521], ip_address: '197.220.64.55', city: 'Mogadishu' },
  { name: 'Eritrea', coords: [39.7823, 15.1792], ip_address: '196.200.96.44', city: 'Asmara' },
  { name: 'Djibouti', coords: [42.6043, 11.8251], ip_address: '197.241.128.77', city: 'Djibouti City' },
  { name: 'South Sudan', coords: [29.2588, 4.8594], ip_address: '105.235.192.55', city: 'Juba' },
  { name: 'Central African Republic', coords: [20.9394, 4.3967], ip_address: '197.242.64.44', city: 'Bangui' },
  { name: 'Republic of the Congo', coords: [15.8277, -0.228], ip_address: '197.214.96.77', city: 'Brazzaville' },
  { name: 'Democratic Republic of the Congo', coords: [21.7587, -4.0383], ip_address: '197.218.128.55', city: 'Kinshasa' },
  { name: 'Angola', coords: [17.8739, -11.2027], ip_address: '197.217.192.44', city: 'Luanda' },
  { name: 'Zambia', coords: [27.8493, -13.1339], ip_address: '196.216.64.77', city: 'Lusaka' },
  { name: 'Zimbabwe', coords: [29.1549, -19.0154], ip_address: '196.201.96.55', city: 'Harare' },
  { name: 'Namibia', coords: [18.4904, -22.9576], ip_address: '196.200.128.44', city: 'Windhoek' },
  { name: 'Botswana', coords: [24.6844, -22.3285], ip_address: '196.198.192.77', city: 'Gaborone' },
  { name: 'Eswatini', coords: [31.4659, -26.5225], ip_address: '196.223.64.55', city: 'Mbabane' },
  { name: 'Lesotho', coords: [28.8742, -29.609], ip_address: '196.202.96.44', city: 'Maseru' },
  { name: 'Sierra Leone', coords: [-11.7799, 8.4606], ip_address: '197.215.128.77', city: 'Freetown' },
  { name: 'Liberia', coords: [-9.4295, 6.4281], ip_address: '197.219.192.55', city: 'Monrovia' },
  { name: 'Ghana', coords: [-0.186, 7.1733], ip_address: '196.203.64.44', city: 'Accra' },
  { name: 'Ivory Coast', coords: [-5.345, 7.5399], ip_address: '196.197.96.77', city: 'Yamoussoukro' },
  { name: 'Togo', coords: [0.825, 8.6195], ip_address: '196.196.128.55', city: 'Lomé' },
  { name: 'Benin', coords: [2.3158, 9.307], ip_address: '196.195.192.44', city: 'Porto-Novo' },
  { name: 'Cameroon', coords: [9.7085, 5.8579], ip_address: '196.194.64.77', city: 'Yaoundé' },
  { name: 'Chad', coords: [18.7322, 15.4542], ip_address: '196.193.96.55', city: 'N\'Djamena' },
  { name: 'Niger', coords: [8.0817, 17.6078], ip_address: '197.214.128.44', city: 'Niamey' },
  { name: 'Mali', coords: [-3.9962, 17.5707], ip_address: '197.213.192.77', city: 'Bamako' },
  { name: 'Burkina Faso', coords: [-1.6104, 12.2383], ip_address: '196.192.64.55', city: 'Ouagadougou' },
  { name: 'Senegal', coords: [-14.7645, 14.4974], ip_address: '196.191.96.44', city: 'Dakar' },
  { name: 'Gambia', coords: [-15.3102, 13.4663], ip_address: '196.190.128.77', city: 'Banjul' },
  { name: 'Mauritania', coords: [-10.2049, 20.254], ip_address: '196.189.192.55', city: 'Nouakchott' },
  { name: 'Sao Tome and Principe', coords: [6.6131, 0.1864], ip_address: '197.159.64.44', city: 'São Tomé' },
  { name: 'Equatorial Guinea', coords: [9.7038, 1.6174], ip_address: '197.158.96.77', city: 'Malabo' },
  { name: 'Gabon', coords: [11.6094, -0.8031], ip_address: '197.157.128.55', city: 'Libreville' },
  { name: 'Palau', coords: [134.5825, 7.5149], ip_address: '103.242.64.44', city: 'Ngerulmud' },
  { name: 'Micronesia', coords: [150.215, 6.9116], ip_address: '103.243.96.77', city: 'Palikir' },
  { name: 'Marshall Islands', coords: [168.0421, 7.1095], ip_address: '103.244.128.55', city: 'Majuro' },
  { name: 'Tuvalu', coords: [179.1941, -7.1095], ip_address: '103.245.192.44', city: 'Funafuti' },
  { name: 'Kiribati', coords: [173.0487, -3.3704], ip_address: '103.246.64.77', city: 'Tarawa' },
  { name: 'Vanuatu', coords: [167.9791, -15.3763], ip_address: '103.247.96.55', city: 'Port Vila' },
  { name: 'Fiji', coords: [178.065, -17.7134], ip_address: '103.248.128.44', city: 'Suva' },
  { name: 'Papua New Guinea', coords: [144.262, -6.3159], ip_address: '103.249.192.77', city: 'Port Moresby' },
  { name: 'Solomon Islands', coords: [160.0, -9.0], ip_address: '103.250.64.55', city: 'Honiara' },
  { name: 'New Zealand', coords: [174.8859, -40.9006], ip_address: '103.251.96.44', city: 'Wellington' }
];	
    
          function getRandomCountries(pool: any, count: any) {
            const shuffled = pool.sort(() => 0.5 - Math.random());

            return shuffled.slice(0, count);
          }

          function getRandomInt(max:any) {
            return Math.floor(Math.random() * max);
          }

         // console.log('simulation strated');
          const intervalId = setInterval(() => {

            const attackCountries = getRandomCountries(countriesPool, getRandomInt(3));
            attackCountries.forEach((country: any, i: number) => {
              animateArc(country, i);
            });
          },
            3000
          );
  };

  const animateArc = (country: any, i: number) => {
    if (!projectionRef.current || !animationGroupRef.current) return;
   
    const uzbekistanCoords: [number, number] = [69.2401, 41.2995];
    const sourceCoords: [number, number] = country.coords;
    
    const arcGroup = animationGroupRef.current
      .append('g')
      .attr('class', `arc-group arc-group-${i}`);

    

    const markerGroup = arcGroup
      .append('g')
      .attr('class', 'marker-group')
      // @ts-ignore
      .attr('transform', `translate(${projectionRef.current(country.coords)[0]}, ${projectionRef.current(country.coords)[1]})`)
      .style('opacity', 0);

      // Add background rectangle (card)
      const label = markerGroup
      .append('rect')
      .attr('class', 'label-background')
      .attr('x', 0)
      .attr('y', -20)
      .attr('width', 150)
      .attr('height', 40)
      .attr('rx', 8) // Rounded corners
      .attr('ry', 8)
      .style('stroke', 'url(#cardBorder)'); // Apply gradient as stroke

      // Add circle (country flag/icon)
      const circle = markerGroup
      .append('circle')
      .attr('class', 'attack-circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 8)
      .style('opacity', 0); 

      // Add text (country name)
      const countryName = markerGroup
      .append('text')
      .attr('class', 'attack-label country-name')
      .attr('x', 25)
      .attr('y', -2)
      .text(country.name);

      // Add IP address
      const ipAddress = markerGroup
      .append('text')
      .attr('class', 'attack-label ip-address')
      .attr('x', 25)
      .attr('y', 12)
      .text(country.ip_address);

      // Define the gradient
      const gradient = arcGroup
      .append("defs")
      .append("linearGradient")
      .attr("id", "arcGradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");

      // Add gradient stops
      gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#4CAF50")
      .attr("stop-opacity", 1);

      gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#2196F3")  
      .attr("stop-opacity", 1);

    const pathData = createArc(sourceCoords, uzbekistanCoords);
    
    const path = arcGroup
      .append('path')
      .datum(pathData)
      .attr('class', 'arc')
      .style("stroke", "url(#arcGradient)")
      // @ts-ignore  
      .attr('d', d3.line().curve(d3.curveBasis))
      .attr('stroke-dasharray', function(this: SVGPathElement) {
        return `${this.getTotalLength()} ${this.getTotalLength()}`;
      })
      .attr('stroke-dashoffset', function(this: SVGPathElement) {
        return this.getTotalLength();
      });

    // Store arc data for updates during rotation
    const arcData = {
      sourceCoords,
      targetCoords: uzbekistanCoords,
      arcGroup,
      markerGroup,
      path
    };
    activeArcsRef.current.push(arcData);

    // Remove arc data after animation completes
    setTimeout(() => {
      activeArcsRef.current = activeArcsRef.current.filter(d => d !== arcData);
      arcGroup.remove();
    }, 3000);

   path
      .transition()
      .delay(i * 500)
      .duration(3000)
      .ease(d3.easeSinInOut)
      .attr('stroke-dashoffset', 0)
      .on('start', function() {
        setAttackCountries({
          name: country?.name,
          city: country?.city,
          date: country?.time_stamp,
          ip_address: country?.ip_address
        });
        
        markerGroup.transition().duration(0).style('opacity', 1);
        circle.transition().duration(0).style('opacity', 1);
      })
      .on('end', function() {
        //arcGroup.remove();
        markerGroup.transition().duration(0).style('opacity', 0);
        circle.transition().duration(0).style('opacity', 0);
        path.transition().duration(0).style('opacity', 0);
      });  
  };

  
  const handleZoomIn = () => {
    if (!ref.current || !zoomRef.current) return;    
  
    const svg = d3.select<SVGSVGElement, unknown>(ref.current);
    const transform = d3.zoomTransform(svg.node()!);
    
    svg.transition()
      .duration(300)
      .call(
        zoomRef.current.transform,
        d3.zoomIdentity
          .translate(transform.x, transform.y)
          .scale(transform.k * 1.10)
      );

  };

  const handleZoomOut = () => {
    if (!ref.current || !zoomRef.current) return;
 
    const svg = d3.select<SVGSVGElement, unknown>(ref.current);
    const transform = d3.zoomTransform(svg.node()!);
    
    svg.transition()
      .duration(300)
      .call(
        zoomRef.current.transform,
        d3.zoomIdentity
          .translate(transform.x, transform.y)
          .scale(transform.k * 0.80)
      );
  };

  return (
    <div className="relative w-full h-full">
      <svg ref={ref} id="map" />
      
      {/* Control Panel */}
      <div className="absolute top-4 right-4 bg-[#00000077] p-4 rounded shadow-lg ">
        <div className="flex gap-2 mb-2">
          <button
            onClick={handleZoomIn}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-[#454545] rounded-lg transition-all duration-300 backdrop-blur-sm">
           <svg 
          className="w-6 h-6" 
          viewBox="0 0 28 28" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1"
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
         <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
          </button>
          <button
            onClick={handleZoomOut}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg text-[#454545] transition-all duration-300 backdrop-blur-sm">
            <svg 
          className="w-6 h-6" 
          viewBox="0 0 28 28" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1"
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
         <circle cx="12" cy="12" r="10" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
          </button>

          <button
            onClick={startSimulations}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-[#454545] rounded-lg transition-all duration-300 backdrop-blur-sm">
           <svg 
                className="w-6 h-6" 
                viewBox="0 0 28 28" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
               
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
                <line x1="22" y1="12" x2="18" y2="12" />
                <line x1="6" y1="12" x2="2" y2="12" />
                <line x1="12" y1="6" x2="12" y2="2" />
                <line x1="12" y1="22" x2="12" y2="18" />
             </svg>
          </button>

          <button 
      onClick={toggleView}
      className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-[#454545] rounded-lg transition-all duration-300 backdrop-blur-sm">
      {isGlobeView ? (
        <>
          <svg 
            className="w-5 h-5" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1"
          >
            <path d="M3 7h18M3 12h18M3 17h18"/>
            <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
          </svg>
        </>
      ) : (
        <>
          <svg 
            className="w-5 h-5" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1"
          >
            <circle cx="12" cy="12" r="10"/>
            <path d="M2 12h20"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
        </>
      )}
    </button>
        </div>
      </div>
    </div>
  );
};



export default D3Map;
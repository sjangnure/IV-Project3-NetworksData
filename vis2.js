function vis2(heatmap_data,data_pie,div)
{  
  const margin = {top: 230, right: 60, bottom: 60, left:150};
  const width = 1000 - margin.left - margin.right; 
  const height = 1500 - margin.top - margin.bottom;
  const Recipients=['India','Thailand','Brazil','Colombia','Korea','Poland','South Africa','Kuwait','Chile','Saudi Arabia']
  const purposes=['Air transport','Rail transport','Industrial development','Power generation/non-renewable sources','RESCHEDULING AND REFINANCING']
  const  Donors=['United States','Japan','Germany','United Kingdom','France','Netherlands','Canada','Sweden','Norway','Italy','Denmark','Switzerland','Australia','Belgium','Spain','Saudi Arabia','Kuwait','Korea','Austria','Finland']

  //const svg = d3.select(DOM.svg(width + margin.left + margin.right,
    //                            height + margin.top + margin.bottom));
	
  const svg = d3.select("#vis2")
	.append("svg")
		.attr("width",width + margin.left + margin.right )
		.attr("height",height+margin.top + margin.bottom)
		//.attr("transform", `translate(${margin.left}, ${margin.top})`);
		.attr("transform", `translate(0,0)`);
	

  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
	  
	// gray Background
 g.append('g')
	.append('rect')
	.attr('x', -40)
    .attr('y',-35)
	.attr('width', width)
    .attr('height', height)
	.attr('fill','lightgray')
  
  // title
  g.append('text')
      .attr('x', (width )/2 - 50)
      .attr('y', height)
      .attr('font-family', 'sans-serif')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'hanging')
	  .attr('font-size' ,'20')
      .text('Recipient');

g.append('text')
      .attr('x', width / 2-50)
      .attr('y', -margin.bottom -10)
      .attr('font-family', 'sans-serif')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'hanging')
	  .attr('font-size' ,'20')
      .text('Recipient');

 g.append('text')
      .attr('x', -margin.left+10)
      .attr('y', height/2)
      .attr('font-family', 'sans-serif')
      .attr('text-anchor', 'top')
      .attr('dominant-baseline', 'hanging')
	  .attr('font-size' ,'19')
      .text('Donor');


// Scales
  
 
  
  // for x axis
const x_scale = d3.scaleBand()
.domain(Recipients)
.range([0, width])
.padding(0.05);
 
 
 
  //for y axis

 const y_scale = d3.scaleBand().domain(Donors).range([0,height]).padding(0.01); 

   
 // the radius of the pie charts
  
  const ext=d3.extent(data_pie.map(d=>d.total))
  const radii_scale = d3.scaleSqrt()
      .domain(ext)
      .range([15,31]);
  // const outerRadius = x.step() / 3.5;
  
 

 // Plot the axis (show axis on svg)
    
   g.append('g')
    .attr('transform', `translate(-40,-35)`)
    .call(d3.axisTop(x_scale))

   g.append('g')
    .attr('transform', `translate(-40,-35)`)
    .call(d3.axisLeft(y_scale))
  
   g.append('g')
    .attr('transform', `translate(-40,${height-35})`)
    .call(d3.axisBottom(x_scale))
	
 

  const color = d3.scaleOrdinal()
    .domain(purposes)
 // .range(['#1b9e77','#d95f02','#7570b3','#e7298a','#66a61e']);
  .range(['#66c2a5','#fc8d62','#8da0cb','#e78ac3','#a6d854']);
    // .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00']);
 
   const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(d=>radii_scale(d.data.total2))
 
 const pie = d3.pie()
      .value(d => d.amount) 
 
  const pieGroups = g.selectAll('.pieGroup')
    .data(data_pie)
    .join('g')
      .attr('class', 'pieGroup')
      .attr('transform', d => `translate(${x_scale(d.recipient)},${y_scale(d.donor)})`);

pieGroups.selectAll('path')
    .data(d => pie(d.purposes))
      .join('path')
      .attr('d', d => arc(d))
      .attr('fill', d => color(d.data.purpose))
  

//Code for Legend


    
  const g3 = svg.append('g')
     // .attr('transform', `translate(${margin.left}, ${margin.top})`);
      .attr("transform", `translate(${margin.left},20)`)
    //  .attr("text-anchor", "end")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
    .selectAll("g")
    .data(purposes)
    .join("g")
      .attr("transform", (d, i) => `translate(0,${i * 15})`);


   g3.append("text")
      .attr("x",10)
      .attr("y", 5)
      .attr("dy", function(d,i){ return 0 + i*15})
      .text(d => d);
  g3.append("circle")
      .attr("cx", 0)
      .attr("cy", function(d,i){ return 0 + i*15}) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("r", 7)
    .attr("fill",color);

 
 


}
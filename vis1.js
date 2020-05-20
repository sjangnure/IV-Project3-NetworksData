function vis1(heatmap_data,div)
{

  const lightgray = '#dcdcdc'
  const height = 800
  const width = 950
  const Recipients=['India','Thailand','Brazil','Colombia','Korea','Poland','South Africa','Kuwait','Chile','Saudi Arabia']
  const Donors=['United States','Japan','Germany','United Kingdom','France','Netherlands','Canada','Sweden','Norway','Italy','Denmark','Switzerland','Australia','Belgium','Spain','Saudi Arabia','Kuwait','Korea','Austria','Finland']
  
  const donated_amount_data=heatmap_data.map(d=>d.donated_amount)  
 
  /*const color1=d3.scaleQuantile()
  .domain(donated_amount_data) // pass the whole dataset to a scaleQuantile’s domain
  .range(['#cbc9e2','#9e9ac8','#756bb1','#54278f'])*/
    
  const margin = ({ top: 80, left: 100, right: 30, bottom: 50 })
  
  const svg = d3.select("#vis1")
	.append("svg")
		.attr("width",width + margin.left + margin.right )
		.attr("height",height+margin.top + margin.bottom)
		//.attr("transform", `translate(${margin.left}, ${margin.top})`);
		.attr("transform", `translate(0,0)`);


  
  //const svg = d3.select(DOM.svg(width, height))
  const g = svg.attr('width', width - margin.right )
   .attr('height', height + margin.top + margin.bottom)
   .append('g')
   .attr('transform', 'translate(' + margin.left + ','+margin.top+')')
   
  
 
  const recipient = d3.set(heatmap_data.map(d=> d.recipient)).values();
  
 const x_scale = d3.scaleBand()
.domain(Recipients)
.range([0, width-margin.left-margin.right])
.padding(0.005);

const mean=d3.mean(heatmap_data.map(d => d.donated_amount))

const color_1 = d3.scaleSequential()
                .domain([0,48830067295])
                .interpolator(d3.interpolateBlues)
				//.interpolator(['#fde0dd','#c51b8a'])
				
const color_scale = d3.scaleLinear()
  .domain([0,mean,d3.max(heatmap_data.map(d => d.donated_amount))])
  .range(['#fde0dd','#fa9fb5','#c51b8a'])
  
  const countries = d3.set(heatmap_data.map(d=> d.donor)).values();
   const y_scale = d3.scaleBand().domain(Donors).range([0,height]).padding(0.005);
   
   
   
  g.append('g')
  .append('rect')
   .attr('x', 0)
    .attr('y',0)
  .attr('width', width)
    .attr('height', height)
   .attr('fill','lightgray')
   
   g.append('g')
  .attr('transform', `translate(0,${height})`)
   .call(d3.axisBottom(x_scale))
   .append('text')
      .attr('x', (width-margin.left-margin.right) / 2 )
      .attr('y', height+20)
      .attr('fill', 'black') 
      .attr('text-anchor', 'middle')
	  .attr('font-family', 'sans-serif')
	  .attr("font-size", 20)
      .text('Recipient');
  
  g.append('g')
    .attr('transform', 'translate(0,-1)')
    .call(d3.axisTop(x_scale))
  .append('text')
      .attr('x', (width-margin.left-margin.right) / 2 )
      .attr('y', -30)
      .attr('fill', 'black') 
      .attr('text-anchor', 'middle')
	  .attr('font-family', 'sans-serif')
	  .attr("font-size", 20)
      .text('Recipient');
	  
 

  
 g.append('g')
    .attr('transform', 'translate(0,0 )')
    .call(d3.axisLeft(y_scale))
	.append('text')
      .attr('x',-50)
      .attr('y', height/2)
      .attr('fill', 'black') 
	   .attr('font-family', 'sans-serif')
      .attr('text-anchor', 'top')
	  .attr("font-size", 19)
      .text('Donor');
  
  g.selectAll()
    .data(heatmap_data)
    .enter()
    .append('rect')
    .attr('x', (d) => x_scale(d.recipient))
    .attr('y', (d) => y_scale(d.donor))
    .attr('width', x_scale.bandwidth())
    .attr('height', y_scale.bandwidth())
    .attr('fill', (d=> color_1(d.donated_amount)))
	.style("stroke", 'lightgray')
    .style("stroke-width", 1);
  
  return svg.node()
}

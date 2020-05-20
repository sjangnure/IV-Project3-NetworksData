Promise.all([
  d3.json('proj3_vis1.json'),
  d3.json('proj3_vis2.json')
]).then(([heatmap_data,data_pie]) => {
  vis1(heatmap_data,d3.select('#vis1'));
  vis2(heatmap_data,data_pie,d3.select('#vis2'));
  //vis3(heatmap_data2,sorted_country,d3.select('#vis3'));
});




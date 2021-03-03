

// Add options to dropdown
let dropdown = d3.select('#selDataset');
for(let i = 0; i < 153; i++) {
    dropdown.append('option').text(i)
}

// Check if value is in arra y(God, I miss Python)
function isIn (value, array) {
    for(let i = 0; i < array.length; i++) {
        if (array[i] === value) {
            return true;
        }
    }
    return false;
}

// Function to be called when a dropdown sample is selected
function optionChanged(input) {
// Get sample-specific data
let samples = data.samples[input];
let ids = samples.otu_ids;
let vals = samples.sample_values;
let labels = samples.otu_labels;

//find ten highest values
let highest = vals.sort(function(a, b) { return a - b}).reverse().slice(0, 10);
let topIds = [];
let topVals = []
let topLabels = [];
for(let i = 0; i < ids.length; i++) {
    if (isIn(vals[i], highest)) {
        topIds.push(ids[i].toString());
        topVals.push(vals[i]);
        topLabels.push(labels[i]);
    }
    if(topVals.length === 10) {
        break;
    }
}

// bar chart
var trace1 = {
    x: topIds,
    y:topVals,
    text:topLabels,
    type:'bar',
    orientation:'h',
    marker: {
        line: {
            width: 2
        }
    }
    
}
// Create chart
Plotly.newPlot('bar', [trace1])


//bubble chart
var trace2 = {
    x: ids,
    y: vals,
    mode: 'markers',
    marker: {
      size: vals,
      color:ids
    },
    text:labels
  };
  // Create
  Plotly.newPlot('bubble', [trace2])

  // Metadata
  let meta = data.metadata[input];
  let metadata = d3.select('#sample-metadata')
  // Clear old data
  metadata.selectAll('p').remove()
  // Add metadata rows 
let keys = Object.keys(meta);
keys.forEach( function(key) {metadata.append('p').text(`${key}: ${meta[key]}`)} )

}

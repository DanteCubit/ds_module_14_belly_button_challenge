// Build the metadata panel Instructor refactored first part of this code
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let info = metadata.filter(x => x.id == sample)[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
    for (const [key, value] of Object.entries(info)) {
      panel.append("h6").text(`${key}: ${value}`);
  }});
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let sample_data = data.samples;

    // Filter the samples for the object with the desired sample number
    let info = sample_data.filter(x => x.id === sample)[0];
    console.log(info);


    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = info.otu_ids;
    let otu_labels = info.otu_labels;
    let sample_values = info.sample_values;

    //Refactored with the help of ChatGPT
    // Build a Bubble Chart
    let trace2 = {
      x: otu_ids,
      y: sample_values,
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: sample_values,
        colorscale: "Jet"
      },
      text: otu_labels
      };

      let bubble_trace = [trace2];

    // Render the Bubble Chart
    let trace2_layout = {
      title: 'Bacteria Cultures per Sample',
      xaxis: { title: 'OTU IDs' },
      yaxis: { title: 'Sample Values' }
    };

    Plotly.newPlot('bubble', bubble_trace, trace2_layout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let bar_y = otu_ids.map(x => `OTU: ${x}`);
    console.log(bar_y);

    
    let color_values = sample_values.slice(0, 10).reverse();
    
    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let trace1 = {
      x: sample_values.slice(0, 10).reverse(),
      y: bar_y.slice(0, 10).reverse(),
      type: 'bar',
      marker: {
        color: color_values,
        colorscale: "Jet",
        colorbar: { title: 'Sample Values'}
      },
      text: otu_labels.slice(0, 10).reverse(),
      orientation: 'h'
    };


    // Render the Bar Chart
    let bar_trace = [trace1];
  
    let layout = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: { title: 'Number of Bacteria'}
    };

    Plotly.newPlot("bar", bar_trace, layout);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    console.log(data);

    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (let i = 0; i < names.length; i++){
      let name = names[i];
      dropdown.append("option").text(name);
    }

    // Get the first sample from the list
    let first_sample = names[0];
    console.log(first_sample);

    // Build charts and metadata panel with the first sample
    buildCharts(first_sample);
    buildMetadata(first_sample); //change for website
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();

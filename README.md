# ds_module_14_belly_button_challenge
Building an interactive dashboard to explore the Belly Button Biodiversity dataset which catalogs the microbes that colonize human navels.

// Build the metadata panel 
//Instructor helped refactor this part of the code
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

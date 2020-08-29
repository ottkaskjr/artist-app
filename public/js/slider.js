const updateSlider = (slider_id, output_id, overlay_id) => {
  var slider = document.getElementById(slider_id);
  var output = document.getElementById(output_id);
  output.innerHTML = slider.value; // Display the default slider value

  // Update the current slider value (each time you drag the slider handle)
  slider.oninput = function() {
    output.innerHTML = this.value;
    document.getElementById(overlay_id).setAttribute('data-overlay', this.value)
    updateOverlay(overlay_id);

  }
}
updateSlider('title-overlay-slider', 'slider-output', 'bg-div-overlay')
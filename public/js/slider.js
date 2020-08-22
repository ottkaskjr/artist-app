var slider = document.getElementById("title-overlay-slider");
var output = document.getElementById("slider-output");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
  document.getElementById('bg-div-overlay').setAttribute('data-overlay', this.value)
  updateOverlay();

}
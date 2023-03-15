var property=new Array();
var unit=new Array();
var factor=new Array();
property[0]="Area";
unit[0]=new Array("Square meter (m^2)", "Acre(acre)","Square centimeter","Square Kilometer");
factor[0]=new Array(1,4046.856,.0001,1000000);
property[1]="Length";
unit[1]=new Array("Meter(m)","Centimeter(cm)","Kilometer(km)","Millimeter(mm)");
factor[1]=new Array(1,.01,1000,.000001);
property[2] = "Time";
unit[2] = new Array("Second (sec)", "Day (mean solar)", "Day (sidereal)", "Hour (mean solar)", "Hour (sidereal)", "Minute (mean solar)", "Minute (sidereal)", "Month (mean calendar)", "Second (sidereal)", "Year (calendar)", "Year (tropical)", "Year (sidereal)");
factor[2] = new Array(1, 8.640E4, 86164.09, 3600, 3590.17, 60, 60, 2628000, .9972696, 31536000, 31556930, 31558150);
function UpdateUnitMenu(propMenu, unitMenu) {
    i = propMenu.selectedIndex;
    FillMenuWithArray(unitMenu, unit[i]);
  }
  
  function FillMenuWithArray(myMenu, myArray) {
    var i;
    myMenu.length = myArray.length;
    for (i = 0; i < myArray.length; i++) {
      myMenu.options[i].text = myArray[i];
    }
  }

     function CalculateUnit(sourceForm, targetForm) {
      var sourceValue = sourceForm.unit_input.value;
      sourceValue = parseFloat(sourceValue);
      if (!isNaN(sourceValue) || sourceValue == 0) {
        sourceForm.unit_input.value = sourceValue;
        ConvertFromTo(sourceForm, targetForm);
      }
    }
    
    function ConvertFromTo(sourceForm, targetForm) {
      var sourceIndex;
      var sourceFactor;
      var targetIndex;
      var targetFactor;
      var result;
      propIndex = document.property_form.the_menu.selectedIndex;
      sourceIndex = sourceForm.unit_menu.selectedIndex;
      sourceFactor = factor[propIndex][sourceIndex];
      targetIndex = targetForm.unit_menu.selectedIndex;
      targetFactor = factor[propIndex][targetIndex];
      result = sourceForm.unit_input.value;
      result = result * sourceFactor;
      result = result / targetFactor;
      targetForm.unit_input.value = result;
}
window.onload = function(e) {
  FillMenuWithArray(document.property_form.the_menu, property);
  UpdateUnitMenu(document.property_form.the_menu, document.form_A.unit_menu);
  UpdateUnitMenu(document.property_form.the_menu, document.form_B.unit_menu)
}
document.getElementByClass('numbersonly').addEventListener('keydown', function(e) {
  var key = e.keyCode ? e.keyCode : e.which;

  if (!([8, 9, 13, 27, 46, 110, 190].indexOf(key) !== -1 ||
      (key == 65 && (e.ctrlKey || e.metaKey)) || // Select All 
      (key == 67 && (e.ctrlKey || e.metaKey)) || // Copy
      (key == 86 && (e.ctrlKey || e.metaKey)) || // Paste
      (key >= 35 && key <= 40) || // End, Home, Arrows
      (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) || // Numeric Keys
      (key >= 96 && key <= 105) // Numpad
      (key == 190) // Numpad
    )) e.preventDefault();
});

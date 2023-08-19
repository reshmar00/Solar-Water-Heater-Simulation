# solar_heat_transfer_simulator

This is a simple software simulation of a heat transfer system using solar panels. I have made a few assumptions:\
&nbsp;&nbsp;&nbsp; 1. The end-use fluid being transferred through the pipes is water.\
&nbsp;&nbsp;&nbsp; 2. There is negligible wear and tear.\
&nbsp;&nbsp;&nbsp; 3. It is a drainback system where the pump moves water one way and stops when the desired temperature is reached.

### Input:
&nbsp;&nbsp;Sunlight (or solar irradiance, measured in W/m<sup>2</sup>)

### Variables:
&nbsp;&nbsp;a. Efficiency of solar panels in converting sunlight to electricity\
&nbsp;&nbsp;b. Efficiency of electric heater in converting electricity to heat\
&nbsp;&nbsp;c. Rate of pumping

### Output:
 &nbsp;&nbsp;**Main output:** Amount of heat preserved in the storage tank (kJ)\
 &nbsp;&nbsp;&nbsp;&nbsp;*Other output:* Overall efficiency of this system.

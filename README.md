# solar_heat_transfer_simulator

This is a simple software simulation of a heat transfer system using a solar collector (specifically, an evacuated tube collector) and storage tank. I have made a few assumptions:\

<img src="/solar_heating_system.png" alt="Solar Water Heating System">

&nbsp;&nbsp;&nbsp; 1. The end-use fluid being transferred through the pipes is *water*.\
&nbsp;&nbsp;&nbsp; 2. There is negligible wear and tear.\
&nbsp;&nbsp;&nbsp; 3. It is a drain-back system where the **pump moves water one way** and stops when the desired temperature is reached.\
&nbsp;&nbsp;&nbsp; 4. There is a **constant volume of water** that is being circulated.\
&nbsp;&nbsp;&nbsp; 5. I am not accounting for the efficiency of the pump.\
&nbsp;&nbsp;&nbsp; 6. There are other factors I'm disregarding in my **calculations** ~ they serve as a **reasonable approximation** and **should not be considered for 100% accuracy**.


### Inputs:
&nbsp;&nbsp; - Size/volume of storage tank ~ slider\
&nbsp;&nbsp; - Length of pipe (set a diameter and use that to get volume) ~ slider\
&nbsp;&nbsp; - Area of solar collector (set a depth and use that to get volume) ~ slider\
&nbsp;&nbsp; - Angle / tilt of solar collector ~ slider\
&nbsp;&nbsp; - Time of day (for solar hour angle) ~ drop down menu\
&nbsp;&nbsp; - Time of year (for declination index) ~ drop down menu\
&nbsp;&nbsp; - Starting temperature ~ slider

### Outputs:
 &nbsp;&nbsp;**Main output:** Temperature change in the water over time.\
 &nbsp;&nbsp;&nbsp;&nbsp;*Other output:* Overall efficiency of this system.

***

### References:
- Clean Energy Decision Support Centre. 2004. CLEAN ENERGY PROJECT ANALYSIS: RETScreen ® ENGINEERING & CASES TEXTBOOK SOLAR WATER HEATING PROJECT ANALYSIS CHAPTER. RETScreen ® International. ISBN: 0-622-35674-8.*

*I have used the following formulae:

$$
Q_{coll} = F_{R}(τα) G − F_{R}U_{L}ΔT
$$

&nbsp;&nbsp;&nbsp;&nbsp; where *Q<sub>coll</sub>* is the energy collected per unit collector area (m<sup>2</sup>) per unit time (s)\
	 &nbsp;&nbsp;&nbsp;&nbsp; *F<sub>R</sub>* is the collector's heat removal factor,\
	 &nbsp;&nbsp;&nbsp;&nbsp; *τ* is the transmittance of the cover,\
	 &nbsp;&nbsp;&nbsp;&nbsp; *α* is the shortwave absorptivity of the absorber,\
	 &nbsp;&nbsp;&nbsp;&nbsp; *G* is the global incident solar radiation on the collector,\
	 &nbsp;&nbsp;&nbsp;&nbsp; *U<sub>L</sub>* is the overall heat loss coefficient of the collector, and\
	 &nbsp;&nbsp;&nbsp;&nbsp; *ΔT* is the temperature differential between the working fluid entering the collectors and outside.

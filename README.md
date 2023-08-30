# Solar Water Heater Simulation

This program is a software simulation of a **solar water heating** system. The system is compsed of:

- a Solar Collector (a device that transforms the radiative energy from the sun into heat)
- a Storage Tank (a reservoir to store hot water)
- Pipes (hollow cylinders for allowing hot water to be transferred from the solar collector to the storage tank)
- a Pump (machine used to move from hot water from the solar collector to the storage tank)
- an Environment (the Sun)

<img src="https://github.com/reshmar00/solar_heat_transfer_simulator/blob/main/solar_heating_system.jpg" alt="Solar Water Heating System">

For the purpose of this simulation, I have assumed that this system specifically uses an **evacuated tube collector**.

This simulation primarily tracks two values: heat and temperature.

## About this app

### How to use it:
First, install the dependencies chart.js and node.js.\
Then, clone this repository and open index.html in a browser.\

### Technologies used:
- JavaScript
- JEST
- HTML
- CSS
- Chart.js

## Technical details:

### **Heat**

The amount of heat the solar collector (i.e., the evacuated tube collector) is able to generate from the sun's rays can be described by the following equation<sup>[1]</sup>:


$$
Q_{coll} = F_{R}(τα) G − F_{R}U_{L}ΔT
$$

&nbsp;&nbsp;&nbsp;&nbsp; where *Q<sub>coll</sub>* is the energy collected per unit collector area per unit time. Its unit is J/m<sup>2</sup>s\
	 &nbsp;&nbsp;&nbsp;&nbsp; *F<sub>R</sub>* is the collector's heat removal factor,\
	 &nbsp;&nbsp;&nbsp;&nbsp; *τ* is the transmittance of the cover,\
	 &nbsp;&nbsp;&nbsp;&nbsp; *α* is the shortwave absorptivity of the absorber,\
	 &nbsp;&nbsp;&nbsp;&nbsp; *G* is the global incident solar radiation on the collector,\
	 &nbsp;&nbsp;&nbsp;&nbsp; *U<sub>L</sub>* is the overall heat loss coefficient of the collector, and\
	 &nbsp;&nbsp;&nbsp;&nbsp; *ΔT* is the temperature differential between the working fluid entering the collectors and outside.


“Generic” values are provided for glazed and evacuated collectors.

For evacuated collectors,  _**F<sub>R</sub>(τα)**_ = 0.58 and _**F<sub>R</sub><sub>L</sub>**_ = 0.7 (W/m<sup>2</sup>)/ºC. These values correspond to a Fournelle evacuated tube collector (Philips technology; Hosatte, 1998).

I have decided to use both these generic values for my simulation. This leaves the variables _**G**_ and _**ΔT**_

#### ΔT - Temperature differential between the fluid in the collector and outside

Initially, this value corresponds to the temperature difference between the environment (ambient temperature) and the starting temperature of the water in the collector (before it begins the heating process)

$$
ΔT = T_{ambient} - T_{fluid}
$$

Once the collector starts heating the water and redistributes it to the system, this value will correspond to difference between the starting temperature of the water and the new temperature after being heated 

$$
ΔT = T_{new} - T_{start}
$$

#### G - Global Incident solar radiation on the collector

The global incident solar radiation on the collector can be described by the following equation<sup>[2]</sup>:

$$
G = I_{bt} + I_{dt} + I_{rt}
$$

&nbsp;&nbsp;&nbsp;&nbsp; where *G* is the total solar irradiance on a tilted surface. Its unit is W/m<sup>2</sup>\
	&nbsp;&nbsp;&nbsp;&nbsp; *I<sub>bt</sub>* is the direct irradiance,\
	&nbsp;&nbsp;&nbsp;&nbsp; *I<sub>dt</sub>* is the diffuse irradiance, and\
	&nbsp;&nbsp;&nbsp;&nbsp; *I<sub>rt</sub>* is the reflected irradiance

We can compute the direct irradiance by using the following equation<sup>[1]</sup>[citation]:


$$
I_{bt} = H Rb
$$

&nbsp;&nbsp;&nbsp;&nbsp; where *H* is the monthly average beam radiation and\
	&nbsp;&nbsp;&nbsp;&nbsp; *R<sub>b</sub><sup>*</sup>* is a purely geometrical factor, which depends only on collector orientation, site latitude, and time of year

We can compute the diffuse irradiance by using the following equation<sup>[1]</sup>:

$$
I_{dt} = H \biggl( 1 + \frac{cos(β)}{2} \biggr)
$$

&nbsp;&nbsp;&nbsp;&nbsp; where *β* is the angle/slope of the collector

We can compute the reflected irradiance by using the following equation<sup>[1]</sup>:

$$
I_{rt} = ρ_{g} ⋅ I_{dt}
$$

&nbsp;&nbsp;&nbsp;&nbsp; where *ρ<sub>g</sub>* is the ground reflectivity, which is assumed to be 0.2 when the monthly average temperature is above 0°C

<sup>*</sup>The geometric factor R<sub>b</sub> can be computed using the folloeing equation<sup>[3]</sup>[citation]:

$$
R_{b} = \biggl( \frac{cosδ cosω cos(φ-β) + sinφ sin(φ-β)}{cosφ cosδ cosω + sinφ sinδ} \biggr)
$$

&nbsp;&nbsp;&nbsp;&nbsp; where *δ* is the angular position of the sun at solar noon, called declination<sup>*</sup>,\
	&nbsp;&nbsp;&nbsp;&nbsp; *ω* is the solar hour angle<sup>*</sup>,\
	&nbsp;&nbsp;&nbsp;&nbsp; *φ* is the latitude, and\
	&nbsp;&nbsp;&nbsp;&nbsp; *β* is the angle/slope of the collector


<sup>*</sup>The declination is the angular position of the sun at solar noon, with respect to the plane of the equator. Its value in degrees is given by Cooper’s equation:

$$
δ = 23.45 sin\biggl( 2π \frac{284+n}{365} \biggr)
$$

&nbsp;&nbsp;&nbsp;&nbsp; where *n* is the day of year (i.e. n=1 for January 1, n=32 for February 1, etc.).

<sup>*</sup>The solar hour angle is the angular displacement of the sun east or west of the local meridian; morning negative, afternoon positive. A simplified version of calculating the solar hour angle is described below:

$$
ω = 15 t - 12 
$$

&nbsp;&nbsp;&nbsp;&nbsp; where *t* is the time of the day (i.e. t=12 for noon, t=24 for midnight, etc.).

***

### **Temperature**

Specific heat capacities provide a means of mathematically relating the amount of thermal energy gained (or lost) by a sample of any substance (in our case, water) to its mass and its resulting temperature change. The relationship between these four quantities is often expressed by the following equation:

$$
Q = m ⋅ C ⋅ ΔT
$$

&nbsp;&nbsp;&nbsp;&nbsp; where *Q* is the quantity of heat transferred to the water. Its unit is J/m<sup>2</sup>s\
	&nbsp;&nbsp;&nbsp;&nbsp; *m* is the mass of the water,\
	&nbsp;&nbsp;&nbsp;&nbsp; *C* is C is the specific heat capacity of water and,\
	&nbsp;&nbsp;&nbsp;&nbsp; *ΔT* is the resulting temperature change of the water,\

We know that density (ρ) is mass (m) over volume (V). In our simulation, we know the volume of water being used: the total volume of the tank in combination with the pipes and solar collector. The density of water is about 1000 kg/m<sup>3</sup>. From this, we can use the density formula to calculate our water's mass.

$$
m = ρV
$$

We are calculating the heat generated in the solar collector using the first formula<sup>[1]</sup>. We can use that information in combination with the general thermal energy equation to deduce the new temperature of the water thus:

$$
ΔT = \biggl( \frac{Q}{ρVC} \biggr)
$$

or

$$
TNew - TStart = \biggl( \frac{Q}{ρVC} \biggr)
$$

which then gives us

$$
TNew = TStart + \biggl( \frac{Q}{ρVC} \biggr)
$$

This equation allows us to track the change in temperature given the thermal energy.

My simulation uses a combination of both these equations to track the changes in the water's temperature with time and plots a graph that tracks these changes in real time (or based on a time step chosen by the user).

**Disclaimer:** My calculations serve as a **reasonable approximation** because there are certain factors I have not accounted for.

List of my assumptions:\
&nbsp;&nbsp;&nbsp; 1. There is a **constant volume of water** that is being circulated.\
&nbsp;&nbsp;&nbsp; 2. I am not measuring how the heat gets dissipated throughout the total volume of water; just how long it takes to heat it all up.\
&nbsp;&nbsp;&nbsp; 3. It is a drain-back system where the **pump moves water one way** and stops when the desired temperature is reached.\
&nbsp;&nbsp;&nbsp; 4. There is negligible wear and tear.\
&nbsp;&nbsp;&nbsp; 5. I am not accounting for the efficiency of the pump.\
&nbsp;&nbsp;&nbsp; 6. The solar noon and solar hours coincide with the local standard time (this is not always the case).\
&nbsp;&nbsp;&nbsp; 7. I am not taking the azimuth angle into account in my calculation for the geometric factor, R<sub>b</sub>.\
&nbsp;&nbsp;&nbsp; 8. I have taken the latitude as a constant (39.3210° N - it is the latitude of Utah).
&nbsp;&nbsp;&nbsp; 9. I am not accounting for heat loss through the pipes or how efficient the storage tank is at maintaining the temperature of the water inside it.
&nbsp;&nbsp;&nbsp; 10. I have used a list of average temperatures to correspond to each month of the year (for the ambient temperature).
&nbsp;&nbsp;&nbsp; 11. If the sun is below the horizon, I return a geometric factor (R<sub>b</sub>) of zero. This can be handled differently.


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
1. [Clean Energy Decision Support Centre. 2004. CLEAN ENERGY PROJECT ANALYSIS: RETScreen ® ENGINEERING & CASES TEXTBOOK SOLAR WATER HEATING PROJECT ANALYSIS CHAPTER. RETScreen ® International. ISBN: 0-622-35674-8.](https://www.solarthermalworld.org/sites/default/files/story/2015-05-31/textbook_swh.pdf)

2. [Huang, B., Huang, J., Xing, K., Liao, L., Xie, P., Xiao, M., & Zhao, W. "Development of a Solar-Tracking System for Horizontal Single-Axis PV Arrays Using Spatial Projection Analysis." Energies, vol. 16, no. 1, 2023, pp. 4008. Published 10 May 2023.](https://doi.org/10.3390/en16104008)

3. [Basunia, MA, H Yoshio, and T Abe. "Simulation of Solar Radiation Incident on Horizontal and Inclined Surfaces." TJER, vol. 9, no. 2, 2012, pp. 27-35. Department of Soils, Water & Agricultural Engineering, College of Agriculture and Marine Sciences, Sultan Qaboos University, Al-Khod, Muscat, Sultanate of Oman. Department of Biomechanical Systems, Ehime University, Matsuyama, Japan. Received 2 January 2010; accepted 25 December 2011.](https://journals.squ.edu.om/index.php/tjer/article/download/113/125)

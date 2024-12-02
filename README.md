# Elliptic Curve Calculator

The idea of this project is to create a visualization of Elliptic and Hyperelliptic Curves in Finite Fields.


## Elliptic Curve

The elliptic curve based on the equation y^2 = x^3 + ax + b is drawn using plotly-js.  
I want to explore the ring of isogenies over an Elliptic Curve when the number of points N is prime. 
With characteristic p, if 3 | p-1 then there are 3 roots of the equation x^3 = 1 in F_p.  
Hence there are a isogenies phi: (x, y) -> (rx,y) with r^3 = 1. 
We can say that (x,y) ; (rx,y) and (r^2 * x, y) are on the same isogeny ring. (Name to change)
phi will be equal to an isogeny of the form [n]E where n satisfy n^3 = 1 [N].  
Theses points are easily recognizable between each other. Can we have patterns which allow easy recognition for other rings ?  

The basic setup with p = 43, a = 0 and b = 7 highlight this phenomena. 

### TODO 

- Finite fields extension
- Exploration on pattern recognition (polynomes ?)
- Hyperelliptic Curves and divisor selection for operation
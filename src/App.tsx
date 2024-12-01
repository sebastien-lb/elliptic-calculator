/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import './App.css'
import Plot from 'react-plotly.js';
import { 
  getPointsOnEllipticCurve, 
  Point, 
  isPrime, 
  getPrimeFactors, 
  getPrimitiveRootsOfPrimeFactors, 
  pointMultiplication 
} from './lib';
 

function App() {
  const [characteristic, setCharacteristic] = useState(43)

  const [a, setA] = useState(0)
  const [b, setB] = useState(7)

  const [points, setPoints] = useState<Point[]>([])
  const [primitiveRoots, setPrimitiveRoots] = useState<{[a in number]: bigint[]}>({})
  
  useEffect(() => {
    setPoints(getPointsOnEllipticCurve({ a: BigInt(a), b: BigInt(b), p: BigInt(characteristic) }))
  }, [a, b, characteristic])

  useEffect(() => {
    setPrimitiveRoots(getPrimitiveRootsOfPrimeFactors(BigInt(points.length + 1)))
  }, [points])

  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null)

  console.log(primitiveRoots)

  const pointSuites = selectedPoint && isPrime(BigInt(characteristic)) ? Object.keys(primitiveRoots).reduce((acc, key: string) =>  ({
    [key]: new Array(Number(key) - 1).fill(0).map((_, i) => pointMultiplication({ a: BigInt(a), b: BigInt(b), p: BigInt(characteristic) }, selectedPoint, BigInt(Number(primitiveRoots[Number(key)][1])) ** BigInt(i + 1))),
    ...acc,
  }), Object({})) : {};

  return (
    <>
      <h1>Elliptic Curve Calculator</h1>
      <div>
        <span>Field Characteristic</span>
        <input value={characteristic} onChange={(event) => setCharacteristic(Number(event.target.value || 2))} type="number" />
        {!isPrime(BigInt(characteristic)) && <span>{characteristic} is not prime !</span>}
        <br />
        <span>{characteristic - 1} = {getPrimeFactors(BigInt(characteristic-1)).map(x => Number(x)).join(" * ")}</span>
        <p>Elliptic curve of the form y^2 = x^3 + ax + b 
        <input value={a} onChange={(event) => setA(Number(event.target.value))} type="number" />
        <input value={b} onChange={(event) => setB(Number(event.target.value))} type="number" />
        </p>
      </div>
      <div>
      <p>
          There are {points.length + 1} points on the Curve 
          <br />
          {points.length + 1} is prime ? {isPrime(BigInt(points.length + 1)).toString()}
          <br />
          <span>{points.length} = {getPrimeFactors(BigInt(points.length)).map(x => Number(x)).join(" * ")}</span>
          <br />
          <span>Some primitive roots of {points.length + 1} of order dividing p-1</span>
          <br />
          {primitiveRoots && Object.keys(primitiveRoots).map((key) => <><span>{key}{" : "}{primitiveRoots[Number(key)].map((x: bigint) => Number(x)).join(" | ")}</span><br/></>)}
          </p>
      </div>
      <section>
        <Plot 
          data={[
            {
              x: points.map(point => Number(point.x)),
              y: points.map(point => Number(point.y)),
              type: 'scatter',
              mode: 'markers',
              name: 'Curve',
              marker: {color: 'blue'},
            },
            {
              x: selectedPoint ? [Number(selectedPoint.x)] : [],
              y: selectedPoint ? [Number(selectedPoint.y)] : [],
              type: 'scatter',
              mode: 'markers',
              name: 'Selected Point',
              marker: {color: 'red'},
            },
            ...(Object.keys(pointSuites)).map((key) => ({
              x: pointSuites[key].map((point: Point) => Number(point.x)),
              y: pointSuites[key].map((point: Point) => Number(point.y)),
              type: 'scatter' as any,
              mode: 'markers',
              name: 'Ring of ' + primitiveRoots[Number(key)][1] + ' -  isogeny [' + primitiveRoots[Number(key)][1] + ']',
              // marker: {color: 'green'},
            }))
          ]}
          onClick={(data) => {
            console.log(`on Click event data:`, data)
            if (data.points.length === 1) {
              const point = points[data.points[0].pointIndex]
              setSelectedPoint(point)
            }
          }}
          layout={ {width: 1100, height: 600, title: {text: 'Curve'}} }
        />
        
      </section>
    </>
  )
}

export default App

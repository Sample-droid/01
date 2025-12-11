import React, { useState, useMemo } from 'react';
    import { createRoot } from 'react-dom/client';
    import {
      Container, Row, Col
    } from 'react-bootstrap';
    import {
      Box, Typography, Slider,
      TextField, Button, Card, CardContent
    } from '@mui/material';

    const emissionFactors = {
      car: 0.271, // kg CO₂ per mile
      flight: 0.158, // kg CO₂ per passenger-mile
      electricity: 0.527 // kg CO₂ per kWh
    };

    const CarbonCalculator = () => {
      const [miles, setMiles] = useState(0);
      const [flightMiles, setFlightMiles] = useState(0);
      const [kwh, setKwh] = useState(0);

      const totalEmissions = useMemo(() => {
        return (
          miles * emissionFactors.car +
          flightMiles * emissionFactors.flight +
          kwh * emissionFactors.electricity
        ).toFixed(2);
      }, [miles, flightMiles, kwh]);

      return (
        <Container className="my-8 px-4 sm:px-6 lg:px-8">
          <Typography variant="h4" className="text-center font-bold text-gray-800 mb-6">
            Carbon Footprint Calculator
          </Typography>
          <Row className="gap-y-6">
            {/* Car Travel */}
            <Col md={4} className="flex justify-center">
              <Card className="w-full max-w-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <Typography className="text-lg font-semibold text-gray-700 mb-4">
                    Car Travel (miles)
                  </Typography>
                  <Slider
                    value={miles}
                    onChange={(_, v) => setMiles(v)}
                    step={10}
                    marks
                    min={0}
                    max={1000}
                    valueLabelDisplay="auto"
                    className="mb-4"
                    sx={{ color: '#10B981' }}
                  />
                  <TextField
                    type="number"
                    label="Miles driven"
                    value={miles}
                    onChange={e => setMiles(Number(e.target.value))}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      className: "border-gray-300 focus:border-green-500"
                    }}
                  />
                </CardContent>
              </Card>
            </Col>
            {/* Flight Travel */}
            <Col md={4} className="flex justify-center">
              <Card className="w-full max-w-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <Typography className="text-lg font-semibold text-gray-700 mb-4">
                    Air Travel (miles)
                  </Typography>
                  <Slider
                    value={flightMiles}
                    onChange={(_, v) => setFlightMiles(v)}
                    step={50}
                    marks
                    min={0}
                    max={5000}
                    valueLabelDisplay="auto"
                    className="mb-4"
                    sx={{ color: '#3B82F6' }}
                  />
                  <TextField
                    type="number"
                    label="Flight miles"
                    value={flightMiles}
                    onChange={e => setFlightMiles(Number(e.target.value))}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      className: "border-gray-300 focus:border-blue-500"
                    }}
                  />
                </CardContent>
              </Card>
            </Col>
            {/* Electricity Usage */}
            <Col md={4} className="flex justify-center">
              <Card className="w-full max-w-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <Typography className="text-lg font-semibold text-gray-700 mb-4">
                    Electricity (kWh)
                  </Typography>
                  <Slider
                    value={kwh}
                    onChange={(_, v) => setKwh(v)}
                    step={10}
                    marks
                    min={0}
                    max={2000}
                    valueLabelDisplay="auto"
                    className="mb-4"
                    sx={{ color: '#F59E0B' }}
                  />
                  <TextField
                    type="number"
                    label="kWh used"
                    value={kwh}
                    onChange={e => setKwh(Number(e.target.value))}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      className: "border-gray-300 focus:border-yellow-500"
                    }}
                  />
                </CardContent>
              </Card>
            </Col>
          </Row>
          {/* Result */}
          <Box className="text-center mt-8">
            <Typography variant="h5" className="text-gray-600 mb-2">
              Your estimated annual CO₂ emissions:
            </Typography>
            <Typography variant="h3" className="text-green-600 font-bold">
              {totalEmissions} kg CO₂
            </Typography>
            <Button
              variant="contained"
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
              onClick={() => alert(`Total: ${totalEmissions} kg CO₂`)}
            >
              Save My Results
            </Button>
          </Box>
        </Container>
      );
    };
    export default CarbonCalculator;
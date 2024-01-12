import React, { useState, useEffect } from "react";
import TableD from "./assets/components/TableD";

const App = () => {
  const [mainLimit, setMainLimit] = useState(0);
  const [mainRetention, setMainRetention] = useState(0);
  const [executionType, setExecutionType] = useState("Simple");
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [calculationResults, setCalculationResults] = useState([]);

  useEffect(() => {
    // Validación de entrada al cambiar los valores
    if (mainLimit && mainRetention && executionType) {
      setShowResults(false);
    }
  }, [mainLimit, mainRetention, executionType]);

  const triggerCalculation = () => {
    setShowResults(false);
    if (isInputValid()) {
      setIsLoading(true);

      // Simulación de ejecución con un retraso artificial de 3 segundos
      setTimeout(() => {
        calculateResults();
        setShowResults(true);
        setIsLoading(false);
      }, 3000);
    }
  };

  const isInputValid = () => !!mainLimit && !!mainRetention && !!executionType;

  const getRandomNumber = (min, max) => {
    return Math.random() * (max - min + 1) + min;
  };

  const calculateResults = () => {
    // Generar un número aleatorio entre 5 y 20 para la cantidad de resultados
    const numberOfResults = getRandomNumber(5, 20);

    // Mock de resultados de cálculo (reemplazar con la lógica real)
    const results = Array.from({ length: numberOfResults }, (_, index) => ({
      referenceDate: "22 Jan 2017",
      benchmark1: getRandomNumber(10, 30), // Mock de valores aleatorios entre 10 y 30
      benchmark2: getRandomNumber(10, 30),
    }));

    setCalculationResults(results);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white border rounded shadow-lg transition-all ease-in-out">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Actuarial Model Calculator
      </h1>
      <section className="flex flex-col gap-3">
        <div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Main Limit (£)
            </label>
            <input
              type="number"
              value={mainLimit}
              onChange={(e) => setMainLimit(e.target.value)}
              min="0"
              className="w-full p-2 border rounded focus:outline-none focus:border-[#48086f]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Main Retention (£)
            </label>
            <input
              type="number"
              value={mainRetention}
              onChange={(e) => setMainRetention(e.target.value)}
              min="0"
              className="w-full p-2 border rounded focus:outline-none focus:border-[#48086f]"
              required
            />
            {!isInputValid() && (
              <p className="my-2 text-[#463053]">Wrong value type</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Type of Execution
            </label>
            <select
              value={executionType}
              onChange={(e) => setExecutionType(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:border-[#48086f]"
              required
            >
              <option value="Simple">Simple</option>
              <option value="Complex">Complex</option>
            </select>
          </div>
          <button
            onClick={triggerCalculation}
            disabled={!isInputValid()}
            className="bg-[#48086f] text-white px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none  focus:bg-purple-700 hover:bg-purple-700"
          >
            Trigger Calculation
          </button>
        </div>

        {showResults && (
          <div className="mt-4">
            <table className="w-full border-collapse border">
              <thead>
                <tr>
                  <th className="p-2 border bg-[#48086f] text-white">
                    Reference Date
                  </th>
                  <th className="p-2 border bg-[#48086f] text-white">
                    Benchmark 1
                  </th>
                  <th className="p-2 border bg-[#48086f] text-white">
                    Benchmark 2
                  </th>
                </tr>
              </thead>
              <tbody>
                {calculationResults.map((result, index) => (
                  <tr key={index}>
                    <TableD result={result} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      {isLoading && (
        <div className="text-xl font-bold text-[#48086f] text-center mt-4">
          Loading...
        </div>
      )}
    </div>
  );
};

export default App;

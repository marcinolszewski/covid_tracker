import React, { useState, useEffect } from 'react';
import SimpleSummary from '../simpleSummary/SimpleSummary';
import styles from './SummaryChart.module.scss';
import SimpleTableContainer from '../simpleTableContainer/SimpleTableContainer';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const SummaryChart = () => {
  const [loading, setLoading] = useState(true);
  const [newConfirmed, setNewConfirmed] = useState(0);
  const [totalConfirmed, setTotalConfirmed] = useState(0);
  const [newDeaths, setNewDeaths] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);
  const [newRecovered, setNewRecovered] = useState(0);
  const [totalRecovered, setTotalRecovered] = useState(0);
  const [countries, setCountries] = useState([]);
  const [weeklyPoland, setWeeklyPoland] = useState([]);
  const [chartReady, setChardReady] = useState(false);

  const summaryApiCall = async () => {
    const url = 'https://api.covid19api.com/summary';
    const response = await fetch(url);
    const data = await response.json();
    let countriesFromApi = [];

    data.Countries.map((el) => {
      countriesFromApi.push({
        name: el.Country,
        newConfirmed: el.NewConfirmed,
        newDeaths: el.NewDeaths,
        newRecovered: el.NewRecovered,
        totalConfirmed: el.TotalConfirmed,
        totalDeaths: el.TotalDeaths,
        totalRecovered: el.TotalRecovered,
      });
    });

    setNewConfirmed(data.Global.NewConfirmed);
    setTotalConfirmed(data.Global.TotalConfirmed);
    setNewDeaths(data.Global.NewDeaths);
    setTotalDeaths(data.Global.TotalDeaths);
    setNewRecovered(data.Global.NewRecovered);
    setTotalRecovered(data.Global.TotalRecovered);
    setCountries(countriesFromApi);
    setLoading(false);
  };

  const weeklyPolandCall = async () => {
    const url =
      'https://api.covid19api.com/total/country/poland/status/confirmed?from=2020-03-01T00:00:00Z&to=2020-04-07T00:00:00Z';
    const response = await fetch(url);
    const data = await response.json();
    let summaryCasesFromApi = [];
    data.map((el) =>
      summaryCasesFromApi.push({
        day: el.Date,
        cases: el.Cases,
      })
    );
    setWeeklyPoland(summaryCasesFromApi);
  };

  useEffect(() => {
    summaryApiCall();
    weeklyPolandCall();
  }, []);

  useEffect(() => {
    console.log(weeklyPoland);
    setChardReady(true);
  }, [weeklyPoland]);

  return (
    <div className={styles.wrapper}>
      <h2>World summary chart</h2>

      <div>
        {chartReady === false ? null : (
          <div>
            <BarChart
              width={600}
              height={300}
              data={weeklyPoland}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 10" />
              <XAxis dataKey="day" />
              <YAxis dataKey="cases" />
              <Tooltip />
              <Legend />
              <Bar dataKey="cases" fill="#82ca9d" />
            </BarChart>
          </div>
        )}
      </div>

      {loading ? (
        <p>loading...</p>
      ) : (
        <>
          <div className={styles.chartGrid}>
            <SimpleSummary label="New confirmed cases:" number={newConfirmed} />
            <SimpleSummary
              label="Total confirmed cases:"
              number={totalConfirmed}
            />
            <SimpleSummary label="New deaths:" number={newDeaths} />
            <SimpleSummary label="Total deaths:" number={totalDeaths} />
            <SimpleSummary label="New recovered:" number={newRecovered} />
            <SimpleSummary label="Total recovered:" number={totalRecovered} />
          </div>
          <div className={styles.table}>
            <SimpleTableContainer countries={countries} />
          </div>
        </>
      )}
    </div>
  );
};

export default SummaryChart;

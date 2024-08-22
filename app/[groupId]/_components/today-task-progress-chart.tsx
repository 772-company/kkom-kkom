"use client";

import _ from "lodash";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface TodayTaskProgressChartProps {
  numberOfTasks: number;
  numberOfDone: number;
}

const TodayTaskProgressChart = ({
  numberOfTasks,
  numberOfDone,
}: TodayTaskProgressChartProps) => {
  const numberOfOngoing = numberOfTasks - numberOfDone;

  const todayProgressData = [
    {
      name: "numberOfOngoing",
      value: numberOfOngoing,
    },
    {
      name: "numberOfDone",
      value: numberOfDone,
    },
  ];

  const [outerRadius, setOuterRadius] = useState(85);
  const [innerRadius, setInnerRadius] = useState(55);

  const updateRadius = () => {
    const width = window.innerWidth;

    if (width < 744) {
      setOuterRadius(70); // mobile
    } else {
      setOuterRadius(85); // tablet, pc
    }

    setInnerRadius(outerRadius - 30); // innerRadius = outerRadius - 30
  };

  useEffect(() => {
    updateRadius();
    window.addEventListener("resize", _.debounce(updateRadius));
    return () => {
      window.removeEventListener("resize", _.debounce(updateRadius));
    };
  }, [outerRadius]);

  return (
    <div className="h-[140px] w-[140px] md:h-[170px] md:w-[170px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart className="z-5">
          <defs>
            <linearGradient id="doneGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(163,230,53,1)" />
              <stop offset="100%" stopColor="rgba(16,185,129,1)" />
            </linearGradient>
          </defs>
          <Pie
            data={todayProgressData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            cornerRadius={20}
          >
            {todayProgressData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.name === "numberOfDone"
                    ? "url(#doneGradient)"
                    : `var(--background-tertiary)`
                }
                strokeWidth={0}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TodayTaskProgressChart;

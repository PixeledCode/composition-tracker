"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { format } from "date-fns";

interface Measurement {
  id: string;
  date: string;
  bodyFat: number;
  bmi: number;
  weight: number;
}

interface ProgressChartProps {
  measurements: Measurement[];
}

export function ProgressChart({ measurements }: ProgressChartProps) {
  if (measurements.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Progress Chart</CardTitle>
          <CardDescription>
            Your body composition trends over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            No measurements yet. Add your first measurement to see progress!
          </div>
        </CardContent>
      </Card>
    );
  }

  // Reverse to show oldest first for chart
  const chartData = measurements
    .slice()
    .reverse()
    .map((measurement) => ({
      date: format(new Date(measurement.date), "MMM dd"),
      bodyFat: Number(measurement.bodyFat.toFixed(1)),
      bmi: Number(measurement.bmi.toFixed(1)),
      weight: Number(measurement.weight.toFixed(1)),
    }));

  const chartConfig = {
    bodyFat: {
      label: "Body Fat %",
      color: "hsl(var(--chart-1))",
    },
    bmi: {
      label: "BMI",
      color: "hsl(var(--chart-2))",
    },
    weight: {
      label: "Weight (kg)",
      color: "hsl(var(--chart-3))",
    },
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Body Fat Percentage Trend</CardTitle>
          <CardDescription>
            Your primary tracking metric over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="bodyFat"
                  stroke="var(--color-chart-1)"
                  strokeWidth={3}
                  dot={{ fill: "var(--color-chart-1)", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Weight Trend</CardTitle>
            <CardDescription>Weight changes over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="var(--color-chart-3)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-chart-3)", strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>BMI Trend</CardTitle>
            <CardDescription>Body Mass Index over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="bmi"
                    stroke="var(--color-chart-2)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-chart-2)", strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

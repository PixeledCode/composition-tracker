"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  History,
  Calendar,
  Ruler,
  Scale,
  Activity,
  Download,
} from "lucide-react";
import { Button } from "./ui/button";

interface Measurement {
  id: string;
  date: string;
  waist: number;
  hip: number;
  weight: number;
  bodyFat: number;
  bmi: number;
  method: "south-asian" | "us-navy";
}

interface MeasurementHistoryProps {
  measurements: Measurement[];
}

export function MeasurementHistory({ measurements }: MeasurementHistoryProps) {
  const exportToCSV = () => {
    if (measurements.length === 0) return;

    const headers = [
      "Date",
      "Waist (cm)",
      "Hip (cm)",
      "Body Fat %",
      "Weight (kg)",
      "BMI (kg/m2)",
    ];

    const csvData = measurements.map((measurement) => [
      new Date(measurement.date).toLocaleDateString("en-US"),
      measurement.waist.toFixed(1),
      measurement.hip.toFixed(1),
      measurement.bodyFat.toFixed(1),
      measurement.weight.toFixed(1),
      measurement.bmi.toFixed(1),
    ]);

    const csvContent = [headers, ...csvData]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `body-measurements-${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (measurements.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            Measurement History
          </CardTitle>
          <CardDescription>
            Your previous measurements will appear here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No measurements recorded yet</p>
            <p className="text-sm">
              Add your first measurement above to get started
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              Measurement History
            </CardTitle>
            <CardDescription>
              Your {measurements.length} recorded measurements
            </CardDescription>
          </div>
          {measurements.length > 0 && (
            <Button
              onClick={exportToCSV}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-transparent"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {measurements.map((measurement) => {
            return (
              <div
                key={measurement.id}
                className="border rounded-lg p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {formatDate(measurement.date)}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Ruler className="h-3 w-3" />
                      Waist
                    </div>
                    <p className="font-medium">
                      {measurement.waist.toFixed(1)} cm
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Ruler className="h-3 w-3" />
                      Hip
                    </div>
                    <p className="font-medium">
                      {measurement.hip.toFixed(1)} cm
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Scale className="h-3 w-3" />
                      Weight
                    </div>
                    <p className="font-medium">
                      {measurement.weight.toFixed(1)} kg
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Activity className="h-3 w-3" />
                      BMI
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">
                        {measurement.bmi.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">
                      Body Fat Percentage
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">
                        {measurement.bodyFat.toFixed(1)}%
                      </span>
                      <Badge variant="secondary" className="text-white">
                        {measurement.method === "south-asian" ? "SA " : "US"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

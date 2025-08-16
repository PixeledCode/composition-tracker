"use client";

import { MeasurementForm } from "@/components/measurement-form";
import { ProgressChart } from "@/components/progress-chart";
import { SettingsDialog } from "@/components/settings-dialog";
import { StatsCards } from "@/components/stats-cards";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scale, Settings, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { MeasurementHistory } from "./components/measurement-history";

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

interface UserSettings {
  height: number;
  gender: "male" | "female";
  age: number;
  bodyFatCalculationMethod: "south-asian" | "us-navy";
}

export default function BodyTracker() {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [settings, setSettings] = useState<UserSettings>({
    height: 170,
    gender: "male",
    age: 30,
    bodyFatCalculationMethod: "south-asian",
  });
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const savedMeasurements = localStorage.getItem("body-measurements");
    const savedSettings = localStorage.getItem("user-settings");

    if (savedMeasurements) {
      setMeasurements(JSON.parse(savedMeasurements));
    }
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    } else {
      setShowSettings(true); // Show settings on first visit
    }
  }, []);

  const saveMeasurement = (waist: number, hip: number, weight: number) => {
    const bodyFat = calculateBodyFat(waist, hip, weight);
    const bmi = calculateBMI(weight, settings.height);

    const newMeasurement: Measurement = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      waist,
      hip,
      weight,
      bodyFat,
      bmi,
      method: settings.bodyFatCalculationMethod,
    };

    const updatedMeasurements = [newMeasurement, ...measurements];
    setMeasurements(updatedMeasurements);
    localStorage.setItem(
      "body-measurements",
      JSON.stringify(updatedMeasurements)
    );
  };

  const saveSettings = (newSettings: UserSettings) => {
    setSettings(newSettings);
    localStorage.setItem("user-settings", JSON.stringify(newSettings));
    setShowSettings(false);
  };

  const calculateBodyFat = (
    waist: number,
    hip: number,
    height: number
  ): number => {
    if (settings.bodyFatCalculationMethod === "south-asian") {
      return 0.567 * waist + 0.101 * hip - 31.8;
    } else {
      // US Navy method for body fat calculation
      if (settings.gender === "male") {
        return (
          Math.max(
            0,
            495 / (1.0324 - 0.19077 * Math.log10(waist - 0)) +
              0.15456 * Math.log10(height)
          ) - 450
        );
      } else {
        return Math.max(
          0,
          495 /
            (1.29579 -
              0.35004 * Math.log10(waist + hip - 0) +
              0.221 * Math.log10(height)) -
            450
        );
      }
    }
  };

  const calculateBMI = (weight: number, height: number): number => {
    return weight / Math.pow(height / 100, 2);
  };

  const latestMeasurement = measurements[0];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Body Composition Tracker
            </h1>
            <p className="text-muted-foreground">
              Track your body fat percentage and BMI over time
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowSettings(true)}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        {/* Stats Cards */}
        <StatsCards measurement={latestMeasurement} />

        <MeasurementForm onSave={saveMeasurement} />

        {/* Main Content */}
        <Tabs defaultValue="log" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="log" className="flex items-center gap-2">
              <Scale className="h-4 w-4" />
              Previous logs
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Progress
            </TabsTrigger>
          </TabsList>

          <TabsContent value="log">
            <MeasurementHistory measurements={measurements} />
          </TabsContent>

          <TabsContent value="progress">
            <ProgressChart measurements={measurements} />
          </TabsContent>
        </Tabs>

        {/* Settings Dialog */}
        <SettingsDialog
          open={showSettings}
          onOpenChange={setShowSettings}
          settings={settings}
          onSave={saveSettings}
        />
      </div>
    </div>
  );
}

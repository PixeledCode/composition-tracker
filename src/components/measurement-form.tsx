"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ruler } from "lucide-react";

interface MeasurementFormProps {
  onSave: (waist: number, hip: number, weight: number) => void;
}

export function MeasurementForm({ onSave }: MeasurementFormProps) {
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [weight, setWeight] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const waistNum = Number.parseFloat(waist);
    const hipNum = Number.parseFloat(hip);
    const weightNum = Number.parseFloat(weight);

    if (waistNum > 0 && hipNum > 0 && weightNum > 0) {
      onSave(waistNum, hipNum, weightNum);
      setWaist("");
      setHip("");
      setWeight("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Ruler className="h-5 w-5 text-primary" />
          New Measurement
        </CardTitle>
        <CardDescription>
          Enter your current measurements to track your body composition
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="waist">Waist (cm)</Label>
              <Input
                id="waist"
                type="number"
                step="0.1"
                placeholder="75.0"
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hip">Hip (cm)</Label>
              <Input
                id="hip"
                type="number"
                step="0.1"
                placeholder="95.0"
                value={hip}
                onChange={(e) => setHip(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                placeholder="70.0"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Save Measurement
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

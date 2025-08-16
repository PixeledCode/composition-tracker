"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserSettings {
  height: number;
  gender: "male" | "female";
  age: number;
  bodyFatCalculationMethod: "south-asian" | "us-navy";
}

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: UserSettings;
  onSave: (settings: UserSettings) => void;
}

export function SettingsDialog({
  open,
  onOpenChange,
  settings,
  onSave,
}: SettingsDialogProps) {
  const [height, setHeight] = useState(settings.height.toString());
  const [gender, setGender] = useState(settings.gender);
  const [age, setAge] = useState(settings.age.toString());
  const [bodyFatCalculationMethod, setBodyFatCalculationMethod] = useState(
    settings.bodyFatCalculationMethod
  );
  const savedSettings = localStorage.getItem("user-settings");

  React.useEffect(() => {
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setHeight(parsedSettings.height.toString());
      setGender(parsedSettings.gender);
      setAge(parsedSettings.age.toString());
      setBodyFatCalculationMethod(parsedSettings.bodyFatCalculationMethod);
    }
  }, [savedSettings]);

  const handleSave = () => {
    const heightNum = Number.parseFloat(height);
    const ageNum = Number.parseInt(age);

    if (heightNum > 0 && ageNum > 0) {
      onSave({
        height: heightNum,
        gender,
        age: ageNum,
        bodyFatCalculationMethod,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Personal Settings</DialogTitle>
          <DialogDescription>
            These settings are used to calculate your body fat percentage and
            BMI accurately.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="170"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="30"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select
              value={gender}
              onValueChange={(value: "male" | "female") => setGender(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Body Fat Calculation Method</Label>
            <Select
              value={bodyFatCalculationMethod}
              onValueChange={(value: "south-asian" | "us-navy") =>
                setBodyFatCalculationMethod(value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="south-asian">
                  South Asian Equation
                </SelectItem>
                <SelectItem value="us-navy">US Navy</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSave} className="w-full">
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

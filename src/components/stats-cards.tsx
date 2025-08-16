import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Scale, Target } from "lucide-react";

interface Measurement {
  bodyFat: number;
  bmi: number;
  weight: number;
  date: string;
}

interface StatsCardsProps {
  measurement?: Measurement;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export function StatsCards({ measurement }: StatsCardsProps) {
  const getBodyFatCategory = (bodyFat: number, gender = "male") => {
    if (gender === "male") {
      if (bodyFat < 6) return { category: "Essential", color: "text-blue-600" };
      if (bodyFat < 14)
        return { category: "Athletic", color: "text-green-600" };
      if (bodyFat < 18) return { category: "Fitness", color: "text-green-500" };
      if (bodyFat < 25)
        return { category: "Average", color: "text-yellow-600" };
      return { category: "Obese", color: "text-red-600" };
    } else {
      if (bodyFat < 14)
        return { category: "Essential", color: "text-blue-600" };
      if (bodyFat < 21)
        return { category: "Athletic", color: "text-green-600" };
      if (bodyFat < 25) return { category: "Fitness", color: "text-green-500" };
      if (bodyFat < 32)
        return { category: "Average", color: "text-yellow-600" };
      return { category: "Obese", color: "text-red-600" };
    }
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-600" };
    if (bmi < 25) return { category: "Normal", color: "text-green-600" };
    if (bmi < 30) return { category: "Overweight", color: "text-yellow-600" };
    return { category: "Obese", color: "text-red-600" };
  };

  if (!measurement) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Body Fat %</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-muted-foreground">--</div>
            <p className="text-xs text-muted-foreground">No data yet</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">BMI</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-muted-foreground">--</div>
            <p className="text-xs text-muted-foreground">No data yet</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weight</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-muted-foreground">--</div>
            <p className="text-xs text-muted-foreground">No data yet</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const bodyFatInfo = getBodyFatCategory(measurement.bodyFat);
  const bmiInfo = getBMICategory(measurement.bmi);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="border-l-4 border-l-primary">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Body Fat %</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {measurement.bodyFat.toFixed(1)}%
          </div>
          <p className={`text-xs font-medium ${bodyFatInfo.color}`}>
            {bodyFatInfo.category}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">BMI</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{measurement.bmi.toFixed(1)}</div>
          <p className={`text-xs font-medium ${bmiInfo.color}`}>
            {bmiInfo.category}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Weight</CardTitle>
          <Scale className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {measurement.weight.toFixed(1)} kg
          </div>
          <p className="text-xs text-muted-foreground">
            Last measurement on {formatDate(measurement.date)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

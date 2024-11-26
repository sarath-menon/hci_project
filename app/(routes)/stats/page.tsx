"use client";

import { Card } from "@/components/ui/card";
import { DatePicker } from "@/components/date-picker";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useState } from "react";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Header } from "@/components/Header";
import PageLayout from "@/components/page-layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectIcon } from "@radix-ui/react-select";
interface CallData {
  name: string;
  gf: number;
  airam: number;
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];
function StatsPage() {
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();

  return (
    <div className="flex flex-col">
      <Header heading="Communication Meter" />

      <PageLayout className="space-y-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm">From</label>
            <DatePicker date={fromDate} onSelect={setFromDate} />
          </div>

          <div>
            <label className="block text-sm">To</label>
            <DatePicker date={toDate} onSelect={setToDate} />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-2">Info to show</label>
          <Select>
            <SelectTrigger defaultValue="call-initiation">
              <SelectValue placeholder="Select info to show">
                Call initiation with gf❤️
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="call-initiation">
                Call initiation with gf❤️
              </SelectItem>
              {/* Add more options here as needed */}
            </SelectContent>
          </Select>
        </div>

        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Call initiation</h2>
          <div className="flex gap-8 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>gf</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Airam</span>
            </div>
          </div>

          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </Card>
      </PageLayout>
    </div>
  );
}

export default StatsPage;

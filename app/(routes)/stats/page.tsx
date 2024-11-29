"use client";

import { Card } from "@/components/ui/card";
import { Pie, PieChart, Cell } from "recharts";
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
import { ChartTooltip } from "@/components/ui/chart";
import { monthlyCallRatios } from "@/lib/data";

const chartConfig = {
  gf: {
    label: "GF",
    color: "hsl(var(--chart-1))",
  },
  airam: {
    label: "Airam",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

function StatsPage() {
  const [selectedMonth, setSelectedMonth] = useState<string>("all");

  function getChartData() {
    if (selectedMonth === "all") {
      const totalGf = monthlyCallRatios.reduce(
        (sum, month) => sum + month.gf,
        0
      );
      const totalAiram = monthlyCallRatios.reduce(
        (sum, month) => sum + month.airam,
        0
      );
      return [
        { name: "GF", value: totalGf },
        { name: "Airam", value: totalAiram },
      ];
    }

    const monthData = monthlyCallRatios.find(
      (month) => month.month === selectedMonth
    );

    if (!monthData) {
      return [
        { name: "GF", value: 50 },
        { name: "Airam", value: 50 },
      ];
    }

    return [
      { name: "GF", value: monthData.gf },
      { name: "Airam", value: monthData.airam },
    ];
  }

  return (
    <div className="flex flex-col">
      <Header heading="Communication Meter" />

      <PageLayout className="space-y-8">
        <div>
          <label className="block text-sm mb-2">Select Month</label>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger>
              <SelectValue placeholder="Select a month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Months</SelectItem>
              {monthlyCallRatios.map((month) => (
                <SelectItem key={month.month} value={month.month}>
                  {month.month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Card className="flex flex-col p-4">
          <div className="items-center pb-0">
            <h2 className="text-lg font-semibold">
              Call Initiation Distribution
            </h2>
            <p className="text-sm text-muted-foreground">
              {selectedMonth === "all" ? "All Months" : selectedMonth}
            </p>
          </div>

          <div className="flex gap-8 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-1))]"></div>
              <span>GF</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-2))]"></div>
              <span>Airam</span>
            </div>
          </div>

          <ChartContainer
            config={chartConfig}
            className="mx-auto h-[300px] w-full"
          >
            <PieChart width={300} height={300}>
              <Pie
                data={getChartData()}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                minAngle={30}
              >
                {getChartData().map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      index === 0
                        ? "hsl(var(--chart-1))"
                        : "hsl(var(--chart-2))"
                    }
                  />
                ))}
              </Pie>
              <ChartTooltip />
            </PieChart>
          </ChartContainer>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p>
              {selectedMonth === "all"
                ? "Showing total distribution across all months"
                : `Showing distribution for ${selectedMonth}`}
            </p>
          </div>
        </Card>
      </PageLayout>
    </div>
  );
}

export default StatsPage;

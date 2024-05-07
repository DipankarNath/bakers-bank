import React from "react";
import AnimatedCounter from "./AnimatedCounter";
import DoughnutChart from "./DoughnutChart";

const data = {
  datasets: [
    {
      label: "Banks",
      data: [1000, 1250, 3000, 500, 2075],
      backgroundColor: ["#8ecae6", "#219ebc", "#023047", "#ffb703", "#fb8500"],
    },
  ],
  labels: ["Bank 1", "Bank 2", "Bank 3", "Bank 4", "Bank 5"],
};

const TotalBalanceBox: React.FC<TotlaBalanceBoxProps> = ({
  accounts = [],
  totalBanks,
  totalCurrentBalance,
}) => {
  return (
    <section className="total-balance">
      <div className="total-balance-chart">
        <DoughnutChart accounts={data} />
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="header-2">Bank Accounts: {totalBanks}</h2>
        <div className="flex flex-col gap-2">
          <p className="total-balance-total">Total Current Balance</p>
          <div className="total-balance-amount flex-center gap-2">
            <AnimatedCounter amount={totalCurrentBalance} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TotalBalanceBox;

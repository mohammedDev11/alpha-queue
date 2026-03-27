import React from "react";
import RedeemCardBox from "./components/RedeemCardBox";
import PageIntro from "@/app/components/shared/page/PageIntro";

const page = () => {
  return (
    <div className="space-y-5">
      <PageIntro
        title="Redeem Card"
        description="Add credit to your account by entering your voucher code."
      />{" "}
      <RedeemCardBox />
    </div>
  );
};

export default page;

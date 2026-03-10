import Banner from "@/components/home/Banner";
import JoinCom from "@/components/home/JoinCom";
import JustTake from "@/components/home/JustTake";
import Philosophy from "@/components/home/Philosophy";
import React from "react";

const Homepage = () => {
  return (
    <div className="">
      <Banner />
      <Philosophy />
      <JustTake></JustTake>
      <JoinCom></JoinCom>

    </div>
  );
};

export default Homepage;
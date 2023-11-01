import { Fragment, useEffect } from "react";
import Layout from "../components/misc/layout";
import HeroHome from "../components/landing/hero-home";
import Exposition from "../components/landing/exposition";
import HowWord from "../components/landing/how-word";
import ProductionModels from "../components/landing/production-models";
import Intro from "../components/landing/intro";
import Statistics from "../components/landing/statistics";

export default function Home() {
  return (
    <Layout>
      <HeroHome />
      <Intro/>
      <Exposition />
      <HowWord />
      <ProductionModels/>
      <Statistics/>
    </Layout>
  )
}
import { Fragment, useEffect } from "react";
import Layout from "../components/misc/layout";
import HeroHome from "../components/landing/hero-home";
import Exposition from "../components/landing/exposition";

export default function Home() {
  return (
    <Layout>
      <HeroHome />
      <Exposition />
    </Layout>
  )
}
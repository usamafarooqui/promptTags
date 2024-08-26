import Feed from "@components/Feed";
import React from "react";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover And Share
        <br className="max-md:hidden" />
        <span className="orange_gradient">AI powered Prompts</span>
      </h1>
      <p className="desc text-center">
        {" "}
        Explore a world of creative prompts driven by AI. Whether you're looking
        to spark new ideas, enhance your creativity, or share your own, this is
        the place to start. Join a community of innovators and thinkers, and let
        your imagination run wild!
      </p>

      <Feed />
    </section>
  );
};

export default Home;

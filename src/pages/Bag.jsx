import React from "react";

function Bag({ game, reference }) {
  return (
    <section id="bag" className="text-2xl text-white" ref={reference}>
      <h1>Bag</h1>
    </section>
  );
}

export default Bag;

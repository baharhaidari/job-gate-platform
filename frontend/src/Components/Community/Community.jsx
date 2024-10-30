import React from "react";
import CreateThread from "./CreateThread";
import ThreadList from "./ThreadList";

const Community = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <ThreadList />
      <CreateThread />
    </div>
  );
};

export default Community;

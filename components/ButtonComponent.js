import React from "react";
import { Button } from "./ui/button";

const ButtonComponent = ({
  onclick,
  classname,
  variant,
  title,
  loading,
  loadingtitle,
}) => {
  return (
    <Button variant={variant} className={classname} onClick={onclick}>
      {!loading ? title : loadingtitle}
    </Button>
  );
};

export default ButtonComponent;

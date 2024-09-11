import React from "react";
import { PropTypes } from "prop-types";
import Image from "next/image";
import { Avatar } from "@mui/material";
import { ArrowRight } from "lucide-react";
const GigDisplay = ({
  gig,
  gigdescription,
  router,
  secondDiv,
  image,
  thirdDiv,
  title,
  imageno,
}) => {
  return (
    <div
      key={gig.id}
      className=" cursor-pointer"
      onClick={() => router.push(`/gigme/mygig/${gig?._id}/execute`)}
    >
      <div className={secondDiv}>
        {gigdescription?.picture ? (
          <Image
            src={
              gigdescription === gig?.bookedBy
                ? gig?.postedBy?.picture
                : gigdescription === gig?.postedBy
                ? gig?.postedBy?.picture
                : gig?.bookedBy?.picture
            }
            alt={gigdescription?.username.split("")[0]}
            width={imageno}
            height={imageno}
            className={image}
          />
        ) : (
          <Avatar className="rounded-full h-[15px] w-[15px]" />
        )}
        <div className={thirdDiv}>
          <div>
            {" "}
            <h6 className={title}>{gig.title}</h6>
            <h6 className={title}>
              {" "}
              {gigdescription === gig?.bookedBy
                ? gig?.postedBy?.username
                : gig?.bookedBy?.username}
            </h6>
            <h6 className={title}>
              {" "}
              {gig?.bussinesscat === "full"
                ? "FullBand"
                : gig?.bussinesscat === "personal"
                ? "Individual Gig"
                : "Mixed Musicians Gig"}
            </h6>
            <h6 className={title}> Price: {gig.price}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigDisplay;
GigDisplay.propTypes = {
  user: PropTypes.object,
  otheruser: PropTypes.object,
  router: PropTypes.object,
};

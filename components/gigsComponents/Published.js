import PublishedAndAllGigs from "./PublishedAndAllGigs";
import { PropTypes } from "prop-types";

const Published = ({ user }) => {
  return <PublishedAndAllGigs user={user} apiroute="getpub" />;
};

export default Published;

Published.propTypes = {
  user: PropTypes.object.isRequired,
};

import { PropTypes } from "prop-types";
import PublishedAndAllGigs from "./PublishedAndAllGigs";

const AllGigs = ({ user }) => {
  // Rest of the component...
  return <PublishedAndAllGigs user={user} />;
};

export default AllGigs;

AllGigs.propTypes = {
  user: PropTypes.object.isRequired,
};
